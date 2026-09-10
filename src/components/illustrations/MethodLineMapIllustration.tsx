/**
 * Method page visual: the five phases as a Swiss railway line map —
 * stations are phases, the go/no-go gates are railway signals, the
 * journey starts at the eFlury depot and the last station loops
 * (Optimization runs ongoing). Bilingual labels, token-driven.
 *
 * Ported from MethodLineMapIllustration.astro. Geometry and timing unchanged; the lang prop is gone
 * because the site is German-only, so its label ternaries resolve to German.
 */
export function MethodLineMapIllustration() {
  const t = {
    title: 'DIE EFLURY-METHODE · LINIENPLAN',
    legend: 'Go/No-Go-Signal nach jeder Phase',
    ongoing: 'laufend',
    s1: 'Discovery',
    s2: 'Design',
    s3: 'Development',
    s4: 'Deployment',
    s5: 'Optimization',
    w1: 'Woche 1',
    w2: 'Woche 2',
    w3: 'Wochen 3–5',
    w4: 'Woche 6',
  };
  return (
    <>
      <style>{`.ill-linemap {
    display: block;
    width: 100%;
    height: auto;
  }`}</style>
      <svg viewBox="0 0 560 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" className="ill-linemap">
        <text x="30" y="40" fontSize="11" fontWeight="700" letterSpacing="0.12em" fill="var(--text-tertiary)" fontFamily="inherit">{t.title}</text>
        <text x="530" y="40" textAnchor="end" fontSize="12" fontWeight="700" fill="var(--eflury-navy)" fontFamily="inherit">eFlury <tspan fill="var(--eflury-teal)">Consulting</tspan></text>
      
        {/* the line */}
        <path d="M96 160 L 486 160" stroke="var(--eflury-teal)" strokeWidth="6" strokeLinecap="round" />
      
        {/* depot: the brand mark */}
        <g>
          <rect x="30" y="128" width="64" height="64" rx="15" fill="#fff" stroke="var(--eflury-teal)" strokeWidth="2.5" />
          <image href="/images/favicon-tab.png" x="35" y="133" width="54" height="54" />
        </g>
      
        {/* gate signals between stations */}
        <g>
          {[177, 262, 347, 432].map((x, __i5) => (
            <g key={__i5}>
              <path d={`M${x} 160 L ${x} 132`} stroke="var(--eflury-navy)" strokeWidth="2" opacity="0.55" />
              <circle cx={x} cy="122" r="9" fill="var(--success-50)" stroke="var(--eflury-teal)" strokeWidth="2" />
              <path d={`M${x - 4} 122 L ${x - 1} 125 L ${x + 5} 118`} stroke="var(--teal-text)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          ))}
        </g>
      
        {/* stations */}
        <g>
          <circle cx="134" cy="160" r="11" fill="var(--card-bg)" stroke="var(--eflury-navy)" strokeWidth="3.5" />
          <circle cx="219" cy="160" r="11" fill="var(--card-bg)" stroke="var(--eflury-navy)" strokeWidth="3.5" />
          <circle cx="304" cy="160" r="11" fill="var(--card-bg)" stroke="var(--eflury-navy)" strokeWidth="3.5" />
          <circle cx="389" cy="160" r="11" fill="var(--card-bg)" stroke="var(--eflury-navy)" strokeWidth="3.5" />
          <circle cx="474" cy="160" r="11" fill="var(--card-bg)" stroke="var(--eflury-teal)" strokeWidth="3.5" />
        </g>
      
        {/* ongoing loop at the last station */}
        <path d="M 474 138 A 24 24 0 1 1 451 156" stroke="var(--eflury-teal)" strokeWidth="2.5" strokeDasharray="3 6" fill="none" strokeLinecap="round" />
        <path d="M 447 162 L 450 154 L 457 160" stroke="var(--eflury-teal)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      
        {/* station names (alternating above/below, SBB style) */}
        <g fontFamily="inherit" fontWeight="700" fontSize="13" fill="var(--text-primary)">
          <text x="134" y="200" textAnchor="middle">{t.s1}</text>
          <text x="219" y="212" textAnchor="middle">{t.s2}</text>
          <text x="304" y="200" textAnchor="middle">{t.s3}</text>
          <text x="389" y="212" textAnchor="middle">{t.s4}</text>
          <text x="474" y="200" textAnchor="middle">{t.s5}</text>
        </g>
        <g fontFamily="inherit" fontSize="11" fill="var(--text-secondary)">
          <text x="134" y="218" textAnchor="middle">{t.w1}</text>
          <text x="219" y="230" textAnchor="middle">{t.w2}</text>
          <text x="304" y="218" textAnchor="middle">{t.w3}</text>
          <text x="389" y="230" textAnchor="middle">{t.w4}</text>
          <text x="474" y="218" textAnchor="middle">{t.ongoing}</text>
        </g>
      
        {/* legend */}
        <g>
          <circle cx="42" cy="266" r="8" fill="var(--success-50)" stroke="var(--eflury-teal)" strokeWidth="2" />
          <path d="M38.5 266 L 41 268.5 L 46 263" stroke="var(--teal-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="58" y="270" fontSize="11.5" fontWeight="600" fill="var(--text-secondary)" fontFamily="inherit">{t.legend}</text>
        </g>
      </svg>
    </>
  );
}
