import Link from 'next/link';
import { ArrowRight, Bot, House, KeyRound, Receipt } from 'lucide-react';
import { BrandWord } from './BrandWord';
import { jsonLd } from '@/lib/schema';

/*
 * "On my radar": current questions in tech, tax and real estate, answered in
 * plain language. Real questions people search for, visible on the page and
 * repeated 1:1 in FAQPage JSON-LD (never hidden text, never keyword lists).
 *
 * Facts checked 2026-11-13; review every few months and bump UPDATED:
 * - Imputed rental value: abolition approved 28 Sep 2025 (57.7 % yes); the
 *   Federal Council set entry into force for 1 Jan 2029 (decision 1 Apr 2026).
 * - Post-quantum: NIST FIPS 203/204/205 published Aug 2024.
 * - Withholding tax: since 2021, residents taxed at source with a gross salary
 *   above CHF 120,000 must file; others may apply by 31 March of the next year.
 */
const UPDATED = 'November 2026';

type Topic = {
  Icon: typeof Bot;
  tag: string;
  q: string;
  /** Short answer, shown here and in the FAQPage data. */
  a: string;
  /** Slug of the full answer in content/notes/. */
  note: string;
};

const TOPICS: Topic[] = [
  {
    Icon: Bot,
    tag: 'AI agents',
    q: 'Are AI agents ready for Swiss SMEs?',
    a: 'Yes, for well-defined work: start with one repetitive process, set clear limits and keep a human approval for anything that costs money or goes to a client.',
    note: 'ai-agents-swiss-smes',
  },
  {
    Icon: KeyRound,
    tag: 'Quantum computing',
    q: 'Why should a business think about quantum computing now?',
    a: 'Because of encryption: data copied today can be decrypted later. NIST published the first post-quantum standards in August 2024, and the first step is an inventory.',
    note: 'quantum-computing-encryption',
  },
  {
    Icon: House,
    tag: 'Real estate · Tax',
    q: 'What does the end of the Eigenmietwert mean for homeowners?',
    a: 'From 1 January 2029 the imputed rental value goes, and with it most deductions for your own home. Until the end of 2028 the old rules still apply.',
    note: 'eigenmietwert-abolition',
  },
  {
    Icon: Receipt,
    tag: 'Expat tax',
    q: 'Do expats taxed at source have to file a tax return?',
    a: 'Above CHF 120,000 gross salary, yes. Below it you can apply by 31 March of the following year, which often pays off with pillar 3a or childcare costs.',
    note: 'expat-withholding-tax-return',
  },
];

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: TOPICS.map((t) => ({
    '@type': 'Question',
    name: t.q,
    acceptedAnswer: { '@type': 'Answer', text: t.a },
  })),
};

export function PersonalRadar() {
  return (
    <section id="radar" className="band" aria-labelledby="radar-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faq) }} />
      <div className="wrap">
        <BrandWord word="THINK" img="city" />
        <p className="eyebrow">On my radar</p>
        <h2 id="radar-title">What matters now in tech, tax and real estate.</h2>
        <p className="section-lead">
          The questions I hear most often from founders, expats and property owners, answered in plain language.
          Updated {UPDATED}.
        </p>
        <div className="pv-cards">
          {TOPICS.map(({ Icon, tag, q, a, note }) => (
            <article key={q} className="pv-french rd-card">
              <span className="pv-icon" aria-hidden>
                <Icon size={22} />
              </span>
              <div>
                <p className="pv-kicker">{tag}</p>
                <h3>{q}</h3>
                <p>{a}</p>
                <Link className="rd-link" href={`/en/notes/${note}/`}>
                  Read the full answer <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="rd-note">
          General information, not individual tax or investment advice. <Link href="/en/notes/">All notes</Link>
        </p>
      </div>
    </section>
  );
}
