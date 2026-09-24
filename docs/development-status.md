# Development status

## Milestone 001 — Architecture and secure desktop foundation

Status: **blocked**

| Step                                           | Status                         | Durable progress                                                                                                                                               |
| ---------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Read repository requirements and instructions  | complete                       | Read `README.md` and `development-prompts/SHARED-INSTRUCTIONS.md`; no prior status or app existed                                                              |
| Define architecture and requirement map        | complete                       | Added `docs/architecture.md`, `docs/requirements.md`, `docs/decisions.md`, and contributor `AGENTS.md`                                                         |
| Scaffold Electron/React/TypeScript application | implemented-needs-verification | Forge/Vite config, hardened main window, SQLite/Drizzle foundation, shell, and simulated state exist; dependency-backed checks remain unavailable              |
| Implement typed IPC boundary                   | implemented-needs-verification | Strict Zod contracts, named preload API, sender/ownership checks, bounds, sanitized errors, and tests exist; cached-dependency smoke passed six required cases |
| Install locked dependencies                    | blocked                        | Registry DNS failed and offline install reported Forge metadata `ENOTCACHED`; no lockfile or `node_modules` exists                                             |
| Automated and launch/package verification      | blocked                        | Required npm scripts exit 127 because tools are uninstalled; no Electron/GUI launch or Forge package was performed                                             |
| Validation evidence and completion assessment  | complete                       | Actual commands, limited passing checks, failed gates, external gaps, and resume steps are in `docs/validation/milestone-001.md`                               |

### Assumptions and external gaps

- Current implementation and tests use only the unmistakably labeled synthetic session/account.
- Milestone 001 is not complete: registry access is required to generate the lockfile and run the
  full type, lint, test, packaging, native-module, and window verification gates.
- No Google Cloud project, OAuth credentials, Workspace policy, signing identity, or real mailbox is
  available or required for independent milestone-001 implementation.
- Real Google consent and mailbox validation, code signing/notarization, non-macOS packages, and
  representative scale/failure testing remain later external or scheduled validation.

## Milestone 002 — Durable database and customer sessions

Status: **blocked**

| Step                                                | Status  | Durable progress                                                                                                                                                                             |
| --------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Read requirements and inspect the existing scaffold | complete | Read the repository, contributor, shared execution, architecture, decision, status, and relevant source files; confirmed milestone 001 is recorded as blocked                                |
| Recheck required milestone-001 dependency           | blocked | `npm install --no-audit --no-fund --fetch-retries=0 --fetch-timeout=10000` failed with registry DNS `ENOTFOUND`; `package-lock.json` and `node_modules` remain absent                          |
| Implement durable database foundation               | pending | Not started because required milestone 001 is incomplete and the task explicitly prohibits bypassing an incomplete dependency                                                               |
| Implement customer/session management and IPC/UI     | pending | Not started for the same dependency reason; no unverified schema, repository, service, IPC, or renderer changes were introduced                                                              |
| Run milestone-002 verification                      | blocked | `npm run typecheck` and `npm test` both exited 127 because `tsc` and `vitest` are unavailable; database migration, rollback, isolation, restart/reopen, stale-request, and visible IPC checks were not run |
| Record validation and completion assessment          | complete | Commands, observed outcomes, unperformed checks, assumptions, and resume steps are recorded in `docs/validation/milestone-002.md`                                                            |

### Milestone-002 assumptions, blocker, and resume steps

- The dependency contract is treated as a hard gate: milestone 002 cannot begin while required
  milestone 001 remains blocked and unverified.
- Registry/network availability is the immediate blocker. This is a development-environment gap,
  not a Google/Gmail setup gap; no Google configuration is needed for milestone-002 synthetic tests.
- Resume by restoring npm registry DNS/access, running `npm install` to create and preserve the
  lockfile, and completing all milestone-001 gates and its status update. Then implement milestone
  002 from the existing scaffold and run every verification named in its task prompt.

## Milestone 003 — Gmail simulator and bounded data access

Status: **blocked**

