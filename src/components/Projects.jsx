import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import ProjectCover from './ProjectCover';

function StatusPill({ status, small = false }) {
  const map = {
    LIVE: { label: 'Live', color: '#7df9d4', dot: true },
    BUILDING: { label: 'Building', color: '#a78bfa', dot: true },
    ARCHIVED: { label: 'Archived', color: '#7d889c', dot: false },
  };
  const s = map[status] || map.ARCHIVED;
  const size = small ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5';
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono tracking-widest uppercase rounded-full border ${size}`}
      style={{ color: s.color, borderColor: `${s.color}33`, background: `${s.color}0d` }}
    >
      {s.dot && (
        <span
          className="w-1 h-1 rounded-full animate-pulse"
          style={{ background: s.color }}
        />
      )}
      {s.label}
    </span>
  );
}

function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const inner = el.querySelector('.tilt-inner');
    if (!inner) return;

    let rafId = null;
    let pending = null;

    const apply = () => {
      if (!pending) return;
      const { x, y } = pending;
      gsap.to(inner, {
        rotateY: x * 5,
        rotateX: -y * 4,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
        overwrite: true,
      });
      pending = null;
      rafId = null;
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      pending = {
        x: ((e.clientX - r.left) / r.width - 0.5) * 2,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2,
      };
      if (rafId == null) rafId = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      pending = null;
      gsap.to(inner, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ref]);
}

function FeaturedProject({ p, index }) {
  const wrapRef = useRef(null);
  useTilt(wrapRef);
  const isExternal = p.href && p.href !== '#' && p.href.startsWith('http');
  return (
    <a
      href={p.href}
      ref={wrapRef}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className="tilt-card group block relative col-span-12 mb-8"
    >
      <div className="tilt-inner grid grid-cols-12 gap-6 lg:gap-10 items-center">
        <div className="tilt-layer col-span-12 lg:col-span-7">
          <ProjectCover cover={p.cover} index={index} />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs text-accent">★ FEATURED</span>
            {p.status && <StatusPill status={p.status} />}
            <span className="w-8 h-px bg-white/15" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-slate-450">
              {p.year} · {p.duration}
            </span>
          </div>
          <h3 className="font-display text-4xl md:text-5xl text-slate-150 leading-[1.05] mb-3">
            {p.title}
          </h3>
          <p className="text-slate-450 text-sm font-mono uppercase tracking-widest mb-6">
            {p.subtitle}
          </p>
          <p className="text-slate-250 leading-relaxed mb-6">{p.summary}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {p.stack.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {p.metrics.map((m) => (
              <div key={m.l} className="border-l border-accent/30 pl-3">
                <div className="font-display text-xl text-slate-150 tabular-nums">{m.v}</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-slate-450 mt-1 leading-tight">
                  {m.l}
                </div>
              </div>
            ))}
          </div>

          <span className="inline-flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
            <span className="link-underline text-sm">Read the case study</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

function ProjectCard({ p, index }) {
  const wrapRef = useRef(null);
  useTilt(wrapRef);
  const isExternal = p.href && p.href !== '#' && p.href.startsWith('http');
  return (
    <a
      href={p.href}
      ref={wrapRef}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className="tilt-card group block project-item"
    >
      <div className="tilt-inner">
        <div className="overflow-hidden rounded-2xl">
          <div className="transition-transform duration-700 group-hover:scale-[1.02]">
            <ProjectCover cover={p.cover} index={index} />
          </div>
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-display text-xl text-slate-150 group-hover:text-accent transition-colors truncate">
                {p.title}
              </h4>
              {p.status && <StatusPill status={p.status} small />}
            </div>
            <p className="text-slate-450 text-xs font-mono uppercase tracking-widest">
              {p.subtitle}
            </p>
          </div>
          <span className="font-mono text-[10px] text-slate-450 tabular-nums shrink-0">
            {p.year}
          </span>
        </div>

        <p className="mt-3 text-slate-350 text-sm leading-relaxed">{p.summary}</p>

        <div className="mt-4 font-mono text-[10px] text-slate-450 tracking-wider uppercase">
          {p.stack.slice(0, 4).join('  ·  ')}
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.proj-reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" ref={sectionRef} className="relative py-32 sm:py-40 bg-stage">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 md:col-span-4">
            <div className="proj-reveal eyebrow flex items-center gap-3">
              <span className="font-mono text-accent/80">[04]</span>
              <span>Selected work</span>
              <span className="flex-1 h-px bg-white/10 ml-2" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="proj-reveal section-title leading-[1.05]">
              Five projects I&apos;d show first.{' '}
              <span className="text-slate-450">
                Each one shipped, measured, and (mostly) still on the internet.
              </span>
            </h2>
          </div>
        </div>

        {featured && (
          <div className="proj-reveal grid grid-cols-12">
            <FeaturedProject p={featured} index={0} />
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-16 mt-12">
          {rest.map((p, i) => (
            <div key={p.id} className="proj-reveal">
              <ProjectCard p={p} index={i + 1} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="proj-reveal mt-24 flex flex-col items-center text-center gap-6">
          <p className="font-display text-3xl sm:text-4xl text-slate-150 max-w-2xl leading-tight">
            More on request.{' '}
            <span className="text-slate-450">
              Some are under NDA — happy to walk through them on a call.
            </span>
          </p>
          <a href="#contact" className="btn-primary">
            <span>Book a 30-min walkthrough</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
