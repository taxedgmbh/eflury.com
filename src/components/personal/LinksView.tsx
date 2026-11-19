import type { Metadata } from 'next';
import { ArrowUpRight, Mail, MessageCircle, Play, Contact, Globe, FileText, Receipt, Atom } from 'lucide-react';
import { HeroNetwork } from './HeroNetwork';
import { LinksClient } from './LinksClient';
import { SocialIcon } from './SocialIcon';
import { SOCIALS, WHATSAPP } from './data';
import { getNotes } from '@/lib/notes';
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

function Btn({
  k,
  href,
  icon,
  title,
  sub,
  external = true,
}: {
  k: string;
  href: string;
  icon: React.ReactNode;
  title: string;
  sub?: string;
  external?: boolean;
}) {
  return (
    <a className="lk-btn" href={href} data-k={k} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      <span className="lk-ic" aria-hidden>
        {icon}
      </span>
      <span className="lk-btn-text">
        <b>{title}</b>
        {sub && <small>{sub}</small>}
      </span>
      <ArrowUpRight className="lk-arrow" size={18} aria-hidden />
    </a>
  );
}

export async function LinksView() {
  const [latest] = await getLatestVideos(1);
  const video = latest ?? PINNED_VIDEO;
  const thumb =
    video.id === PINNED_VIDEO.id && PINNED_VIDEO.thumb
      ? PINNED_VIDEO.thumb.small
      : `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;
  const note = getNotes('en')[0];

  return (
    <div className="pb lk">
      <div className="lk-bg" aria-hidden>
        <HeroNetwork />
        <div className="bh-vignette" />
      </div>

      <header className="lk-hero">
        <Rule />
        <Rule flip />
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG mark */}
        <img className="lk-mark" src="/images/ef-mark-white.svg" alt="" width={250} height={200} />
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
        </a>

        <Btn k="newsletter" href="/en/notes/#nl-notes-title" icon={<Mail size={20} />} title="Get my notes by email" sub="Free · tech, tax and real estate" external={false} />
        <Btn k="youtube" href={`${YT_HANDLE_URL}?sub_confirmation=1`} icon={<Play size={20} />} title="Subscribe on YouTube" sub="@emanuelflury" />
        {note && (
          <Btn k="note" href={`/en/notes/${note.slug}/`} icon={<FileText size={20} />} title={note.title} sub="Latest note" external={false} />
        )}
        <Btn k="taxed" href="https://taxed.ch" icon={<Receipt size={20} />} title="Tax help for expats" sub="Taxed GmbH · Biel/Bienne" />
        <Btn k="skopa" href="https://skopa.ai" icon={<Atom size={20} />} title="AI and quantum computing" sub="Skopa AG · Grenchen" />
        <Btn k="whatsapp" href={WHATSAPP} icon={<MessageCircle size={20} />} title="Message me on WhatsApp" />
        <Btn k="contact" href="/press/emanuel-flury.vcf" icon={<Contact size={20} />} title="Save my contact" sub="Adds me to your phone" external={false} />
        <Btn k="website" href="/en/" icon={<Globe size={20} />} title="eflury.com" sub="My story, ventures and press kit" external={false} />

        <ul className="lk-social" aria-label="Follow">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener me" aria-label={`${s.name} ${s.handle}`} title={s.name} data-k={SOCIAL_KEY[s.name]}>
                <SocialIcon name={s.name} size={20} />
              </a>
            </li>
          ))}
        </ul>
      </main>

      <footer className="lk-foot">
        <a href="/en/">eflury.com</a>
        <a href="/en/imprint/">Imprint</a>
        <a href="/en/privacy/">Privacy</a>
      </footer>
    </div>
  );
}
