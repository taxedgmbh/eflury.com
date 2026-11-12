import { ArrowUpRight } from 'lucide-react';
import { LINKEDIN } from './data';

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
  },
  {
    quote:
      'Long before AI became a buzzword, he was pushing us to automate repetitive processes … As a manager, he is clear, demanding in the best sense, and always approachable.',
    name: 'Patricia Fangon',
    role: 'Worked with Emanuel at Taxed GmbH',
  },
  {
    quote:
      'He understands both the technical tools and the business goal behind them, I’d recommend Emanuel to a business looking to scale up efficiently.',
    name: 'Luis Pacheco',
    role: 'Supply Chain Launch Lead',
  },
] as const;

/** Three voices from people who worked with him, linked to the source. */
export function PersonalVoices() {
  return (
    <section id="voices" className="band alt" aria-labelledby="voices-title">
      <div className="wrap">
        <p className="eyebrow">Recommendations</p>
        <h2 id="voices-title">What people say.</h2>
        <div className="vo-grid">
          {VOICES.map((v) => (
            <figure key={v.name} className="vo-card">
              <blockquote className="vo-quote">
                <p>“{v.quote}”</p>
              </blockquote>
              <figcaption className="vo-by">
                <span className="vo-name">{v.name}</span>
                <span className="vo-role">{v.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <a href={`${LINKEDIN}/details/recommendations/`} target="_blank" rel="noopener" className="text-link vo-more">
          All recommendations on LinkedIn <ArrowUpRight size={16} aria-hidden />
        </a>
      </div>
    </section>
  );
}
