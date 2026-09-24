# Release readiness

Date assessed: 2026-09-24

## Decision

**Not ready for customer use, release packaging, or a real mailbox rehearsal.** All required
milestones 001–018 are blocked. The repository is a foundation scaffold, not the version-one Mail
Clean product described in the README.

## Evidence classes

| Class | Observed state |
| --- | --- |
| Implemented | Partial foundation only: Electron/React/TypeScript source, a restrictive window configuration, strict simulated status IPC schemas, named preload bridge, SQLite bootstrap, static simulated shell, bounded worker schema, and one IPC-boundary test source. |
| Verified in simulation | A historical cached-dependency boundary smoke exercised six foundation IPC cases in milestone 001. No current dependency-backed test and no complete simulated customer workflow has passed. |
| Verified in a real environment | Host/runtime facts were observed. No real Google sign-in, Gmail read/mutation/download/revoke, customer workflow, signed app, installed package, or real-mailbox smoke was performed. |
| Incomplete | Locked install; current gates; packaged launch; milestones 002–015 product workflows; 100,000-message benchmark; two-hour soak; CI/package/security review; two-customer rehearsal; requirement verification. |
| Externally blocked/unperformed | Google project and Gmail API setup; consent-screen/test-user configuration; OAuth verification and any restricted-scope security assessment; Workspace admin policy; customer consent and retention/Vault review; authorized real-mailbox smoke; signing/notarization credentials; distribution/update setup; other-platform checks. |

External steps do not excuse the missing deterministic fake-Gmail implementation, benchmark, soak,
or packaged-host rehearsal.

## Milestone reconciliation

Each status links to its detailed evidence or concrete blocker. “Blocked” means required
implementation or verification is absent; it does not mean the milestone passed with an external
exception.

| Milestone | Status | Evidence/blocker |
| --- | --- | --- |
| 001 | blocked | [Foundation validation](validation/milestone-001.md): no lockfile/install, current gates, package, or launch. |
| 002 | blocked | [Session/database validation](validation/milestone-002.md): dependency gate and scoped durable model absent. |
| 003 | blocked | [Gmail simulator validation](validation/milestone-003.md): fake provider and bounded Gmail data path absent. |
| 004 | blocked | [Jobs validation](validation/milestone-004.md): scheduler/checkpoints/retry controls absent. |
| 005 | blocked | [Google integration validation](validation/milestone-005.md): OAuth, protected credential lifecycle, and Gmail adapter absent. |
| 006 | blocked | [Rules validation](validation/milestone-006.md): immutable protection/date/scope rules absent. |
| 007 | blocked | [Discovery validation](validation/milestone-007.md): resumable discovery/candidates/preview absent. |
| 008 | blocked | [Attachment validation](validation/milestone-008.md): metadata index and largest-attachment review absent. |
| 009 | blocked | [Approval validation](validation/milestone-009.md): review decisions and exact approval snapshots absent. |
| 010 | blocked | [Cleanup validation](validation/milestone-010.md): intent journal, preflight, per-message Trash, and reconciliation absent. |
| 011 | blocked | [Controls/restoration validation](validation/milestone-011.md): multi-account controls and restoration absent. |
| 012 | blocked | [Download validation](validation/milestone-012.md): explicit bounded attachment download path absent. |
| 013 | blocked | [Reports/closeout validation](validation/milestone-013.md): reports, disconnect/revoke, and scoped purge absent. |
| 014 | blocked | [Resource/recovery validation](validation/milestone-014.md): diagnostics, limits, backup/restore absent. |
| 015 | blocked | [Usability/failure validation](validation/milestone-015.md): complete UI and fault matrix unavailable. |
| 016 | blocked | [Scale validation](validation/milestone-016.md): benchmark and genuine two-hour soak not started or passed. |
| 017 | blocked | [CI/package/security validation](validation/milestone-017.md): prerequisites, CI, package launch, and full security review absent. |
| 018 | blocked | [Final rehearsal validation](validation/milestone-018.md): hard dependencies failed; no end-to-end workflow exists to rehearse. |

## First-version traceability summary

The detailed R01–R40 mapping is in [requirements](requirements.md). R01–R36 and R40 have no product
implementation. R37–R39 have partial foundation source but lack required current and packaged
verification. Therefore customer isolation, unique message totals, exact approvals, default-off
attachment content, recoverable mutation state, and accurate reports are all **unverified**, not
passing.

The version-one boundary remains unchanged: automatic cleanup, permanent deletion, incremental
new-mail-only sync, and cloud AI classification are future features.

## Commands and release gates

Run commands from the repository root. These are the exact commands available today:

```sh
npm install
npm ci
npm start
npm run typecheck
npm run lint
npm run format:check
npm test
npm run package
```

- Development: `npm start` (foundation shell only today).
- Demo: unavailable; there is no `demo` script or complete fake-Gmail workflow. Milestones 003–015
  must supply the deterministic scenario before an exact demo command can be recorded.
- Package: `npm run package` (unsigned; currently cannot run without dependencies/lockfile).
- Benchmark: unavailable; milestone 016 found no benchmark script or harness. Its resumed work must
  add and record an exact command that runs the real application stores and fake provider.
- Soak: unavailable; milestone 016 found no persisted soak script, run ID, or resume command. Its
  resumed work must add an exact start command and generated resume command, then complete at least
  two hours of actual wall-clock execution.

Do not invent `npm run demo`, `npm run benchmark`, or `npm run soak`: they are not package scripts.
Do not treat `npm start`, a short test, or starting a background process as substitute evidence.

## Operator setup and recovery gate

Before any customer rehearsal:

1. Complete milestones 001–017 in dependency order, including the real benchmark and soak.
2. Configure an owner-controlled Google Cloud project, Gmail API, desktop OAuth client, consent
   screen, and test-user/production status. Resolve verification/security-assessment and Workspace
   administrator requirements.
3. Obtain customer consent and confirm retention, records, and Vault/hold requirements before
   defining cleanup rules.
4. Run the packaged app against deterministic fake data, then perform a separately authorized,
   bounded real-mailbox smoke with non-sensitive test mail and no unattended customer mutation.
5. Complete signing/notarization and applicable platform/distribution checks before delivery.

After an interruption, preserve the database, WAL, logs, and managed application files. Resume only
through the implemented durable control. Reconcile ambiguous provider outcomes before retrying;
recheck current protection and exact approval before each mutation. Never clear cache/history while
an operation is unresolved, and never infer remote state from a local crash or timeout.

## Resume criteria

Re-dispatch milestone 018 only after its dependencies 001, 013, 015, 016, and 017 are complete with
observed evidence. Then use the packaged build to run the required two-customer/multi-mailbox
scenario, falling back to development mode only if the packaged-specific defect and fallback are
recorded. The rehearsal must include mixed-age threads, external protection changes, ambiguous
remote outcomes, interruption/resume, restore, explicit downloads, reports, disconnect, and scoped
cache clearing. Rerun affected scenarios after fixes and record exact observed totals and journal
invariants.
