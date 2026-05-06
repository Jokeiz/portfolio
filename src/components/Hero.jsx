import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Hero3D from './Hero3D';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal headline lines
      const lines = gsap.utils.toArray('.hero-line > span');
      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 1.9,
      });

      // Fade in eyebrow, tagline, CTAs, footer
      gsap.from('.hero-fade', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 2.4,
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={wrapRef}
      className="relative min-h-[100vh] w-full overflow-hidden bg-stage"
    >
      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/0 via-ink-950/0 to-ink-950 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/40 via-transparent to-ink-950/40 pointer-events-none" />
      </div>

      {/* Top bar of secondary info */}
      <div className="relative z-10 container-x pt-32 sm:pt-36 flex justify-between items-start text-xs font-mono text-slate-450">
        <div className="hero-fade flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="tracking-widest uppercase">Booking projects · Q3 2026</span>
        </div>
        <div className="hero-fade hidden sm:flex flex-col items-end gap-1">
          <span className="tracking-widest uppercase">Chennai · UP · Remote-first</span>
          <span className="text-slate-450/60">Build hours: 9 AM – 1 AM IST</span>
        </div>
      </div>

      {/* Main typography */}
      <div className="relative z-10 container-x mt-16 sm:mt-24">
        <div className="hero-fade eyebrow mb-8">
          <span className="text-accent/80">[01]</span>{' '}
          <span className="text-slate-450">Independent web developer & 3D engineer</span>
        </div>

        <h1 className="font-display text-mega font-medium text-slate-150 leading-[0.92] tracking-[-0.04em] max-w-[18ch]">
          <div className="hero-line reveal-mask">
            <span>Crafting the </span>
          </div>
          <div className="hero-line reveal-mask">
            <span className="text-gradient italic font-light">unmistakable</span>
          </div>
          <div className="hero-line reveal-mask">
            <span>web for brands</span>
          </div>
          <div className="hero-line reveal-mask">
            <span>that refuse to blend in.</span>
          </div>
        </h1>

        <p className="hero-fade mt-8 max-w-xl text-slate-350 text-base sm:text-lg leading-relaxed">
          I&apos;m Shlok — a full-stack &amp; 3D web developer building immersive,
          performance-tuned sites that ship in weeks, not quarters. Trusted by founders
          who care about every pixel.
        </p>

        <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="#contact" className="btn-primary inline-flex">
            <span>Start a project</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#work" className="btn-ghost inline-flex" strength={0.2}>
            <span>See selected work</span>
            <span className="font-mono text-xs text-accent/80">04</span>
          </MagneticButton>
        </div>

        {/* Stats strip */}
        <div className="hero-fade mt-16 sm:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
          {[
            { v: '40+', l: 'Sites shipped' },
            { v: '4.9★', l: 'Avg client rating' },
            { v: '<1.4s', l: 'Median LCP' },
            { v: '6 yrs', l: 'Building on the web' },
          ].map((s) => (
            <div key={s.l} className="border-l border-white/10 pl-4">
              <div className="font-display text-2xl sm:text-3xl text-slate-150 tabular-nums">{s.v}</div>
              <div className="font-mono text-[11px] tracking-widest uppercase text-slate-450 mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hero-fade flex flex-col items-center gap-2 text-slate-450">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent animate-scroll-hint" />
      </div>

      {/* Bottom marquee strip */}
      <div className="relative z-10 mt-24 sm:mt-32 border-t border-white/5 py-5 overflow-hidden">
        <div className="marquee-track gap-12 animate-marquee">
          {Array.from({ length: 2 }).map((_, j) => (
            <div key={j} className="flex gap-12 px-6 shrink-0">
              {[
                'React · Next.js',
                'Three.js · WebGL · GLSL',
                'Node · Express · MongoDB',
                'TypeScript · Zustand',
                'GSAP · Framer Motion',
                'Tailwind · Figma',
                'Vercel · AWS · Cloudflare',
                'Headless CMS · Sanity · Contentful',
              ].map((t) => (
                <span
                  key={t + j}
                  className="font-mono text-xs tracking-widest uppercase text-slate-450 flex items-center gap-12"
                >
                  {t}
                  <span className="w-1 h-1 rounded-full bg-accent/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
