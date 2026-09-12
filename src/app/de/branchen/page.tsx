import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, Briefcase, BarChart3, Check, ArrowRight } from 'lucide-react';
import { CONTENT_PAGES, AREA_HIGHLIGHTS } from '@/lib/pages';

const AREA_ICONS = {
  '/de/branchen/finanzteams/': Calculator,
  '/de/branchen/dienstleister/': Briefcase,
  '/de/branchen/reporting-daten/': BarChart3,
} as const;
import { contentPageGraph, jsonLd } from '@/lib/schema';
import { illustrationFor } from '@/lib/illustrations';
import { IconTile } from '@/components/ui';
import { PhotoBand } from '@/components/PhotoBand';

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
  const Illustration = illustrationFor('index:branchen');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contentPageGraph('/de/branchen/', 'Einsatzbereiche')) }}
      />
      {/*
       * A market hall: many identical bays, different trades under one roof —
       * which is the page's argument, that the construction underneath does not
       * change with the department.
       */}
      <PhotoBand
        id="market-hall"
        as="h1"
        size="opener"
        eyebrow="Einsatzbereiche"
        heading="Andere Abteilung, dieselbe Regel."
        lead="Die Arbeit sieht je nach Abteilung anders aus, die Regel bleibt dieselbe: KI schlägt vor, Menschen entscheiden."
      />

      <div className="mx-auto max-w-5xl px-6 pt-16 pb-10">

        {Illustration ? (
          <div className="mt-10">
            <Illustration />
          </div>
        ) : null}
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <ul className="border-t border-[var(--rule-strong)]">
          {AREAS.map((a) => (
            <li key={a.route} className="border-b border-[var(--rule)]">
              <Link href={a.route} className="rail group py-7">
                <span className="inline-flex"><IconTile icon={AREA_ICONS[a.route as keyof typeof AREA_ICONS] ?? Briefcase} /></span>
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold tracking-tight group-hover:text-[var(--link)]">
                    {a.title}
                  </h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-[var(--text-muted)]">
                    {a.description}
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {(AREA_HIGHLIGHTS[a.route] ?? []).map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-text)]"
                          strokeWidth={2.25}
                          aria-hidden
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--link)]">
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
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
