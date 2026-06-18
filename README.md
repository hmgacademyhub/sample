# HMG ACADEMY CLASS DECK v3 — Enhanced Enterprise Edition

**Built by Adewale Samson Adeagbo • HMG Concepts • Lagos, Nigeria**

Teach online like a pro — from any tablet or phone.

The complete, free, offline-first classroom platform with 200+ tools, Nigerian curriculum built-in, and enterprise-grade features.

✅ 100% free-tier tools  
✅ Zero AI APIs  
✅ No accounts for students  
✅ Works fully offline  
✅ Installable PWA on Android, iPhone & laptop  
✅ Open source (MIT)  
✅ Nigerian curriculum (NERDC, WAEC, NECO, JAMB, BECE)

---

## 📦 What's New in v3 (Enterprise Enhancements)

All features from original ClassDeck v2 are preserved and enhanced.

### Core Preserved + Enhanced Features

| Feature | Description | Enterprise Enhancements |
|---------|-------------|-------------------------|
| **True Split-Screen Workspace** | Whiteboard + PDF + Browser + Notes + Graphs side-by-side | Resizable panels, drag-and-drop, full-screen focus mode, multi-page decks |
| **Built-in Live Classroom** | WebRTC + PeerJS live class with cameras, chat, hand-raise | Auto-reconnect, attendance sync, spotlight, private chat, per-student controls |
| **Assignments + Gradebook + Rubrics** | Create, distribute, collect, grade offline | Rubric scoring (per-criterion), late penalties, bulk CSV export, auto-grade quizzes |
| **Live Polls + Confusion Meter** | MCQ, scale, open-text, ranking | Real-time tallies, auto confusion detection, instant re-poll |
| **Badges & Gamification** | 15+ badges | Auto-awarded, leaderboard, refer-and-earn, parent-visible badges |
| **Spaced-Repetition Flashcards** | Leitner system | Integrated with toolkit and class deck |
| **Voice Notes** | Auto-transcribed | Attach to assignments, portfolios, class wall |
| **CBT Practice** | JAMB / WAEC / NECO / BECE | Bulk CSV import, timer with visibility pause, auto-marking + explanations, badges |
| **Nigerian Lesson Plans** | Pre-built NERDC templates | Integrated planner, auto-holidays, exportable |
| **Class Calendar** | Weekly planner | Nigerian holidays + JAMB windows |
| **Student Portfolios** | HMG-branded | PDF export, badge display |
| **Parent Portal + WhatsApp** | Weekly reports | Parent codes, live messaging, report PDF |
| **Teacher Community** | Forum | Pinned founder posts, lesson sharing, stats |
| **Discussion Forum & Class Wall** | Threaded, graded | Integrated with Command Centre |
| **Accessibility** | WCAG 2.1 | Keyboard nav, high-contrast, dyslexia font toggle |

### New Enterprise Features (v3)

- **Analytics Dashboard**: Engagement heatmaps, grade distribution, badge leaders, participation trends, exportable reports
- **Multi-Tenant / Multi-School**: `?school=XYZ` custom branding, logo, data separation
- **Cross-Device Sync**: Export/import JSON snapshots. Optional Cloudflare Worker + D1 integration (free-tier)
- **11 Languages + Pidgin**: EN, FR, ES, PT, AR, HI, SW, HA, YO, IG, PCM. Easy JSON extension
- **Hardened Security**: CSP headers, device fingerprinting, rate limiting, PBKDF2, SHA-256
- **Advanced Classroom Controls**: Seating chart, breakout rooms (simulated), hand-raise queue, behaviour points, at-risk indicators (rule-based)
- **Resume Builder (SS3)**: Professional CV builder + export
- **FaithTech Devotional** (opt-in): Daily Bible verse from HMG Gospel
- **HMG Media Embed**: Founder YouTube videos ready to cast
- **QR / URL Signaling + Full PWA**: Installable offline
- **Refer & Earn**: Automatic tracking for HMG Ambassador badge
- **Standards Alignment**: NERDC, WAEC, NECO, JAMB, BECE, CCSS
- **Nigerian Grading**: WAEC A1–F9, NECO A–F, BECE auto-applied

---

## Detailed Feature Explanations

### 1. Split-Screen Workspace
Teachers can run multiple content types simultaneously. Whiteboard stays live beside PDF annotation or web browser cast. All panels are resizable and can be swapped. Focus mode hides toolbars for distraction-free teaching.

