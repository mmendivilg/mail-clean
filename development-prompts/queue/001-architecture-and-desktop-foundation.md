# Prompt 001: Architecture and secure desktop foundation

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** None.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Define the architecture and requirement map

Read the current README in full. Create docs/architecture.md and docs/requirements.md covering every first-version requirement, including attachment review. Use Electron, React, Vite, TypeScript, SQLite, better-sqlite3, Drizzle, and Electron Forge unless a demonstrated compatibility issue requires a documented adjustment. Define UI/main/worker responsibilities, typed boundaries, database ownership, job states, approval semantics, and resource budgets. Define message identity as customer/session/account/message scoped. Create concise AGENTS.md guidance with commands, conventions, and safety invariants. Record platform assumptions and Google setup dependencies without requesting credentials.

### 2. Scaffold the runnable desktop application

Create the Electron/React/TypeScript app with Vite and Forge, a lockfile, strict TypeScript, linting, formatting, and minimal meaningful test setup. Establish main, preload, renderer, domain, and worker boundaries. Build a clean operator-oriented shell with navigation for sessions, mailboxes, rules, review, attachments, jobs, and reports. Add loading, empty, and error states and an unmistakable simulated-data indicator. Resolve compatible dependencies using current primary documentation when necessary.

### 3. Implement the application IPC boundary

Create a narrow typed preload API and runtime-validated request/response schemas, using Zod or a comparably small validator. Validate sender identity and customer/account ownership at the privileged boundary. Enable context isolation and renderer sandboxing, disable Node integration, and control window creation, navigation, and external URLs. Define bounded query/progress payloads and safe error serialization. Keep OAuth tokens and generic shell/filesystem capabilities out of renderer APIs.

## Acceptance and verification

1. Map each README requirement to its planned milestone(s) and verification. Explicitly defer automatic cleanup, permanent deletion, incremental new-mail sync, and cloud AI. Document that Gmail approval applies to exact message IDs and that attachment cleanup affects the parent message. No application implementation is required yet.

2. Development startup, type checking, and production bundling succeed. Verify a packaged or development window launches when GUI access is available; record a GUI limitation separately if unavailable. Navigation works without a Gmail account and no renderer receives Node or filesystem access.

3. Test malformed requests, unknown operations, wrong-session identifiers, rejected senders, and sanitized errors. Exercise one successful round trip through the preload bridge. Document how subsequent features add operations without exposing arbitrary IPC calls.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
