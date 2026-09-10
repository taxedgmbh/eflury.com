/**
 * About page visual: knowledge transfer as a bridge — 13 years of enterprise
 * automation on the left, Swiss SMEs on the right, the eFlury mark carrying
 * the know-how back. Arc, arrowhead, and token positions are computed from
 * the same quadratic curve, so nothing overlaps by accident.
 *
 * Ported from CareerBridgeIllustration.astro. Geometry and timing unchanged; the lang prop is gone
 * because the site is German-only, so its label ternaries resolve to German.
 */
export function CareerBridgeIllustration() {
  const t = {
    title: 'VOM KONZERN ZUM KMU',
    left: 'Fortune 500',
    leftSub: '13 Jahre Konzern-Automatisierung',
    right: 'Schweizer KMU',
    rightSub: 'Dieselbe Qualität, KMU-Format',
    transfer: 'Wissenstransfer zurück ins KMU',
    token1: 'Methoden',
    token2: 'Standards',
  };
  // quadratic arc from the tower roof to just above the SME roof
  const p0 = { x: 150, y: 114 };
  const c = { x: 285, y: 40 };
  const p2 = { x: 412, y: 184 };
  const q = (tt: number) => ({
    x: (1 - tt) ** 2 * p0.x + 2 * (1 - tt) * tt * c.x + tt ** 2 * p2.x,
    y: (1 - tt) ** 2 * p0.y + 2 * (1 - tt) * tt * c.y + tt ** 2 * p2.y,
  });
  const f = (n: number) => n.toFixed(1);
  const arc = `M ${p0.x} ${p0.y} Q ${c.x} ${c.y} ${p2.x} ${p2.y}`;
  // arrowhead along the end tangent, stopping short of the roof
  const dl = Math.hypot(p2.x - c.x, p2.y - c.y);
  const dir = { x: (p2.x - c.x) / dl, y: (p2.y - c.y) / dl };
  const tip = { x: p2.x + dir.x * 10, y: p2.y + dir.y * 10 };
  const back = { x: p2.x - dir.x * 4, y: p2.y - dir.y * 4 };
  const nrm = { x: -dir.y, y: dir.x };
  const head = `${f(tip.x)},${f(tip.y)} ${f(back.x + nrm.x * 7)},${f(back.y + nrm.y * 7)} ${f(back.x - nrm.x * 7)},${f(back.y - nrm.y * 7)}`;
  const apex = q(0.5);
  const tok1 = q(0.2);
  const tok2 = q(0.8);
  return (
    <>
      <style>{`.ill-bridge {
    display: block;
    width: 100%;
    height: auto;
  }`}</style>
      <svg viewBox="0 0 560 380" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" className="ill-bridge">
        <text x="30" y="30" fontSize="11" fontWeight="700" letterSpacing="0.12em" fill="var(--text-tertiary)" fontFamily="inherit">{t.title}</text>
      
        {/* ground */}
        <path d="M 40 300 L 520 300" stroke="var(--border-color)" strokeWidth="2" strokeLinecap="round" />
      
        {/* enterprise tower */}
        <g>
          <rect x="70" y="120" width="92" height="180" fill="var(--surface-navy)" rx="3" />
          <path d="M 100 120 L 100 96" stroke="var(--surface-navy)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="90" r="3" fill="var(--eflury-teal)" />
          {[0, 1, 2, 3, 4, 5].map((row, __i1) => (
            <g key={__i1}>
              {[0, 1, 2].map((col, __i2) => (
                <rect key={__i2} x={84 + col * 24} y={134 + row * 26} width="14" height="14" rx="2" fill="#fff" opacity={row < 2 && col === 2 ? 0.85 : 0.28} />
              ))}
            </g>
          ))}
        </g>
        <text x="116" y="326" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--eflury-navy)" fontFamily="inherit">{t.left}</text>
        <text x="116" y="343" textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="inherit">{t.leftSub}</text>
      
        {/* SME cluster */}
        <g>
          <rect x="388" y="224" width="62" height="76" fill="var(--primary-50)" stroke="var(--eflury-navy)" strokeWidth="2" rx="3" />
          <path d="M 384 224 L 419 200 L 454 224" stroke="var(--eflury-navy)" strokeWidth="2" fill="var(--primary-100)" strokeLinejoin="round" />
          <rect x="400" y="244" width="12" height="12" rx="2" fill="var(--eflury-teal)" opacity="0.55" />
          <rect x="426" y="244" width="12" height="12" rx="2" fill="var(--eflury-teal)" opacity="0.55" />
          <rect x="412" y="272" width="16" height="28" rx="2" fill="var(--eflury-navy)" opacity="0.75" />
      
          <rect x="462" y="248" width="52" height="52" fill="var(--primary-50)" stroke="var(--eflury-navy)" strokeWidth="2" rx="3" />
          <path d="M 458 248 L 514 248" stroke="var(--eflury-teal)" strokeWidth="5" strokeLinecap="round" />
          <rect x="472" y="262" width="12" height="12" rx="2" fill="var(--eflury-teal)" opacity="0.55" />
          <rect x="492" y="262" width="12" height="12" rx="2" fill="var(--eflury-teal)" opacity="0.55" />
        </g>
        <text x="450" y="326" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--eflury-navy)" fontFamily="inherit">{t.right}</text>
        <text x="450" y="343" textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="inherit">{t.rightSub}</text>
      
        {/* transfer arc with arrowhead */}
        <path d={arc} stroke="var(--eflury-teal)" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" />
        <polygon points={head} fill="var(--eflury-teal)" opacity="0.95" />
      
        {/* knowledge tokens riding the arc */}
        {[
          { p: tok1, label: t.token1 },
          { p: tok2, label: t.token2 },
        ].map(({ p, label }) => (
          <g key={label}>
            <rect x={f(p.x - 34)} y={f(p.y - 12)} width="68" height="24" rx="12" fill="var(--card-bg)" stroke="var(--eflury-teal)" strokeWidth="1.8" />
            <text x={f(p.x)} y={f(p.y + 4)} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--teal-text)" fontFamily="inherit">{label}</text>
          </g>
        ))}
      
        {/* the mark at the apex of the arc */}
        <g>
          <rect x={f(apex.x - 26)} y={f(apex.y - 26)} width="52" height="52" rx="12" fill="#fff" stroke="var(--eflury-teal)" strokeWidth="2.5" />
          <image href="/images/favicon-tab.png" x={f(apex.x - 22)} y={f(apex.y - 22)} width="44" height="44" />
        </g>
      
        {/* what the arc means */}
        <text x={f(apex.x)} y="178" textAnchor="middle" fontSize="13.5" fontWeight="800" fill="var(--teal-text)" fontFamily="inherit">{t.transfer}</text>
      
        {/* wordmark */}
        <text x="530" y="368" textAnchor="end" fontSize="13" fontWeight="700" fill="var(--eflury-navy)" fontFamily="inherit">eFlury <tspan fill="var(--eflury-teal)">Consulting</tspan></text>
      </svg>
    </>
  );
}
