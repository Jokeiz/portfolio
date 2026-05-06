import { useEffect, useState } from 'react';

const HINTS = [
  ['G', 'GitHub'],
  ['W', 'Work'],
  ['A', 'About'],
  ['S', 'Stack'],
  ['P', 'Process'],
  ['C', 'Contact'],
  ['T', 'Top'],
];

export default function KeyboardHint() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target?.tagName || '').toLowerCase();
      if (['input', 'textarea'].includes(tag)) return;
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Closed pill */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`hidden lg:flex fixed bottom-6 right-6 z-30 items-center gap-2 px-3.5 py-2 rounded-full glass hover:border-accent/40 transition-all ${
          open ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-150">?</kbd>
        <span className="font-mono text-[11px] tracking-widest uppercase text-slate-450">
          shortcuts
        </span>
      </button>

      {/* Open panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-30 glass rounded-2xl p-5 w-72 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent">
              Keyboard
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-450 hover:text-slate-150 text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <ul className="space-y-2.5">
            {HINTS.map(([k, label]) => (
              <li key={k} className="flex items-center justify-between text-sm">
                <span className="text-slate-250">{label}</span>
                <kbd className="font-mono text-[11px] px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-150">
                  {k}
                </kbd>
              </li>
            ))}
            <li className="flex items-center justify-between text-sm pt-2 border-t border-white/5 mt-2">
              <span className="text-slate-450 text-xs">Try the ↑↑↓↓←→←→BA combo</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
