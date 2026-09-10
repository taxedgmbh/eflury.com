import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Landmark, Factory, Briefcase, HeartPulse,
  ShieldCheck, Award, ClipboardCheck, Wrench, Activity,
  ArrowRight, FileText, CheckCircle2,
} from 'lucide-react';
import { VENTURES, PERSON, ADDRESS } from '@/lib/site';
import { SERVICES } from '@/data/services';
import { getAllPosts, formatDate } from '@/lib/content';
import { homeGraph, jsonLd } from '@/lib/schema';
import { Section, SectionHeading, Card, IconTile, Pill, Stat, Button } from '@/components/ui';
import { HeroBrandIllustration } from '@/components/HeroBrandIllustration';
import { TechPartners } from '@/components/TechPartners';
import { TechStack } from '@/components/TechStack';

export const metadata: Metadata = {
  title: `${PERSON.shortName} — Unternehmer`,
  description:
    'Emanuel Flury, Unternehmer in Grenchen. Gründer von Taxed GmbH und SkopaAI. Er baut Firmen, die Routinearbeit an Software abgeben — und begleitet Schweizer KMU dabei.',
  alternates: { canonical: '/de/' },
};

const INDUSTRIES = [
  { icon: Landmark, label: 'Finanzen & Buchhaltung', href: '/de/branchen/finanzteams/' },
  { icon: Factory, label: 'Produktion', href: '/de/branchen/reporting-daten/' },
  { icon: Briefcase, label: 'Dienstleistungen', href: '/de/branchen/dienstleister/' },
  { icon: HeartPulse, label: 'Gesundheitswesen', href: '/de/branchen/' },
];

/**
 * The three-stage lifecycle the live site leads with: advise, build, operate.
 * The middle stage lists the delivery services from the same data the service
 * pages render, so the homepage cannot drift out of step with them.
 */
const LIFECYCLE = [
  {
    step: '1 · Beraten',
    icon: ClipboardCheck,
    title: 'KI-Audit',
    href: '/de/services/ki-audit/',
    body: 'Eine Woche zum Fixpreis, bei Folgeauftrag voll angerechnet: Prozessinventar, priorisierte Roadmap, ROI-Projektion — mit ehrlichem Go/No-Go.',
    links: undefined as { label: string; href: string }[] | undefined,
  },
  {
    step: '2 · Bauen',
    icon: Wrench,
    title: 'Automatisierung nach Mass',
    href: '/de/services/',
    body: 'Massgeschneiderte Systeme auf Claude und MCP — gebaut in Wochen, mit Freigabe-Gates und Abnahmekriterien.',
    links: SERVICES.filter((s) => s.slug !== 'ki-audit' && s.slug !== 'ki-betrieb').map((s) => ({
      label: s.serviceType,
      href: `/de/services/${s.slug}/`,
    })),
  },
  {
    step: '3 · Betreiben',
    icon: Activity,
    title: 'Managed AI Operations',
    href: '/de/services/ki-betrieb/',
    body: 'Betrieb dessen, was gebaut wurde: Monitoring, monatlicher Kennzahlenbericht, Verbesserungs-Backlog.',
    links: undefined as { label: string; href: string }[] | undefined,
  },
];

const PROMISES = [
  {
    title: 'Enterprise-Methoden, KMU-Preise',
    body: '13 Jahre Automatisierungserfahrung aus einem Fortune-500-Konzern — ohne Enterprise-Budget.',
    href: '/de/about/',
    link: 'Werdegang ansehen',
  },
  {
    title: 'Umsetzung statt Folien',
    body: 'Emanuel arbeitet direkt mit Ihrem Team an Automatisierungen, die laufen. Keine Berichte für die Schublade.',
    href: '/de/case-studies/',
    link: 'Projekte ansehen',
  },
  {
    title: 'Fixpreis, keine Überraschungen',
    body: 'Der Preis steht schriftlich fest, bevor die Arbeit beginnt. Keine Tagessätze, kein offenes Ende.',
    href: '/de/pricing/',
    link: 'Preise ansehen',
  },
  {
    title: 'Ein No-Go ist ein Resultat',
    body: 'Lohnt sich Automatisierung in Ihrem Fall nicht, steht das im Bericht — bevor Sie für einen Build bezahlt haben.',
    href: '/de/methode/',
    link: 'Methode ansehen',
  },
];

