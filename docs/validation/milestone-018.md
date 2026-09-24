# Milestone 018 validation — end-to-end rehearsal and release readiness

Date: 2026-09-24  
Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Completion assessment

Milestone 018 is **blocked and incomplete**. Its declared dependencies—001, 013, 015, 016, and
017—are all blocked. Direct source inspection agrees with those reports: the repository contains a
foundation schema and simulated status boundary, not an end-to-end mailbox product. The runner
contract forbids bypassing incomplete required dependencies.

No customer/account/session fixture, fake Gmail provider, rule editor, scanner, attachment index,
review queue, exact approval store, cleanup journal, restoration path, explicit download path,
report exporter, disconnect/revocation flow, or managed-cache purge exists. Therefore the required
two-customer/multi-mailbox rehearsal did not run, and no integration defect could be reproduced or
fixed in that unavailable workflow. No customer readiness success is claimed.

## Dependency and source evidence

All inspection and commands used the configured workspace root. No credentials, tokens, customer
data, mailbox data, attachment content, real Google request, remote mutation, remote publication,
or local customer-data removal was used.

| Check | Observed outcome |
| --- | --- |
| Read README, contributor/shared instructions, architecture, decisions, requirements, status ledger, and direct dependency validation reports | Confirmed that each hard dependency is incomplete and contains concrete missing implementation/evidence. |
| Inspect `src/`, `tests/`, package scripts, lockfile, dependency directory, package output, CI, and scripts | Found the foundation-only source/test inventory; no lockfile, installed dependency tree, output bundle, CI directory, scripts directory, demo, benchmark, or soak command exists. |
| Search product source/tests for required workflow concepts | Found future-facing renderer copy and foundation status fields, but no scoped Gmail workflow implementation or rehearsal fixture. |

## Rehearsal outcomes

Status: **not started; not passed**.

| Required outcome/scenario | Actual result |
| --- | --- |
| Two customers and multiple mailboxes | 0 customers and 0 mailboxes exercised; durable identities/providers are absent. |
| Protections, date/scope rules, and retention confirmation | Not testable; rule storage/editor/gates are absent. |
| Scan and inspect large attachments without automatic content download | Not testable; provider, discovery, and attachment index are absent. No content was downloaded. |
| Keep messages and approve exact batches | Not testable; candidates, decisions, discovery completion, and approval snapshots are absent. |
| Interrupt/resume cleanup and ambiguous remote outcome | Not testable; no action journal, fake mutation, checkpoint, or reconciliation path exists. |
| Restore selected messages after external changes | Not testable; cleanup outcomes and conservative restoration are absent. |
| Explicitly download selected attachments | Not testable; download authorization, bounded retrieval, and file-result records are absent. |
| Export accurate reports | Not testable; report facts and exporters are absent. |
| Disconnect and clear one customer's synthetic cache | Not testable; accounts, credentials, managed-file inventory, and scoped purge are absent. |
| Mixed-age thread and individual-message mutation | Not testable; no fake Gmail fixture or mutation adapter exists. |
| Externally changed protection | Not testable; no rule version or fresh preflight exists. |
| Customer isolation and unique message totals | Unverified; no cross-customer product records or candidate/report totals exist. |
| Recoverable state and accurate reports | Unverified; no action/recovery/report journals exist. |

The packaged build was preferred by the prompt but could not be created. Development mode was not
used as a rehearsal fallback because it exposes only the static foundation shell and would not
exercise any required scenario.

## Scale prerequisite

Milestone 016 records 0 benchmark messages, 0 soak accounts/operations, no run identifier, and zero
hours of soak execution. The required 100,000-message benchmark and at least two hours of actual
fault-injected soak were neither started nor passed. This is a standalone release blocker; a future
short rehearsal cannot replace it.

## Requirement and release reconciliation

- [Version-one requirements](../requirements.md) maps R01–R40 and now records their current state.
  R01–R36 and R40 are unimplemented; R37–R39 have partial source only and lack required evidence.
- [Release readiness](../release-readiness.md) separates implemented, simulation-verified,
  real-environment-verified, incomplete, and externally blocked/unperformed work.
