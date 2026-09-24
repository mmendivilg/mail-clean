---
id: "017"
title: "CI, desktop packaging, and security review"
stage: "release"
dependsOn: ["001", "005", "013", "014", "015", "016"]
tags: ["mail-clean", "ci", "packaging", "security"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# CI, desktop packaging, and security review

## Goal

Complete milestone 017: ci, desktop packaging, and security review. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 001 — Architecture and secure desktop foundation; 005 — Secure Google sign-in and Gmail integration; 013 — Reports, account disconnect, and session closeout; 014 — Resource limits, diagnostics, and database backups; 015 — Operator usability and failure regression testing; 016 — Large-mailbox benchmarks and multi-hour validation. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: CI workflow files, local check scripts, package manifest/lockfile, Forge/build configuration, packaging assets, and application modules with concrete security or packaging defects.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-017.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Create repeatable CI and developer checks.** Add reproducible local commands and CI configuration for type/lint/build, meaningful unit/integration tests, migration fixtures, IPC checks, and a bounded performance smoke test. Keep two-hour soak as an explicit long-running workflow or command with retained artifacts. Isolate fake data and require no Google secrets. Pin tooling appropriately and account for Electron/native SQLite rebuilds. Create configuration files only; do not publish or enable remote services.

2. **Package the app and validate installation behavior.** Configure Forge packaging for the current supported OS first and document other targets as unverified until tested. Verify native SQLite bundling, preload/worker paths, app-data locations, resource packaging, and production navigation policy. Build a local unsigned test artifact when possible. Document signing/notarization/update-channel requirements with placeholders and add startup/version handling. Do not purchase certificates, upload artifacts, or publish releases.

3. **Review security boundaries and cleanup correctness.** Inspect the implemented app and tests for broken isolation, stale approvals, remote-content execution, unsafe IPC/navigation, secret exposure, insecure token fallback, download path traversal, unbounded reads, and destructive thread/permanent-delete calls. Review all mutation paths against the README and current official Gmail requirements. Add focused regression tests for concrete findings and fix them without unrelated rewrites. Record unresolved external Google verification requirements accurately.

## Verification

1. Run the same checks locally where supported and document platform-specific omissions. Verify CI needs no live mailbox or credential, failure artifacts are redacted, and long-running tests cannot accidentally mutate Gmail. Avoid claiming an unexecuted remote CI job passed.

2. Launch the built artifact when supported and test simulated session persistence, worker startup, database access, and restart. Distinguish package build success from signing, installation, cross-platform support, and production readiness. Record missing GUI/toolchain/signing steps with concrete commands or owner actions.

3. Produce a concise review record with findings, fixes, evidence, and remaining limitations. Verify all mutations originate from valid approved messages and routine scans never retrieve attachment content. This is an engineering review, not a claim of security certification or completed Google approval.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-017.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `017` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-017.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
