# Milestone 014 validation — resource limits, diagnostics, and database backups

Date: 2026-09-24

Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Completion assessment

Milestone 014 is **blocked and incomplete**. Its declared dependencies—milestones 002, 008, 011,
012, and 013—are all recorded as blocked. Direct source inspection confirms those records are
current: the workspace has only the milestone-001 `foundation_metadata` table and simulated
foundation IPC. It has no durable customer/session/account model, attachment index, job scheduler
or resource-paused states, exact approvals, mutation intents or outcomes, download/export paths,
report facts, managed-cache inventory, migration framework, or schema-version recovery policy.

The task and shared runner instructions prohibit bypassing a failed or incomplete required
dependency. Therefore no resource-control service, diagnostic logger/export, migration, backup,
restore, configuration, operator interface, fixture, or milestone-014 product test was added.
Building those facilities around the foundation-only database would create a parallel lifecycle
and could not establish the required mutation, approval-history, reconciliation, redaction, or
restore guarantees. No implementation or verification success is claimed.

## Dependency evidence and observed checks

All commands were run from the configured workspace root. No credentials, tokens, mailbox data,
attachment content, customer data, network mailbox calls, mutations, exports, backups, restores,
or destructive cleanup were used.

| Command/check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision/requirement documents, and milestone 002, 008, 011, 012, and 013 validation reports | Confirmed that every direct dependency is incomplete and the control-plane contract requires stopping at the dependency gate. |
| Inspect `src/`, `tests/`, package configuration, schema, IPC, preload, renderer, and worker files | Found only `foundation_metadata`, a direct `schema_version=001` insert, simulated `foundation:get-status`, static future-feature copy, and a bounded computation-only worker request. There are no durable scoped operations or milestone-014 facilities. |
| Search source and tests for backup, diagnostics, correlation, resource-paused, disk-full, WAL checkpoint, migration, approval, action-intent, download, report, and session behavior | Found architecture/requirement plans and simulated labels, but no implementation of resource pausing, rotating logs, diagnostic export, backup/restore, migration recovery, or their prerequisite production records. |
| Check for `package-lock.json` and `node_modules` | Both are absent. |
| `node --version`; `npm --version`; `uname -s`; `uname -m` | Passed and reported Node.js 24.19.0, npm 11.17.0, Darwin, and arm64. |
| `npm ci` | Failed with exit 1 (`EUSAGE`) because no `package-lock.json` or compatible shrinkwrap exists. npm also reported that it could not write its normal log outside the workspace. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |
| `git diff --check`; direct trailing-whitespace scan of the milestone-014 status and validation documentation | Passed with no whitespace errors. The direct scan covers the currently untracked documentation that Git does not include in its diff. |

These failures establish that the dependency-backed toolchain remains unavailable; they are not
reproduced defects in milestone-014 product code. No `npm install` was attempted because restoring
and verifying the foundation belongs to the blocked prerequisite sequence, not this dispatched
task.

## Required milestone-014 verification not performed

Because implementation is prohibited by the dependency gate and the local test tools are absent,
none of the required verification ran:

- disk-full and durable-write failures at discovery, approval, intent, or acknowledgment
  boundaries, including proof that no unjournaled mutation starts and uncertain in-flight work is
  reconciled;
- proof that cache or temporary-file cleanup never removes approvals, action history, migration
  evidence, or other durable records to free space;
- large synthetic page measurements for bounded memory and cache growth, safe temporary-file
  cleanup, WAL size monitoring, checkpoint behavior, short transactions, and long-reader handling;
- resource checks before batches, attachment downloads, and report exports, visible durable
  resource-paused states, or operator recovery instructions;
- sensitive canaries in fixture headers, tokens, OAuth codes, bodies, attachment bytes, errors,
  and personal headers, with assertions that logs and diagnostic bundles contain none of them;
