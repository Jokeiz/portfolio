import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('shlokrikki@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* very old browser — silent fall-through */
    }
  };

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-10 bg-ink-950">
      <div className="container-x">
        {/* Massive name */}
        <div className="mb-16 overflow-hidden">
          <h2 className="font-display text-[clamp(4rem,18vw,16rem)] leading-[0.85] tracking-[-0.06em] text-slate-150/15 select-none">
            shlok<span className="text-accent/40">.</span>dev
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                <span className="font-display font-bold text-accent text-base">S</span>
              </span>
              <span className="font-display text-slate-150">Shlok</span>
            </div>
            <p className="text-slate-350 text-sm leading-relaxed max-w-sm">
              Independent web developer building immersive, performance-tuned sites.
              Booking projects through Q3 2026.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-450 mb-4">
              Sitemap
            </div>
            <ul className="space-y-2 text-sm text-slate-250">
              <li><a href="#about" className="link-underline hover:text-accent transition-colors">About</a></li>
              <li><a href="#stack" className="link-underline hover:text-accent transition-colors">Stack</a></li>
              <li><a href="#work" className="link-underline hover:text-accent transition-colors">Work</a></li>
              <li><a href="#lab" className="link-underline hover:text-accent transition-colors">Lab</a></li>
              <li><a href="#contact" className="link-underline hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-450 mb-4">
              Elsewhere
            </div>
            <ul className="space-y-2 text-sm text-slate-250">
              <li>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="link-underline hover:text-accent transition-colors text-left"
                  aria-label="Copy email to clipboard"
                >
                  {copied ? 'Copied — paste anywhere' : 'shlokrikki@gmail.com'}
                </button>
              </li>
              <li><a href="https://wa.me/917060303707" target="_blank" rel="noreferrer" className="link-underline hover:text-accent transition-colors">WhatsApp · +91 70603 03707</a></li>
              <li><a href="https://github.com/Jokeiz" target="_blank" rel="noreferrer" className="link-underline hover:text-accent transition-colors">github.com/Jokeiz</a></li>
              <li><a href="https://www.linkedin.com/in/shlok-pathak-0a96031a7/" target="_blank" rel="noreferrer" className="link-underline hover:text-accent transition-colors">LinkedIn · shlok-pathak</a></li>
            </ul>
          </div>
        </div>

        <div className="divider mb-6" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-[11px] tracking-widest uppercase text-slate-450">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            All systems operational · Chennai · UP, IN
          </div>
          <div className="flex items-center gap-6">
            <span>© 2026 Shlok</span>
            <span>v3.0 · Fuelled by chai &amp; React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
