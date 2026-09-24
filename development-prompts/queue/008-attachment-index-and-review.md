---
id: "008"
title: "Attachment metadata and largest-attachment review"
stage: "implement"
dependsOn: ["003", "005", "007"]
tags: ["mail-clean", "attachments", "review"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Attachment metadata and largest-attachment review

## Goal

Complete milestone 008: attachment metadata and largest-attachment review. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 003 — Gmail simulator and bounded data access; 005 — Secure Google sign-in and Gmail integration; 007 — Resumable discovery, classification, and preview. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: MIME parser, attachment index/jobs/migrations, attachment review screens, and related IPC contracts.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-008.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Parse attachment metadata without downloading content.** Implement a bounded MIME structure parser for nested multipart messages, attachment IDs, inline parts, filenames, MIME types, reported decoded sizes, and stable part identity. Define which parts appear as attachments and surface inline status. Retrieve only the Gmail structure fields required, excluding body.data and attachment bytes; inspect official API field semantics. Represent unknown sizes explicitly and bound malformed nesting/part counts.

2. **Build the durable attachment metadata index.** Add indexed attachment metadata persistence and a resumable discovery/enrichment job. Store parent message references, part identity, reported size, and metadata completeness. Batch structure reads through the request scheduler and allow result browsing during indexing. Track scope completion separately from message discovery and recover after crashes without duplicate attachment rows. Compute message attachment totals only with explicit partial/unknown semantics.

3. **Build largest-attachment review.** Create an Inbox-default attachment view with explicit expansion to other mail, minimum-size, file-type, sender, and date filters. Sort individual attachments largest first using server-side database queries and bounded UI rendering. Display individual size, total per message, and estimated whole-message size distinctly, along with unknown/partial indicators, parent message, and matching reason. Provide parent-message review selection, preserving protections and unique message counts.

## Verification

1. Test nested multipart, repeated filenames, zero/unknown sizes, inline content, attachment IDs absent, Unicode names, and malformed structures. Assert no attachment-content endpoint or message body decoding runs. Keep estimated whole-message size separate from individual attachment size.

2. Verify restart/deduplication and stable ordering for equal sizes. Test a message with several attachments and prove message counts remain unique. Confirm rankings remain marked incomplete until all required metadata work for the selected scope is finished or unresolved work is clearly reported.

3. Use fixtures with multiple attachments per message, missing sizes, and incomplete indexing. Verify filters and sorting operate across the entire database rather than only the displayed page. Explain visibly that Trash affects the whole email and its attachments, and do not enable execution from incomplete scan results.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-008.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `008` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-008.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
