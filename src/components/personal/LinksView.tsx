import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Mail, MessageCircle, Play, Contact } from 'lucide-react';
import { HeroNetwork } from './HeroNetwork';
import { LinksClient } from './LinksClient';
import { SocialIcon } from './SocialIcon';
import { SOCIALS, WHATSAPP, type SocialName } from './data';
import { ventures } from './PersonalHome';
import { getLatestVideos, PINNED_VIDEO, YT_HANDLE_URL } from '@/lib/youtube';

/*
 * Link-in-bio page, self-made instead of Linktree or Beacons: /en/links/,
 * reached from the bios via eflury.com/tiktok, /insta, /yt, /x (see next.config.ts).
 * A small version of the homepage hero (network, brand rules, EF mark, photo-filled
 * name), then the links. Not in the search index: the homepage is the page to rank.
 */
export const linksMetadata: Metadata = {
  title: { absolute: 'Emanuel Flury · Links' },
  description: 'Videos, notes, LIVE and contact: all links of Emanuel Flury in one place.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/en/links/' },
  openGraph: {
    type: 'profile',
    url: '/en/links/',
    title: 'Emanuel Flury · Links',
    description: 'Videos, notes, LIVE and contact: all links of Emanuel Flury in one place.',
    siteName: 'Emanuel Flury',
    locale: 'en_GB',
    images: [{ url: '/images/og-en.png', width: 1200, height: 630, alt: 'Emanuel Flury · Entrepreneur' }],
  },
};

const FILLS = ['palms', 'sky', 'arches', 'city'];

/** Follow tiles, most important first. net matches the ?s= source of the short addresses. */
const FOLLOW: { name: SocialName; net: string; cta: string; href?: string }[] = [
  { name: 'Instagram', net: 'instagram', cta: 'Follow' },
  { name: 'YouTube', net: 'youtube', cta: 'Subscribe', href: `${YT_HANDLE_URL}?sub_confirmation=1` },
  { name: 'TikTok', net: 'tiktok', cta: 'Follow' },
  { name: 'LinkedIn', net: 'linkedin', cta: 'Connect' },
  { name: 'X', net: 'x', cta: 'Follow' },
  { name: 'Facebook', net: 'facebook', cta: 'Follow' },
  { name: 'GitHub', net: 'github', cta: 'Follow' },
];
const SOCIAL_KEY = {
  LinkedIn: 'social-linkedin',
  Instagram: 'social-instagram',
  TikTok: 'social-tiktok',
  YouTube: 'social-youtube',
  X: 'social-x',
  Facebook: 'social-facebook',
  GitHub: 'social-github',
} as const;

function Rule({ flip = false }: { flip?: boolean }) {
  return (
    <svg className={`lk-rule ${flip ? 'lk-rule-br' : 'lk-rule-tl'}`} viewBox="0 0 520 60" aria-hidden>
      {flip ? (
        <>
          <line className="bh-line" x1="520" y1="16" x2="20" y2="16" />
          <circle className="bh-dot" cx="20" cy="16" r="7" />
          <line className="bh-line bh-line-2" x1="520" y1="50" x2="220" y2="50" />
          <circle className="bh-dot bh-dot-2" cx="220" cy="50" r="7" />
        </>
      ) : (
        <>
          <line className="bh-line" x1="0" y1="10" x2="500" y2="10" />
          <circle className="bh-dot" cx="500" cy="10" r="7" />
          <line className="bh-line bh-line-2" x1="0" y1="44" x2="300" y2="44" />
          <circle className="bh-dot bh-dot-2" cx="300" cy="44" r="7" />
        </>
      )}
    </svg>
  );
}