- structured log rotation and retention limits, correlation continuity across restarts, failing
  log writes, worker-failure retention, bounded diagnostic exports, or measured instrumentation
  overhead;
- proof that a diagnostic write failure cannot hide or replace a failure to persist essential job
  state;
- prior-version migration, pre-migration backup, failed-migration recovery, backup during active
  simulated work, restore consistency, backup disk exhaustion, corrupted-file preservation, or
  newer-schema downgrade refusal;
- proof that backups use a supported consistent SQLite backup mechanism instead of copying a live
  database/WAL pair incompletely, and that retention/purge rules do not silently include secrets;
- proof that restored approvals and historical actions require remote-state reconciliation plus a
  new current execution context before any mutation can resume;
- operator-interface inspection, Electron launch, or package-level backup/diagnostic behavior.

No disk threshold, cache budget, temporary-file age, WAL checkpoint threshold, log rotation size,
diagnostic export cap, backup retention interval, or restore format was selected in this blocked
run. Those values must be defined against measured workloads and the eventual scheduler, managed
storage, and database lifecycle, then documented and verified rather than presented as current
behavior.

## Material assumptions and external gaps

- The configured runner workspace is authoritative. All inspection and commands used that root;
  no unrelated project was accessed.
- The direct dependency statuses are authoritative and agree with source inspection. Milestone 014
  needs milestone 002's durable scoped database and migrations; milestone 008's bounded attachment
  index; milestone 011's scheduler, controls, and restoration journal; milestone 012's explicit
  download and temporary-file lifecycle; and milestone 013's reports, exports, and managed-data
  retention boundaries.
- Resource controls must protect essential durable writes before nonessential logging or cache
  activity. A future implementation must pause before a mutation whenever intent/outcome evidence
  cannot be committed, and cleanup must never sacrifice approval/history evidence. These are task
  requirements, not observed behavior in this blocked run.
- A future backup must use SQLite's supported consistent backup facilities, validate schema
  compatibility and integrity, preserve corrupt/newer files as evidence, and never silently copy
  credential-store secrets. These are requirements, not current capabilities.
- The absent lockfile and installed dependencies prevent baseline repository verification.
  Previously recorded registry/DNS failure is historical evidence; registry access was not
  retested because taking over prerequisite implementation is outside this task.
- Google Cloud setup, Gmail API enablement, OAuth client configuration, owner consent, Workspace
  administrator policy, production verification/security assessment, and separately authorized
  real-mailbox validation remain external gaps. They do not block eventual fake-provider,
  synthetic-file, and synthetic-SQLite verification after the prerequisites are complete.
- Representative multi-hour and large-dataset capacity testing remains a later operational gap
  even after deterministic milestone-014 tests pass. No performance capacity is claimed here.

## Resume steps

1. Restore dependency availability, create and preserve the lockfile, and complete every required
   milestone-001 verification gate.
2. Complete and verify milestones 002–007 so scoped database migrations, ownership, jobs, provider
   access, rules, discovery, and candidate checkpoints exist.
3. Complete and verify milestones 008–010 so attachment indexing, exact approvals, message-level
   action intents/outcomes, and uncertain-result reconciliation exist.
4. Complete and verify milestones 011–013 so resource-aware controls, restoration, explicit
   downloads, temporary files, reports/exports, disconnect, and managed-data retention boundaries
   exist.
5. Re-dispatch milestone 014. Define measured resource budgets; implement preflight checks,
   durable pause reasons, bounded caches/temp cleanup, WAL monitoring/checkpoints, allowlisted
   rotating diagnostics and export, and a supported consistent SQLite backup/restore lifecycle.
6. Run every required failure-injection, canary/redaction, rotation/restart, resource-growth,
   migration, backup, corruption, downgrade-refusal, restore, and historical-action safety
   scenario. Run all repository gates and available packaging/UI checks, recording actual passing
   results before marking milestone 014 complete. Keep real-mailbox and long-duration capacity
   validation as separately identified external gaps.
