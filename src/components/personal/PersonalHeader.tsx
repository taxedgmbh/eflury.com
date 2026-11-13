'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  Newspaper,
  NotebookPen,
  Sunset,
  User,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { EMAIL, PHONE, ROLES, SOCIALS, WHATSAPP } from './data';
import { home, pick, PAGES, type Lang } from '@/lib/i18n';

type Panel = 'ventures' | 'about';

function Strip({ lang }: { lang: Lang }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  return (
    <div className="mm-strip">
      <div className="mm-strip-inner">
        <span className="mm-rule" aria-hidden />
        <span>
          TECH <b>·</b> TAX <b>·</b> REAL ESTATE
        </span>
        <a href={home(lang, 'contact')}>
          {t('Start a conversation', 'Gespräch beginnen')} <ArrowRight size={14} aria-hidden />
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
 * panel closes it. In-page links are written as /en/#… (or /de/#…) so the
 * same header works on every page. `alt` is the same page in the other
 * language, for the EN/DE switch.
 */
export function PersonalHeader({ lang = 'en', alt }: { lang?: Lang; alt?: string }) {
  const t = (en: string, de: string) => pick(lang, en, de);
  const other: Lang = lang === 'de' ? 'en' : 'de';
  const altHref = alt ?? PAGES.home[other];
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
        <nav className="ph-inner" aria-label={t('Main', 'Hauptnavigation')}>
          <a href={home(lang)} className="ph-brand">
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
            <img src="/images/ef-mark-white.svg" alt="" width={35} height={28} />
            <span>Emanuel Flury</span>
          </a>

          <ul className="ph-links">
            <li>{trigger('ventures', t('Ventures', 'Unternehmen'))}</li>
            <li>{trigger('about', t('About', 'Über mich'))}</li>
            <li>
              <a href={altHref} className="ph-lang" hrefLang={other} lang={other} aria-label={t('Deutsch', 'English')}>
                {other.toUpperCase()}
              </a>
            </li>
            <li>
              <a href={home(lang, 'contact')} className="ph-cta">
                {t('Contact', 'Kontakt')}
              </a>
            </li>
          </ul>

          <a href={altHref} className="ph-lang ph-lang-mob" hrefLang={other} lang={other} aria-label={t('Deutsch', 'English')}>
            {other.toUpperCase()}
          </a>
          <button
            type="button"
            className="ph-burger"
            aria-expanded={mobile}
            aria-controls="ph-mobile"
            aria-label={t('Menu', 'Menü')}
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
              <p className="mm-feature-title">{t('Three businesses. One standard.', 'Drei Unternehmen. Ein Anspruch.')}</p>
              <p className="mm-muted">
                {t('How technology, tax and real estate fit together.', 'Wie Technologie, Steuern und Immobilien zusammenpassen.')}
              </p>
              <a href={home(lang, 'ventures')} className="mm-more">
                {t('Overview', 'Übersicht')} <ArrowRight size={16} aria-hidden />
              </a>
            </div>
            <a href="https://skopa.ai" target="_blank" rel="noopener" className="mm-card mm-venture">
              <span className="mm-venture-top">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo */}
                <img src="/images/brands/skopa-white.svg" alt="Skopa" className="mm-logo-skopa" width={104} height={35} />
                <ArrowUpRight size={16} aria-hidden />
              </span>
              <span className="mm-tag">{t('Technology', 'Technologie')}</span>
              <span className="mm-card-title">Skopa AG</span>
              <span className="mm-muted">{t('Artificial intelligence and quantum computing.', 'Künstliche Intelligenz und Quantencomputing.')}</span>
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
              <span className="mm-tag">{t('Tax', 'Steuern')}</span>
              <span className="mm-card-title">Taxed GmbH</span>
              <span className="mm-muted">{t('Tax advice for expats living in Switzerland.', 'Steuerberatung für Expats in der Schweiz.')}</span>
              <span className="mm-meta">
                <span>{ROLES.taxed}</span>
                <span className="mm-url">taxed.ch</span>
              </span>
            </a>
            <a href={home(lang, 'real-estate')} className="mm-card mm-venture">
              <span className="mm-venture-top">
                {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
                <img src="/images/brands/ef-real-estate-mark.svg" alt="" width={42} height={44} />
                <ArrowUpRight size={16} aria-hidden />
              </span>
              <span className="mm-tag">Private Equity</span>
              <span className="mm-card-title">EF Real Estate</span>
              <span className="mm-muted">{t('Residential property held as private equity.', 'Wohnimmobilien als Private Equity.')}</span>
              <span className="mm-meta">
                <span>{t(ROLES.estate, 'Eigentümer')}</span>
              </span>
            </a>
          </div>
          <Strip lang={lang} />
        </div>

        <div className="mm" id="mm-about" hidden={open !== 'about'}>
          <div className="mm-inner mm-grid-about">
            <a href={home(lang, 'about')} className="mm-person">
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
                <span className="mm-tag">{t('Entrepreneur · Grenchen', 'Unternehmer · Grenchen')}</span>
                <span className="mm-quote">
                  {t('Life', 'Leben')} <b>·</b> {t('Lessons', 'Lernen')} <b>·</b> {t('Building companies', 'Unternehmen aufbauen')}
                </span>
              </span>
            </a>
            <div className="mm-stack">
              <a href={home(lang, 'about')} className="mm-row">
                <span className="mm-icon">
                  <User size={20} aria-hidden />
                </span>
                <span>
                  <span className="mm-card-title">{t('My story', 'Meine Geschichte')}</span>
                  <span className="mm-muted">{t('Where I come from and what I work on.', 'Woher ich komme und woran ich arbeite.')}</span>
                </span>
              </a>
              <a href={home(lang, 'private')} className="mm-row">
                <span className="mm-icon">
                  <Sunset size={20} aria-hidden />
                </span>
                <span>
                  <span className="mm-card-title">{t('Private', 'Privat')}</span>
                  <span className="mm-muted">{t('Beyond work: French and sailing.', 'Neben der Arbeit: Französisch und Segeln.')}</span>
                </span>
              </a>
              <Link href={PAGES.notes[lang]} className="mm-row">
                <span className="mm-icon">
                  <NotebookPen size={20} aria-hidden />
                </span>
                <span>
                  <span className="mm-card-title">{t('Notes', 'Notizen')}</span>
                  <span className="mm-muted">{t('What I learn while building, also by email.', 'Was ich beim Aufbauen lerne, auch per E-Mail.')}</span>
                </span>
              </Link>
              <a href={home(lang, 'press')} className="mm-row">
                <span className="mm-icon">
                  <Newspaper size={20} aria-hidden />
                </span>
                <span>
                  <span className="mm-card-title">{t('Press kit', 'Pressemappe')}</span>
                  <span className="mm-muted">{t('Bios, portrait and contact card.', 'Kurzbiografien, Porträt und Kontaktkarte.')}</span>
                </span>
              </a>
            </div>
            <div>
              <p className="mm-eyebrow">{t('Follow', 'Folgen')}</p>
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
              <a href={WHATSAPP} target="_blank" rel="noopener" className="mm-mail">
                <MessageCircle size={16} aria-hidden /> WhatsApp {PHONE}
              </a>
            </div>
          </div>
          <Strip lang={lang} />
        </div>

        {/* Mobile menu */}
        <div className="ph-mobile" id="ph-mobile" hidden={!mobile}>
          <details className="pm-group">
            <summary>
              {t('Ventures', 'Unternehmen')} <ChevronDown size={18} aria-hidden />
            </summary>
            <a href="https://skopa.ai" target="_blank" rel="noopener" onClick={closeMobile}>
              Skopa AG <ArrowUpRight size={14} aria-hidden />
            </a>
            <a href="https://taxed.ch" target="_blank" rel="noopener" onClick={closeMobile}>
              Taxed GmbH <ArrowUpRight size={14} aria-hidden />
            </a>
            <a href={home(lang, 'real-estate')} onClick={closeMobile}>
              EF Real Estate <ArrowUpRight size={14} aria-hidden />
            </a>
          </details>
          <details className="pm-group">
            <summary>
              {t('About', 'Über mich')} <ChevronDown size={18} aria-hidden />
            </summary>
            <a href={home(lang, 'about')} onClick={closeMobile}>
              {t('My story', 'Meine Geschichte')}
            </a>
            <a href={home(lang, 'private')} onClick={closeMobile}>
              {t('Private', 'Privat')}
            </a>
            <Link href={PAGES.notes[lang]} onClick={closeMobile}>
              {t('Notes', 'Notizen')}
            </Link>
            <a href={home(lang, 'press')} onClick={closeMobile}>
              {t('Press kit', 'Pressemappe')}
            </a>
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener me" onClick={closeMobile}>
                {s.name}
              </a>
            ))}
          </details>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="pm-wa" onClick={closeMobile}>
            <MessageCircle size={18} aria-hidden /> WhatsApp
          </a>
          <a href={altHref} className="pm-lang" hrefLang={other} lang={other}>
            {t('Deutsch', 'English')}
          </a>
          <a href={home(lang, 'contact')} className="pm-cta" onClick={closeMobile}>
            {t('Contact', 'Kontakt')}
          </a>
        </div>
      </header>
      <div className="mm-scrim" hidden={!open} onClick={closeAll} />
    </>
  );
}
