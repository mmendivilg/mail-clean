# Milestone 008 validation — attachment metadata and largest-attachment review

Date: 2026-09-24

Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Completion assessment

Milestone 008 is **blocked and incomplete**. Its declared dependencies—milestones 003, 005, and
007—are all recorded as blocked. Direct inspection confirms that these are material source gaps
rather than stale status entries: the workspace has only the milestone-001 foundation table,
simulated status IPC, static shell, and a computation-only worker request shape. It has no scoped
customer/session/account persistence, Gmail provider or simulator, request scheduler, Google
account integration, message discovery/checkpoints, candidate decisions, protection rules, or
approval records.

The task and shared runner instructions prohibit bypassing a failed or incomplete required
dependency. Therefore no MIME parser, attachment index/migration, enrichment job, review IPC/UI,
fixture, package change, or milestone-008 product test was added. No implementation or verification
success is claimed.

## Dependency evidence and observed checks

All commands were run from the configured workspace root. No credentials, tokens, mailbox data,
attachment content, or customer data was used.

| Command/check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision documents, and milestone 003, 005, and 007 validation reports | Confirmed that every declared dependency is incomplete and that the control-plane contract requires stopping at the dependency gate. |
| Inspect `src/`, `tests/`, the repository file list, and dependency/status evidence | Found only `foundation_metadata`, the `foundation:get-status` path, a static simulated shell, and a bounded computation request schema. No prerequisite scoped ownership, Gmail structure-read contract, scheduler, discovery job, message/candidate records, protection state, approval state, or attachment persistence exists. |
| Check for `package-lock.json` and `node_modules` | Both are absent. |
| `npm ci` | Failed with exit 1 (`EUSAGE`) because no `package-lock.json` or compatible shrinkwrap exists. npm also reported that it could not write its normal log outside the workspace. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |
| `git diff --check` | Passed with no whitespace errors after the milestone-008 documentation changes. |
| `node --version`; `npm --version`; `uname -s`; `uname -m` | Observed Node.js 24.19.0, npm 11.17.0, Darwin arm64. |

The npm failures establish that the local dependency-backed toolchain remains unavailable; they are
not reproduced defects in milestone-008 code. No `npm install` was attempted because this
runner-dispatched task may not take over and complete the blocked prerequisite milestones;
`npm ci` cannot proceed until their missing lockfile exists.

## Required milestone-008 verification not performed

Because implementation is prohibited by the dependency gate and the local test tools are absent,
none of the required checks ran:

- current official Gmail API field-semantics inspection for selective message structure reads;
- bounded parsing of nested multipart structures, repeated or Unicode filenames, inline parts,
  zero or unknown sizes, absent attachment IDs, malformed depth, and excessive part counts;
- proof that routine indexing excludes `body.data`, never decodes message bodies, and never calls
  an attachment-content endpoint;
- durable scoped attachment rows with stable part identity, metadata completeness, explicit
  partial/unknown message totals, and separate estimated whole-message size;
- restart/crash recovery, deduplication, bounded scheduled batches, visible in-progress browsing,
  and scope completion tracked separately from message discovery;
- stable database ordering for equal sizes, database-wide minimum-size/type/sender/date filters,
  Inbox-default scope, explicit expansion to other mail, and bounded renderer pages;
- fixtures with multiple attachments per parent, missing sizes, and incomplete indexing, including
  proof that individual-attachment rankings do not duplicate parent-message review counts;
- visible incomplete/unresolved ranking status and prevention of cleanup execution from incomplete
  scan results;
- protected parent-message selection, matching reasons, distinct individual/total/estimated size
  labels, and visible notice that Trash affects the whole email and all its attachments;
- packaging or interactive Electron inspection of the attachment review workflow.

## Material assumptions and external gaps

- The prerequisite statuses are authoritative and agree with the inspected source. Implementing
  milestone 008 now would create parallel message identity, provider, scheduling, discovery, and
  review contracts and violate the runner's scheduling contract.
- The missing Gmail provider makes it impossible to add a compatible minimized-fields structure
  read without guessing the earlier contract. The absent scheduler/checkpoint and discovery-scope
  records likewise prevent meaningful recovery, completion, and ranking eligibility semantics.
- Previously observed npm registry DNS/network failure remains historical environment evidence.
  This run establishes only that the lockfile and installed toolchain are absent; registry
  connectivity was not retested with `npm install` because prerequisite completion is outside this
  task.
- Google Cloud setup, owner consent, Workspace policy review, production OAuth verification, and a
  separately authorized real-mailbox validation remain external gaps. They do not block eventual
  deterministic fake-provider and synthetic MIME-structure verification once prerequisites are
  complete.
- Official Gmail API documentation was not consulted during this blocked run, so no claim is made
  about current production field behavior. That inspection is required when implementation resumes.

## Resume steps

1. Restore npm dependency availability, create and preserve the lockfile, and complete every
   required milestone-001 verification with observed passing evidence.
2. Complete and verify milestone 002's durable scoped customer/session/account ownership model,
   milestone 003's deterministic Gmail provider/simulator and bounded data access, and milestone
   004's durable jobs, checkpoints, worker supervision, and request scheduler.
3. Complete and verify milestone 005's secure Google/Gmail integration, milestone 006's immutable
   protection/rule versions, and milestone 007's resumable discovery, candidate decisions, scope
   completion, preview, and approval isolation.
4. Re-dispatch milestone 008. Inspect current official Gmail API documentation, define the minimal
   structure fields, implement a bounded MIME metadata parser and scheduled resumable attachment
   enrichment against the established contracts, and add scoped migrations with idempotent stable
   part identities and explicit completeness semantics.
5. Add the database-backed attachment review query and validated IPC/preload/UI path with Inbox
   defaults, explicit other-mail expansion, bounded pages, stable ordering, filters, incomplete
   ranking state, protection-aware unique parent-message selection, and disabled execution until
   the selected scope is complete and resolved.
6. Run and record every synthetic parser/content-exclusion, crash/restart/deduplication,
   database-wide filter/order, unique-message-count, incomplete-scope, safety-copy, IPC, UI, and
   full repository gate before marking milestone 008 complete.
