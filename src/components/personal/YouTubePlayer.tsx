'use client';

import { Play } from 'lucide-react';
import { useState } from 'react';

/**
 * Click-to-play: nothing is loaded from YouTube's player until the visitor
 * asks for it, and then from youtube-nocookie.com. Before that the page only
 * shows the thumbnail image.
 */
export function YouTubePlayer({
  id,
  title,
  src,
  fallback,
  width,
  height,
  size,
}: {
  id: string;
  title: string;
  src: string;
  fallback?: string;
  width: number;
  height: number;
  size: number;
}) {
  const [playing, setPlaying] = useState(false);
  const label = `Play video: ${title}`;

  if (playing) {
    return (
      <iframe
        className="yt-frame"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={label}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" className="yt-player" aria-label={label} onClick={() => setPlaying(true)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote thumbnail; next/image is unoptimised on App Hosting */}
      <img
        src={src}
        alt=""
        loading="lazy"
        width={width}
        height={height}
        // maxresdefault does not exist for every upload; fall back to hqdefault.
        onError={
          fallback
            ? (e) => {
                if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
              }
            : undefined
        }
      />
      <span className={`yt-play${size < 30 ? ' yt-play-sm' : ''}`}>
        <Play size={size} aria-hidden />
      </span>
    </button>
  );
}
