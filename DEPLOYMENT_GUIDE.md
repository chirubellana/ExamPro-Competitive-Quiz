# ExamPro – Public Online Deployment Guide

This guide provides step-by-step instructions to deploy **ExamPro – Competitive Quiz & PWA** publicly on the internet as a 100% static, serverless web application.

---

## 📁 Which Folder to Upload?

You have two simple options:

### ⭐ Recommended: Upload the `dist/` Folder
The `dist/` directory has been prepared specifically for production deployment. It contains exclusively the production-ready code, minified assets, web app manifest, service worker, icons, and hosting headers with zero development clutter.

- **Upload Folder**: `dist/` (located inside your project folder)
- **Use for**: Netlify Drop, Cloudflare Pages direct upload, Vercel CLI, Firebase Hosting public folder, or traditional cPanel/FTP upload.

### Alternative: Upload the Entire Project Root
If you are deploying by pushing your project to a **GitHub / GitLab repository** (for GitHub Pages, Netlify Git, or Vercel Git), you can push the entire repository as-is. Both the root and `dist/` are configured with relative paths and will work immediately.

---

## 🗂️ Production Folder Structure

The production `dist/` package contains **26 self-contained files**:

```
dist/
├── index.html                  # Main SPA entry point & semantic markup
├── manifest.json               # PWA Web App Manifest (standalone, theme colors, shortcuts)
├── service-worker.js           # PWA offline cache engine (Stale-While-Revalidate)
├── robots.txt                  # Search engine crawler permissions
├── .nojekyll                   # Disables Jekyll processing on GitHub Pages
├── _headers                    # Cache & security headers for Netlify / Cloudflare
├── vercel.json                 # Cache header configuration for Vercel
│
├── css/
│   ├── main.css                # Design system, layout, responsive breakpoints, safe-area insets
│   ├── components.css          # Cards, quiz UI, question palette, PWA banner, network pill
│   └── animations.css          # Bounce, pulse, flame, float, and feedback animations
│
├── icons/
│   ├── favicon.svg             # High-contrast scalable SVG app icon
│   ├── icon-192.png            # 192x192 PNG PWA launcher icon
│   ├── icon-512.png            # 512x512 PNG splash screen icon
│   ├── icon-maskable-192.png   # 192x192 Android adaptive maskable icon
│   ├── icon-maskable-512.png   # 512x512 Android adaptive maskable icon
│   └── apple-touch-icon.png    # 180x180 iOS home screen touch icon
│
└── js/
    ├── app.js                  # Master application bootstrap, view router, PWA installer
    ├── ui.js                   # UI controller, theme switcher, canvas confetti, toasts
    ├── state.js                # Reactive state container with persistent localStorage
    ├── quizEngine.js           # Interactive MCQ quiz engine with dynamic timer & feedback
    ├── mockEngine.js           # Full mock test simulator with negative marking & palette
    ├── pyqHub.js               # Previous Year Questions hub with 5 practice modes
    ├── analytics.js            # Weak topic diagnosis & remedial practice generator
    ├── gamification.js         # XP calculations, 11 badges, and simulated All-India leaderboard
    └── data/
        ├── questions.js        # Comprehensive question bank across 11 competitive subjects
        └── mockTests.js        # Exam-standard full mock test specifications
```

---

## 🚀 Free Static Deployment Options

### Method 1: Netlify Drop (Fastest — 30 Seconds, No CLI)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop) (log in or create a free account).
2. Drag and drop the **`dist`** folder directly into the browser window.
3. Netlify will deploy your site immediately and provide a public URL (e.g. `https://exampro-quiz.netlify.app`).
4. Custom domains and automatic free SSL/HTTPS are supported.

---

### Method 2: GitHub Pages (Free & Reliable)
1. Initialize a git repository and push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Deploy ExamPro PWA"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/exampro.git
   git push -u origin main
   ```
2. On GitHub, navigate to **Settings** → **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: Select `/ (root)` or `/dist` (if you pushed only `dist`)
4. Click **Save**. In 1–2 minutes, your app will be live at `https://YOUR_USERNAME.github.io/exampro/`.
5. *(Note: The included `.nojekyll` ensures all icons and scripts load smoothly without Jekyll filtering).*

---

### Method 3: Vercel (One-Click or CLI)
#### Via Vercel Web Dashboard:
1. Push your code to GitHub.
2. Go to [https://vercel.com/new](https://vercel.com/new) and import the repository.
3. Keep build settings empty (no build command needed, pure static).
4. Set Output Directory to `dist` (or leave default `.` if deploying root).
5. Click **Deploy**.

#### Via Vercel CLI:
```bash
npx vercel dist --prod
```

---

### Method 4: Cloudflare Pages
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and select **Workers & Pages**.
2. Click **Create application** → **Pages** → **Upload assets**.
3. Upload the **`dist`** folder.
4. Your site will be deployed globally across Cloudflare's ultra-fast edge network with instant HTTPS.

---

### Method 5: Firebase Hosting
1. If not already logged in:
   ```bash
   npx -y firebase-tools login
   ```
2. Initialize Firebase in the project directory:
   ```bash
   npx -y firebase-tools init hosting
   ```
   - When asked for public directory, enter: `dist`
   - Configure as single-page app: `Yes`
   - Set up automatic builds: `No`
3. Deploy:
   ```bash
   npx -y firebase-tools deploy --only hosting
   ```

---

### Method 6: Traditional Web Hosting (cPanel / Apache / Nginx)
- Connect via FTP or cPanel File Manager.
- Upload all contents inside the **`dist`** folder to your `public_html/` or document root.
- Ensure your server is served over **HTTPS** (Service Workers and PWA installation strictly require an HTTPS connection in production).

---

## 📱 Verifying PWA Installation After Deployment

Once deployed over **HTTPS**:
1. **On Android Chrome / Edge**:
   - Open your public URL.
   - The in-app banner **"Install ExamPro App"** will appear automatically.
   - Tap **"Install Now"** to install it as a standalone app with its own icon on your home screen.
2. **On iPhone / iPad (Safari)**:
   - Open your public URL in Safari.
   - Tap the **Share** button (📤) → **"Add to Home Screen"** (+).
   - ExamPro will open without browser navigation bars.
3. **On Desktop (Chrome, Edge, Brave)**:
   - Click the install icon in the address bar or click **"Install App"** in the top header.
