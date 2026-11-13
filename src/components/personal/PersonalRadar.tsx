import Link from 'next/link';
import { ArrowRight, Bot, House, KeyRound, Receipt } from 'lucide-react';
import { BrandWord } from './BrandWord';
import { jsonLd } from '@/lib/schema';
import { PAGES, pick, type Lang } from '@/lib/i18n';

/*
 * "On my radar": current questions in tech, tax and real estate, answered in
 * plain language. Real questions people search for, visible on the page and
 * repeated 1:1 in FAQPage JSON-LD (never hidden text, never keyword lists).
 * Each card links to the full answer in Notes (content/notes, content/notes/de).
 *
 * Facts checked 2026-11-13; review every few months and bump UPDATED:
 * - Imputed rental value: abolition approved 28 Sep 2025 (57.7 % yes); the
 *   Federal Council set entry into force for 1 Jan 2029 (decision 1 Apr 2026).
 * - Post-quantum: NIST FIPS 203/204/205 published Aug 2024.
 * - Withholding tax: since 2021, residents taxed at source with a gross salary
 *   above CHF 120,000 must file; others may apply by 31 March of the next year.
 */
const UPDATED = { en: 'November 2026', de: 'November 2026' };

type Topic = {
  Icon: typeof Bot;
  tag: string;
  q: string;
  /** Short answer, shown here and in the FAQPage data. */
  a: string;
  /** Slug of the full answer in Notes, per language. */
  note: string;
};

function topics(lang: Lang): Topic[] {
  const t = (en: string, de: string) => pick(lang, en, de);
  return [
    {
      Icon: Bot,
      tag: t('AI agents', 'KI-Agenten'),
      q: t('Are AI agents ready for Swiss SMEs?', 'Sind KI-Agenten bereit für Schweizer KMU?'),
      a: t(
        'Yes, for well-defined work: start with one repetitive process, set clear limits and keep a human approval for anything that costs money or goes to a client.',
        'Ja, für klar umrissene Arbeit: mit einem wiederkehrenden Prozess beginnen, klare Grenzen setzen und eine menschliche Freigabe für alles behalten, was Geld kostet oder an Kunden geht.',
      ),
      note: t('ai-agents-swiss-smes', 'ki-agenten-kmu'),
    },
    {
      Icon: KeyRound,
      tag: t('Quantum computing', 'Quantencomputing'),
      q: t(
        'Why should a business think about quantum computing now?',
        'Warum sollte sich ein Unternehmen schon jetzt mit Quantencomputing befassen?',
      ),
      a: t(
        'Because of encryption: data copied today can be decrypted later. NIST published the first post-quantum standards in August 2024, and the first step is an inventory.',
        'Wegen der Verschlüsselung: Heute kopierte Daten lassen sich später entschlüsseln. Das NIST hat im August 2024 die ersten Post-Quanten-Standards veröffentlicht, und der erste Schritt ist eine Bestandesaufnahme.',
      ),
      note: t('quantum-computing-encryption', 'quantencomputing-verschluesselung'),
    },
    {
      Icon: House,
      tag: t('Real estate · Tax', 'Immobilien · Steuern'),
      q: t(
        'What does the end of the Eigenmietwert mean for homeowners?',
        'Was bedeutet die Abschaffung des Eigenmietwerts für Wohneigentümer?',
      ),
      a: t(
        'From 1 January 2029 the imputed rental value goes, and with it most deductions for your own home. Until the end of 2028 the old rules still apply.',
        'Ab dem 1. Januar 2029 fällt der Eigenmietwert weg und mit ihm die meisten Abzüge für das selbst bewohnte Eigenheim. Bis Ende 2028 gelten noch die bisherigen Regeln.',
      ),
      note: t('eigenmietwert-abolition', 'abschaffung-eigenmietwert'),
    },
    {
      Icon: Receipt,
      tag: t('Expat tax', 'Steuern für Expats'),
      q: t(
        'Do expats taxed at source have to file a tax return?',
        'Müssen quellenbesteuerte Expats eine Steuererklärung einreichen?',
      ),
      a: t(
        'Above CHF 120,000 gross salary, yes. Below it you can apply by 31 March of the following year, which often pays off with pillar 3a or childcare costs.',
        "Ab einem Bruttolohn von CHF 120'000 ja. Darunter kann man sie bis zum 31. März des Folgejahres beantragen, was sich mit Säule 3a oder Kinderbetreuungskosten oft lohnt.",
      ),
      note: t('expat-withholding-tax-return', 'quellensteuer-steuererklaerung-expats'),
    },
  ];
}

export function PersonalRadar({ lang = 'en' }: { lang?: Lang }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  const items = topics(lang);
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
  return (
    <section id="radar" className="band" aria-labelledby="radar-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faq) }} />
      <div className="wrap">
        <BrandWord word="THINK" img="city" />
        <p className="eyebrow">{t('On my radar', 'Auf meinem Radar')}</p>
        <h2 id="radar-title">
          {t('What matters now in tech, tax and real estate.', 'Was jetzt zählt in Technologie, Steuern und Immobilien.')}
        </h2>
        <p className="section-lead">
          {t(
            `The questions I hear most often from founders, expats and property owners, answered in plain language. Updated ${UPDATED.en}.`,
            `Die Fragen, die ich von Gründerinnen und Gründern, Expats und Wohneigentümern am häufigsten höre, verständlich beantwortet. Stand ${UPDATED.de}.`,
          )}
        </p>
        <div className="pv-cards">
          {items.map(({ Icon, tag, q, a, note }) => (
            <article key={q} className="pv-french rd-card">
              <span className="pv-icon" aria-hidden>
                <Icon size={22} />
              </span>
              <div>
                <p className="pv-kicker">{tag}</p>
                <h3>{q}</h3>
                <p>{a}</p>
                <Link className="rd-link" href={`${PAGES.notes[lang]}${note}/`}>
                  {t('Read the full answer', 'Ganze Antwort lesen')} <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="rd-note">
          {t(
            'General information, not individual tax or investment advice.',
            'Allgemeine Informationen, keine individuelle Steuer- oder Anlageberatung.',
          )}{' '}
          <Link href={PAGES.notes[lang]}>{t('All notes', 'Alle Notizen')}</Link>
        </p>
      </div>
    </section>
  );
}
