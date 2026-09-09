import { Instrument_Sans, Newsreader } from 'next/font/google';

/**
 * Two families, clearly distinct in job.
 *
 * Instrument Sans: a precise neo-grotesque with squared terminals — headings,
 * navigation, and the register/rail data. Chosen over Inter or Helvetica, which
 * are the reach-for-anything defaults and carry no point of view.
 *
 * Newsreader: sharp editorial serif for long-form German. The blog is ~94k words
 * with heavy compounds and diacritics, and a serif at length is easier to read
 * than a grotesque — the single strongest argument for a second family here.
 *
 * Self-hosted by next/font, so no runtime request to fonts.googleapis.com and no
 * layout shift while a webfont loads.
 */

export const sans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export const serif = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
});
