# Milestone 017 validation — CI, desktop packaging, and security review

Date: 2026-09-24  
Host: Darwin arm64  
Data used: source files and configuration only; no Gmail account, credentials, mailbox data, or
attachment content

## Completion assessment

Status: **blocked; required dependencies are incomplete**.

Milestone 017 declares milestones 001, 005, 013, 014, 015, and 016 as hard dependencies. Every
one is recorded as blocked in `docs/development-status.md`, and their validation reports identify
unperformed required implementation and verification. Current source inspection confirms this is
not stale status: the workspace still contains only the milestone-001 foundation scaffold. It has
no Gmail provider or protected credential lifecycle, approval or mutation path, reports/closeout,
resource diagnostics/backups, complete operator regression workflow, scale benchmark, or two-hour
soak harness.

The runner contract prohibits bypassing a failed or incomplete required dependency. Consequently
this execution did not add CI or release configuration that would misleadingly validate the
foundation scaffold as the required product, did not alter packaging for absent production paths,
and did not claim to review cleanup security paths that do not exist. No application, workflow,
CI, package, or lockfile change was made. This report and the milestone-017 status entry are the
only changes from this execution.

## Dependency and source evidence

The following direct dependencies remain incomplete:

| Dependency | Recorded status | Material missing capability |
| --- | --- | --- |
| 001 | blocked | Installed/locked toolchain, passing foundation gates, packaged and launched desktop artifact |
| 005 | blocked | OAuth lifecycle, OS-protected token references, Gmail provider, fake/real adapter boundary |
| 013 | blocked | Durable reports, disconnect/revocation outcomes, scoped closeout and managed-data purge |
| 014 | blocked | Resource limits, redacted diagnostics, SQLite backup/restore and recovery validation |
| 015 | blocked | Complete operator workflow review and cross-layer failure-regression matrix |
| 016 | blocked | Completed 100,000-message benchmark and genuine two-hour fault-injected soak |

The inspected workspace has one strict simulated status IPC request, one foundation metadata
table, a static simulated renderer, a worker protocol schema that is not started by the app, and
one IPC boundary test file. `.github/`, `scripts/`, `out/`, `package-lock.json`, and `node_modules/`
are absent. There is no `build`, performance-smoke, benchmark, or soak npm script.

## Fresh observed checks

Commands ran from the configured workspace root. No remote CI job was created or run.

| Command | Observed outcome |
| --- | --- |
| `node --version` | Passed; `v24.19.0`. |
| `npm --version` | Passed; `11.17.0`. |
| `uname -srm` | Passed; `Darwin 27.0.0 arm64`. |
| `npm ci` | Failed with exit 1 because `package-lock.json`/`npm-shrinkwrap.json` is absent. npm also could not write its optional log under the sandboxed user npm directory; the missing lockfile was the install failure. |
| `npm run typecheck` | Failed with exit 127: `tsc: command not found`. |
| `npm run lint` | Failed with exit 127: `eslint: command not found`. |
| `npm run format:check` | Failed with exit 127: `prettier: command not found`. |
| `npm test` | Failed with exit 127: `vitest: command not found`. No test executed. |
| `npm run build` | Failed with exit 1 because no `build` script exists. |
| `npm run package` | Failed with exit 127: `electron-forge: command not found`. No artifact was created. |
| `npm run make` | Failed with exit 127: `electron-forge: command not found`. No installer/archive was created. |
| Static release-file inventory | Passed as an inspection command; `.github/`, `scripts/`, `out/`, and `package-lock.json` were all absent. |
| Static security/API search | Passed as an inspection command; found raw `ipcRenderer` only in preload, the expected window hardening in main, and no Gmail, token-store, attachment retrieval, file download, shell, or destructive message/thread API implementation. |

These results are failures or source observations, not passing product gates. Packaging was not
possible, so the built artifact was not launched and session persistence, worker startup, native
SQLite loading, database reopen, restart behavior, navigation policy, and version display were not
tested.

## Bounded packaging inventory

