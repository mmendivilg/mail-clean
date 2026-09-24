---
id: "007"
title: "Resumable discovery, classification, and preview"
stage: "implement"
dependsOn: ["003", "004", "005", "006"]
tags: ["mail-clean", "scan", "preview"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Resumable discovery, classification, and preview

## Goal

Complete milestone 007: resumable discovery, classification, and preview. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 003 — Gmail simulator and bounded data access; 004 — Durable background jobs and request scheduling; 005 — Secure Google sign-in and Gmail integration; 006 — Protection rules, dates, and scope editor. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Discovery/classification jobs, candidate persistence/migrations, preview screens, and related IPC contracts.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-007.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Implement incremental, resumable message discovery.** Build discovery that persists IDs and necessary metadata per bounded page before advancing checkpoints. Deduplicate across repeats and restart from the query when a cursor becomes unusable. Capture the scan scope and rule version, expose incomplete discovery explicitly, and distinguish disappearing messages from request failures. Account for a changing mailbox: do not promise an atomic Gmail snapshot. Never mutate the mailbox while depending on its search pagination for this scan.

2. **Implement persisted classification and preview.** Evaluate discovered messages in bounded resumable batches and persist decisions, reasons, rule version, and eligible/protected/uncertain status. Build preview counts and representative samples per account/category, showing scan incompleteness and errors. Allow read-only browsing while work continues. Count unique messages and make unresolved totals explicit. Support reclassification as a new rule version without changing historical decisions or inheriting approvals.

## Verification

1. Inject crashes before/after page persistence and cursor saves, stale cursors, duplicate pages, empty pages, and message disappearance. Verify no discovered candidate is lost and no cleanup becomes executable until discovery for its selected scope is complete and required results are resolved.

2. Compare results with hand-verified fixtures covering every rule. Restart classification mid-batch and confirm deterministic deduplication. Verify preview triggers no mutation and new or reclassified candidates require new review.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-007.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `007` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-007.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
