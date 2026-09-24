# Milestone 009 validation — review queue and exact customer approvals

Date: 2026-09-24

Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Completion assessment

Milestone 009 is **blocked and incomplete**. Its declared dependencies—milestones 003, 006, 007,
and 008—are all recorded as blocked. Direct source inspection confirms that these are material
implementation gaps rather than stale status entries: the workspace has only the milestone-001
foundation table, simulated foundation-status IPC, static shell, and a computation-only worker
request shape. It has no durable customer/session/account ownership, Gmail provider or simulator,
immutable rule versions, discovery checkpoints, candidate decisions, attachment index, or review
selection state on which an exact approval can safely be built.

The task and shared runner instructions prohibit bypassing a failed or incomplete required
dependency. Therefore no review schema/query, selection or keep-decision storage, approval
snapshot, confirmation flow, IPC/preload operation, renderer feature, fixture, or milestone-009
product test was added. No implementation or verification success is claimed.

## Dependency evidence and observed checks

All commands were run from the configured workspace root. No credentials, tokens, mailbox data,
attachment content, or customer data was used.

| Command/check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision/requirement documents, and milestone 003, 006, 007, and 008 validation reports | Confirmed that every declared dependency is incomplete and the control-plane contract requires stopping at the dependency gate. |
| Inspect `src/`, `tests/`, package configuration, schema, IPC, preload, renderer, and dependency/status evidence | Found only `foundation_metadata`, the `foundation:get-status` operation, a static simulated shell, and the bounded foundation worker protocol. No prerequisite ownership repositories, fake Gmail data path, policy versions, candidates, discovery completeness, attachments, review decisions, selections, or approvals exist. |
| Check for `package-lock.json` and `node_modules` | Both are absent. |
| `npm ci` | Failed with exit 1 (`EUSAGE`) because no `package-lock.json` or compatible shrinkwrap exists. npm also reported that it could not write its normal log outside the workspace. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |
| `git diff --check` | Passed with no whitespace errors before and after the milestone-009 documentation changes; a direct trailing-whitespace scan of the two milestone-009 documentation files also found none because the workspace documentation is currently untracked. |
| `node --version`; `npm --version`; `uname -s`; `uname -m` | Observed Node.js 24.19.0, npm 11.17.0, Darwin arm64. |

The npm failures establish that the local dependency-backed toolchain remains unavailable; they are
not reproduced defects in milestone-009 product code. No `npm install` was attempted because this
runner-dispatched task may not take over and complete its blocked prerequisite milestones.

## Required milestone-009 verification not performed

Because implementation is prohibited by the dependency gate and the local test tools are absent,
none of the required milestone verification ran:

- paginated sender/category review, reasons, protected/uncertain visibility, explicit keeps, bulk
  selection, and unambiguous select-page versus select-all-matching behavior;
- durable database-backed selection across pages and restarts without loading every selected ID in
  renderer memory, including filter changes, account switches, duplicate attachment parent
  messages, and newly discovered candidates that must remain unselected;
- transactional, exact, scoped approval materialization with bounded progress, rule version,
  keep decisions, scope, timestamp, stale UI revision rejection, and no partial executable state;
- invalidation after rule or selection changes, duplicate submits, mid-build interruptions, new
  candidates, cross-account identifiers, and proof that keeps or protected status cannot be
  bypassed and filter expressions cannot later expand an approved set;
- final customer/account/message-count/rule/date/time-zone/protection/Trash review, required
  retention and Vault acknowledgements for date cleanup, the limited recovery-period notice, and
  the attachment-parent consequence;
- distinct execution confirmation persisted against a still-valid approval, invalidation when that
  approval changes, and proof that launch/restart neither grants approval nor initiates cleanup;
- a complete simulated session-to-confirmation exercise, packaging, or interactive Electron UI
  inspection.

## Material assumptions and external gaps

- The prerequisite statuses are authoritative and agree with the inspected source. Implementing
  milestone 009 now would create parallel customer/account identity, rule-version, candidate,
  attachment-parent, and discovery-completeness models and would violate the runner's scheduling
  contract.
- Exact approval semantics require persisted candidate identities and immutable rule versions from
  milestones 006–007. Approval of attachment-originated choices also requires milestone 008's
  scoped parent-message identity and deduplication behavior. These cannot be safely approximated
  in a standalone milestone-009 schema.
- Previously observed npm registry DNS/network failure remains historical environment evidence.
  This run establishes only that the lockfile and installed toolchain are absent; registry access
  was not retested with `npm install` because prerequisite completion is outside this task.
- Google Cloud setup, owner consent, Workspace retention/Vault policy review, production OAuth
  verification, and separately authorized real-mailbox validation remain external gaps. They do
  not prevent eventual deterministic fake-provider and synthetic approval verification after the
  prerequisite milestones and local toolchain are complete. No legal determination about customer
  retention or Vault requirements was made.

## Resume steps

1. Restore npm dependency availability, create and preserve the lockfile, and complete every
   required milestone-001 verification with observed passing evidence.
2. Complete and verify milestone 002's durable scoped customer/session/account ownership model,
   milestone 003's deterministic Gmail provider/simulator and bounded data access, and milestone
   004's jobs, checkpoints, worker supervision, and scheduler.
3. Complete and verify milestone 005's secure Google/Gmail adapter boundary, milestone 006's
   immutable protection/rule versions, milestone 007's resumable candidate discovery and scope
   completion, and milestone 008's attachment-parent indexing and review contracts.
4. Re-dispatch milestone 009. Implement scoped review decisions and database-backed selection,
   bounded transactional approval materialization, validated IPC/preload/UI operations, final
   customer confirmation, and distinct execution intent against those established contracts.
5. Run and record every pagination/filter/restart, stale-state/interruption/invalidation,
   cross-account/protection/keep, late-candidate, exact-snapshot, confirmation, app-launch safety,
   simulated end-to-end, and full repository check required by the prompt. Do not mark milestone
   009 complete until all required verification passes.
