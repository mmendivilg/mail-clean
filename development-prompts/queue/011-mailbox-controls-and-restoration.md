---
id: "011"
title: "Multiple mailboxes, operator controls, and restoration"
stage: "implement"
dependsOn: ["004", "007", "010"]
tags: ["mail-clean", "mailboxes", "restoration"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Multiple mailboxes, operator controls, and restoration

## Goal

Complete milestone 011: multiple mailboxes, operator controls, and restoration. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 004 — Durable background jobs and request scheduling; 007 — Resumable discovery, classification, and preview; 010 — Approved Trash execution and crash recovery. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Multi-account scheduling, operator dashboard/controls, restoration services/storage/screens, and related IPC contracts.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-011.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Coordinate multiple mailbox jobs fairly.** Integrate account-aware queues for discovery, classification, attachment indexing, cleanup, and reconciliation. Bound global memory, API concurrency, and per-account work; prevent conflicting scans/mutations from invalidating discovery. Let unrelated authorized accounts continue when one needs login or throttles. Preserve each job's customer identity independently of the active screen. Document safe ordering for attachment scans and cleanup affecting the same scope.

2. **Build job progress, pause, resume, cancel, and retry controls.** Build a job dashboard showing phase, processed/pending/skipped/failed/uncertain counts, last activity, scope completion, and clearly qualified estimates. Wire durable pause/resume/cancel and explicit unresolved-item retry commands. Explain that cancellation preserves completed actions and that local work pauses during computer sleep/shutdown. Refresh from persisted state after reconnecting to the worker and display needs-auth or low-resource states distinctly.

3. **Implement tracked message restoration.** Implement review and explicit approval of restoration for messages associated with confirmed or appropriately reconciled app cleanup. Recheck availability and current state, journal restore intent, call message-level untrash, and conservatively restore applicable app-removed labels without blindly overwriting subsequent customer edits. Distinguish historical original labels from current truth. Explain expired/missing/already-restored/uncertain cases and record per-message outcomes. Use the same recovery model for uncertain restores.

## Verification

1. Run at least three synthetic accounts with one revoked, one throttled, and one healthy. Verify fair progress, no cross-customer records, no double claims, and correct pause/resume after restart. Record chosen concurrency and queue limits.

2. Verify pause and cancellation stop scheduling at work-unit boundaries, in-flight outcomes are recorded, and resumption respects valid approvals. Test UI reconnection, stale commands, exhausted retries, and unknown totals without misleading percentages or countdowns.

3. Test mixed success, message expiry, renamed/deleted labels, external label changes, externally restored messages, and crash after untrash. Do not claim complete label restoration without verification or retry a stale restore that would override newer user intent. No real mailbox is modified during testing.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-011.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `011` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-011.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
