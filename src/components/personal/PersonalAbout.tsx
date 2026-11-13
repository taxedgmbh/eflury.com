import { PhotoGallery, type Photo } from './PhotoGallery';
import { GraduationCap, Rocket, Workflow } from 'lucide-react';
import { BrandWord } from './BrandWord';
import { roles } from './data';
import { pick, type Lang } from '@/lib/i18n';

// Content rules: verified facts only; past kept light; no employer names.
function chapters(lang: Lang) {
  const t = (en: string, de: string) => pick(lang, en, de);
  const r = roles(lang);
  return [
    {
      Icon: GraduationCap,
      kicker: t('Foundation · 2012–2016', 'Grundlage · 2012–2016'),
      title: t('Finance', 'Finanzen'),
      text: t(
        'Master of Arts in Economics-Finance from the University of Aberdeen, with Upper Second Class Honours (2:1), including an exchange year at the University of Wisconsin–La Crosse (2013–2014). Plus a certificate as a tax specialist.',
        'Master of Arts in Economics-Finance an der University of Aberdeen, abgeschlossen mit Upper Second Class Honours (2:1), inklusive Austauschjahr an der University of Wisconsin–La Crosse (2013–2014). Dazu ein Zertifikat als Steuerspezialist.',
      ),
    },
    {
      Icon: Workflow,
      kicker: t('Experience · 2017–2026', 'Erfahrung · 2017–2026'),
      title: t('Automation', 'Automatisierung'),
      text: t(
        'Nine years in finance inside a global corporation: controlling, forecasting and transfer pricing first, then automating finance processes. That is where I learned to think in systems, not hours. Certified UiPath RPA Developer, Microsoft Power BI Data Analyst Associate and Alteryx Designer Core.',
        'Neun Jahre im Finanzbereich eines globalen Konzerns: zuerst Controlling, Forecasting und Verrechnungspreise, danach die Automatisierung von Finanzprozessen. Dort habe ich gelernt, in Systemen statt in Stunden zu denken. Zertifiziert als UiPath RPA Developer, Microsoft Power BI Data Analyst Associate und Alteryx Designer Core.',
      ),
    },
    {
      Icon: Rocket,
      kicker: t('Today · since 2021', 'Heute · seit 2021'),
      title: t('Entrepreneur', 'Unternehmer'),
      text: t(
        `Founded Taxed GmbH in 2021 and Skopa AG in 2026. Today ${r.skopa} of Skopa AG, ${r.taxed} of Taxed GmbH and ${r.estate.toLowerCase()} of EF Real Estate.`,
        `2021 Gründung der Taxed GmbH, 2026 der Skopa AG. Heute ${r.skopa} der Skopa AG, ${r.taxed} der Taxed GmbH und ${r.estate} von EF Real Estate.`,
      ),
    },
  ];
}

// From brand/02-photos (about-and-hero, founder-journey): no strangers' faces,
// no readable plates. Re-encoded, so EXIF/GPS is stripped.
const ME = '/images/me/';
function onTheRoad(lang: Lang): Photo[] {
  const t = (en: string, de: string) => pick(lang, en, de);
  return [
    { base: `${ME}city-night`, alt: t('Emanuel Flury on a terrace at night, city behind', 'Emanuel Flury nachts auf einer Terrasse, dahinter die Stadt'), width: 1536, height: 2048 },
    { base: `${ME}city-railing`, alt: t('Emanuel Flury leaning on a railing above the city', 'Emanuel Flury an einem Geländer über der Stadt'), width: 1536, height: 2048 },
    { base: `${ME}restaurant-thinking`, alt: t('Emanuel Flury at a restaurant table, thinking', 'Emanuel Flury nachdenklich an einem Restauranttisch'), width: 1536, height: 2048 },
    { base: `${ME}airport-hall`, alt: t('Emanuel Flury smiling in an airport hall', 'Emanuel Flury lächelnd in einer Flughafenhalle'), width: 1600, height: 2133 },
    { base: `${ME}terminal`, alt: t('Emanuel Flury in an airport terminal', 'Emanuel Flury in einem Flughafenterminal'), width: 1600, height: 2133 },
    { base: `${ME}crossing`, alt: t('Emanuel Flury from behind at a street crossing, towers ahead', 'Emanuel Flury von hinten an einer Kreuzung, vor ihm Hochhäuser'), width: 1600, height: 2133 },
  ];
}

export function PersonalAbout({ lang = 'en' }: { lang?: Lang }) {
  const t = (en: string, de: string) => pick(lang, en, de);
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
          <p className="ab-quote">{t('Life · Lessons · Building companies', 'Leben · Lernen · Unternehmen aufbauen')}</p>
        </div>

        <div className="ab-text">
          <BrandWord word="LEAD" img="arches" />
          <p className="ab-eyebrow">{t('About', 'Über mich')}</p>
          <h2>
            {t(
              'Trained in finance. Shaped by automation. Now building.',
              'Ausgebildet in Finanzen. Geprägt von Automatisierung. Heute Unternehmer.',
            )}
          </h2>
          <p className="ab-lead">
            {t(
              'I bring together three things that rarely meet: a degree in finance, years of automating finance processes in large organisations, and the step into building my own companies.',
              'Ich verbinde drei Dinge, die selten zusammenkommen: ein Finanzstudium, jahrelange Erfahrung in der Automatisierung von Finanzprozessen in grossen Unternehmen und den Schritt ins eigene Unternehmertum.',
            )}
          </p>

          <ol className="ab-chapters">
            {chapters(lang).map(({ Icon, ...c }, i) => (
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

          <p className="ab-kicker ab-photos-title">{t('On the road', 'Unterwegs')}</p>
          <PhotoGallery photos={onTheRoad(lang)} label={t('On the road', 'Unterwegs')} layout="strip" lang={lang} />
        </div>
      </div>
    </section>
  );
}
