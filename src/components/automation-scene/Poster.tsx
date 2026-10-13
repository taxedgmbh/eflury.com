import { teethFor } from './constants';
import {
  BASE,
  BASE_TOP,
  GATE,
  GEARS,
  OUTPUT,
  PANEL,
  STACK_COUNT,
  SYSTEMS,
  SYSTEM_BLOCK,
  TRACK,
  TRACK_SLOTS,
  TRACK_TOP,
  systemBlockPosition,
} from './layouts';

/**
 * The finished machine as a front elevation — a technical drawing of the same
 * object the 3D scene renders.
 *
 * Drawn from layouts.ts rather than by hand, so it cannot disagree with the 3D
 * version. It is what renders on the server, while the scene loads, when the
 * visitor prefers reduced motion, and where WebGL is unavailable — so for some
 * visitors it is the only version, and it has to be finished work in its own
 * right rather than a placeholder.
 *
 * Colours are the site's CSS tokens, so it follows the theme like the 3D scene.
 */

const SCALE = 82;
const X0 = 300;
const Y0 = 262;
const px = (x: number) => X0 + x * SCALE;
const py = (y: number) => Y0 - y * SCALE;

/** The same trapezoidal tooth profile as gearGeometry(), flattened to a path. */
function gearPath(radius: number, cx: number, cy: number, phase: number): string {
  const teeth = teethFor(radius);
  const step = (Math.PI * 2) / teeth;
  const rOuter = (radius + 0.06) * SCALE;
  const rRoot = (radius - 0.06) * SCALE;
  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step + phase;
    (
      [
        [rRoot, a],
        [rOuter, a + step * 0.22],
        [rOuter, a + step * 0.5],
        [rRoot, a + step * 0.72],
      ] as const
    ).forEach(([r, t]) => {
      // SVG's y axis points down, so the angle is mirrored.
      points.push(`${(cx + r * Math.cos(t)).toFixed(1)},${(cy - r * Math.sin(t)).toFixed(1)}`);
    });
  }
  return `M${points.join('L')}Z`;
}

export function Poster() {
  const [bw, bh] = BASE.size;
  const [pw, ph] = PANEL.size;
  const [tw, th] = TRACK.size;
  const [sw, sh] = SYSTEM_BLOCK.size;

  return (
    <svg
      viewBox="0 0 600 300"
      className="h-auto w-full"
      aria-hidden
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* base plate */}
      <rect
        x={px(-bw / 2)}
        y={py(BASE_TOP)}
        width={bw * SCALE}
        height={bh * SCALE}
        rx={7}
        fill="var(--surface-raised)"
        stroke="var(--rule)"
      />

      {/* gear panel */}
      <rect
        x={px(PANEL.position[0] - pw / 2)}
        y={py(PANEL.position[1] + ph / 2)}
        width={pw * SCALE}
        height={ph * SCALE}
        rx={6}
        fill="var(--surface-sunken)"
        stroke="var(--rule)"
      />

      {/* gear train */}
      {GEARS.map((g, i) => {
        const cx = px(g.position[0]);
        const cy = py(g.position[1]);
        return (
          <g key={i}>
            <path d={gearPath(g.radius, cx, cy, g.phase)} fill={g.accent ? 'var(--accent)' : 'var(--text)'} />
            <circle cx={cx} cy={cy} r={Math.max(7, g.radius * SCALE * 0.18)} fill="var(--surface-sunken)" />
            <circle cx={cx} cy={cy} r={4} fill="var(--rule-strong)" />
          </g>
        );
      })}

      {/* systems rack */}
      {SYSTEMS.map((name, i) => {
        const [x, y] = systemBlockPosition(i);
        return (
          <g key={name}>
            <rect
              x={px(x - sw / 2)}
              y={py(y + sh / 2)}
              width={sw * SCALE}
              height={sh * SCALE}
              rx={4}
              fill="var(--surface-raised)"
              stroke="var(--rule-strong)"
            />
            <text
              x={px(x)}
              y={py(y) + 5}
              textAnchor="middle"
              fontSize={14}
              fontWeight={600}
              fill="var(--text)"
            >
              {name}
            </text>
          </g>
        );
      })}

      {/* track */}
      <rect
        x={px(TRACK.position[0] - tw / 2)}
        y={py(TRACK_TOP)}
        width={tw * SCALE}
        height={Math.max(4, th * SCALE)}
        rx={2}
        fill="var(--rule-strong)"
      />

      {/* documents in flight */}
      {TRACK_SLOTS.map((x) => (
        <rect
          key={x}
          x={px(x - 0.21)}
          y={py(TRACK_TOP) - 3}
          width={0.42 * SCALE}
          height={3}
          fill="var(--surface-raised)"
          stroke="var(--rule-strong)"
          strokeWidth={0.75}
        />
      ))}

      {/* approval gate — the one teal element on the floor */}
      <rect
        x={px(GATE.x - 0.25)}
        y={py(BASE_TOP + GATE.postSize[1] + GATE.lintelSize[1])}
        width={0.5 * SCALE}
        height={GATE.lintelSize[1] * SCALE}
        rx={2}
        fill="var(--accent)"
      />
      <rect
        x={px(GATE.x - GATE.postSize[0] / 2)}
        y={py(BASE_TOP + GATE.postSize[1])}
        width={GATE.postSize[0] * SCALE}
        height={GATE.postSize[1] * SCALE}
        fill="var(--accent)"
      />

      {/* finished stack */}
      {Array.from({ length: STACK_COUNT }, (_, i) => (
        <rect
          key={i}
          x={px(OUTPUT.x - 0.21)}
          y={py(TRACK_TOP) - (i + 1) * 3.2}
          width={0.42 * SCALE}
          height={3}
          fill="var(--surface-raised)"
          stroke="var(--rule-strong)"
          strokeWidth={0.6}
        />
      ))}
    </svg>
  );
}
