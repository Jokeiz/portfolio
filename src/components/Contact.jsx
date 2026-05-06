import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactOrb from './ContactOrb';

const projectTypes = [
  'Marketing site',
  'Product landing',
  'E-commerce',
  '3D / immersive',
  'Web app',
  'Other',
];

const budgets = ['$1k–3k', '$3k–8k', '$8k–20k', '$20k+', "Let's talk"];

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    type: '',
    budget: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.contact-reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo handler — wire to Resend/Formspree/your endpoint of choice.
    const subject = encodeURIComponent(`New brief: ${form.name || 'someone'} (${form.type || 'project'})`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nType: ${form.type}\nBudget: ${form.budget}\n\n${form.message}`
    );
    window.location.href = `mailto:shlokrikki@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 sm:py-40 bg-stage">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="contact-reveal eyebrow flex items-center gap-3">
              <span className="font-mono text-accent/80">[07]</span>
              <span>Contact</span>
              <span className="flex-1 h-px bg-white/10 ml-2" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="contact-reveal section-title leading-[1.05]">
              Let&apos;s build something
              <br />
              <span className="text-gradient italic font-light">memorable</span> together.
            </h2>
            <p className="contact-reveal mt-6 text-slate-350 max-w-xl text-lg leading-relaxed">
              Two project slots open for{' '}
              <span className="text-accent">Q3 2026</span>. Send a brief — even a rough
              one — and you&apos;ll hear back within 24 hours.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Left: 3D + contact info */}
          <div className="contact-reveal col-span-12 lg:col-span-5">
            <div className="aspect-square rounded-2xl glass overflow-hidden relative">
              <ContactOrb />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-slate-450">
                <span>{'> Press send'}</span>
                <span className="flex items-center gap-1.5 text-accent">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <a
                href="mailto:shlokrikki@gmail.com"
                className="flex items-center justify-between p-5 glass rounded-xl group hover:border-accent/40 transition-all"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-450 mb-1">
                    Email
                  </div>
                  <div className="text-slate-150 group-hover:text-accent transition-colors">
                    shlokrikki@gmail.com
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-450 group-hover:text-accent group-hover:translate-x-1 transition-all">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="https://wa.me/917060303707?text=Hi%20Shlok%2C%20I%20saw%20your%20portfolio%20and..."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-5 glass rounded-xl group hover:border-accent/40 transition-all"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-450 mb-1">
                    WhatsApp · fastest reply
                  </div>
                  <div className="text-slate-150 group-hover:text-accent transition-colors">
                    +91 70603 03707
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-450 group-hover:text-accent group-hover:translate-x-1 transition-all">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>

              <div className="flex gap-3">
                {[
                  { label: 'GitHub', href: 'https://github.com/Jokeiz' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shlok-pathak-0a96031a7/' },
                  { label: 'WhatsApp', href: 'https://wa.me/917060303707' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center p-3 glass rounded-xl hover:border-accent/40 hover:text-accent transition-all text-xs font-mono uppercase tracking-widest text-slate-250"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-reveal col-span-12 lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 sm:p-8 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <Field
                  label="Your name"
                  required
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Jane Doe"
                />
                <Field
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="jane@studio.com"
                />
              </div>

              <Field
                label="Company / Brand"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
                placeholder="Optional"
              />

              <div>
                <Label>Project type</Label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setForm({ ...form, type: t })}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        form.type === t
                          ? 'bg-accent text-ink-950 font-medium'
                          : 'border border-white/10 text-slate-250 hover:border-accent/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Budget</Label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setForm({ ...form, budget: b })}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        form.budget === b
                          ? 'bg-accent text-ink-950 font-medium'
                          : 'border border-white/10 text-slate-250 hover:border-accent/40'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>What are we building?</Label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="A short paragraph about the brand, the goal, and the deadline. Links to references welcome."
                  className="w-full bg-ink-900/60 border border-white/10 rounded-xl px-4 py-3 text-slate-150 placeholder:text-slate-450 focus:outline-none focus:border-accent/60 transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <p className="font-mono text-[11px] text-slate-450 max-w-xs">
                  Press send and I&apos;ll reply within 24 hours — usually faster.
                </p>
                <button
                  type="submit"
                  disabled={sent}
                  className="btn-primary disabled:opacity-60"
                >
                  <span>{sent ? 'Email opened — almost there' : 'Send brief'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Label({ children }) {
  return (
    <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-450 mb-3">
      {children}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required, type = 'text' }) {
  return (
    <div>
      <Label>{label}{required && <span className="text-accent">*</span>}</Label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-ink-900/60 border border-white/10 rounded-xl px-4 py-3 text-slate-150 placeholder:text-slate-450 focus:outline-none focus:border-accent/60 transition-colors"
      />
    </div>
  );
}
