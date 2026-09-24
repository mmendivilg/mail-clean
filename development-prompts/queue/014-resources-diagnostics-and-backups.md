---
id: "014"
title: "Resource limits, diagnostics, and database backups"
stage: "harden"
dependsOn: ["002", "008", "011", "012", "013"]
tags: ["mail-clean", "resources", "diagnostics"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Resource limits, diagnostics, and database backups

## Goal

Complete milestone 014: resource limits, diagnostics, and database backups. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 002 — Durable database and customer sessions; 008 — Attachment metadata and largest-attachment review; 011 — Multiple mailboxes, operator controls, and restoration; 012 — Explicit attachment downloads from selection to results; 013 — Reports, account disconnect, and session closeout. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Resource controls, diagnostics/redaction, database backup/migration recovery, and related configuration and operator interfaces.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-014.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Harden disk, cache, and memory limits.** Implement low-disk checks before batches/downloads/exports, bounded caches, safe temp cleanup, WAL monitoring/checkpoint policy, and explicit resource-paused states. Keep durable approvals/journals outside disposable cache policy. Use short transactions and ensure long-lived readers do not grow WAL indefinitely. Define limits in configuration and expose operator-readable recovery instructions. Pause before issuing mutations if intent/outcome durability cannot be maintained.

2. **Add bounded, privacy-preserving diagnostics.** Add structured rotating logs, correlation IDs, performance counters, and an operator-triggered diagnostic export. Use an allowlist of diagnostic fields; omit tokens, OAuth codes, bodies, attachment bytes, and personal headers by default. Capture job phase, error class, retries, worker restarts, resource use, and schema/app version. Make instrumentation cheap and bounded and retain helpful diagnostics after a worker failure.

3. **Validate database upgrades and consistent local backups.** Implement a consistent SQLite backup strategy using supported backup APIs, schema version checks, migration backups where appropriate, and clear restore behavior. Keep sensitive backups subject to documented retention/purge rules and never silently include secrets. Do not copy a live WAL database file as a supposedly complete backup. Detect unsupported downgrade and corrupted files and preserve evidence rather than destructively recreating the database.

## Verification

1. Inject disk-full and durable-write failures at discovery, approval, intent, and acknowledgment boundaries. Verify no unjournaled mutation begins, uncertain in-flight work is reconciled, and cleanup never deletes approval/history evidence to free space. Measure memory/cache behavior with large synthetic pages.

2. Seed sensitive canaries into fixture headers/tokens/errors and assert they do not appear in logs or diagnostic bundles. Test log rotation, failing log writes, restart correlation, and bounded export. Logging failure must not hide a failure to persist essential job state.

3. Test prior-version migration, failed migration recovery, backup during active simulated work, restore consistency, disk exhaustion, and newer-schema refusal. Confirm restored approvals cannot automatically re-execute historical actions without remote-state reconciliation and explicit current execution context.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-014.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `014` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-014.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
