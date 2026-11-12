'use client';

import Link from 'next/link';
import {
  Archive,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Mail,
  Menu,
  User,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ARCHIVE_HREF, EMAIL, fmtShort, postHref, ROLES, SOCIALS, type PostCard } from './data';

type Panel = 'ventures' | 'writing' | 'about';

export interface Topic {
  label: string;
  href: string;
  count: number;
}

function Strip() {
  return (
    <div className="mm-strip">
      <div className="mm-strip-inner">
        <span className="mm-rule" aria-hidden />
        <span>
          TECH <b>·</b> TAX <b>·</b> REAL ESTATE
        </span>
        <a href="#contact">
          Start a conversation <ArrowRight size={14} aria-hidden />
        </a>
      </div>
    </div>
  );
}

/**
 * Header with full-width mega menu panels (desktop) and a full-screen menu
 * with fold-outs (mobile). Ported from PersonalHeader.astro, behaviour kept:
 * panels open on hover with a mouse and on click or keyboard otherwise; a
 * click right after a hover-open keeps the panel open rather than toggling it
 * shut; Esc closes and returns focus to the trigger; following any link in a
 * panel closes it.
 */
export function PersonalHeader({ posts, total, topics }: { posts: PostCard[]; total: number; topics: Topic[] }) {
  const [open, setOpen] = useState<Panel | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpenedAt = useRef(0);
  const triggers = useRef<Partial<Record<Panel, HTMLButtonElement | null>>>({});

  const closeAll = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen((current) => {
        if (current) triggers.current[current]?.focus();
        return null;
      });
      setMobile(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // The mobile menu covers the viewport; the page behind it must not scroll.
  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [mobile]);

  const trigger = (panel: Panel, label: string) => (
    <button
      ref={(el) => {
        triggers.current[panel] = el;
      }}
      type="button"
      className="ph-trigger"
      aria-expanded={open === panel}
      aria-controls={`mm-${panel}`}
      onClick={() => {
        if (open === panel && Date.now() - hoverOpenedAt.current > 400) closeAll();
        else setOpen(panel);
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse' && open !== panel) {
          hoverOpenedAt.current = Date.now();
          window.clearTimeout(closeTimer.current);
          setOpen(panel);
        }
      }}
    >
      {label} <ChevronDown size={16} aria-hidden />
    </button>
  );

  const [featured, ...more] = posts;
  const closeMobile = () => setMobile(false);

  return (
    <>
      <header
        className={`ph${open ? ' is-open' : ''}${mobile ? ' is-mobile-open' : ''}`}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') closeTimer.current = window.setTimeout(closeAll, 180);
        }}
        onPointerEnter={() => window.clearTimeout(closeTimer.current)}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('.mm a')) closeAll();
        }}
      >
        <nav className="ph-inner" aria-label="Main">
          <a href="/en/" className="ph-brand">
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
            <img src="/images/ef-mark-white.svg" alt="" width={35} height={28} />
            <span>Emanuel Flury</span>
          </a>

          <ul className="ph-links">
            <li>{trigger('ventures', 'Ventures')}</li>
            <li>{trigger('writing', 'Writing')}</li>
            <li>{trigger('about', 'About')}</li>
            <li>
              <a href="#contact" className="ph-cta">
                Contact
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="ph-burger"
            aria-expanded={mobile}
            aria-controls="ph-mobile"
            aria-label="Menu"
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </nav>

        {/* Mega menu panels (desktop) */}
        <div className="mm" id="mm-ventures" hidden={open !== 'ventures'}>
          <div className="mm-inner mm-grid-4">
            <div className="mm-feature">
              <span className="mm-cut" style={{ backgroundImage: 'url(/images/hero/palms.webp)' }} aria-hidden>
                BUILD
              </span>
              <p className="mm-feature-title">Three businesses. One standard.</p>
              <p className="mm-muted">How technology, tax and real estate fit together.</p>
              <a href="#ventures" className="mm-more">
                Overview <ArrowRight size={16} aria-hidden />
              </a>
            </div>
            <a href="https://skopa.ai" target="_blank" rel="noopener" className="mm-card mm-venture">
              <span className="mm-venture-top">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo */}
                <img src="/images/brands/skopa-white.svg" alt="Skopa" className="mm-logo-skopa" width={104} height={35} />
                <ArrowUpRight size={16} aria-hidden />
              </span>
              <span className="mm-tag">Technology</span>
              <span className="mm-card-title">Skopa AG</span>
              <span className="mm-muted">Artificial intelligence and automation for businesses.</span>
              <span className="mm-meta">
                <span>{ROLES.skopa}</span>
                <span className="mm-url">skopa.ai</span>
              </span>
            </a>
            <a href="https://taxed.ch" target="_blank" rel="noopener" className="mm-card mm-venture">
              <span className="mm-venture-top">
                <span className="mm-logo-taxed">
                  {/* eslint-disable-next-line @next/next/no-img-element -- 3 KB icon */}
                  <img src="/images/brands/taxed-icon.webp" alt="" width={36} height={36} />
                  Taxed
                </span>
                <ArrowUpRight size={16} aria-hidden />
              </span>
              <span className="mm-tag">Tax</span>
              <span className="mm-card-title">Taxed GmbH</span>
              <span className="mm-muted">Tax advice for expats living in Switzerland.</span>
              <span className="mm-meta">
                <span>{ROLES.taxed}</span>
                <span className="mm-url">taxed.ch</span>
              </span>
            </a>
            <a href="#real-estate" className="mm-card mm-venture">
              <span className="mm-venture-top">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
                <img src="/images/brands/ef-real-estate-mark.svg" alt="" width={42} height={44} />
              </span>
              <span className="mm-tag">Private equity</span>
              <span className="mm-card-title">EF Real Estate</span>
              <span className="mm-muted">Residential property held as private equity.</span>
              <span className="mm-meta">
                <span>{ROLES.estate}</span>
              </span>
            </a>
          </div>
          <Strip />
        </div>

        <div className="mm" id="mm-writing" hidden={open !== 'writing'}>
          <div className="mm-inner mm-grid-writing">
            {featured ? (
              <a href={postHref(featured.slug)} className="mm-featured" hrefLang="de">
                <span className="mm-featured-img" style={{ backgroundImage: 'url(/images/hero/coast.webp)' }} aria-hidden />
                <span className="mm-featured-body">
                  <span className="mm-tag">
                    New · {fmtShort.format(featured.date)} · {featured.minutes} min · German
                  </span>
                  <span className="mm-featured-title" lang="de">
                    {featured.title}
                  </span>
                  <span className="mm-muted mm-clamp" lang="de">
                    {featured.description}
                  </span>
                </span>
              </a>
            ) : null}
            <div>
              <p className="mm-eyebrow">Latest articles</p>
              <ul className="mm-list">
                {more.map((p) => (
                  <li key={p.slug}>
                    <a href={postHref(p.slug)} className="mm-article" hrefLang="de">
                      <BookOpen size={16} aria-hidden />
                      <span>
                        <span className="mm-article-title" lang="de">
                          {p.title}
                        </span>
                        <span className="mm-article-meta">
                          {fmtShort.format(p.date)} · {p.minutes} min
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mm-eyebrow">Topics</p>
              <ul className="mm-list mm-topics">
                {topics.map((t) => (
                  <li key={t.href}>
                    <a href={t.href} className="mm-topic" hrefLang="de">
                      <span lang="de">{t.label}</span>
                      <span className="mm-count">{t.count}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <Link href="/de/blog/" className="mm-more" hrefLang="de">
                All articles ({total}) <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
          <Strip />
        </div>

        <div className="mm" id="mm-about" hidden={open !== 'about'}>
          <div className="mm-inner mm-grid-about">
            <a href="#about" className="mm-person">
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP */}
              <img
                src="/images/portraits/emanuel-aaron-flury-portrait.webp"
                alt="Emanuel Flury"
                width={714}
                height={1616}
                loading="lazy"
              />
              <span className="mm-person-body">
                <span className="mm-feature-title">Emanuel Flury</span>
                <span className="mm-tag">Entrepreneur · Grenchen</span>
                <span className="mm-quote">
                  Life <b>·</b> Lessons <b>·</b> Building companies
                </span>
              </span>
            </a>
            <div className="mm-stack">
              <a href="#about" className="mm-row">
                <span className="mm-icon">
                  <User size={20} aria-hidden />
                </span>
                <span>
                  <span className="mm-card-title">My story</span>
                  <span className="mm-muted">Where I come from and what I work on.</span>
                </span>
              </a>
              <a href="#writing" className="mm-row">
                <span className="mm-icon">
                  <BookOpen size={20} aria-hidden />
                </span>
                <span>
                  <span className="mm-card-title">Writing</span>
                  <span className="mm-muted">What I learn while building.</span>
                </span>
              </a>
              <a href={ARCHIVE_HREF} className="mm-row" hrefLang="de">
                <span className="mm-icon">
                  <Archive size={20} aria-hidden />
                </span>
                <span>
                  <span className="mm-card-title">eFlury Consulting (archive)</span>
                  <span className="mm-muted">The former consulting website, in German.</span>
                </span>
              </a>
            </div>
            <div>
              <p className="mm-eyebrow">Follow</p>
              <ul className="mm-list mm-social">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener me">
                      <span className="mm-social-name">
                        {s.name} <ArrowUpRight size={13} aria-hidden />
                      </span>
                      <span className="mm-handle">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href={`mailto:${EMAIL}`} className="mm-mail">
                <Mail size={16} aria-hidden /> {EMAIL}
              </a>
            </div>
          </div>
          <Strip />
        </div>

        {/* Mobile menu */}
        <div className="ph-mobile" id="ph-mobile" hidden={!mobile}>
          <details className="pm-group">
            <summary>
              Ventures <ChevronDown size={18} aria-hidden />
            </summary>
            <a href="https://skopa.ai" target="_blank" rel="noopener" onClick={closeMobile}>
              Skopa AG <ArrowUpRight size={14} aria-hidden />
            </a>
            <a href="https://taxed.ch" target="_blank" rel="noopener" onClick={closeMobile}>
              Taxed GmbH <ArrowUpRight size={14} aria-hidden />
            </a>
            <a href="#real-estate" onClick={closeMobile}>
              EF Real Estate
            </a>
          </details>
          <details className="pm-group">
            <summary>
              Writing <ChevronDown size={18} aria-hidden />
            </summary>
            {posts.map((p) => (
              <a key={p.slug} href={postHref(p.slug)} lang="de" hrefLang="de" onClick={closeMobile}>
                {p.title}
              </a>
            ))}
            <Link href="/de/blog/" className="pm-strong" hrefLang="de" onClick={closeMobile}>
              All articles (German)
            </Link>
          </details>
          <details className="pm-group">
            <summary>
              About <ChevronDown size={18} aria-hidden />
            </summary>
            <a href="#about" onClick={closeMobile}>
              My story
            </a>
            <a href={ARCHIVE_HREF} hrefLang="de" onClick={closeMobile}>
              eFlury Consulting (archive)
            </a>
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener me" onClick={closeMobile}>
                {s.name}
              </a>
            ))}
          </details>
          <a href="#contact" className="pm-cta" onClick={closeMobile}>
            Contact
          </a>
        </div>
      </header>
      <div className="mm-scrim" hidden={!open} onClick={closeAll} />
    </>
  );
}
