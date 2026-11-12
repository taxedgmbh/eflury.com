import 'server-only';

/**
 * The channel's public uploads via YouTube's free RSS feed. No API key.
 * Ported from astro-src/src/lib/youtube.ts.
 *
 * The Astro version fetched once per build. Here the homepage revalidates the
 * feed every six hours, so a newly published video appears without a deploy.
 * Any failure returns [] and the section shows its empty state; it never
 * breaks the build or the page.
 */
export const YT_CHANNEL_ID = 'UCB9BT6IbSYMkjvL6ZOyIVcw';
export const YT_HANDLE_URL = 'https://www.youtube.com/@emanuelflury';

export interface YtVideo {
  id: string;
  title: string;
  published: Date;
  isShort: boolean;
  /** Own thumbnail served from this site, instead of YouTube's auto frame. */
  thumb?: { src: string; small: string };
}

/**
 * Always shown first, whether or not the RSS feed lists it yet: YouTube's
 * channel feed can lag a new upload by hours, and the intro should lead the
 * section even after newer uploads.
 */
export const PINNED_VIDEO: YtVideo = {
  id: 'tH6VlyiJkv4',
  title: 'Who is Emanuel Flury? Tech, tax and real estate in 70 seconds',
  published: new Date('2026-11-12T16:15:49Z'),
  isShort: false,
  thumb: { src: '/images/me/intro-video-1280.webp', small: '/images/me/intro-video-640.webp' },
};

/** The pinned intro first, then the newest other uploads from the feed. */
export async function getSectionVideos(limit = 3): Promise<YtVideo[]> {
  const feed = await getLatestVideos(limit + 1);
  return [PINNED_VIDEO, ...feed.filter((v) => v.id !== PINNED_VIDEO.id)].slice(0, limit);
}

const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

export async function getLatestVideos(limit = 6): Promise<YtVideo[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 21600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, e]) => ({
        id: (e.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/) || [])[1] ?? '',
        title: decode((e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] ?? ''),
        published: new Date((e.match(/<published>([^<]+)<\/published>/) || [])[1] ?? 0),
        isShort: /\/shorts\//.test((e.match(/<link rel="alternate" href="([^"]+)"/) || [])[1] ?? ''),
      }))
      .filter((v) => v.id)
      .sort((a, b) => b.published.getTime() - a.published.getTime() || a.id.localeCompare(b.id))
      .slice(0, limit);
  } catch {
    return [];
  }
}
