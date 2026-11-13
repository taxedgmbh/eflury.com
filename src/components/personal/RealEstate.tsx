import { Building2, Home, KeyRound } from 'lucide-react';
import { BrandWord } from './BrandWord';
import { PhotoGallery, type Photo } from './PhotoGallery';
import { pick, type Lang } from '@/lib/i18n';

// Owner rule: type + region only. Never addresses, tenants, values or financing.
// Photos: no house numbers, street signs, plot maps or readable number plates,
// and metadata (GPS) stripped — see the sharp step in the commit that added them.
const RE = '/images/real-estate/';
type Alt = [en: string, de: string];
const photo = (lang: Lang, base: string, [en, de]: Alt, width: number, height: number): Photo => ({
  base: `${RE}${base}`,
  alt: pick(lang, en, de),
  width,
  height,
});

function cards(lang: Lang): { Icon: typeof Home; type: string; region: string; text: string; photos?: Photo[] }[] {
  const t = (en: string, de: string) => pick(lang, en, de);
  const p = (base: string, alt: Alt, w: number, h: number) => photo(lang, base, alt, w, h);
  return [
    {
      Icon: Home,
      type: t('Own home', 'Eigenheim'),
      region: t('Lebern district · Canton of Solothurn', 'Bezirk Lebern · Kanton Solothurn'),
      text: t('Where I live.', 'Wo ich wohne.'),
      photos: [
        p('own-home-exterior', ['The house in summer, with the Jura behind', 'Das Haus im Sommer, dahinter der Jura'], 1600, 976),
        p('own-home-garden', ['The house from the garden', 'Das Haus vom Garten aus'], 1600, 1200),
        p('own-home-living-room', ['Living room with oak floor and a view of the garden', 'Wohnzimmer mit Eichenboden und Blick in den Garten'], 1512, 2016),
        p('own-home-kitchen', ['New kitchen cabinets', 'Neue Küchenfronten'], 1600, 1200),
        p('own-home-garage', ['Renovated garage with laundry corner', 'Renovierte Garage mit Waschecke'], 1600, 1200),
      ],
    },
    {
      Icon: KeyRound,
      type: t('Rental house', 'Mietshaus'),
      region: t('Wasseramt district · Canton of Solothurn', 'Bezirk Wasseramt · Kanton Solothurn'),
      text: t('A house I rent out.', 'Ein Haus, das ich vermiete.'),
      photos: [
        p('rental-house-exterior', ['The rental house from the garden', 'Das Mietshaus vom Garten aus'], 1600, 1200),
        p('rental-house-room-1', ['Bedroom with two windows and oak floor', 'Schlafzimmer mit zwei Fenstern und Eichenboden'], 1600, 1200),
        p('rental-house-room-2', ['Room under the white beamed ceiling', 'Zimmer unter der weissen Balkendecke'], 1600, 1200),
        p('rental-house-room-3', ['Room looking onto the garden', 'Zimmer mit Blick in den Garten'], 1512, 2016),
        p('rental-house-room-4', ['Room with oak floor, renovated', 'Renoviertes Zimmer mit Eichenboden'], 1600, 1200),
        p('rental-house-garden', ['Terrace and garden', 'Terrasse und Garten'], 1600, 1200),
      ],
    },
    {
      Icon: Building2,
      type: t('Apartment', 'Wohnung'),
      region: t('Seeland · Canton of Bern', 'Seeland · Kanton Bern'),
      text: t('An apartment I rent out.', 'Eine Wohnung, die ich vermiete.'),
      photos: [
        p('apartment-building', ['The apartment building in evening light', 'Das Mehrfamilienhaus im Abendlicht'], 1600, 1200),
        p('apartment-living-room', ['Living room with balcony door', 'Wohnzimmer mit Balkontür'], 1600, 1200),
        p('apartment-living-room-2', ['Living room with stone accent wall', 'Wohnzimmer mit Steinwand'], 1600, 1200),
        p('apartment-kitchen', ['Renovated kitchen', 'Renovierte Küche'], 1600, 1200),
        p('apartment-bedroom', ['Bedroom with new floor', 'Schlafzimmer mit neuem Boden'], 1600, 1200),
        p('apartment-bathroom', ['Bathroom with bathtub', 'Badezimmer mit Badewanne'], 1600, 1200),
      ],
    },
  ];
}

export function RealEstate({ lang = 'en' }: { lang?: Lang }) {
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
        <p className="re-lead">{pick(lang, 'Private equity in residential property.', 'Private Equity in Wohnimmobilien.')}</p>

        <div className="re-grid">
          {cards(lang).map(({ Icon, photos, ...c }, i) => (
            <article key={c.type} className="re-card">
              {photos ? (
                <div className="re-photo re-photo-img">
                  <PhotoGallery photos={photos} label={c.type} lang={lang} />
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
          {pick(lang, 'Deliberately without addresses, tenants or figures.', 'Bewusst ohne Adressen, Mieter oder Zahlen.')}
        </p>
      </div>
    </section>
  );
}
