'use client';

import { useEffect, useState } from 'react';

const SOURCES = ['tiktok', 'instagram', 'youtube', 'x', 'facebook', 'linkedin'];
export const TIKTOK_LIVE = 'https://www.tiktok.com/@emanuelflury/live';

function source() {
  try {
    const s = new URLSearchParams(location.search).get('s') || '';
    return SOURCES.includes(s) ? s : 'direct';
  } catch {
    return 'direct';
  }
}

/** Anonymous count: which button, from which platform. No cookies, no IDs. */
function beacon(k: string) {
  const body = JSON.stringify({ k, s: source() });
  try {
    if (navigator.sendBeacon?.('/api/links/', new Blob([body], { type: 'text/plain' }))) return;
  } catch {}
  fetch('/api/links/', { method: 'POST', body, keepalive: true }).catch(() => {});
}

/**
 * Counts the page view and every link tap (links carry data-k), and shows the
 * red "LIVE now" button while the LIVE remote has it switched on.
 */
export function LinksClient() {
  const [onAir, setOnAir] = useState(false);

  useEffect(() => {
    beacon('view');
    // Hide the follow tile of the platform the visitor came from.
    document.querySelector('.lk')?.setAttribute('data-src', source());
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLElement>('[data-k]');
      if (a?.dataset.k) beacon(a.dataset.k);
    };
    document.addEventListener('click', onClick);
    let t = 0;
    const check = async () => {
      window.clearTimeout(t);
      try {
        const r = await fetch('/api/links/', { cache: 'no-store' });
        if (r.ok) setOnAir(!!(await r.json()).onAir);
      } catch {}
      t = window.setTimeout(check, document.hidden ? 120000 : 30000);
    };
    check();
    const vis = () => !document.hidden && check();
    document.addEventListener('visibilitychange', vis);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', vis);
      window.clearTimeout(t);
    };
  }, []);

  if (!onAir) return null;
  return (
    <a className="lk-btn lk-live" href={TIKTOK_LIVE} target="_blank" rel="noopener" data-k="live">
      <span className="lk-live-dot" aria-hidden />
      <span className="lk-btn-text">
        <b>I’m LIVE on TikTok now</b>
        <small>Tap to join</small>
      </span>
    </a>
  );
}
