import { useEffect, useState } from 'react';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Lab', href: '#lab' },
  { label: 'Play', href: '#play' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container-x">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-500 ${
            scrolled
              ? 'glass py-2.5 glow-ring'
              : 'py-3'
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex w-8 h-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
              <span className="font-display font-bold text-accent text-base">S</span>
              <span className="absolute -right-0.5 -bottom-0.5 w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-[15px] font-medium text-slate-150">Shlok</span>
              <span className="font-mono text-[10px] tracking-widest text-slate-450 uppercase">
                Available · 2026
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm text-slate-250 hover:text-slate-150 transition-colors flex items-center gap-2 group"
              >
                <span className="font-mono text-[10px] text-accent/70 group-hover:text-accent transition-colors">
                  0{i + 1}
                </span>
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-accent text-ink-950 font-medium hover:bg-accent-glow transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ink-950 animate-pulse" />
            Start a project
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-slate-150"
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px bg-slate-150 mb-1.5" />
            <span className="block w-5 h-px bg-slate-150 mb-1.5" />
            <span className="block w-3 h-px bg-accent ml-auto" />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-slate-250 hover:text-accent rounded-lg hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center px-3 py-2.5 rounded-full bg-accent text-ink-950 font-medium text-sm"
            >
              Start a project
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
