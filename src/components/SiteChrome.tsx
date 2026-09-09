import Link from 'next/link';
import { PERSON, VENTURES, ADDRESS } from '@/lib/site';

/*
 * Labels are German; slugs are not. The URLs stay exactly as they are — renaming
 * a working German URL during a redesign buys nothing and costs a redirect — so
 * "Leistungen" points at /de/services/ and "Referenzen" at /de/case-studies/.
 * The vocabulary is lifted from the existing site's own nav.
 */
const NAV = [
  { href: '/de/services/', label: 'Leistungen' },
  { href: '/de/branchen/', label: 'Einsatzbereiche' },
  { href: '/de/case-studies/', label: 'Referenzen' },
  { href: '/de/pricing/', label: 'Preise' },
  { href: '/de/blog/', label: 'Blog' },
  { href: '/de/kontakt/', label: 'Kontakt' },
];

const LEGAL = [
  { href: '/de/impressum/', label: 'Impressum' },
  { href: '/de/datenschutz/', label: 'Datenschutz' },
  { href: '/de/nutzungsbedingungen/', label: 'Nutzungsbedingungen' },
  { href: '/de/cookies/', label: 'Cookies' },
  { href: '/de/haftungsausschluss/', label: 'Haftungsausschluss' },
  { href: '/de/verhaltenskodex/', label: 'Verhaltenskodex' },
];

const MORE = [
  { href: '/de/about/', label: 'Profil' },
  { href: '/de/methode/', label: 'Methode' },
  { href: '/de/sicherheit/', label: 'Sicherheit' },
  { href: '/de/leitfaeden/', label: 'Leitfäden' },
  { href: '/de/karriere/', label: 'Karriere' },
];

export function Header() {
  return (
    <header className="border-b border-[var(--rule)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-5xl flex-wrap items-baseline gap-x-8 gap-y-3 px-6 py-5">
        <Link href="/de/" className="font-semibold tracking-tight text-[var(--text)]">
          {PERSON.shortName}
        </Link>
        <nav aria-label="Hauptnavigation" className="ms-auto">
          <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[0.9375rem]">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--text-muted)] underline-offset-4 hover:text-[var(--text)] hover:underline hover:decoration-[var(--accent)]"
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
    <footer className="mt-28 border-t border-[var(--rule)] bg-[var(--surface-sunken)]">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-semibold">{PERSON.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
              {ADDRESS.streetAddress}
              <br />
              {ADDRESS.postalCode} {ADDRESS.addressLocality}
            </p>
            <p className="mt-3 text-sm">
              <a href={`mailto:${PERSON.email}`} className="text-[var(--link)] hover:underline">
                {PERSON.email}
              </a>
              <br />
              <a href={`tel:${PERSON.telephone}`} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                {PERSON.telephoneDisplay}
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Unternehmen</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {VENTURES.map((v) => (
                <li key={v.id}>
                  {v.external ? (
                    <a
                      href={v.url}
                      rel="me noopener"
                      className="text-[var(--text-muted)] hover:text-[var(--text)]"
                    >
                      {v.name}
                    </a>
                  ) : (
                    <Link href="/de/services/" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                      {v.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Mehr</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {MORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Rechtliches</h2>
            <ul className="mt-2 space-y-1.5 text-sm">
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-[var(--rule)] pt-6 text-sm text-[var(--text-faint)]">
          © {new Date().getFullYear()} {PERSON.name}, {ADDRESS.addressLocality}
        </p>
      </div>
    </footer>
  );
}