| Step                                                   | Status  | Durable progress                                                                                                                                                                                   |
| ------------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Read requirements and inspect the existing architecture | complete | Read the repository, contributor, shared execution, architecture, decisions, status, database, domain, IPC, preload, renderer, worker, and existing test files                                     |
| Verify required milestone-002 dependency               | blocked | Milestone 002 remains explicitly blocked and incomplete: its durable database and customer/session work is pending, and the workspace still has neither `package-lock.json` nor `node_modules`      |
| Implement deterministic Gmail simulator and contract   | pending | Not started because the required milestone-002 dependency may not be bypassed; no simulator, provider contract, fixture generator, or provider-mode persistence changes were introduced             |
| Implement bounded scoped repositories and IPC          | pending | Not started for the same dependency reason; the prerequisite scoped customer/session/account database records and repositories do not exist                                                        |
| Run milestone-003 contract and pagination verification | blocked | A dependency install recheck failed with registry DNS `ENOTFOUND`; `npm run typecheck` and `npm test` exited 127 because `tsc` and `vitest` are unavailable, so no required milestone-003 checks ran |
| Record validation and completion assessment            | complete | Commands, observed outcomes, unperformed checks, assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-003.md`                                             |

### Milestone-003 assumptions, blocker, and resume steps

- The task's `dependsOn: ["002"]` contract is a hard gate. Implementing Gmail data access on the
  current foundation-only database would bypass missing ownership and isolation guarantees.
- Registry/DNS access is the immediate environment gap preventing installation and verification.
  Missing Google setup is not a blocker for the deterministic simulator work, but live Google
  validation remains outside unattended scope.
- Resume by completing and verifying milestones 001 and 002 in order. Then implement milestone
  003 against the durable scoped schema and run every contract, pagination, query-plan, bounded
  large-dataset, and renderer-path verification required by its prompt.

## Milestone 004 — Durable background jobs and request scheduling

Status: **blocked**

| Step                                                       | Status  | Durable progress                                                                                                                                                                                                 |
| ---------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Read requirements and inspect the existing architecture    | complete | Read the contributor and shared instructions, README, architecture, decisions, prior status/validation, package configuration, and relevant source layout                                                        |
| Verify required milestones 001, 002, and 003               | blocked | All three dependencies remain explicitly incomplete; milestones 002 and 003 have pending implementation, and the workspace still has neither `package-lock.json` nor `node_modules`                              |
| Implement durable job state, checkpoints, and recovery     | pending | Not started because the runner contract forbids bypassing incomplete required dependencies; the scoped customer/session/account and Gmail provider/data foundations this state must own do not exist             |
| Implement supervised utility process and bounded transport | pending | Not started for the same dependency reason; adding an alternate database owner now would also contradict the current architecture before the required database ownership work is reconciled                      |
| Implement request scheduler, budgets, and persisted retries | pending | Not started because account-scoped provider operations and persistence from milestones 002–003 are absent                                                                                                        |
| Run milestone-004 verification                             | blocked | `npm run typecheck` and `npm test` both exited 127 because `tsc` and `vitest` are unavailable; none of the required state, recovery, worker-crash, responsiveness, timeout, retry, fairness, or exhaustion checks ran |
| Record validation and completion assessment                | complete | Commands, observed outcomes, unperformed checks, assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-004.md`                                                            |

### Milestone-004 assumptions, blocker, and resume steps

- The task's `dependsOn: ["001", "002", "003"]` contract is a hard gate. The recorded failures
  match the inspected workspace and are not stale status-only entries.
- npm registry/network availability remains the first external environment gap. Missing Google
  setup does not block deterministic fake job and scheduler tests, but live Gmail validation is a
  separate unperformed external step.
- Resume by restoring dependency availability and completing and verifying milestones 001, 002,
  and 003 in order. Then implement milestone 004 against their scoped schema/provider contracts and
  run every transition, durability, ownership, process-supervision, responsiveness, and fake-clock
  scheduler check required by its prompt.

## Milestone 005 — Secure Google sign-in and Gmail integration

Status: **blocked**

| Step                                                        | Status  | Durable progress                                                                                                                                                                                                       |
| ----------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Read requirements and inspect the existing architecture     | complete | Read the contributor and shared instructions, README, architecture/decisions, prior status and validation records, package configuration, and relevant database, domain, IPC, and worker source                        |
| Verify required milestones 001, 002, 003, and 004            | blocked | All four dependencies remain explicitly incomplete; inspection confirms the durable customer/session/account layer, Gmail provider/simulator, and durable job/scheduler foundations required by this milestone are absent |
| Implement protected credential storage                      | pending | Not started because the dependency contract forbids bypassing incomplete required work; no safeStorage vault, token reference persistence, or credential IPC was added                                                 |
| Implement Google desktop OAuth and account onboarding       | pending | Not started for the same dependency reason; no OAuth client, loopback callback listener, account onboarding, or reconnect UI was added                                                                                  |
| Implement the real Gmail read adapter                       | pending | Not started because the provider contract and bounded account-scoped data layer from milestone 003 do not exist; no Google client dependency or live read path was added                                                |
| Run milestone-005 verification                              | blocked | Fresh typecheck, lint, format, and test commands exited 127 because their tools are unavailable; no credential, OAuth, Gmail contract, packaging, native safeStorage, or interactive checks ran                         |
| Record validation and completion assessment                 | complete | Commands, observed outcomes, unperformed checks, external gaps, and exact resume steps are recorded in `docs/validation/milestone-005.md`                                                                               |

### Milestone-005 assumptions, blocker, and resume steps

- The task's `dependsOn: ["001", "002", "003", "004"]` contract is a hard gate. The recorded
  failures match the current source and are not stale status-only entries.
- Adding OAuth/account records without milestone 002, a second Gmail contract without milestone
  003, or alternate scheduling without milestone 004 would bypass the required ownership and
  reliability architecture.
- Resume by restoring dependency availability and completing and verifying milestones 001–004 in
  order. Then re-dispatch milestone 005 and implement it against those established contracts.
- Google Cloud project configuration, owner consent, production OAuth verification, Workspace
  policy review, and a separately authorized real-account validation remain external gaps. They do
  not prevent later fake-provider, synthetic-response, or injected-vault verification once the
  prerequisite milestones are complete.

## Milestone 006 — Protection rules, dates, and scope editor

Status: **blocked**

