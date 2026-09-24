# Prompt 012: Explicit attachment downloads from selection to results

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 004, 008, 009, 011.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Implement explicit attachment download plans

Add download selection for individual attachments and an explicit per-job option that is off by default. Persist exact attachment identities, account/scope, destination permission/reference, known expected bytes, and unknown-size counts. Keep download approval independent from Trash approval. Define job-wide scope precisely and expose how estimates change during discovery. Default to snapshotting discovered selected attachments; newly found items require renewed approval unless the operator explicitly enabled a documented job-wide policy.

### 2. Implement durable and bounded attachment downloads

Implement authorized attachment retrieval in the worker, safe destination handling, filename sanitization, collision policy, path traversal/symlink defenses, and temporary-file plus atomic-completion writes. Apply bounded concurrency, disk checks, cancellation, and durable per-attachment status. Account for Gmail base64/JSON buffering: choose and document a maximum supported automatic download size and a safe policy for unknown/oversized responses. Enforce response byte limits where possible; do not claim streaming if the client buffers.

### 3. Build download controls and results

Connect attachment selection to a desktop destination picker and a clear download confirmation. Show expected known bytes plus unknown sizes, per-job opt-in state, progress, failures, and completed-file locations. Allow retry/cancel through durable operations. Keep local file actions restricted to verified completed outputs. Clearly separate Download attachments from Move parent messages to Trash.

## Acceptance and verification

1. Test default-off behavior, selection across pages, missing size estimates, changed destination, cancellation, and restart. Scans never gain download authorization from merely viewing metadata. Download planning does not start content retrieval or delete parent messages.

2. Test malicious filenames, collisions, unknown/oversized content, disk-full, interrupted retrieval, partial files, and restart after rename. Verify bytes against fixtures and correct base64url decoding. Do not fetch oversized content before enforcing the available limit, and never automatically open downloaded files.

3. Run a complete simulated multi-attachment download with one failure, one unsupported oversized item, and a restart. Confirm download opt-in remains off for unrelated jobs, default scans retrieve no bytes, and no download control implicitly grants cleanup approval.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
