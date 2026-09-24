# Version-one requirement map

This map covers the current README. Milestone numbers name the planned implementation and evidence;
milestone 001 supplies the architecture, shell, and secure extension boundary used by all later
work. “Fake” means deterministic simulated Gmail and synthetic local files. Real Google validation
is always recorded separately.

| ID  | README requirement                                                                   | Planned milestone(s)    | Planned verification                                                 |
| --- | ------------------------------------------------------------------------------------ | ----------------------- | -------------------------------------------------------------------- |
| R01 | Separate customer sessions and all accounts/rules/results/history                    | 002, 015                | Ownership/foreign-key tests; cross-session denial tests              |
| R02 | Multiple individually authorized Gmail mailboxes                                     | 002, 005, 011           | Fake multi-account isolation; later interactive Google sign-in       |
| R03 | Google desktop OAuth; no password/API-key sharing                                    | 005                     | Adapter and callback tests; interactive consent test is external     |
| R04 | OS-protected token storage; no token in UI/log/report                                | 005, 014, 017           | Credential-adapter and redaction tests; security review              |
| R05 | Workspace admin, OAuth verification, and restricted-scope readiness                  | 005, 017, 018           | Setup checklist and owner evidence; external dependency              |
| R06 | Protection rules for senders/domains, labels, and starred messages take precedence   | 006, 007, 010           | Rule precedence matrix and pre-mutation recheck tests                |
| R07 | Explainable sender, subject, label, and received-before rules                        | 006, 007                | Deterministic classification fixtures and shown reasons              |
| R08 | Distinct business, financial, marketing, spam, uncertain categories; age is not spam | 006, 007                | Category fixtures and uncertain-default tests                        |
| R09 | Exact cutoff/time zone, Inbox/all-mail scope, explicit Sent/Spam/Trash controls      | 006                     | Date boundary/time-zone and scope query tests                        |
| R10 | Counts and samples per mailbox before execution                                      | 007, 015                | Paginated fake scans and UI regression tests                         |
| R11 | Review individuals and build approved groups                                         | 009                     | Selection/pagination/reload tests                                    |
| R12 | Gmail approval names exact scoped message IDs; new discoveries need approval         | 009, 010                | Approval snapshot and late-discovery exclusion tests                 |
| R13 | Apply cleanup to individual messages, never whole threads/newer replies              | 003, 010                | Fake Gmail call assertions with mixed-age thread fixture             |
| R14 | Trash is default; restoration window clearly explained                               | 010, 011, 013           | Fake label mutation/restore tests and report copy review             |
| R15 | Log message ID, original labels, action, and result for restoration                  | 010, 011                | Crash-safe journal and external-edit-aware restore tests             |
| R16 | Retention/Vault confirmation before age cleanup                                      | 006, 009, 018           | Required checklist gate tests and final rehearsal                    |
| R17 | Routine attachment scan retrieves structure/metadata, never content by default       | 003, 008                | Fake API call ledger proves no attachment-content calls              |
| R18 | Optional selected/per-job downloads, default off, expected size shown                | 012                     | Explicit opt-in, byte/file cap, cancel, cleanup tests                |
| R19 | Largest-attachments view: Inbox default, expandable scope and filters/sort           | 008                     | Indexed synthetic fixtures and UI query tests                        |
| R20 | Distinguish attachment, summed attachment, and estimated whole-message sizes         | 008                     | Missing/estimated/reported-size presentation tests                   |
| R21 | Attachment cleanup shows parent/reason and affects the parent message                | 008, 009, 010           | Deduplicated parent approval and fake mutation assertions            |
| R22 | Incremental attachment results/progress; incomplete ranking label                    | 008                     | Multi-page scan UI/state tests and duplicate-parent fixtures         |
| R23 | Large mailbox work is incremental and hours-long while UI stays responsive           | 003, 004, 016           | Bounded fake workloads, UI checks, multi-hour soak                   |
| R24 | Fetch minimum metadata/body data; bounded memory and concurrency                     | 003, 004, 014, 016      | API ledger plus memory/concurrency benchmark evidence                |
| R25 | Durable job/candidate/rule/approval/action checkpoints                               | 002, 004, 007, 009, 010 | Restart tests at each checkpoint                                     |
| R26 | Expired cursor rediscovery deduplicates persisted scoped IDs                         | 003, 007                | Invalid-token fake sequence and uniqueness assertions                |
| R27 | Complete discovery scope before cleanup mutation                                     | 007, 010                | State-machine denial and call-order tests                            |
| R28 | Rate limits, timeouts, Retry-After, bounded jittered retry, visible retry queue      | 004                     | Fake clock/throttle/timeout tests                                    |
| R29 | Journal intent and reconcile uncertain remote results before retry                   | 010                     | Forced-crash response-loss scenarios                                 |
| R30 | Expired/revoked auth pauses one mailbox while others continue                        | 005, 011                | Multi-account authorization-loss simulation                          |
| R31 | Pause/resume/cancel between units; cancel preserves completed actions                | 004, 011                | Deterministic controls and restart tests                             |
| R32 | Show phase, processed/pending/failures/activity and label estimates                  | 004, 015                | Bounded progress schema and UI regression tests                      |
| R33 | Bound caches/logs/temp files; monitor disk and pause on unsafe persistence           | 012, 014, 016           | Synthetic low-disk tests and growth measurements                     |
| R34 | Explain sleep/shutdown pause and safe resume                                         | 004, 013, 015           | Forced restart plus operator-copy checks                             |
| R35 | Final report includes successes, failures, skips, restoration facts                  | 013                     | Report snapshots reconciled to fake audit records                    |
| R36 | Disconnect, revoke option, and removal of locally cached email data                  | 013                     | Fake revoke and scoped cache-removal tests; real revoke external     |
| R37 | Responsive loading, empty, error, navigation, and simulated-data states              | 001, 015                | Component/boundary tests and GUI inspection                          |
| R38 | Secure Electron sandbox and narrow ownership-checked typed IPC                       | 001, 017                | Malformed/unknown/wrong-owner/sender/error tests and security review |
| R39 | SQLite/better-sqlite3/Drizzle durable local storage                                  | 001, 002                | Native package launch; migrations/constraints/restart tests          |
| R40 | Recovery and scale validation: restart, loss, throttle, auth, disk, partial actions  | 015, 016, 018           | Recorded representative workload and failure campaign                |