Existing, unexecuted Forge configuration enables ASAR packaging, automatic native-module unpacking,
Vite main/preload/renderer builds, and Electron fuses that disable Run-as-Node and Node CLI options
and require embedded ASAR integrity. Main source sets `contextIsolation: true`, `sandbox: true`,
`nodeIntegration: false`, disables webviews and permissions, denies new windows, and blocks
navigation away from the computed renderer target. SQLite is opened beneath Electron's `userData`
directory, and the preload path is resolved relative to the bundled main file.

Those source settings are not package evidence. Native `better-sqlite3` rebuild/loading, ASAR
unpacking, preload resolution, renderer resource resolution, production navigation, database
creation, worker packaging/startup, app version/startup handling, unsigned installation, and
restart were not exercised. The existing maker list names Windows, ZIP, RPM, and DEB makers, but
none has been built or tested; no cross-platform support is claimed. No signing, notarization,
update channel, certificate, upload, publication, or remote release action was configured or
performed.

## Bounded security review record

Observed foundation safeguards:

- the preload exposes a frozen, named API and is the only application source that imports raw
  `ipcRenderer`;
- main validates the exact window, main frame, renderer URL, strict request shape, bounded fields,
  simulated ownership, and response schema;
- unexpected handler errors return a fixed sanitized response;
- the BrowserWindow and Forge fuse settings express a restrictive renderer and package boundary.

These observations are limited to source review, and the existing regression test did not run.
No certification or complete product security review is claimed.

The required stale-approval, fresh-eligibility, exact-message mutation, intent journaling,
uncertain-result reconciliation, remote-content, token storage/fallback, attachment download path,
bounded file read, report/log redaction, and destructive Gmail-call reviews could not be performed
against product paths because those paths are absent. A source search found no Gmail mutation,
permanent-delete, thread-mutation, attachment-content retrieval, credential-store, download, shell,
or filesystem download implementation. That absence does not prove the future implementations
safe. It also means there is no mutation from an unapproved message today because there is no
mutation capability at all, and routine scans cannot retrieve attachment content because no scan
capability exists.

## Required milestone-017 work not performed

- no pinned lockfile, clean-install CI, migration fixture checks, IPC CI checks, bounded performance
  smoke, failure artifact handling, or retained long-running workflow was added or executed;
- no fake-Gmail product workflow exists to demonstrate that CI requires no secrets or that a soak
  cannot mutate Gmail;
- no two-hour soak was started, resumed, or passed, and there is no artifact or run identifier;
- no local unsigned app or installer/archive was produced, installed, launched, or restarted;
- no production native-SQLite, preload, renderer, worker, resources, app-data, version, or
  navigation behavior was observed;
- no signing, notarization, update-channel, cross-platform, GUI, or production-readiness check ran;
- no security fix or regression test was added because the relevant dependent paths are missing;
- current official Gmail mutation, scope, attachment, OAuth, and deletion requirements were not
  revalidated in this blocked execution.

## Assumptions, external gaps, and resume steps

- The configured workspace is authoritative even though the prompt context names another
  machine-specific path. All inspection and commands used the configured workspace root.
- The direct dependency reports and matching source state are treated as the scheduling gate, not
  as a documentation defect to be overwritten.
- Google Cloud/Gmail API setup, OAuth consent and verification/security-assessment requirements,
  Workspace administrator policy, and separately authorized live-account validation remain
  external gaps. They do not replace deterministic fake-Gmail verification.
- Apple signing identity, notarization credentials, update/release infrastructure, installer
  policy, and validation on Windows/Linux are external release gaps. No certificate purchase,
  signing, upload, publish, or deployment was attempted.

Resume by restoring dependency availability, generating and preserving the lockfile, and
completing and verifying milestones 001–016 in dependency order. Milestone 016 must include both a
completed 100,000-message benchmark and at least two hours of actual soak wall time; status-only or
background-start evidence is insufficient. Then re-dispatch milestone 017, review current primary
Electron/Forge and Google/Gmail documentation, add the locked local/CI check matrix and
non-mutating fake-data performance workflows, package the current host target, launch and restart
the unsigned artifact, verify native SQLite/preload/worker/resources/app-data/navigation/version
behavior, and perform the full cleanup security review with focused regression tests. Record
signing, notarization, update channels, other operating systems, and authorized live Google checks
as separate observed or external results.
