/**
 * Technology partner marks, lifted from TrustSignals.astro.
 *
 * These are Emanuel's own brand SVGs for Claude, Microsoft 365, n8n, Power BI
 * and UiPath — not generic icons. The first rebuild dropped the row entirely.
 * `currentColor` is kept so each mark inherits the surrounding text colour and
 * works in both themes.
 *
 * Sizing is removed from the outer <svg> tag only. Removing width/height
 * everywhere also deletes the <rect> bars the Power BI mark is drawn from.
 */
export const TECH_PARTNERS = [
  {
    label: "Claude AI",
    mark: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.28 6.22a.75.75 0 0 0-1.06 0L12 10.44 7.78 6.22a.75.75 0 0 0-1.06 1.06l4.5 4.5a.75.75 0 0 0 1.06 0l4.5-4.5a.75.75 0 0 0 0-1.06ZM16.22 12.22a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06L12 16.94l4.22-4.22a.75.75 0 0 1 1.06 0Z"/>
          </svg>
    ),
  },
  {
    label: "Microsoft 365",
    mark: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.4 11.4H2V2h9.4v9.4zm1.2 0V2H22v9.4h-9.4zM11.4 22H2v-9.4h9.4V22zm1.2 0v-9.4H22V22h-9.4z"/>
          </svg>
    ),
  },
  {
    label: "n8n",
    mark: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="4" fill="currentColor"/>
          </svg>
    ),
  },
  {
    label: "Power BI",
    mark: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="10" width="4" height="11" rx="1"/>
            <rect x="10" y="6" width="4" height="15" rx="1"/>
            <rect x="17" y="3" width="4" height="18" rx="1"/>
          </svg>
    ),
  },
  {
    label: "UiPath",
    mark: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
    ),
  },
] as const;

export function TechPartners() {
  return (
    <div className="text-center">
      <p className="text-xs tracking-[0.14em] text-[var(--text-faint)] uppercase">
        Technologiepartner
      </p>
      <ul className="mt-7 flex flex-wrap items-start justify-center gap-x-12 gap-y-7">
        {TECH_PARTNERS.map((p) => (
          <li key={p.label} className="flex w-20 flex-col items-center gap-2 text-[var(--text-muted)]">
            {p.mark}
            <span className="text-xs">{p.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
