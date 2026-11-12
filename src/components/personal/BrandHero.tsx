import { ArrowRight } from 'lucide-react';
import { HeroNetwork } from './HeroNetwork';

// Same photo-in-letters look as the social media word rows; scenery only, no faces.
const FILLS = ['palms', 'sky', 'arches', 'city'];

/** The brand rules from the social banners: a line ending in a dot, twice, staggered. */
function Rule({ className, flip = false }: { className: string; flip?: boolean }) {
  return (
    <svg className={`bh-rule ${className}`} viewBox="0 0 520 60" aria-hidden>
      {flip ? (
        <>
          <line className="bh-line" x1="520" y1="16" x2="20" y2="16" />
          <circle className="bh-dot" cx="20" cy="16" r="7" />
          <line className="bh-line bh-line-2" x1="520" y1="50" x2="220" y2="50" />
          <circle className="bh-dot bh-dot-2" cx="220" cy="50" r="7" />
        </>
      ) : (
        <>
          <line className="bh-line" x1="0" y1="10" x2="500" y2="10" />
          <circle className="bh-dot" cx="500" cy="10" r="7" />
          <line className="bh-line bh-line-2" x1="0" y1="44" x2="300" y2="44" />
          <circle className="bh-dot bh-dot-2" cx="300" cy="44" r="7" />
        </>
      )}
    </svg>
  );
}

export function BrandHero() {
  return (
    <section className="bh" aria-labelledby="bh-title">
      <HeroNetwork />
      <div className="bh-vignette" aria-hidden />
      <Rule className="bh-rule-tl" />
      <Rule className="bh-rule-br" flip />
      <div className="bh-content">
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark, nothing to optimise */}
        <img className="bh-mark" src="/images/ef-mark-white.svg" alt="" width={250} height={200} />
        {/*
          One heading with the name once; the three other photo fills that
          cross-fade over it are decoration, so search engines and screen
          readers read "Emanuel Flury" once instead of four times.
        */}
        <div className="bh-word">
          <h1 id="bh-title" className="bh-fill bh-fill-0" style={{ backgroundImage: `url(/images/hero/${FILLS[0]}.webp)` }}>
            EMANUEL
            <br />
            FLURY
          </h1>
          {FILLS.slice(1).map((f, i) => (
            <span
              key={f}
              className={`bh-fill bh-fill-${i + 1}`}
              style={{ backgroundImage: `url(/images/hero/${f}.webp)` }}
              aria-hidden
            >
              EMANUEL
              <br />
              FLURY
            </span>
          ))}
        </div>
        <p className="bh-sub">ENTREPRENEUR</p>
        <p className="bh-lead">I build companies where finance, tax and technology meet.</p>
        <div className="bh-cta">
          <a href="#ventures" className="bh-btn bh-btn-fill">
            What I build <ArrowRight size={18} aria-hidden />
          </a>
          <a href="#contact" className="bh-btn bh-btn-line">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
