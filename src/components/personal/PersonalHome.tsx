import { ArrowUpRight } from 'lucide-react';
import { BrandWord } from './BrandWord';
import { MediaYouTube } from './MediaYouTube';
import { PersonalAbout } from './PersonalAbout';
import { PersonalPress } from './PersonalPress';
import { RealEstate } from './RealEstate';
import { ROLES, SOCIALS } from './data';

const VENTURES = [
  {
    tag: 'Technology',
    name: 'Skopa AG',
    text: `Artificial intelligence and automation for businesses. Role: ${ROLES.skopa}.`,
    href: 'https://skopa.ai',
    link: 'skopa.ai',
  },
  {
    tag: 'Tax',
    name: 'Taxed GmbH',
    text: `Tax advice for expats living in Switzerland, with an office in Biel/Bienne. Role: ${ROLES.taxed}.`,
    href: 'https://taxed.ch',
    link: 'taxed.ch',
  },
  {
    tag: 'Private equity',
    name: 'EF Real Estate',
    text: `Residential property held as private equity. Role: ${ROLES.estate}.`,
    href: '#real-estate',
    link: 'The three properties',
  },
];

/** Ventures → EF Real Estate → YouTube → About → Press kit → Follow along. */
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
                  <span className="v-tag">{v.tag}</span>
                  <h3>{v.name}</h3>
                  <p>{v.text}</p>
                  <a
                    href={v.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener' : undefined}
                    className="v-link"
                  >
                    {v.link} <ArrowUpRight size={16} aria-hidden />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <RealEstate />

      <MediaYouTube />

      <PersonalAbout />

      <PersonalPress />

      <section className="band alt" aria-labelledby="follow-title">
        <div className="wrap narrow center">
          <BrandWord word="DREAM" img="sky" align="center" />
          <h2 id="follow-title" className="h-small">
            Follow along
          </h2>
          <ul className="s-row">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener me">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
