'use client';

import { useEffect, useState } from 'react';
import { Color } from 'three';

/**
 * The scene's colours, read from the site's own CSS custom properties.
 *
 * Two reasons not to write colours here. The design system forbids raw hex in
 * components — the tokens in globals.css are the palette. And the tokens are
 * already redefined for dark mode, so reading them at runtime gives the 3D
 * scene the same theme behaviour as every other element for free, instead of a
 * second hand-kept dark palette that drifts.
 */
export interface Palette {
  /** Primary ink — navy in light mode, near-white in dark. Gears, frame. */
  ink: Color;
  muted: Color;
  faint: Color;
  rule: Color;
  ruleStrong: Color;
  surface: Color;
  raised: Color;
  sunken: Color;
  /** Brand teal. Reserved for the approval gate and the one moving accent. */
  accent: Color;
  /**
   * Paper. Light in both themes: --surface-raised is navy-black in dark mode,
   * and documents that turn dark navy stop reading as documents. In dark mode
   * this takes --text, which is the theme's near-white.
   */
  paper: Color;
  /** CSS strings, for 2D canvas textures (labels, document lines). */
  css: Record<'ink' | 'muted' | 'faint' | 'raised' | 'accent' | 'paper' | 'paperInk', string>;
}

const TOKENS = {
  ink: '--text',
  muted: '--text-muted',
  faint: '--text-faint',
  rule: '--rule',
  ruleStrong: '--rule-strong',
  surface: '--surface',
  raised: '--surface-raised',
  sunken: '--surface-sunken',
  accent: '--accent',
} as const;

export function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement);
  const value = (name: string) => style.getPropertyValue(name).trim();
  const out = {} as Record<keyof typeof TOKENS, Color>;
  for (const [key, token] of Object.entries(TOKENS) as [keyof typeof TOKENS, string][]) {
    out[key] = new Color(value(token));
  }
  // Relative luminance of the page ground decides which theme we are in.
  const dark = out.surface.r * 0.2126 + out.surface.g * 0.7152 + out.surface.b * 0.0722 < 0.25;
  return {
    ...out,
    paper: dark ? out.ink.clone() : out.raised.clone(),
    css: {
      paper: value(dark ? TOKENS.ink : TOKENS.raised),
      // Lines printed on paper: navy on light paper; on dark mode's light paper
      // the theme's "ink" is the paper itself, so print with the page ground.
      paperInk: value(dark ? TOKENS.surface : TOKENS.ink),
      ink: value(TOKENS.ink),
      muted: value(TOKENS.muted),
      faint: value(TOKENS.faint),
      raised: value(TOKENS.raised),
      accent: value(TOKENS.accent),
    },
  };
}

/**
 * Re-reads the palette whenever the theme changes — the toggle writes
 * data-theme on <html>, and with no explicit choice the OS preference decides.
 */
export function usePalette(): Palette | null {
  const [palette, setPalette] = useState<Palette | null>(null);

  useEffect(() => {
    const update = () => setPalette(readPalette());
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const scheme = matchMedia('(prefers-color-scheme: dark)');
    scheme.addEventListener('change', update);

    return () => {
      observer.disconnect();
      scheme.removeEventListener('change', update);
    };
  }, []);

  return palette;
}
