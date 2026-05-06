/**
 * Generates a unique stylized cover for each project.
 * No external images — pure SVG art, themed by accent color.
 */
export default function ProjectCover({ cover, index = 0 }) {
  const { a, b, kind, heading, sub } = cover;
  const w = 1200;
  const h = 750;

  return (
    <div
      className="project-cover w-full h-full"
      style={{ '--cover-a': a, '--cover-b': b }}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id={`bg-${kind}-${index}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={b} />
            <stop offset="100%" stopColor="#06070b" />
          </linearGradient>
          <radialGradient id={`glow-${kind}-${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.35" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
          <pattern
            id={`grid-${kind}-${index}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width={w} height={h} fill={`url(#bg-${kind}-${index})`} />
        <rect width={w} height={h} fill={`url(#grid-${kind}-${index})`} />

        {/* Kind-specific composition */}
        {kind === 'orbit' && (
          <g>
            <circle cx={w / 2} cy={h / 2} r="280" fill={`url(#glow-${kind}-${index})`} />
            <circle cx={w / 2} cy={h / 2} r="180" fill="none" stroke={a} strokeOpacity="0.18" />
            <circle cx={w / 2} cy={h / 2} r="240" fill="none" stroke={a} strokeOpacity="0.10" />
            <circle cx={w / 2} cy={h / 2} r="300" fill="none" stroke={a} strokeOpacity="0.06" />
            <circle cx={w / 2 + 180} cy={h / 2} r="14" fill={a} />
            <circle cx={w / 2 - 240} cy={h / 2 - 60} r="6" fill={a} fillOpacity="0.7" />
            <circle cx={w / 2 + 270} cy={h / 2 + 110} r="4" fill="#fff" />
          </g>
        )}

        {kind === 'chart' && (
          <g transform={`translate(160, ${h - 280})`}>
            <rect x="0" y="180" width="60" height="80" fill={a} fillOpacity="0.4" rx="2" />
            <rect x="80" y="120" width="60" height="140" fill={a} fillOpacity="0.55" rx="2" />
            <rect x="160" y="60" width="60" height="200" fill={a} fillOpacity="0.7" rx="2" />
            <rect x="240" y="160" width="60" height="100" fill={a} fillOpacity="0.5" rx="2" />
            <rect x="320" y="20" width="60" height="240" fill={a} rx="2" />
            <rect x="400" y="90" width="60" height="170" fill={a} fillOpacity="0.6" rx="2" />
            <path
              d="M 30 200 Q 110 160 190 100 T 350 60 T 510 30"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
          </g>
        )}

        {kind === 'flow' && (
          <g transform={`translate(${w / 2 - 350}, ${h / 2 - 60})`}>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <circle cx={i * 220 + 50} cy="60" r={i === 1 ? 28 : 14} fill={i === 1 ? a : 'transparent'} stroke={a} strokeWidth="2" />
                {i < 3 && (
                  <line
                    x1={i * 220 + 70}
                    y1="60"
                    x2={(i + 1) * 220 + 30}
                    y2="60"
                    stroke={a}
                    strokeOpacity="0.4"
                    strokeDasharray="4 6"
                  />
                )}
              </g>
            ))}
          </g>
        )}

        {kind === 'product' && (
          <g transform={`translate(${w / 2 - 200}, ${h / 2 - 200})`}>
            <rect x="0" y="0" width="400" height="400" rx="20" fill="rgba(255,255,255,0.025)" stroke={a} strokeOpacity="0.35" />
            {/* Stylized chair */}
            <rect x="120" y="100" width="160" height="100" rx="14" fill={a} fillOpacity="0.16" stroke={a} strokeOpacity="0.5" />
            <rect x="120" y="200" width="20" height="120" fill={a} fillOpacity="0.4" />
            <rect x="260" y="200" width="20" height="120" fill={a} fillOpacity="0.4" />
            <rect x="100" y="200" width="200" height="14" rx="4" fill={a} fillOpacity="0.5" />
            <text x="200" y="370" fill={a} fillOpacity="0.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="3">DRAG TO ROTATE</text>
          </g>
        )}

        {kind === 'grid' && (
          <g>
            {Array.from({ length: 36 }).map((_, i) => {
              const col = i % 9;
              const row = Math.floor(i / 9);
              const cx = w / 2 - 320 + col * 80;
              const cy = h / 2 - 140 + row * 80;
              const dist = Math.hypot(cx - w / 2, cy - h / 2);
              const op = Math.max(0, 0.55 - dist / 700);
              return (
                <rect key={i} x={cx} y={cy} width="50" height="50" rx="6" fill={a} fillOpacity={op} />
              );
            })}
          </g>
        )}

        {kind === 'wave' && (
          <g>
            {Array.from({ length: 60 }).map((_, i) => {
              const x = 100 + i * 17;
              const amp = Math.sin(i * 0.45) * 90 + Math.sin(i * 0.18) * 30;
              return (
                <line
                  key={i}
                  x1={x}
                  y1={h / 2 - amp}
                  x2={x}
                  y2={h / 2 + amp}
                  stroke={a}
                  strokeWidth="3"
                  strokeOpacity={0.5 + 0.4 * Math.sin(i * 0.3)}
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        )}

        {/* Heading typography lockup */}
        <g>
          <text
            x="64"
            y="72"
            fill="rgba(255,255,255,0.5)"
            fontFamily="JetBrains Mono, monospace"
            fontSize="13"
            letterSpacing="3"
          >
            {sub}
          </text>
          <text
            x={w - 64}
            y="72"
            fill={a}
            fontFamily="JetBrains Mono, monospace"
            fontSize="13"
            letterSpacing="3"
            textAnchor="end"
          >
            ◆ CASE
          </text>
          <text
            x="64"
            y={h - 56}
            fill="#ffffff"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="120"
            fontWeight="500"
            letterSpacing="-4"
          >
            {heading}
          </text>
        </g>

        {/* Crosshairs */}
        <g stroke="rgba(255,255,255,0.18)">
          <line x1="32" y1="32" x2="32" y2="56" />
          <line x1="32" y1="32" x2="56" y2="32" />
          <line x1={w - 32} y1="32" x2={w - 32} y2="56" />
          <line x1={w - 32} y1="32" x2={w - 56} y2="32" />
          <line x1="32" y1={h - 32} x2="32" y2={h - 56} />
          <line x1="32" y1={h - 32} x2="56" y2={h - 32} />
          <line x1={w - 32} y1={h - 32} x2={w - 32} y2={h - 56} />
          <line x1={w - 32} y1={h - 32} x2={w - 56} y2={h - 32} />
        </g>
      </svg>
    </div>
  );
}
