import { photo } from '@/lib/photos';

/**
 * A 16:9 photograph for a post row or card.
 *
 * No scrim and no text over it, unlike PhotoBand — nothing is set on top, so
 * there is no contrast floor to hold and the photograph can stay as it is.
 *
 * `alt=""` is deliberate. In a list of posts the thumbnail sits inside a link
 * whose heading already names the article; describing the photograph as well
 * makes a screen reader read two things for one target, and the picture carries
 * no information the heading does not. On a page opener the same image does
 * carry the argument, which is why PhotoBand passes its real alt text.
 */

interface PhotoThumbProps {
  id: string;
  /**
   * row  — small, fixed-width, beside a post title in a list
   * card — fills a card in a grid
   * wide — an article's own image, at content width
   */
  variant?: 'row' | 'card' | 'wide';
  /**
   * Overrides the empty alt. Pass it only where the image stands on its own —
   * an article hero, say — and not for a thumbnail inside a link that a
   * heading already names.
   */
  alt?: string;
  className?: string;
}

export function PhotoThumb({ id, variant = 'row', alt, className = '' }: PhotoThumbProps) {
  const image = photo(id);

  const sizes = {
    card: '(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw',
    row: '(min-width: 640px) 12rem, 92vw',
    wide: '(min-width: 1024px) 48rem, 92vw',
  }[variant];

  const widest = variant === 'wide' ? 1600 : 1024;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- see PhotoBand
    <img
      src={`/images/photos/${id}-${widest}.webp`}
      srcSet={[
        `/images/photos/${id}-640.webp 640w`,
        `/images/photos/${id}-1024.webp 1024w`,
        ...(variant === 'wide' ? [`/images/photos/${id}-1600.webp 1600w`] : []),
      ].join(', ')}
      sizes={sizes}
      alt={alt ?? ''}
      width={widest}
      height={Math.round((widest / 16) * 9)}
      /*
       * A wide variant is an article's own image, just below the header and
       * therefore usually the LCP element — lazy-loading it delays the metric it
       * defines. Row and card thumbnails are down the page and stay lazy.
       */
      loading={variant === 'wide' ? 'eager' : 'lazy'}
      fetchPriority={variant === 'wide' ? 'high' : undefined}
      decoding="async"
      className={`aspect-[16/9] w-full rounded-lg object-cover ${className}`}
      style={{ objectPosition: image.focus }}
    />
  );
}
