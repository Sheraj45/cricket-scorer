# 🏏 Cricket Score Maker

A full-featured cricket scoring app built for street cricket and local tournament matches. Score ball-by-ball, track player stats live, and keep a history of every match — all from your phone.

**🔗 Live App:** cricket-scorer-amber.vercel.app
**📦 Repository:** https://github.com/Sheraj45/cricket-scorer

---

## Why I built this

Street and gully cricket matches rarely have proper scoring tools — most scoring happens on paper or gets lost entirely. I built this to be a simple, fast, mobile-first scorer that anyone can use mid-match, with no setup beyond opening a browser link.

---

## Features

- **Live ball-by-ball scoring** — runs, wides, no-balls, byes, leg byes, wickets
- **Automatic strike rotation** on singles, triples, and over completion
- **Bowler rotation rules** — enforces real cricket rules (max overs per bowler, no consecutive overs)
- **Player stats** — live runs, balls faced, fours, sixes, strike rate per batter; overs, runs, wickets, economy per bowler
- **Two-innings flow** — toss, innings break with target display, automatic match-end detection (including mid-over target chases)
- **Saved teams** — create and reuse teams across matches instead of re-entering player names
- **Match history** — every completed match is saved locally and viewable later, with full scorecards
- **Settings** — clear saved data, view app info

---

## Tech Stack

- **React** (Vite) — UI and state management
- **Tailwind CSS v4** — styling
- **localStorage** — client-side data persistence (no backend required)
- **Vercel** — deployment

---

## Screens

| Screen        | Purpose                                  |
| ------------- | ---------------------------------------- |
| Splash        | App branding/loading                     |
| Home          | Navigation hub                           |
| Match Setup   | Configure match name, overs, players     |
| Player Entry  | Enter or load saved team rosters         |
| Toss          | Record toss result and batting choice    |
| Live Score    | Ball-by-ball scoring interface           |
| Innings Break | Shows 1st innings summary and target     |
| Match Summary | Final result, scorecards, top performers |
| My Matches    | Match history with full scorecards       |
| Teams         | Create, edit, and delete saved teams     |
| Settings      | Data management and app info             |

---

## Design

Built with a custom visual identity inspired by street cricket and scoreboard aesthetics — a dark pitch-green and brass-gold palette with monospace scorecard typography, rather than a generic admin-panel look.

---

## Running locally

```bash
git clone https://github.com/Sheraj45/cricket-scorer.git
cd cricket-scorer
npm install
npm run dev
```

---

## What I learned

This was my first React project, built from scratch over a few days. Along the way I learned:

- React state management with hooks (`useState`, `useEffect`)
- Component-based architecture and prop passing
- Tailwind CSS (including migrating mid-project to Tailwind v4's new syntax)
- Git/GitHub workflow with regular commits
- Deploying a frontend app to production with Vercel
- Debugging real logic bugs found through actual gameplay testing (e.g. innings not ending when a target was chased mid-over)

---

## Author

**Sheraj**
