import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardCheck, Cpu, Server, Calculator, BarChart3, Database, Activity, ArrowRight } from 'lucide-react';
import { SERVICES } from '@/data/services';

const ICONS = { ClipboardCheck, Cpu, Server, Calculator, BarChart3, Database, Activity } as const;
const ICON_FOR: Record<string, keyof typeof ICONS> = {
  'ki-audit': 'ClipboardCheck',
  'claude-skills': 'Cpu',
  'mcp-integration': 'Server',
  'finanzen-automatisierung': 'Calculator',
  'power-bi': 'BarChart3',
  'datenqualitaet': 'Database',
  'ki-betrieb': 'Activity',
};
import { servicesIndexGraph, jsonLd } from '@/lib/schema';
import { PhotoBand } from '@/components/PhotoBand';
import { illustrationFor } from '@/lib/illustrations';
import { IconTile } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Leistungen',
  description:
    'Vom KI-Audit mit ehrlichem Go/No-Go bis zum betreuten Betrieb — Automatisierung für Schweizer KMU, zum Fixpreis und schriftlich dokumentiert.',
  alternates: { canonical: '/de/services/' },
};

export default function ServicesIndex() {
  const Illustration = illustrationFor('index:services');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(servicesIndexGraph()) }}
      />

      {/*
       * A 1924 machine shop: rows of lathes, each set up for a different job off
       * one shop floor. That is the page — seven services that build on each
       * other, not a catalogue of unrelated products.
       */}
      <PhotoBand
        id="machine-shop"
        as="h1"
        size="opener"
        eyebrow="Leistungen"
        heading="Sieben Leistungen, die aufeinander aufbauen."
        lead="Der übliche Einstieg ist das Audit: eine Woche, ein Fixpreis, und am Ende eine schriftliche Entscheidungsgrundlage — auch wenn sie gegen ein Projekt spricht."
      />

      <div className="mx-auto max-w-5xl px-6 pt-12 sm:pt-16 pb-10">
        {Illustration ? (
          <div className="mt-10">
            <Illustration />
          </div>
        ) : null}
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <ul className="border-t border-[var(--rule-strong)]">
          {SERVICES.map((s) => (
            <li key={s.slug} className="border-b border-[var(--rule)]">
              <Link href={`/de/services/${s.slug}/`} className="rail group py-7">
                <span className="inline-flex"><IconTile icon={ICONS[ICON_FOR[s.slug] ?? 'ClipboardCheck']} /></span>
                <div className="min-w-0">
                  <h2 className="max-w-2xl text-xl font-semibold tracking-tight group-hover:text-[var(--link)]">
                    {s.heroTitle}
                  </h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-[var(--text-muted)]">
                    {s.metaDescription}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--link)]">
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
