# Prompt 005: Secure Google sign-in and Gmail integration

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 001, 002, 003, 004.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Implement secure account credential storage

Implement a main-process credential service using Electron safeStorage with OS-backed protection. Keep access tokens short-lived and protect persisted refresh tokens. Detect unavailable or insecure platform backends and fail closed for real account persistence while allowing simulated mode. Use atomic writes, scoped token references, and redacted errors. Do not expose tokens to renderer state, logs, reports, fixtures, or the general SQLite schema.

### 2. Implement Google desktop OAuth and account onboarding

Implement the system-browser desktop OAuth flow with PKCE, state validation, a loopback listener, timeout/cancellation, account identity verification, refresh handling, and reconnect UI. Request the first-version Gmail scope required for approved Trash/restore. Consult current official Google documentation. Provide a setup guide and configuration example containing placeholders only. Use a fake auth provider for automated flows and protect duplicate account connections.

### 3. Implement the real Gmail read adapter

Implement Gmail reads using the official Node client behind the provider contract. Support paginated searches, account identity, labels, required message headers/state, internal dates, and selectively requested MIME structure. Minimize fields and avoid bodies and attachment contents during routine reads. Preserve missing/unknown metadata distinctly, validate responses, and sanitize provider errors. Keep live mutation methods disabled until their later milestone.

## Acceptance and verification

1. Test save/load/delete, corrupted ciphertext, unavailable encryption, account isolation, and token redaction using an injected vault. Exercise the available native backend without using real credentials. Explain supported platform behavior and any environment-only verification gap.

2. Test rejected state, cancelled flow, callback validation, refresh rotation, revoked access, and account mismatch. Missing OAuth configuration shows setup instructions and leaves simulated development usable. Record Google project configuration, owner consent, and production verification as external dependencies rather than claiming a real login succeeded.

3. Run contract tests against recorded synthetic response shapes, including empty pages, malformed metadata, disappearing messages, and missing fields. Verify read calls and scopes against current Google docs. Do not sign in or scan a real mailbox during unattended development.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
