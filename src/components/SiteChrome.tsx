import Link from 'next/link';
import Image from 'next/image';
import { PERSON, VENTURES, ADDRESS } from '@/lib/site';
import { NewsletterForm } from './NewsletterForm';
import { ThemeToggle } from './ThemeToggle';

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
  { href: '/de/bildnachweis/', label: 'Bildnachweis' },
];

const MORE = [
  { href: '/de/about/', label: 'Profil' },
  { href: '/de/methode/', label: 'Methode' },
  { href: '/de/sicherheit/', label: 'Sicherheit' },
  { href: '/de/leitfaeden/', label: 'Leitfäden' },
  { href: '/de/karriere/', label: 'Karriere' },
];

/*
 * Sticky and translucent, which is the one piece of Apple's chrome worth
 * copying outright: on pages this long the nav is otherwise a scroll to the top
 * away, and backdrop-blur keeps the page visible underneath rather than
 * covering it with an opaque bar.
 *
 * The 80% background is a floor, not a preference — where backdrop-filter is
 * unsupported the header still has to be opaque enough to read against a
 * photograph scrolling beneath it. supports() takes it more translucent only
 * where the blur will actually render.
 *
 * Sticky from md up only. Below that the nav wraps to three rows — about 210px,
 * or 29% of a phone screen — and pinning that is a worse trade than scrolling
 * to the top. The proper fix is a disclosure menu, which needs real focus
 * management and is a separate piece of work rather than a class.
 */
export function Header() {
  return (
      <header className="top-0 z-50 border-b border-[var(--rule)] bg-[var(--surface)]/80 backdrop-blur-xl md:sticky supports-[backdrop-filter]:bg-[var(--surface)]/70">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-8 gap-y-1 px-6 py-3">
        {/*
          The brand mark eflury.com already uses. Kept alongside the person's
          name rather than the "eFlury Consulting" wordmark, since the site is
          now the umbrella for all three ventures rather than the consultancy.
        */}
        <Link href="/de/" className="tap gap-2.5">
          <Image
            src="/images/favicon-tab.png"
            alt=""
            width={30}
            height={30}
            className="rounded-md"
            priority
          />
          <span className="font-semibold tracking-tight text-[var(--text)]">
            {PERSON.shortName}
          </span>
        </Link>
        <nav aria-label="Hauptnavigation" className="ms-auto">
          <ul className="flex flex-wrap items-center gap-x-6 small">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="tap text-[var(--text-muted)] underline-offset-4 hover:text-[var(--text)] hover:underline hover:decoration-[var(--accent)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
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
              <a href={`tel:${PERSON.telephone}`} className="tap text-[var(--text-muted)] hover:text-[var(--text)]">
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
                      className="tap text-[var(--text-muted)] hover:text-[var(--text)]"
                    >
                      {v.name}
                    </a>
                  ) : (
                    <Link href="/de/services/" className="tap text-[var(--text-muted)] hover:text-[var(--text)]">
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
                  <Link href={l.href} className="tap text-[var(--text-muted)] hover:text-[var(--text)]">
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
                  <Link href={l.href} className="tap text-[var(--text-muted)] hover:text-[var(--text)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--rule)] pt-10">
          <h2 className="text-sm font-semibold">Auf dem Laufenden bleiben</h2>
          <div className="mt-3 max-w-md">
            <NewsletterForm />
          </div>
        </div>

        <p className="mt-12 border-t border-[var(--rule)] pt-6 text-sm text-[var(--text-faint)]">
          © {new Date().getFullYear()} {PERSON.name}, {ADDRESS.addressLocality}
        </p>
      </div>
    </footer>
  );
}
