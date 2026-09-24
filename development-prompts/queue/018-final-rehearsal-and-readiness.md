---
id: "018"
title: "End-to-end rehearsal and release readiness"
stage: "report"
dependsOn: ["001", "013", "015", "016", "017"]
tags: ["mail-clean", "rehearsal", "readiness"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# End-to-end rehearsal and release readiness

## Goal

Complete milestone 018: end-to-end rehearsal and release readiness. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 001 — Architecture and secure desktop foundation; 013 — Reports, account disconnect, and session closeout; 015 — Operator usability and failure regression testing; 016 — Large-mailbox benchmarks and multi-hour validation; 017 — CI, desktop packaging, and security review. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: End-to-end test/rehearsal fixtures and scripts, application modules with reproduced integration defects, and README status/operator/recovery/release documentation.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-018.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Rehearse the full customer session using simulated accounts.** Run the app through two customers and multiple mailboxes: configure protections/date rules, scan, inspect large attachments, keep messages, approve exact batches, interrupt/resume cleanup, restore selected messages, explicitly download attachments, export reports, disconnect, and clear synthetic cache. Include a mixed-age thread, externally changed protection, and ambiguous remote outcome. Prefer the packaged build; document fallback to development mode. Fix integration defects and rerun the affected scenario.

2. **Reconcile requirements, evidence, and remaining release work.** Review the README again and reconcile every first-version requirement with implemented code and observed tests. Update README status, operator/setup/recovery documentation, architecture decisions, and requirement traceability. Add a release-readiness report separating implemented, verified in simulation, verified in a real environment, incomplete, and externally blocked work. Include Google project/OAuth verification, customer consent, real mailbox smoke testing, signing, and other unperformed external steps. Preserve future-feature scope.

## Verification

1. Record the actual end-to-end outcomes and evidence. Verify customer isolation, unique message totals, exact approvals, no automatic downloads, recoverable state, and accurate reports. An incomplete prerequisite soak cannot be hidden by a passing short rehearsal; track it separately as a release blocker.

2. All 18 milestone statuses are accurate and link to evidence or concrete blockers. Run the applicable final checks once after documentation or fixes. Provide exact development, demo, package, benchmark, and soak commands. Never label customer readiness complete while required multi-hour evidence, external setup, or real-environment validation remains outstanding.

If a prerequisite test or external release step remains incomplete, finish the independent documentation and record the gap. Do not mark this milestone or customer readiness complete until all required evidence exists.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-018.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `018` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-018.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