export async function LinksView() {
  const [latest] = await getLatestVideos(1);
  const video = latest ?? PINNED_VIDEO;
  const thumb =
    video.id === PINNED_VIDEO.id && PINNED_VIDEO.thumb
      ? PINNED_VIDEO.thumb.small
      : `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;

  return (
    <div className="pb lk">
      <div className="lk-bg" aria-hidden>
        <HeroNetwork />
        <div className="bh-vignette" />
      </div>

      <header className="lk-hero">
        <Rule />
        <Rule flip />
        {/* Cut-out portrait (press kit) popping out of a brand circle, EF mark as a badge. */}
        <div className="lk-avatar">
          {/* eslint-disable-next-line @next/next/no-img-element -- 38 KB cut-out, sized in CSS */}
          <img className="lk-avatar-img" src="/images/me/avatar-cutout-480.webp" alt="Emanuel Flury" width={480} height={480} fetchPriority="high" />
          <span className="lk-avatar-mark" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
            <img src="/images/ef-mark-white.svg" alt="" width={250} height={200} />
          </span>
        </div>
        <div className="bh-word lk-word">
          <h1 className="bh-fill bh-fill-0" style={{ backgroundImage: `url(/images/hero/${FILLS[0]}.webp)` }}>
            EMANUEL
            <br /> FLURY
          </h1>
          {FILLS.slice(1).map((f, i) => (
            <span key={f} className={`bh-fill bh-fill-${i + 1}`} style={{ backgroundImage: `url(/images/hero/${f}.webp)` }} aria-hidden>
              EMANUEL
              <br />
              FLURY
            </span>
          ))}
        </div>
        <p className="lk-sub">ENTREPRENEUR</p>
        <p className="lk-lead">Tech · Tax · Real Estate</p>
        <p className="lk-place">Grenchen, Switzerland</p>
      </header>

      <main className="lk-list">
        <LinksClient />

        {/* Following comes first: that is what the bio link is for. The platform the
            visitor came from is hidden (LinksClient sets data-src on .lk). */}
        <section className="lk-followbox" aria-labelledby="lk-follow-title">
          <p className="lk-eyebrow" id="lk-follow-title">
            Follow me
          </p>
          <h2 className="lk-h2">Follow the journey.</h2>
          <ul className="lk-follow">
            {FOLLOW.map((f) => {
              const s = SOCIALS.find((x) => x.name === f.name)!;
              return (
                <li key={f.name} data-net={f.net}>
                  <a href={f.href ?? s.href} target="_blank" rel="noopener me" data-k={SOCIAL_KEY[f.name]}>
                    <span className="lk-f-ic" aria-hidden>
                      <SocialIcon name={f.name} size={22} />
                    </span>
                    <span className="lk-f-text">
                      <b>{f.name}</b>
                      <small>{s.handle}</small>
                    </span>
                    <span className="lk-f-cta">{f.cta}</span>
                    <span className="lk-sr"> (opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <a className="lk-video" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener" data-k="video">
          <span className="lk-video-thumb">
            {/* eslint-disable-next-line @next/next/no-img-element -- small remote thumbnail */}
            <img src={thumb} alt="" width={320} height={180} loading="eager" />
            <span className="lk-video-play" aria-hidden>
              <Play size={20} fill="currentColor" />
            </span>
          </span>
          <span className="lk-video-text">
            <small>Latest video</small>
            <b>{video.title}</b>
          </span>
          <span className="lk-sr"> (opens in a new tab)</span>
        </a>

        {/* Same names, tags, texts and logos as the Ventures section on eflury.com. */}
        <section className="lk-ventures" aria-labelledby="lk-ventures-title">
          <p className="lk-eyebrow" id="lk-ventures-title">
            Ventures
          </p>
          <h2 className="lk-h2">Three businesses. One standard.</h2>
          {ventures('en').map((v) => {
            const external = !v.href.startsWith('#');
            const href = external ? v.href.replace('utm_campaign=ventures', 'utm_campaign=links') : `/en/${v.href}`;
            const k = v.name.startsWith('Skopa') ? 'skopa' : v.name.startsWith('Taxed') ? 'taxed' : 'estate';
            return (
              <a key={v.name} className="lk-venture" href={href} data-k={k} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
                <span className="lk-v-logo" aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element -- small brand mark */}
                  <img src={v.logo.src} alt="" width={v.logo.w} height={v.logo.h} />
                </span>
                <span className="lk-v-text">
                  <small>{v.tag}</small>
                  <b>{v.name}</b>
                  <span>{v.text}</span>
                  <em>
                    {v.cta} <ArrowUpRight size={14} aria-hidden />
                  </em>
                  {external && <span className="lk-sr"> (opens in a new tab)</span>}
                </span>
              </a>
            );
          })}
        </section>

        <section aria-labelledby="lk-touch-title">
          <p className="lk-eyebrow" id="lk-touch-title">
            Get in touch
          </p>
          <ul className="lk-touch">
            <li>
              <Link href="/en/notes/#nl-notes-title" data-k="newsletter">
                <Mail size={22} aria-hidden />
                <span>Notes by email</span>
              </Link>
            </li>
            <li>
              <a href={WHATSAPP} target="_blank" rel="noopener" data-k="whatsapp">
                <MessageCircle size={22} aria-hidden />
                <span>WhatsApp</span>
                <span className="lk-sr"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href="/press/emanuel-flury.vcf" data-k="contact">
                <Contact size={22} aria-hidden />
                <span>Save contact</span>
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="lk-foot">
        <a href="/en/">eflury.com</a>
        <a href="/en/imprint/">Imprint</a>
        <a href="/en/privacy/">Privacy</a>
      </footer>
    </div>
  );
}
