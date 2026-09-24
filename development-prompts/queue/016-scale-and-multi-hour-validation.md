# Prompt 016: Large-mailbox benchmarks and multi-hour validation

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 003, 008, 011, 014, 015.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Measure bounded operation on large synthetic mailboxes

Build a configurable benchmark with an initial target of at least 100,000 synthetic messages across three accounts and 20 years of dates, including attachment metadata. Generate lazily, consume bounded disk, and avoid downloading simulated multi-gigabyte bodies. Measure peak memory by process, database/WAL growth, API concurrency, throughput, cancellation latency, and page-query/UI responsiveness where measurable. Compare results with the budgets defined in architecture and fix demonstrated bottlenecks.

### 2. Run a genuine multi-hour simulated workload

Create and run a wall-clock soak of at least two hours with multiple synthetic accounts, continuing activity, periodic worker restarts, network loss, throttling, and authorization interruptions. Include metadata-only attachment indexing plus explicitly approved fake downloads and fake cleanup. Persist metrics/results so the soak can survive agent or application interruption. Use bounded resources, inspect progress at reasonable intervals, and fix reproducible failures. Never substitute accelerated virtual time for the multi-hour claim.

## Acceptance and verification

1. Record hardware/runtime, seed, dataset sizes, elapsed time, metrics, limits, and pass/fail results in docs/validation. If local resources prevent the target, run a smaller meaningful case and record the gap; do not claim the target passed. Retained metadata may grow with message count; explain expected storage separately from unbounded cache/WAL growth.

2. Record actual start/end/duration, workloads, injected faults, memory/WAL/disk trends, responsiveness evidence, and final journal invariants. A launched background process or partial run is not a pass. If the environment interrupts the run, record it as incomplete with an exact resume command and continue only independent work.

Record benchmark and two-hour soak status separately. A blocked or interrupted soak must not prevent independent CI/packaging work in 017 once its actual prerequisites pass. Final readiness still requires the missing soak evidence.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
