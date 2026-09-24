# Prompt 018: End-to-end rehearsal and release readiness

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 001, 013, 015, 016, 017.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Rehearse the full customer session using simulated accounts

Run the app through two customers and multiple mailboxes: configure protections/date rules, scan, inspect large attachments, keep messages, approve exact batches, interrupt/resume cleanup, restore selected messages, explicitly download attachments, export reports, disconnect, and clear synthetic cache. Include a mixed-age thread, externally changed protection, and ambiguous remote outcome. Prefer the packaged build; document fallback to development mode. Fix integration defects and rerun the affected scenario.

### 2. Reconcile requirements, evidence, and remaining release work

Review the README again and reconcile every first-version requirement with implemented code and observed tests. Update README status, operator/setup/recovery documentation, architecture decisions, and requirement traceability. Add a release-readiness report separating implemented, verified in simulation, verified in a real environment, incomplete, and externally blocked work. Include Google project/OAuth verification, customer consent, real mailbox smoke testing, signing, and other unperformed external steps. Preserve future-feature scope.

## Acceptance and verification

1. Record the actual end-to-end outcomes and evidence. Verify customer isolation, unique message totals, exact approvals, no automatic downloads, recoverable state, and accurate reports. An incomplete prerequisite soak cannot be hidden by a passing short rehearsal; track it separately as a release blocker.

2. All 18 milestone statuses are accurate and link to evidence or concrete blockers. Run the applicable final checks once after documentation or fixes. Provide exact development, demo, package, benchmark, and soak commands. Never label customer readiness complete while required multi-hour evidence, external setup, or real-environment validation remains outstanding.

If a prerequisite test or external release step remains incomplete, finish the independent documentation and record the gap. Do not mark this milestone or customer readiness complete until all required evidence exists.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
