import type { Metadata } from 'next';
import { ArrowUpRight, Mail, MessageCircle, Play, Contact } from 'lucide-react';
import { HeroNetwork } from './HeroNetwork';
import { BrandWord } from './BrandWord';
import { LinksClient } from './LinksClient';
import { NewsletterForm } from './NewsletterForm';
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
    images: [
      {
        url: '/images/og-en.png',
        width: 1200,
        height: 630,
        alt: 'Emanuel Flury · Entrepreneur',
      },
    ],
  },
};

const FILLS = ['palms', 'sky', 'arches', 'city'];

const utm = (url: string) => `${url}?utm_source=eflury.com&utm_medium=referral&utm_campaign=links`;
/** Partner brands. Logos are copies of their own, served from this site (no third-party requests). */
const PARTNERS = [
  {
    k: 'partner-mglow',
    name: 'Mesmerizing Glow',
    tag: 'Skincare · Philippines',
    text: 'Sunflower-powered skincare made in the Philippines. Glow the natural you.',
    href: utm('https://mglow.ph/'),
    cta: 'Visit mglow.ph',
    logo: { src: '/images/partners/mesmerizing-glow.webp', w: 192, h: 192 },
    light: true,
    stat: undefined as string | undefined,
  },
  {
    k: 'partner-mariyah',
    name: 'Mariyah Gaga',
    tag: 'Content creator · Philippines',
    text: 'Filipino content creator, licensed teacher and freediver.',
    // From her own site (mariyahgagaofficial.com, Nov 2026): followers across all platforms.
    stat: '1.03M followers',
    href: utm('https://mariyahgagaofficial.com/'),
    cta: 'Visit mariyahgagaofficial.com',
    logo: { src: '/images/partners/mariyah-gaga-white.svg', w: 1145, h: 679 },
    light: false,
  },
];

/** Follow tiles, most important first. net matches the ?s= source of the short addresses. */
const FOLLOW: { name: SocialName; net: string; cta: string; href?: string }[] = [
  { name: 'Instagram', net: 'instagram', cta: 'Follow' },
  {
    name: 'YouTube',
    net: 'youtube',
    cta: 'Subscribe',
    href: `${YT_HANDLE_URL}?sub_confirmation=1`,
  },
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
        {/* Round portrait in a brand ring, EF mark as a badge. */}
        <div className="lk-avatar">
          {/* eslint-disable-next-line @next/next/no-img-element -- 44 KB portrait, sized in CSS */}
          <img
            className="lk-avatar-img"
            src="/images/me/avatar-business-480.webp"
            alt="Emanuel Flury"
            width={480}
            height={480}
            fetchPriority="high"
          />
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
            <span
              key={f}
              className={`bh-fill bh-fill-${i + 1}`}
              style={{ backgroundImage: `url(/images/hero/${f}.webp)` }}
              aria-hidden
            >
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
          <BrandWord word="FOLLOW" img="palms" align="center" />
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

        <section className="lk-sec" aria-labelledby="lk-watch-title">
          <BrandWord word="WATCH" img="city" align="center" />
          <p className="lk-eyebrow" id="lk-watch-title">
            On YouTube
          </p>
          <h2 className="lk-h2">The latest video.</h2>
          <a
            className="lk-video"
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener"
            data-k="video"
          >
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
        </section>

        <section className="lk-sec" aria-labelledby="lk-me-title">
          <p className="lk-eyebrow" id="lk-me-title">
            About me
          </p>
          <h2 className="lk-h2">The person behind it.</h2>
          <a className="lk-video lk-me" href="/en/#about" data-k="about">
            <span className="lk-video-thumb lk-me-photo">
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP */}
              <img
                src="/images/me/sofa-thinking-800.webp"
                alt="Emanuel Flury on a sofa, thinking"
                width={800}
                height={1067}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="lk-video-text">
              <small>My story</small>
              <b>Finance, automation and building my own companies.</b>
            </span>
          </a>
        </section>

        {/* Same names, tags, texts and logos as the Ventures section on eflury.com. */}
        <section className="lk-ventures" aria-labelledby="lk-ventures-title">
          <BrandWord word="BUILD" img="dusk" align="center" />
          <p className="lk-eyebrow" id="lk-ventures-title">
            Ventures
          </p>
          <h2 className="lk-h2">Three businesses. One standard.</h2>
          {ventures('en').map((v) => {
            const external = /^https?:/.test(v.href);
            const href = external ? v.href.replace('utm_campaign=ventures', 'utm_campaign=links') : v.href;
            const k = v.name.startsWith('Skopa') ? 'skopa' : v.name.startsWith('Taxed') ? 'taxed' : 'estate';
            return (
              <a
                key={v.name}
                className="lk-venture"
                href={href}
                data-k={k}
                {...(external ? { target: '_blank', rel: 'noopener' } : {})}
              >
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

        <section className="lk-ventures" aria-labelledby="lk-partners-title">
          <BrandWord word="PARTNER" img="arches" align="center" />
          <p className="lk-eyebrow" id="lk-partners-title">
            Partners
          </p>
          <h2 className="lk-h2">Brands I work with.</h2>
          {PARTNERS.map((p) => (
            <a key={p.name} className="lk-venture" href={p.href} data-k={p.k} target="_blank" rel="noopener">
              <span className={`lk-v-logo${p.light ? ' lk-v-logo-light' : ''}`} aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element -- small partner logo */}
                <img src={p.logo.src} alt="" width={p.logo.w} height={p.logo.h} />
              </span>
              <span className="lk-v-text">
                <small>{p.tag}</small>
                <b>{p.name}</b>
                {p.stat && <i className="lk-stat">{p.stat}</i>}
                <span>{p.text}</span>
                <em>
                  {p.cta} <ArrowUpRight size={14} aria-hidden />
                </em>
                <span className="lk-sr"> (opens in a new tab)</span>
              </span>
            </a>
          ))}
        </section>

        <section className="lk-sec" aria-labelledby="lk-touch-title">
          <BrandWord word="CONNECT" img="sunset" align="center" />
          <p className="lk-eyebrow" id="lk-touch-title">
            Get in touch
          </p>
          <h2 className="lk-h2">Let’s talk.</h2>
          <ul className="lk-touch">
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

        {/* Email sign-up right on the page (double opt-in, same form as the homepage). */}
        <section className="lk-nl" aria-labelledby="lk-nl-title" data-ksubmit="newsletter">
          <span className="lk-nl-ic" aria-hidden>
            <Mail size={22} />
          </span>
          <h2 className="lk-h2" id="lk-nl-title">
            Get my notes by email
          </h2>
          <p className="lk-nl-lead">
            What I learn while building: tech, tax and real estate. Free, no spam, unsubscribe anytime.
          </p>
          <NewsletterForm id="nl-links" lang="en" />
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
