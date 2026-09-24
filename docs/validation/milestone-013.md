# Milestone 013 validation — reports, account disconnect, and session closeout

Date: 2026-09-24

Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Completion assessment

Milestone 013 is **blocked and incomplete**. Its declared dependencies—milestones 005, 011, and
012—are all recorded as blocked. Direct source inspection confirms that those records are current:
the workspace has no durable customer/session/account ownership records, protected credential
vault or Google adapter, job scheduler and control state, cleanup/restoration action journal,
attachment download records, report facts, managed-cache inventory, or recoverable purge model.

The task and shared runner instructions prohibit bypassing a failed or incomplete required
dependency. Therefore no report service or screen, CSV/HTML exporter, disconnect/revocation path,
cache clearing, retained-data purge workflow, contract, fixture, or milestone-013 product test was
added. Building these against the foundation-only schema would introduce parallel identities and
could not establish accurate totals, credential-removal order, or customer-isolated deletion. No
implementation or verification success is claimed.

## Dependency evidence and observed checks

All commands were run from the configured workspace root. No credentials, tokens, mailbox data,
attachment content, customer data, network mailbox calls, remote revocations, exports, or local
data removals were used.

| Command/check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision/requirement documents, and milestone 005, 011, and 012 validation reports | Confirmed that every direct dependency is incomplete and that the control-plane contract requires stopping at the dependency gate. |
| Inspect `src/`, `tests/`, package configuration, schema, IPC, preload, renderer, and worker files | Found only `foundation_metadata`, simulated `foundation:get-status`, static future-feature copy, and a computation-only worker request. There are no scoped account/token/job/action/restoration/download/report/cache/purge records or owned operations. |
| Check for `package-lock.json` and `node_modules` | Both are absent. |
| `node --version`; `npm --version`; `uname -s`; `uname -m` | Passed and reported Node.js 24.19.0, npm 11.17.0, Darwin, and arm64. |
| `npm ci` | Failed with exit 1 (`EUSAGE`) because no `package-lock.json` or compatible shrinkwrap exists. npm also reported that it could not write its normal log outside the workspace. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |

These failures establish that the dependency-backed toolchain remains unavailable; they are not
reproduced defects in milestone-013 product code. No `npm install` was attempted because restoring
and verifying the foundation belongs to the blocked prerequisite sequence, not this dispatched
task.

## Required milestone-013 verification not performed

Because implementation is prohibited by the dependency gate and the local test tools are absent,
none of the required verification ran:

- reconciliation of deduplicated message totals against action-journal fixtures with partial
  cleanup, skips, failures, unresolved outcomes, restoration state, and attachment downloads;
- report separation of confirmed actions, observed remote state, and estimates; redaction of
  secrets, bodies, and attachment content; storage-reclamation claim review; or restoration copy
  that avoids promising an exact future availability interval;
- bounded CSV and printable HTML export tests for large inputs, Unicode, cancellation, HTML
  escaping, spreadsheet-formula injection mitigation, and redaction;
- offline revocation, expired credentials, repeated disconnect, multi-account sessions, or
  disconnect during execution, including proof that disconnect prevents any new account request
  and preserves or settles in-flight outcomes;
- distinct local-disconnect and remote-revocation results, token removal after a failed revoke,
  access-settings guidance, or preservation of historical reports after disconnect;
- current official Google OAuth revocation semantics, including effects on other connections made
  by the same Google app for an account;
- separate cache-clear and retained-customer-data confirmation flows, with accurate impact on
  reports and restoration and optional treatment of downloaded/exported operator files;
- temporary synthetic storage tests for active-job stopping, customer isolation, interrupted purge
  recovery, token references, database/WAL/log/file references, application backups, and files
  outside managed directories;
- proof that purging one synthetic customer preserves every other customer's data, that unmanaged
  files remain untouched, or interactive Electron inspection of report and closeout screens.

No unattended purge of real or synthetic application data was attempted. No claim of forensic
secure erasure, successful remote revocation, recovered Gmail storage, or guaranteed restoration
duration is made.

## Material assumptions and external gaps

- The configured runner workspace is authoritative even though the task context names a different
  machine-specific absolute path. All inspection and commands used the configured workspace root.
- The dependency statuses are authoritative and agree with source inspection. Milestone 013 needs
  milestone 005's account/credential lifecycle, milestone 011's durable controls and restoration
  evidence, and milestone 012's attachment download outcomes before it can report, disconnect, or
  purge those facts safely.
- An eventual report must be derived from established durable records and deduplicate scoped Gmail
  message identities. Static placeholder totals would not satisfy this task and were not added.
- An eventual disconnect must first block new scheduling for the account, preserve or resolve
  already in-flight evidence, remove local token material even when remote revocation fails, and
  record those local and remote results separately. These are requirements, not observed behavior.
- An eventual purge must enumerate only application-managed, customer-owned records and files,
  journal recoverable progress, account for SQLite WAL and documented backups, and leave operator
  exports/downloads alone unless explicitly selected. The repository does not yet contain the
  required ownership model or retention implementation.
- Official Google revocation documentation was not consulted in this blocked run because no OAuth
  implementation may begin before its dependencies. Consequently the exact current provider
  semantics and operator wording remain an explicit follow-up item rather than an unsupported
  claim.
- Google Cloud project setup, Gmail API enablement, OAuth client configuration, owner consent,
  Workspace administrator policy, production verification/security assessment, access-settings
  review, and separately authorized real-account disconnect/revocation validation remain external
  gaps. They do not block eventual fake-provider and synthetic-storage tests once the prerequisites
  are complete.

## Resume steps

1. Restore dependency availability, create and preserve the lockfile, and complete all required
   milestone-001 verification.
2. Complete and verify milestones 002–004 so durable scoped ownership, the Gmail provider, jobs,
   scheduling, cancellation, and recovery exist.
3. Complete and verify milestone 005's protected credential storage, account lifecycle, OAuth
   adapter, and fake-provider authorization behavior, including its official-document review.
4. Complete and verify milestones 006–010 so immutable rules, candidates, approvals, and
   message-level cleanup intents and outcomes exist.
5. Complete and verify milestone 011's multi-account controls, stop semantics, restoration
   evidence, and uncertain-outcome recovery, then milestone 012's explicit download results and
   managed-file boundaries.
6. Re-dispatch milestone 013. Consult current official Google revocation documentation; implement
   journal-derived reports and bounded safe exports, local disconnect plus separately reported
   remote revocation, and recoverable ownership-scoped cache/history removal through validated IPC,
   preload, and UI paths.
7. Run every required action-journal reconciliation, large-export/escaping/Unicode/cancellation/
   redaction, disconnect/revoke, multi-account/in-flight, and synthetic-storage isolation/recovery
   scenario. Run all repository gates and available packaging/UI checks, recording actual passing
   results before marking milestone 013 complete. Keep live revocation and real-data removal as
   separately authorized external validation.
