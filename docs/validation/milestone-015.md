# Milestone 015 validation — operator usability and failure regressions

Date: 2026-09-24

Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Completion assessment

Milestone 015 is **blocked and incomplete**. Every declared dependency—milestones 006 and
008–014—is recorded as blocked. Direct source inspection confirms that these are current product
gaps rather than stale status entries: the workspace remains a milestone-001 foundation with one
simulated status operation, one static shell, one foundation table, and one IPC-boundary test.

The task and shared runner instructions prohibit bypassing any incomplete required dependency.
Consequently, no operator-workflow component, fault-injection harness, application defect fix, or
milestone-015 product test was added. A fault suite created now would need to invent parallel
customer, account, message, job, approval, action, download, migration, report, and backup models;
it could not test the actual persistence/network boundaries or prove the requested safety
properties. No implementation or verification success is claimed.

## Dependency and source evidence

All commands were run from the configured workspace root. No credentials, tokens, mailbox data,
attachment content, customer data, network mailbox calls, downloads, exports, backups, or remote
mutations were used.

| Check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision documents, and milestone 006 and 008–014 validation reports | Confirmed that all eight direct dependencies are explicitly incomplete and that the control-plane contract requires stopping at the dependency gate. |
| Inspect `src/`, `tests/`, package configuration, database schema, IPC contracts/handler, preload bridge, renderer, and worker protocol | Found 16 source/test files, only the `foundation_metadata` table, the simulated `foundation:get-status` operation, a static seven-button shell, and a bounded computation-only worker request. No implemented connection-to-closeout workflow or injectable persistence/network boundary exists. |
| Search source and tests for Gmail, approvals, cleanup, restoration, downloads, migration, backups, disconnect, reports, candidates, throttling, and disk failures | Found future-facing static copy and a generic bounded cursor field, but no product implementation or regression scenarios for these behaviors. |
| Inspect the existing renderer | The simulated mode is visibly labeled and navigation uses native buttons. The only rendered views swap static text; there are no connection, rule, discovery, review, approval, cleanup, restoration, download, report, disconnect, confirmation-dialog, or data-table screens to exercise as a coherent workflow. No explicit active-item semantics or focus-management implementation was found. |
| Check for `package-lock.json` and `node_modules` | Both are absent. |
| `node --version`; `npm --version`; `uname -s`; `uname -m` | Passed and reported Node.js 24.19.0, npm 11.17.0, Darwin, and arm64. |
| `npm ci` | Failed with exit 1 (`EUSAGE`) because no `package-lock.json` or compatible shrinkwrap exists. npm also reported that it could not write its normal log outside the workspace. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |
| `npm run package` | Failed with exit 127: `electron-forge: command not found`. |

The command failures establish that the dependency-backed local toolchain is unavailable; they are
not passing baseline evidence and are not reproduced milestone-015 product defects. No
`npm install` was attempted because creating the missing lockfile and completing the foundation
gates belongs to the blocked prerequisite sequence, not this runner-dispatched verification
milestone.

## Required operator verification not performed

The required keyboard-driven simulated session from connection through report and disconnect did
not run because none of those workflow screens exists. Therefore no observed evidence is available
for:

- keyboard navigation and focus restoration across the complete workflow;
- session/account context, confirmation dialogs, concrete mutation effects, or visually distinct
  simulated execution at every action boundary;
- accessible names, landmarks, table headers, row/column semantics, status announcements, or
  empty/loading/error behavior across product screens;
- long senders and subjects, narrow-window reflow, large paginated tables, readable counts, or
  incomplete/unknown labels;
- interruption, reconnect, retry, resource-pause, restoration, download, migration, backup,
  report, or disconnect states; or
- screenshots or interactive Electron inspection. The environment was not used for screenshots
  because the required screens cannot be reached and the Electron toolchain cannot launch.

The static foundation shell was reviewed in source only. That inspection is not a substitute for
the requested keyboard, visual, assistive-technology, window-width, or packaged-app checks.

## Required failure matrix not performed