- [Development status](../development-status.md) records all 18 milestones as blocked and links each
  milestone to evidence or a concrete blocker.
- README operator/setup/recovery guidance now explicitly prevents customer use and distinguishes
  the foundation development shell from a demo.
- Architecture decision 006 makes release readiness evidence-gated. Future automatic cleanup,
  permanent deletion, incremental new-mail sync, and cloud AI remain outside version one.

## Final automated checks

The final checks below were run once after the readiness documentation changes. The dependency
failures match the prerequisite reports and do not constitute passing product verification.

| Command | Observed outcome |
| --- | --- |
| `npm ci` | Failed, exit 1 (`EUSAGE`): no `package-lock.json` or compatible shrinkwrap. npm also could not write its optional user-level log in the managed environment. |
| `npm run typecheck` | Failed, exit 127: `tsc: command not found`. |
| `npm run lint` | Failed, exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed, exit 127: `prettier: command not found`. |
| `npm test` | Failed, exit 127: `vitest: command not found`; no test executed. |
| `npm run package` | Failed, exit 127: `electron-forge: command not found`; no package was created. |
| `git diff --check` | Passed, exit 0, for tracked changes. The repository's existing scaffold/docs are largely untracked, so this is not a formatter result for every file. |

No application launch was attempted before a successful package/install because Electron and Forge
are unavailable. No benchmark or soak command was run because those scripts/harnesses do not exist.

## Exact commands and availability

- Install/clean install: initial `npm install` to create the missing lockfile, then `npm ci`.
- Development shell: `npm start` (not a product demo).
- Fast gates: `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test`.
- Unsigned package: `npm run package`.
- Demo: no command exists; no `demo` script or workflow harness is implemented.
- Benchmark: no command exists; no `benchmark` script or harness is implemented.
- Soak/start/resume: no command exists; no `soak` script, persisted run, run ID, or resume command
  is implemented.

Recording nonexistent commands as though executable would be misleading. The resumed milestone 016
must add exact benchmark and soak start/resume commands against the actual application boundaries;
the resumed milestone 018 must record the actual packaged rehearsal command/fixture.

## External validation gaps

The following work is unperformed and separately release-blocking where applicable:

- owner-managed Google Cloud project, Gmail API, desktop OAuth client, consent screen, test users,
  production status, verification, and any restricted-scope security assessment;
- Workspace administrator policy and customer-specific consent, retention, records, Vault/hold,
  and approval review;
- separately authorized real sign-in and bounded real-mailbox smoke, including Gmail pagination,
  throttling, token lifecycle, external changes, mutation reconciliation, download, revoke, and
  restoration behavior;
- Apple signing and notarization, release/update infrastructure, publication, and Windows/Linux
  package validation.

These gaps do not replace the missing deterministic fake-Gmail implementation and simulation.

## Material assumptions and resume steps

- The configured workspace is authoritative even though the task context names a different
  machine-specific path.
- Existing modified/untracked scaffold and documentation are prior workspace work and were
  preserved. This execution changes only readiness/status/traceability documentation.
- The prerequisite records are not stale: source inspection independently confirms the missing
  workflow. Implementing a milestone-018-only harness would duplicate missing identities and safety
  boundaries and could not prove the product.

Resume in this order:

1. Restore dependency access, create/review/preserve the lockfile, and complete milestone 001 gates,
   package, launch, and GUI verification.
2. Complete milestones 002–015 in dependency order with their required fake/synthetic tests.
3. Complete milestone 016's 100,000-message benchmark and genuine two-hour fault-injected soak;
   preserve measured results and an exact resume command for interrupted runs.
4. Complete milestone 017's CI, packaged-host launch/restart, and full implemented-path security
   review.
5. Re-dispatch milestone 018. Run the packaged two-customer/multi-mailbox scenario, including every
   row above; fix reproduced integration defects and rerun affected scenarios.
6. Complete separately authorized Google/customer/signing/real-environment gates. Keep simulation,
   packaged-host, and real-environment evidence distinct, and do not mark customer readiness
   complete while any required evidence is missing.
