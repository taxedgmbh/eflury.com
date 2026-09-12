import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { CONTENT_PAGES, getPageHtml } from '@/lib/pages';
import { contentPageGraph, jsonLd } from '@/lib/schema';
import { GuideRequestForm } from '@/components/GuideRequestForm';
import { Card, IconTile } from '@/components/ui';

const meta = CONTENT_PAGES.leitfaeden;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.route },
};

/**
 * Not the generic ContentPage: each guide needs its own request form.
 *
 * The `guide` values must match the GUIDES map in
 * src/app/api/contact/route.ts — the route answers with that guide's file path.
 * The PDFs stay behind the form rather than being linked directly, which is the
 * point of a lead magnet and why they were orphaned in public/downloads until
 * now.
 */
const GUIDES = [
  {
    guide: 'revdsg-ai',
    title: 'revDSG & KI',
    blurb:
      'Was das revidierte Schweizer Datenschutzgesetz für den Einsatz von KI im Betrieb bedeutet — und was Sie dokumentieren müssen.',
  },
  {
    guide: 'eu-ai-act',
    title: 'EU AI Act für Schweizer KMU',
    blurb:
      'Wann ein Schweizer KMU unter den EU AI Act fällt, welche Risikoklasse gilt und was bis wann zu tun ist.',
  },
  {
    guide: 'data-quality',
    title: 'Datenqualität',
    blurb:
      'Warum KI-Projekte an Daten scheitern und nicht an Modellen — mit einer Checkliste, die vor dem ersten Build durchläuft.',
  },
  {
    guide: 'implementation',
    title: 'KI-Implementierungs-Playbook',
    blurb:
      'Das Fünf-Phasen-Framework von der Analyse bis zum Betrieb, inklusive ROI-Rechnung und den häufigsten Fallstricken.',
  },
  {
    guide: 'sample-audit',
    title: 'Musterbericht KI-Audit',
    blurb:
      'Ein vollständiger Auditbericht für einen fiktiven Kunden — damit Sie sehen, was Sie bekommen, bevor Sie etwas bestellen.',
  },
] as const;

export default async function LeitfaedenPage() {
  const html = await getPageHtml(meta.file);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(contentPageGraph(meta.route, meta.title)) }}
      />

      <div className="mx-auto max-w-5xl px-6 pt-16 pb-20">
        <header className="border-b border-[var(--rule-strong)] pb-8">
          <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{meta.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">
            Schriftliche Leitfäden zu den Fragen, die in Projekten immer wieder
            auftauchen. Kostenlos, als PDF, gegen Ihre E-Mail-Adresse.
          </p>
        </header>

        <div
          className="prose-de legal-prose mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-2">
          {GUIDES.map((g) => (
            <li key={g.guide}>
              <Card className="flex h-full flex-col">
                <span className="inline-flex">
                  <IconTile icon={FileText} />
                </span>
                <h2 className="mt-5 text-xl font-bold tracking-tight">{g.title}</h2>
                <p className="mt-2.5 leading-relaxed text-[var(--text-muted)]">{g.blurb}</p>
                <div className="mt-6 border-t border-[var(--rule)] pt-5">
                  <GuideRequestForm guide={g.guide} title={g.title} />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