## Explicitly deferred beyond version one

| Deferred behavior                                 | Rule now                                                             | Later verification gate                                                      |
| ------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Automatic cleanup/deletion for trusted categories | Every v1 cleanup needs review and exact message approval             | New product milestone and customer safety review                             |
| Immediate permanent deletion                      | V1 uses per-message Trash only; broader scope is not requested       | Separate explicit approval, scope, UI, and recovery design                   |
| Incremental new-mail-only sync                    | V1 runs scoped resumable scans; no continuous/background sync claim  | Cursor/history design and missed-event recovery campaign                     |
| Cloud AI classification                           | V1 uses local explicit rules and sends no email to AI/cloud services | Provider/data/retention choice, customer agreement, Google compliance review |

## Current reconciliation (milestone 018)

No R01–R40 requirement is verified end to end. This is a release blocker, not a change to the
requirements above.

| Requirement IDs | Current implementation/evidence state | Release disposition |
| --- | --- | --- |
| R01–R36 | Not implemented. The source has no durable customer/account/message/job/rule/candidate/approval/action/download/report/closeout model and no Gmail provider. | Incomplete; complete milestones 002–016 and their deterministic fake/synthetic checks. |
| R37 | Partial source only: the static simulated shell contains navigation and basic loading/error handling. No dependency-backed component test, GUI inspection, or complete-workflow usability evidence passed. | Incomplete; milestone 015 remains blocked. |
| R38 | Partial source/historical smoke only: hardened window settings, strict schemas, named preload API, sender/ownership hooks, and an IPC test exist. The current dependency-backed test and packaged security review did not run. | Incomplete; milestones 001 and 017 remain blocked. |
| R39 | Partial source only: SQLite/Drizzle foundation definitions and WAL/foreign-key setup exist. Native dependency installation, migrations, constraints, restart behavior, and packaged loading are unverified. | Incomplete; milestones 001 and 002 remain blocked. |
| R40 | Not implemented or exercised. No failure campaign, 100,000-message benchmark, or two-hour soak exists. | Release blocker; milestones 015, 016, and 018 cannot complete. |

The future-feature table remains unchanged: automatic cleanup, permanent deletion, incremental
new-mail sync, and cloud AI are not part of version one and cannot be used to close any current
requirement.
