# Prompt 002: Durable database and customer sessions

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 001.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Create the durable local database foundation

Implement SQLite initialization, versioned migrations, foreign keys, transactions, and explicit database ownership in the worker. Model customers, sessions, accounts, rule versions, jobs, discovered messages, candidates, approvals, actions, and attachment metadata; evolve detail in later milestones. Use customer/account-scoped keys, useful indexes, WAL, short transactions, busy handling, and deliberate checkpoint policy. Document durability settings and keep databases out of the repository. Store timestamps with clear semantics.

### 2. Build customer and session management

Implement creating, listing, opening, and closing customer sessions with durable metadata and account placeholders. Keep rules, results, and cleanup history scoped to the selected session. Define closed-session behavior and prevent switching UI context from accidentally changing an active job's owner. Add simple operator notes and a visible account/session context. Support reopening appropriate sessions without duplicating history.

## Acceptance and verification

1. Test fresh initialization, migration from a prior fixture schema, rollback on failure, scoped uniqueness, and isolation between accounts with identical message IDs. Verify a failed durable write is surfaced rather than treated as successful progress. No secrets or attachment contents are stored in ordinary database records.

2. Verify create/restart/reopen behavior, empty states, and isolation with two customers and multiple sessions. Test that a stale UI request cannot read or mutate another customer's records. Complete a visible session workflow using the actual IPC/database path.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
