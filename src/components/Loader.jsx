import { useEffect, useState } from 'react';

export default function Loader() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 12 + 4);
      setPct(Math.floor(v));
      if (v >= 100) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-ink-950 flex flex-col items-center justify-center transition-opacity duration-700">
      <div className="font-mono text-[10px] tracking-[0.4em] text-slate-450 uppercase mb-6">
        Initializing experience
      </div>
      <div className="flex items-baseline gap-2 mb-10">
        <span className="font-display text-7xl font-medium text-slate-150 tabular-nums">
          {String(pct).padStart(3, '0')}
        </span>
        <span className="font-mono text-sm text-accent">%</span>
      </div>
      <div className="w-72 loader-bar">
        <span />
      </div>
      <div className="absolute bottom-8 font-mono text-[10px] tracking-[0.3em] text-slate-450/60 uppercase">
        Shlok / Portfolio v3
      </div>
    </div>
  );
}
