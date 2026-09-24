---
id: "015"
title: "Operator usability and failure regression testing"
stage: "verify"
dependsOn: ["006", "008", "009", "010", "011", "012", "013", "014"]
tags: ["mail-clean", "accessibility", "fault-testing"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Operator usability and failure regression testing

## Goal

Complete milestone 015: operator usability and failure regression testing. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 006 — Protection rules, dates, and scope editor; 008 — Attachment metadata and largest-attachment review; 009 — Review queue and exact customer approvals; 010 — Approved Trash execution and crash recovery; 011 — Multiple mailboxes, operator controls, and restoration; 012 — Explicit attachment downloads from selection to results; 013 — Reports, account disconnect, and session closeout; 014 — Resource limits, diagnostics, and database backups. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Operator screens/components/styles/accessibility, integration fault harnesses, and application modules with reproduced defects found during these checks.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-015.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Review and improve the complete operator interface.** Review all existing screens as one coherent on-site workflow. Improve navigation, session/account context, keyboard access, focus management, labels, contrast, table semantics, empty/loading/error states, and readable counts. Preserve bounded rendering and clear incomplete/unknown labels. Ensure confirmation dialogs explain concrete effects and simulated mode remains visually distinct. Use accessible established components and avoid cosmetic changes to backend semantics.

2. **Build the cross-layer fault-injection regression suite.** Create reusable integration tests that interrupt discovery, approval snapshot creation, cleanup, restoration, downloads, and migration at persistence/network boundaries. Exercise stale cursors, throttling, sleep-like interruption, worker death, expired authorization, low disk, and externally changed messages. Test real database/worker paths with fake Gmail, deterministic seeds, and bounded test time. Fix defects found within this scope and add regression coverage.

## Verification

1. Complete a keyboard-driven simulated session from connection through report and disconnect. Check long senders/subjects, narrow windows, large tables, and interruption states. Capture relevant screenshots when the environment supports them and record any visual verification gaps honestly.

2. Verify no lost approvals, skipped discovered candidates, cross-customer leakage, unapproved mutations, or harmful duplicate actions across the failure matrix. Report exact scenarios and outcomes, separating simulated evidence from untested real Google behavior.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-015.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `015` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-015.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
