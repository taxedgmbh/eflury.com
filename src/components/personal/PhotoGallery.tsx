"use client";

import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface Photo {
  /** Path without the -800/-1600.webp suffix. */
  base: string;
  alt: string;
  width: number;
  height: number;
}

const GALLERY_TEXT = {
  en: {
    photos: "photos",
    openOne: (alt: string, i: number, n: number) => `${alt}: open photo ${i} of ${n}`,
    openAll: (label: string, n: number) => `${label}: open ${n} photos`,
    prev: "Previous photo",
    next: "Next photo",
    close: "Close",
  },
  de: {
    photos: "Fotos",
    openOne: (alt: string, i: number, n: number) => `${alt}: Foto ${i} von ${n} öffnen`,
    openAll: (label: string, n: number) => `${label}: ${n} Fotos öffnen`,
    prev: "Vorheriges Foto",
    next: "Nächstes Foto",
    close: "Schliessen",
  },
  fr: {
    photos: "photos",
    openOne: (alt: string, i: number, n: number) => `${alt} : ouvrir la photo ${i} sur ${n}`,
    openAll: (label: string, n: number) => `${label} : ouvrir les ${n} photos`,
    prev: "Photo précédente",
    next: "Photo suivante",
    close: "Fermer",
  },
};

const src = (p: Photo, w: 800 | 1600) => `${p.base}-${w}.webp`;
const srcSet = (p: Photo) => `${src(p, 800)} 800w, ${src(p, 1600)} 1600w`;

/**
 * A card cover that opens a full-screen gallery in a native <dialog>: Esc and
 * the backdrop close it, arrow keys page through, focus returns to the button.
 */
export function PhotoGallery({
  photos,
  label,
  layout = "cover",
  lang = "en",
}: {
  photos: Photo[];
  label: string;
  /** cover: one image with a count badge. strip: every photo as a thumbnail. */
  layout?: "cover" | "strip";
  lang?: "en" | "de" | "fr";
}) {
  const L = GALLERY_TEXT[lang];
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  // The full-size image only exists while the dialog is open; rendered up
  // front, React preloads it and it competes with the hero for bandwidth.
  const [isOpen, setIsOpen] = useState(false);
  const cover = photos[0];

  const step = useCallback(
    (d: number) => setIndex((i) => (i + d + photos.length) % photos.length),
    [photos.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIsOpen(false);
    el.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("close", onClose);
    };
  }, [step]);

  const open = (i = 0) => {
    setIndex(i);
    setIsOpen(true);
    dialog.current?.showModal();
  };

  const current = photos[index];

  return (
    <>
      {layout === "strip" ? (
        <ul className="ps">
          {photos.map((p, i) => (
            <li key={p.base}>
              <button
                type="button"
                className="ps-item"
                onClick={() => open(i)}
                aria-label={L.openOne(p.alt, i + 1, photos.length)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP with srcset */}
                <img
                  src={src(p, 800)}
                  srcSet={srcSet(p)}
                  sizes="(max-width: 767px) 45vw, 220px"
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <button
            type="button"
            className="re-cover"
            onClick={() => open(0)}
            aria-label={L.openAll(label, photos.length)}
          >
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
              <Images size={16} aria-hidden /> {photos.length} {L.photos}
            </span>
          </button>
        </>
      )}

      <dialog
        ref={dialog}
        className="pg"
        aria-label={`${label}, ${L.photos}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="pg-frame">
          {isOpen ? (
            <>
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
            </>
          ) : null}
          <p className="pg-caption" aria-live="polite">
            {current.alt} · {index + 1} / {photos.length}
          </p>
          <button
            type="button"
            className="pg-btn pg-prev"
            onClick={() => step(-1)}
            aria-label={L.prev}
          >
            <ChevronLeft size={28} aria-hidden />
          </button>
          <button
            type="button"
            className="pg-btn pg-next"
            onClick={() => step(1)}
            aria-label={L.next}
          >
            <ChevronRight size={28} aria-hidden />
          </button>
          <button
            type="button"
            className="pg-btn pg-close"
            onClick={() => dialog.current?.close()}
            aria-label={L.close}
          >
            <X size={24} aria-hidden />
          </button>
        </div>
      </dialog>
    </>
  );
}
