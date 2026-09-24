# Prompt 003: Gmail simulator and bounded data access

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 002.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Build a deterministic Gmail simulator and adapter contract

Define a Gmail provider interface for listing IDs, metadata/structure reads, state inspection, Trash, restore, and explicit attachment retrieval. Implement a deterministic fake with seedable large datasets, multiple accounts, mixed-age threads, changing labels, MIME trees, missing messages, and duplicate pages. Add controllable invalid cursors, throttling, lost responses, auth expiry, and external mailbox changes. Keep fixture generation lazy and bounded. Mark provider mode in persisted records and UI; prevent simulated jobs from switching to real accounts.

### 2. Implement paginated repositories and bounded UI queries

Build worker-owned repository methods for messages, candidates, attachment rows, and jobs with stable cursor pagination, indexed filtering, bounded page sizes, and deterministic tie-breaking. Use database aggregation for counts. Preserve account/session scope in every query. Define explicit unknown/estimated/complete count fields. Stream or page exports and bulk processing instead of returning unbounded arrays.

## Acceptance and verification

1. Contract tests prove stable message identity and deterministic faults. Assert that scans never call attachment-content retrieval. Verify a synthetic mixed-age thread supports acting on one message only and large datasets are generated without allocating the entire mailbox.

2. Test pagination with equal sort keys, concurrent inserts, different accounts, and oversized requested limits. Use query plans to verify important filters use indexes. Show a large synthetic dataset can be queried in small pages without materializing every row in the renderer.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
