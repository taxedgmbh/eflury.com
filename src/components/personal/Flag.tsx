import type { Lang } from '@/lib/i18n';

/*
 * Small flag for the language menu, drawn as SVG (emoji flags do not render on
 * Windows). English: United Kingdom; German: Germany; French: France —
 * the usual convention for the language itself, not the country.
 */
export function Flag({ lang, size = 20 }: { lang: Lang; size?: number }) {
  const h = Math.round((size * 2) / 3);
  const common = { width: size, height: h, viewBox: '0 0 60 40', className: 'flag', 'aria-hidden': true } as const;
  if (lang === 'de')
    return (
      <svg {...common}>
        <rect width="60" height="13.34" fill="#000" />
        <rect y="13.33" width="60" height="13.34" fill="#DD0000" />
        <rect y="26.66" width="60" height="13.34" fill="#FFCE00" />
      </svg>
    );
  if (lang === 'fr')
    return (
      <svg {...common}>
        <rect width="20" height="40" fill="#0055A4" />
        <rect x="20" width="20" height="40" fill="#FFFFFF" />
        <rect x="40" width="20" height="40" fill="#EF4135" />
      </svg>
    );
  return (
    <svg {...common}>
      <clipPath id="flag-gb-clip">
        <rect width="60" height="40" />
      </clipPath>
      <g clipPath="url(#flag-gb-clip)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 60,40 M60,0 0,40" stroke="#FFFFFF" strokeWidth="8" />
        <path d="M0,0 60,40 M60,0 0,40" stroke="#C8102E" strokeWidth="3" />
        <path d="M30,0 V40 M0,20 H60" stroke="#FFFFFF" strokeWidth="12" />
        <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7" />
      </g>
    </svg>
  );
}
