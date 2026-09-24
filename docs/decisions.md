# Architecture decisions

## 001 — Electron Forge with Vite and hardened renderer defaults

Use Forge's Vite and native-unpack plugins. Render React in a sandboxed, context-isolated window
with Node integration/webviews off and deny new windows, unexpected navigation, and permissions.
Apply Electron fuses to packaged output. This gives later features a secure default rather than
retrofitting isolation.

## 002 — One validated transport, named preload methods

Use one internal invoke channel with strict discriminated Zod contracts, while exposing only named,
frozen preload methods. Main validates sender, schema, ownership, and response. This keeps channel
mechanics private without creating a generic privileged tunnel.

## 003 — Main process is the sole database owner

Open SQLite through `better-sqlite3` only in main, with WAL and foreign keys. Use Drizzle for typed
schema/query work. Workers operate on bounded values and return bounded results. This makes durable
authorization and transaction order enforceable in one trust boundary.

## 004 — Conservative initial budgets

Start with UI pages and Gmail/worker batches of at most 100, low per-account/global concurrency,
and five bounded transient retries. These are safety defaults, not capacity results. Milestones 014
and 016 must measure and revise them if evidence supports it.

## 005 — Current platform and dependency assumptions

Apple silicon macOS with Node 24 is the first development environment. Use the Electron 39 / Forge
7 / Vite 7 version ranges selected for this scaffold, React 19, TypeScript 5.9, SQLite, Drizzle, and
Zod. Compatibility still needs the blocked dependency install and package check; Forge is configured
to rebuild the native SQLite module for Electron. Cross-platform packaging, signing, and real Google
setup remain explicit later validation.

## 006 — Release readiness is evidence-gated

Treat implementation, deterministic simulation, packaged-host validation, and real-environment
validation as separate evidence classes. A source inspection, static shell, short test, or started
background process cannot substitute for an end-to-end rehearsal, completed capacity benchmark,
or completed multi-hour soak. Customer readiness remains false while any required milestone is
blocked or while Google/OAuth, customer consent and retention policy, real-mailbox smoke,
signing/notarization, or other applicable distribution checks are unperformed.

Milestone 018 does not create a parallel rehearsal harness when its workflow dependencies are
absent. It records the release gate, preserves future-feature boundaries, and resumes only after
the dependency implementations and evidence exist.