No cross-layer fault scenarios ran. The required real database/worker/fake-Gmail paths and
durable records do not exist, so the following outcomes remain **unknown**, not passing:

| Boundary or fault | Required safety claim | Observed outcome |
| --- | --- | --- |
| Discovery interruption, stale cursor, throttling, sleep-like interruption, worker death | Resume without skipping or duplicating scoped candidates | Not testable; no discovery provider, candidate store, scheduler, or checkpoint exists. |
| Approval snapshot interruption or low disk | Preserve the prior durable approval and never expose a partial/new approval | Not testable; no candidate/review/approval repository or disk-failure boundary exists. |
| Cleanup interruption, expired authorization, or externally changed message | Never mutate without a current exact approval; journal and reconcile uncertainty without harmful duplicates | Not testable; no approval snapshot, action journal, Gmail adapter, or cleanup worker exists. |
| Restoration interruption or externally changed labels | Avoid destructive label replacement and duplicate untrash actions | Not testable; no cleanup outcome or restoration path exists. |
| Download interruption, low disk, or changed authorization | Keep download approval separate, bound writes, and avoid partial/duplicate harmful output | Not testable; no attachment index, explicit download plan, Gmail content adapter, or destination writer exists. |
| Migration interruption, corruption, or low disk | Preserve a recoverable prior database and prevent unsafe resume of historical actions | Not testable; no ordered migration, backup, restore, or production schema lifecycle exists. |
| Cross-customer/account/session fault injection | Prevent cross-scope reads, approvals, or actions | Not testable end to end; only the foundation IPC handler's injected `ownsContext` rejection is represented in source, and the test runner is unavailable. |

Accordingly, there is no evidence from this execution that approvals are retained, every candidate
is discovered, scopes cannot leak, mutations remain approved, or retries avoid harmful duplicate
actions across the requested matrix. The existing source-level IPC test is too narrow to establish
those workflow guarantees, and it did not execute in this run.

## Material assumptions and external gaps

- The configured runner workspace is authoritative even though the prompt context contains a
  different machine-specific absolute path. All inspection and commands used the configured
  workspace root.
- The eight direct dependency statuses are authoritative and agree with current source inspection.
  Milestone 015 requires their actual models and boundaries in order to test usability and inject
  faults without creating a misleading second architecture.
- The current working tree already contained modified/untracked scaffold and documentation files.
  They were treated as existing user work and not reset or rewritten beyond the two milestone-015
  documentation changes.
- The missing lockfile and dependencies prevent automated baseline and packaged UI validation.
  Previously recorded registry/DNS failure is historical evidence only; registry access was not
  retested in this execution.
- Google Cloud/OAuth setup and separately authorized real-mailbox verification remain external
  gaps. Those do not block deterministic fake-Gmail and synthetic fault testing after the local
  prerequisite implementation exists.
- Real Google throttling, token expiry/revocation, pagination-token invalidation, remote message
  races, and live Gmail mutation/reconciliation behavior remain untested. Simulated evidence must
  be recorded separately from those external checks when the milestone resumes.

## Resume steps

1. Restore dependency availability, create and preserve the lockfile, and complete all milestone
   001 verification gates.
2. Complete and verify milestones 002–005, then re-dispatch and complete milestone 006. Continue
   through milestones 007–014 in dependency order; do not mark later milestones complete from
   status-only changes.
3. Re-dispatch milestone 015 after milestones 006 and 008–014 are complete. Review the implemented
   operator workflow as one product and fix reproduced accessibility, responsive-layout, state,
   labeling, confirmation, and focus defects with regression coverage.
4. Add reusable deterministic fault controls at the established persistence, provider, worker,
   filesystem, and migration boundaries. Run the complete discovery/approval/cleanup/restoration/
   download/migration matrix and assert isolation, approval durability, complete discovery,
   mutation authorization, and reconciliation behavior.
5. Run all repository gates, packaging, and an actual keyboard-driven simulated session. Capture
   screenshots when GUI support exists, record exact synthetic seeds/scenarios and outcomes, and
   keep live-Google behavior as a separately authorized external validation gap.
