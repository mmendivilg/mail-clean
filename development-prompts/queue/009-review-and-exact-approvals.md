---
id: "009"
title: "Review queue and exact customer approvals"
stage: "implement"
dependsOn: ["003", "006", "007", "008"]
tags: ["mail-clean", "approval", "review"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Review queue and exact customer approvals

## Goal

Complete milestone 009: review queue and exact customer approvals. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 003 — Gmail simulator and bounded data access; 006 — Protection rules, dates, and scope editor; 007 — Resumable discovery, classification, and preview; 008 — Attachment metadata and largest-attachment review. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Review screens and queries, approval/confirmation storage/migrations, and related IPC contracts.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-009.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Build the persisted message review queue.** Implement paginated review with sender/category grouping, reasons, protected/uncertain visibility, explicit keep decisions, and bulk selection. Make select-page versus select-all-matching scope unambiguous. Persist review decisions and support attachment-originated selection by parent message ID. Preserve selection across pages without loading all IDs in renderer memory. Review may continue during discovery, but new arrivals are not automatically selected or approved.

2. **Implement exact, durable cleanup approvals.** Create an explicit approval operation that transactionally captures exact reviewed message IDs, account/session, rule version, keep decisions, scope, and approval time. Use bounded database operations to materialize large selections and expose approval-building progress without partial executable approvals. Reject stale UI revisions and invalidate pending approval on relevant rule/selection changes. New discoveries always require separate review. Keep approval separate from execution.

3. **Build the customer confirmation and execution review flow.** Add a concise final review showing customer, accounts, exact approved unique-message count, rules, date/time zone, protections, and Trash behavior. For date cleanup record confirmation of customer retention requirements and Vault considerations without making legal determinations. Include the limited recovery period and attachment-parent consequence. Require a distinct operator action to execute a valid approval; persist the confirmation with that approval. Keep the interface understandable and avoid implementation jargon.

## Verification

1. Test selection across pages, filter changes, duplicate parent messages, kept messages, account switches, and restarting the app. Selection and counts must match the displayed scope; incomplete scans remain clearly labeled and cannot silently grant executable approval.

2. Test stale selections, mid-approval interruption, changing rules, duplicate submit, new candidates, and cross-account identifiers. Prove a partial approval snapshot cannot execute, a keep decision cannot be bypassed, and filter expressions cannot later expand an already approved set.

3. Exercise the full simulated session-to-confirmation flow. Verify changing approval invalidates the final confirmation, protected messages cannot be included through the UI, and launching/restarting the application never grants approval or initiates a new cleanup automatically.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-009.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `009` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-009.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
