/**
 * Where-We-Help hub visual: a blueprint floor plan of an SME — the three
 * business areas as rooms, each with a glowing automation node wired to
 * the eFlury mark in the corridor. Blueprint format: thin strokes, grid.
 *
 * Ported from FloorPlanIllustration.astro. Geometry and timing unchanged; the lang prop is gone
 * because the site is German-only, so its label ternaries resolve to German.
 */
export function FloorPlanIllustration() {
  const t = {
    finance: 'Finanzen & Back Office',
    comms: 'Kundenkommunikation',
    reporting: 'Reporting & Daten',
    plan: 'KMU · Grundriss',
  };
  return (
    <>
      <style>{`.ill-floorplan {
    display: block;
    width: 100%;
    height: auto;
  }`}</style>
      <svg viewBox="0 0 560 380" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" className="ill-floorplan">
        <defs>
          <pattern id="fp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" stroke="var(--border-color)" strokeWidth="0.6" fill="none" opacity="0.55" />
          </pattern>
        </defs>
      
        {/* sheet */}
        <rect x="8" y="8" width="544" height="364" rx="12" fill="var(--card-bg)" stroke="var(--border-color)" strokeWidth="1.5" />
        <rect x="8" y="8" width="544" height="364" rx="12" fill="url(#fp-grid)" />
        <text x="30" y="36" fontSize="11" fontWeight="700" letterSpacing="0.12em" fill="var(--text-tertiary)" fontFamily="inherit">{t.plan.toUpperCase()}</text>
        <text x="530" y="36" textAnchor="end" fontSize="12" fontWeight="700" fill="var(--eflury-navy)" fontFamily="inherit">eFlury <tspan fill="var(--eflury-teal)">Consulting</tspan></text>
      
        {/* outer walls */}
        <rect x="40" y="56" width="480" height="286" stroke="var(--eflury-navy)" strokeWidth="2.5" fill="none" opacity="0.75" />
      
        {/* interior walls with door gaps */}
        <g stroke="var(--eflury-navy)" strokeWidth="2" opacity="0.6">
          <path d="M226 56 L 226 150 M226 190 L 226 342" />
          <path d="M226 196 L 372 196 M412 196 L 520 196" />
          <path d="M372 56 L 372 120" />
        </g>
      
        {/* room: finance (left) */}
        <text x="60" y="84" fontSize="12.5" fontWeight="700" fill="var(--text-secondary)" fontFamily="inherit">{t.finance}</text>
        <g stroke="var(--eflury-blue)" strokeWidth="1.8" fill="none" opacity="0.7">
          <rect x="60" y="230" width="90" height="40" rx="3" />
          <rect x="60" y="104" width="56" height="76" rx="3" />
          <path d="M74 122 L 102 122 M74 138 L 102 138 M74 154 L 102 154" strokeWidth="1.4" />
        </g>
        <circle cx="176" cy="150" r="16" fill="var(--eflury-teal)" opacity="0.14" />
        <circle cx="176" cy="150" r="7" fill="var(--eflury-teal)" />
      
        {/* room: comms (top right) */}
        <text x="246" y="84" fontSize="12.5" fontWeight="700" fill="var(--text-secondary)" fontFamily="inherit">{t.comms}</text>
        <g stroke="var(--eflury-blue)" strokeWidth="1.8" fill="none" opacity="0.7">
          <rect x="404" y="72" width="96" height="36" rx="18" />
          <path d="M420 90 L 444 90 M420 98 L 436 98" strokeWidth="1.4" />
          <rect x="246" y="128" width="34" height="26" rx="4" />
          <path d="M246 132 L 263 145 L 280 132" strokeWidth="1.6" />
        </g>
        <circle cx="330" cy="140" r="16" fill="var(--eflury-teal)" opacity="0.14" />
        <circle cx="330" cy="140" r="7" fill="var(--eflury-teal)" />
      
        {/* room: reporting (bottom right) */}
        <text x="396" y="226" fontSize="12.5" fontWeight="700" fill="var(--text-secondary)" fontFamily="inherit">{t.reporting}</text>
        <g stroke="var(--eflury-blue)" strokeWidth="1.8" fill="none" opacity="0.7">
          <rect x="404" y="242" width="96" height="60" rx="4" />
          <path d="M420 288 L 420 276 M436 288 L 436 264 M452 288 L 452 272 M468 288 L 468 256" strokeWidth="2.4" />
        </g>
        <circle cx="330" cy="290" r="16" fill="var(--eflury-teal)" opacity="0.14" />
        <circle cx="330" cy="290" r="7" fill="var(--eflury-teal)" />
      
        {/* wiring: nodes to the mark */}
        <g stroke="var(--eflury-teal)" strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" opacity="0.85">
          <path d="M186 158 C 220 190, 236 208, 258 228" />
          <path d="M330 152 L 330 200 C 330 214, 316 224, 296 232" />
          <path d="M322 282 C 306 268, 296 258, 288 250" />
        </g>
      
        {/* the mark in the corridor */}
        <g>
          <rect x="242" y="226" width="60" height="60" rx="14" fill="#fff" stroke="var(--eflury-teal)" strokeWidth="2.5" />
          <image href="/images/favicon-tab.png" x="247" y="231" width="50" height="50" />
        </g>
      </svg>
    </>
  );
}
