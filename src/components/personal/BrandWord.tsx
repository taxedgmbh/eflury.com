'use client';

import { useEffect, useRef } from 'react';

/**
 * The photo-in-letters word from the social media rows (BUILD, DREAM, LEAD …).
 * Decorative: the section's real heading stays in its <h2>.
 *
 * Fades in once it scrolls into view; shown at once for reduced motion.
 */
export function BrandWord({
  word,
  img,
  align = 'left',
}: {
  word: string;
  img: string;
  align?: 'left' | 'center';
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el?.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      aria-hidden
      className={`bw bw-${align}`}
      style={{ backgroundImage: `url(/images/hero/${img}.webp)` }}
    >
      {word}
    </p>
  );
}
