import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { BrandWord } from './BrandWord';
import { MediaYouTube } from './MediaYouTube';
import { PersonalAbout } from './PersonalAbout';
import { RealEstate } from './RealEstate';
import { fmtLong, postHref, ROLES, SOCIALS, type PostCard } from './data';

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

/** Ventures → EF Real Estate → YouTube → Writing → About → Follow along. */
export function PersonalHome({ posts }: { posts: PostCard[] }) {
  return (
    <>
      <section id="ventures" className="band alt">
        <div className="wrap">
          <BrandWord word="BUILD" img="palms" />
          <p className="eyebrow">Ventures</p>
          <h2>Three businesses. One standard.</h2>
          <p className="section-lead">Each business has its own website and channels. This is where they come together.</p>
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

      <section id="writing" className="band">
        <div className="wrap">
          <BrandWord word="LEARN" img="beams" />
          <p className="eyebrow">Writing</p>
          <h2>What I learn while building.</h2>
          {/* The articles exist in German only; say so before the click, not after. */}
          <p className="section-lead">Notes on automation, finance and tax. The articles are in German.</p>
          <div className="w-grid">
            {posts.map((p) => (
              <a key={p.slug} href={postHref(p.slug)} className="w-card" hrefLang="de">
                <time dateTime={p.date.toISOString()}>{fmtLong.format(p.date)}</time>
                <h3 lang="de">{p.title}</h3>
                <p lang="de">{p.description}</p>
              </a>
            ))}
          </div>
          <Link href="/de/blog/" className="text-link" hrefLang="de">
            All articles <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>

      <PersonalAbout />

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
