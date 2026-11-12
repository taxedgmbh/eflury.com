import { Building2, Home, KeyRound } from 'lucide-react';
import { BrandWord } from './BrandWord';

// Owner rule: type + region only. Never addresses, tenants, values or financing.
// Photos: add one per card once the owner supplies them (house numbers and
// street signs cropped or blurred).
const CARDS = [
  { Icon: Home, type: 'Own home', region: 'Lebern district · Canton of Solothurn', text: 'Where I live.' },
  { Icon: KeyRound, type: 'Rental house', region: 'Wasseramt district · Canton of Solothurn', text: 'A house I rent out.' },
  { Icon: Building2, type: 'Apartment', region: 'Seeland · Canton of Bern', text: 'An apartment I rent out.' },
];

export function RealEstate() {
  return (
    <section id="real-estate" className="re">
      <div className="re-wrap">
        <BrandWord word="GROW" img="jungle" />
        <div className="re-head">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
          <img src="/images/brands/ef-real-estate-mark.svg" alt="" width={104} height={108} className="re-mark" />
          <div>
            <h2 className="re-name" aria-label="EF Real Estate">EF</h2>
            <p className="re-sub">REAL ESTATE</p>
          </div>
        </div>
        <p className="re-lead">Private equity in residential property.</p>

        <div className="re-grid">
          {CARDS.map(({ Icon, ...c }, i) => (
            <article key={c.type} className="re-card">
              <div className="re-photo" aria-hidden>
                <span className="re-num">0{i + 1}</span>
                <span className="re-icon">
                  <Icon size={30} />
                </span>
              </div>
              <div className="re-body">
                <h3>{c.type}</h3>
                <p className="re-region">{c.region}</p>
                <p className="re-text">{c.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="re-note">
          <span className="re-rule" aria-hidden />
          Deliberately without addresses, tenants or figures.
        </p>
      </div>
    </section>
  );
}
