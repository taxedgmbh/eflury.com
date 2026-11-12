import { Building2, Home, KeyRound } from 'lucide-react';
import { BrandWord } from './BrandWord';
import { PhotoGallery, type Photo } from './PhotoGallery';

// Owner rule: type + region only. Never addresses, tenants, values or financing.
// Photos: no house numbers, street signs, plot maps or readable number plates,
// and metadata (GPS) stripped — see the sharp step in the commit that added them.
const RE = '/images/real-estate/';
const RENTAL_HOUSE: Photo[] = [
  { base: `${RE}rental-house-exterior`, alt: 'The rental house from the garden', width: 1600, height: 1200 },
  { base: `${RE}rental-house-room-1`, alt: 'Bedroom with two windows and oak floor', width: 1600, height: 1200 },
  { base: `${RE}rental-house-room-2`, alt: 'Room under the white beamed ceiling', width: 1600, height: 1200 },
  { base: `${RE}rental-house-room-3`, alt: 'Room looking onto the garden', width: 1512, height: 2016 },
  { base: `${RE}rental-house-room-4`, alt: 'Room with oak floor, renovated', width: 1600, height: 1200 },
  { base: `${RE}rental-house-garden`, alt: 'Terrace and garden', width: 1600, height: 1200 },
];

const OWN_HOME: Photo[] = [
  { base: `${RE}own-home-exterior`, alt: 'The house in summer, with the Jura behind', width: 1600, height: 976 },
  { base: `${RE}own-home-garden`, alt: 'The house from the garden', width: 1600, height: 1200 },
  { base: `${RE}own-home-living-room`, alt: 'Living room with oak floor and a view of the garden', width: 1512, height: 2016 },
  { base: `${RE}own-home-kitchen`, alt: 'New kitchen cabinets', width: 1600, height: 1200 },
  { base: `${RE}own-home-garage`, alt: 'Renovated garage with laundry corner', width: 1600, height: 1200 },
];

const CARDS: { Icon: typeof Home; type: string; region: string; text: string; photos?: Photo[] }[] = [
  {
    Icon: Home,
    type: 'Own home',
    region: 'Lebern district · Canton of Solothurn',
    text: 'Where I live.',
    photos: OWN_HOME,
  },
  {
    Icon: KeyRound,
    type: 'Rental house',
    region: 'Wasseramt district · Canton of Solothurn',
    text: 'A house I rent out.',
    photos: RENTAL_HOUSE,
  },
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
          {CARDS.map(({ Icon, photos, ...c }, i) => (
            <article key={c.type} className="re-card">
              {photos ? (
                <div className="re-photo re-photo-img">
                  <PhotoGallery photos={photos} label={c.type} />
                  <span className="re-num" aria-hidden>
                    0{i + 1}
                  </span>
                </div>
              ) : (
                <div className="re-photo" aria-hidden>
                  <span className="re-num">0{i + 1}</span>
                  <span className="re-icon">
                    <Icon size={30} />
                  </span>
                </div>
              )}
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
