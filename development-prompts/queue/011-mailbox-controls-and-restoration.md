# Prompt 011: Multiple mailboxes, operator controls, and restoration

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 004, 007, 010.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Coordinate multiple mailbox jobs fairly

Integrate account-aware queues for discovery, classification, attachment indexing, cleanup, and reconciliation. Bound global memory, API concurrency, and per-account work; prevent conflicting scans/mutations from invalidating discovery. Let unrelated authorized accounts continue when one needs login or throttles. Preserve each job's customer identity independently of the active screen. Document safe ordering for attachment scans and cleanup affecting the same scope.

### 2. Build job progress, pause, resume, cancel, and retry controls

Build a job dashboard showing phase, processed/pending/skipped/failed/uncertain counts, last activity, scope completion, and clearly qualified estimates. Wire durable pause/resume/cancel and explicit unresolved-item retry commands. Explain that cancellation preserves completed actions and that local work pauses during computer sleep/shutdown. Refresh from persisted state after reconnecting to the worker and display needs-auth or low-resource states distinctly.

### 3. Implement tracked message restoration

Implement review and explicit approval of restoration for messages associated with confirmed or appropriately reconciled app cleanup. Recheck availability and current state, journal restore intent, call message-level untrash, and conservatively restore applicable app-removed labels without blindly overwriting subsequent customer edits. Distinguish historical original labels from current truth. Explain expired/missing/already-restored/uncertain cases and record per-message outcomes. Use the same recovery model for uncertain restores.

## Acceptance and verification

1. Run at least three synthetic accounts with one revoked, one throttled, and one healthy. Verify fair progress, no cross-customer records, no double claims, and correct pause/resume after restart. Record chosen concurrency and queue limits.

2. Verify pause and cancellation stop scheduling at work-unit boundaries, in-flight outcomes are recorded, and resumption respects valid approvals. Test UI reconnection, stale commands, exhausted retries, and unknown totals without misleading percentages or countdowns.

3. Test mixed success, message expiry, renamed/deleted labels, external label changes, externally restored messages, and crash after untrash. Do not claim complete label restoration without verification or retry a stale restore that would override newer user intent. No real mailbox is modified during testing.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
