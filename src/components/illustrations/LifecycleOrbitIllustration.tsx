/**
 * Services index visual: Advise → Build → Run as a continuous clockwise
 * orbit around the eFlury mark. Geometry (arcs + arrowheads) is computed,
 * not hand-drawn, so the arrows sit exactly on the circle.
 *
 * Ported from LifecycleOrbitIllustration.astro. Geometry and timing unchanged; the lang prop is gone
 * because the site is German-only, so its label ternaries resolve to German.
 */
export function LifecycleOrbitIllustration() {
  const cx = 280;
  const cy = 190;
  const r = 126;
  const rad = (d: number) => (d * Math.PI) / 180;
  const pt = (d: number): [number, number] => [cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))];
  const f = (n: number) => n.toFixed(1);
  // junctions at -90° (top), 30° (lower right), 150° (lower left); motion clockwise
  const arc = (a: number, b: number) => {
    const [x1, y1] = pt(a);
    const [x2, y2] = pt(b);
    const large = b - a > 180 ? 1 : 0;
    return `M ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${large} 1 ${f(x2)} ${f(y2)}`;
  };
  // solid triangular arrowhead whose tip lands just past the junction angle
  const arrow = (j: number) => {
    const tip = pt(j + 3);
    const back = j - 6;
    const [bx, by] = pt(back);
    const nx = Math.cos(rad(back));
    const ny = Math.sin(rad(back));
    const w = 9;
    return `${f(tip[0])},${f(tip[1])} ${f(bx + nx * w)},${f(by + ny * w)} ${f(bx - nx * w)},${f(by - ny * w)}`;
  };
  const segments = [
    { d: arc(-83, 21), head: arrow(30), color: 'var(--eflury-navy)' },   // ADVISE: top → lower right
    { d: arc(39, 141), head: arrow(150), color: 'var(--eflury-teal)' },  // BUILD: lower right → lower left
    { d: arc(159, 261), head: arrow(270), color: 'var(--eflury-blue)' }, // RUN: lower left → top
  ];
  return (
    <>
      <style>{`.ill-orbit {
    display: block;
    width: 100%;
    height: auto;
  }`}</style>
      <svg viewBox="0 0 560 380" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" className="ill-orbit">
        {/* orbit track */}
        <circle cx={cx} cy={cy} r={r} stroke="var(--border-color)" strokeWidth="2" strokeDasharray="2 8" fill="none" />
      
        {/* arcs with computed arrowheads */}
        {segments.map((s, __i4) => (
          <g key={__i4}>
            <path d={s.d} stroke={s.color} strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.88" />
            <polygon points={s.head} fill={s.color} opacity="0.95" />
          </g>
        ))}
      
        {/* stage labels on the orbit */}
        <g fontFamily="inherit" fontWeight="800" fontSize="17" letterSpacing="0.08em">
          <text x="416" y="130" fill="var(--eflury-navy)">ADVISE</text>
          <text x="280" y="356" textAnchor="middle" fill="var(--teal-text)">BUILD</text>
          <text x="144" y="130" textAnchor="end" fill="var(--eflury-blue)">RUN</text>
        </g>
        <g fontFamily="inherit" fontSize="11.5" fill="var(--text-secondary)">
          <text x="416" y="148">Audit · Roadmap</text>
          <text x="280" y="373" textAnchor="middle">Skills · MCP · Power BI</text>
          <text x="144" y="148" textAnchor="end">Managed Operations</text>
        </g>
      
        {/* center: the mark */}
        <g>
          <circle cx={cx} cy={cy} r="58" fill="var(--primary-50)" stroke="var(--eflury-teal)" strokeWidth="2" />
          <rect x="248" y="158" width="64" height="64" rx="15" fill="#fff" stroke="var(--border-color)" />
          <image href="/images/favicon-tab.png" x="253" y="163" width="54" height="54" />
        </g>
        <text x={cx} y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--eflury-navy)" fontFamily="inherit">eFlury <tspan fill="var(--eflury-teal)">Consulting</tspan></text>
      </svg>
    </>
  );
}
