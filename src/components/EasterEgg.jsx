import { useEffect } from 'react';

export default function EasterEgg({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-ink-950/80 backdrop-blur-xl animate-[fadeIn_0.4s_ease]"
      onClick={onClose}
    >
      <div
        className="relative max-w-md mx-4 p-8 sm:p-10 rounded-3xl glass glow-ring text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 text-6xl">🎮</div>
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-3">
          Konami unlocked
        </div>
        <h3 className="font-display text-3xl text-slate-150 mb-4">
          Hi, you found the secret.
        </h3>
        <p className="text-slate-350 leading-relaxed mb-8">
          If you&apos;re curious enough to type the Konami code, we&apos;d probably
          get along. Email me — I&apos;ll knock 10% off your first project just for
          being a nerd.
        </p>
        <a
          href="mailto:shlokrikki@gmail.com?subject=Konami%20code%20discount"
          className="btn-primary"
          onClick={onClose}
        >
          <span>Claim the discount</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
        <button
          onClick={onClose}
          className="block mx-auto mt-6 font-mono text-[11px] uppercase tracking-widest text-slate-450 hover:text-slate-150"
        >
          Close · Esc
        </button>
      </div>
    </div>
  );
}
