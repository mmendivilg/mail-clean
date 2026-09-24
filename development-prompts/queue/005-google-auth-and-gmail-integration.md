---
id: "005"
title: "Secure Google sign-in and Gmail integration"
stage: "integrate"
dependsOn: ["001", "002", "003", "004"]
tags: ["mail-clean", "oauth", "gmail"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Secure Google sign-in and Gmail integration

## Goal

Complete milestone 005: secure google sign-in and gmail integration. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 001 — Architecture and secure desktop foundation; 002 — Durable database and customer sessions; 003 — Gmail simulator and bounded data access; 004 — Durable background jobs and request scheduling. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Credential service, OAuth/account onboarding, Gmail adapter, related IPC contracts, package manifest/lockfile, and placeholder-only configuration examples.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-005.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Implement secure account credential storage.** Implement a main-process credential service using Electron safeStorage with OS-backed protection. Keep access tokens short-lived and protect persisted refresh tokens. Detect unavailable or insecure platform backends and fail closed for real account persistence while allowing simulated mode. Use atomic writes, scoped token references, and redacted errors. Do not expose tokens to renderer state, logs, reports, fixtures, or the general SQLite schema.

2. **Implement Google desktop OAuth and account onboarding.** Implement the system-browser desktop OAuth flow with PKCE, state validation, a loopback listener, timeout/cancellation, account identity verification, refresh handling, and reconnect UI. Request the first-version Gmail scope required for approved Trash/restore. Consult current official Google documentation. Provide a setup guide and configuration example containing placeholders only. Use a fake auth provider for automated flows and protect duplicate account connections.

3. **Implement the real Gmail read adapter.** Implement Gmail reads using the official Node client behind the provider contract. Support paginated searches, account identity, labels, required message headers/state, internal dates, and selectively requested MIME structure. Minimize fields and avoid bodies and attachment contents during routine reads. Preserve missing/unknown metadata distinctly, validate responses, and sanitize provider errors. Keep live mutation methods disabled until their later milestone.

## Verification

1. Test save/load/delete, corrupted ciphertext, unavailable encryption, account isolation, and token redaction using an injected vault. Exercise the available native backend without using real credentials. Explain supported platform behavior and any environment-only verification gap.

2. Test rejected state, cancelled flow, callback validation, refresh rotation, revoked access, and account mismatch. Missing OAuth configuration shows setup instructions and leaves simulated development usable. Record Google project configuration, owner consent, and production verification as external dependencies rather than claiming a real login succeeded.

3. Run contract tests against recorded synthetic response shapes, including empty pages, malformed metadata, disappearing messages, and missing fields. Verify read calls and scopes against current Google docs. Do not sign in or scan a real mailbox during unattended development.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-005.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `005` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-005.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
