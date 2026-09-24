# Mail Clean

Mail Clean is a planned local app for supervised Gmail cleanup, including on-site sessions at a customer's business. It will support several mailboxes, identify unwanted messages using agreed rules, and put them in a review queue with reasons before making changes. Optional cloud AI classification is planned for a later phase.

## Status

The app has not been built yet. Customer-specific filtering rules and any future AI provider still need to be chosen. The workflow and features below describe the intended app, not functionality currently available.

## Planned workflow

1. **Create a customer session.** Keep each business's accounts, rules, results, and cleanup history separate.
2. **Connect mailboxes** through Google sign-in, with each account owner authorizing access. Arrange access before the on-site visit when possible.
3. **Agree on cleanup rules.** Choose protected senders and labels, unwanted categories, and any cutoff date. Confirm which business records must be retained.
4. **Preview the scan.** Show counts, examples, and reasons per mailbox without changing messages.
5. **Review batches with the customer.** Keep individual messages or approve groups for cleanup, such as newsletters from selected senders.
6. **Apply approved actions.** Move messages to Trash by default, track progress, and support resuming interrupted work.
7. **Provide a cleanup report.** Record successful actions, failures, and messages that can still be restored.
8. **Disconnect when finished.** Offer to revoke access and remove locally cached email data.

## Gmail access

The app will use a Google Cloud project with the Gmail API and OAuth configured. Customers authorize their mailboxes through Google sign-in; they do not need to share passwords or supply a Gmail API key. The initial approach is to connect each mailbox individually.

Access tokens should be stored securely using the operating system's credential storage. Google Workspace administrator restrictions and applicable OAuth verification requirements must be addressed before customer use.

