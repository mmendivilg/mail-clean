# Milestone 016 validation — large-mailbox benchmarks and multi-hour validation

Date: 2026-09-24

Host: Mac Studio (Mac13,1), Apple M1 Max, 10 cores, 32 GB memory; macOS 27.0 Darwin arm64;
Node.js 24.19.0; npm 11.17.0. The workspace volume had 167 GiB available when inspected.

## Completion assessment

Milestone 016 is **blocked and incomplete**. Every declared dependency—milestones 003, 008, 011,
014, and 015—is recorded as blocked. Direct source inspection confirms that these are current
implementation gaps rather than stale status entries. The workspace remains a milestone-001
foundation with one metadata table, one simulated status operation, a static renderer shell, and a
bounded computation-only worker request. It has no synthetic Gmail provider, scoped message or
attachment index, durable job runner, multi-account coordinator, exact approval and action journal,
resource controls, diagnostic metrics, backup/recovery path, or failure-injection harness.

The task and shared runner instructions prohibit bypassing a failed or incomplete required
dependency. Consequently, no benchmark/soak harness or product fix was added and no background
process was launched. A standalone harness would have to invent a second mailbox, scheduler,
approval, mutation, and resource lifecycle, so its measurements could not validate the application
required by this milestone. Benchmark and soak status are recorded separately below; neither
passed, so milestone 016 cannot succeed.

## Dependency and environment evidence

All commands were run from the configured workspace root. No credential, token, customer data,
mailbox data, attachment content, live Google request, or remote mutation was used.

| Command/check | Observed outcome |
| --- | --- |
| Read `README.md`, `AGENTS.md`, `development-prompts/SHARED-INSTRUCTIONS.md`, `docs/development-status.md`, architecture/decision/requirement documents, and direct dependency validation reports | Confirmed that milestones 003, 008, 011, 014, and 015 are explicitly incomplete and that the runner contract requires stopping at the dependency gate. |
| Inspect `src/`, `tests/`, and package configuration | Found 16 source/test files, only `foundation_metadata`, `foundation:get-status`, static future-facing UI copy, and one IPC-boundary test. No benchmarkable mailbox workflow or soakable fault/recovery path exists. |
| Search source/tests for Gmail, attachments, approvals, candidates, action intents, journals, diagnostics, backups, benchmarks, soaks, throttling, authorization, and network faults | Found architecture/static-copy references and WAL enablement only; no implementation of the required production or harness behavior. |
| Check `package-lock.json` and `node_modules` | Both are absent. |
| `node --version`; `npm --version`; `uname -s`; `uname -m`; `sw_vers -productVersion` | Reported Node.js 24.19.0, npm 11.17.0, Darwin, arm64, and macOS 27.0. |
| `system_profiler SPHardwareDataType` with only model/chip/core/memory fields selected | Reported Mac Studio Mac13,1, Apple M1 Max, 10 cores, and 32 GB memory. No serial or hardware UUID was retained. |
| `df -h .` | Reported a 460 GiB workspace volume, 268 GiB used, and 167 GiB available. |
| `sysctl -n hw.model hw.memsize hw.logicalcpu` | Failed because the managed environment denied the query; the selected `system_profiler` fields supplied the non-sensitive hardware facts instead. |
| `npm ci` | Failed with exit 1 (`EUSAGE`) because no lockfile or compatible shrinkwrap exists. npm could not write its usual user-level log in the managed environment. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. |

These command failures are unavailable-toolchain evidence, not passing baseline checks or
reproduced milestone-016 product defects. No `npm install` was attempted because creating the
missing lockfile and completing the foundation belongs to the blocked prerequisite sequence.

## Large-mailbox benchmark status

Status: **blocked; not started; not passed**.

| Required evidence | Observed result |
| --- | --- |
| Configured seed | None; no benchmark exists or ran. |
| Dataset size and coverage | 0 generated/processed messages and 0 attachments. The target of at least 100,000 messages across three accounts and 20 years was not attempted. |
| Start, end, and elapsed time | Not applicable; no benchmark process was launched. |
| Lazy generation and bounded synthetic bodies | Not measured; the milestone-003 fake Gmail provider is absent. |
| Peak memory by process | Not measured. |
| Database and WAL growth | Not measured; only the foundation table exists. |
| API concurrency and throughput | Not measured; no provider or scheduler exists. |
| Cancellation latency | Not measured; no durable jobs or controls exist. |
| Page-query and UI responsiveness | Not measured; no message/attachment review queries exist. |
| Comparison with architecture budgets | Not possible. The documented page/batch/concurrency values remain unvalidated architecture constraints, not capacity claims. |
| Demonstrated bottlenecks and fixes | None observed because the workload could not run; no bottleneck fix is claimed. |

