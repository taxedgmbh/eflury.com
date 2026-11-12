// Build-time fetch of a channel's public uploads via YouTube's free RSS feed.
// No API key. Runs on every build (the GitHub deploy action), so new public
// videos appear on the next deploy. Any failure returns [] and the section
// shows its empty state instead of breaking the build.
export const YT_CHANNEL_ID = 'UCB9BT6IbSYMkjvL6ZOyIVcw';
export const YT_HANDLE_URL = 'https://www.youtube.com/@emanuelflury';

export interface YtVideo { id: string; title: string; published: Date; isShort: boolean; poster?: string }

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

let cache: Promise<YtVideo[]> | undefined;

export function getLatestVideos(limit = 6): Promise<YtVideo[]> {
  cache ??= (async () => {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`, { signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) return [];
      const xml = await res.text();
      return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
        id: (e.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/) || [])[1] ?? '',
        title: decode((e.match(/<title>([\s\S]*?)<\/title>/) || [])[1] ?? ''),
        published: new Date((e.match(/<published>([^<]+)<\/published>/) || [])[1] ?? 0),
        isShort: /\/shorts\//.test((e.match(/<link rel="alternate" href="([^"]+)"/) || [])[1] ?? ''),
      })).filter((v) => v.id)
        .sort((a, b) => b.published.getTime() - a.published.getTime() || a.id.localeCompare(b.id));
    } catch {
      return [];
    }
  })();
  return cache.then((v) => v.slice(0, limit));
}
