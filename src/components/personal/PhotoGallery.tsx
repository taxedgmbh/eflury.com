'use client';

import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface Photo {
  /** Path without the -800/-1600.webp suffix. */
  base: string;
  alt: string;
  width: number;
  height: number;
}

const src = (p: Photo, w: 800 | 1600) => `${p.base}-${w}.webp`;
const srcSet = (p: Photo) => `${src(p, 800)} 800w, ${src(p, 1600)} 1600w`;

/**
 * A card cover that opens a full-screen gallery in a native <dialog>: Esc and
 * the backdrop close it, arrow keys page through, focus returns to the button.
 */
export function PhotoGallery({ photos, label }: { photos: Photo[]; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const cover = photos[0];

  const step = useCallback((d: number) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [step]);

  const open = () => {
    setIndex(0);
    dialog.current?.showModal();
  };

  const current = photos[index];

  return (
    <>
      <button type="button" className="re-cover" onClick={open} aria-label={`${label}: open ${photos.length} photos`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP with srcset */}
        <img
          src={src(cover, 800)}
          srcSet={srcSet(cover)}
          sizes="(max-width: 899px) 100vw, 360px"
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          loading="lazy"
          decoding="async"
        />
        <span className="re-cover-badge">
          <Images size={16} aria-hidden /> {photos.length} photos
        </span>
      </button>

      <dialog
        ref={dialog}
        className="pg"
        aria-label={`${label}, photos`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="pg-frame">
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP with srcset */}
          <img
            key={current.base}
            src={src(current, 1600)}
            srcSet={srcSet(current)}
            sizes="90vw"
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="pg-img"
          />
          <p className="pg-caption" aria-live="polite">
            {current.alt} · {index + 1} / {photos.length}
          </p>
          <button type="button" className="pg-btn pg-prev" onClick={() => step(-1)} aria-label="Previous photo">
            <ChevronLeft size={28} aria-hidden />
          </button>
          <button type="button" className="pg-btn pg-next" onClick={() => step(1)} aria-label="Next photo">
            <ChevronRight size={28} aria-hidden />
          </button>
          <button type="button" className="pg-btn pg-close" onClick={() => dialog.current?.close()} aria-label="Close">
            <X size={24} aria-hidden />
          </button>
        </div>
      </dialog>
    </>
  );
}
