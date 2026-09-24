# Prompt 006: Protection rules, dates, and scope editor

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 002, 003, 005.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Implement explainable protection and cleanup rules

Create pure versioned rule evaluation for protected senders/domains, selected labels, starred messages, selected cleanup senders, subject rules, and categories. Normalize email addresses and domains carefully and document exact/domain/subdomain matching. Protection wins; unresolved or insufficient metadata stays uncertain. Produce structured reason codes and readable explanations. Distinguish business correspondence, financial records, marketing, suspected spam, and uncertain messages without pretending unsupported inference is fact.

### 2. Implement received-before dates and mailbox scope

Define a cutoff as an exclusive instant derived from the chosen date and explicit IANA time zone. Implement Inbox/all-mail scope with separate Sent, Spam, and Trash choices. Consult Gmail search date semantics, compile a conservative query, and apply exact local checks against internalDate where needed. Explain Gmail internalDate semantics for imported messages. Use message-level identities so mixed-age conversations cannot broaden cleanup.

### 3. Build the rules and scope configuration interface

Build session-scoped rule editing with protected sender/domain lists, labels, starred exceptions, cleanup senders/subjects, cutoff picker, time zone, and explicit scope controls. Display precedence and examples using the actual evaluator. Save immutable versions with validation and an explicit save action. Show how changes affect pending scans and invalidate prior approvals when their policy snapshot no longer applies.

## Acceptance and verification

1. Test overlapping rules, mixed casing, malformed addresses, domain boundary attacks, unknown labels, and protected messages matching cleanup rules. Default fixtures must not silently install customer-specific policies. Any category inferred only from age must remain explicitly age-based rather than being labeled spam.

2. Test messages immediately before/at/after cutoff, DST transitions, leap days, invalid dates, time-zone changes, imported-mail fixtures, and label intersections. Verify the example older than 2014 resolves to before January 1, 2014 in the selected zone. Gmail query compilation must not omit eligible messages through narrower accidental date boundaries.

3. Exercise create/edit/reload flows and invalid input handling. Verify rule previews match evaluator results, cutoff meaning is visible, and merely opening the editor creates no policy changes. Existing candidate/approval history retains its original rule version.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
