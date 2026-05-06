import { useEffect, useRef, useState } from 'react';

/**
 * Telemetry — a small fixed-corner HUD for fellow engineers.
 *
 * Live FPS (1s rolling), JS heap (if Chrome), viewport size, build identifier.
 * Click to expand. Hidden on small screens to keep things tidy on mobile.
 */
export default function Telemetry() {
  const [open, setOpen] = useState(false);
  const [fps, setFps] = useState(0);
  const [mem, setMem] = useState(null);
  const [vp, setVp] = useState({ w: 0, h: 0 });
  const lastRef = useRef(performance.now());
  const frameRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight });
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);

    const tick = () => {
      frameRef.current++;
      const now = performance.now();
      const dt = now - lastRef.current;
      if (dt >= 1000) {
        setFps(Math.round((frameRef.current * 1000) / dt));
        frameRef.current = 0;
        lastRef.current = now;
        if (performance.memory) {
          setMem(Math.round(performance.memory.usedJSHeapSize / 1048576));
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Color FPS pill: green ≥55, amber ≥30, red below
  const fpsColor = fps >= 55 ? '#7df9d4' : fps >= 30 ? '#fbbf24' : '#ef4444';

  // Pull build identifier from Vite env (set at build time) or fall back.
  const build =
    (typeof import.meta !== 'undefined' &&
      import.meta.env &&
      (import.meta.env.VITE_GIT_HASH || import.meta.env.VITE_BUILD_ID)) ||
    'dev';

  return (
    <div
      className="hidden md:block fixed bottom-4 right-4 z-30 font-mono text-[10px] tracking-wider"
      style={{ pointerEvents: 'auto' }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="glass rounded-xl border border-white/10 hover:border-accent/40 transition-all flex items-center"
        style={{ padding: open ? '0.6rem 0.85rem' : '0.45rem 0.7rem' }}
        aria-label="Performance telemetry"
      >
        {/* always-visible: FPS pill */}
        <span className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: fpsColor, boxShadow: `0 0 6px ${fpsColor}` }}
          />
          <span className="tabular-nums" style={{ color: fpsColor }}>
            {String(fps).padStart(2, '0')} fps
          </span>
        </span>

        {open && (
          <span className="ml-3 pl-3 border-l border-white/10 text-slate-450 grid grid-cols-[auto_auto] gap-x-3 gap-y-0.5 text-[10px]">
            <span>vp</span>
            <span className="tabular-nums text-slate-250">{vp.w}×{vp.h}</span>
            {mem != null && (
              <>
                <span>heap</span>
                <span className="tabular-nums text-slate-250">{mem} MB</span>
              </>
            )}
            <span>dpr</span>
            <span className="tabular-nums text-slate-250">
              {typeof window !== 'undefined' ? window.devicePixelRatio.toFixed(1) : '–'}
            </span>
            <span>build</span>
            <span className="tabular-nums text-slate-250">{String(build).slice(0, 7)}</span>
          </span>
        )}
      </button>
    </div>
  );
}