### 2. Live Classroom
Uses browser WebRTC (with PeerJS fallback). Students join without accounts. Supports up to 100 concurrent users. Full control panel for teacher: mute-all, spotlight, private chat, waiting room, attendance tracking.

### 3. Assignments + Gradebook + Rubrics
Create assignments directly in studio. Students submit via join portal. Rubrics allow granular scoring (e.g. 4 criteria × 5 points). Late deduction auto-calculated. Bulk export to CSV.

### 4. CBT Practice
Full exam simulations for Nigerian exams. Timer pauses on tab-switch. Automatic marking + explanations shown after submission. Teachers can bulk import questions using CSV format: `question,option_a,option_b,option_c,option_d,correct,explanation`.

### 5. Classroom Command Centre
Central hub for live class management: attendance, behaviour points, seating chart, hand-raise queue, breakout rooms, class wall, at-risk indicators, parent WhatsApp broadcast.

### 6. Analytics & Reports
Real-time engagement metrics. Exportable reports for grades, badges, participation. Rule-based (no AI) at-risk detection.

### 7. Offline-First
All tools (whiteboard, PDF, flashcards, quizzes, CBT) work without internet. Data stored in IndexedDB + localStorage. Full PWA install.

### 8. Languages
Switch languages instantly. Add new languages by editing `locales/*.json` (future).

---

## 🚀 Deployment Instructions (GitHub Pages / Any Static Host)

### Step-by-step (Clear & Unambiguous)

1. **Prepare your files**
   - Ensure the entire contents of the `deck/` folder are the files you want to deploy.
   - The root file must be `index.html`.

2. **Create a GitHub repository**
   - Go to https://github.com/new
   - Name it: `hmgacademyclassdeck` (or any name)
   - Make it **Public**
   - Do NOT initialize with README (you will push existing files)

3. **Upload files**
   Option A — Using GitHub Web:
   - Go to your new repo → "Add file" → "Upload files"
   - Drag and drop ALL files from the `deck/` folder (including subfolders: `assets/`)
   - Commit changes with message "Initial v3 Enterprise release"

   Option B — Using Git (recommended):
   ```bash
   cd deck
   git init
   git add .
   git commit -m "HMG ClassDeck v3 Enterprise - Enhanced"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repo → **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
   - Click **Save**
   - Wait 1–2 minutes. Your site will be live at:
     `https://YOUR-USERNAME.github.io/YOUR-REPO/`

5. **Custom domain (optional)**
   - In GitHub Pages settings add your domain.
   - Update CNAME file if needed.

6. **PWA Installation (recommended)**
   - After deployment, users can install the app:
     - Android: "Add to Home Screen"
     - iOS: Safari → Share → Add to Home Screen
     - Desktop: Chrome/Edge address bar install icon

### Deployment Checklist

- [ ] All HTML files are in the root of the repo
- [ ] `index.html` is the home page
- [ ] Images/assets referenced correctly (use picsum or add your own)
- [ ] Test the live site on mobile + desktop
- [ ] Test offline mode (disconnect internet and reload)
- [ ] Test live classroom with two devices/tabs

---

## How to Test Locally

1. Open the `deck` folder in VS Code
2. Install "Live Server" extension (or use Python)
3. Right-click `index.html` → "Open with Live Server"
4. Or run:
   ```bash
   cd deck
   python -m http.server 5500
   ```
5. Visit `http://localhost:5500`

---

## Free Tools Used (No Recurring Costs)

- Tailwind CSS (CDN)
- Font Awesome (CDN)
- Browser APIs: Canvas, IndexedDB, Web Speech, WebRTC, localStorage, Service Worker
- No backend, no servers, no paid APIs

---

## File Structure

```
deck/
├── index.html          # Landing page + feature explanations
├── teach.html          # Full Teacher Studio (core app)
├── join.html           # Student join portal
├── parent.html         # Parent portal + reports
├── classroom.html      # Classroom Command Centre
├── cbt.html            # CBT Practice + bulk import
├── community.html      # Teacher Community
├── README.md           # This file
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (offline)
└── assets/             # (add your images, icons here)
```

---

## Next Steps / Future Free Enhancements

- Add more lesson templates in `/assets/nerdc/`
- Expand language JSON files
- Add resume builder as separate page
- Connect optional Cloudflare Worker for sync (free tier)

---

**Built for Nigerian teachers. Free forever. Enterprise ready.**

For support: WhatsApp +234 810 086 6322  
Portfolio: https://cssadewale.pages.dev

MIT License • 2026
