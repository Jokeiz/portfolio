# Shlok — 3D Portfolio

A handcrafted, performance-tuned portfolio site built with **React + Vite + Three.js + GSAP + Tailwind**. Designed to convert — not just look pretty.

> Live preview: run `npm run dev` after the install steps below.

---

## What's inside

- **3D hero** — distorted icosahedron core, wireframe halo, particle field, mouse-aware camera (React Three Fiber + drei).
- **Skills cube** — rotating 3D cube with labelled faces showing the categories of your stack.
- **Projects** — 6 case-study cards with hand-drawn SVG covers (no stock imagery — they look made, not generated).
- **Process timeline** — scroll-driven gradient line + animated nodes that walk a client through your engagement.
- **Pricing tiers** — three engagement tiers visible up front so you don't get lowball briefs.
- **Testimonials marquee** — two infinite rows scrolling opposite directions.
- **Contact form + 3D orb** — distorted glass sphere, real form that opens an email with the brief pre-filled.
- **Custom magnetic cursor**, scroll progress bar, animated initial loader, smooth scroll via Lenis.
- **Mobile responsive**, prefers-reduced-motion respected, accessible focus states, semantic HTML.

---

## Quick start

You need **Node.js 18 or newer** installed. [Get it here](https://nodejs.org/) if you don't have it.

```bash
# 1. Open the project folder in your terminal
cd "shloks portfolio"

# 2. Install everything
npm install

# 3. Start the dev server
npm run dev
```

Then open http://localhost:5173 in your browser. Edits hot-reload instantly.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Make it yours (the parts to customise)

| File | What to change |
|---|---|
| `index.html` | `<title>`, meta description, Open Graph data |
| `src/components/Hero.jsx` | Headline copy, location, status pill, CTA labels |
| `src/components/About.jsx` | Personal narrative, principles, "trusted by" logo names |
| `src/data/skills.js` | Skill categories, levels, tools list |
| `src/data/projects.js` | Project titles, summaries, stack, metrics, links |
| `src/components/Testimonials.jsx` | Replace `quotes` array with real client testimonials |
| `src/components/Experience.jsx` | Pricing tiers and process phase copy |
| `src/components/Contact.jsx` | Email handler (currently opens Gmail compose) |
| `src/components/Footer.jsx` | Social links, footer name |
| `tailwind.config.js` | The `accent` color (currently `#7df9d4`) — change once, applied site-wide |

### Adding real screenshots to projects

The project covers are SVG art so the site looks intentional even without screenshots. When you're ready to use real shots:

1. Drop screenshots in `public/projects/` (e.g. `helia.jpg`).
2. In `src/data/projects.js`, add a `image: '/projects/helia.jpg'` field.
3. Edit `src/components/ProjectCover.jsx` to render an `<img>` when an image is provided, otherwise fall back to the generated SVG.

### Wiring up the contact form

Right now `Send brief` opens the user's email client with the brief pre-filled. To wire up a real backend:

- **Easiest:** sign up for [Formspree](https://formspree.io/), [Resend](https://resend.com/), or [Web3Forms](https://web3forms.com/). Replace the `handleSubmit` body in `src/components/Contact.jsx` with a `fetch` call to their endpoint.
- **Custom:** create a serverless function on Vercel/Netlify and POST to it.

### Replacing the "portrait"

`src/components/About.jsx` has a stylised SVG silhouette. To use a real photo:

1. Save your photo to `public/portrait.jpg` (3:4 ratio works best).
2. In `About.jsx`, find the `{/* Stylized portrait placeholder */}` block.
3. Replace the `<svg>...</svg>` with `<img src="/portrait.jpg" alt="Shlok" className="absolute inset-0 w-full h-full object-cover" />`.

---

## Deployment

### Vercel (recommended — free, fast, auto SSL)

1. Push this folder to a GitHub repo.
2. Sign up at [vercel.com](https://vercel.com/) with GitHub.
3. Click **Add New Project** → import the repo.
4. Vercel auto-detects Vite — just hit **Deploy**.
5. You get a `*.vercel.app` URL in 60 seconds. Add a custom domain later for free.

### Netlify

1. Push to GitHub.
2. [netlify.com](https://netlify.com/) → **Add new site** → **Import from Git**.
3. Build command: `npm run build` · Publish directory: `dist`.

### Cloudflare Pages

1. Push to GitHub.
2. Cloudflare Dashboard → **Pages** → **Create a project**.
3. Build command: `npm run build` · Output: `dist`.

---

## Performance tips (already baked in)

- 3D scenes use `dpr={[1, 2]}` to cap rendering on high-DPI screens
- Tailwind purges unused classes in production
- Vite splits Three, R3F, and GSAP into separate chunks
- `prefers-reduced-motion` disables animations for users who request it
- Fonts are preconnected and use `display=swap`

If a section feels heavy on a low-end laptop, drop the `Stars` count in `Hero3D.jsx` (line with `radius={50}` etc.) or remove the `Environment preset="city"` line from `Hero3D.jsx`, `SkillsCube.jsx`, and `ContactOrb.jsx`.

---

## Tech stack reference

- **Vite 5** — build tool
- **React 18** — UI
- **@react-three/fiber + @react-three/drei** — declarative Three.js
- **three** — 3D engine
- **gsap + ScrollTrigger** — animations + scroll effects
- **lenis** — smooth scroll
- **framer-motion** — micro-interactions
- **tailwindcss** — styling

---

## License

MIT — yours to ship, fork, sell, modify. Built by Shlok, for Shlok.
