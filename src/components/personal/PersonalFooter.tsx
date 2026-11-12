import { ArrowUp, ArrowUpRight, Contact, Mail, MessageCircle } from 'lucide-react';
import { EMAIL, LEGAL, LINKEDIN, PHONE, ROLES, SOCIALS, WHATSAPP } from './data';
import { SocialIcon } from './SocialIcon';

export function PersonalFooter() {
  const year = new Date().getFullYear();

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
            <p className="pf-eyebrow">Contact</p>
            <h2 id="contact-title" className="pf-cta-title">
              Let&rsquo;s talk.
            </h2>
            <p className="pf-cta-text">For conversations, partnerships or media requests.</p>
          </div>
          <div className="pf-cta-actions">
            <a href={`mailto:${EMAIL}`} className="pf-btn pf-btn-fill">
              <Mail size={18} aria-hidden /> Send an email
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="pf-btn pf-btn-line">
              <MessageCircle size={18} aria-hidden /> WhatsApp
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener me" className="pf-btn pf-btn-line">
              <SocialIcon name="LinkedIn" /> Connect on LinkedIn
            </a>
          </div>
        </div>
        {/*
          The QR holds the vCard itself (not a link), so scanning it adds the
          contact offline. Generated from public/press/emanuel-flury.vcf with
          segno; regenerate it when the card changes. On phones the code is
          hidden and the same card is offered as a download instead.
        */}
        <div className="pf-wrap pf-qr-row">
          <div className="pf-qr">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG */}
            <img src="/images/contact-qr.svg" alt="QR code with Emanuel Flury's contact card" width={168} height={168} />
          </div>
          <div className="pf-qr-text">
            <p className="pf-qr-title">Save my contact</p>
            <p>
              <span className="pf-qr-desk">Scan with your phone camera to add </span>
              <span className="pf-qr-mob">Add </span>
              name, photo, mobile and WhatsApp, email, address and website to your contacts.
            </p>
            <a href="/press/emanuel-flury.vcf" download className="pf-btn pf-btn-line pf-qr-btn">
              <Contact size={18} aria-hidden /> Save contact
            </a>
          </div>
        </div>
      </section>

      <div className="pf-wrap">
        <div className="pf-top">
          <div className="pf-brand">
            <a href="/en/" className="pf-logo">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
              <img src="/images/ef-mark-white.svg" alt="" width={60} height={48} />
              <span>
                <span className="pf-name">Emanuel Flury</span>
                <span className="pf-role">ENTREPRENEUR</span>
              </span>
            </a>
            <p className="pf-lead">I build companies where finance, tax and technology meet.</p>
            <a href={`mailto:${EMAIL}`} className="pf-mail">
              <Mail size={16} aria-hidden /> {EMAIL}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="pf-mail">
              <MessageCircle size={16} aria-hidden /> WhatsApp {PHONE}
            </a>
            <ul className="pf-social" aria-label="Follow">
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
            <p className="pf-col-title">Ventures</p>
            <a href="https://skopa.ai" target="_blank" rel="noopener" className="pf-venture">
              <span className="pf-v-logo">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo */}
                <img src="/images/brands/skopa-white.svg" alt="" width={70} height={24} />
              </span>
              <span>
                <span className="pf-v-name">
                  Skopa AG <ArrowUpRight size={13} aria-hidden />
                </span>
                <span className="pf-v-role">{ROLES.skopa}</span>
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
                <span className="pf-v-role">{ROLES.taxed}</span>
              </span>
            </a>
            <a href="/en/#real-estate" className="pf-venture">
              <span className="pf-v-logo">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
                <img src="/images/brands/ef-real-estate-mark.svg" alt="" width={32} height={33} />
              </span>
              <span>
                <span className="pf-v-name">EF Real Estate</span>
                <span className="pf-v-role">{ROLES.estate} · Private equity</span>
              </span>
            </a>
          </div>

          <div className="pf-col">
            <p className="pf-col-title">About</p>
            <ul className="pf-list">
              <li>
                <a className="pf-link" href="/en/#about">
                  My story
                </a>
              </li>
              <li>
                <a className="pf-link" href="/en/#press">
                  Press kit
                </a>
              </li>
              <li>
                <a className="pf-link" href="/en/#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pf-bottom">
          <div className="pf-legal">
            <p>© {year} Emanuel Flury · Grenchen</p>
            <nav aria-label="Legal">
              {LEGAL.map((l) => (
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
            <a href="#main-content" className="pf-top-btn" aria-label="Back to top" title="Back to top">
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
