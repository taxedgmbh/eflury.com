import Link from 'next/link';
import { PERSON, VENTURES } from '@/lib/site';

/*
 * Phase 1 chrome: deliberately restrained. The full redesign lands in Phase 2 —
 * this exists so the blog pipeline can be reviewed on a real page rather than on
 * unstyled markup, and so the header/footer contract is settled early.
 *
 * No language switcher: the site is German-only now.
 */

const NAV = [
  { href: '/de/', label: 'Start' },
  { href: '/de/blog/', label: 'Blog' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link
          href="/de/"
          className="text-[0.95rem] font-semibold tracking-tight text-[var(--text)]"
        >
          {PERSON.shortName}
        </Link>
        <nav aria-label="Hauptnavigation">
          <ul className="flex items-center gap-6 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">{PERSON.name}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Grenchen, Schweiz</p>
            <p className="mt-3 text-sm">
              <a
                href={`mailto:${PERSON.email}`}
                className="text-[var(--accent)] hover:underline"
              >
                {PERSON.email}
              </a>
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--text)]">Unternehmen</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {VENTURES.map((v) => (
                <li key={v.id}>
                  {v.external ? (
                    <a
                      href={v.url}
                      className="text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                      rel="me noopener"
                    >
                      {v.name} ↗
                    </a>
                  ) : (
                    <span className="text-[var(--text-muted)]">{v.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} {PERSON.name}
        </p>
      </div>
    </footer>
  );
}
