---
id: "006"
title: "Protection rules, dates, and scope editor"
stage: "implement"
dependsOn: ["002", "003", "005"]
tags: ["mail-clean", "rules", "dates"]
concurrencyKey: "mail-clean-workspace"
maxRetries: 0
timeoutMinutes: 240
required: true
allowParallel: false
---

# Protection rules, dates, and scope editor

## Goal

Complete milestone 006: protection rules, dates, and scope editor. Deliver the implementation and observed verification described below, with durable progress and a truthful completion report.

## Context

Work in `/Users/manuelmendivil/Projects/mail-clean`. Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect relevant existing code and architecture before editing.

Required earlier work: 002 — Durable database and customer sessions; 003 — Gmail simulator and bounded data access; 005 — Secure Google sign-in and Gmail integration. The YAML `dependsOn` values are the runner's scheduling contract. A failed or incomplete required dependency must not be bypassed. Execute only this task's grouped work; the control-plane runner owns dispatch of subsequent tasks. Use fake Gmail and synthetic files for unattended tests. Missing external Google setup does not prevent completing independently testable code, but must be reported as an external validation gap.

## Allowed Writes

- Within the Mail Clean workspace: Rule/domain evaluation, date and scope utilities, rule-version storage/migrations, configuration screens, and related IPC contracts.
- Relevant tests/fixtures and local verification scripts; use established paths from the scaffold rather than introducing a second layout.
- `docs/`, including `docs/development-status.md`, `docs/decisions.md`, and `docs/validation/milestone-006.md`; update relevant setup instructions when behavior changes.
- Ignored dependency/build/test outputs and temporary synthetic application data required for this milestone. Package/lockfile changes are allowed when a required implementation or test dependency is justified.

## Forbidden Writes

- `development-prompts/queue/` and its source instructions; do not rewrite tasks to make checks pass.
- The control-plane runner repository, unrelated projects, and unrelated user changes.
- Real customer mailbox data, live downloaded attachments, actual credentials, or remote publication/deployment state during unattended tests.
- Direct manual changes to `.git/` internals. Follow existing Git conventions and do not push or publish.

## Requirements

1. **Implement explainable protection and cleanup rules.** Create pure versioned rule evaluation for protected senders/domains, selected labels, starred messages, selected cleanup senders, subject rules, and categories. Normalize email addresses and domains carefully and document exact/domain/subdomain matching. Protection wins; unresolved or insufficient metadata stays uncertain. Produce structured reason codes and readable explanations. Distinguish business correspondence, financial records, marketing, suspected spam, and uncertain messages without pretending unsupported inference is fact.

2. **Implement received-before dates and mailbox scope.** Define a cutoff as an exclusive instant derived from the chosen date and explicit IANA time zone. Implement Inbox/all-mail scope with separate Sent, Spam, and Trash choices. Consult Gmail search date semantics, compile a conservative query, and apply exact local checks against internalDate where needed. Explain Gmail internalDate semantics for imported messages. Use message-level identities so mixed-age conversations cannot broaden cleanup.

3. **Build the rules and scope configuration interface.** Build session-scoped rule editing with protected sender/domain lists, labels, starred exceptions, cleanup senders/subjects, cutoff picker, time zone, and explicit scope controls. Display precedence and examples using the actual evaluator. Save immutable versions with validation and an explicit save action. Show how changes affect pending scans and invalidate prior approvals when their policy snapshot no longer applies.

## Verification

1. Test overlapping rules, mixed casing, malformed addresses, domain boundary attacks, unknown labels, and protected messages matching cleanup rules. Default fixtures must not silently install customer-specific policies. Any category inferred only from age must remain explicitly age-based rather than being labeled spam.

2. Test messages immediately before/at/after cutoff, DST transitions, leap days, invalid dates, time-zone changes, imported-mail fixtures, and label intersections. Verify the example older than 2014 resolves to before January 1, 2014 in the selected zone. Gmail query compilation must not omit eligible messages through narrower accidental date boundaries.

3. Exercise create/edit/reload flows and invalid input handling. Verify rule previews match evaluator results, cutoff meaning is visible, and merely opening the editor creates no policy changes. Existing candidate/approval history retains its original rule version.

Run the relevant automated checks and inspect actual results. Fix reproduced defects within scope and rerun affected checks. Record commands, observed outcomes, and unperformed checks in `docs/validation/milestone-006.md`. Writing the report or starting a background process is not proof of success.

## Completion Report

Update `docs/development-status.md` using ID `006` and record per-step progress so an interrupted run can resume. Report:

- What changed and the relevant code/documentation paths.
- Commands and checks actually completed, with observed outcomes and evidence at `docs/validation/milestone-006.md`.
- Material assumptions and separately identified external validation gaps.
- Whether this task is complete, incomplete, or blocked, with precise reasons and resume steps. Never report success for failed or unperformed required verification.

Resolve reversible implementation choices without routine confirmation. Preserve existing work and do not duplicate running jobs. Stop after reporting this task; do not enqueue, start, or implement later milestones from this runner-dispatched task.
