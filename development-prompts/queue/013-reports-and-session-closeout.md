---
id: "013"
title: "Reports, account disconnect, and session closeout"
stage: "implement"
dependsOn: ["005", "011", "012"]
tags: ["mail-clean", "reports", "closeout"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Reports, account disconnect, and session closeout

## Goal

Complete milestone 013: reports, account disconnect, and session closeout. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 005 — Secure Google sign-in and Gmail integration; 011 — Multiple mailboxes, operator controls, and restoration; 012 — Explicit attachment downloads from selection to results. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Report/export services/screens, disconnect/revocation services, purge/cache-removal workflow, and related IPC contracts.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-013.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Generate accurate session and cleanup reports.** Build an in-app report and bounded CSV plus printable HTML export for sessions and jobs. Include scope, rule/approval versions, counts, successes, skips, failures, unresolved outcomes, restoration status, and attachment downloads. Deduplicate message totals. Separate confirmed actions from observed remote state and estimates. Avoid secrets, message bodies, attachment content, and unsupported claims of reclaimed Gmail storage. Escape HTML and mitigate spreadsheet formula injection in CSV.

2. **Implement account disconnect and access revocation.** Build explicit disconnect controls that stop new work, settle or preserve in-flight outcomes, remove local token material, and offer Google access revocation. Consult official revocation semantics and explain any effect on other connections to the same Google app/account. Track failed remote revocation distinctly from completed local disconnect; direct operators to account access settings when needed without retaining credentials against their removal choice. Preserve historical reports unless separately purged.

3. **Implement explicit local cache and session-data removal.** Provide separate options for clearing reconstructible cache and removing a customer's retained local data/history. Show impact on reports and restoration before confirmation. Stop relevant jobs, scope deletion across database/files/log references, and remove token references as required. Distinguish downloaded/exported operator files from managed cache and leave them unless explicitly selected. Handle WAL and application backups according to the documented retention policy; do not claim forensic secure erasure.

## Verification

1. Reconcile report totals against action journal fixtures including partial cleanup and restoration. Test large export, escaping, Unicode, cancellation, and redaction. Label remaining uncertainty and recovery limits without promising that all trashed messages will remain available for an exact future interval.

2. Test offline revoke, expired credentials, repeated disconnect, multi-account sessions, and disconnect during execution. No new account request is scheduled after disconnect begins. Never report successful remote revocation when only local tokens were removed.

3. Use temporary synthetic storage to test customer isolation, interrupted purge recovery, active jobs, backups, and files outside managed directories. Verify removing one customer never removes another's data. The unattended run must not purge any real user data.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-013.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `013` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-013.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
