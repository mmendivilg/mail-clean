import { useEffect, useState } from 'react';
import type { FoundationStatus } from '../domain/ipc';
import { SIMULATED_CONTEXT } from '../domain/ipc';

type ViewState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; status: FoundationStatus };

const descriptions: Record<string, { eyebrow: string; title: string; copy: string }> = {
  sessions: {
    eyebrow: 'Customer workspace',
    title: 'Foundation demo session',
    copy: 'Customer sessions will isolate mailboxes, rules, approvals, and cleanup history.',
  },
  mailboxes: {
    eyebrow: 'Connections',
    title: 'No Gmail account required',
    copy: 'Google sign-in arrives in a later milestone. This shell remains useful and testable offline.',
  },
  rules: {
    eyebrow: 'Policy',
    title: 'Protection always comes first',
    copy: 'Protected senders, labels, and starred messages will take precedence over cleanup rules.',
  },
  review: {
    eyebrow: 'Approval',
    title: 'Nothing awaiting review',
    copy: 'Approvals will name an exact, durable set of message IDs. New discoveries require review.',
  },
  attachments: {
    eyebrow: 'Storage review',
    title: 'No attachment metadata yet',
    copy: 'Routine scans will index metadata only. Cleaning an attachment result affects its parent email.',
  },
  jobs: {
    eyebrow: 'Durable work',
    title: 'No active jobs',
    copy: 'Long-running work will checkpoint bounded batches and resume safely after interruptions.',
  },
  reports: {
    eyebrow: 'Closeout',
    title: 'No reports generated',
    copy: 'Completed actions, failures, skips, and restoration details will appear here.',
  },
};

export function App() {
  const [view, setView] = useState<ViewState>({ kind: 'loading' });
  const [active, setActive] = useState('sessions');

  useEffect(() => {
    let cancelled = false;
    window.mailClean.foundation
      .getStatus({ context: SIMULATED_CONTEXT, query: { pageSize: 25 } })
      .then((response) => {
        if (cancelled) return;
        if (response.ok) setView({ kind: 'ready', status: response.data });
        else setView({ kind: 'error', message: response.error.message });
      })
      .catch(() => {
        if (!cancelled) {
          setView({ kind: 'error', message: 'The secure desktop bridge did not respond.' });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (view.kind === 'loading') {
    return (
      <main className="center-state" aria-live="polite">
        <div className="spinner" />
        <p>Opening the local workspace…</p>
      </main>
    );
  }

  if (view.kind === 'error') {
    return (
      <main className="center-state error-state" role="alert">
        <span className="status-mark">!</span>
        <h1>Workspace unavailable</h1>
        <p>{view.message}</p>
        <p className="fine-print">No mailbox action was attempted.</p>
      </main>
    );
  }

  const content = descriptions[active] ?? descriptions.sessions!;

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">MC</span>
          <div>
            <strong>Mail Clean</strong>
            <span>Operator console</span>
          </div>
        </div>
        <div className="simulation-banner">
          <span className="pulse" />
          Simulated data only
        </div>
        <nav aria-label="Primary navigation">
          {view.status.navigation.map((item) => (
            <button
              className={item.id === active ? 'nav-item active' : 'nav-item'}
              key={item.id}
              onClick={() => setActive(item.id)}
              type="button"
            >
              <span className="nav-glyph" aria-hidden="true">
                {item.label.slice(0, 1)}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <span>Local workspace</span>
          <strong>Protected mode</strong>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <span className="crumb">Sessions / Foundation demo</span>
            <h1>{content.title}</h1>
          </div>
          <div className="account-pill">
            <span>DEMO</span>
            {view.status.mailboxLabel}
          </div>
        </header>

        <section className="hero-card">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2>{content.title}</h2>
            <p className="hero-copy">{content.copy}</p>
          </div>
          <div className="empty-illustration" aria-hidden="true">
            <span className="mail-line long" />
            <span className="mail-line" />
            <span className="mail-line short" />
          </div>
        </section>

        <section className="stats" aria-label="Workspace summary">
          <article>
            <span>Connected mailboxes</span>
            <strong>0</strong>
            <small>Google setup not configured</small>
          </article>
          <article>
            <span>Pending approvals</span>
            <strong>0</strong>
            <small>Exact message sets only</small>
          </article>
          <article>
            <span>Attachment content</span>
            <strong>Off</strong>
            <small>Metadata-only by default</small>
          </article>
        </section>

        <section className="empty-panel">
          <span className="status-mark subtle">✓</span>
          <div>
            <h3>Secure foundation is ready</h3>
            <p>
              Navigation works without an account. Later milestones will add each workflow behind
              the same validated, ownership-scoped boundary.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