See [Google's desktop OAuth documentation](https://developers.google.com/identity/protocols/oauth2/native-app).

## Filtering rules

Start with explicit rules that can be explained and reviewed. Apply them in this order:

| Priority | Rule type | Example |
| --- | --- | --- |
| 1 | Protect | Keep approved customer/vendor domains, starred messages, and selected labels |
| 2 | Explicit cleanup | Flag newsletters from senders the customer selects |
| 3 | Date cleanup | Flag messages received before a chosen cutoff date |
| 4 | Optional AI assistance, later | Suggest categories for messages not resolved by explicit rules |
| 5 | Uncertain | Keep for manual review |

Protection rules take precedence over cleanup rules unless the customer explicitly changes them. Treat business correspondence, financial records, marketing, suspected spam, and uncertain messages as distinct categories. Age alone does not make a message spam.

## Planned date-based cleanup

Choose a cutoff date to find and delete all emails received before that date. For example, “delete all emails older than 2014” means emails received before January 1, 2014.

The date-based cleanup interface should provide:

- A **received before** date picker with the exact cutoff and time zone displayed.
- A choice of **Inbox only or all mail**, with explicit controls for including Sent, Spam, and Trash.
- Exceptions for protected senders, labels, and starred messages.
- Counts and sample messages per mailbox before execution.
- A review queue to keep individual messages or approve matching messages in bulk.

Apply actions to individual matching messages so that deleting an old message does not also delete newer replies in its conversation. Gmail supports queries such as `before:2014/01/01`; implementation must account for its documented date/time-zone behavior. See [Gmail search and filtering](https://developers.google.com/workspace/gmail/api/guides/filtering).

## Deletion and business records

Moving messages to Trash will be the default. Gmail normally permanently deletes trashed messages after 30 days, so restoration is time-limited. Maintain a log of message IDs, original labels, actions, and results to support restoration while messages remain recoverable.

Immediate permanent deletion is a later feature requiring separate, explicit approval. It requires broader Gmail API access than `gmail.modify`. See [Gmail deletion behavior](https://support.google.com/mail/answer/7401) and [Gmail API permissions](https://developers.google.com/workspace/gmail/api/auth/scopes).

Before age-based cleanup, confirm the customer's retention requirements and whether Google Vault rules or holds apply. Deleting messages from Gmail does not necessarily remove copies retained by Vault. See [Google Vault retention](https://knowledge.workspace.google.com/vault/retention/how-retention-works).

## Attachment handling and storage review

Attachment contents must not be downloaded by default. Routine scans should collect only available attachment metadata, such as filename, MIME type, reported size, and the associated message ID, sender, subject, and date. Retrieve only the message structure needed to discover attachments; keep attachment-content retrieval separate from scanning.

- **Optional downloads.** Let the operator explicitly download selected attachments or enable attachment downloads for a particular job. Keep this option off by default and show the expected download size when known.
- **Largest attachments view.** Provide an Inbox-scoped review view with options to expand to other mail, filter by minimum attachment size, file type, sender, and date, and sort individual attachments from largest to smallest.
- **Clear size information.** Distinguish individual attachment size, total attachment size per message, and estimated whole-message size. Label unavailable or estimated sizes rather than presenting whole-message size as an exact attachment size.
- **Review before cleanup.** Show the parent message and the rule or size filter that matched. Keeping or moving a message to Trash remains subject to protection rules and approval. Make clear that message cleanup affects the email and its attachments, not just the selected attachment.
- **Incremental results.** Discover and index attachment metadata in bounded batches, allow review while scanning continues, and show scan progress. Mark rankings as incomplete until the selected scope has been fully scanned; avoid counting a message more than once in cleanup totals when it has multiple attachments.

## Large mailboxes and long-running jobs

Handling large workloads is a first-version requirement. Customer mailboxes may contain multiple gigabytes of email, thousands or more messages, and roughly 20 years of history. Scanning and cleanup must support many hours of continuous operation while keeping the interface responsive and resource usage bounded. Reliability must include recovery from interruptions, not just avoiding crashes.

- **Process incrementally.** Search and paginate through messages in bounded batches. Fetch only the metadata required by a rule; retrieve bodies only when needed and avoid downloading attachments for routine cleanup.
- **Keep memory bounded.** Store job state and review results in a durable local database instead of holding the entire mailbox in memory. Paginate the review queue and limit concurrent work across accounts.
- **Checkpoint progress.** Persist discovered message IDs, scan progress, rule versions, approvals, and action outcomes as work completes. Resume after an app restart, network outage, or computer sleep without restarting the whole scan. If a saved pagination cursor is unusable, rediscover messages and deduplicate against persisted IDs.
- **Separate discovery from cleanup.** Build a persisted set of candidates before applying approved actions. Do not delete from a search result while relying on its pagination to discover the remaining candidates. Approval applies to the reviewed messages and rules; newly discovered messages need their own review.
- **Respect service limits.** Limit request rates and concurrency, use request timeouts, and retry transient failures with exponential backoff and jitter. Honor server retry guidance when supplied. Bound retries and place unresolved items in a visible retry queue instead of looping indefinitely.
- **Recover safely.** Record intended actions before sending them and reconcile uncertain results after interruptions before retrying. Recheck relevant message state and protection rules before applying changes. Track successes, failures, skips, and pending work per message so partially completed batches can resume safely.
- **Handle access interruptions.** Refresh authorization when possible; pause the affected mailbox and request sign-in when access expires or is revoked. Keep other authorized mailboxes running independently.
- **Provide operator controls.** Support pause, resume, and cancellation between work units. Cancellation stops new work and preserves completed results; it does not undo actions already applied. Show the current phase, processed and pending counts, failures, last activity, and clearly labeled estimates when totals or completion times are uncertain.
- **Manage local resources.** Bound caches and rotate logs, avoid logging email bodies or credentials, monitor available disk space, and pause safely if durable progress can no longer be saved. Explain that local jobs pause while the computer is asleep or shut down and resume when it is available again.

Before customer use, validate these requirements with representative large datasets and multi-hour runs. Include forced restarts, network loss, throttling, expired authorization, low disk space, and partially completed actions. Verify bounded memory and disk growth, a responsive interface, and recovery without lost approvals, skipped candidates, or unintended repeat actions. Record the tested workload sizes and results; no performance capacity has been validated yet.

## First version

- Separate customer sessions with multiple connected mailboxes.
- Protected sender/domain lists, labels, and starred-message exceptions.
- Sender, subject, label, and cutoff-date rules.
- Attachment metadata without content downloads by default, optional downloads, and a largest-attachments review view.
- Preview scans and a batch review queue with reasons.
- Approved bulk moves to Trash and a restoration log.
- Resumable cleanup with progress, error tracking, and a final report.
- Bounded resource use, durable checkpoints, and recovery for large mailboxes and multi-hour jobs.

## Future plans

- Allow automatic deletion for categories you trust.
- Scan only new mail after the initial scan.
- Add optional AI classification for messages that explicit rules cannot resolve.
- Add immediate permanent deletion as a separately approved action.

## Local app, cloud AI

The app will run on the operator's computer. The first version will use explicit rules without sending email content to an AI provider; Gmail access still requires an internet connection.

Future cloud AI classification will be optional. Before enabling it, choose the provider, define what email data may be sent and retained, and obtain the customer's agreement. Cloud processing of restricted Gmail data may introduce Google verification and security-assessment requirements. See [Google's restricted-scope requirements](https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification).