const PLAYBOOK = [
  'Die eFlury-Methode Schritt für Schritt erklärt',
  'Echte ROI-Berechnungen und Beispiele',
  'Tool-Empfehlungen für Schweizer Compliance',
  'Häufige Fallstricke und wie Sie diese vermeiden',
];

export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeGraph()) }}
      />

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_-10%,color-mix(in_srgb,var(--accent)_16%,transparent),transparent_62%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Pill icon={Award}>Enterprise-Methoden, KMU-Preise</Pill>
            <h1 className="mt-6 text-[2.4rem] leading-[1.06] font-bold tracking-[-0.035em] sm:text-[3.35rem]">
              KI-Automatisierung für Schweizer KMU. Strategisch geplant. Praktisch umgesetzt.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">
              Emanuel Flury bringt die Automatisierungsstrategien von Fortune-500-Unternehmen
              zu Ihrem KMU — ohne Enterprise-Budget. Vom KI-Audit mit ehrlichem Go/No-Go bis
              zum betreuten Betrieb: Fixpreise, dokumentierte Projekte, messbare Stunden.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/de/kontakt/">Kostenloses Strategiegespräch</Button>
              <Button href="/de/methode/" variant="ghost">Methode entdecken</Button>
            </div>
            <p className="mt-4 text-sm text-[var(--text-faint)]">
              Unverbindlich, 30 Minuten, vertraulich
            </p>
          </div>

          {/* Emanuel's own hero artwork, not a stock illustration. */}
          <div className="lg:pl-4">
            <HeroBrandIllustration />
          </div>
        </div>
      </section>

      <Section tone="sunken" labelledBy="vertrauen">
        <SectionHeading
          id="vertrauen"
          title="Vertraut von Schweizer KMU"
          subtitle="Unterstützung von Unternehmen verschiedener Branchen bei der Automatisierung"
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {INDUSTRIES.map((i) => (
            <li key={i.label}>
              <Link href={i.href} className="block h-full">
                <Card className="h-full text-center transition-colors hover:border-[var(--rule-strong)]">
                  <span className="inline-flex justify-center"><IconTile icon={i.icon} /></span>
                  <p className="mt-4 font-medium">{i.label}</p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-[var(--rule)] pt-12 sm:grid-cols-3">
          <Stat value="13+" label="Jahre Enterprise-Erfahrung" />
          <Stat value="10+" label="Projekte umgesetzt" />
          <Stat value="100%" label="In der Schweiz" />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Pill icon={ShieldCheck}>Schweizer Datenschutz</Pill>
          <Pill icon={Award}>Fortune 500 Erfahrung</Pill>
        </div>

        <div className="mt-14 border-t border-[var(--rule)] pt-12">
          <TechPartners />
        </div>
      </Section>

      <Section labelledBy="leistungen">
        <SectionHeading
          id="leistungen"
          title="Was Emanuel tut"
          subtitle="Drei Stufen, ein Lebenszyklus: beraten, bevor gebaut wird — und betreiben, was gebaut wurde. Fixpreise auf jeder Stufe, damit Sie die Kosten vor dem Start kennen."
        />
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {LIFECYCLE.map((stage) => (
            <li key={stage.title}>
              <Card className="flex h-full flex-col">
                <p className="text-xs font-semibold tracking-[0.08em] text-[var(--accent-text)] uppercase">
                  {stage.step}
                </p>
                <span className="mt-5 inline-flex"><IconTile icon={stage.icon} /></span>
                <h3 className="mt-5 text-xl font-bold tracking-tight">{stage.title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{stage.body}</p>
                {stage.links ? (
                  <ul className="mt-5 space-y-2.5 border-t border-[var(--rule)] pt-5">
                    {stage.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="font-medium text-[var(--link)] hover:underline">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-auto pt-6">
                  <Link href={stage.href} className="inline-flex items-center gap-1.5 font-semibold text-[var(--link)] hover:underline">
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </Link>
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sunken" labelledBy="technologien">
        <div id="technologien">
          <TechStack />
        </div>
      </Section>

      <Section labelledBy="unternehmen">
        <SectionHeading
          id="unternehmen"
          title="Drei Unternehmen, ein Prinzip"
          subtitle="Emanuel Flury führt drei Firmen. Was in der eigenen Treuhandfirma funktioniert, geht an andere Schweizer KMU weiter."
        />
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {VENTURES.map((v) => (
            <li key={v.id}>
              <Card className="flex h-full flex-col">
                <p className="text-xs font-semibold tracking-[0.08em] text-[var(--accent-text)] uppercase">
                  {v.role} · {v.place}
                </p>
                <h3 className="mt-4 text-xl font-bold tracking-tight">{v.name}</h3>
                <p className="mt-3 leading-relaxed text-[var(--text-muted)]">{v.what}</p>
                <p className="mt-auto pt-6">
                  {v.external ? (
                    <a href={v.url} rel="me noopener" className="inline-flex items-center gap-1.5 font-semibold text-[var(--link)] hover:underline">
                      {v.url.replace('https://', '')}
                      <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </a>
                  ) : (
                    <Link href="/de/services/" className="inline-flex items-center gap-1.5 font-semibold text-[var(--link)] hover:underline">
                      Leistungen ansehen
                      <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </Link>
                  )}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sunken" labelledBy="zusagen">
        <SectionHeading
          id="zusagen"
          title="Warum Schweizer KMU ihn wählen"
          subtitle="Keine bestellten Kundenzitate — stattdessen vier Zusagen, die Sie auf dieser Website überprüfen können."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {PROMISES.map((p) => (
            <li key={p.title}>
              <Card className="flex h-full flex-col">
                <span className="inline-flex"><IconTile icon={CheckCircle2} /></span>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2.5 leading-relaxed text-[var(--text-muted)]">{p.body}</p>
                <p className="mt-auto pt-5">
                  <Link href={p.href} className="inline-flex items-center gap-1.5 font-semibold text-[var(--link)] hover:underline">
                    {p.link}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </Link>
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="leitfaden">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Pill icon={FileText}>Kostenloser Download</Pill>
            <h2 id="leitfaden" className="mt-6 text-[1.9rem] leading-tight font-bold tracking-[-0.025em] sm:text-[2.4rem]">
              Das KI-Implementierungs-Playbook für Schweizer KMU
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
              Das Fünf-Phasen-Framework, mit dem Emanuel Schweizer Unternehmen durch eine
              KI-Einführung begleitet — ohne Enterprise-Budget.
            </p>
            <p className="mt-7"><Button href="/de/leitfaeden/">Leitfäden ansehen</Button></p>
          </div>
          <Card>
            <ul className="space-y-4">
              {PLAYBOOK.map((b) => (
                <li key={b} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-text)]" strokeWidth={1.75} aria-hidden />
                  <span className="leading-relaxed text-[var(--text-muted)]">{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section tone="sunken" labelledBy="blog">
        <SectionHeading id="blog" title="Aus der Praxis" subtitle="Was in Projekten gelernt wurde, aufgeschrieben." />
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/de/blog/${p.slug}/`} className="block h-full">
                <Card className="flex h-full flex-col transition-colors hover:border-[var(--rule-strong)]">
                  <p className="text-xs tracking-[0.06em] text-[var(--text-faint)] uppercase">
                    <time dateTime={p.pubDate.toISOString()}>{formatDate(p.pubDate)}</time>
                  </p>
                  <h3 className="mt-3 text-lg leading-snug font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-[var(--text-muted)]">{p.description}</p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <Button href="/de/blog/" variant="ghost">Alle Beiträge</Button>
        </p>
      </Section>

      <Section labelledBy="kontakt">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            id="kontakt"
            title="Reden wir über einen Prozess"
            subtitle="Beschreiben Sie einen Ablauf, der jede Woche Stunden kostet, und wie oft er anfällt. Das reicht für eine erste Einschätzung."
          />
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/de/kontakt/">Kostenloses Strategiegespräch</Button>
            <Button href={`mailto:${PERSON.email}`} variant="ghost" external>{PERSON.email}</Button>
          </div>
          <p className="mt-5 text-sm text-[var(--text-faint)]">
            {ADDRESS.postalCode} {ADDRESS.addressLocality} · Antwort innert 24 Stunden
          </p>
        </div>
      </Section>
    </>
  );
}
