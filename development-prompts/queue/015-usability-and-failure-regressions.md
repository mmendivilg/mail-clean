# Prompt 015: Operator usability and failure regression testing

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 006, 008, 009, 010, 011, 012, 013, 014.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Review and improve the complete operator interface

Review all existing screens as one coherent on-site workflow. Improve navigation, session/account context, keyboard access, focus management, labels, contrast, table semantics, empty/loading/error states, and readable counts. Preserve bounded rendering and clear incomplete/unknown labels. Ensure confirmation dialogs explain concrete effects and simulated mode remains visually distinct. Use accessible established components and avoid cosmetic changes to backend semantics.

### 2. Build the cross-layer fault-injection regression suite

Create reusable integration tests that interrupt discovery, approval snapshot creation, cleanup, restoration, downloads, and migration at persistence/network boundaries. Exercise stale cursors, throttling, sleep-like interruption, worker death, expired authorization, low disk, and externally changed messages. Test real database/worker paths with fake Gmail, deterministic seeds, and bounded test time. Fix defects found within this scope and add regression coverage.

## Acceptance and verification

1. Complete a keyboard-driven simulated session from connection through report and disconnect. Check long senders/subjects, narrow windows, large tables, and interruption states. Capture relevant screenshots when the environment supports them and record any visual verification gaps honestly.

2. Verify no lost approvals, skipped discovered candidates, cross-customer leakage, unapproved mutations, or harmful duplicate actions across the failure matrix. Report exact scenarios and outcomes, separating simulated evidence from untested real Google behavior.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