| Step                                                    | Status  | Durable progress                                                                                                                                                                                                           |
| ------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions, prior status and validation records, package configuration, and relevant database, domain, IPC, preload, renderer, and test files            |
| Verify required milestones 002, 003, and 005             | blocked | All three declared dependencies remain explicitly incomplete; source inspection confirms the scoped customer/session/account store, Gmail provider/data contract, and Google integration required by this milestone are absent |
| Implement rule evaluation and date/scope utilities       | pending | Not started because the runner contract forbids bypassing incomplete required dependencies; no parallel identity, message metadata, provider-query, or policy-version model was introduced                                |
| Implement immutable rule storage and configuration UI    | pending | Not started for the same dependency reason; the database has no session/account/approval records to own policy versions and the privileged boundary exposes only the foundation status operation                           |
| Run milestone-006 verification                           | blocked | Fresh typecheck, lint, format, and test commands exited 127 because their tools are unavailable; none of the required evaluator, date, scope, persistence, preview, approval-history, or editor checks ran                  |
| Record validation and completion assessment              | complete | Commands, observed outcomes, unperformed checks, assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-006.md`                                                                      |

### Milestone-006 assumptions, blocker, and resume steps

- The task's `dependsOn: ["002", "003", "005"]` contract is a hard gate. The recorded failures
  match the inspected source and are not stale status-only entries.
- Implementing rules against the foundation-only schema would create a second ownership and message
  model, leave rule versions unscoped, and make approval invalidation unverifiable.
- Resume by restoring dependency availability and completing and verifying milestones 001–005 in
  order. Then re-dispatch milestone 006, implement it against the established scoped persistence and
  Gmail metadata contracts, and run every rule, cutoff, scope, persistence, IPC, and UI check in its
  prompt.
- Google Cloud setup and a separately authorized real-mailbox validation remain external gaps, but
  they do not block the deterministic fake-provider and synthetic policy tests once prerequisites
  are complete. npm registry availability was not retested during this milestone; the local
  dependency-backed toolchain is still absent.

## Milestone 007 — Resumable discovery, classification, and preview

Status: **blocked**

| Step                                                    | Status  | Durable progress                                                                                                                                                                                                                                      |
| ------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions, prior status and milestone 003–006 validation records, package configuration, and relevant database, domain, IPC, preload, renderer, worker, and test files              |
| Verify required milestones 003, 004, 005, and 006       | blocked | All four declared dependencies remain explicitly incomplete; source inspection confirms the Gmail provider/data layer, durable job/checkpoint engine, Google integration, immutable rule versions, and scoped ownership records are absent             |
| Implement incremental resumable discovery               | pending | Not started because the runner contract forbids bypassing incomplete dependencies; no parallel identity, Gmail cursor, job checkpoint, or candidate persistence contract was introduced                                                             |
| Implement persisted classification and preview          | pending | Not started for the same dependency reason; there is no established rule-version evaluator, scoped candidate/approval history, or owned main-process query path on which to build classification decisions and read-only preview                     |
| Run milestone-007 verification                          | blocked | Fresh typecheck, lint, format, and test commands exited 127 because their tools are unavailable; none of the required crash, stale/duplicate/empty page, disappearance, restart, rule-fixture, preview-read-only, or approval-isolation checks ran       |
| Record validation and completion assessment             | complete | Commands, observed outcomes, unperformed checks, material assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-007.md`                                                                                      |

### Milestone-007 assumptions, blocker, and resume steps

- The task's `dependsOn: ["003", "004", "005", "006"]` contract is a hard gate. The recorded
  failures match the inspected source and are not stale documentation-only entries.
- Implementing discovery and preview against the foundation-only schema would duplicate the
  missing scoped ownership, Gmail, scheduler, and policy contracts and would make recovery,
  decision history, and approval isolation unverifiable.
- Resume by restoring dependency availability and completing and verifying milestones 001–006 in
  order. Then re-dispatch milestone 007 and implement it against those established contracts.
- Google Cloud setup and a separately authorized real-mailbox validation remain external gaps, but
  they do not block deterministic fake-provider crash/restart and preview verification once the
  prerequisite milestones are complete. The local dependency-backed toolchain is still absent.

## Milestone 008 — Attachment metadata and largest-attachment review

Status: **blocked**

