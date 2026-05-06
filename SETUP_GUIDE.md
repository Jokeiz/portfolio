# Setup Guide — Step by Step

Follow these in order. Don't skip ahead. Each step is small.

---

## Step 1 — Install the three tools you need

You need three pieces of software on your computer. Install them once, you'll never think about them again.

### 1A. Install Node.js (this runs your project)

1. Go to **https://nodejs.org/**
2. Click the big green button labelled **"LTS"** (it says something like "Recommended for most users")
3. Open the downloaded file and click **Next → Next → Install**. Just accept the defaults.
4. **Restart your computer** when it's done. (This is important — Windows needs a restart for Node to be available everywhere.)

**To verify it worked:** After restart, press `Windows key + R`, type `cmd`, press Enter. In the black window, type:

```
node --version
```

If you see something like `v20.x.x` or `v22.x.x`, you're good. If you see "command not found", restart again or reinstall.

### 1B. Install VS Code (this is your code editor)

1. Go to **https://code.visualstudio.com/**
2. Click **Download for Windows**
3. Open the file, click through the installer. **Tick the box that says "Add to PATH"** if you see it.

### 1C. Install Git (this lets you push code to the internet)

1. Go to **https://git-scm.com/download/win**
2. The download starts automatically.
3. Open the file, click **Next** through every screen (defaults are fine).
4. Verify by opening cmd again and typing:

```
git --version
```

---

## Step 2 — Open your portfolio in VS Code

1. Open **VS Code** (you just installed it).
2. On the welcome screen, click **"Open Folder…"**
   - Or use the menu: **File → Open Folder**
3. Navigate to: `Documents → Claude → Projects → shloks portfolio`
4. Click **Select Folder**.
5. If VS Code asks "Do you trust the authors of the files in this folder?", click **Yes, I trust the authors**.

You should now see a file tree on the left with `src/`, `package.json`, `README.md`, etc.

---

## Step 3 — Open the terminal inside VS Code

1. At the top menu, click **Terminal → New Terminal**.
   - Or press the keyboard shortcut: **Ctrl + ` ** (the backtick key, usually under the `Esc` key)
2. A black/grey panel opens at the bottom. That's your terminal — this is where you type commands.

You should see something like:
```
PS C:\Users\shlok\OneDrive\Documents\Claude\Projects\shloks portfolio>
```

The `PS` means PowerShell. That's perfect.

---

## Step 4 — Install the project's dependencies

In the terminal, type this exactly and press **Enter**:

```
npm install
```

**What's happening:** This downloads ~500 small packages your project depends on (React, Three.js, GSAP, Tailwind, etc.) into a folder called `node_modules`.

**How long:** 1–4 minutes the first time. You'll see lots of text scrolling. That's normal.

**What you'll see at the end:** Something like:
```
added 380 packages in 2m
```

**If you see errors** — the most common one is "execution policy" on Windows. Fix:

1. Open **PowerShell as Administrator** (search for it, right-click, "Run as administrator")
2. Type: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
3. Type `Y` and press Enter
4. Close PowerShell, go back to VS Code terminal, try `npm install` again.

---

## Step 5 — Run the website locally

In the same VS Code terminal, type:

```
npm run dev
```

**What you'll see:**
```
  VITE v5.4.x  ready in 800 ms

  ➜  Local:   http://localhost:5173/
```

A browser tab should open automatically showing your portfolio. If it doesn't, hold **Ctrl** and click on `http://localhost:5173/` in the terminal.

**You're now seeing your live portfolio in the browser.** Any change you make in VS Code will hot-reload in the browser instantly.

**To stop the server:** click in the terminal, press **Ctrl + C**, then `Y`.

---

## Step 6 — Customise the content (the parts you must change before sharing)

These are the places where the placeholder content lives. Open each file in VS Code by clicking it in the file tree on the left.

| File | What to update |
|---|---|
| `src/components/Hero.jsx` | Search for "Crafting the" — your headline copy. Also "Bengaluru, IN" if you're somewhere else. |
| `src/components/About.jsx` | The "I&apos;ve been writing for the web since I was 14…" paragraph — make it yours. |
| `src/data/projects.js` | The whole projects list. Even one real project beats six placeholders. |
| `src/components/Testimonials.jsx` | The `quotes` array. Even one real quote helps; just put fewer cards if you only have one. |
| `src/components/Footer.jsx` | The social link `href="#"` values — point them at your real GitHub, Twitter, etc. |
| `src/components/Contact.jsx` | Your email already says `shlokrikki@gmail.com`. Update if needed. |
| `index.html` | The `<title>` and `<meta name="description">` — these show up in Google. |

