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
import { REGISTRY, ROLES } from './data';
import { YT_HANDLE_URL } from '@/lib/youtube';

const VENTURES: {
  tag: string;
  name: string;
  text: string;
  href: string;
  /** The card's call to action. */
  cta: string;
  logo: { src: string; w: number; h: number };
  registry?: { year: number; canton: string; uid: string; zefix: string };
}[] = [
  {
    tag: 'Technology',
    name: 'Skopa AG',
    text: `Artificial intelligence and quantum computing. Role: ${ROLES.skopa}.`,
    href: 'https://skopa.ai/?utm_source=eflury.com&utm_medium=referral&utm_campaign=ventures',
    cta: 'Discover Skopa',
    logo: { src: '/images/brands/skopa-white.svg', w: 96, h: 32 },
    registry: REGISTRY.skopa,
  },
  {
    tag: 'Tax',
    name: 'Taxed GmbH',
    text: `Tax advice for expats living in Switzerland, with an office in Biel/Bienne. Role: ${ROLES.taxed}.`,
    href: 'https://taxed.ch/?utm_source=eflury.com&utm_medium=referral&utm_campaign=ventures',
    cta: 'Get tax advice',
    logo: { src: '/images/brands/taxed-icon.webp', w: 36, h: 36 },
    registry: REGISTRY.taxed,
  },
  {
    tag: 'Private equity',
    name: 'EF Real Estate',
    text: `Residential property held as private equity. Role: ${ROLES.estate}.`,
    href: '#real-estate',
    cta: 'See the properties',
    logo: { src: '/images/brands/ef-real-estate-mark.svg', w: 35, h: 36 },
  },
];

/** Ventures → EF Real Estate → YouTube → About → Private → Recommendations → Press kit → YouTube call to action. */
export function PersonalHome() {
  return (
    <>
      <section id="ventures" className="band alt">
        <div className="wrap">
          <BrandWord word="BUILD" img="palms" />
          <p className="eyebrow">Ventures</p>
          <h2>Three businesses. One standard.</h2>
          <p className="section-lead">Skopa and Taxed each have their own website. This is where all three come together.</p>
          <div className="v-grid">
            {VENTURES.map((v) => {
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
                        Founded {v.registry.year} · Canton of {v.registry.canton} ·{' '}
                        <a href={v.registry.zefix} target="_blank" rel="noopener">
                          Commercial register <ArrowUpRight size={13} aria-hidden />
                        </a>
                      </p>
                    ) : (
                      <p className="v-reg">Privately held · not a company</p>
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
            <p>Working on something in technology, tax or property? Let&rsquo;s talk about it.</p>
            <a href="#contact" className="pf-btn pf-btn-fill">
              Get in touch <ArrowRight size={18} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <RealEstate />

      <PersonalRadar />

      <MediaYouTube />

      <PersonalAbout />

      <PersonalPrivate />

      <PersonalVoices />

      <PersonalPress />

      <section id="follow" className="band alt" aria-labelledby="follow-title">
        <div className="wrap">
          <BrandWord word="DREAM" img="sky" />
          <p className="eyebrow">Follow along</p>
          <h2 id="follow-title">Follow the journey.</h2>
          <p className="section-lead">What I learn while building — tech, tax and real estate.</p>
          <div className="follow-split">
            <div>
              <h3>{NEWSLETTER_ON ? 'Notes by email' : 'Notes'}</h3>
              <NewsletterForm id="nl-home" />
              <Link href="/en/notes/" className="text-link">
                Read the notes <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
            <div>
              <h3>Videos on YouTube</h3>
              <div className="cta-row">
                <a href={`${YT_HANDLE_URL}?sub_confirmation=1`} target="_blank" rel="noopener" className="pf-btn pf-btn-fill">
                  Subscribe
                </a>
                <a href={YT_HANDLE_URL} target="_blank" rel="noopener" className="pf-btn pf-btn-line">
                  Open channel <ArrowUpRight size={16} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
