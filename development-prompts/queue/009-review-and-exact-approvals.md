# Prompt 009: Review queue and exact customer approvals

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 003, 006, 007, 008.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Build the persisted message review queue

Implement paginated review with sender/category grouping, reasons, protected/uncertain visibility, explicit keep decisions, and bulk selection. Make select-page versus select-all-matching scope unambiguous. Persist review decisions and support attachment-originated selection by parent message ID. Preserve selection across pages without loading all IDs in renderer memory. Review may continue during discovery, but new arrivals are not automatically selected or approved.

### 2. Implement exact, durable cleanup approvals

Create an explicit approval operation that transactionally captures exact reviewed message IDs, account/session, rule version, keep decisions, scope, and approval time. Use bounded database operations to materialize large selections and expose approval-building progress without partial executable approvals. Reject stale UI revisions and invalidate pending approval on relevant rule/selection changes. New discoveries always require separate review. Keep approval separate from execution.

### 3. Build the customer confirmation and execution review flow

Add a concise final review showing customer, accounts, exact approved unique-message count, rules, date/time zone, protections, and Trash behavior. For date cleanup record confirmation of customer retention requirements and Vault considerations without making legal determinations. Include the limited recovery period and attachment-parent consequence. Require a distinct operator action to execute a valid approval; persist the confirmation with that approval. Keep the interface understandable and avoid implementation jargon.

## Acceptance and verification

1. Test selection across pages, filter changes, duplicate parent messages, kept messages, account switches, and restarting the app. Selection and counts must match the displayed scope; incomplete scans remain clearly labeled and cannot silently grant executable approval.

2. Test stale selections, mid-approval interruption, changing rules, duplicate submit, new candidates, and cross-account identifiers. Prove a partial approval snapshot cannot execute, a keep decision cannot be bypassed, and filter expressions cannot later expand an already approved set.

3. Exercise the full simulated session-to-confirmation flow. Verify changing approval invalidates the final confirmation, protected messages cannot be included through the UI, and launching/restarting the application never grants approval or initiates a new cleanup automatically.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
