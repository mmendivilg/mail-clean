# Milestone 010 validation — approved Trash execution and crash recovery

Date: 2026-09-24

Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Completion assessment

Milestone 010 is **blocked and incomplete**. Its declared dependencies—milestones 004, 005, and
009—are all recorded as blocked. Direct source inspection confirms that the statuses reflect
material implementation gaps: the workspace has no durable customer/session/account model, Gmail
provider or simulator, job owner or request scheduler, immutable protection rules, completed
discovery/candidate set, exact approval snapshot, or execution confirmation.

The task and shared runner instructions prohibit bypassing a failed or incomplete dependency.
Therefore no action-journal migration, mutation preflight, Gmail Trash operation, execution or
reconciliation job, IPC contract, fixture, or milestone-010 product test was added. Creating those
against the foundation-only scaffold would introduce a second ownership and provider architecture
and could not meet the required safety proofs. No implementation or verification success is
claimed.

## Dependency evidence and observed checks

All commands were run from the configured workspace root. No credentials, tokens, mailbox data,
attachment content, customer data, network mailbox calls, or remote mutations were used.

| Command/check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision/requirement documents, and milestone 004, 005, and 009 validation reports | Confirmed that each direct dependency is incomplete and that the control-plane contract requires stopping at the dependency gate. |
| Inspect `src/`, `tests/`, package configuration, schema, IPC, preload, renderer, worker, and dependency/status evidence | Found `foundation_metadata`, simulated `foundation:get-status`, static shell copy, and a computation-only worker request. Searches found no action journal, provider, scheduler, policy/candidate store, approval/confirmation record, or Gmail mutation path. |
| Check for `package-lock.json` and `node_modules` | Both are absent. |
| `npm ci` | Failed with exit 1 (`EUSAGE`) because no `package-lock.json` or compatible shrinkwrap exists. npm also reported that it could not write its normal log outside the workspace. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |
| `git diff --check` before and after documentation changes; direct trailing-whitespace scan of the two milestone-010 documentation files | Passed with no whitespace errors. The direct scan covers the currently untracked documentation that Git does not include in its diff. |
| `node --version`; `npm --version`; `uname -s`; `uname -m` | Observed Node.js 24.19.0, npm 11.17.0, Darwin arm64. |

The npm failures establish that the local dependency-backed toolchain is unavailable; they are not
reproduced defects in milestone-010 product code. No `npm install` was attempted because completing
the blocked prerequisite milestones is outside this runner-dispatched task.

## Required milestone-010 verification not performed

Because implementation is prohibited by the dependency gate and the local test tools are absent,
none of the required milestone verification ran:

- committed per-message intent and original-label capture before every mutation, immutable
  approval and confirmation linkage, current account/scope/protection/keep/rule-version preflight,
  safe handling of missing or ambiguous metadata, state transitions, or single-owner execution;
- database-write failure, newly starred or protected messages, removed messages, revoked approval,
  concurrent starts, preserved skip reasons, and proof that no success is fabricated;
- individual `users.messages.trash` scheduling with bounded concurrency, explicit already-Trash and
  missing-message outcomes, persisted confirmation before progress, and proof that no thread Trash
  or permanent-delete endpoint is reachable;
- exact approved-ID enforcement, mixed-age thread behavior preserving newer replies, duplicate
  execute-command suppression, partial batch failure, and lost-response handling that remains
  uncertain instead of being counted as confirmed;
- interruption before request, after remote success, before local acknowledgment, and during
  reconciliation; bounded retries after restart; authorization failure; and recovery of committed
  unfinished intents;
- external restore, new protections, ambiguous label state, observed-versus-attributed outcome
  evidence, and proof that an old ambiguous intent never automatically retrashes a restored message;
- packaging, interactive Electron validation, or deterministic fake-Gmail end-to-end execution.

No claims are made about cleanup correctness, crash recovery, remote attribution, concurrency,
retry bounds, or production capacity.

## Material assumptions and external gaps

- The prerequisite statuses are authoritative and agree with the source. Milestone 010 cannot
  safely define action ownership or validate approvals until milestones 004, 005, and 009 supply
  the scheduler, provider, protection/candidate, and immutable approval/confirmation contracts.
- The absent lockfile and installed dependencies prevent even baseline repository verification.
  Previously recorded registry/DNS failure is historical evidence; this run did not retest registry
  access with `npm install` because taking over dependency work is outside this task.
- Google Cloud project setup, Gmail API enablement, OAuth client configuration, owner consent,
  Workspace administrator policy, production OAuth verification/security assessment, retention and
  Vault review, and separately authorized real-mailbox validation remain external gaps. These do
  not block later fake-provider and synthetic interruption tests once prerequisites are complete.
- No real Google account was connected and no mailbox read, Trash request, permanent deletion,
  thread mutation, or attachment download was attempted.

## Resume steps

1. Restore npm dependency availability, create and preserve the lockfile, and complete all required
   milestone-001 verification.
2. Complete and verify milestones 002–003 so scoped ownership and the deterministic Gmail provider
   contract exist, then complete milestone 004's durable jobs, work ownership, recovery, and
   account-aware scheduler.
3. Complete and verify milestones 005–009, including the Gmail adapter boundary, immutable
   protections/rules, completed candidate discovery, attachment-parent identity, exact approvals,
   keep decisions, and distinct execution confirmation.
4. Re-dispatch milestone 010. Implement the durable action journal and preflight first, followed by
   scheduler-owned individual-message Trash execution and bounded evidence-preserving reconciliation.
5. Run every required write-failure, protection/approval change, missing-message, concurrent-start,
   partial-failure, lost-response, interruption, external-restore, auth-failure, mixed-thread, and
   retry-bound scenario using deterministic fake Gmail. Run the full repository gates and record
   actual passing results before marking the milestone complete.
