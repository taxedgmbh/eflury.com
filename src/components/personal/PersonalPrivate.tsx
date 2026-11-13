import { Languages, Sailboat } from 'lucide-react';
import { BrandWord } from './BrandWord';
import { PhotoGallery, type Photo } from './PhotoGallery';
import { pick, type Lang } from '@/lib/i18n';

// From brand/02-photos/4-private-life. Brand rules: no alcohol, party,
// open-shirt or swimwear photos; no strangers' faces. Re-encoded, so EXIF/GPS
// is stripped.
type P = Omit<Photo, 'alt'> & { alt: [string, string] };
const local = (lang: Lang, ps: P[]): Photo[] => ps.map((p) => ({ ...p, alt: pick(lang, p.alt[0], p.alt[1]) }));

const P = '/images/private/';
const PRIVATE: P[] = [
  {
    base: `${P}beach-smile`,
    alt: ['Emanuel Flury smiling on a beach by the sea', 'Emanuel Flury lächelnd an einem Strand am Meer'],
    width: 1600,
    height: 2133,
  },
  {
    base: `${P}sunset-at-sea`,
    alt: ['Emanuel Flury at sunset, the sea behind him', 'Emanuel Flury bei Sonnenuntergang, hinter ihm das Meer'],
    width: 1600,
    height: 2133,
  },
  {
    base: `${P}tuk-tuk-ride`,
    alt: ['Emanuel Flury on a tuk-tuk ride', 'Emanuel Flury auf einer Tuk-Tuk-Fahrt'],
    width: 1600,
    height: 2133,
  },
  {
    base: `${P}jungle-sunset`,
    alt: ['Emanuel Flury in the jungle at dusk', 'Emanuel Flury in der Abenddämmerung im Dschungel'],
    width: 1600,
    height: 2133,
  },
  {
    base: `${P}hotel-lobby`,
    alt: ['Emanuel Flury in a hotel garden, pool behind', 'Emanuel Flury in einem Hotelgarten, dahinter der Pool'],
    width: 1600,
    height: 2133,
  },
  {
    base: `${P}banana-palms-sunset`,
    alt: ['Emanuel Flury among banana palms at sunset', 'Emanuel Flury zwischen Bananenpalmen bei Sonnenuntergang'],
    width: 1600,
    height: 2133,
  },
];

// Sailing, Strait of Gibraltar (May 2024). Cropped so no crew names (log
// sheet), boat identifiers (MMSI / call sign) or school branding show.
const S = '/images/sailing/';
const SAILING: P[] = [
  {
    base: `${S}rock-selfie`,
    alt: ['Emanuel Flury sailing in front of the Rock of Gibraltar', 'Emanuel Flury beim Segeln vor dem Felsen von Gibraltar'],
    width: 1600,
    height: 2133,
  },
  {
    base: `${S}helm-smile`,
    alt: ['Emanuel Flury in sailing gear on deck, leaving the harbour', 'Emanuel Flury in Segelkleidung an Deck beim Auslaufen'],
    width: 1600,
    height: 2133,
  },
  {
    base: `${S}looking-up`,
    alt: ['Emanuel Flury looking up at the mast under sail', 'Emanuel Flury unter Segeln, der Blick zum Mast'],
    width: 1600,
    height: 2133,
  },
  {
    base: `${S}tanker`,
    alt: ['A tanker at anchor in the Bay of Gibraltar, seen from the yacht', 'Ein Tanker vor Anker in der Bucht von Gibraltar, von der Yacht aus'],
    width: 1600,
    height: 1200,
  },
  {
    base: `${S}chart`,
    alt: ['Paper chart of the Strait of Gibraltar with plotted course and dividers', 'Papierseekarte der Strasse von Gibraltar mit eingezeichnetem Kurs und Stechzirkel'],
    width: 1500,
    height: 1060,
  },
  {
    base: `${S}marina`,
    alt: ['Sailing yachts reflected in a calm marina at dawn', 'Segelyachten spiegeln sich im Morgengrauen in einer ruhigen Marina'],
    width: 1300,
    height: 1500,
  },
];

/** Private: life beyond work, learning French, and sailing. */
export function PersonalPrivate({ lang = 'en' }: { lang?: Lang }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  return (
    <section id="private" className="band" aria-labelledby="private-title">
      <div className="wrap">
        <BrandWord word="LIVE" img="dusk" />
        <p className="eyebrow">{t('Private', 'Privat')}</p>
        <h2 id="private-title">{t('Beyond work.', 'Neben der Arbeit.')}</h2>
        <p className="section-lead">
          {t(
            'Travel keeps me curious: new places, new cultures, new ways of doing things. Most of my best ideas start far from the desk.',
            'Reisen hält mich neugierig: neue Orte, neue Kulturen, neue Sichtweisen. Meine besten Ideen entstehen meist weit weg vom Schreibtisch.',
          )}
        </p>

        <div className="pv-cards">
          <div className="pv-french">
            <span className="pv-icon" aria-hidden>
              <Languages size={22} />
            </span>
            <div>
              <p className="pv-kicker">{t('Currently learning', 'Ich lerne gerade')}</p>
              <h3>{t('French, for the francophone world.', 'Französisch – für die frankophone Welt.')}</h3>
              <p>
                {t(
                  'I am studying French. It started as a passion for the francophone world and its way of life, and it is becoming a goal: to work, build and connect in French too. From Grenchen, the language border is close — Biel/Bienne, Switzerland’s largest bilingual city, is next door.',
                  'Ich lerne Französisch. Angefangen hat es mit meiner Begeisterung für die frankophone Welt und ihre Lebensart. Daraus wird nun ein Ziel: auch auf Französisch zu arbeiten, aufzubauen und Kontakte zu knüpfen. Von Grenchen aus ist die Sprachgrenze nah – Biel/Bienne, die grösste zweisprachige Stadt der Schweiz, liegt gleich nebenan.',
                )}
              </p>
              <p className="pv-fr" lang="fr">
                Apprendre, construire, partager&nbsp;— bientôt aussi en français.
              </p>
            </div>
          </div>

          <div className="pv-french">
            <span className="pv-icon" aria-hidden>
              <Sailboat size={22} />
            </span>
            <div>
              <p className="pv-kicker">{t('At sea · RYA Day Skipper', 'Auf See · RYA Day Skipper')}</p>
              <h3>{t('Sailing the Strait of Gibraltar.', 'Segeln in der Strasse von Gibraltar.')}</h3>
              <p>
                {t(
                  'RYA Day Skipper since 2024. From La Duquesa in Spain to Gibraltar on a sailing yacht: tankers at anchor, tidal streams, and position fixes worked out by hand on the paper chart. Sailing teaches what business does too — read the conditions, plan the route, adjust early.',
                  'RYA Day Skipper seit 2024. Mit einer Segelyacht von La Duquesa in Spanien nach Gibraltar: Tanker vor Anker, Gezeitenströme und Standortbestimmung von Hand auf der Papierseekarte. Segeln verlangt, was auch ein Unternehmen verlangt: die Bedingungen lesen, die Route planen, früh korrigieren.',
                )}
              </p>
            </div>
          </div>
        </div>

        <p className="eyebrow pv-photos-title">{t('Sailing', 'Segeln')}</p>
        <PhotoGallery photos={local(lang, SAILING)} label={t('Sailing', 'Segeln')} layout="strip" lang={lang} />

        <p className="eyebrow pv-photos-title">{t('Moments', 'Momente')}</p>
        <PhotoGallery photos={local(lang, PRIVATE)} label={t('Private moments', 'Private Momente')} layout="strip" lang={lang} />
      </div>
    </section>
  );
}
