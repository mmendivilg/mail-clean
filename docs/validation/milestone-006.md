# Milestone 006 validation — protection rules, dates, and scope editor

Date: 2026-09-24

Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Completion assessment

Milestone 006 is **blocked and incomplete**. Its declared dependencies—milestones 002, 003, and
005—are all recorded as blocked. Direct source inspection confirms that the missing work is
material: the workspace contains only the milestone-001 foundation table, simulated status IPC,
and static shell. It has no durable customer/session/account ownership model, Gmail provider and
message metadata contract, Google integration, candidate/approval history, or immutable rule
versions.

The task and shared runner instructions prohibit bypassing a failed or incomplete dependency.
Therefore no rule evaluator, cutoff utility, Gmail query compiler, policy migration, IPC operation,
preload method, configuration screen, fixture, or milestone-006 test was added. No implementation or
verification success is claimed.

## Dependency evidence and observed checks

All commands were run from the workspace root. No credentials, tokens, mailbox data, attachment
content, or customer data was used.

| Command/check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision documents, and milestone 002, 003, and 005 validation reports | Confirmed each declared dependency is incomplete and the control-plane contract requires stopping at the dependency gate. |
| Inspect `src/main/database`, `src/domain`, `src/main/ipc`, `src/preload`, `src/renderer`, and `tests` | Found only `foundation_metadata`, the `foundation:get-status` operation, a named foundation preload method, a static simulated shell, and foundation IPC tests. No prerequisite scoped persistence, Gmail contract, OAuth adapter, candidate/approval records, or rule versions exist. |
| Check for `package-lock.json` and `node_modules` | Both are absent, so the declared TypeScript/Electron test toolchain is not installed. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |
| `git diff --check` | Passed with no whitespace errors before the milestone-006 documentation was added. |
| `node --version`; `npm --version`; `uname -s`; `uname -m` | Observed Node.js 24.19.0, npm 11.17.0, Darwin arm64. |

The npm failures establish that the local toolchain remains unavailable; they are not reproduced
defects in milestone-006 code. No dependency install was attempted because this runner-dispatched
task may not take over the blocked prerequisite milestones. npm registry connectivity was not
retested.

## Required milestone-006 verification not performed

Because implementation is prohibited by the dependency gate, none of the required checks ran:

- overlapping protection and cleanup rules, case normalization, malformed addresses, exact/domain/
  subdomain boundaries, unknown labels, and protection precedence;
- category explanations for business correspondence, financial records, marketing, suspected spam,
  uncertain messages, and explicitly age-based matches;
- instants immediately before, at, and after the exclusive cutoff; DST transitions; leap days;
  invalid dates; selected-zone changes; and imported-message `internalDate` fixtures;
- conservative Gmail query compilation, exact local `internalDate` filtering, Inbox/all-mail plus
  separate Sent/Spam/Trash intersections, and message-level handling of mixed-age conversations;
- the “older than 2014” example resolving to before January 1, 2014 in the selected IANA time zone;
- create, edit, explicit save, reload, invalid-input, evaluator-backed preview, cutoff explanation,
  and no-write-on-open UI flows;
- immutable session-scoped versions, pending-scan effects, policy-snapshot approval invalidation,
  and retention of existing candidate/approval history under its original rule version;
- a desktop UI exercise, package build, or real Gmail query comparison.

## Material assumptions and external gaps

- The existing dependency statuses are authoritative and match the current implementation. This is
  not a documentation-only blocker.
- Session ownership from milestone 002 is required to scope immutable policies. Gmail metadata and
  fake-provider semantics from milestone 003 are required to evaluate unknown fields, labels,
  `internalDate`, and compiled searches. Milestone 005 supplies the real adapter boundary that the
  conservative query must eventually share. Implementing substitutes here would create a parallel,
  unsafe architecture.
- Previously recorded npm registry DNS/network failure remains the latest connectivity evidence.
  This execution establishes only that the lockfile and installed tools are absent; it did not
  retest registry access.
- Google Cloud setup, Gmail API enablement, consent configuration, Workspace policy review, and a
  separately authorized real-account validation remain external gaps. They do not prevent later
  deterministic fake-provider tests once the prerequisite milestones and toolchain are available.
- Exact Gmail search behavior against a live mailbox and imported-message examples remains unknown
  because external documentation/live validation was not needed or authorized after the hard
  dependency gate stopped implementation.

## Resume steps

1. Restore npm dependency availability, generate and preserve the lockfile, and complete the
   required milestone-001 gates.
2. Implement and fully verify milestone 002's versioned database and scoped customer, session, and
   account ownership paths.
3. Implement and fully verify milestone 003's deterministic Gmail contract/simulator, message
   metadata semantics, and bounded account-scoped access.
4. Complete and verify milestone 004, then implement and verify milestone 005 against the established
   ownership, provider, and scheduling contracts.
5. Re-dispatch milestone 006. Consult current primary Gmail date-search and `internalDate`
   documentation, implement pure versioned evaluation and exact zoned cutoff checks, add immutable
   scoped storage plus validated IPC/preload/UI flows, and use only deterministic fake Gmail and
   synthetic records in unattended tests.
6. Run and record every evaluator, date/DST, query-conservatism, scope-intersection, persistence,
   history, preview, invalid-input, reload, desktop, and repository gate required by the prompt. Do
   not mark milestone 006 complete until all required verification passes.