**How to edit:** Click the file. Find the text. Change it. Save with **Ctrl + S**. The browser auto-refreshes.

---

## Step 7 — Build for production (optional, for testing)

When you want to check that the production version works:

1. Stop the dev server (**Ctrl + C** in terminal).
2. Run:
   ```
   npm run build
   ```
3. Then preview:
   ```
   npm run preview
   ```
4. It opens at http://localhost:4173/

You usually skip this step and let Vercel build it for you in the next step.

---

## Step 8 — Put your code on GitHub

Why: Vercel pulls your code from GitHub to deploy it. Every time you push, your live site updates automatically.

### 8A. Create a GitHub account (if you don't have one)

1. Go to **https://github.com/signup**
2. Use your `shlokrikki@gmail.com` email.
3. Verify the email.

### 8B. Create a new empty repository

1. Once logged in, click the **+** at the top right → **New repository**
2. Repository name: `portfolio` (or anything you like)
3. Description: `My personal portfolio site`
4. Set to **Public** (so Vercel's free tier can read it)
5. **DO NOT** tick "Add a README" or "Add .gitignore" — your project already has those.
6. Click **Create repository**

### 8C. Push your code

GitHub will show you a page with commands. Use these instead — they're customised for your situation. In the **VS Code terminal**, run them one at a time:

```
git init
```

```
git add .
```

```
git commit -m "Initial portfolio site"
```

```
git branch -M main
```

Now copy this next command from the GitHub page (it will have your username in it). It looks like:

```
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
```

(Replace `YOUR_USERNAME` with your actual GitHub username.)

Then:

```
git push -u origin main
```

It may ask you to log in to GitHub. A browser window will pop up — click **Authorize**.

When done, refresh your GitHub repo page. Your code is there.

---

## Step 9 — Deploy to Vercel (this puts your site on the live internet)

1. Go to **https://vercel.com/signup**
2. Click **Continue with GitHub** — log in with the GitHub account you just made.
3. On the dashboard, click **Add New… → Project**
4. You'll see your `portfolio` repo. Click **Import** next to it.
5. **Don't change anything.** Vercel auto-detects Vite. Just click **Deploy**.
6. Wait 60–90 seconds. You'll see a confetti animation.
7. Click **Continue to Dashboard** and then on the screenshot of your site to visit it.

Your site is now live at something like **`https://portfolio-shlok.vercel.app`**. That URL works on every browser, every phone, anywhere in the world. Free forever.

### 9A. Update your live site

Whenever you change something:

```
git add .
git commit -m "Updated projects section"
git push
```

Vercel detects the push and redeploys in 60 seconds. **No manual deploy ever needed.**

### 9B. Add a custom domain (optional, ~₹800/year)

1. Buy a domain from **GoDaddy / Namecheap / Cloudflare** (e.g. `shlokbuilds.com`).
2. In Vercel: project settings → **Domains** → type your domain → follow the on-screen DNS instructions.
3. SSL is automatic and free.

---

## Step 10 — Share it everywhere

Once live, your portfolio URL goes in:

- Email signature
- LinkedIn "About" section + Featured section
- Twitter / X bio
- Upwork / Contra / Wellfound profile
- Cold-outreach DMs and emails
- WhatsApp status when you launch it

---

## Troubleshooting

**`npm install` fails with permission errors**
Run terminal as administrator OR run `npm cache clean --force` then try again.

**`npm run dev` says "port 5173 in use"**
Press Ctrl + C to stop, OR run `npm run dev -- --port 3000`.

**The 3D scenes are slow on my laptop**
Open `src/components/Hero3D.jsx` and reduce the particle count from `2000` to `500`.

**Google fonts not loading**
Check your internet. The fonts come from `fonts.googleapis.com`.

**`git push` asks for password**
It now uses tokens, not passwords. Follow the prompts in the browser window when GitHub authentication popup opens.

**Site is white / broken on Vercel**
Look at Vercel's "Deployments" tab → click the failed one → read the build log. 95% of the time it's a typo from a recent edit.

**I broke something and the site won't load locally**
In VS Code, Ctrl + Z until you go back. Or if you've pushed: `git revert HEAD` and `git push`.

---

## What to do today, in order

1. Step 1 — install Node, VS Code, Git (30 minutes incl. restart)
2. Step 2-5 — open in VS Code and run `npm install` then `npm run dev` (5 min)
3. Step 6 — change "Bengaluru, IN" if needed, change one project to a real one (15 min)
4. Step 8-9 — push to GitHub and deploy to Vercel (15 min)

**Total: 1 hour to a live, public, beautiful portfolio URL.**

Then keep customising over the next few days. Don't wait for it to be "perfect" before going live — perfect is the enemy of paid.
