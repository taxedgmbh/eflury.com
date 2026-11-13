import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { BrandWord } from './BrandWord';
import { MediaYouTube } from './MediaYouTube';
import { NEWSLETTER_ON, NewsletterForm } from './NewsletterForm';
import { PersonalAbout } from './PersonalAbout';
import { PersonalPress } from './PersonalPress';
import { PersonalPrivate } from './PersonalPrivate';
import { PersonalRadar } from './PersonalRadar';
import { PersonalVoices } from './PersonalVoices';
import { RealEstate } from './RealEstate';
import { REGISTRY, roles } from './data';
import { YT_HANDLE_URL } from '@/lib/youtube';
import { PAGES, pick, type Lang } from '@/lib/i18n';

type Venture = {
  tag: string;
  name: string;
  text: string;
  href: string;
  /** The card's call to action. */
  cta: string;
  logo: { src: string; w: number; h: number };
  registry?: { year: number; canton: string; uid: string; zefix: string };
};

const CANTON: Record<Lang, Record<string, string>> = {
  en: { Bern: 'Bern', Solothurn: 'Solothurn' },
  de: { Bern: 'Bern', Solothurn: 'Solothurn' },
  fr: { Bern: 'Berne', Solothurn: 'Soleure' },
};

function ventures(lang: Lang): Venture[] {
  const t = (en: string, de: string) => pick(lang, en, de);
  const r = roles(lang);
  return [
    {
      tag: t('Technology', 'Technologie'),
      name: 'Skopa AG',
      text: t(
        `Artificial intelligence and quantum computing. Role: ${r.skopa}.`,
        `Künstliche Intelligenz und Quantencomputing. Rolle: ${r.skopa}.`,
      ),
      href: 'https://skopa.ai/?utm_source=eflury.com&utm_medium=referral&utm_campaign=ventures',
      cta: t('Discover Skopa', 'Skopa entdecken'),
      logo: { src: '/images/brands/skopa-white.svg', w: 96, h: 32 },
      registry: REGISTRY.skopa,
    },
    {
      tag: t('Tax', 'Steuern'),
      name: 'Taxed GmbH',
      text: t(
        `Tax advice for expats living in Switzerland, with an office in Biel/Bienne. Role: ${r.taxed}.`,
        `Steuerberatung für Expats in der Schweiz, mit Büro in Biel/Bienne. Rolle: ${r.taxed}.`,
      ),
      href: 'https://taxed.ch/?utm_source=eflury.com&utm_medium=referral&utm_campaign=ventures',
      cta: t('Get tax advice', 'Steuerberatung anfragen'),
      logo: { src: '/images/brands/taxed-icon.webp', w: 36, h: 36 },
      registry: REGISTRY.taxed,
    },
    {
      tag: 'Private Equity',
      name: 'EF Real Estate',
      text: t(
        `Residential property held as private equity. Role: ${r.estate}.`,
        `Wohnimmobilien als Private Equity. Rolle: ${r.estate}.`,
      ),
      href: '#real-estate',
      cta: t('See the properties', 'Zu den Liegenschaften'),
      logo: { src: '/images/brands/ef-real-estate-mark.svg', w: 35, h: 36 },
    },
  ];
}

/** Ventures → EF Real Estate → On my radar → YouTube → About → Private → Recommendations → Press kit → Follow. */
export function PersonalHome({ lang = 'en' }: { lang?: Lang }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  return (
    <>
      <section id="ventures" className="band alt">
        <div className="wrap">
          <BrandWord word="BUILD" img="palms" />
          <p className="eyebrow">{t('Ventures', 'Unternehmen')}</p>
          <h2>{t('Three businesses. One standard.', 'Drei Unternehmen. Ein Anspruch.')}</h2>
          <p className="section-lead">
            {t(
              'Skopa and Taxed each have their own website. This is where all three come together.',
              'Skopa und Taxed haben je eine eigene Website. Hier kommen alle drei zusammen.',
            )}
          </p>
          <div className="v-grid">
            {ventures(lang).map((v) => {
              const external = !v.href.startsWith('#');
              return (
                <article key={v.name} className="v-card">
                  {/* eslint-disable-next-line @next/next/no-img-element -- small brand mark */}
                  <img src={v.logo.src} alt="" width={v.logo.w} height={v.logo.h} className="v-logo" />
                  <span className="v-tag">{v.tag}</span>
                  <h3>{v.name}</h3>
                  <p>{v.text}</p>
                  <div className="v-foot">
                    {v.registry ? (
                      <p className="v-reg">
                        {t('Founded', 'Gegründet')} {v.registry.year} · {t('Canton of', 'Kanton')}{' '}
                        {CANTON[lang][v.registry.canton]} ·{' '}
                        <a href={v.registry.zefix} target="_blank" rel="noopener">
                          {t('Commercial register', 'Handelsregister')} <ArrowUpRight size={13} aria-hidden />
                        </a>
                      </p>
                    ) : (
                      <p className="v-reg">{t('Privately held · not a company', 'Privat gehalten · keine Firma')}</p>
                    )}
                    <a
                      href={v.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener' : undefined}
                      className="pf-btn pf-btn-line v-btn"
                    >
                      {v.cta} <ArrowUpRight size={18} aria-hidden />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="v-cta">
            <p>
              {t(
                'Working on something in technology, tax or property? Let’s talk about it.',
                'Sie haben ein Vorhaben in Technologie, Steuern oder Immobilien? Sprechen wir darüber.',
              )}
            </p>
            <a href="#contact" className="pf-btn pf-btn-fill">
              {t('Get in touch', 'Kontakt aufnehmen')} <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <RealEstate lang={lang} />

      <PersonalRadar lang={lang} />

      <MediaYouTube lang={lang} />

      <PersonalAbout lang={lang} />

      <PersonalPrivate lang={lang} />

      <PersonalVoices lang={lang} />

      <PersonalPress lang={lang} />

      <section id="follow" className="band alt" aria-labelledby="follow-title">
        <div className="wrap">
          <BrandWord word="DREAM" img="sky" />
          <p className="eyebrow">{t('Follow along', 'Auf dem Laufenden')}</p>
          <h2 id="follow-title">{t('Follow the journey.', 'Begleiten Sie mich auf dem Weg.')}</h2>
          <p className="section-lead">
            {t(
              'What I learn while building — tech, tax and real estate.',
              'Was ich beim Aufbauen lerne – Technologie, Steuern und Immobilien.',
            )}
          </p>
          <div className="follow-split">
            <div>
              <h3>{NEWSLETTER_ON ? t('Notes by email', 'Notizen per E-Mail') : t('Notes', 'Notizen')}</h3>
              <NewsletterForm id="nl-home" lang={lang} />
              <Link href={PAGES.notes[lang]} className="text-link">
                {t('Read the notes', 'Zu den Notizen')} <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
            <div>
              <h3>{t('Videos on YouTube', 'Videos auf YouTube')}</h3>
              <div className="cta-row">
                <a href={`${YT_HANDLE_URL}?sub_confirmation=1`} target="_blank" rel="noopener" className="pf-btn pf-btn-fill">
                  {t('Subscribe', 'Abonnieren')}
                </a>
                <a href={YT_HANDLE_URL} target="_blank" rel="noopener" className="pf-btn pf-btn-line">
                  {t('Open channel', 'Zum Kanal')} <ArrowUpRight size={16} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
