# 3 Projects to Build → Add to Portfolio → Deploy

These are the three I&apos;ve already added to your projects.js as **BUILDING** status. Build them in order. Each one is **2–4 days of focused work**. Each one demonstrates a different skill so they don&apos;t look redundant.

After building each: push to GitHub, deploy on Vercel, then update the project entry in `src/data/projects.js` to set `status: 'LIVE'` and add the live URL.

---

## 🔥 Project 1 — Threadly (3D T-shirt configurator)

**Why this one first:** It&apos;s the most visually impressive. 30 seconds of interaction sells a client harder than 30 minutes of conversation. This is the project a furniture/fashion/product brand sees and immediately DMs you.

### What it does
Visitor lands on the page. They see a realistic 3D T-shirt floating. They can:
- Drag to rotate the shirt 360°
- Click colour swatches to instantly change fabric colour
- Type custom text → it appears on the chest in real time
- Pick a design pattern from a small library
- Download a screenshot of their final design
- Click "Buy" → goes to a fake checkout (or just a mailto)

### Stack
- **Vite + React** (same setup as your portfolio)
- **@react-three/fiber + @react-three/drei**
- **Zustand** (small state manager — easier than Redux)
- **Tailwind CSS**

### File structure
```
threadly/
├─ src/
│  ├─ App.jsx
│  ├─ components/
│  │  ├─ Canvas3D.jsx       ← the 3D scene
│  │  ├─ Tshirt.jsx         ← the model + decals
│  │  ├─ ColorPicker.jsx
│  │  ├─ TextEditor.jsx
│  │  └─ DesignPicker.jsx
│  └─ store.js              ← Zustand store
└─ public/
   └─ tshirt.glb            ← free 3D model from Sketchfab
```

### Key tips
- **Get the 3D model free:** download a T-shirt from sketchfab.com (filter: free, downloadable, .glb format). Search "tshirt low poly".
- **Use drei&apos;s `<Decal>`** to project text/images onto the shirt surface — this is the magic trick.
- **State in Zustand:** `{ color, customText, designUrl }`. Components read it, the 3D scene renders it.
- **Screenshot:** `gl.domElement.toDataURL()` then create an `<a download>` link.
- **Reference:** search "threejs journey shirt configurator" on YouTube — there&apos;s a free 90-min video that walks you through this exact build.

### Time: 3 days
- Day 1: Scene + model loading + drag rotation
- Day 2: Color picker + text decal
- Day 3: Polish + UI + screenshot export + deploy

---

## 🍳 Project 2 — Plate (AI recipe card generator)

**Why this one second:** It proves you can do **full-stack** — frontend + backend + database + an external API. Clients with web apps care a lot about this.

### What it does
- User types a few ingredients ("chicken, lemon, garlic")
- Optional: tone slider (quick weeknight ↔ fancy dinner)
- Hits **Generate** → AI returns a recipe in 5 seconds
- The recipe shows up as a beautifully designed card
- User can save it (stored in MongoDB), share it (a unique URL), or download as image

### Stack
- **Next.js 14** (full-stack — frontend AND backend in one project)
- **MongoDB Atlas** (free tier, browser-managed, no installs)
- **OpenAI API** (or use Groq — Groq has a generous free tier and is faster)
- **Tailwind + shadcn/ui** (pre-built components, makes UI fast)
- **html2canvas** (for the download-as-image feature)

### File structure
```
plate/
├─ app/
│  ├─ page.jsx              ← homepage
│  ├─ recipe/[id]/page.jsx  ← shared recipe URLs
│  └─ api/
│     ├─ generate/route.js  ← calls OpenAI/Groq
│     └─ save/route.js      ← writes to MongoDB
├─ lib/
│  ├─ db.js                 ← MongoDB connection
│  └─ ai.js                 ← AI provider wrapper
└─ components/
   ├─ Form.jsx
   ├─ RecipeCard.jsx
   └─ ShareButtons.jsx
```

### Key tips
- **Free AI:** sign up at console.groq.com — 14,400 free requests/day, fast as hell. Use the `llama-3.1-70b` model.
- **Free MongoDB:** atlas.mongodb.com → free shared cluster → copy connection string. Store it in `.env.local` as `MONGODB_URI`.
- **Prompt the AI like this:** "Return JSON with shape `{title, ingredients, steps, time, servings, difficulty}`. Recipe using: chicken, lemon, garlic. Tone: quick weeknight."
- **Card design:** look at dribbble.com for "recipe card design" — pick one you love, build that exact look.
- **Deploy:** push to GitHub → Vercel auto-detects Next.js → add `MONGODB_URI` and `GROQ_API_KEY` in Vercel&apos;s Environment Variables tab.

### Time: 4 days
- Day 1: UI form + recipe card design
- Day 2: AI integration + JSON parsing
- Day 3: MongoDB save + share URLs
- Day 4: Image download + polish + deploy

---

