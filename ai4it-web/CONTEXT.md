# Frontend Context & Architecture (`ai4it-web`)

## Overview
Next.js 16.3 (Turbopack) with React 19 and Tailwind CSS. Provides interactive visualizations, decision boundary explorers, loss landscapes, and case study walkthroughs for the AI training program.

## Key Directories & Routes
- `src/app/`
  - `/` — Homepage / workshop dashboard
  - `/day1/linear-regression` — Live gradient descent & loss surface
  - `/day1/neural-network` — Interactive MLP playground & decision boundaries
  - `/day1/dairy-ai` — Milk yield forecasting & fat/SNF anomaly detection
  - `/day1/case-study` — Milk quality & procurement system
  - `/day1/poc-vs-production` — Edge-to-cloud architecture & deployment pipeline
  - `/day1/sequence-problem` — Sequential data & failure modes
  - `/course-map` — Full 3-day curriculum map
  - `/status` — Backend health & latency tester
- `src/components/`
  - `PretextRenderer.tsx` — Text rendering using `@chenglou/pretext`
  - `Navbar.tsx`, `Footer.tsx` — Shell layouts

## Tech Guidelines & Rules
1. **Pretext Usage**: Always use `prepareWithSegments(text, font)` when calling `layoutWithLines(...)`.
2. **Client Math Fallbacks**: Keep client-side math simulation fallbacks working if the Python backend is unreachable.
3. **Styling**: Dark aesthetic with Tailwind tokens (`bg-slate-950`, `border-slate-800`, neon accents).
4. **Build Check**: Always verify changes with `npm run build`.
