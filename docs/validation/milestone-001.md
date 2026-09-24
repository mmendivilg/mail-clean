# Milestone 001 validation

Date: 2026-09-24  
Host: macOS Darwin arm64, Node.js 24.19.0, npm 11.17.0

## Outcome

**Incomplete — dependency installation and required end-to-end verification are blocked by the
execution environment's unavailable DNS/network access to the npm registry.** The architecture,
scaffold, hardened boundary, UI, and tests are present, but no lockfile could be generated and the
real typecheck, lint, Vitest suite, Forge bundle, Electron launch, or GUI interaction may be claimed
as successful.

## Observed checks

| Command/check                                                                               | Observed result                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node --version`; `npm --version`; `uname -s`; `uname -m`                                   | Passed: Node 24.19.0, npm 11.17.0, Darwin arm64                                                                                                                                                                               |
| `npm view electron version` and Forge version queries                                       | Produced no response and were cancelled after the bounded wait                                                                                                                                                                |
| `curl -I --max-time 10 https://registry.npmjs.org/electron`                                 | Failed immediately: `Could not resolve host: registry.npmjs.org`                                                                                                                                                              |
| `npm install --prefer-offline --no-audit --no-fund --fetch-retries=1 --fetch-timeout=30000` | Made no progress/output during two 30-second waits and was cancelled; no `node_modules` or lockfile was created                                                                                                               |
| `npm install --package-lock-only --offline --ignore-scripts --no-audit --no-fund`           | Failed with `ENOTCACHED`: Forge CLI registry metadata was not cached                                                                                                                                                          |
| Cached Prettier 3.9.6 `--write .`, followed by `--check .`                                  | Passed after adding repository ignores: `All matched files use Prettier code style!`                                                                                                                                          |
| `node --check eslint.config.mjs` and JSON parse of package/TypeScript/Prettier configs      | Passed                                                                                                                                                                                                                        |
| Cached TypeScript 5.9.3 `transpileModule` syntax pass                                       | Passed for 17 non-declaration TypeScript/TSX source, test, and config files; this is syntax-only, not a substitute for `tsc --noEmit`                                                                                         |
| Synthetic boundary smoke using compiled source and cached Zod 4.5.2                         | Passed malformed request, unknown operation, wrong session, rejected sender, sanitized unexpected error, and a successful named preload bridge round trip                                                                     |
| `git diff --check`                                                                          | Passed with no whitespace errors                                                                                                                                                                                              |
| Source inspection of renderer privileges                                                    | `nodeIntegration: false`, `contextIsolation: true`, `sandbox: true`, webviews disabled, all permission requests denied, unexpected navigation and all new windows denied; renderer source contains no Node/filesystem imports |

The boundary smoke executed the same `createFoundationHandler` and `createMailCleanApi` sources used
by the application. It provides useful logic evidence but does not replace the committed Vitest test
or an Electron process integration test.

## Required commands attempted after the failed install

| Command             | Exit/result                                   |
| ------------------- | --------------------------------------------- |
| `npm run typecheck` | Exit 127: `tsc: command not found`            |
| `npm run lint`      | Exit 127: `eslint: command not found`         |
| `npm test`          | Exit 127: `vitest: command not found`         |
| `npm run package`   | Exit 127: `electron-forge: command not found` |

These are failed/unperformed required gates, not product defects reproduced against installed
dependencies. Their absence prevents milestone completion.

## GUI and packaging limitation

`npm start` was not attempted because Electron and Forge could not be installed. No development or
packaged window launched, navigation was not visually exercised, and GUI availability itself was
not established. Production bundling and native `better-sqlite3` rebuilding were not exercised.
The React navigation implementation and its loading/empty/error/simulated states were inspected in
source only.

## Security cases represented in the committed test

`tests/ipc-boundary.test.ts` covers:

- a malformed/over-budget strict request;
- an unknown operation that resembles arbitrary shell access;
- a wrong-session context denied by ownership;
- wrong web-contents ID, frame URL, and subframe senders;
- removal of an unexpected exception's secret text and stack;
- one successful request through the named preload bridge with a validated response.

Future operations must add a discriminated Zod request/response, an ownership-enforcing main
handler, adversarial tests, and a specifically named preload method. Raw `ipcRenderer`, shell,
filesystem, SQL, URLs, and tokens remain unavailable to the renderer.

## External gaps and resume steps

After registry/DNS access is available:

1. Run `npm install` and commit the generated `package-lock.json`. Review any version/API resolution
   changes rather than silently accepting incompatible majors.
2. Run `npm run format:check`, `npm run typecheck`, `npm run lint`, and `npm test`; fix and rerun any
   relevant failures.
3. Run `npm run package` and confirm Forge rebuilds and packages `better-sqlite3` successfully.
4. Run `npm start`; inspect the visible simulated-data banner and every navigation item, and confirm
   loading, empty, and forced error behavior. Confirm DevTools reports no `require`, `process`, raw
   IPC, or filesystem API on `window`.
5. Launch the unsigned packaged app locally and repeat the bridge/navigation smoke. Record exact
   observed outcomes here.

Google Cloud/OAuth setup, real mailbox access, signing/notarization, other operating systems, and
large-mailbox capacity are intentionally separate external/later validation gaps and do not need to
be performed merely to resume milestone 001.
