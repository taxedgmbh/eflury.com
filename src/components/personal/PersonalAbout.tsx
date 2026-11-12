import { PhotoGallery, type Photo } from './PhotoGallery';
import { GraduationCap, Rocket, Workflow } from 'lucide-react';
import { BrandWord } from './BrandWord';
import { ROLES } from './data';

// Content rules: verified facts only; past kept light; no employer names.
const CHAPTERS = [
  {
    Icon: GraduationCap,
    kicker: 'Foundation',
    title: 'Finance',
    text: 'MA in Finance-Economics from the University of Aberdeen, with an exchange year at the University of Wisconsin–La Crosse. Plus a certificate as a tax specialist.',
  },
  {
    Icon: Workflow,
    kicker: 'Experience',
    title: 'Automation',
    text: 'Years spent automating finance processes in large organisations. That is where I learned to think in systems, not hours.',
  },
  {
    Icon: Rocket,
    kicker: 'Today',
    title: 'Entrepreneur',
    text: `Founded Taxed GmbH in 2021 and Skopa AG in 2026. Today ${ROLES.skopa} of Skopa AG, ${ROLES.taxed} of Taxed GmbH and ${ROLES.estate.toLowerCase()} of EF Real Estate.`,
  },
];

// From brand/02-photos (about-and-hero, founder-journey): no strangers' faces,
// no readable plates. Re-encoded, so EXIF/GPS is stripped.
const ME = '/images/me/';
const ON_THE_ROAD: Photo[] = [
  { base: `${ME}city-night`, alt: 'Emanuel Flury on a terrace at night, city behind', width: 1536, height: 2048 },
  { base: `${ME}city-railing`, alt: 'Emanuel Flury leaning on a railing above the city', width: 1536, height: 2048 },
  { base: `${ME}restaurant-thinking`, alt: 'Emanuel Flury at a restaurant table, thinking', width: 1536, height: 2048 },
  { base: `${ME}airport-hall`, alt: 'Emanuel Flury smiling in an airport hall', width: 1600, height: 2133 },
  { base: `${ME}terminal`, alt: 'Emanuel Flury in an airport terminal', width: 1600, height: 2133 },
  { base: `${ME}crossing`, alt: 'Emanuel Flury from behind at a street crossing, towers ahead', width: 1600, height: 2133 },
];

export function PersonalAbout() {
  return (
    <section id="about" className="ab">
      <div className="ab-wrap">
        <div className="ab-photo">
          <div className="ab-photo-card">
            <svg className="ab-rule" viewBox="0 0 320 60" aria-hidden>
              <line x1="0" y1="12" x2="300" y2="12" />
              <circle cx="300" cy="12" r="7" />
              <line x1="0" y1="44" x2="180" y2="44" />
              <circle cx="180" cy="44" r="7" />
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP; next/image is unoptimised on App Hosting */}
            <img
              src="/images/portraits/emanuel-aaron-flury-portrait.webp"
              alt="Emanuel Flury"
              width={714}
              height={1616}
              loading="lazy"
            />
            <div className="ab-badge">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
              <img src="/images/ef-mark-white.svg" alt="" width={40} height={32} />
              <span>
                <strong>Emanuel Flury</strong>
                <span>Grenchen</span>
              </span>
            </div>
          </div>
          <p className="ab-quote">Life · Lessons · Building companies</p>
        </div>

        <div className="ab-text">
          <BrandWord word="LEAD" img="arches" />
          <p className="ab-eyebrow">About</p>
          <h2>Trained in finance. Shaped by automation. Now building.</h2>
          <p className="ab-lead">
            I bring together three things that rarely meet: a degree in finance, years of automating finance
            processes in large organisations, and the step into building my own companies.
          </p>

          <ol className="ab-chapters">
            {CHAPTERS.map(({ Icon, ...c }, i) => (
              <li key={c.title}>
                <span className="ab-icon">
                  <Icon size={22} aria-hidden />
                </span>
                <div>
                  <p className="ab-kicker">
                    0{i + 1} · {c.kicker}
                  </p>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="ab-kicker ab-photos-title">On the road</p>
          <PhotoGallery photos={ON_THE_ROAD} label="On the road" layout="strip" />
        </div>
      </div>
    </section>
  );
}
