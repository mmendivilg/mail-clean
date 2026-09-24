# Milestone 012 validation — explicit attachment downloads from selection to results

Date: 2026-09-24

Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Completion assessment

Milestone 012 is **blocked and incomplete**. Its declared dependencies—milestones 004, 008, 009,
and 011—are all recorded as blocked. Direct source inspection confirms the records are current:
the workspace has no durable scoped job store or scheduler, Gmail provider or attachment-content
adapter, attachment index and stable part identity, exact approval store, or durable operator
control/restart model.

The task and shared runner instructions prohibit bypassing a failed or incomplete required
dependency. Therefore no download plan, destination permission/reference, migration, worker
retrieval path, destination-picker IPC, download screen, fixture, or milestone-012 product test was
added. Building those against the foundation-only schema would create parallel account, message,
attachment, approval, and job identities and could not prove that download authorization is
separate from cleanup authorization. No implementation or verification success is claimed.

## Dependency evidence and observed checks

All commands were run from the configured workspace root. No credentials, tokens, mailbox data,
attachment content, customer data, network mailbox calls, downloads, or remote mutations were
used.

| Command/check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision/requirement documents, and milestone 004, 008, 009, and 011 validation reports | Confirmed that every direct dependency is incomplete and that the control-plane contract requires stopping at the dependency gate. |
| Inspect `src/`, `tests/`, package configuration, schema, IPC, preload, renderer, and worker files | Found only `foundation_metadata`, simulated `foundation:get-status`, static shell copy, a metadata-only capability flag, and a computation-only worker request. There are no scoped mailbox/message/attachment rows, durable jobs, approvals, Gmail attachment reads, filesystem download operations, destination grants, download controls, or result records. |
| Check for `package-lock.json` and `node_modules` | Both are absent. |
| `node --version`; `npm --version`; `uname -s`; `uname -m` | Passed and reported Node.js 24.19.0, npm 11.17.0, Darwin, and arm64. |
| `npm ci` | Failed with exit 1 (`EUSAGE`) because no `package-lock.json` or compatible shrinkwrap exists. npm also reported that it could not write its normal log outside the workspace. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |
| `npm run package` | Failed with exit 127: `electron-forge: command not found`. |
| `git diff --check`; direct trailing-whitespace scan of the milestone-012 status and validation documentation | Passed with no whitespace errors. The direct scan covers the currently untracked documentation that Git does not include in its diff. |

These failures establish that the dependency-backed toolchain remains unavailable; they are not
reproduced defects in milestone-012 product code. No `npm install` was attempted because installing
and verifying the foundation belongs to the blocked prerequisite sequence, not this dispatched
task.

## Required milestone-012 verification not performed

Because implementation is prohibited by the dependency gate and the local test tools are absent,
none of the required verification ran:

- default-off download behavior, individual selection across pages, missing-size estimates,
  changed destinations, cancellation, restart, snapshot-only approval, or the explicit documented
  job-wide policy;
- proof that viewing metadata or running a default scan grants no download authorization, starts no
  content retrieval, and never approves or deletes parent messages;
- malicious filenames, collisions, traversal, destination symlinks, unknown or oversized content,
  disk-full behavior, interrupted retrieval, partial-file cleanup, restart after atomic rename, or
  local actions restricted to verified completed files;
- fixture-byte verification, correct Gmail base64url decoding, response-size enforcement before an
  oversized fetch where provider metadata permits it, a bounded safe policy where it does not, and
  proof that buffered JSON/base64 responses are not represented as streaming;
- bounded concurrency, disk checks, durable per-attachment progress/failure/retry/cancel state, or
  completed-file locations through validated destination-picker IPC and renderer controls;
- the required simulated multi-attachment scenario with one failure, one unsupported oversized
  item, and a restart, including proof that unrelated jobs remain default-off and cleanup approval
  remains independent;
- interactive Electron inspection or an unsigned package of the download confirmation, progress,
  results, retry, cancellation, and Download-versus-Trash separation.

No maximum automatic download size, concurrency value, collision suffix format, destination grant
representation, or job-wide policy was selected in this blocked run. Those implementation choices
must be made against the eventual Gmail adapter, indexed attachment identity, durable scheduler,
and platform filesystem model, then documented and verified rather than presented as current
behavior.

## Material assumptions and external gaps

- The configured runner workspace is authoritative even though the task context names a different
  machine-specific absolute path. All inspection and commands used the configured workspace root.
- The direct dependency statuses are authoritative and agree with source inspection. Milestone 012
  cannot safely persist download plans until milestone 008 supplies exact scoped attachment
  identities, milestone 009 supplies durable explicit selection/approval semantics, milestone 004
  supplies durable bounded work ownership, and milestone 011 supplies restart-safe controls.
- Download approval must remain a distinct capability from exact-message Trash approval. A future
  per-job opt-in must default off, snapshot only the discovered selected attachments by default,
  and never authorize newly discovered items unless a separately documented job-wide policy was
  explicitly enabled. These are required semantics, not observed behavior in this blocked run.
- Gmail's attachment endpoint returns base64url data inside JSON, so the eventual adapter must
  account for encoded and decoded buffering and must not claim streaming. The supported maximum and
  unknown-size policy remain unchosen and unvalidated because no provider contract exists.
- The absent lockfile and installed dependencies prevent baseline repository verification.
  Previously recorded registry/DNS failure is historical evidence; registry access was not retested
  because taking over prerequisite implementation is outside this task.
- Google Cloud project setup, Gmail API enablement, OAuth client configuration, owner consent,
  Workspace administrator policy, production verification/security assessment, and separately
  authorized real-mailbox/download validation remain external gaps. They do not block eventual
  fake-provider and synthetic-file verification after the prerequisites are complete.
- No real Google account was connected, no attachment content was fetched, no local output file was
  created, no file was opened automatically, and no parent message was moved to Trash.

## Resume steps

1. Restore dependency availability, create and preserve the lockfile, and complete all required
   milestone-001 verification.
2. Complete and verify milestones 002–003 so durable scoped ownership and the deterministic Gmail
   provider exist, then complete milestone 004's durable job store, recovery, cancellation, and
   account-aware bounded scheduler.
3. Complete and verify milestones 005–008, including authorization, rules, resumable discovery,
   attachment metadata indexing, stable scoped attachment identities, reported/unknown sizes, and
   proof that default scans retrieve no content.
4. Complete and verify milestones 009–011, including independent exact approvals, cleanup
   journaling, multi-mailbox isolation, restart-safe operator controls, and restoration evidence.
5. Re-dispatch milestone 012. Define the supported buffered-download byte limit and unknown-size
   policy; add exact durable download plans and per-attachment state; implement a bounded authorized
   Gmail retrieval and safe atomic destination writer; then expose ownership-checked destination
   selection, confirmation, progress, retry/cancel, results, and verified local-file actions.
6. Run every required fake-Gmail and synthetic-file scenario, all repository gates, packaging, and
   available interactive UI inspection. Record actual passing results before marking milestone 012
   complete; keep separately authorized real Google validation as an explicit external gap.
