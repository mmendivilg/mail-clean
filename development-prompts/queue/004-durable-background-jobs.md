# Prompt 004: Durable background jobs and request scheduling

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 001, 002, 003.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Implement durable job state and checkpoints

Define legal transitions for queued, running, paused, needs-auth, retryable-failure, cancelled, failed, and completed work, including scan subphases. Persist checkpoints, attempts, job configuration snapshots, and work-item outcomes. Add transactional claims or equivalent single-owner protection, restart-safe ownership recovery, and idempotent job commands. Treat cancellation as stopping future units while preserving completed work. Support durable fake work before connecting live Gmail.

### 2. Run jobs in a supervised utility process

Start and supervise an Electron utility process that owns database operations and the job engine. Add bounded command/event transport, worker readiness, graceful shutdown, crash detection, and controlled restart. Coalesce progress updates to avoid overwhelming the UI. Ensure application/worker singleton rules prevent duplicate execution. Reconcile job ownership before starting recovered work. Keep testable worker code independent of an interactive renderer.

### 3. Implement request budgets, timeouts, and retry scheduling

Create a shared request scheduler with bounded global and per-account concurrency, quota-aware configurable budgets, request timeouts, exponential backoff with jitter, and supported server retry guidance. Persist delayed retries and cap attempts and elapsed retry time. Classify errors using structured Gmail reasons where available; separate auth, transient, permission, missing-resource, and permanent failures. Pause only affected accounts for account-specific conditions.

## Acceptance and verification

1. Test allowed and rejected transitions, duplicate starts, repeated cancellation, restart after checkpoint commits, and interrupted ownership. Prove a job cannot be reported complete while required work remains and cannot silently continue after durable storage fails.

2. Kill the worker during simulated work and prove persisted progress is recovered without duplicate ownership. Verify the UI remains responsive while processing pages, shutdown has a bounded timeout, and repeated worker crashes surface a useful state instead of an endless restart loop.

3. Use a fake clock to test throttling, timeouts, retry persistence, cancellation during backoff, fairness, and exhaustion into a visible unresolved queue. Assert no tight retry loops and document the chosen default budgets without claiming measured production capacity.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
