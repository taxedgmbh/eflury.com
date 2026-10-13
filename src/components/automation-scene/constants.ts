/**
 * Pure numbers shared by the 3D geometry, the layouts and the SVG poster.
 *
 * This file must never import three.js. The poster renders on the server and
 * sits in the homepage's initial bundle; it reads the layouts, the layouts read
 * these constants — and when they lived in geometry.ts, that one import chain
 * pulled 377 KB of three.js into the first load of /de/, defeating the whole
 * point of loading the scene lazily.
 */

/**
 * Tooth size per unit of radius. Gears only mesh if their teeth are the same
 * size, so the tooth count is derived from the radius instead of chosen —
 * set it by hand and two gears that look adjacent will grind.
 */
export const TEETH_PER_RADIUS = 16;

export function teethFor(radius: number): number {
  return Math.max(6, Math.round(radius * TEETH_PER_RADIUS));
}

/** Fractions of one tooth pitch, matching the profile in gearGeometry(). */
export const TOOTH_TIP_CENTRE = 0.36;
export const TOOTH_GAP_CENTRE = 0.86;

/** A sheet of paper: A-format proportions, thin enough to stack. */
export const TILE = { width: 0.42, height: 0.012, depth: 0.58 } as const;
