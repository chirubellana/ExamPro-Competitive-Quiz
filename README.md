# ExamPro – Competitive Quiz & PWA Platform

> A modern, mobile-first Progressive Web App (PWA) designed to prepare aspirants for competitive exams (SSC CGL/CHSL, Banking IBPS/SBI PO/Clerk, RRB NTPC, UPSC CSAT, State PSCs, and Police exams).

---

## 🚀 Highlights & Features

- **⚡ 100% Offline Ready**: Works completely without internet via Service Worker caching.
- **📱 Fully Installable PWA**: Standalone app display on Android, iOS, and Desktop with custom icons and app shortcuts.
- **🏛️ Verified PYQ Bank**: Previous Year Questions organized by Exam, Year, Subject, and Shift with 5 practice modes.
- **📝 Full Mock Test Simulator**: Section tabs, countdown timers, negative marking, and standard question palette (Answered, Marked, Unanswered).
- **⭐ Revision Vault**: Mistakes notebook that logs incorrect questions for focused re-attempts.
- **🎯 AI Diagnostic Analytics**: Mastery progress across 11 competitive subjects and 1-click remedial practice generation.
- **🏆 Gamification**: XP score, streak multiplier, 11 milestone badges, and All-India leaderboard.
- **🌓 Dark & Light Mode**: Seamless theme switching with persistent local storage.

---

## 📂 Quick Start & Deployment

See [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) for full instructions.

### Upload for Public Deployment
Upload the **`dist/`** directory to any static hosting provider:
- **Netlify Drop**: Drag-and-drop the `dist/` folder at [netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: Run `npx vercel dist --prod`.
- **GitHub Pages**: Push repository and set Pages branch to `main` (`/dist` or `/root`).
- **Cloudflare Pages**: Direct upload of the `dist/` folder.

### Local Testing
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in any browser.
