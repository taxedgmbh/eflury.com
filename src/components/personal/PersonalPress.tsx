import { Download, Image as ImageIcon, Contact } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { ROLES } from './data';

/*
 * Bios assembled only from facts stated elsewhere on the page (PersonalAbout,
 * the ventures). Keep them in step when those change.
 */
const SHORT_BIO =
  'Emanuel Flury is a Swiss entrepreneur from Grenchen who builds companies where finance, tax and technology meet: Skopa AG, Taxed GmbH and EF Real Estate.';

const LONG_BIO = `Emanuel Flury is a Swiss entrepreneur based in Grenchen. He holds an MA in Finance-Economics from the University of Aberdeen, with an exchange year at the University of Wisconsin-La Crosse, and a certificate as a tax specialist. After years spent automating finance processes in large organisations, he now builds companies where finance, tax and technology meet. He is ${ROLES.skopa} of Skopa AG, which brings artificial intelligence and automation to businesses; ${ROLES.taxed} of Taxed GmbH, which advises expats living in Switzerland on tax; and ${ROLES.estate.toLowerCase()} of EF Real Estate, which holds residential property as private equity.`;

const FILES = [
  {
    href: '/press/emanuel-flury-portrait.png',
    icon: ImageIcon,
    title: 'Portrait',
    meta: 'PNG · 714 × 1616 px',
  },
  {
    href: '/press/emanuel-flury.vcf',
    icon: Contact,
    title: 'Contact card',
    meta: 'vCard for your phone or address book',
  },
] as const;

/** Press kit: two bios to copy, a portrait and a contact card to download. */
export function PersonalPress() {
  return (
    <section id="press" className="band" aria-labelledby="press-title">
      <div className="wrap">
        <p className="eyebrow">Press</p>
        <h2 id="press-title">Press kit</h2>
        <p className="section-lead">
          For articles, events and introductions. Use the bios as they are; for anything else, write to me.
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
              <a key={f.href} href={f.href} download className="pr-file">
                <span className="pr-file-icon">
                  <f.icon size={20} aria-hidden />
                </span>
                <span>
                  <span className="pr-file-title">{f.title}</span>
                  <span className="pr-file-meta">{f.meta}</span>
                </span>
                <Download size={18} aria-hidden className="pr-file-dl" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