No metadata-storage growth rate can be reported. The future result must distinguish expected durable
growth proportional to scoped messages/attachments/audit records from bounded cache, temporary-file,
memory, and WAL growth.

## Two-hour soak status

Status: **blocked; not started; not passed**.

| Required evidence | Observed result |
| --- | --- |
| Actual wall-clock start/end/duration | None / none / 0. No background or foreground soak was launched. |
| Synthetic accounts and continuing activity | 0 accounts and 0 operations. |
| Worker restarts | 0 injected; there is no durable runner or restart path. |
| Network loss and throttling | 0 injected; there is no fake Gmail provider or request scheduler. |
| Authorization interruption | 0 injected; there is no account authorization lifecycle. |
| Metadata-only attachment indexing | 0 attachments indexed; the attachment index is absent. |
| Explicitly approved fake downloads and cleanup | 0 approvals, downloads, or cleanup actions; the prerequisite approval, download, and action journals are absent. |
| Persisted metrics and resumability | No run or run identifier exists. No metrics/results store exists to resume. |
| Memory/WAL/disk trends and responsiveness | Not measured. |
| Final journal invariants | Not testable; no approval, action, cleanup, download, or restoration journal exists. |

Accelerated virtual time was not used, and a partial/background run is not represented as a pass.
There is no truthful harness-level resume command because no soak was launched and no resume-capable
harness exists. The precise recovery path is to complete and verify the dependencies in order, then
re-dispatch this task; that resumed implementation must define and document an exact command using
its real run identifier/result store before beginning the genuine two-hour run.

## Material assumptions and external gaps

- The configured runner workspace is authoritative even though the prompt context names a different
  machine-specific path. All inspection and commands used the configured workspace root.
- The five direct dependency statuses are authoritative and agree with source inspection. The
  benchmark must exercise their actual provider, attachment, scheduling, journal, resource, and
  regression boundaries rather than an isolated substitute.
- The current working tree already contained modified/untracked scaffold and documentation files.
  They were preserved; this execution changes only the milestone-016 status and validation docs.
- Local resources were not the reason the target was skipped: 32 GB memory and 167 GiB available
  disk were observed. The hard blockers are incomplete dependencies and the absent local toolchain.
- Google Cloud/OAuth setup and separately authorized live-mailbox validation remain external gaps.
  They do not block the eventual deterministic fake-Gmail benchmark and soak after prerequisites
  exist, and no live behavior should be substituted for the required synthetic verification.
- Live Google throttling, authorization expiry/revocation, pagination-token behavior, and remote
  mutation races remain untested external behavior. The milestone still requires simulated faults
  independently of any later authorized live check.

## Resume steps

1. Restore dependency availability, generate and preserve the lockfile through the milestone-001
   workflow, and pass its repository/launch/package gates.
2. Complete and verify milestones 002–015 in dependency order, including the direct dependencies
   003, 008, 011, 014, and 015. Do not use status-only changes as substitutes for implementation and
   observed tests.
3. Re-dispatch milestone 016. Add a configurable, lazy 100,000-message/three-account/20-year
   benchmark against the actual fake provider and application stores, with persisted process,
   database/WAL, concurrency, throughput, cancellation, and responsiveness metrics.
4. Run the benchmark to completion, compare observed values with documented budgets, fix reproduced
   bottlenecks, rerun affected checks, and record the seed, sizes, hardware/runtime, commands, and
   results here.
5. Start the real persisted soak only after its resume command and result location are documented.
   Run for at least two hours of actual wall-clock time with the required continuing workload and
   faults, await completion, verify final journal invariants, and record actual start/end/duration
   plus trends. If interrupted, preserve the run and record its exact generated resume command.
6. Run all repository gates and relevant package/UI checks. Both the completed benchmark and
   completed two-hour soak must pass before milestone 016 is marked complete.
