# Prompt 013: Reports, account disconnect, and session closeout

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 005, 011, 012.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Generate accurate session and cleanup reports

Build an in-app report and bounded CSV plus printable HTML export for sessions and jobs. Include scope, rule/approval versions, counts, successes, skips, failures, unresolved outcomes, restoration status, and attachment downloads. Deduplicate message totals. Separate confirmed actions from observed remote state and estimates. Avoid secrets, message bodies, attachment content, and unsupported claims of reclaimed Gmail storage. Escape HTML and mitigate spreadsheet formula injection in CSV.

### 2. Implement account disconnect and access revocation

Build explicit disconnect controls that stop new work, settle or preserve in-flight outcomes, remove local token material, and offer Google access revocation. Consult official revocation semantics and explain any effect on other connections to the same Google app/account. Track failed remote revocation distinctly from completed local disconnect; direct operators to account access settings when needed without retaining credentials against their removal choice. Preserve historical reports unless separately purged.

### 3. Implement explicit local cache and session-data removal

Provide separate options for clearing reconstructible cache and removing a customer's retained local data/history. Show impact on reports and restoration before confirmation. Stop relevant jobs, scope deletion across database/files/log references, and remove token references as required. Distinguish downloaded/exported operator files from managed cache and leave them unless explicitly selected. Handle WAL and application backups according to the documented retention policy; do not claim forensic secure erasure.

## Acceptance and verification

1. Reconcile report totals against action journal fixtures including partial cleanup and restoration. Test large export, escaping, Unicode, cancellation, and redaction. Label remaining uncertainty and recovery limits without promising that all trashed messages will remain available for an exact future interval.

2. Test offline revoke, expired credentials, repeated disconnect, multi-account sessions, and disconnect during execution. No new account request is scheduled after disconnect begins. Never report successful remote revocation when only local tokens were removed.

3. Use temporary synthetic storage to test customer isolation, interrupted purge recovery, active jobs, backups, and files outside managed directories. Verify removing one customer never removes another's data. The unattended run must not purge any real user data.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
