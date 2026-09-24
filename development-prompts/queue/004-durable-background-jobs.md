---
id: "004"
title: "Durable background jobs and request scheduling"
stage: "implement"
dependsOn: ["001", "002", "003"]
tags: ["mail-clean", "jobs", "recovery"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Durable background jobs and request scheduling

## Goal

Complete milestone 004: durable background jobs and request scheduling. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 001 — Architecture and secure desktop foundation; 002 — Durable database and customer sessions; 003 — Gmail simulator and bounded data access. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Job engine/state storage, worker lifecycle, request scheduler, migrations and IPC contracts required by those features.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-004.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Implement durable job state and checkpoints.** Define legal transitions for queued, running, paused, needs-auth, retryable-failure, cancelled, failed, and completed work, including scan subphases. Persist checkpoints, attempts, job configuration snapshots, and work-item outcomes. Add transactional claims or equivalent single-owner protection, restart-safe ownership recovery, and idempotent job commands. Treat cancellation as stopping future units while preserving completed work. Support durable fake work before connecting live Gmail.

2. **Run jobs in a supervised utility process.** Start and supervise an Electron utility process that owns database operations and the job engine. Add bounded command/event transport, worker readiness, graceful shutdown, crash detection, and controlled restart. Coalesce progress updates to avoid overwhelming the UI. Ensure application/worker singleton rules prevent duplicate execution. Reconcile job ownership before starting recovered work. Keep testable worker code independent of an interactive renderer.

3. **Implement request budgets, timeouts, and retry scheduling.** Create a shared request scheduler with bounded global and per-account concurrency, quota-aware configurable budgets, request timeouts, exponential backoff with jitter, and supported server retry guidance. Persist delayed retries and cap attempts and elapsed retry time. Classify errors using structured Gmail reasons where available; separate auth, transient, permission, missing-resource, and permanent failures. Pause only affected accounts for account-specific conditions.

## Verification

1. Test allowed and rejected transitions, duplicate starts, repeated cancellation, restart after checkpoint commits, and interrupted ownership. Prove a job cannot be reported complete while required work remains and cannot silently continue after durable storage fails.

2. Kill the worker during simulated work and prove persisted progress is recovered without duplicate ownership. Verify the UI remains responsive while processing pages, shutdown has a bounded timeout, and repeated worker crashes surface a useful state instead of an endless restart loop.

3. Use a fake clock to test throttling, timeouts, retry persistence, cancellation during backoff, fairness, and exhaustion into a visible unresolved queue. Assert no tight retry loops and document the chosen default budgets without claiming measured production capacity.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-004.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `004` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-004.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