## ✨ Project 3 — Pulse (Generative shader playground)

**Why this one third:** Pure creative-coding flex. This is what makes designers and creative agencies fall in love with you. It&apos;s also the easiest of the three.

### What it does
- A full-screen GLSL fragment shader animates beautifully
- 6–8 sliders on the side: speed, hue, scale, distortion, etc.
- Each slider tweaks a uniform in real time
- A "Randomize" button generates wild combinations
- A "Save as wallpaper" button exports a 4K PNG of the current state

### Stack
- **Vite + React + Three.js** (no backend needed)
- **react-three/fiber** for the canvas
- A custom GLSL fragment shader (the artwork itself)

### File structure
```
pulse/
├─ src/
│  ├─ App.jsx
│  ├─ components/
│  │  ├─ Scene.jsx          ← Canvas + ShaderPlane
│  │  ├─ ShaderPlane.jsx    ← <mesh> with shaderMaterial
│  │  └─ Controls.jsx       ← sliders
│  └─ shaders/
│     ├─ vertex.glsl
│     └─ fragment.glsl      ← the actual art
```

### Key tips
- **Get a starter shader:** go to **shadertoy.com**, find one you love, copy the GLSL into `fragment.glsl`. Add credit in your repo. Most are CC-licensed.
- **The shader template** is in this repo&apos;s README at the bottom — copy it as a starting point.
- **Uniforms:** in your fragment shader, add `uniform float uSpeed; uniform float uHue;` etc. In React, pass these as props to ShaderMaterial.
- **Export PNG:** `gl.domElement.toBlob(blob => { ... })` then trigger download.
- **Bonus juice:** add audio reactivity — let the shader pulse to microphone input. This is shockingly easy with `navigator.mediaDevices.getUserMedia`.

### Time: 2 days
- Day 1: Shader scene + slider UI + uniform binding
- Day 2: Randomize + export + polish + deploy

---

## After each project — the deploy ritual

Same steps every time:

```bash
# 1. Inside the project folder, init git
git init
git add .
git commit -m "Initial commit"

# 2. Create a new repo on github.com (call it "threadly", "plate", or "pulse")
# 3. Push it
git branch -M main
git remote add origin https://github.com/Jokeiz/PROJECT_NAME.git
git push -u origin main
```

Then go to **vercel.com** → **Add New Project** → import the repo → click **Deploy**. 60 seconds later you have a live URL like `threadly-jokeiz.vercel.app`.

Once you have the live URL:

1. Open `src/data/projects.js` in your portfolio
2. Find the project entry (e.g. `threadly`)
3. Change `status: 'BUILDING'` to `status: 'LIVE'`
4. Change `href: '#'` to `href: 'https://threadly-jokeiz.vercel.app'`
5. Update `metrics` with real numbers (LCP, fps, etc.)
6. Save — your portfolio updates instantly
7. Push your portfolio repo: `git add . && git commit -m "Threadly is live" && git push`

Vercel redeploys your portfolio in 60 seconds with the new project.

---

## Where to share each project once it&apos;s live

This is how you turn a project into clients — don&apos;t skip this step.

### Day of launch — post in this exact order:

1. **Twitter / X** — short thread: "I just shipped a 3D T-shirt configurator built with Three.js + React. Drag, customise, export. Live: [URL]. Code: [GitHub]."
2. **LinkedIn** — same thing but framed as "what I learnt building this"
3. **r/webdev** on Reddit — "Showoff Saturday" thread (every Saturday)
4. **DEV.to** — write a 600-word post: "How I built X in N days"
5. **WhatsApp status** — for friends/family network
6. **Instagram story** — short screen recording

### One week after launch:

7. **Awwwards.com / SOTD submission** — for Threadly and Pulse especially. Even getting **Honorable Mention** = portfolio gold.
8. **Cosmos.so** — designers&apos; site. Add your project to a board.
9. **fwa.com** (Favourite Website Awards) — submit there too.

---

## How this gets you to ₹1.5L

The math:
- **Build** 3 projects in ~10 days of focused work.
- Each project gets **2–5 inbound DMs/emails** when shared widely.
- Convert **2 of those** into ₹15–25k jobs.
- Use those jobs to upgrade your testimonials section with real quotes.
- Now your site has **3 demo projects + 1 real client + 2 fresh testimonials**.
- You raise rates. You apply to better gigs on Upwork / Contra.
- Convert another **3 jobs at ₹25k each** = ₹75k.

That&apos;s **~₹1.25L** before December. The remaining gap closes with one larger project (custom build tier).

**Don&apos;t do these projects in parallel.** Ship one fully — including the launch posts — before starting the next. Real attention beats more output.

---

## Want me to scaffold one of these for you?

If you want, I can write the full starter code for **any one of these three projects** the same way I built your portfolio — files, components, shader, the works. Just say which one. **Threadly is the most impressive flex; Pulse is the fastest to ship.** Pick one and we&apos;ll start.
