import { BrandWord } from './BrandWord';
import { ArrowUpRight } from 'lucide-react';
import { LINKEDIN } from './data';
import { pick, type Lang } from '@/lib/i18n';

/*
 * Excerpts from the public recommendations on Emanuel's LinkedIn profile,
 * quoted word for word ("…" marks a cut). Attribution by role only: the site
 * names no former employers.
 */
const VOICES = [
  {
    quote:
      'He knew automation in finance inside out, but what I value most is how generous he was with it. … Whoever gets to work with him is in good hands. I know I was.',
    name: 'Andrés García',
    role: 'Lead Analyst, Global Transparency Reporting',
    roleDe: 'Lead Analyst, Global Transparency Reporting',
    roleFr: 'Lead Analyst, Global Transparency Reporting',
  },
  {
    quote:
      'Long before AI became a buzzword, he was pushing us to automate repetitive processes … As a manager, he is clear, demanding in the best sense, and always approachable.',
    name: 'Patricia Fangon',
    role: 'Worked with Emanuel at Taxed GmbH',
    roleDe: 'Hat mit Emanuel bei der Taxed GmbH zusammengearbeitet',
    roleFr: 'A travaillé avec Emanuel chez Taxed GmbH',
  },
  {
    quote:
      'He understands both the technical tools and the business goal behind them, I’d recommend Emanuel to a business looking to scale up efficiently.',
    name: 'Luis Pacheco',
    role: 'Supply Chain Launch Lead',
    roleDe: 'Supply Chain Launch Lead',
    roleFr: 'Supply Chain Launch Lead',
  },
] as const;

/** Three voices from people who worked with him, linked to the source. */
export function PersonalVoices({ lang = 'en' }: { lang?: Lang }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  return (
    <section id="voices" className="band alt" aria-labelledby="voices-title">
      <div className="wrap">
        <BrandWord word="TRUST" img="sunset" />
        <p className="eyebrow">{t('Recommendations', 'Empfehlungen')}</p>
        <h2 id="voices-title">{t('What people say.', 'Was andere sagen.')}</h2>
        {lang !== 'en' && (
          <p className="section-lead">
            {t('Original quotes from LinkedIn recommendations, in English.', 'Originalzitate aus LinkedIn-Empfehlungen, auf Englisch.')}
          </p>
        )}
        <div className="vo-grid">
          {VOICES.map((v) => (
            <figure key={v.name} className="vo-card">
              <blockquote className="vo-quote" lang="en">
                <p>“{v.quote}”</p>
              </blockquote>
              <figcaption className="vo-by">
                <span className="vo-name">{v.name}</span>
                <span className="vo-role">{{ en: v.role, de: v.roleDe, fr: v.roleFr }[lang]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <a href={`${LINKEDIN}/details/recommendations/`} target="_blank" rel="noopener" className="text-link vo-more">
          {t('All recommendations on LinkedIn', 'Alle Empfehlungen auf LinkedIn')} <ArrowUpRight size={16} aria-hidden />
        </a>
      </div>
    </section>
  );
}
