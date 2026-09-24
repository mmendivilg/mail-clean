# Shared execution instructions

These prompts implement the first version described by the repository README. Read this file and the current README at the start of each milestone; also follow applicable AGENTS.md instructions. The prompt bundle is a development plan, not authorization to operate customer mailboxes.

## Working autonomously

- Inspect existing code before editing. Complete the milestone end to end, including relevant verification and documentation; reuse existing work instead of scaffolding replacements.
- Resolve reversible implementation details yourself and record material assumptions in docs/decisions.md. Default to the proposed Electron/React/TypeScript/SQLite stack, the current host as the first validated platform, and deterministic simulated Gmail data.
- Consult current primary documentation for APIs, OAuth, security-sensitive library behavior, and compatibility. Never invent credentials, passing results, provider capabilities, or completed external setup.
- Do not stop for routine naming, component, layout, or dependency choices. For unavailable Google credentials, owner consent, signing identities, or GUI facilities, complete testable adapters, fake workflows, documentation, and other independent work. Record exactly what remains unavailable.
- If a required technical prerequisite fails, fix a bounded prerequisite defect when practical. Otherwise record the blocker and finish only independent work inside the current milestone. Runner-dispatched tasks must not start later milestones or bypass required dependencies. Never substitute a stub for a passed dependency.
- Keep work scoped, preserve unrelated user changes, and do not reset or discard work. Maintain the lockfile. Use synthetic fixtures and temporary directories for testing. Do not create speculative abstraction layers or implement deferred features.
- Update docs/development-status.md after each implementation step and milestone with status, changed files, commands, actual results, decisions, blockers, and next eligible work. Create it if absent. Use the current 001–018 milestone numbers with per-step progress. Reconcile any older milestone numbering against actual code and evidence. Record progress during long milestones so another task can resume.
- Use statuses: pending, in-progress, implemented-needs-verification, blocked, complete. Complete requires the stated checks to have actually passed; simulated verification must be labeled as such. Track external release blockers separately even when a coding milestone is complete.
- Run appropriate checks, inspect failures, fix relevant defects, and rerun affected checks. Do not repeat full suites without a reason. Use the repository's Git conventions; keep changes locally reviewable and never push or publish as part of this bundle.

## Product invariants

- Keep customers, sessions, accounts, candidates, approvals, and history isolated. All queries and privileged commands enforce ownership.
- Protection rules take precedence. Unknown required data stays uncertain. Cleanup requires an exact durable approved message set and fresh eligibility checks; newly discovered items never inherit approval.
- Complete discovery for the execution scope before mutations. Incremental preview and attachment ranking are allowed but must show incompleteness.
- Journal intent before mutation and reconcile uncertain results. Never infer exactly-once remote execution from retries alone. Pause safely if durable progress cannot be written.
- Trash individual messages, preserve newer replies, and keep permanent deletion and automatic cleanup outside v1. Restoration must respect subsequent external edits.
- Routine scans fetch minimal metadata/structure and no attachment content. Downloads require a separate explicit opt-in and a bounded implementation. Whole-message size is not individual attachment size.
- Keep memory, concurrency, request rates, retries, cache, logs, and temporary files bounded. Durable metadata and audit records may grow with work; measure and explain that growth.
- Keep tokens in OS-backed protected storage, out of the renderer/logs/reports. Do not send email contents to AI or any added cloud service in v1.

## Boundaries for unattended development

Creating code for customer-approved actions is authorized. Testing those actions against deterministic fake Gmail and synthetic local files is authorized. Real Google sign-in, real mailbox reads or changes, actual attachment downloads, account revocation, customer-data removal, cloud deployment, remote publication, and paid services require separate explicit user direction. Do not request those actions merely to finish a coding milestone; record the external step and continue independent work.

A started build, background benchmark, or soak is not a successful result. Await actual completion when the environment allows it. Preserve long-run evidence and mark interrupted runs incomplete. Do not invent an automatic wakeup or scheduler; use a documented manual resume command if the active task cannot continue.

## Control-plane task execution

Each numbered queue file has YAML metadata. Treat `dependsOn` as a whole-task success gate; every task is required and ordered after its predecessor. Do not bypass an incomplete dependency using a partial implementation. Execute only the dispatched file and stop with its completion report; the external runner selects the next task. Reports and generated documentation belong in workspace `docs/`, never in the scanned `development-prompts/queue/` folder.

A manually submitted RUN-ALL.md orchestrates the sequence in one task instead of using external dispatch. In that manual mode it may explicitly continue after a completed milestone; this does not authorize ignoring dependencies or marking incomplete verification successful.
