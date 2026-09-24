---
id: "016"
title: "Large-mailbox benchmarks and multi-hour validation"
stage: "verify"
dependsOn: ["003", "008", "011", "014", "015"]
tags: ["mail-clean", "performance", "soak"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 360
required: true
allowParallel: false
---

# Large-mailbox benchmarks and multi-hour validation

## Goal

Complete milestone 016: large-mailbox benchmarks and multi-hour validation. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 003 — Gmail simulator and bounded data access; 008 — Attachment metadata and largest-attachment review; 011 — Multiple mailboxes, operator controls, and restoration; 014 — Resource limits, diagnostics, and database backups; 015 — Operator usability and failure regression testing. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Benchmark/soak harnesses, resource measurement scripts, and application modules with measured bottlenecks or reproduced failures.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-016.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Measure bounded operation on large synthetic mailboxes.** Build a configurable benchmark with an initial target of at least 100,000 synthetic messages across three accounts and 20 years of dates, including attachment metadata. Generate lazily, consume bounded disk, and avoid downloading simulated multi-gigabyte bodies. Measure peak memory by process, database/WAL growth, API concurrency, throughput, cancellation latency, and page-query/UI responsiveness where measurable. Compare results with the budgets defined in architecture and fix demonstrated bottlenecks.

2. **Run a genuine multi-hour simulated workload.** Create and run a wall-clock soak of at least two hours with multiple synthetic accounts, continuing activity, periodic worker restarts, network loss, throttling, and authorization interruptions. Include metadata-only attachment indexing plus explicitly approved fake downloads and fake cleanup. Persist metrics/results so the soak can survive agent or application interruption. Use bounded resources, inspect progress at reasonable intervals, and fix reproducible failures. Never substitute accelerated virtual time for the multi-hour claim.

## Verification

1. Record hardware/runtime, seed, dataset sizes, elapsed time, metrics, limits, and pass/fail results in docs/validation. If local resources prevent the target, run a smaller meaningful case and record the gap; do not claim the target passed. Retained metadata may grow with message count; explain expected storage separately from unbounded cache/WAL growth.

2. Record actual start/end/duration, workloads, injected faults, memory/WAL/disk trends, responsiveness evidence, and final journal invariants. A launched background process or partial run is not a pass. If the environment interrupts the run, record it as incomplete with an exact resume command and continue only independent work.

Record benchmark and two-hour soak status separately. Both must pass before this required task succeeds. If the soak is incomplete, report the blocker and resume command; downstream runner tasks remain blocked until this task succeeds.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-016.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `016` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-016.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
