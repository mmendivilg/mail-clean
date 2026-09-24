# Prompt 007: Resumable discovery, classification, and preview

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 003, 004, 005, 006.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Implement incremental, resumable message discovery

Build discovery that persists IDs and necessary metadata per bounded page before advancing checkpoints. Deduplicate across repeats and restart from the query when a cursor becomes unusable. Capture the scan scope and rule version, expose incomplete discovery explicitly, and distinguish disappearing messages from request failures. Account for a changing mailbox: do not promise an atomic Gmail snapshot. Never mutate the mailbox while depending on its search pagination for this scan.

### 2. Implement persisted classification and preview

Evaluate discovered messages in bounded resumable batches and persist decisions, reasons, rule version, and eligible/protected/uncertain status. Build preview counts and representative samples per account/category, showing scan incompleteness and errors. Allow read-only browsing while work continues. Count unique messages and make unresolved totals explicit. Support reclassification as a new rule version without changing historical decisions or inheriting approvals.

## Acceptance and verification

1. Inject crashes before/after page persistence and cursor saves, stale cursors, duplicate pages, empty pages, and message disappearance. Verify no discovered candidate is lost and no cleanup becomes executable until discovery for its selected scope is complete and required results are resolved.

2. Compare results with hand-verified fixtures covering every rule. Restart classification mid-batch and confirm deterministic deduplication. Verify preview triggers no mutation and new or reclassified candidates require new review.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
