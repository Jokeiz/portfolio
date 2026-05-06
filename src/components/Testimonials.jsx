import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const notes = [
  {
    n: '01',
    body:
      "Spent six hours optimising a Three.js scene from 4ms to 1.2ms per frame. The trick wasn't what I expected — it was a single texture format change.",
    tag: 'PERFORMANCE',
    color: '#7df9d4',
  },
  {
    n: '02',
    body:
      "Studied four Awwwards Site of the Day winners back to back. Noticed the same thing every time: the typography is the hero, not the 3D. The 3D just frames it.",
    tag: 'CRAFT',
    color: '#a78bfa',
  },
  {
    n: '03',
    body:
      "Best advice I ever got: ship something terrible by Friday. Embarrassment is a faster teacher than perfectionism. I&apos;ve shipped a lot of terrible things since.",
    tag: 'SHIPPING',
    color: '#7df9d4',
  },
  {
    n: '04',
    body:
      "Clients don&apos;t care about your stack. They care about whether their inbox fills with leads after launch. Optimise for that and the stack picks itself.",
    tag: 'FREELANCE',
    color: '#a78bfa',
  },
  {
    n: '05',
    body:
      "Re-read a CSS spec the other day and learnt something new. Six years in, the web still has rooms I haven&apos;t walked into. That&apos;s why I love it.",
    tag: 'LEARNING',
    color: '#7df9d4',
  },
  {
    n: '06',
    body:
      "Your portfolio is your most honest sales pitch. If it doesn&apos;t make you proud at 2am, it isn&apos;t finished. Mine kept me up many nights.",
    tag: 'PHILOSOPHY',
    color: '#a78bfa',
  },
];

function NoteCard({ note }) {
  return (
    <figure className="shrink-0 w-[340px] sm:w-[420px] glass rounded-2xl p-6 sm:p-7 mr-4 sm:mr-6 hover:border-accent/30 transition-all duration-500 group">
      <div className="flex items-start justify-between mb-5">
        <span
          className="font-mono text-[10px] tracking-[0.3em]"
          style={{ color: note.color }}
        >
          ◆ {note.tag}
        </span>
        <span className="font-mono text-[10px] text-slate-450 tracking-widest">
          NOTE / {note.n}
        </span>
      </div>

      <blockquote
        className="text-slate-150 text-[15px] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: `&ldquo;${note.body}&rdquo;` }}
      />

      <figcaption className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
        <span className="font-mono text-[11px] text-slate-450 uppercase tracking-widest">
          From the workshop
        </span>
        <span className="text-slate-450 group-hover:text-accent transition-colors">
          —
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const trackARef = useRef(null);
  const trackBRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.testi-reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      const a = trackARef.current;
      if (a) {
        const w = a.scrollWidth / 2;
        gsap.to(a, { x: -w, duration: 50, ease: 'none', repeat: -1 });
      }
      const b = trackBRef.current;
      if (b) {
        const w = b.scrollWidth / 2;
        gsap.fromTo(b, { x: -w }, { x: 0, duration: 60, ease: 'none', repeat: -1 });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const looped = [...notes, ...notes];

  return (
    <section ref={sectionRef} className="relative py-32 sm:py-40 bg-stage overflow-hidden">
      <div className="container-x mb-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <div className="testi-reveal eyebrow flex items-center gap-3">
              <span className="font-mono text-accent/80">[06]</span>
              <span>Notes</span>
              <span className="flex-1 h-px bg-white/10 ml-2" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="testi-reveal section-title leading-[1.05]">
              Notes from the workshop.{' '}
              <span className="text-slate-450">
                Lessons, half-finished thoughts, and convictions I&apos;ve earned the
                hard way.
              </span>
            </h2>
            <p className="testi-reveal mt-6 max-w-xl text-slate-450 text-sm">
              <span className="text-slate-250">Not testimonials.</span> Not yet — I&apos;m
              new to freelancing. The first quote here will come from{' '}
              <a href="#contact" className="text-accent link-underline">
                the first client who hires me from this site
              </a>
              . Maybe it&apos;ll be you.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <div ref={trackARef} className="flex w-max">
            {looped.map((q, i) => (
              <NoteCard key={`a-${i}`} note={q} />
            ))}
          </div>
        </div>
        <div className="relative">
          <div ref={trackBRef} className="flex w-max">
            {looped.slice().reverse().map((q, i) => (
              <NoteCard key={`b-${i}`} note={q} />
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink-950 to-transparent z-10" />
    </section>
  );
}
