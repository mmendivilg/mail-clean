# Prompt 008: Attachment metadata and largest-attachment review

Read `README.md`, applicable `AGENTS.md` files, `development-prompts/SHARED-INSTRUCTIONS.md`, and `docs/development-status.md` if present. Inspect existing code and relevant architecture before editing.

**Prerequisites:** 003, 005, 007.

Complete the following work as one milestone, in the order shown. Continue between its implementation steps without requesting routine confirmation. Preserve progress after each step so interrupted work can resume. Use simulated Gmail and synthetic local files for unattended tests.

## Implementation

### 1. Parse attachment metadata without downloading content

Implement a bounded MIME structure parser for nested multipart messages, attachment IDs, inline parts, filenames, MIME types, reported decoded sizes, and stable part identity. Define which parts appear as attachments and surface inline status. Retrieve only the Gmail structure fields required, excluding body.data and attachment bytes; inspect official API field semantics. Represent unknown sizes explicitly and bound malformed nesting/part counts.

### 2. Build the durable attachment metadata index

Add indexed attachment metadata persistence and a resumable discovery/enrichment job. Store parent message references, part identity, reported size, and metadata completeness. Batch structure reads through the request scheduler and allow result browsing during indexing. Track scope completion separately from message discovery and recover after crashes without duplicate attachment rows. Compute message attachment totals only with explicit partial/unknown semantics.

### 3. Build largest-attachment review

Create an Inbox-default attachment view with explicit expansion to other mail, minimum-size, file-type, sender, and date filters. Sort individual attachments largest first using server-side database queries and bounded UI rendering. Display individual size, total per message, and estimated whole-message size distinctly, along with unknown/partial indicators, parent message, and matching reason. Provide parent-message review selection, preserving protections and unique message counts.

## Acceptance and verification

1. Test nested multipart, repeated filenames, zero/unknown sizes, inline content, attachment IDs absent, Unicode names, and malformed structures. Assert no attachment-content endpoint or message body decoding runs. Keep estimated whole-message size separate from individual attachment size.

2. Verify restart/deduplication and stable ordering for equal sizes. Test a message with several attachments and prove message counts remain unique. Confirm rankings remain marked incomplete until all required metadata work for the selected scope is finished or unresolved work is clearly reported.

3. Use fixtures with multiple attachments per message, missing sizes, and incomplete indexing. Verify filters and sorting operate across the entire database rather than only the displayed page. Explain visibly that Trash affects the whole email and its attachments, and do not enable execution from incomplete scan results.

## Completion and handoff

Finish implementation, relevant checks, and fixes. Resolve reversible choices yourself and document material assumptions. Verify prerequisites against code and actual evidence. If unavailable credentials, signing, or other external steps prevent a check, complete independent work and record the gap accurately.

Update `docs/development-status.md` with this milestone number, per-step progress, changed files, commands and actual results, decisions, blockers, and next eligible work. Summarize the result. Stop after this milestone unless the sequence runner instructed you to continue.
