import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const principles = [
  {
    n: '01',
    title: 'Performance is a feature',
    body:
      'I build sites that load in under 1.5 seconds — even with heavy 3D scenes. Lazy loading, code splitting, GPU-aware shaders. Lighthouse scores in the 90s aren&apos;t a stretch goal; they&apos;re the floor.',
  },
  {
    n: '02',
    title: 'Pixels with intent',
    body:
      'Every spacing decision, every easing curve, every line of microcopy gets a reason. I work close to designers (or am one), so handoff feels like a conversation, not a war.',
  },
  {
    n: '03',
    title: 'Ship in weeks, not quarters',
    body:
      'Most of my freelance projects ship live in 3-6 weeks. I keep scope honest, communicate constantly, and give you a Notion board so you always know where we stand.',
  },
  {
    n: '04',
    title: 'I write the boring parts well',
    body:
      'Auth flows, admin dashboards, payment integrations, content models. The unglamorous 80% that decides whether your product survives its first year.',
  },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      });

      gsap.utils.toArray('.principle-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 sm:py-40 bg-stage">
      <div className="container-x">
        {/* Heading */}
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 md:col-span-4">
            <div className="about-reveal eyebrow flex items-center gap-3">
              <span className="font-mono text-accent/80">[02]</span>
              <span>About</span>
              <span className="flex-1 h-px bg-white/10 ml-2" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="about-reveal section-title leading-[1.05]">
              Code is my art form.{' '}
              <span className="text-slate-450">
                I treat every site like a canvas — and the brief like the prompt.
              </span>
            </h2>
          </div>
        </div>

        {/* Two column body */}
        <div className="grid grid-cols-12 gap-8 mb-24">
          <div className="col-span-12 md:col-span-5 about-reveal">
            <div className="sticky top-32">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative glass">
                {/* Stylized portrait placeholder — replace src with real photo */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-violet-glow/10 to-ink-700" />
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="hairG" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#1a1e29" />
                      <stop offset="1" stopColor="#11141c" />
                    </linearGradient>
                    <radialGradient id="bgG" cx="50%" cy="40%" r="60%">
                      <stop offset="0" stopColor="rgba(125,249,212,0.18)" />
                      <stop offset="1" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                  </defs>
                  <rect width="400" height="500" fill="url(#bgG)" />
                  {/* Abstract face silhouette */}
                  <ellipse cx="200" cy="200" rx="90" ry="110" fill="#252b3b" />
                  <path d="M110 190 Q200 60 290 190 Q300 230 270 240 L130 240 Q100 230 110 190Z" fill="url(#hairG)" />
                  <path d="M155 380 Q200 320 245 380 Q280 420 280 500 L120 500 Q120 420 155 380Z" fill="#1a1e29" />
                  {/* Frame */}
                  <rect x="10" y="10" width="380" height="480" rx="14" fill="none" stroke="rgba(255,255,255,0.06)" />
                  {/* Tag */}
                  <text x="24" y="36" fill="#7df9d4" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="2">
                    SHLOK / 2026
                  </text>
                  <text x="24" y="478" fill="rgba(255,255,255,0.45)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">
                    PORTRAIT.JPG · REPLACE-ME
                  </text>
                </svg>

                {/* Floating tag */}
                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="font-display text-sm text-slate-150">Shlok</div>
                    <div className="font-mono text-[10px] tracking-widest uppercase text-slate-450">
                      Web · 3D · Product
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 about-reveal space-y-6 text-slate-250 text-lg leading-relaxed">
            <p>
              I started writing code when I was 16 — and somewhere along the way it
              stopped feeling like a job and started feeling like art. The same way some
              people lose hours in oil paint or vinyl, I lose hours in browser tabs and{' '}
              <span className="font-mono text-base text-accent">{'<canvas>'}</span>{' '}
              elements. I&apos;m a college student in Chennai, raised in UP — and I
              don&apos;t build websites because I have to. I build them because I
              genuinely can&apos;t stop.
            </p>
            <p>
              I work with three tools the way a painter works with three brushes:{' '}
              <span className="text-slate-150 font-medium">React / Next.js</span> for
              the structure,{' '}
              <span className="text-slate-150 font-medium">Three.js + GLSL</span> for
              the moments that make people stop scrolling, and a{' '}
              <span className="text-slate-150 font-medium">Node + MongoDB</span>{' '}
              backend when a project needs to actually <em>do</em> something. I love
              the boring parts as much as the flashy ones — auth flows, admin panels,
              database schemas. They&apos;re where the real craft hides.
            </p>
            <p>
              When I&apos;m not shipping, I&apos;m reverse-engineering whatever site
              just made me whisper{' '}
              <em className="text-accent not-italic">how did they do that</em>, then
              writing my own version from scratch until I figure it out. That&apos;s
              the whole secret. There isn&apos;t a course — just relentless curiosity.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-3">
              <a href="#work" className="chip hover:border-accent/40 hover:text-accent transition-colors">
                <span>↳</span> See what I&apos;ve built
              </a>
              <a href="#contact" className="chip hover:border-accent/40 hover:text-accent transition-colors">
                <span>↳</span> Hire me
              </a>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="about-reveal mb-10 flex items-baseline justify-between">
          <h3 className="font-display text-2xl text-slate-150">How I work</h3>
          <span className="font-mono text-xs tracking-widest uppercase text-slate-450">
            04 Principles
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          {principles.map((p) => (
            <div
              key={p.n}
              className="principle-card bg-ink-900/80 hover:bg-ink-800/80 transition-colors p-8 sm:p-10"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-xs tracking-[0.2em] text-accent">{p.n}</span>
                <span className="w-8 h-px bg-white/10" />
              </div>
              <h4 className="font-display text-xl sm:text-2xl text-slate-150 mb-4">{p.title}</h4>
              <p
                className="text-slate-350 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </div>
          ))}
        </div>

        {/* Off the keyboard — the foodie strip. Ties to Plate, signals identity. */}
        <div className="mt-24 about-reveal">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-450">
              Off the keyboard
            </span>
            <span className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            <div className="col-span-12 lg:col-span-7 glass rounded-2xl p-7 sm:p-9 relative overflow-hidden">
              {/* faint masala-dot motif in the corner */}
              <svg
                aria-hidden="true"
                className="absolute -right-6 -bottom-6 opacity-[0.07] pointer-events-none"
                width="220" height="220" viewBox="0 0 220 220"
              >
                {Array.from({ length: 9 }).map((_, i) =>
                  Array.from({ length: 9 }).map((_, j) => (
                    <circle
                      key={`${i}-${j}`}
                      cx={20 + i * 22}
                      cy={20 + j * 22}
                      r={(i + j) % 3 === 0 ? 3 : 1.4}
                      fill="#7df9d4"
                    />
                  ))
                )}
              </svg>

              <div className="relative">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent/80 mb-4">
                  ◆ Vegetarian · Indian · cooks daily
                </div>
                <p className="font-display text-2xl sm:text-3xl text-slate-150 leading-snug mb-5">
                  Plate wasn&apos;t a coding exercise. It was a love letter to the
                  food I grew up with.
                </p>
                <p className="text-slate-350 leading-relaxed mb-6 max-w-2xl">
                  Dal-chawal that took my dadi forty years to perfect, the masala
                  chai that ends every conversation, the paneer sabzi that fixes a
                  bad day. I&apos;m vegetarian by birth and by choice — and somewhere
                  between writing recipe drafts and shipping React components, I
                  built the AI cookbook I actually wanted to use.
                </p>
                <a
                  href="https://plate-henna.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all"
                >
                  <span className="link-underline text-sm font-mono uppercase tracking-widest">
                    Try Plate
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4">
              <FoodTile
                k="Today's fuel"
                v="Masala chai · third cup"
              />
              <FoodTile
                k="House special"
                v="Dadi's rajma — non-negotiable Sundays"
              />
              <FoodTile
                k="Currently testing"
                v="A spice-level slider for Plate v3"
              />
            </div>
          </div>
        </div>

        {/* Currently shipping strip */}
        <div className="mt-16 about-reveal">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-450">
              What I&apos;m up to right now
            </span>
            <span className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                tag: 'LIVE',
                title: 'AK Caterers',
                sub: 'Site shipped for a Moradabad catering brand',
                color: '#7df9d4',
              },
              {
                tag: 'NEXT UP',
                title: 'Three new portfolio pieces',
                sub: '3D configurator · AI tool · scroll story',
                color: '#a78bfa',
              },
              {
                tag: 'OPEN',
                title: '2 freelance slots',
                sub: 'Q3 2026 · Below-market rates',
                color: '#7df9d4',
              },
            ].map((c) => (
              <div
                key={c.title}
                className="glass rounded-xl p-5 hover:border-accent/30 transition-all duration-500"
              >
                <div
                  className="font-mono text-[10px] tracking-[0.2em] mb-3"
                  style={{ color: c.color }}
                >
                  ◆ {c.tag}
                </div>
                <div className="font-display text-lg text-slate-150 mb-1">{c.title}</div>
                <div className="text-sm text-slate-450">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FoodTile({ k, v }) {
  return (
    <div className="glass rounded-xl p-4 sm:p-5 hover:border-accent/30 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <span className="block w-1.5 h-1.5 rounded-full bg-accent" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-450">
          {k}
        </span>
      </div>
      <div className="text-slate-150 text-sm leading-snug">{v}</div>
    </div>
  );
}
