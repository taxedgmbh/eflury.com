import { BrandWord } from './BrandWord';
import { ArrowUpRight, Download, Image as ImageIcon, Contact, PlayCircle, Shapes } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { ROLES, ROLES_DE, ROLES_FR } from './data';
import { pick, type Lang } from '@/lib/i18n';

/*
 * Bios assembled only from facts stated elsewhere on the page (PersonalAbout,
 * the ventures). Keep them in step when those change.
 */
const SHORT_BIO =
  'Emanuel Flury is a Swiss entrepreneur from Grenchen who builds companies where finance, tax and technology meet: Skopa AG, Taxed GmbH and EF Real Estate.';

const LONG_BIO = `Emanuel Flury is a Swiss entrepreneur based in Grenchen. He holds a Master of Arts in Economics-Finance from the University of Aberdeen (2016), including an exchange year at the University of Wisconsin–La Crosse, and a certificate as a tax specialist. After nine years in finance and finance automation inside a global corporation, he founded Taxed GmbH in 2021 and Skopa AG in 2026. He is ${ROLES.skopa} of Skopa AG, which works on artificial intelligence and quantum computing; ${ROLES.taxed} of Taxed GmbH, which advises expats living in Switzerland on tax; and ${ROLES.estate.toLowerCase()} of EF Real Estate, which holds residential property as private equity.`;

const SHORT_BIO_DE =
  'Emanuel Flury ist ein Schweizer Unternehmer aus Grenchen. Er baut Unternehmen, in denen Finanzen, Steuern und Technologie zusammenkommen: Skopa AG, Taxed GmbH und EF Real Estate.';

const LONG_BIO_DE = `Emanuel Flury ist ein Schweizer Unternehmer und lebt in Grenchen. Er schloss 2016 an der University of Aberdeen mit einem Master of Arts in Economics-Finance ab, inklusive Austauschjahr an der University of Wisconsin–La Crosse, und besitzt ein Zertifikat als Steuerspezialist. Nach neun Jahren im Finanzbereich und in der Finanzautomatisierung eines globalen Konzerns gründete er 2021 die Taxed GmbH und 2026 die Skopa AG. Er ist ${ROLES_DE.skopa} der Skopa AG, die im Bereich künstliche Intelligenz und Quantencomputing tätig ist, ${ROLES_DE.taxed} der Taxed GmbH, die Expats in der Schweiz in Steuerfragen berät, und ${ROLES_DE.estate} von EF Real Estate, unter dem er Wohnimmobilien als Private Equity hält.`;

const SHORT_BIO_FR =
  'Emanuel Flury est un entrepreneur suisse de Granges (Grenchen). Il crée des entreprises à la croisée de la finance, de la fiscalité et de la technologie : Skopa AG, Taxed GmbH et EF Real Estate.';

const LONG_BIO_FR = `Emanuel Flury est un entrepreneur suisse établi à Granges (Grenchen). Il est titulaire d’un Master of Arts in Economics-Finance de l’Université d’Aberdeen (2016), avec une année d’échange à l’Université du Wisconsin à La Crosse, ainsi que d’un certificat de spécialiste en fiscalité. Après neuf ans dans la finance et l’automatisation financière au sein d’un groupe international, il a fondé Taxed GmbH en 2021 et Skopa AG en 2026. Il est ${ROLES_FR.skopa.toLowerCase()} de Skopa AG, active dans l’intelligence artificielle et l’informatique quantique, ${ROLES_FR.taxed.toLowerCase()} de Taxed GmbH, qui conseille les expatriés vivant en Suisse en matière fiscale, et ${ROLES_FR.estate.toLowerCase()} d’EF Real Estate, sous le nom duquel il détient des biens résidentiels en private equity.`;

/** The 70-second intro on YouTube, published 2026-11-12. */
export const INTRO_VIDEO = 'https://www.youtube.com/watch?v=tH6VlyiJkv4';

type File = {
  href: string;
  icon: typeof ImageIcon;
  thumb?: string;
  title: string;
  meta: string;
  /** Opens in a new tab instead of downloading. */
  external?: boolean;
};

