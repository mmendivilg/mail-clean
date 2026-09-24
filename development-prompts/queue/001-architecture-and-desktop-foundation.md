---
id: "001"
title: "Architecture and secure desktop foundation"
stage: "generate"
dependsOn: []
tags: ["mail-clean", "architecture", "electron"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Architecture and secure desktop foundation

## Goal

Complete milestone 001: architecture and secure desktop foundation. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

This is the first milestone. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Application scaffold, source/assets, preload/worker boundaries, package manifest/lockfile, TypeScript/Vite/Forge/lint/test configuration, `.gitignore`, and `AGENTS.md`.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-001.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Define the architecture and requirement map.** Read the current README in full. Create docs/architecture.md and docs/requirements.md covering every first-version requirement, including attachment review. Use Electron, React, Vite, TypeScript, SQLite, better-sqlite3, Drizzle, and Electron Forge unless a demonstrated compatibility issue requires a documented adjustment. Define UI/main/worker responsibilities, typed boundaries, database ownership, job states, approval semantics, and resource budgets. Define message identity as customer/session/account/message scoped. Create concise AGENTS.md guidance with commands, conventions, and safety invariants. Record platform assumptions and Google setup dependencies without requesting credentials.

2. **Scaffold the runnable desktop application.** Create the Electron/React/TypeScript app with Vite and Forge, a lockfile, strict TypeScript, linting, formatting, and minimal meaningful test setup. Establish main, preload, renderer, domain, and worker boundaries. Build a clean operator-oriented shell with navigation for sessions, mailboxes, rules, review, attachments, jobs, and reports. Add loading, empty, and error states and an unmistakable simulated-data indicator. Resolve compatible dependencies using current primary documentation when necessary.

3. **Implement the application IPC boundary.** Create a narrow typed preload API and runtime-validated request/response schemas, using Zod or a comparably small validator. Validate sender identity and customer/account ownership at the privileged boundary. Enable context isolation and renderer sandboxing, disable Node integration, and control window creation, navigation, and external URLs. Define bounded query/progress payloads and safe error serialization. Keep OAuth tokens and generic shell/filesystem capabilities out of renderer APIs.

## Verification

1. Map each README requirement to its planned milestone(s) and verification. Explicitly defer automatic cleanup, permanent deletion, incremental new-mail sync, and cloud AI. Document that Gmail approval applies to exact message IDs and that attachment cleanup affects the parent message. The architecture step is followed by the scaffold and IPC implementation in this same task.

2. Development startup, type checking, and production bundling succeed. Verify a packaged or development window launches when GUI access is available; record a GUI limitation separately if unavailable. Navigation works without a Gmail account and no renderer receives Node or filesystem access.

3. Test malformed requests, unknown operations, wrong-session identifiers, rejected senders, and sanitized errors. Exercise one successful round trip through the preload bridge. Document how subsequent features add operations without exposing arbitrary IPC calls.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-001.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `001` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-001.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