| Step                                                    | Status   | Durable progress                                                                                                                                                                                                                                                |
| ------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions, prior status and milestone 003, 005, and 007 validation records, package configuration, and relevant database, domain, IPC, preload, renderer, worker, and test files              |
| Verify required milestones 003, 005, and 007             | blocked  | All three declared dependencies remain explicitly incomplete; source inspection confirms the scoped Gmail provider/data layer, Google integration, resumable discovery, candidate records, and account/message ownership records required here are absent         |
| Implement bounded MIME metadata parsing and indexing    | pending  | Not started because the runner contract forbids bypassing incomplete dependencies; no parallel message identity, provider structure-read contract, scheduler, attachment migration, or enrichment checkpoint was introduced                                    |
| Implement largest-attachment review                     | pending  | Not started for the same dependency reason; there is no established scoped message/candidate/protection model or completed discovery scope against which to implement safe database rankings, filters, parent-message selection, and execution gating             |
| Run milestone-008 verification                          | blocked  | Fresh install/typecheck/lint/format/test commands failed because the lockfile and installed tools are absent; none of the required parser, no-content-fetch, restart/deduplication, database-wide filtering, stable ordering, incomplete-ranking, or UI checks ran |
| Record validation and completion assessment             | complete | Commands, observed outcomes, unperformed checks, material assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-008.md`                                                                                                  |

### Milestone-008 assumptions, blocker, and resume steps

- The task's `dependsOn: ["003", "005", "007"]` contract is a hard gate. The recorded failures
  match the inspected source and are not stale documentation-only entries.
- Implementing attachment structure reads and indexing against the foundation-only schema would
  duplicate the missing scoped message identity, Gmail provider, scheduler, discovery-completion,
  candidate, protection, and approval contracts and would make the requested ownership and cleanup
  safety guarantees unverifiable.
- Resume by restoring dependency availability and completing and verifying milestones 001–007 in
  order. Then re-dispatch milestone 008, implement it against those established contracts, and run
  every parser, content-exclusion, recovery, deduplication, query/filter, ordering, scope-completion,
  unique-message-count, IPC, and UI check required by its prompt.
- Current official Gmail message/part field semantics and a separately authorized real-mailbox
  validation remain unreviewed external validation gaps for this blocked run. They do not prevent
  eventual deterministic fake-provider and synthetic-structure verification once prerequisites are
  complete. No real mailbox or attachment content was accessed.

## Milestone 009 — Review queue and exact customer approvals

Status: **blocked**

| Step | Status | Durable progress |
| --- | --- | --- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions/requirements, prior status and milestone 003, 006, 007, and 008 validation records, package configuration, and relevant database, domain, IPC, preload, renderer, worker, and test files. |
| Verify required milestones 003, 006, 007, and 008 | blocked | All four declared dependencies remain explicitly incomplete; source inspection confirms the scoped Gmail data path, immutable rules, resumable candidate discovery, discovery-completeness state, and attachment-parent index required by this milestone are absent. |
| Implement persisted review queue and decisions | pending | Not started because the runner contract forbids bypassing incomplete dependencies; no parallel candidate identity, keep-decision, filter, selection, or attachment-parent model was introduced. |
| Implement exact durable approval materialization | pending | Not started for the same dependency reason; there is no established scoped candidate set, rule version, discovery revision, or ownership repository from which to transactionally capture an executable exact-message snapshot. |
| Implement final customer confirmation and execution review | pending | Not started because a persisted confirmation cannot safely reference a valid approval until the prerequisite ownership, protection, candidate, and approval-invalidation contracts exist. |
| Run milestone-009 verification | blocked | Fresh install/typecheck/lint/format/test commands failed because the lockfile and installed tools are absent; none of the required review, restart, stale-state, interruption, exact-snapshot, protection, confirmation, launch-safety, or simulated end-to-end checks ran. |
| Record validation and completion assessment | complete | Commands, observed outcomes, unperformed checks, material assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-009.md`. |

### Milestone-009 assumptions, blocker, and resume steps

- The task's `dependsOn: ["003", "006", "007", "008"]` contract is a hard gate. The recorded
  failures match the inspected source and are not stale documentation-only entries.
- Implementing review and approval against the foundation-only schema would duplicate the missing
  scoped message/candidate, immutable rule, discovery-completeness, and attachment-parent contracts
  and make exact-set durability, keep/protection enforcement, and approval invalidation
  unverifiable.
- Resume by restoring dependency availability and completing and verifying milestones 001–008 in
  order. Then re-dispatch milestone 009 and run every selection, pagination, restart, interruption,
  stale-state, exact-approval, confirmation, and app-launch safety check in its prompt.
- Google Cloud/OAuth setup, customer retention and Vault policy review, and a separately authorized
  real-mailbox validation remain external gaps. They do not block later deterministic fake-provider
  and synthetic approval tests after the prerequisite implementation and toolchain are available.

## Milestone 010 — Approved Trash execution and crash recovery

Status: **blocked**

| Step | Status | Durable progress |
| --- | --- | --- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions/requirements, current status, direct dependency validation records, package configuration, and relevant database, domain, IPC, preload, renderer, worker, and test files. |
| Verify required milestones 004, 005, and 009 | blocked | All three declared dependencies remain explicitly incomplete. Source inspection confirms that the durable job/scheduler, Gmail mutation adapter, scoped policy/candidate model, exact approval snapshot, and execution confirmation required by this milestone are absent. |
| Implement action journal and mutation preflight | pending | Not started because the runner contract prohibits bypassing incomplete dependencies; there is no established scoped action owner, valid approval/confirmation source, rule version, keep decision, or provider state to preflight. |
| Implement approved message-level Trash execution | pending | Not started for the same dependency reason; no alternate Gmail provider, request scheduler, ownership model, or unverified mutation path was introduced. |
| Implement bounded crash reconciliation | pending | Not started because durable work ownership, provider reads, approval evidence, and action intents do not exist. Adding standalone recovery state would create a parallel architecture and could not establish safe attribution. |
| Run milestone-010 verification | blocked | `npm ci` failed because no lockfile exists; typecheck, lint, format check, and tests exited 127 because their tools are unavailable. None of the required preflight, mutation, concurrency, interruption, reconciliation, or external-edit scenarios ran. |
| Record validation and completion assessment | complete | Commands, observed outcomes, unperformed checks, assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-010.md`. |

### Milestone-010 assumptions, blocker, and resume steps

- The task's `dependsOn: ["004", "005", "009"]` contract is a hard gate. The recorded failures
  agree with the inspected workspace and are not stale documentation-only entries.
- Implementing cleanup now would duplicate the missing scheduler/provider/approval contracts and
  could not prove that every individual Trash request had a committed intent, current approval,
  successful preflight, or single execution owner.
- Resume by restoring dependency availability and completing and verifying milestones 001–009 in
  order. Then re-dispatch milestone 010 and implement its journal, fresh eligibility checks,
  individual-message Trash path, bounded execution ownership, and evidence-preserving recovery.
- Google Cloud/OAuth setup and separately authorized live-mailbox validation remain external gaps,
  but they do not block deterministic fake-Gmail implementation and interruption testing after the
  prerequisite contracts and local toolchain are available. No real mailbox operation was attempted.

## Milestone 011 — Multiple mailboxes, operator controls, and restoration

Status: **blocked**

| Step | Status | Durable progress |
| --- | --- | --- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions/requirements, current status, direct dependency validation records, package configuration, and relevant database, domain, IPC, preload, renderer, worker, and test files. |
| Verify required milestones 004, 007, and 010 | blocked | All three declared dependencies remain explicitly incomplete. Source inspection confirms that the durable scheduler, resumable scoped discovery/candidate model, exact approval, cleanup action journal, message-level mutation adapter, and reconciliation evidence required by this milestone are absent. |
| Implement fair multi-mailbox coordination | pending | Not started because the runner contract prohibits bypassing incomplete dependencies; no second job store, scheduler, account owner, or Gmail provider contract was introduced. |
| Implement operator dashboard and durable controls | pending | Not started because there are no persisted jobs or work-unit claims for pause, resume, cancel, retry, reconnect, stale-command, or progress behavior to control truthfully. |
| Implement tracked message restoration | pending | Not started because milestone 010 has no cleanup intents or confirmed/reconciled outcomes to establish attribution, approval eligibility, original-label history, or safe uncertain-restore recovery. |
| Run milestone-011 verification | blocked | `npm ci` failed because no lockfile exists; typecheck, lint, format check, and tests exited 127 because their tools are unavailable. None of the required three-account fairness, lifecycle/restart, UI reconnection, retry, restoration, external-edit, or crash-after-untrash scenarios ran. |
| Record validation and completion assessment | complete | Commands, observed outcomes, unperformed checks, material assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-011.md`. |

