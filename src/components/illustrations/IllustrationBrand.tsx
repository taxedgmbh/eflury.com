/**
 * Corner brand signature used inside every illustration SVG:
 * the "eFlury Consulting" wordmark in brand colors (theme-aware).
 * Text-only — raster <image> tags compile as HTML <img> outside an
 * <svg> root in Astro components and break the SVG. Position via x/y.
 */
export function IllustrationBrand({ x, y }: { x: number; y: number }) {
  return (
    <text x={x} y={y} fontSize="13" fontWeight="700" fill="var(--eflury-navy)" fontFamily="inherit" opacity="0.92">eFlury <tspan fill="var(--eflury-teal)">Consulting</tspan></text>
  );
}
