import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories, tools } from '../data/skills';
import SkillsCube from './SkillsCube';
import CircuitField from './CircuitField';

export default function Skills() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(skillCategories[0].id);
  const activeCat = skillCategories.find((c) => c.id === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.skills-reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate the bars whenever active changes
  useEffect(() => {
    gsap.fromTo(
      '.skill-bar-fill',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.06,
      }
    );
    gsap.fromTo(
      '.skill-row',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.04 }
    );
  }, [active]);

  return (
    <section id="stack" ref={sectionRef} className="relative py-32 sm:py-40 bg-stage overflow-hidden">
      <CircuitField opacity={0.09} density="low" seed={11} />
      <div className="container-x relative z-10">
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 md:col-span-4">
            <div className="skills-reveal eyebrow flex items-center gap-3">
              <span className="font-mono text-accent/80">[03]</span>
              <span>Stack</span>
              <span className="flex-1 h-px bg-white/10 ml-2" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="skills-reveal section-title leading-[1.05]">
              Tools I&apos;ve bent until they sing.{' '}
              <span className="text-slate-450">
                The stack behind every project — chosen for the work, not the resume.
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* 3D Cube */}
          <div className="skills-reveal col-span-12 lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-square rounded-2xl glass overflow-hidden">
              <SkillsCube />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-slate-450">
                <span>{'> Stack visualization'}</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Live
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] tracking-widest uppercase text-slate-450/60">
                Drag-free. Scroll-aware. ~ 60fps.
              </div>
            </div>
          </div>

          {/* Skill detail panel */}
          <div className="skills-reveal col-span-12 lg:col-span-7 order-1 lg:order-2">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skillCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`px-4 py-2.5 rounded-full text-sm transition-all ${
                    active === c.id
                      ? 'bg-accent text-ink-950 font-medium'
                      : 'border border-white/10 text-slate-250 hover:border-accent/40 hover:text-slate-150'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Active category */}
            <div className="glass rounded-2xl p-6 sm:p-8" key={active}>
              <p className="text-slate-350 leading-relaxed mb-8 max-w-prose">
                {activeCat.description}
              </p>

              <div className="space-y-4">
                {activeCat.items.map((s, i) => (
                  <div key={s.name} className="skill-row">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-slate-150 text-sm">{s.name}</span>
                      <span className="font-mono text-[10px] text-slate-450 tabular-nums">
                        {String(s.level).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="h-px bg-white/5 relative overflow-hidden">
                      <div
                        className="skill-bar-fill absolute inset-y-0 left-0 origin-left"
                        style={{
                          width: `${s.level}%`,
                          background: `linear-gradient(90deg, ${activeCat.accent}, ${activeCat.accent}80)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tool chips */}
        <div className="skills-reveal mt-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-450">
              And the rest of the toolbox
            </span>
            <span className="flex-1 h-px bg-white/10" />
          </div>
          <div className="flex flex-wrap gap-2.5">
            {tools.map((t) => (
              <span
                key={t}
                className="chip hover:border-accent/40 hover:text-accent transition-all duration-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
