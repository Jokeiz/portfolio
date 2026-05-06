import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CircuitField from './CircuitField';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useInView } from '../hooks/useInView';

/**
 * LogicLab — interactive digital-logic playground.
 *
 * Two modes:
 *   1. Half adder  : SUM = A ⊕ B,  CARRY = A · B
 *   2. Full adder  : SUM = A ⊕ B ⊕ Cin,  COUT = (A·B) + (Cin·(A⊕B))
 *
 * State is driven by toggleable input bits. Wires that carry a HIGH signal
 * light up and animate an electron pulse along their length. Gate bodies
 * fill with accent when their output is 1. The truth table updates and
 * highlights the current row in real time.
 *
 * Pure SVG, no canvas, no shaders — keeps the engineering-honest aesthetic.
 */

const ACCENT = '#7df9d4';
const ACCENT_DIM = 'rgba(125, 249, 212, 0.22)';
const PURPLE = '#a78bfa';
const INK = '#0a0c12';

export default function LogicLab() {
  const sectionRef = useRef(null);
  const [viewRef, inView] = useInView({ rootMargin: '100px' });
  const [mode, setMode] = useState('half'); // 'half' | 'full'
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [cin, setCin] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.lab-reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lab"
      ref={(el) => {
        sectionRef.current = el;
        viewRef.current = el;
      }}
      className="relative py-32 sm:py-40 bg-stage overflow-hidden"
    >
      <CircuitField opacity={0.1} density="low" seed={42} />

      <div className="container-x relative z-10">
        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 md:col-span-4">
            <div className="lab-reveal eyebrow flex items-center gap-3">
              <span className="font-mono text-accent/80">[06]</span>
              <span>Logic Lab</span>
              <span className="flex-1 h-px bg-white/10 ml-2" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="lab-reveal section-title leading-[1.05]">
              From transistors up.{' '}
              <span className="text-gradient italic font-light">
                A live half-adder you can poke.
              </span>
            </h2>
            <p className="lab-reveal mt-6 text-slate-350 max-w-2xl text-lg leading-relaxed">
              Toggle the input bits. Watch the electrons traverse the copper. Every gate is
              evaluated in real time — no animations, just truth. The same primitives that
              add two numbers inside your CPU's ALU.
            </p>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="lab-reveal flex flex-wrap gap-2 mb-6">
          {[
            { id: 'half', label: 'Half adder' },
            { id: 'full', label: 'Full adder' },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all font-mono uppercase tracking-widest ${
                mode === m.id
                  ? 'bg-accent text-ink-950 font-medium'
                  : 'border border-white/10 text-slate-250 hover:border-accent/40'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="lab-reveal grid grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Schematic */}
          <div className="col-span-12 lg:col-span-8 glass rounded-2xl p-4 sm:p-6 overflow-x-auto">
            {mode === 'half' ? (
              <HalfAdderSVG a={a} b={b} animate={inView} />
            ) : (
              <FullAdderSVG a={a} b={b} cin={cin} animate={inView} />
            )}
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-slate-450">
              <span>{mode === 'half' ? 'IEEE 91-1984 · 2-bit adder' : 'IEEE 91-1984 · 1-bit full adder'}</span>
              <span className="hidden sm:inline">Live evaluated</span>
            </div>
          </div>

          {/* Inputs panel */}
          <div className="col-span-12 lg:col-span-4 glass rounded-2xl p-6 flex flex-col">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-450 mb-4">
              Inputs
            </div>

            <BitToggle label="A" value={a} onChange={setA} />
            <BitToggle label="B" value={b} onChange={setB} />
            {mode === 'full' && (
              <BitToggle label="Cin" value={cin} onChange={setCin} />
            )}

            <div className="my-5 divider" />

            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-450 mb-4">
              Outputs
            </div>

            {mode === 'half' ? (
              <>
                <BitReadout label="SUM" value={a ^ b} />
                <BitReadout label="CARRY" value={a & b} />
              </>
            ) : (
              <>
                <BitReadout label="SUM" value={a ^ b ^ cin} />
                <BitReadout
                  label="COUT"
                  value={(a & b) | (cin & (a ^ b))}
                />
              </>
            )}

            <div className="mt-auto pt-5 font-mono text-[11px] text-slate-450 leading-relaxed">
              {mode === 'half' ? (
                <>
                  <code className="text-accent">SUM = A ⊕ B</code>
                  <br />
                  <code className="text-accent">CARRY = A · B</code>
                </>
              ) : (
                <>
                  <code className="text-accent">SUM = A ⊕ B ⊕ Cin</code>
                  <br />
                  <code className="text-accent">COUT = (A·B) + (Cin·(A⊕B))</code>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Truth table */}
        <div className="lab-reveal mt-6">
          {mode === 'half' ? (
            <TruthTable
              header={['A', 'B', 'SUM', 'CARRY']}
              rows={TT_HALF}
              highlight={(row) => row[0] === a && row[1] === b}
            />
          ) : (
            <TruthTable
              header={['A', 'B', 'Cin', 'SUM', 'COUT']}
              rows={TT_FULL}
              highlight={(row) => row[0] === a && row[1] === b && row[2] === cin}
            />
          )}
        </div>
      </div>
    </section>
  );
}

// -------------- truth tables --------------
const TT_HALF = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [1, 0, 1, 0],
  [1, 1, 0, 1],
];

const TT_FULL = (() => {
  const rows = [];
  for (let i = 0; i < 8; i++) {
    const a = (i >> 2) & 1;
    const b = (i >> 1) & 1;
    const c = i & 1;
    const sum = a ^ b ^ c;
    const cout = (a & b) | (c & (a ^ b));
    rows.push([a, b, c, sum, cout]);
  }
  return rows;
})();

// -------------- pieces --------------
function BitToggle({ label, value, onChange }) {
  const on = value === 1;
  return (
    <button
      type="button"
      onClick={() => onChange(on ? 0 : 1)}
      className="flex items-center justify-between w-full p-3 mb-3 rounded-xl border border-white/10 hover:border-accent/40 transition-all group"
    >
      <span className="font-mono text-sm text-slate-150">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xl tabular-nums" style={{ color: on ? ACCENT : '#7d889c' }}>
          {value}
        </span>
        <span
          className="relative inline-block w-10 h-5 rounded-full transition-colors"
          style={{
            background: on ? ACCENT : 'rgba(255,255,255,0.08)',
            boxShadow: on ? `0 0 14px ${ACCENT}` : 'none',
          }}
        >
          <span
            className="absolute top-0.5 w-4 h-4 rounded-full bg-ink-950 transition-all"
            style={{ left: on ? '22px' : '2px' }}
          />
        </span>
      </div>
    </button>
  );
}

function BitReadout({ label, value }) {
  const on = value === 1;
  return (
    <div className="flex items-center justify-between w-full p-3 mb-3 rounded-xl border border-white/10">
      <span className="font-mono text-sm text-slate-250">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xl tabular-nums" style={{ color: on ? ACCENT : '#7d889c' }}>
          {value}
        </span>
        {/* LED */}
        <span
          className="relative inline-block w-3 h-3 rounded-full"
          style={{
            background: on ? ACCENT : 'rgba(255,255,255,0.08)',
            boxShadow: on ? `0 0 12px ${ACCENT}, 0 0 4px ${ACCENT}` : 'none',
          }}
        />
      </div>
    </div>
  );
}

function TruthTable({ header, rows, highlight }) {
  return (
    <div className="glass rounded-2xl p-5 sm:p-6 overflow-x-auto">
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-450 mb-3">
        Truth table · current state highlighted
      </div>
      <table className="w-full font-mono text-sm">
        <thead>
          <tr className="text-slate-450">
            {header.map((h) => (
              <th key={h} className="text-left py-2 pr-6 font-medium tracking-widest text-[11px] uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const active = highlight(row);
            return (
              <tr
                key={i}
                className={`border-t border-white/5 transition-colors ${
                  active ? 'bg-accent/10' : ''
                }`}
              >
                {row.map((v, j) => (
                  <td
                    key={j}
                    className={`py-2 pr-6 tabular-nums ${
                      active ? 'text-accent' : 'text-slate-250'
                    }`}
                  >
                    {v}
                    {active && j === 0 && (
                      <span className="ml-2 text-[10px] tracking-widest">◀ NOW</span>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// -------------- gate symbols (IEEE) --------------
function GateXor({ x, y, active }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* extra back curve */}
      <path
        d="M -8 0 Q 6 25 -8 50"
        fill="none"
        stroke={active ? ACCENT : '#7d889c'}
        strokeWidth="1.6"
      />
      {/* main OR body */}
      <path
        d="M -2 0 Q 12 25 -2 50 Q 30 50 50 25 Q 30 0 -2 0 Z"
        fill={active ? ACCENT : '#1a1d28'}
        stroke={active ? ACCENT : '#7d889c'}
        strokeWidth="1.6"
        opacity={active ? 0.9 : 1}
      />
      <text x="22" y="29" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill={active ? INK : '#cdd5e1'} fontWeight="700">XOR</text>
    </g>
  );
}

function GateAnd({ x, y, active }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M 0 0 L 22 0 A 25 25 0 0 1 22 50 L 0 50 Z"
        fill={active ? ACCENT : '#1a1d28'}
        stroke={active ? ACCENT : '#7d889c'}
        strokeWidth="1.6"
      />
      <text x="22" y="29" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill={active ? INK : '#cdd5e1'} fontWeight="700">AND</text>
    </g>
  );
}

function GateOr({ x, y, active }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M 0 0 Q 14 25 0 50 Q 30 50 48 25 Q 30 0 0 0 Z"
        fill={active ? ACCENT : '#1a1d28'}
        stroke={active ? ACCENT : '#7d889c'}
        strokeWidth="1.6"
      />
      <text x="22" y="29" textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill={active ? INK : '#cdd5e1'} fontWeight="700">OR</text>
    </g>
  );
}

// -------------- wires --------------
/**
 * A wire is a path. If `active` we light it accent and overlay a moving electron.
 */
function Wire({ d, active, dur = 1.2, electronColor = ACCENT, animate = true }) {
  const reduced = useReducedMotion();
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={active ? ACCENT : ACCENT_DIM}
        strokeWidth={active ? 2 : 1.4}
        strokeLinecap="round"
        strokeLinejoin="miter"
        style={{ transition: 'stroke 0.18s, stroke-width 0.18s' }}
      />
      {active && animate && !reduced && (
        <circle r="2.6" fill={electronColor}>
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} />
        </circle>
      )}
    </g>
  );
}

function Pin({ x, y, active, label, side = 'left', big = false }) {
  const r = big ? 8 : 5;
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={active ? ACCENT : '#1a1d28'}
        stroke={active ? ACCENT : '#7d889c'}
        strokeWidth="1.6"
        style={{ filter: active ? `drop-shadow(0 0 6px ${ACCENT})` : 'none', transition: 'all 0.18s' }}
      />
      {label && (
        <text
          x={side === 'left' ? x - 14 : x + 14}
          y={y + 4}
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          fill="#cdd5e1"
          textAnchor={side === 'left' ? 'end' : 'start'}
        >
          {label}
        </text>
      )}
    </g>
  );
}

// -------------- half adder SVG --------------
function HalfAdderSVG({ a, b, animate = true }) {
  const sum = a ^ b;
  const carry = a & b;

  // Layout
  // A (50,80) ─┐
  //            ├─ XOR top input (240,100)  → SUM (560,110)
  // B (50,160)─┤
  //            ├─ AND top input (240,190)  → CARRY (560,200)
  //            └─...

  // Wire A: 50,80 → 180,80 (junction). From there: down to 180,100 → right to 240,100. Plus down to 180,190 → right to 240,190.
  const wA1 = 'M 50 80 L 180 80 L 180 100 L 240 100';
  const wA2 = 'M 180 80 L 180 190 L 240 190';
  // Wire B: 50,160 → 210,160 (junction). From there: up to 210,120 → right to 240,120. Plus down to 210,210 → right to 240,210.
  const wB1 = 'M 50 160 L 210 160 L 210 120 L 240 120';
  const wB2 = 'M 210 160 L 210 210 L 240 210';

  // XOR output: 290,110 → 560,110
  const wSum = 'M 290 110 L 560 110';
  // AND output: 290,200 → 560,200
  const wCarry = 'M 290 200 L 560 200';

  return (
    <svg viewBox="0 0 620 280" width="100%" style={{ display: 'block', minWidth: 580 }}>
      {/* Input pins */}
      <Pin x={50} y={80} active={a === 1} label="A" big />
      <Pin x={50} y={160} active={b === 1} label="B" big />

      {/* Wires */}
      <Wire d={wA1} active={a === 1} dur={1.0} animate={animate} />
      <Wire d={wA2} active={a === 1} dur={1.6} animate={animate} />
      <Wire d={wB1} active={b === 1} dur={1.1} animate={animate} />
      <Wire d={wB2} active={b === 1} dur={1.7} animate={animate} />

      {/* Junction dots */}
      <circle cx={180} cy={80} r="3" fill={a === 1 ? ACCENT : '#7d889c'} />
      <circle cx={210} cy={160} r="3" fill={b === 1 ? ACCENT : '#7d889c'} />

      {/* Gates */}
      <GateXor x={240} y={85} active={sum === 1} />
      <GateAnd x={240} y={175} active={carry === 1} />

      {/* Output wires */}
      <Wire d={wSum} active={sum === 1} dur={0.9} animate={animate} />
      <Wire d={wCarry} active={carry === 1} dur={0.9} animate={animate} />

      {/* Output pins */}
      <Pin x={560} y={110} active={sum === 1} label="SUM" side="right" big />
      <Pin x={560} y={200} active={carry === 1} label="CARRY" side="right" big />
    </svg>
  );
}

// -------------- full adder SVG --------------
function FullAdderSVG({ a, b, cin, animate = true }) {
  // Half-adder 1: A,B → s1, c1
  const s1 = a ^ b;
  const c1 = a & b;
  // Half-adder 2: s1, Cin → SUM, c2
  const sum = s1 ^ cin;
  const c2 = s1 & cin;
  // OR: c1 | c2 → COUT
  const cout = c1 | c2;

  // Layout: two stacked half-adders plus an OR gate on the right.
  // A (40,60), B (40,130), Cin (40,210)
  // XOR1 at (140,55) → s1
  // AND1 at (140,165) → c1
  // XOR2 at (320,90) → SUM
  // AND2 at (320,160) → c2
  // OR  at (470,210) → COUT

  return (
    <svg viewBox="0 0 700 320" width="100%" style={{ display: 'block', minWidth: 660 }}>
      {/* Inputs */}
      <Pin x={40} y={60} active={a === 1} label="A" big />
      <Pin x={40} y={130} active={b === 1} label="B" big />
      <Pin x={40} y={210} active={cin === 1} label="Cin" big />

      {/* A wires */}
      <Wire d="M 40 60 L 110 60 L 110 70 L 140 70" active={a === 1} dur={1.0} animate={animate} />
      <Wire d="M 110 60 L 110 180 L 140 180" active={a === 1} dur={1.6} animate={animate} />
      <circle cx={110} cy={60} r="3" fill={a === 1 ? ACCENT : '#7d889c'} />

      {/* B wires */}
      <Wire d="M 40 130 L 90 130 L 90 90 L 140 90" active={b === 1} dur={1.1} animate={animate} />
      <Wire d="M 90 130 L 90 200 L 140 200" active={b === 1} dur={1.4} animate={animate} />
      <circle cx={90} cy={130} r="3" fill={b === 1 ? ACCENT : '#7d889c'} />

      {/* HA1 gates */}
      <GateXor x={140} y={55} active={s1 === 1} />
      <GateAnd x={140} y={165} active={c1 === 1} />

      {/* s1 fans out: to XOR2 top input and AND2 top input */}
      <Wire d="M 190 80 L 240 80 L 240 100 L 320 100" active={s1 === 1} dur={1.0} animate={animate} />
      <Wire d="M 240 80 L 240 170 L 320 170" active={s1 === 1} dur={1.5} animate={animate} />
      <circle cx={240} cy={80} r="3" fill={s1 === 1 ? ACCENT : '#7d889c'} />

      {/* Cin fans out: to XOR2 bottom input and AND2 bottom input */}
      <Wire d="M 40 210 L 270 210 L 270 120 L 320 120" active={cin === 1} dur={1.4} animate={animate} />
      <Wire d="M 270 210 L 270 190 L 320 190" active={cin === 1} dur={1.0} animate={animate} />
      <circle cx={270} cy={210} r="3" fill={cin === 1 ? ACCENT : '#7d889c'} />

      {/* HA2 gates */}
      <GateXor x={320} y={85} active={sum === 1} />
      <GateAnd x={320} y={155} active={c2 === 1} />

      {/* SUM output */}
      <Wire d="M 370 110 L 660 110" active={sum === 1} dur={0.9} animate={animate} />
      <Pin x={660} y={110} active={sum === 1} label="SUM" side="right" big />

      {/* c2 to OR top input */}
      <Wire d="M 370 180 L 440 180 L 440 215 L 470 215" active={c2 === 1} dur={1.0} animate={animate} />
      {/* c1 from HA1 to OR bottom input */}
      <Wire d="M 190 190 L 200 190 L 200 245 L 470 245" active={c1 === 1} dur={1.4} animate={animate} />

      {/* OR gate */}
      <GateOr x={470} y={205} active={cout === 1} />

      {/* COUT output */}
      <Wire d="M 518 230 L 660 230" active={cout === 1} dur={0.9} animate={animate} />
      <Pin x={660} y={230} active={cout === 1} label="COUT" side="right" big />
    </svg>
  );
}
