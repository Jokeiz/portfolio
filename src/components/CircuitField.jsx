import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * CircuitField — animated PCB-trace background.
 *
 * Performance:
 *   • No SVG filters (feGaussianBlur is a per-frame repaint trap).
 *   • Animation pauses when section is off-screen via IntersectionObserver.
 *   • Density is conservative; raise via prop only on hero-style sections.
 *   • Pure SVG + native <animateMotion> — GPU-cheap.
 *   • Respects prefers-reduced-motion.
 *
 * Props:
 *   accent   — main copper colour (default: --accent #7df9d4)
 *   opacity  — global opacity of the field (default: 0.18)
 *   density  — 'low' | 'medium' | 'high' (default: 'low')
 *   seed     — int for deterministic layout (default: 7)
 */

const TRACE_LIBRARY = [
  { d: 'M -20 60 L 220 60 L 260 100 L 520 100 L 560 60 L 820 60 L 860 100 L 1120 100', dur: 4.2 },
  { d: 'M 1120 30 L 940 30 L 900 70 L 660 70 L 620 30 L 360 30 L 320 70 L -20 70', dur: 5.6 },
  { d: 'M -20 180 L 140 180 L 180 220 L 360 220 L 400 180 L 720 180 L 760 220 L 1120 220', dur: 3.9 },
  { d: 'M 1120 200 L 980 200 L 940 160 L 700 160 L 660 200 L 460 200 L 420 160 L -20 160', dur: 6.1 },
  { d: 'M -20 320 L 80 320 L 120 280 L 380 280 L 420 320 L 540 320 L 580 280 L 880 280 L 920 320 L 1120 320', dur: 4.7 },
  { d: 'M -20 440 L 200 440 L 240 400 L 460 400 L 500 440 L 760 440 L 800 400 L 1120 400', dur: 5.2 },
  { d: 'M 1120 460 L 980 460 L 940 500 L 720 500 L 680 460 L 480 460 L 440 500 L 200 500 L 160 460 L -20 460', dur: 6.5 },
  { d: 'M -20 580 L 100 580 L 140 540 L 380 540 L 420 580 L 700 580 L 740 540 L 1000 540 L 1040 580 L 1120 580', dur: 4.4 },
  { d: 'M 80 -20 L 80 80 L 160 160 L 160 360 L 240 440 L 240 660', dur: 7.2 },
  { d: 'M 1040 -20 L 1040 120 L 960 200 L 960 380 L 880 460 L 880 660', dur: 7.8 },
];

const PADS = [
  [220, 60], [520, 100], [820, 60],
  [180, 220], [400, 180], [720, 180],
  [120, 280], [420, 320], [880, 280],
  [240, 400], [500, 440], [760, 440],
  [140, 540], [420, 580], [1040, 580],
];
const VIAS = [
  [80, 80], [160, 160], [240, 440],
  [1040, 120], [880, 460],
];

const DENSITY_MAP = {
  low: 3,
  medium: 5,
  high: 8,
};

export default function CircuitField({
  accent = '#7df9d4',
  opacity = 0.16,
  density = 'low',
  seed = 7,
  className = '',
  style = {},
}) {
  const reduced = useReducedMotion();
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const traces = useMemo(() => {
    const count = DENSITY_MAP[density] || 3;
    const arr = [...TRACE_LIBRARY];
    let s = seed;
    for (let i = arr.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) >>> 0;
      const j = s % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, count);
  }, [density, seed]);

  // Pause animation when off-screen — biggest perf win.
  useEffect(() => {
    if (!wrapRef.current || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  const animate = visible && !reduced;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity, ...style }}
    >
      <svg
        viewBox="0 0 1100 660"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
      >
        {/* faint dot grid — silkscreen reference. Static, cheap. */}
        <g fill={accent} opacity="0.16">
          {Array.from({ length: 12 }).map((_, i) => (
            Array.from({ length: 8 }).map((_, j) => (
              <circle
                key={`g-${i}-${j}`}
                cx={i * 100 + 50}
                cy={j * 90 + 40}
                r="0.7"
              />
            ))
          ))}
        </g>

        {/* traces — static stroke, no filter */}
        {traces.map((t, i) => (
          <g key={`tr-${i}`}>
            <path
              d={t.d}
              stroke={accent}
              strokeOpacity="0.4"
              strokeWidth="1.4"
              fill="none"
              strokeLinejoin="miter"
              strokeLinecap="round"
            />
            {/* electron — only when visible & motion allowed. No blur filter. */}
            {animate && (
              <circle r="2" fill={accent}>
                <animateMotion
                  dur={`${t.dur}s`}
                  repeatCount="indefinite"
                  rotate="auto"
                  path={t.d}
                />
              </circle>
            )}
          </g>
        ))}

        {/* pads (square SMT pads) — static */}
        {PADS.map(([x, y], i) => (
          <rect
            key={`p-${i}`}
            x={x - 3} y={y - 3}
            width="6" height="6" rx="1"
            fill="none"
            stroke={accent}
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        ))}

        {/* vias — static */}
        {VIAS.map(([x, y], i) => (
          <g key={`v-${i}`}>
            <circle cx={x} cy={y} r="3.5" fill="none" stroke={accent} strokeOpacity="0.6" strokeWidth="1" />
            <circle cx={x} cy={y} r="1.4" fill="#0a0c12" />
          </g>
        ))}
      </svg>
    </div>
  );
}