function files(lang: Lang): File[] {
  const t = (en: string, de: string) => pick(lang, en, de);
  return [
    {
      href: INTRO_VIDEO,
      icon: PlayCircle,
      thumb: '/images/me/intro-video-thumb.webp',
      title: t('Intro video', 'Intro-Video'),
      meta: t('70 seconds · on YouTube', '70 Sekunden · auf YouTube, auf Englisch'),
      external: true,
    },
    {
      href: '/press/emanuel-flury-portrait.png',
      icon: ImageIcon,
      thumb: '/images/portraits/emanuel-aaron-flury-portrait.webp',
      title: t('Portrait', 'Porträt'),
      meta: 'PNG · 714 × 1616',
    },
    {
      href: '/press/emanuel-flury-city-night.jpg',
      icon: ImageIcon,
      thumb: '/images/me/city-night-800.webp',
      title: t('Photo, city', 'Foto, Stadt'),
      meta: 'JPG · 1536 × 2048',
    },
    {
      href: '/press/ef-logo-pack.zip',
      icon: Shapes,
      title: t('Logo pack', 'Logo-Paket'),
      meta: t('EF mark and wordmark, SVG', 'EF-Bildmarke und Schriftzug, SVG'),
    },
    {
      href: '/press/emanuel-flury.vcf',
      icon: Contact,
      title: t('Contact card', 'Kontaktkarte'),
      meta: t('vCard with photo, phone, WhatsApp and address', 'vCard mit Foto, Telefon, WhatsApp und Adresse'),
    },
  ];
}

/** Press kit: two bios to copy; the intro video, two photos, a logo pack and a contact card. */
export function PersonalPress({ lang = 'en' }: { lang?: Lang }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  const short = { en: SHORT_BIO, de: SHORT_BIO_DE, fr: SHORT_BIO_FR }[lang];
  const long = { en: LONG_BIO, de: LONG_BIO_DE, fr: LONG_BIO_FR }[lang];
  return (
    <section id="press" className="band" aria-labelledby="press-title">
      <div className="wrap">
        <BrandWord word="SHARE" img="sea" />
        <p className="eyebrow">{t('Press', 'Presse')}</p>
        <h2 id="press-title">{t('Press kit', 'Pressemappe')}</h2>
        <p className="section-lead">
          {t(
            'For articles, events and introductions. Use the bios, photos and video as they are; for anything else, write to me.',
            'Für Artikel, Anlässe und Vorstellungen. Biografien, Fotos und Video dürfen Sie unverändert verwenden; für alles andere schreiben Sie mir.',
          )}
        </p>
        <div className="pr-grid">
          <article className="pr-card">
            <p className="pr-label">{t('Short bio', 'Kurzbiografie')}</p>
            <p className="pr-text">{short}</p>
            <CopyButton text={short} label={t('Copy short bio', 'Kurzbiografie kopieren')} done={t('Copied', 'Kopiert')} />
          </article>
          <article className="pr-card">
            <p className="pr-label">{t('Long bio', 'Biografie')}</p>
            <p className="pr-text">{long}</p>
            <CopyButton text={long} label={t('Copy long bio', 'Biografie kopieren')} done={t('Copied', 'Kopiert')} />
          </article>
          <div className="pr-files">
            {files(lang).map((f) => (
              <a
                key={f.href}
                href={f.href}
                className="pr-file"
                {...(f.external
                  ? { target: '_blank', rel: 'noopener' }
                  : f.href.endsWith('.vcf')
                    ? {} // opens the Contacts sheet on iPhone, photo included
                    : { download: true })}
              >
                {f.thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element -- 56px preview
                  <img src={f.thumb} alt="" width={56} height={56} className="pr-thumb" loading="lazy" />
                ) : (
                  <span className="pr-file-icon">
                    <f.icon size={20} aria-hidden />
                  </span>
                )}
                <span>
                  <span className="pr-file-title">{f.title}</span>
                  <span className="pr-file-meta">{f.meta}</span>
                </span>
                {f.external ? (
                  <ArrowUpRight size={18} aria-hidden className="pr-file-dl" />
                ) : (
                  <Download size={18} aria-hidden className="pr-file-dl" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
