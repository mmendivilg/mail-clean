---
id: "010"
title: "Approved Trash execution and crash recovery"
stage: "implement"
dependsOn: ["004", "005", "009"]
tags: ["mail-clean", "trash", "recovery"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Approved Trash execution and crash recovery

## Goal

Complete milestone 010: approved trash execution and crash recovery. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 004 — Durable background jobs and request scheduling; 005 — Secure Google sign-in and Gmail integration; 009 — Review queue and exact customer approvals. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Action journal/preflight/migrations, Gmail message mutation adapter, execution/reconciliation jobs, and related IPC contracts.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-010.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Implement the action journal and execution preflight.** Create durable per-message action intents and outcomes tied to immutable approval and confirmation. Before each mutation re-read relevant message state, verify account identity, scope, current protections, retained keep decisions, and rule version. Missing protection metadata or ambiguous state must block or skip safely. Capture original labels before sending a request and persist intent first. Define pending/sending/confirmed/skipped/failed/uncertain transitions and single-owner execution.

2. **Implement approved message-level Trash operations.** Implement Gmail users.messages.trash through the provider and scheduler, one explicitly tracked message outcome at a time with bounded concurrency. Never call thread Trash or permanent-delete endpoints. Keep discovery and destructive execution separated for the selected scan scope. Treat already-Trash messages and missing messages explicitly. Persist confirmed responses before reporting progress. Build and test the full execution path using fake Gmail only.

3. **Recover safely from interrupted or ambiguous cleanup.** Recover committed unfinished action intents after crashes or lost network responses. Re-read Gmail state before deciding whether an action succeeded, can be retried, or needs operator review. Account for external edits, including messages restored outside the app; state alone may not prove who changed a label. Preserve evidence and distinguish observed target state from confirmed app actions. Do not automatically retrash an externally restored message based on an old ambiguous intent. Bound reconciliation attempts.

## Verification

1. Prove no mutation is sent without a committed intent, current valid approval, and successful preflight. Test database write failure, new starred/protected status, removed messages, revoked approval, and concurrent starts. Original labels and skip reasons are preserved without fabricating success.

2. Verify only approved eligible IDs are changed, newer replies in a mixed-age thread remain intact, and repeated execute commands do not start duplicate workers. Simulate partial batch failure and lost responses; uncertain results must remain unresolved for reconciliation rather than being counted as confirmed.

3. Inject interruption before request, after remote success, before local acknowledgment, and during reconciliation. Test external restore/new protections/auth failure. Demonstrate recovery without lost approvals, repeated harmful actions, false attribution, or unbounded retries. Ambiguous cases remain visibly unresolved.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-010.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `010` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-010.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
