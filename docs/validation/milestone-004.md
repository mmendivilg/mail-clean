# Milestone 004 validation — durable background jobs and request scheduling

Date: 2026-09-24

## Completion assessment

Milestone 004 is **blocked and incomplete**. Its required dependencies—milestones 001, 002, and
003—are all recorded as blocked. Inspection confirms that this is current: the workspace lacks the
durable customer/session/account schema from milestone 002 and the Gmail simulator/data layer from
milestone 003. The task explicitly says a failed or incomplete required dependency must not be
bypassed, so no milestone-004 job engine, utility-process owner, or request scheduler was added.

## Dependency evidence and observed checks

All checks were run from the workspace root and used no credentials, mailbox content, attachment
content, or customer data.

| Command/check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision documents, and prior validation reports | Confirmed the dependency rule and that milestones 001–003 remain incomplete. |
| Check for `package-lock.json` and `node_modules` | Both are absent. The dependency-backed toolchain and Electron runtime are unavailable. |
| Inspect `src/`, `tests/`, status, and validation documents for job/scheduler/utility-process implementation | Found only foundation UI/protocol placeholders; no durable jobs schema/repository, scoped work items, request scheduler, utility-process supervisor, or milestone-004 tests exist. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |

These failures are environment/dependency and prerequisite gaps, not successful product
verification and not reproduced defects in a milestone-004 implementation.

## Required verification not performed

Because implementation was prohibited by the dependency gate and the test toolchain is unavailable,
none of the required milestone-004 verification was performed:

- allowed/rejected transitions, duplicate starts, idempotent cancellation, checkpoint restart,
  interrupted ownership, incomplete-work completion guards, and durable-write failure stopping;
- worker termination and recovery without duplicate ownership, renderer responsiveness during page
  processing, bounded shutdown, and a surfaced terminal state after repeated worker crashes;
- fake-clock throttling, request timeouts, durable retries, cancellation during backoff, global and
  per-account fairness, supported server retry guidance, retry exhaustion, and absence of tight loops;
- packaging or interactive Electron validation of the utility-process lifecycle and UI progress.

No production-capacity claim is made. The existing architecture's defaults (four requests globally,
two per account, 30-second timeout, and five transient attempts) remain design constraints only and
have not been measured or validated by this milestone.

## Material assumptions and external gaps

- The dependency status is authoritative and agrees with the source: implementing jobs without the
  missing scoped ownership and provider contracts would create a parallel or weakened foundation.
- npm registry DNS/network access was the previously observed immediate external blocker. It was not
  retried here because this task may not take over incomplete milestone 001–003 work; the continuing
  absence of installed dependencies and a lockfile is directly observable.
- Google Cloud configuration, OAuth credentials, and a live mailbox are not required for the fake
  job/scheduler implementation. Live Gmail validation remains a separately authorized future gap.

## Resume steps

1. Restore npm dependency availability and complete all required milestone-001 verification,
   including the lockfile, full automated gates, package, and desktop launch checks.
2. Complete and verify milestone 002's durable scoped customer/session/account database and
   ownership paths.
3. Complete and verify milestone 003's deterministic Gmail simulator, account-scoped provider/data
   contracts, bounded pagination, and scale checks.
4. Re-dispatch milestone 004. Implement its durable state machine/checkpoints/work items, ownership
   leases and recovery, supervised singleton utility process, bounded/coalesced transport, and
   account-aware request scheduler with persistent bounded retries.
5. Run and record every required transition, storage-failure, crash-recovery, responsiveness,
   shutdown, retry/fairness, and unresolved-queue check before marking milestone 004 complete.
