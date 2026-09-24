# Prompt 010: Approved Trash execution and crash recovery

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 004, 005, 009.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Implement the action journal and execution preflight

Create durable per-message action intents and outcomes tied to immutable approval and confirmation. Before each mutation re-read relevant message state, verify account identity, scope, current protections, retained keep decisions, and rule version. Missing protection metadata or ambiguous state must block or skip safely. Capture original labels before sending a request and persist intent first. Define pending/sending/confirmed/skipped/failed/uncertain transitions and single-owner execution.

### 2. Implement approved message-level Trash operations

Implement Gmail users.messages.trash through the provider and scheduler, one explicitly tracked message outcome at a time with bounded concurrency. Never call thread Trash or permanent-delete endpoints. Keep discovery and destructive execution separated for the selected scan scope. Treat already-Trash messages and missing messages explicitly. Persist confirmed responses before reporting progress. Build and test the full execution path using fake Gmail only.

### 3. Recover safely from interrupted or ambiguous cleanup

Recover committed unfinished action intents after crashes or lost network responses. Re-read Gmail state before deciding whether an action succeeded, can be retried, or needs operator review. Account for external edits, including messages restored outside the app; state alone may not prove who changed a label. Preserve evidence and distinguish observed target state from confirmed app actions. Do not automatically retrash an externally restored message based on an old ambiguous intent. Bound reconciliation attempts.

## Acceptance and verification

1. Prove no mutation is sent without a committed intent, current valid approval, and successful preflight. Test database write failure, new starred/protected status, removed messages, revoked approval, and concurrent starts. Original labels and skip reasons are preserved without fabricating success.

2. Verify only approved eligible IDs are changed, newer replies in a mixed-age thread remain intact, and repeated execute commands do not start duplicate workers. Simulate partial batch failure and lost responses; uncertain results must remain unresolved for reconciliation rather than being counted as confirmed.

3. Inject interruption before request, after remote success, before local acknowledgment, and during reconciliation. Test external restore/new protections/auth failure. Demonstrate recovery without lost approvals, repeated harmful actions, false attribution, or unbounded retries. Ambiguous cases remain visibly unresolved.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
