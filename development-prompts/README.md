# Mail Clean development prompts

18 ordered development prompts covering the full first-version README, including attachment metadata, explicit downloads, largest-attachment review, durable approvals, and multi-hour recovery validation. Related implementation steps and their acceptance checks are grouped inside each prompt.

README SHA-256 at generation: `d28e2112e5d716bade054372de6b1c807a7f70ad1c73837d63056799587b7cac`. If the product requirements change, reconcile this plan before continuing; this digest identifies the reviewed source and is not a reason to overwrite new README content.

## Run the sequence

Copy the main prompt from [RUN-ALL.md](RUN-ALL.md) into a Codex task opened in this repository. It instructs the agent to complete eligible milestones sequentially, record progress, and continue without routine confirmation. Nothing has been started by creating these files.

All 18 prompts to queue are together in `development-prompts/queue/`, named `001-…md` through `018-…md`, with no subfolders or guide files mixed in. For a single milestone, submit its numbered Markdown file contents or ask the agent to read and execute that file. Each milestone includes implementation steps and verification; there is no need to submit each step separately. A later task can resume from code and `docs/development-status.md`.

The runner is an instruction file, not an installed automation. It cannot bypass usage limits, interrupted sessions, approvals, or computer sleep. Google setup, owner sign-in, real-mailbox validation, signing, and publication remain external steps. Development and integration testing default to simulated Gmail.

Read [SHARED-INSTRUCTIONS.md](SHARED-INSTRUCTIONS.md). Run prompts sequentially in one checkout because they share database and application modules. Keep related fixes in the same task; use the recorded handoff to resume after an interruption.

## Suggested unattended batches

| Batch | Prompts | Checkpoint |
| --- | --- | --- |
| A | 001–005 | Desktop app, persistent sessions, durable jobs, and Gmail integration |
| B | 006–009 | Rules, scan preview, attachment review, and exact approvals |
| C | 010–013 | Cleanup/recovery, restoration, downloads, and closeout |
| D | 014–018 | Resource controls, validation, packaging, and readiness evidence |

These are convenience boundaries, not capacity guarantees. Prompt 016 includes at least two hours of actual simulated activity and will take longer than a short implementation task. If its soak is interrupted, retain the evidence and resume command; independent work in 017 may proceed after the benchmark checks pass. Final readiness cannot hide an incomplete soak.

## Ordered prompts

| # | Prompt | Prerequisites |
| --- | --- | --- |
| 001 | [Architecture and secure desktop foundation](queue/001-architecture-and-desktop-foundation.md) | None |
| 002 | [Durable database and customer sessions](queue/002-database-and-customer-sessions.md) | 001 |
| 003 | [Gmail simulator and bounded data access](queue/003-gmail-simulator-and-data-access.md) | 002 |
| 004 | [Durable background jobs and request scheduling](queue/004-durable-background-jobs.md) | 001, 002, 003 |
| 005 | [Secure Google sign-in and Gmail integration](queue/005-google-auth-and-gmail-integration.md) | 001, 002, 003, 004 |
| 006 | [Protection rules, dates, and scope editor](queue/006-rules-dates-and-scope.md) | 002, 003, 005 |
| 007 | [Resumable discovery, classification, and preview](queue/007-resumable-scan-and-preview.md) | 003, 004, 005, 006 |
| 008 | [Attachment metadata and largest-attachment review](queue/008-attachment-index-and-review.md) | 003, 005, 007 |
| 009 | [Review queue and exact customer approvals](queue/009-review-and-exact-approvals.md) | 003, 006, 007, 008 |
| 010 | [Approved Trash execution and crash recovery](queue/010-safe-trash-and-recovery.md) | 004, 005, 009 |
| 011 | [Multiple mailboxes, operator controls, and restoration](queue/011-mailbox-controls-and-restoration.md) | 004, 007, 010 |
| 012 | [Explicit attachment downloads from selection to results](queue/012-explicit-attachment-downloads.md) | 004, 008, 009, 011 |
| 013 | [Reports, account disconnect, and session closeout](queue/013-reports-and-session-closeout.md) | 005, 011, 012 |
| 014 | [Resource limits, diagnostics, and database backups](queue/014-resources-diagnostics-and-backups.md) | 002, 008, 011, 012, 013 |
| 015 | [Operator usability and failure regression testing](queue/015-usability-and-failure-regressions.md) | 006, 008, 009, 010, 011, 012, 013, 014 |
| 016 | [Large-mailbox benchmarks and multi-hour validation](queue/016-scale-and-multi-hour-validation.md) | 003, 008, 011, 014, 015 |
| 017 | [CI, desktop packaging, and security review](queue/017-ci-packaging-and-security-review.md) | 001, 005, 013, 014, 015, 016. Only the benchmark work in 016 is required here; its two-hour soak may remain pending |
| 018 | [End-to-end rehearsal and release readiness](queue/018-final-rehearsal-and-readiness.md) | 001, 013, 015, 016, 017 |

## Progress and readiness

Use the current 001–018 milestone numbers in `docs/development-status.md`, with per-step progress for longer milestones. If an older status file exists, reconcile its results against the current prompt content rather than equating the old and new numbers.

Mark completion only from actual observed results. Record simulation, real-provider, GUI, packaging, signing, and multi-hour evidence separately. Final readiness requires accurate requirement coverage and explicit remaining external steps.
