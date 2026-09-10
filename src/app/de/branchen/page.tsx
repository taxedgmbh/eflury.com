import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTENT_PAGES } from '@/lib/pages';
import { contentPageGraph, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Einsatzbereiche',
  description:
    'Wo Automatisierung in Schweizer KMU am schnellsten trägt: Finanzteams, Dienstleister, Reporting und Daten.',
  alternates: { canonical: '/de/branchen/' },
};

/*
 * Derived from CONTENT_PAGES rather than a second hand-written list, so a new
 * page cannot exist without appearing here. The Astro site kept three parallel
 * lists of the same routes and they drifted apart.
 */
const AREAS = Object.values(CONTENT_PAGES).filter(
  // No content page is registered at the index route itself, so
  // startsWith is sufficient — an inequality guard here is provably dead
  // once the routes are literal types.
  (p) => p.route.startsWith('/de/branchen/')
);

export default function BranchenIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contentPageGraph('/de/branchen/', 'Einsatzbereiche')) }}
      />
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-10">
        <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Einsatzbereiche</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
          Die Arbeit sieht je nach Abteilung anders aus, die Regel bleibt dieselbe:
          KI schlägt vor, Menschen entscheiden.
        </p>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <ul className="border-t border-[var(--rule-strong)]">
          {AREAS.map((a) => (
            <li key={a.route} className="border-b border-[var(--rule)]">
              <Link href={a.route} className="rail group py-7">
                <p className="rail-label">Einsatzbereich</p>
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold tracking-tight group-hover:text-[var(--link)]">
                    {a.title}
                  </h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-[var(--text-muted)]">
                    {a.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
