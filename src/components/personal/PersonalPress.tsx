import { ArrowUpRight, Download, Image as ImageIcon, Contact, PlayCircle, Shapes } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { ROLES } from './data';

/*
 * Bios assembled only from facts stated elsewhere on the page (PersonalAbout,
 * the ventures). Keep them in step when those change.
 */
const SHORT_BIO =
  'Emanuel Flury is a Swiss entrepreneur from Grenchen who builds companies where finance, tax and technology meet: Skopa AG, Taxed GmbH and EF Real Estate.';

const LONG_BIO = `Emanuel Flury is a Swiss entrepreneur based in Grenchen. He holds an MA in Finance-Economics from the University of Aberdeen, with an exchange year at the University of Wisconsin–La Crosse, and a certificate as a tax specialist. After years spent automating finance processes in large organisations, he founded Taxed GmbH in 2021 and Skopa AG in 2026. He is ${ROLES.skopa} of Skopa AG, which works on artificial intelligence and quantum computing; ${ROLES.taxed} of Taxed GmbH, which advises expats living in Switzerland on tax; and ${ROLES.estate.toLowerCase()} of EF Real Estate, which holds residential property as private equity.`;

/** The 70-second intro on YouTube, published 2026-11-12. */
export const INTRO_VIDEO = 'https://www.youtube.com/watch?v=tH6VlyiJkv4';

const FILES: {
  href: string;
  icon: typeof ImageIcon;
  thumb?: string;
  title: string;
  meta: string;
  /** Opens in a new tab instead of downloading. */
  external?: boolean;
}[] = [
  {
    href: INTRO_VIDEO,
    icon: PlayCircle,
    thumb: '/images/me/intro-video-thumb.webp',
    title: 'Intro video',
    meta: '70 seconds · on YouTube',
    external: true,
  },
  {
    href: '/press/emanuel-flury-portrait.png',
    icon: ImageIcon,
    thumb: '/images/portraits/emanuel-aaron-flury-portrait.webp',
    title: 'Portrait',
    meta: 'PNG · 714 × 1616',
  },
  {
    href: '/press/emanuel-flury-city-night.jpg',
    icon: ImageIcon,
    thumb: '/images/me/city-night-800.webp',
    title: 'Photo, city',
    meta: 'JPG · 1536 × 2048',
  },
  {
    href: '/press/ef-logo-pack.zip',
    icon: Shapes,
    title: 'Logo pack',
    meta: 'EF mark and wordmark, SVG',
  },
  {
    href: '/press/emanuel-flury.vcf',
    icon: Contact,
    title: 'Contact card',
    meta: 'vCard for your phone or address book',
  },
];

/** Press kit: two bios to copy; the intro video, two photos, a logo pack and a contact card. */
export function PersonalPress() {
  return (
    <section id="press" className="band" aria-labelledby="press-title">
      <div className="wrap">
        <p className="eyebrow">Press</p>
        <h2 id="press-title">Press kit</h2>
        <p className="section-lead">
          For articles, events and introductions. Use the bios, photos and video as they are; for anything else, write to me.
        </p>
        <div className="pr-grid">
          <article className="pr-card">
            <p className="pr-label">Short bio</p>
            <p className="pr-text">{SHORT_BIO}</p>
            <CopyButton text={SHORT_BIO} label="Copy short bio" />
          </article>
          <article className="pr-card">
            <p className="pr-label">Long bio</p>
            <p className="pr-text">{LONG_BIO}</p>
            <CopyButton text={LONG_BIO} label="Copy long bio" />
          </article>
          <div className="pr-files">
            {FILES.map((f) => (
              <a
                key={f.href}
                href={f.href}
                className="pr-file"
                {...(f.external ? { target: '_blank', rel: 'noopener' } : { download: true })}
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
