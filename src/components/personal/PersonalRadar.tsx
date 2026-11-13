import { ArrowRight, ArrowUpRight, Bot, House, KeyRound, Receipt } from 'lucide-react';
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
  a: string;
  link: { href: string; label: string; external?: boolean };
};

const TOPICS: Topic[] = [
  {
    Icon: Bot,
    tag: 'AI agents',
    q: 'Are AI agents ready for Swiss SMEs?',
    a: 'Yes, for well-defined work. In 2026 AI agents moved from pilots into daily use: reading documents, drafting answers, preparing bookings. What works is starting with one repetitive process, setting clear limits on what the agent may do, and keeping a human approval for anything that costs money or goes to a client.',
    link: { href: 'https://skopa.ai/?utm_source=eflury.com&utm_medium=referral&utm_campaign=radar', label: 'AI at Skopa', external: true },
  },
  {
    Icon: KeyRound,
    tag: 'Quantum computing',
    q: 'Why should a business think about quantum computing now?',
    a: 'Because of encryption. Future quantum computers are expected to break the public-key encryption most systems use today, and data stolen now can be decrypted later. NIST published the first post-quantum encryption standards in August 2024. The practical first step is an inventory: where does your business rely on encryption?',
    link: { href: 'https://csrc.nist.gov/projects/post-quantum-cryptography', label: 'NIST post-quantum standards', external: true },
  },
  {
    Icon: House,
    tag: 'Real estate · Tax',
    q: 'What does the end of the imputed rental value (Eigenmietwert) mean for homeowners?',
    a: 'Swiss voters approved the abolition on 28 September 2025, and it takes effect on 1 January 2029. Owners will no longer pay tax on a notional rent for the home they live in, but mortgage interest and maintenance on that home will largely stop being deductible. Until the end of 2028 the old rules still apply, which makes the timing of renovations worth a second look.',
    link: { href: '#real-estate', label: 'EF Real Estate' },
  },
  {
    Icon: Receipt,
    tag: 'Expat tax',
    q: 'Do expats taxed at source in Switzerland have to file a tax return?',
    a: 'Above a gross salary of CHF 120,000 a year, yes: a full tax return is mandatory. Below it, you can apply for one by 31 March of the following year, which is often worth it if you pay into a pillar 3a, have childcare costs or commute far. Once you apply, you keep filing every year.',
    link: { href: 'https://taxed.ch/?utm_source=eflury.com&utm_medium=referral&utm_campaign=radar', label: 'Tax advice at Taxed', external: true },
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
          {TOPICS.map(({ Icon, tag, q, a, link }) => (
            <article key={q} className="pv-french rd-card">
              <span className="pv-icon" aria-hidden>
                <Icon size={22} />
              </span>
              <div>
                <p className="pv-kicker">{tag}</p>
                <h3>{q}</h3>
                <p>{a}</p>
                <a
                  className="rd-link"
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                >
                  {link.label}{' '}
                  {link.external ? <ArrowUpRight size={16} aria-hidden /> : <ArrowRight size={16} aria-hidden />}
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="rd-note">General information, not individual tax or investment advice.</p>
      </div>
    </section>
  );
}
