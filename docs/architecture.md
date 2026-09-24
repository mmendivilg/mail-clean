# Mail Clean architecture

## Purpose and trust model

Mail Clean is a local Electron application for supervised, message-level Gmail cleanup. The
operator and customer review explainable candidates before any mutation. Gmail, the local
machine, and renderer input are all treated as fallible; renderer content is untrusted even when
it was shipped with the app.

Version one uses Electron, React, Vite, strict TypeScript, SQLite through `better-sqlite3` and
Drizzle, and Electron Forge. The current scaffold is deliberately useful without a Google account
and labels every included record as simulated.

## Runtime responsibilities

| Boundary         | Responsibilities                                                                                                                                  | Must not possess                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Renderer (React) | Paginated operator views, explicit intent capture, loading/empty/error states, incomplete-result labels                                           | Node APIs, filesystem/database handles, OAuth tokens, raw IPC, Gmail clients |
| Preload          | A frozen, named API; build typed requests; invoke one fixed channel; validate responses                                                           | Generic `send`/`invoke`, shell/filesystem APIs, tokens, business decisions   |
| Main             | Window security, sender and ownership enforcement, OS credential adapter, Gmail orchestration, sole SQLite ownership, audit and lifecycle control | Renderer-trusted authorization decisions                                     |
| Worker           | Bounded pure classification/index computation over supplied metadata batches                                                                      | Credentials, direct Gmail/database/filesystem access, arbitrary IPC          |

The initial worker protocol accepts at most 100 metadata items. A later durable job runner may use
Electron utility processes or Node workers, but only the main process opens SQLite and commits
checkpoints. Worker failure therefore cannot bypass journaling or ownership checks.

## Typed privileged boundary

All privileged requests use the single internal channel `mail-clean:request`, but the renderer
cannot access that channel. The preload exposes named methods such as
`mailClean.foundation.getStatus`; subsequent features add a discriminated Zod request and response,
an owned main-process handler, tests, and then a named preload method. No operation accepts an
arbitrary channel, SQL, URL, filesystem path, command, or OAuth token.

The main boundary validates, in order:

1. the sending `webContents`, exact main-frame identity, and exact loaded renderer URL;
2. the strict request shape, known operation, identifier constraints, and payload budgets;
3. that customer, session, and account form an owned relationship in durable storage;
4. operation-specific authorization and current business invariants;
5. the response schema before it crosses to preload.

Errors contain only a stable code, safe message, and bounded request ID. Stacks, SQL, local paths,
mail content, provider responses, and token errors stay outside the renderer and normal logs.
Navigation and new windows are denied, permissions are denied by default, context isolation and
sandboxing are enabled, and renderer Node integration and webviews are disabled.

## Identity and isolation

A message identity is the tuple:

`(customer_id, session_id, account_id, gmail_message_id)`

Gmail message IDs are not globally sufficient for application authorization. Every candidate,
attachment, approval, intent, outcome, and restoration record carries or joins through the entire
tuple. Database constraints and queries must include the owning customer/session/account. A
session never inherits records, approval, or credentials from another customer or session.

OAuth refresh/access tokens are referenced by opaque credential IDs in SQLite and stored using the
operating system's protected credential service. They never enter renderer state, job payloads,
reports, or logs.

## Data and database ownership

The main process is the only SQLite owner. It enables foreign keys and WAL mode and exposes bounded
domain repositories rather than SQL. Drizzle defines the schema and typed queries; ordered,
transactional migrations advance a recorded schema version. The database stores durable metadata,
rule versions, discovery checkpoints, exact candidate identities, approval snapshots, action
intents/outcomes, and report facts. Bodies and attachment contents are not routine database data.

Backups, pruning, cache limits, and low-disk behavior arrive in milestone 014. Durable audit data
may grow with processed messages; bounded working sets, page sizes, and retention policy prevent
unbounded memory/cache/log growth.

## Job model and recovery

The durable state machine is:

`queued -> running(discovering) -> awaiting_review -> approved -> running(applying) -> complete`

Any work state may move to `pause_requested -> paused`; cancellation moves between work units to
`cancelled` without undoing completed Gmail actions. Bounded failure yields `failed` or a visible
retry item. Authorization loss pauses only the affected mailbox. Sleep, shutdown, network loss,
or process failure resume from committed checkpoints.

Discovery and mutation are separate jobs. Discovery persists and deduplicates message IDs before
cleanup begins. If a Gmail page token expires, discovery restarts the query and deduplicates against
stored scoped identities. Each remote mutation follows:

1. re-read exact approval, rule version, protection status, and relevant remote message state;
2. transactionally journal intended message-level label changes;
3. call Gmail with timeouts, rate limits, and bounded exponential backoff with jitter;
4. persist success, skip, definite failure, or uncertain outcome;
5. reconcile an uncertain outcome against Gmail before any retry.

## Approval and cleanup semantics

Approval is an immutable, durable set of exact scoped Gmail message IDs plus the reviewed rule
version and action. A group UI merely helps construct that set. Later discoveries never inherit an
old approval. Protection rules always win and are checked again immediately before mutation.

Version one removes the Inbox/other labels as appropriate only by moving each approved message to
Trash with `gmail.modify`; it never mutates a whole Gmail thread. Cleaning a candidate found via an
attachment affects the parent email and all its attachments, not an isolated attachment. Immediate
permanent deletion and trusted automatic cleanup are explicitly outside version one.

## Attachment boundary

Routine discovery retrieves only the Gmail structure and metadata required to index filename, MIME
type, reported attachment size, and its scoped parent message. Content fetch is a separate,
explicitly enabled, size-bounded job (milestone 012). The UI distinguishes per-attachment reported
size, summed attachment size, and estimated whole-message size. Attachment rankings are marked
incomplete until the chosen scope is fully scanned, and cleanup counts deduplicate parent messages.

## Initial resource budgets

These conservative defaults are architecture constraints, not validated capacity claims:

| Resource                  | Initial budget                                                   |
| ------------------------- | ---------------------------------------------------------------- |
| UI/database page          | 25 default, 100 maximum records                                  |
| Worker metadata batch     | 100 messages maximum                                             |
| Gmail discovery page      | 100 IDs maximum                                                  |
| Concurrent Gmail requests | 2 per account, 4 application-wide                                |
| Retry attempts            | 5 transient attempts, then visible retry/failure state           |
| Request timeout           | 30 seconds unless a documented endpoint needs less               |
| In-memory candidate data  | One current page plus one bounded work batch                     |
| Log files                 | 10 MiB each, 5 retained; metadata only                           |
| Attachment download       | Off by default; explicit per-job byte/file caps in milestone 012 |

Milestones 014 and 016 must measure disk/memory behavior and adjust budgets with recorded evidence.
When progress cannot be durably saved, new work pauses rather than continuing in memory.

## Platform and external assumptions

- The first development host is Apple silicon macOS. Windows and Linux packaging remain required
  validation in milestone 017; no compatibility is claimed yet.
- Local unsigned packaging is suitable only for development. Distribution needs platform signing,
  notarization where applicable, and release review.
- Google integration needs an owner-managed Google Cloud project, Gmail API enabled, a Desktop OAuth
  client, consent-screen configuration, allowed test users during testing, and decisions about
  restricted-scope verification/security assessment. Workspace administrator policy and Vault
  holds must be checked before customer work.
- No credentials are requested or embedded in this repository. Real sign-in, mailbox activity,
  revocation, or customer-data removal requires separately authorized interactive validation.
- Local jobs do not run while the computer is asleep or off. They resume when the app and machine
  are available; there is no hidden wake scheduler.
