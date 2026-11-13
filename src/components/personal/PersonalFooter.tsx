import Link from 'next/link';
import { ArrowUp, ArrowUpRight, Contact, Mail, MessageCircle } from 'lucide-react';
import { EMAIL, LEGAL, LEGAL_DE, LINKEDIN, PHONE, ROLES, ROLES_DE, SOCIALS, WHATSAPP } from './data';
import { home, PAGES, pick, type Lang } from '@/lib/i18n';
import { SocialIcon } from './SocialIcon';

export function PersonalFooter({ lang = 'en' }: { lang?: Lang }) {
  const year = new Date().getFullYear();
  const t = (en: string, de: string) => pick(lang, en, de);
  const r = lang === 'de' ? ROLES_DE : ROLES;
  const legal = lang === 'de' ? LEGAL_DE : LEGAL;

  return (
    <footer className="pf">
      <section id="contact" className="pf-cta" aria-labelledby="contact-title">
        <svg className="pf-rule" viewBox="0 0 520 60" aria-hidden>
          <line x1="0" y1="10" x2="500" y2="10" />
          <circle cx="500" cy="10" r="7" />
          <line x1="0" y1="44" x2="300" y2="44" />
          <circle cx="300" cy="44" r="7" />
        </svg>
        <div className="pf-wrap pf-cta-inner">
          <div>
            <p className="pf-eyebrow">{t('Contact', 'Kontakt')}</p>
            <h2 id="contact-title" className="pf-cta-title">
              {t('Let’s talk.', 'Lassen Sie uns reden.')}
            </h2>
            <p className="pf-cta-text">
              {t('For conversations, partnerships or media requests.', 'Für Gespräche, Partnerschaften oder Medienanfragen.')}
            </p>
          </div>
          <div className="pf-cta-actions">
            <a href={`mailto:${EMAIL}`} className="pf-btn pf-btn-fill">
              <Mail size={18} aria-hidden /> {t('Send an email', 'E-Mail schreiben')}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="pf-btn pf-btn-line">
              <MessageCircle size={18} aria-hidden /> WhatsApp
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener me" className="pf-btn pf-btn-line">
              <SocialIcon name="LinkedIn" /> {t('Connect on LinkedIn', 'Auf LinkedIn vernetzen')}
            </a>
          </div>
        </div>
        {/*
          The QR holds the vCard itself (not a link), so scanning it adds the
          contact offline. Generated from public/press/emanuel-flury.vcf with
          segno; regenerate it when the card changes. On phones the code is
          hidden and the same card is offered as a link instead. No `download`
          attribute: on iPhone that saves the file to Files, where the photo is
          lost; a plain link opens the Contacts sheet with everything.
        */}
        <div className="pf-wrap pf-qr-row">
          <div className="pf-qr">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG */}
            <img src="/images/contact-qr.svg" alt={t("QR code with Emanuel Flury's contact card", 'QR-Code mit der Kontaktkarte von Emanuel Flury')} width={168} height={168} />
          </div>
          <div className="pf-qr-text">
            <p className="pf-qr-title">{t('Save my contact', 'Meinen Kontakt speichern')}</p>
            {lang === 'de' ? (
              <p>
                <span className="pf-qr-desk">Mit der Handykamera scannen und </span>
                Name, Foto, Handynummer und WhatsApp, E-Mail, Adresse und Website in Ihre Kontakte übernehmen.
              </p>
            ) : (
              <p>
                <span className="pf-qr-desk">Scan with your phone camera to add </span>
                <span className="pf-qr-mob">Add </span>
                name, photo, mobile and WhatsApp, email, address and website to your contacts.
              </p>
            )}
            <a href="/press/emanuel-flury.vcf" className="pf-btn pf-btn-line pf-qr-btn">
              <Contact size={18} aria-hidden /> {t('Save contact', 'Kontakt speichern')}
            </a>
          </div>
        </div>
      </section>

      <div className="pf-wrap">
        <div className="pf-top">
          <div className="pf-brand">
            <a href={home(lang)} className="pf-logo">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
              <img src="/images/ef-mark-white.svg" alt="" width={60} height={48} />
              <span>
                <span className="pf-name">Emanuel Flury</span>
                <span className="pf-role">{t('ENTREPRENEUR', 'UNTERNEHMER')}</span>
              </span>
            </a>
            <p className="pf-lead">
              {t(
                'I build companies where finance, tax and technology meet.',
                'Ich baue Unternehmen, in denen Finanzen, Steuern und Technologie zusammenkommen.',
              )}
            </p>
            <a href={`mailto:${EMAIL}`} className="pf-mail">
              <Mail size={16} aria-hidden /> {EMAIL}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="pf-mail">
              <MessageCircle size={16} aria-hidden /> WhatsApp {PHONE}
            </a>
            <ul className="pf-social" aria-label={t('Follow', 'Folgen')}>
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener me" aria-label={s.name} title={s.name}>
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pf-col pf-ventures">
            <p className="pf-col-title">{t('Ventures', 'Unternehmen')}</p>
            <a href="https://skopa.ai" target="_blank" rel="noopener" className="pf-venture">
              <span className="pf-v-logo">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo */}
                <img src="/images/brands/skopa-white.svg" alt="" width={70} height={24} />
              </span>
              <span>
                <span className="pf-v-name">
                  Skopa AG <ArrowUpRight size={13} aria-hidden />
                </span>
                <span className="pf-v-role">{r.skopa}</span>
              </span>
            </a>
            <a href="https://taxed.ch" target="_blank" rel="noopener" className="pf-venture">
              <span className="pf-v-logo">
                {/* eslint-disable-next-line @next/next/no-img-element -- 3 KB icon */}
                <img src="/images/brands/taxed-icon.webp" alt="" width={28} height={28} className="pf-v-taxed" />
              </span>
              <span>
                <span className="pf-v-name">
                  Taxed GmbH <ArrowUpRight size={13} aria-hidden />
                </span>
                <span className="pf-v-role">{r.taxed}</span>
              </span>
            </a>
            <a href={home(lang, 'real-estate')} className="pf-venture">
              <span className="pf-v-logo">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
                <img src="/images/brands/ef-real-estate-mark.svg" alt="" width={32} height={33} />
              </span>
              <span>
                <span className="pf-v-name">EF Real Estate</span>
                <span className="pf-v-role">{r.estate} · Private Equity</span>
              </span>
            </a>
          </div>

          <div className="pf-col">
            <p className="pf-col-title">{t('About', 'Über mich')}</p>
            <ul className="pf-list">
              <li>
                <a className="pf-link" href={home(lang, 'about')}>
                  {t('My story', 'Meine Geschichte')}
                </a>
              </li>
              <li>
                <a className="pf-link" href={home(lang, 'radar')}>
                  {t('On my radar', 'Auf meinem Radar')}
                </a>
              </li>
              <li>
                <Link className="pf-link" href={PAGES.notes[lang]}>
                  {t('Notes', 'Notizen')}
                </Link>
              </li>
              <li>
                <a className="pf-link" href={PAGES.rss[lang]}>
                  {t('RSS feed', 'RSS-Feed')}
                </a>
              </li>
              <li>
                <a className="pf-link" href={home(lang, 'press')}>
                  {t('Press kit', 'Pressemappe')}
                </a>
              </li>
              <li>
                <a className="pf-link" href={home(lang, 'contact')}>
                  {t('Contact', 'Kontakt')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pf-bottom">
          <div className="pf-legal">
            <p>© {year} Emanuel Flury · Grenchen</p>
            <nav aria-label={t('Legal', 'Rechtliches')}>
              {legal.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <p className="pf-tag">
            TECH <b>·</b> TAX <b>·</b> REAL ESTATE
          </p>
          <div className="pf-bottom-right">
            <a href="#main-content" className="pf-top-btn" aria-label={t('Back to top', 'Nach oben')} title={t('Back to top', 'Nach oben')}>
              <ArrowUp size={18} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <p className="pf-word" aria-hidden style={{ backgroundImage: 'url(/images/hero/sky.webp)' }}>
        EMANUEL FLURY
      </p>
    </footer>
  );
}
