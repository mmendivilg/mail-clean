---
id: "003"
title: "Gmail simulator and bounded data access"
stage: "implement"
dependsOn: ["002"]
tags: ["mail-clean", "gmail", "fixtures"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Gmail simulator and bounded data access

## Goal

Complete milestone 003: gmail simulator and bounded data access. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 002 — Durable database and customer sessions. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Gmail provider contracts, fake providers/fixture generators, bounded repositories, and their IPC contracts.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-003.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Build a deterministic Gmail simulator and adapter contract.** Define a Gmail provider interface for listing IDs, metadata/structure reads, state inspection, Trash, restore, and explicit attachment retrieval. Implement a deterministic fake with seedable large datasets, multiple accounts, mixed-age threads, changing labels, MIME trees, missing messages, and duplicate pages. Add controllable invalid cursors, throttling, lost responses, auth expiry, and external mailbox changes. Keep fixture generation lazy and bounded. Mark provider mode in persisted records and UI; prevent simulated jobs from switching to real accounts.

2. **Implement paginated repositories and bounded UI queries.** Build worker-owned repository methods for messages, candidates, attachment rows, and jobs with stable cursor pagination, indexed filtering, bounded page sizes, and deterministic tie-breaking. Use database aggregation for counts. Preserve account/session scope in every query. Define explicit unknown/estimated/complete count fields. Stream or page exports and bulk processing instead of returning unbounded arrays.

## Verification

1. Contract tests prove stable message identity and deterministic faults. Assert that scans never call attachment-content retrieval. Verify a synthetic mixed-age thread supports acting on one message only and large datasets are generated without allocating the entire mailbox.

2. Test pagination with equal sort keys, concurrent inserts, different accounts, and oversized requested limits. Use query plans to verify important filters use indexes. Show a large synthetic dataset can be queried in small pages without materializing every row in the renderer.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-003.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `003` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-003.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
