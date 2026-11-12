import { Languages, Sailboat } from 'lucide-react';
import { BrandWord } from './BrandWord';
import { PhotoGallery, type Photo } from './PhotoGallery';

// From brand/02-photos/4-private-life. Brand rules: no alcohol, party,
// open-shirt or swimwear photos; no strangers' faces. Re-encoded, so EXIF/GPS
// is stripped.
const P = '/images/private/';
const PRIVATE: Photo[] = [
  {
    base: `${P}beach-smile`,
    alt: 'Emanuel Flury smiling on a beach by the sea',
    width: 1600,
    height: 2133,
  },
  {
    base: `${P}sunset-at-sea`,
    alt: 'Emanuel Flury at sunset, the sea behind him',
    width: 1600,
    height: 2133,
  },
  {
    base: `${P}tuk-tuk-ride`,
    alt: 'Emanuel Flury on a tuk-tuk ride',
    width: 1600,
    height: 2133,
  },
  {
    base: `${P}jungle-sunset`,
    alt: 'Emanuel Flury in the jungle at dusk',
    width: 1600,
    height: 2133,
  },
  {
    base: `${P}hotel-lobby`,
    alt: 'Emanuel Flury in a hotel garden, pool behind',
    width: 1600,
    height: 2133,
  },
  {
    base: `${P}banana-palms-sunset`,
    alt: 'Emanuel Flury among banana palms at sunset',
    width: 1600,
    height: 2133,
  },
];

// Sailing, Strait of Gibraltar (May 2024). Cropped so no crew names (log
// sheet), boat identifiers (MMSI / call sign) or school branding show.
const S = '/images/sailing/';
const SAILING: Photo[] = [
  {
    base: `${S}rock-selfie`,
    alt: 'Emanuel Flury sailing in front of the Rock of Gibraltar',
    width: 1600,
    height: 2133,
  },
  {
    base: `${S}helm-smile`,
    alt: 'Emanuel Flury in sailing gear on deck, leaving the harbour',
    width: 1600,
    height: 2133,
  },
  {
    base: `${S}looking-up`,
    alt: 'Emanuel Flury looking up at the mast under sail',
    width: 1600,
    height: 2133,
  },
  {
    base: `${S}tanker`,
    alt: 'A tanker at anchor in the Bay of Gibraltar, seen from the yacht',
    width: 1600,
    height: 1200,
  },
  {
    base: `${S}chart`,
    alt: 'Paper chart of the Strait of Gibraltar with plotted course and dividers',
    width: 1500,
    height: 1060,
  },
  {
    base: `${S}marina`,
    alt: 'Sailing yachts reflected in a calm marina at dawn',
    width: 1300,
    height: 1500,
  },
];

/** Private: life beyond work, learning French, and sailing. */
export function PersonalPrivate() {
  return (
    <section id="private" className="band" aria-labelledby="private-title">
      <div className="wrap">
        <BrandWord word="LIVE" img="dusk" />
        <p className="eyebrow">Private</p>
        <h2 id="private-title">Beyond work.</h2>
        <p className="section-lead">
          Travel keeps me curious: new places, new cultures, new ways of doing
          things. Most of my best ideas start far from the desk.
        </p>

        <div className="pv-cards">
          <div className="pv-french">
            <span className="pv-icon" aria-hidden>
              <Languages size={22} />
            </span>
            <div>
              <p className="pv-kicker">Currently learning</p>
              <h3>French, for the francophone world.</h3>
              <p>
                I am studying French. It started as a passion for the
                francophone world and its way of life, and it is becoming a
                goal: to work, build and connect in French too. From Grenchen,
                the language border is close — Biel/Bienne, Switzerland&rsquo;s
                largest bilingual city, is next door.
              </p>
              <p className="pv-fr" lang="fr">
                Apprendre, construire, partager&nbsp;— bientôt aussi en
                français.
              </p>
            </div>
          </div>

          <div className="pv-french">
            <span className="pv-icon" aria-hidden>
              <Sailboat size={22} />
            </span>
            <div>
              <p className="pv-kicker">At sea</p>
              <h3>Sailing the Strait of Gibraltar.</h3>
              <p>
                From La Duquesa in Spain to Gibraltar on a sailing yacht:
                tankers at anchor, tidal streams, and position fixes worked out
                by hand on the paper chart. Sailing teaches what business does
                too — read the conditions, plan the route, adjust early.
              </p>
            </div>
          </div>
        </div>

        <p className="eyebrow pv-photos-title">Sailing</p>
        <PhotoGallery photos={SAILING} label="Sailing" layout="strip" />

        <p className="eyebrow pv-photos-title">Moments</p>
        <PhotoGallery photos={PRIVATE} label="Private moments" layout="strip" />
      </div>
    </section>
  );
}
