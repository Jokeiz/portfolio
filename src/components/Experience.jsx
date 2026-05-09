import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const phases = [
  {
    n: '01',
    title: 'Discovery call',
    duration: '30 min · Free',
    body:
      'We jump on a call. You tell me about the brand, the audience, the deadline, and what success looks like. I&apos;ll already have done my homework on your competitors and reference any sites I think we should learn from.',
    deliverables: ['Project brief', 'Reference doc', 'Risk flags'],
  },
  {
    n: '02',
    title: 'Scope & proposal',
    duration: '48 hours',
    body:
      'You receive a single PDF: clear scope, timeline, milestones, fixed pricing. No moving targets, no surprise invoices. If we don&apos;t match, I&apos;ll point you to someone who&apos;s a better fit.',
    deliverables: ['Pricing sheet', 'Milestone plan', 'Contract'],
  },
  {
    n: '03',
    title: 'Design sprint',
    duration: '1–2 weeks',
    body:
      'High-fidelity Figma mockups, motion direction, and a 3D look-dev pass when relevant. Two structured rounds of feedback — async, on Loom + Figma comments. We don&apos;t move past this until you&apos;re excited.',
    deliverables: ['Figma file', 'Look-dev frames', 'Motion direction'],
  },
  {
    n: '04',
    title: 'Build',
    duration: '2–6 weeks',
    body:
      'Code goes live on a staging URL the same day work starts. You see progress in real time. Weekly Loom check-ins, Linear board for tasks, and your dev environment ready by week two.',
    deliverables: ['Staging URL', 'Linear board', 'Weekly Loom'],
  },
  {
    n: '05',
    title: 'Launch & care',
    duration: 'Ongoing',
    body:
      'I&apos;ll handle DNS, deployment, analytics, and the week-one watch. After launch, you have me on retainer (optional) for tweaks, copy changes, and the inevitable "can we add a section…" requests.',
    deliverables: ['Production launch', '14-day post-launch care', 'Optional retainer'],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.exp-reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      // Animate timeline progress line as user scrolls
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-track',
            start: 'top 60%',
            end: 'bottom 75%',
            scrub: true,
          },
        }
      );

      gsap.utils.toArray('.timeline-node').forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.4, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: node, start: 'top 75%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative py-32 sm:py-40 bg-stage">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 md:col-span-4">
            <div className="exp-reveal eyebrow flex items-center gap-3">
              <span className="font-mono text-accent/80">[05]</span>
              <span>Process</span>
              <span className="flex-1 h-px bg-white/10 ml-2" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="exp-reveal section-title leading-[1.05]">
              Five stages, no surprises.{' '}
              <span className="text-slate-450">
                The exact path from your first email to your site going live.
              </span>
            </h2>
          </div>
        </div>

        <div className="relative timeline-track">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-white/8" aria-hidden />
          <div
            ref={lineRef}
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent to-violet-glow origin-top"
            aria-hidden
          />

          <ol className="space-y-16">
            {phases.map((p) => (
              <li key={p.n} className="relative pl-16 sm:pl-24 grid grid-cols-12 gap-6">
                {/* Node */}
                <span
                  className="timeline-node absolute left-3.5 sm:left-5 top-1 w-6 h-6 rounded-full bg-ink-950 border border-accent/60 flex items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </span>

                <div className="exp-reveal col-span-12 md:col-span-3">
                  <div className="font-mono text-xs text-accent tracking-[0.2em]">
                    PHASE {p.n}
                  </div>
                  <div className="font-mono text-[11px] text-slate-450 mt-1.5">
                    {p.duration}
                  </div>
                </div>

                <div className="exp-reveal col-span-12 md:col-span-9">
                  <h3 className="font-display text-2xl sm:text-3xl text-slate-150 mb-3">
                    {p.title}
                  </h3>
                  <p
                    className="text-slate-350 leading-relaxed mb-4 max-w-2xl"
                    dangerouslySetInnerHTML={{ __html: p.body }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {p.deliverables.map((d) => (
                      <span key={d} className="chip">
                        <span className="text-accent">↳</span> {d}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
