# Prompt 014: Resource limits, diagnostics, and database backups

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 002, 008, 011, 012, 013.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Harden disk, cache, and memory limits

Implement low-disk checks before batches/downloads/exports, bounded caches, safe temp cleanup, WAL monitoring/checkpoint policy, and explicit resource-paused states. Keep durable approvals/journals outside disposable cache policy. Use short transactions and ensure long-lived readers do not grow WAL indefinitely. Define limits in configuration and expose operator-readable recovery instructions. Pause before issuing mutations if intent/outcome durability cannot be maintained.

### 2. Add bounded, privacy-preserving diagnostics

Add structured rotating logs, correlation IDs, performance counters, and an operator-triggered diagnostic export. Use an allowlist of diagnostic fields; omit tokens, OAuth codes, bodies, attachment bytes, and personal headers by default. Capture job phase, error class, retries, worker restarts, resource use, and schema/app version. Make instrumentation cheap and bounded and retain helpful diagnostics after a worker failure.

### 3. Validate database upgrades and consistent local backups

Implement a consistent SQLite backup strategy using supported backup APIs, schema version checks, migration backups where appropriate, and clear restore behavior. Keep sensitive backups subject to documented retention/purge rules and never silently include secrets. Do not copy a live WAL database file as a supposedly complete backup. Detect unsupported downgrade and corrupted files and preserve evidence rather than destructively recreating the database.

## Acceptance and verification

1. Inject disk-full and durable-write failures at discovery, approval, intent, and acknowledgment boundaries. Verify no unjournaled mutation begins, uncertain in-flight work is reconciled, and cleanup never deletes approval/history evidence to free space. Measure memory/cache behavior with large synthetic pages.

2. Seed sensitive canaries into fixture headers/tokens/errors and assert they do not appear in logs or diagnostic bundles. Test log rotation, failing log writes, restart correlation, and bounded export. Logging failure must not hide a failure to persist essential job state.

3. Test prior-version migration, failed migration recovery, backup during active simulated work, restore consistency, disk exhaustion, and newer-schema refusal. Confirm restored approvals cannot automatically re-execute historical actions without remote-state reconciliation and explicit current execution context.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
