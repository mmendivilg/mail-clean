---
id: "012"
title: "Explicit attachment downloads from selection to results"
stage: "implement"
dependsOn: ["004", "008", "009", "011"]
tags: ["mail-clean", "attachments", "downloads"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Explicit attachment downloads from selection to results

## Goal

Complete milestone 012: explicit attachment downloads from selection to results. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 004 — Durable background jobs and request scheduling; 008 — Attachment metadata and largest-attachment review; 009 — Review queue and exact customer approvals; 011 — Multiple mailboxes, operator controls, and restoration. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Download planning/storage/migrations, worker retrieval/file handling, destination-picker IPC, and download screens.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-012.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Implement explicit attachment download plans.** Add download selection for individual attachments and an explicit per-job option that is off by default. Persist exact attachment identities, account/scope, destination permission/reference, known expected bytes, and unknown-size counts. Keep download approval independent from Trash approval. Define job-wide scope precisely and expose how estimates change during discovery. Default to snapshotting discovered selected attachments; newly found items require renewed approval unless the operator explicitly enabled a documented job-wide policy.

2. **Implement durable and bounded attachment downloads.** Implement authorized attachment retrieval in the worker, safe destination handling, filename sanitization, collision policy, path traversal/symlink defenses, and temporary-file plus atomic-completion writes. Apply bounded concurrency, disk checks, cancellation, and durable per-attachment status. Account for Gmail base64/JSON buffering: choose and document a maximum supported automatic download size and a safe policy for unknown/oversized responses. Enforce response byte limits where possible; do not claim streaming if the client buffers.

3. **Build download controls and results.** Connect attachment selection to a desktop destination picker and a clear download confirmation. Show expected known bytes plus unknown sizes, per-job opt-in state, progress, failures, and completed-file locations. Allow retry/cancel through durable operations. Keep local file actions restricted to verified completed outputs. Clearly separate Download attachments from Move parent messages to Trash.

## Verification

1. Test default-off behavior, selection across pages, missing size estimates, changed destination, cancellation, and restart. Scans never gain download authorization from merely viewing metadata. Download planning does not start content retrieval or delete parent messages.

2. Test malicious filenames, collisions, unknown/oversized content, disk-full, interrupted retrieval, partial files, and restart after rename. Verify bytes against fixtures and correct base64url decoding. Do not fetch oversized content before enforcing the available limit, and never automatically open downloaded files.

3. Run a complete simulated multi-attachment download with one failure, one unsupported oversized item, and a restart. Confirm download opt-in remains off for unrelated jobs, default scans retrieve no bytes, and no download control implicitly grants cleanup approval.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-012.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `012` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-012.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
