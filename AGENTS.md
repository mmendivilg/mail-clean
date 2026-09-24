# Mail Clean contributor guide

## Commands

- `npm ci` installs the locked dependencies.
- `npm start` launches the development desktop app.
- `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm test` run the fast gates.
- `npm run package` creates an unsigned local application bundle in `out/`.

## Conventions

- Keep domain contracts in `src/domain`, privileged code in `src/main`, the fixed bridge in
  `src/preload`, unprivileged UI in `src/renderer`, and bounded computation in `src/worker`.
- Add renderer capabilities by extending the discriminated Zod schemas, implementing an owned
  main-process operation, and exposing a named preload method. Never expose raw `ipcRenderer`,
  Node, shell, filesystem, database, or token access.
- Use strict TypeScript, validate every privileged request and response at runtime, use bounded
  pagination/progress payloads, and return sanitized errors.
- Tests use deterministic fake Gmail data and synthetic temporary files only.

## Safety invariants

- Scope every message by customer, session, account, and Gmail message ID; enforce ownership in
  the main process even when the renderer already supplied scoped data.
- Protection rules win. Cleanup needs a durable exact-message approval and a fresh eligibility
  check. Never approve newly discovered messages implicitly.
- Finish discovery for an execution scope before mutating it. Journal intent, reconcile uncertain
  remote outcomes, and Trash individual messages only. Automatic cleanup and permanent deletion
  are outside version one.
- Do not download attachment content during routine scans. An explicit, bounded download flow is
  separate, and cleaning an attachment candidate affects its parent message.
- Keep OAuth tokens in OS credential storage and all mailbox content out of logs, reports, and
  cloud AI. Never use real customer data or credentials in unattended tests.
