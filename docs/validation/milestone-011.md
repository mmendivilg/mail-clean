# Milestone 011 validation — multiple mailboxes, operator controls, and restoration

Date: 2026-09-24

Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Completion assessment

Milestone 011 is **blocked and incomplete**. Its declared dependencies—milestones 004, 007, and
010—are all recorded as blocked. Direct source inspection confirms material implementation gaps:
the workspace has no durable customer/session/account repository, Gmail provider or simulator,
job/work-item store, account-aware request scheduler, resumable discovery or candidate set, exact
approval snapshot, cleanup action journal, mutation outcome evidence, or reconciliation engine.

The task and shared runner instructions prohibit bypassing a failed or incomplete dependency.
Therefore no multi-account coordinator, job-control contract, operator dashboard, restoration
journal, Gmail untrash operation, fixture, or milestone-011 product test was added. Creating these
against the foundation-only scaffold would introduce a parallel ownership and recovery architecture
and could not establish whether a message was app-cleaned or whether later customer label changes
must be preserved. No implementation or verification success is claimed.

## Dependency evidence and observed checks

All commands were run from the configured workspace root. No credentials, tokens, mailbox data,
attachment content, customer data, network mailbox calls, or remote mutations were used.

| Command/check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision/requirement documents, and milestone 004, 007, and 010 validation reports | Confirmed that every direct dependency is incomplete and the control-plane contract requires stopping at the dependency gate. |
| Inspect `src/`, `tests/`, package configuration, schema, IPC, preload, renderer, worker, and dependency/status evidence | Found only `foundation_metadata`, simulated `foundation:get-status`, static shell copy, and a computation-only worker request. Searches found no durable scoped mailbox records, work claims, scheduler, candidate/approval store, cleanup action journal, provider mutation, reconciliation, job-control, or restoration path. |
| Check for `package-lock.json` and `node_modules` | Both are absent. |
| `npm ci` | Failed with exit 1 (`EUSAGE`) because no `package-lock.json` or compatible shrinkwrap exists. npm also reported that it could not write its normal log outside the workspace. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |
| `git diff --check`; direct trailing-whitespace scan of the milestone-011 status and validation documentation | Passed with no whitespace errors. The direct scan covers the currently untracked documentation that Git does not include in its diff. |
| `node --version`; `npm --version`; `uname -s`; `uname -m` | Observed Node.js 24.19.0, npm 11.17.0, Darwin arm64. |

These failures establish that the dependency-backed toolchain remains unavailable; they are not
reproduced defects in milestone-011 product code. No `npm install` was attempted because installing
and verifying the foundation belongs to the blocked prerequisite sequence, not this dispatched task.

## Required milestone-011 verification not performed

Because implementation is prohibited by the dependency gate and the local test tools are absent,
none of the required verification ran:

- three synthetic accounts with revoked, throttled, and healthy authorization; fair work progress,
  isolation of customer/session/account/message records, duplicate-claim prevention, and
  pause/resume after restart;
- account-independent discovery, classification, attachment indexing, cleanup, and reconciliation,
  including serialization of conflicting scans and mutations and safe attachment-scan/cleanup
  ordering for the same scope;
- pause and cancellation at work-unit boundaries, recording of in-flight outcomes, preservation of
  completed actions, and resumption only with approvals that remain valid;
- persisted dashboard refresh after worker/UI reconnection; scoped phase, processed, pending,
  skipped, failed, and uncertain counts; last activity; scope completion; needs-auth and
  low-resource states; stale commands; exhausted retries; and unknown totals without fabricated
  percentages or countdowns;
- restoration review and exact approval, current-state and availability preflight, committed restore
  intent before message-level untrash, and per-message confirmed, skipped, failed, expired, missing,
  already-restored, or uncertain outcomes;
- mixed restoration success, message expiry, renamed or deleted labels, external label changes,
  externally restored messages, a crash after untrash, bounded uncertain-restore reconciliation,
  and proof that stale restoration does not overwrite newer user intent;
- packaging or interactive Electron inspection of the operator dashboard and restoration screens.

The architecture document currently names design constraints of four concurrent Gmail requests
application-wide, two per account, work/worker batches of at most 100 messages, five transient
attempts, and a 30-second default request timeout. They are not an implemented milestone-011 queue,
were not exercised here, and are not a capacity claim. No additional runtime queue limit was chosen
or validated because the prerequisite scheduler does not exist.

## Material assumptions and external gaps

- The direct dependency statuses are authoritative and agree with source inspection. Milestone 011
  cannot safely coordinate or restore work until milestone 004 defines durable claims and fair
  scheduling, milestone 007 supplies scoped completed discovery/candidate records, and milestone
  010 supplies cleanup attribution and evidence-preserving uncertain-outcome recovery.
- Cancellation must eventually stop new scheduling between durable work units while preserving
  recorded in-flight and completed outcomes; it is not an undo operation. Local jobs cannot run
  while the computer is asleep or shut down. These remain documented requirements, not observed
  behavior in this blocked run.
- Historical original labels are evidence of pre-cleanup state, not current truth. The eventual
  restoration flow must compare current remote state and restore only attributable app-removed
  labels without treating renamed/deleted labels or later customer edits as safe to overwrite.
- The absent lockfile and installed dependencies prevent baseline repository verification.
  Previously recorded registry/DNS failure is historical evidence; registry access was not retested
  because taking over prerequisite implementation is outside this task.
- Google Cloud project setup, Gmail API enablement, OAuth client configuration, owner consent,
  Workspace administrator policy, production verification/security assessment, retention and Vault
  review, and separately authorized live-mailbox validation remain external gaps. They do not block
  eventual fake-provider tests after the prerequisites are complete.
- No real Google account was connected and no mailbox read, Trash/untrash request, permanent
  deletion, label mutation, thread mutation, or attachment download was attempted.

## Resume steps

1. Restore dependency availability, create and preserve the lockfile, and complete all required
   milestone-001 verification.
2. Complete and verify milestones 002–003 so durable scoped mailbox ownership and the deterministic
   Gmail provider exist, then complete milestone 004's job store, work ownership, crash recovery,
   and fair account-aware request scheduler.
3. Complete and verify milestones 005–007, including account authorization states, immutable rules,
   resumable discovery, candidate persistence, and trustworthy scope completion.
4. Complete and verify milestones 008–010, including attachment-parent identity, exact approvals,
   execution confirmation, message-level Trash intents/outcomes, and uncertain cleanup
   reconciliation.
5. Re-dispatch milestone 011. Extend the established scheduler for the five job classes and
   conflict rules; add ownership-checked durable controls and progress queries; then add exact
   restoration approvals, intents, message-level untrash, conservative label restoration, and
   uncertain-restore recovery through validated IPC/preload/UI paths.
6. Run every required synthetic three-account, fairness/isolation, lifecycle/restart, stale-command,
   unknown-total, retry-exhaustion, mixed-restore, expiry, external-edit, and crash-boundary scenario.
   Run all repository gates and record actual passing results before marking milestone 011 complete.
