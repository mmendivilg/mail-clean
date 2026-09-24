---
id: "002"
title: "Durable database and customer sessions"
stage: "implement"
dependsOn: ["001"]
tags: ["mail-clean", "sqlite", "sessions"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Durable database and customer sessions

## Goal

Complete milestone 002: durable database and customer sessions. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 001 — Architecture and secure desktop foundation. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Database schema/migrations/repositories, session services and screens, and their IPC contracts.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-002.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Create the durable local database foundation.** Implement SQLite initialization, versioned migrations, foreign keys, transactions, and explicit database ownership in the worker. Model customers, sessions, accounts, rule versions, jobs, discovered messages, candidates, approvals, actions, and attachment metadata; evolve detail in later milestones. Use customer/account-scoped keys, useful indexes, WAL, short transactions, busy handling, and deliberate checkpoint policy. Document durability settings and keep databases out of the repository. Store timestamps with clear semantics.

2. **Build customer and session management.** Implement creating, listing, opening, and closing customer sessions with durable metadata and account placeholders. Keep rules, results, and cleanup history scoped to the selected session. Define closed-session behavior and prevent switching UI context from accidentally changing an active job's owner. Add simple operator notes and a visible account/session context. Support reopening appropriate sessions without duplicating history.

## Verification

1. Test fresh initialization, migration from a prior fixture schema, rollback on failure, scoped uniqueness, and isolation between accounts with identical message IDs. Verify a failed durable write is surfaced rather than treated as successful progress. No secrets or attachment contents are stored in ordinary database records.

2. Verify create/restart/reopen behavior, empty states, and isolation with two customers and multiple sessions. Test that a stale UI request cannot read or mutate another customer's records. Complete a visible session workflow using the actual IPC/database path.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-002.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `002` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-002.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
