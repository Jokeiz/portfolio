import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'top', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'lab', label: 'Lab' },
  { id: 'play', label: 'Play' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionDots() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      let current = 'top';
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < mid) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 items-end"
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center gap-2"
          aria-label={s.label}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-450 opacity-0 group-hover:opacity-100 transition-opacity">
            {s.label}
          </span>
          <span
            className={`block transition-all duration-500 ${
              active === s.id
                ? 'w-6 h-px bg-accent'
                : 'w-3 h-px bg-white/20 group-hover:bg-white/40'
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
