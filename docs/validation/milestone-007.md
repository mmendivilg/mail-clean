# Milestone 007 validation — resumable discovery, classification, and preview

Date: 2026-09-24

Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Completion assessment

Milestone 007 is **blocked and incomplete**. Its declared dependencies—milestones 003, 004, 005,
and 006—are all recorded as blocked. Direct inspection confirms that these are material source
gaps rather than stale status entries: the workspace has only the milestone-001 foundation table,
simulated status IPC, static shell, and a computation-only worker request shape. It has no scoped
customer/session/account persistence, Gmail provider or simulator, durable job/checkpoint engine,
Google account integration, immutable rule versions, candidates, or approvals.

The task and shared runner instructions prohibit bypassing a failed or incomplete required
dependency. Therefore no discovery/classification job, candidate migration, preview IPC/UI,
fixture, or milestone-007 test was added. No implementation or verification success is claimed.

## Dependency evidence and observed checks

All commands were run from the configured workspace root. No credentials, tokens, mailbox data,
attachment content, or customer data was used.

| Command/check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision documents, and milestone 003–006 validation reports | Confirmed that every declared dependency is incomplete and that the control-plane contract requires stopping at the dependency gate. |
| Inspect `src/`, `tests/`, and the dependency/status evidence | Found only `foundation_metadata`, the `foundation:get-status` path, a static simulated shell, and a bounded worker request schema. No prerequisite ownership, provider, scheduler, policy, candidate, approval, discovery checkpoint, classifier result, or preview implementation exists. |
| Check for `package-lock.json` and `node_modules` | Both are absent, so the declared TypeScript/Electron test toolchain is not installed. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |
| `git diff --check` | Passed with no whitespace errors after the milestone-007 documentation changes. |
| `node --version`; `npm --version`; `uname -s`; `uname -m` | Observed Node.js 24.19.0, npm 11.17.0, Darwin arm64. |

The npm failures establish that the local toolchain remains unavailable; they are not reproduced
defects in milestone-007 code. No dependency installation was attempted because this
runner-dispatched task may not take over or complete its blocked prerequisite milestones.

## Required milestone-007 verification not performed

Because implementation is prohibited by the dependency gate and the local test tools are absent,
none of the required checks ran:

- crashes before and after page persistence and cursor saves, with proof that no discovered
  candidate is lost;
- stale cursors that restart the original captured query and deduplicate already persisted IDs;
- duplicate and empty Gmail pages, changing mailbox behavior, bounded checkpoint advancement, and
  explicit incomplete discovery;
- distinction between a disappearing message and a request failure;
- prevention of cleanup executability until the selected discovery scope is complete and all
  required results are resolved;
- hand-verified fixtures covering every rule and deterministic classification restart mid-batch;
- persisted eligible, protected, and uncertain decisions with explanations and immutable rule
  versions;
- unique-message preview counts, unresolved totals, per-account/category samples, scan
  incompleteness, and visible errors while work continues;
- read-only preview behavior, historical decision preservation during reclassification, and proof
  that new or reclassified candidates do not inherit approval;
- packaging or interactive Electron inspection of the preview workflow.

## Material assumptions and external gaps

- The prerequisite statuses are authoritative and agree with the inspected source. Implementing
  milestone 007 now would create parallel identity, provider, scheduling, and rule-version
  contracts and would violate the runner's scheduling contract.
- Previously observed npm registry DNS/network failure is an environment gap. This run establishes
  only that the lockfile and installed toolchain remain absent; registry connectivity was not
  retested because dependency installation belongs to the blocked prerequisite work.
- Google Cloud setup, owner consent, Workspace policy review, production OAuth verification, and a
  separately authorized real-mailbox validation remain external gaps. They do not block eventual
  deterministic fake-provider verification once milestones 001–006 are complete.
- Gmail does not provide an atomic snapshot for a changing mailbox. The eventual implementation
  must report that limitation and must not mutate while relying on search pagination for a scan.

## Resume steps

1. Restore npm dependency availability and complete every required milestone-001 verification,
   preserving a lockfile and observed passing evidence.
2. Complete and verify milestone 002's durable scoped customer/session/account ownership model.
3. Complete and verify milestone 003's deterministic Gmail simulator/provider contract and bounded
   account-scoped data layer.
4. Complete and verify milestone 004's durable jobs, checkpoints, worker supervision, and request
   scheduling; then complete milestone 005's secure Google integration and milestone 006's
   immutable rule versions and evaluator.
5. Re-dispatch milestone 007. Add scoped candidate/checkpoint persistence, incremental discovery,
   bounded classification, historical rule-version decisions, validated preview IPC/preload/UI,
   and synthetic fault-injection fixtures against those established contracts.
6. Run and record every crash boundary, cursor recovery, duplicate/empty page, disappearance,
   classification restart, rule-fixture, read-only preview, and approval-isolation check plus the
   full repository gates before marking milestone 007 complete.