### Milestone-011 assumptions, blocker, and resume steps

- The task's `dependsOn: ["004", "007", "010"]` contract is a hard gate. The recorded failures
  agree with direct source inspection and are not stale documentation-only entries.
- Building multi-account queues, controls, or restoration against the foundation-only scaffold
  would duplicate the missing ownership, scheduler, provider, candidate, approval, and action
  journal contracts. It could not prove fair claims, approval continuity, cleanup attribution, or
  conservative restoration of externally edited labels.
- Resume by restoring dependency availability and completing and verifying milestones 001–010 in
  order. Then re-dispatch milestone 011 and implement it against the established scheduler,
  discovery, approval, cleanup, and reconciliation records.
- Google Cloud/OAuth setup and separately authorized live-mailbox validation remain external gaps,
  but they do not block eventual deterministic three-account and fake-Gmail restoration tests once
  the prerequisite implementation and local toolchain are available. No real mailbox operation was
  attempted.

## Milestone 012 — Explicit attachment downloads from selection to results

Status: **blocked**

| Step | Status | Durable progress |
| --- | --- | --- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions/requirements, current status, direct dependency validation records, package configuration, and relevant database, domain, IPC, preload, renderer, worker, and test files. |
| Verify required milestones 004, 008, 009, and 011 | blocked | All four declared dependencies remain explicitly incomplete. Source inspection confirms that the durable job/scheduler, attachment index and exact part identity, durable selection/approval records, Gmail attachment adapter, and restart-safe operator controls required by this milestone are absent. |
| Implement explicit durable download plans | pending | Not started because the runner contract prohibits bypassing incomplete dependencies; no parallel account/message/attachment identity, destination grant, download authorization, snapshot, or job-wide policy model was introduced. |
| Implement bounded safe attachment retrieval and file handling | pending | Not started because there is no authorized Gmail content adapter, durable scheduler/control state, or exact selected attachment record against which to enforce byte limits, cancellation, retry, and per-attachment outcomes. |
| Implement destination selection, download controls, and results | pending | Not started because safe picker IPC and renderer controls cannot truthfully plan or operate downloads without the prerequisite ownership, attachment, approval, and job repositories. |
| Run milestone-012 verification | blocked | `npm ci` failed because no lockfile exists; typecheck, lint, format check, tests, and packaging exited 127 because their tools are unavailable. None of the required default-off, pagination, destination, filename/path, size-limit, disk, cancellation, restart, decoding, mixed-result, authorization-separation, or UI scenarios ran. |
| Record validation and completion assessment | complete | Commands, observed outcomes, unperformed checks, material assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-012.md`. |

### Milestone-012 assumptions, blocker, and resume steps

- The task's `dependsOn: ["004", "008", "009", "011"]` contract is a hard gate. The recorded
  failures agree with direct source inspection and are not stale documentation-only entries.
- Implementing downloads against the foundation-only scaffold would duplicate missing scoped
  attachment, approval, scheduler, and operator-control contracts. It could not prove default-off
  behavior, snapshot authorization, bounded restart-safe retrieval, or separation from Trash
  approval.
- Resume by restoring dependency availability and completing and verifying milestones 001–011 in
  order. Then re-dispatch milestone 012 and implement it against the established provider,
  attachment index, approvals, durable jobs, and controls before running every required synthetic
  download, filesystem-safety, interruption, restart, mixed-result, IPC, and UI scenario.
- Google Cloud/OAuth setup and separately authorized live-mailbox/download validation remain
  external gaps, but they do not block eventual deterministic fake-Gmail and synthetic-file tests
  once the prerequisites and local toolchain are available. No real attachment content was fetched,
  no output file was created, and no mailbox mutation was attempted.

## Milestone 013 — Reports, account disconnect, and session closeout

Status: **blocked**

| Step | Status | Durable progress |
| --- | --- | --- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions/requirements, current status, direct dependency validation records, package configuration, and relevant database, domain, IPC, preload, renderer, worker, and test files. |
| Verify required milestones 005, 011, and 012 | blocked | All three declared dependencies remain explicitly incomplete. Source inspection confirms that protected credentials and account ownership, durable jobs and action/restoration journals, multi-account controls, attachment-download results, and the report facts required by this milestone are absent. |
| Implement bounded session and cleanup reports | pending | Not started because the runner contract prohibits bypassing incomplete dependencies; there are no established scoped sessions/jobs, rule and approval versions, action outcomes, restoration evidence, or download records from which to derive accurate reports and exports. |
| Implement disconnect and optional Google access revocation | pending | Not started because milestone 005 has no credential vault, token references, account records, OAuth adapter, or provider authorization lifecycle, while milestone 011 has no durable job controls with which to stop new work and settle or preserve in-flight outcomes. |
| Implement explicit scoped cache and retained-data removal | pending | Not started because there is no customer-owned durable data model, managed cache/file inventory, job stop protocol, token-reference store, backup policy implementation, or purge recovery journal against which to prove isolation and interruption safety. |
| Run milestone-013 verification | blocked | Fresh `npm ci` failed because no lockfile exists; typecheck, lint, format check, and tests exited 127 because their tools are unavailable. None of the required report reconciliation/export, disconnect/revocation, multi-account, or synthetic purge-recovery scenarios ran. |
| Record validation and completion assessment | complete | Commands, observed outcomes, unperformed checks, material assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-013.md`. |

