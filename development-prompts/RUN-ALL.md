# Run all eligible development prompts

Use this only for manual single-task orchestration. For the control-plane runner, scan `development-prompts/queue/` and do not also submit this file. Copy the following prompt into a task opened in the Mail Clean repository to start manual orchestration.

```text
Implement Mail Clean by executing the numbered Markdown prompts in development-prompts/queue/.

First read README.md, development-prompts/README.md, and
development-prompts/SHARED-INSTRUCTIONS.md, plus applicable AGENTS.md files.
Inspect the working tree and existing docs/development-status.md before editing.

Work through 001–018 in order. For each milestone, read its full numbered .md file from that folder,
use its YAML metadata and body. This manual orchestration instruction permits
continuing after each completed milestone despite the per-file stop instruction.
Complete its grouped implementation steps without separate prompts, check
prerequisites against code and observed checks, implement it, verify it,
fix relevant defects, and persist an accurate status with evidence. Continue
into the next eligible milestone without asking whether to proceed. Do not
stop after merely planning or after writing a scaffold.

Use the proposed stack and current host as the first verified target. Resolve
reversible implementation choices yourself and record material decisions.
Use fake Gmail and synthetic files for unattended integration tests. Implement
real-provider paths, but leave real login, mailbox access or mutation, actual
attachment retrieval, customer-data removal, revocation, signing, publication,
and paid services for separately authorized work. Missing Google configuration
must not block simulated development.

Run milestones sequentially in this checkout. Do not spawn other agents or
create other Codex tasks. Preserve unrelated user changes. Do not push or
publish. Do not execute downloaded attachment files.

If a prerequisite fails, fix a bounded defect when practical. Otherwise record
the failure, finish independent work within the current milestone, and keep
dependent milestones blocked. Do not start a later numbered milestone until
its required predecessors succeed.
An external validation gap may coexist with completed code; label it explicitly
and do not claim the gap is verified. When all remaining work depends on a
blocker, stop with the exact blocker and resume instructions.

For long-running tests, record progress and actual outputs. Prompt 016 requires
at least two wall-clock hours: an accelerated test or background process launch
is not completion. If interrupted, preserve results and the resume command.
Track benchmark and soak status separately in 016. Both must pass before
016 succeeds and 017 becomes eligible; a partial soak cannot satisfy dependsOn.
Keep status current after implementation steps and during long work so a later
task can resume from the repository. Continue within the active task while
resources and permissions allow; do not assume you can bypass usage limits or
wake yourself later.

At the end, report completed and incomplete milestones, actual verification,
artifact locations, and remaining user/external steps. Mark the app ready for
customer use only if the required evidence and release dependencies are met.
```

## Resume after an interruption

```text
Resume the Mail Clean sequence in development-prompts/RUN-ALL.md.
Read shared instructions and docs/development-status.md, inspect existing code
and any running benchmark/soak processes, and continue from the earliest
incomplete eligible milestone. Preserve completed work and do not duplicate
running jobs. Recheck only evidence affected by changes or interruption.
Continue subsequent eligible prompts without routine confirmation, using
simulated Gmail and the existing unattended-development boundaries.
```
