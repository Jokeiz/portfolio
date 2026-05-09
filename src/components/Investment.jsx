import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Investment — three transparent pricing tiers.
 * USD only, fixed-scope sprints, ~5% below boutique freelance market rate.
 *
 * Anchored above the Contact form so visitors qualify themselves before
 * they hit "Send brief" — fewer time-wasters, warmer leads.
 */

const tiers = [
  {
    name: 'Brand site',
    tag: 'Marketing site · 3–4 weeks',
    price: '3,800',
    cadence: 'fixed scope',
    list: [
      'Up to 6 pages',
      'Custom design + motion',
      'Sanity CMS',
      'Vercel hosting + analytics',
      'Performance guaranteed (≤ 1.6s LCP)',
      '30-day post-launch support',
    ],
    cta: 'Right for: studios, brands, restaurants',
    featured: false,
  },
  {
    name: 'Immersive flagship',
    tag: '3D / interactive · 6 weeks',
    price: '9,400',
    cadence: 'fixed scope',
    list: [
      'Everything in Brand site',
      'Custom Three.js / R3F scene',
      'Scroll-driven story sections',
      'Story-grade motion + microinteractions',
      'Multi-language ready',
      '60-day post-launch support',
    ],
    cta: 'Right for: hospitality, luxury, premium products',
    featured: true,
  },
  {
    name: 'Custom build',
    tag: 'Configurator / commerce · 8+ weeks',
    price: '14,800',
    cadence: 'starting at',
    list: [
      'Everything in Immersive',
      '3D product configurator',
      'Custom commerce flow',
      'Designer / admin dashboard',
      'A/B test instrumentation',
      '90-day post-launch support',
    ],
    cta: 'Right for: e-commerce, real estate, configurable products',
    featured: false,
  },
];

export default function Investment() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.invest-reveal').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          delay: i * 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="investment"
      ref={ref}
      className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 bg-stage"
    >
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 mb-14">
          <div className="col-span-12 md:col-span-4">
            <div className="invest-reveal eyebrow flex items-center gap-3">
              <span className="font-mono text-accent/80">[07]</span>
              <span>Investment</span>
              <span className="flex-1 h-px bg-white/10 ml-2" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="invest-reveal section-title leading-[1.05]">
              Transparent pricing.{' '}
              <span className="text-gradient italic font-light">
                Fixed scope. No surprise invoices.
              </span>
            </h2>
            <p className="invest-reveal mt-6 text-slate-350 max-w-2xl text-lg leading-relaxed">
              Three sprint formats, all USD. Pick the one that matches what you&apos;re
              building — or describe a custom scope and I&apos;ll quote within 24 hours.
              All tiers include a fixed-scope agreement and a 40 / 30 / 30 payment plan.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`invest-reveal relative rounded-2xl p-7 sm:p-8 transition-all duration-500 ${
                t.featured
                  ? 'glass border border-accent/40 glow-ring'
                  : 'glass hover:border-accent/30'
              }`}
            >
              {t.featured && (
                <div className="absolute top-0 left-0 right-0 -translate-y-1/2 flex justify-center">
                  <span className="px-3 py-1 rounded-full bg-accent text-ink-950 font-mono text-[10px] tracking-[0.2em] uppercase font-medium">
                    Most picked
                  </span>
                </div>
              )}

              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-3">
                {t.name}
              </div>
              <div className="font-display text-lg text-slate-150 italic mb-6">
                {t.tag}
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-sm text-slate-450">$</span>
                <span className="font-display text-5xl text-slate-150 tabular-nums">
                  {t.price}
                </span>
              </div>
              <div className="font-mono text-[11px] tracking-widest uppercase text-slate-450 mb-6">
                USD · {t.cadence}
              </div>

              <div className="h-px bg-white/10 mb-6" />

              <ul className="space-y-3 mb-6">
                {t.list.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-250 leading-snug"
                  >
                    <svg
                      className="shrink-0 mt-0.5 text-accent"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="font-mono text-[10px] tracking-widest uppercase text-slate-450 leading-relaxed">
                {t.cta}
              </div>
            </div>
          ))}
        </div>

        <p className="invest-reveal mt-10 font-mono text-[11px] tracking-widest uppercase text-slate-450 text-center">
          ◆ Care plans available from $540 / mo  ·  Hourly rate $90 / hr for ad-hoc work
        </p>
      </div>
    </section>
  );
}