### Milestone-013 assumptions, blocker, and resume steps

- The task's `dependsOn: ["005", "011", "012"]` contract is a hard gate. The recorded failures
  agree with direct source inspection and are not stale documentation-only entries.
- Implementing closeout against the foundation-only scaffold would create parallel account, job,
  report, download, and data-ownership models. It could not prove report accuracy, stop scheduling
  before credential removal, distinguish local disconnect from remote revocation, or isolate an
  interrupted customer purge.
- Resume by restoring dependency availability and completing and verifying milestones 001–012 in
  order. Then re-dispatch milestone 013 and implement it against the established credential,
  scheduler, journal, restoration, and download records before running every required synthetic
  report, disconnect, revocation, and purge scenario.
- Current official Google revocation semantics and a separately authorized real-account revocation
  remain unreviewed external validation gaps for this blocked run. No real account, credential,
  mailbox data, downloaded file, export, or customer storage was accessed, revoked, or removed.

## Milestone 014 — Resource limits, diagnostics, and database backups

Status: **blocked**

| Step | Status | Durable progress |
| --- | --- | --- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions/requirements, current status, all direct dependency validation records, package configuration, and relevant database, domain, IPC, preload, renderer, worker, and test files. |
| Verify required milestones 002, 008, 011, 012, and 013 | blocked | All five declared dependencies remain explicitly incomplete. Source inspection confirms that durable scoped sessions, attachment records, jobs and controls, approvals and action journals, download results, reports, managed caches, and purge ownership are absent. |
| Harden disk, cache, memory, temporary-file, and WAL limits | pending | Not started because the runner contract prohibits bypassing incomplete dependencies; there are no established batch/download/export operations, durable job states, approval/history repositories, action-intent boundary, managed cache inventory, or production migration layer to harden safely. |
| Add bounded privacy-preserving diagnostics | pending | Not started because job phases, retry state, worker restart ownership, scoped errors, schema migrations, and operator export operations do not exist. Adding a standalone logger now could not verify that logging failures remain subordinate to essential durable state. |
| Add consistent database backup and recovery | pending | Not started because milestone 002 has no migration framework, supported schema-version contract, scoped approval/history data, or reopen/recovery behavior. A backup format built around the foundation-only table would not validate upgrade, downgrade, corruption, or historical-action safety. |
| Run milestone-014 verification | blocked | Fresh `npm ci` failed because no lockfile exists; typecheck, lint, format check, and tests exited 127 because their tools are unavailable. None of the required failure injection, bounded-memory/cache, redaction/rotation, migration, active-backup, restore, corruption, or newer-schema scenarios ran. |
| Record validation and completion assessment | complete | Commands, observed outcomes, unperformed checks, material assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-014.md`. |

### Milestone-014 assumptions, blocker, and resume steps

- The task's `dependsOn: ["002", "008", "011", "012", "013"]` contract is a hard gate. The
  recorded failures agree with direct source inspection and are not stale documentation-only
  entries.
- Implementing resource controls, diagnostics, or backups against the foundation-only scaffold
  would create a parallel job/resource/schema lifecycle. It could not prove that approvals and
  history survive cleanup, that mutations stop before durability fails, that restored historical
  actions cannot execute, or that diagnostic exports cover real job failures without leaking
  mailbox data.
- Resume by restoring dependency availability and completing and verifying milestones 001–013 in
  order. Then re-dispatch milestone 014 and implement it against the established scoped database,
  scheduler, approval/action journals, downloads, reports, and managed-storage inventory before
  running every required synthetic failure, resource-growth, redaction, migration, backup, and
  restore scenario.
- Representative large-dataset and multi-hour capacity validation, separately authorized real
  mailbox behavior, and operational restore rehearsal remain external validation gaps. They do not
  replace the deterministic failure-injection and synthetic SQLite verification required when the
  dependencies and local toolchain are available. No real customer data, credentials, attachment
  content, mailbox operation, export, backup, or destructive cleanup was used.

## Milestone 015 — Operator usability and failure regression testing

Status: **blocked**

| Step | Status | Durable progress |
| --- | --- | --- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions, current status, every direct dependency validation record, package configuration, and relevant database, domain, IPC, preload, renderer, worker, and test files. |
| Verify required milestones 006 and 008–014 | blocked | All eight declared dependencies remain explicitly incomplete. Source inspection confirms that the connection-to-closeout operator workflow and the persistence/provider/worker/filesystem/migration boundaries required for usability and fault regression testing are absent. |
| Review and improve the complete operator interface | pending | Not started because the complete interface does not exist. The current renderer is a static milestone-001 simulated shell with text-only view changes; implementing substitute workflow screens would bypass dependencies and could not represent real state or action effects. |
| Build the cross-layer fault-injection regression suite | pending | Not started because there are no discovery, approval, cleanup, restoration, download, or migration paths to interrupt. No parallel fake workflow or persistence model was introduced. |
| Run milestone-015 verification | blocked | Fresh `npm ci` failed because no lockfile exists; typecheck, lint, format check, tests, and packaging could not find their tools. No keyboard-driven end-to-end session, visual/window/table check, screenshot, or required fault-matrix scenario ran. |
| Record validation and completion assessment | complete | Commands, observed outcomes, unperformed checks, explicit unknown safety outcomes, external gaps, and exact resume steps are recorded in `docs/validation/milestone-015.md`. |

### Milestone-015 assumptions, blocker, and resume steps

- The task's `dependsOn: ["006", "008", "009", "010", "011", "012", "013", "014"]`
  contract is a hard gate. The recorded failures agree with direct source inspection and are not
  stale documentation-only entries.
- A usability/fault harness built against the foundation-only scaffold would create parallel
  operator and data lifecycles. It could not truthfully test navigation from connection through
  disconnect or prove approval retention, discovery completeness, isolation, mutation
  authorization, and reconciliation across actual application boundaries.
- Resume by restoring the dependency-backed toolchain and completing milestones 001–014 in order.
  Then re-dispatch milestone 015 to perform the full keyboard/visual workflow review and deterministic
  cross-layer failure matrix against the implemented product.
- Screenshots, assistive-technology and interactive desktop checks, representative large-table
  behavior, separately authorized live-Google behavior, and real throttling/authorization/message
  race validation remain explicit gaps. No real customer data, credentials, mailbox operation,
  attachment download, export, backup, or destructive cleanup was used.

## Milestone 016 — Large-mailbox benchmarks and multi-hour validation

Status: **blocked**

| Step | Status | Durable progress |
| --- | --- | --- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions/requirements, current status, all direct dependency validation reports, package configuration, and relevant source/test files. |
| Verify required milestones 003, 008, 011, 014, and 015 | blocked | All five declared dependencies remain explicitly incomplete. Source inspection confirms that the synthetic Gmail provider, attachment index, durable multi-account scheduler and journals, resource/diagnostic controls, and completed failure-regression workflow required for meaningful scale testing are absent. |
| Build and run the 100,000-message benchmark | pending | Not started because the dependency gate prohibits a parallel mailbox/job/resource model. Observed dataset size was 0; no seed, timing, memory, WAL, concurrency, throughput, cancellation, or responsiveness result exists. |
| Run the genuine two-hour fault-injected soak | pending | Not started. No soak process or run identifier exists, and no accelerated-time or partial run is claimed. The required provider, authorization, worker-restart, approval, download, cleanup, journal, metrics, and resume paths are absent. |
| Run milestone-016 automated verification | blocked | Fresh `npm ci` failed because no lockfile exists; typecheck, lint, format check, and tests exited 127 because their tools are unavailable. No benchmark or soak product checks ran. |
| Record validation and completion assessment | complete | Separate benchmark/soak status, host/runtime facts, commands, observed outcomes, unperformed metrics, assumptions, external gaps, and precise resume steps are recorded in `docs/validation/milestone-016.md`. |

### Milestone-016 assumptions, blocker, and resume steps

- The task's `dependsOn: ["003", "008", "011", "014", "015"]` contract is a hard gate.
  The recorded failures agree with direct source inspection and are not stale documentation-only
  entries.
- A scale harness built around the foundation-only scaffold would not exercise the application's
  scoped provider, index, scheduler, approval/action journal, resource, recovery, or UI-query paths.
  It could not provide valid capacity or multi-hour safety evidence.
- Benchmark status and two-hour soak status are both blocked and not passed. No dataset, seed,
  process, background job, or resumable run was created, and no capacity result is claimed.
- Resume by restoring the dependency-backed toolchain and completing milestones 001–015 in order.
  Then re-dispatch milestone 016, implement the persisted benchmark/soak harness against the real
  application contracts, and run both workloads to completion. A harness-level resume command does
  not yet exist; the resumed implementation must document one before launching the soak.
- Google Cloud/OAuth and separately authorized live-mailbox validation remain external gaps, but
  they do not block the required fake-Gmail synthetic benchmark and fault-injected soak after the
  prerequisites exist. No real customer data, credentials, attachment content, or mailbox action
  was used.

## Milestone 017 — CI, desktop packaging, and security review

Status: **blocked**

| Step | Status | Durable progress |
| --- | --- | --- |
| Read requirements and inspect the existing architecture | complete | Read the contributor and shared instructions, README, architecture/decisions, current status, all direct dependency validation reports, package and Forge configuration, and relevant source/test files. |
| Verify required milestones 001, 005, and 013–016 | blocked | All six declared dependencies remain explicitly incomplete. Source inspection agrees: the repository contains only the foundation scaffold and lacks the Gmail provider/credential lifecycle, reports and closeout, resource/diagnostic/backup controls, full regression workflow, scale benchmark, and completed two-hour soak required for a release review. |
| Add repeatable CI, developer checks, and retained soak artifacts | pending | Not started because the dependency gate prohibits presenting foundation-only checks or an absent soak harness as release CI for the required product. `.github/`, local check scripts, a lockfile, performance smoke, and soak commands remain absent. |
| Configure and validate desktop packaging | blocked | Existing Forge source settings were inventoried, but `npm run package` and `npm run make` exited 127 because Forge is not installed. No artifact was produced, launched, installed, signed, or restart-tested. |
| Review and fix security and cleanup paths | blocked | Foundation IPC/window settings received a bounded source review, but the required Google, approval, mutation, attachment-download, reporting, retention, and diagnostic paths do not exist. No complete security review, certification claim, fix, or regression test was possible. |
| Run milestone-017 verification | blocked | `npm ci` failed because no lockfile exists; typecheck, lint, format, tests, package, and make could not find installed tools, and no build script exists. No remote CI, packaged launch, performance smoke, benchmark, or soak ran. |
| Record validation and completion assessment | complete | Dependencies, commands, observed failures, bounded source findings, unperformed checks, material assumptions, external gaps, and exact resume steps are recorded in `docs/validation/milestone-017.md`. |

### Milestone-017 assumptions, blocker, and resume steps

- The task's `dependsOn: ["001", "005", "013", "014", "015", "016"]` contract is a
  hard gate. All six milestones are blocked, and current source inspection confirms their required
  product paths and validation are absent.
- Release CI, package validation, and cleanup security review built around the foundation-only
  scaffold would not exercise the required credential, provider, approval, mutation, report,
  diagnostic, backup, regression, benchmark, or soak boundaries. No misleading substitute was
  added.
- Resume by restoring the dependency-backed toolchain and completing milestones 001–016 in order,
  including the real two-hour synthetic soak. Then re-dispatch milestone 017 to add and run the CI
  matrix, package/launch/restart the current host target, review actual cleanup paths, fix concrete
  defects, and preserve regression evidence.
- Google configuration/approval and authorized live-mailbox checks; macOS signing/notarization and
  release infrastructure; and tested Windows/Linux packaging remain external gaps. No real data,
  credential, mailbox action, certificate, upload, or publication was used.

## Milestone 018 — End-to-end rehearsal and release readiness

Status: **blocked**

| Step | Status | Durable progress |
| --- | --- | --- |
| Read requirements and inspect repository/evidence | complete | Read contributor/shared instructions, README, architecture/decisions/requirements, all milestone statuses, direct dependency reports, package configuration, source, and test inventory. |
| Verify required milestones 001, 013, 015, 016, and 017 | blocked | Every direct dependency is recorded blocked and source inspection confirms the product workflow is absent; the dependency contract prohibits bypassing this gate. |
| Rehearse two customers and multiple mailboxes | blocked | Not started: there are no simulated accounts, Gmail provider, rules, scans, attachment index, review/approval, cleanup/reconciliation, restore, download, report, disconnect, or purge paths to exercise. |
| Reconcile requirements and release evidence | complete | Updated README status/operator/recovery guidance, architecture decision 006, R01–R40 current reconciliation, and `docs/release-readiness.md`, including all 18 status/evidence links and external release gaps. |
| Run final repository checks | blocked | Fresh final results are recorded in `docs/validation/milestone-018.md`; the lockfile/toolchain is absent, so no automated gate, package, demo, benchmark, soak, or GUI rehearsal passed. |
| Record completion assessment and resume path | complete | `docs/validation/milestone-018.md` separates observed source facts, unperformed scenarios, external gaps, commands, and dependency-ordered resume steps. |

### Milestone-018 blocker and resume summary

- A final rehearsal cannot establish customer isolation, unique totals, exact approvals,
  default-off attachment content, recovery, or report accuracy when those product capabilities do
  not exist. No substitute harness or static-success claim was introduced.
- The milestone-016 benchmark and genuine two-hour soak were never started or passed. This remains
  a distinct release blocker and cannot be hidden by a later short rehearsal.
- Resume by restoring the locked toolchain and completing milestones 001–017 in dependency order.
  Re-dispatch milestone 018 only after 001, 013, 015, 016, and 017 are complete with observed
  evidence, then run the packaged two-customer scenario and rerun any affected scenario after
  defects are fixed.
- Google project/OAuth/consent and verification, customer consent and retention/Vault review,
  authorized real-mailbox smoke, signing/notarization, distribution/update setup, and other-host
  validation remain separately identified external work. Customer readiness remains false.
