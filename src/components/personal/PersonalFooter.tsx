import Link from 'next/link';
import { ArrowRight, ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import { ARCHIVE_HREF, EMAIL, fmtShort, LEGAL, LINKEDIN, postHref, ROLES, SOCIALS, type PostCard } from './data';
import { SocialIcon } from './SocialIcon';

export function PersonalFooter({ latest, total }: { latest?: PostCard; total: number }) {
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
            <a href={LINKEDIN} target="_blank" rel="noopener me" className="pf-btn pf-btn-line">
              <SocialIcon name="LinkedIn" /> Connect on LinkedIn
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
            <a href="#real-estate" className="pf-venture">
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
            <p className="pf-col-title">Writing</p>
            {latest ? (
              <a href={postHref(latest.slug)} className="pf-latest" hrefLang="de">
                <span className="pf-latest-label">
                  Latest article · {fmtShort.format(latest.date)} · {latest.minutes} min · German
                </span>
                <span className="pf-latest-title" lang="de">
                  {latest.title}
                </span>
              </a>
            ) : null}
            <Link href="/de/blog/" className="pf-link pf-strong" hrefLang="de">
              All articles ({total}) <ArrowRight size={14} aria-hidden />
            </Link>
          </div>

          <div className="pf-col">
            <p className="pf-col-title">About</p>
            <ul className="pf-list">
              <li>
                <a className="pf-link" href="#about">
                  My story
                </a>
              </li>
              <li>
                <a className="pf-link" href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="pf-link" href={ARCHIVE_HREF} hrefLang="de">
                  eFlury Consulting (archive)
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
                <a key={l.href} href={l.href} hrefLang="de">
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
