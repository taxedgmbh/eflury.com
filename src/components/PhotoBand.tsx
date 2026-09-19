import Link from 'next/link';
import { photo } from '@/lib/photos';

/**
 * A full-bleed photograph with the words set over it.
 *
 * Deliberately not next/image. The App Hosting adapter rewrites next.config
 * with images.unoptimized = true, so next/image would emit a single <img> with
 * no srcset and serve the 1600px file to a phone. The widths are pre-generated
 * by scripts/fetch-photos.mjs, so the srcset is written out here instead and
 * the browser picks.
 *
 * The scrim is load-bearing rather than decorative: white text on an unmodified
 * photograph is a contrast failure that changes with every image. A fixed
 * gradient over a known-dark crop keeps the headline above 4.5:1 regardless of
 * which photograph is passed in, which is why the overlay is not configurable.
 */

interface PhotoBandProps {
  /** id from migration/photos.manifest.mjs */
  id: string;
  eyebrow: string;
  heading: string;
  lead?: string;
  cta?: { href: string; label: string };
  /** Tall for a page opener, shorter for a band between sections. */
  size?: 'opener' | 'band';
  /**
   * A page opener carries the page's h1; a band between sections carries an h2.
   * Passing the level rather than always emitting h2 keeps the document outline
   * correct — a page whose only heading is an h2 is a real a11y defect, not a
   * cosmetic one.
   */
  as?: 'h1' | 'h2';
}

export function PhotoBand({
  id,
  eyebrow,
  heading,
  lead,
  cta,
  size = 'band',
  as: Heading = 'h2',
}: PhotoBandProps) {
  const image = photo(id);

  const height =
    size === 'opener'
      ? 'min-h-[clamp(26rem,52vh,34rem)]'
      : 'min-h-[clamp(20rem,38vh,26rem)]';

  return (
    <section className={`relative isolate flex items-end overflow-hidden ${height}`}>
      {/*
       * eslint-disable-next-line @next/next/no-img-element --
       * next/image is the wrong tool here, not an oversight. The App Hosting
       * adapter sets images.unoptimized = true, under which next/image emits a
       * single src with no srcset — it would serve the 1600px file to a phone.
       * A hand-written srcset over pre-generated widths is strictly better.
       */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/photos/${id}-1600.webp`}
        srcSet={[
          `/images/photos/${id}-640.webp 640w`,
          `/images/photos/${id}-1024.webp 1024w`,
          `/images/photos/${id}-1600.webp 1600w`,
        ].join(', ')}
        sizes="100vw"
        alt={image.alt}
        /*
         * Decorative-adjacent but not decorative: the alt text describes the
         * structure the photograph is making an argument about, so a screen
         * reader user gets the same point a sighted one does.
         */
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: image.focus }}
        loading={size === 'opener' ? 'eager' : 'lazy'}
        fetchPriority={size === 'opener' ? 'high' : undefined}
      />

      {/*
       * Graded so the photograph still reads as a photograph, but the floor is
       * set by contrast rather than by taste. Composited over a pure-white pixel
       * — the worst case any crop can present — white text measures:
       *
       *   0.55 → 3.67:1   fails AA for anything under 24px
       *   0.65 → 4.98:1   passes AA at any size
       *   0.94 → 12.77:1
       *
       * So 0.65 is the top stop. The first version graded to 0.12, which put the
       * eyebrow at roughly 2:1 over the sky in this photograph; it looked fine
       * on a dark crop and would have quietly failed on the next image added.
       */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(2,37,84,0.94)_0%,rgba(2,37,84,0.86)_42%,rgba(2,37,84,0.74)_78%,rgba(2,37,84,0.65)_100%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-12 sm:pt-20 sm:pb-14">
        <p className="micro font-medium tracking-[0.02em] text-white/90">{eyebrow}</p>
        <span aria-hidden className="mt-4 block h-[3px] w-10 bg-[var(--accent)]" />
        <Heading
          /* On the shared scale: a page opener is display, a mid-page band a step down. */
          className={`mt-5 max-w-[28ch] text-white ${size === 'opener' ? 'display' : 'title'}`}
        >
          {heading}
        </Heading>
        {lead ? (
          <p className="lead mt-5 max-w-[54ch] text-white/90">{lead}</p>
        ) : null}
        {cta ? (
          <Link
            href={cta.href}
            className="tap mt-7 gap-2 rounded-full bg-white/95 px-5 small font-medium text-[var(--navy,#022554)] transition-colors hover:bg-white"
          >
            {cta.label}
            <span aria-hidden>→</span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
