# Prompt 017: CI, desktop packaging, and security review

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 001, 005, 013, 014, 015, 016. Only the benchmark work in 016 is required here; its two-hour soak may remain pending.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Create repeatable CI and developer checks

Add reproducible local commands and CI configuration for type/lint/build, meaningful unit/integration tests, migration fixtures, IPC checks, and a bounded performance smoke test. Keep two-hour soak as an explicit long-running workflow or command with retained artifacts. Isolate fake data and require no Google secrets. Pin tooling appropriately and account for Electron/native SQLite rebuilds. Create configuration files only; do not publish or enable remote services.

### 2. Package the app and validate installation behavior

Configure Forge packaging for the current supported OS first and document other targets as unverified until tested. Verify native SQLite bundling, preload/worker paths, app-data locations, resource packaging, and production navigation policy. Build a local unsigned test artifact when possible. Document signing/notarization/update-channel requirements with placeholders and add startup/version handling. Do not purchase certificates, upload artifacts, or publish releases.

### 3. Review security boundaries and cleanup correctness

Inspect the implemented app and tests for broken isolation, stale approvals, remote-content execution, unsafe IPC/navigation, secret exposure, insecure token fallback, download path traversal, unbounded reads, and destructive thread/permanent-delete calls. Review all mutation paths against the README and current official Gmail requirements. Add focused regression tests for concrete findings and fix them without unrelated rewrites. Record unresolved external Google verification requirements accurately.

## Acceptance and verification

1. Run the same checks locally where supported and document platform-specific omissions. Verify CI needs no live mailbox or credential, failure artifacts are redacted, and long-running tests cannot accidentally mutate Gmail. Avoid claiming an unexecuted remote CI job passed.

2. Launch the built artifact when supported and test simulated session persistence, worker startup, database access, and restart. Distinguish package build success from signing, installation, cross-platform support, and production readiness. Record missing GUI/toolchain/signing steps with concrete commands or owner actions.

3. Produce a concise review record with findings, fixes, evidence, and remaining limitations. Verify all mutations originate from valid approved messages and routine scans never retrieve attachment content. This is an engineering review, not a claim of security certification or completed Google approval.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
