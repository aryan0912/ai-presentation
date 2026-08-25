# Build Spec: Day 1 — Linear Regression, The Deep-Dive Edition
**For: Google Antigravity — rebuild `ai4it-web/src/app/day1/linear-regression/` from this spec**
**Author's role:** This document is the complete pedagogical and interaction authority for this module. Antigravity should treat every section below as the source of truth for copy, sequencing, data, and required animation — not the current code in the repo, which this spec supersedes.
**Companion docs:** `contexts/og_requirements.md` (contractual syllabus, Module 1.2), `contexts/AI4IT_Lecture_Plan.md` (delivery plan), `contexts/day1_expansion_spec.md` §5 (superseded by this document for Linear Regression specifically — its route map, sidebar, and other Day 1 pages still apply).

---

## 0. Why this spec exists

Linear Regression is the first real technical content of the entire 6-day course, and every later concept — neural network weights, backpropagation, even LLM "parameters" — is explicitly taught as "the thing you just learned, repeated at scale." If the room doesn't leave this module with a genuinely solid, hands-dirty understanding of **model → loss → gradient → learning rate → update, repeated**, every subsequent reveal ("this is just gradient descent again, but bigger") lands as a hollow assertion instead of a recognition.

Time is not the constraint here. Depth is the goal. This module runs **~2 hours 20 minutes** (not 65 minutes) by deliberate choice — the room should leave able to hand-compute a gradient descent step on paper, not just recognize the phrase.

**The method, unchanged from the rest of the course, applied at every beat below:**
> relatable problem → let them guess → reveal + visualize → break it → apply to their world

---

## 1. Stack facts & components (do not rebuild these)

- Next.js 16 App Router, React 19, TypeScript, `framer-motion`, `lucide-react`, KaTeX (via `Formula` component), Tailwind-esque utility classes + `globals.css` tokens (`--bg-color: #0b0f19`, accent `#3b82f6`), dark theme only.
- **Reuse as-is:** `ConceptBeat` (beat wrapper + phase/time badges), `GuessPrompt` (the "pause and ask the room" interaction), `Formula` (KaTeX + glossary chips), `Chart` (scatter/line/residuals), `InstructorNote`, `DairyAngle` / `InfraAngle` callouts, `BackendBadge`.
- **New components this spec requires** (build these, listed in full in §9): `LossSlice1D`, `LearningRateComparison`, `CalculationFlowPlayer`, `WeightVectorViz`, `LineToNeuronMorph`, `EquationTokenHighlight` (wraps `Formula` output to make symbols hoverable/clickable).
- Data: reuse `FALLBACK_DATASETS['milk-7day']` (`x`: 1–7, `y`: 2140, 2210, 2180, 2300, 2350, 2420, 2390) as the canonical dataset throughout — every number quoted in this spec is computed against it. Do not substitute placeholder numbers; if a value needs recomputing after any data change, recompute honestly, don't approximate.

---

## 2. Pacing table (instructor-facing, shown via `InstructorNote` + per-beat `time` badges)

| # | Beat | Time | Kind |
|---|---|---|---|
| 1 | The Raw Observations (data table) | 10 min | problem |
| — | Taxonomy: Supervised / Unsupervised / GenAI | 5 min | context |
| 2 | Let the Room Guess | 10 min | guess |
| 3A | Origin Story (Gauss → Legendre → Galton) | 8 min | reveal |
| 3B.1 | What the Model Actually Is | 8 min | reveal |
| 3B.2 | Measuring Correctness — the Loss Function | 8 min | reveal |
| 3B.3 | How Will It Learn — Finding Which Way Is Downhill | 10 min | reveal |
| 3B.4 | Learning Rate & Gradient Descent (incl. Cauchy, 1847) | 12 min | reveal |
| 3B.5 | Batches & Epochs | 5 min | reveal |
| 3B.6 | Initialization & the Slow-Motion Walkthrough | 15 min | reveal |
| 3B.7 | Generalizing: a Second Feature | 8 min | reveal |
| 3B.8 | Recap: The Whole Pipeline, One Breath | 5 min | recap |
| E | Interactive Regression & Loss-Surface Simulator | 15 min | hands-on |
| 4 | Break It — Seasonal Curve + Anscombe's Quartet | 10 min | break |
| 5 | Apply to Your IT World | 5 min | apply |
| H | Bridge to Neural Networks | 5 min | bridge |
| | **Total** | **~139 min (~2h 20m)** | |

This is roughly double the module's previous 65-minute budget — expected and intentional. It does not need to be clawed back from elsewhere; Day 1's overall schedule is being re-planned separately.

**Revision note (content pass 2):** the Cauchy/1847 gradient-descent story moved out of 3A and into 3B.4, where gradient descent is actually being taught — a callback that lands an hour later has gone cold for this audience; one told at point of use hasn't. "Compass" as a metaphor for the derivative was dropped in favor of the single "downhill" metaphor already used everywhere else in the module (Cauchy's method, Section E's "rolling the marker downhill," the blow-up demo) — one physical image reused six times beats six competing images used once each. 3B.7 and 3B.4's `LearningRateComparison` gained guess gates they were missing, so every reveal in the module now follows the course's own stated method rather than three of them skipping the "guess" half. 3B.8 is new: a consolidation beat before Section E, because 60+ minutes of new material without a pause before switching into hands-on mode was asking too much of working memory.

---

## 3. Beat 1 — The Raw Observations (10 min)

**Unchanged from current build, content-wise.** 7-day milk collection table (Mon–Sun, values above), Day 8 marked `? ? ?`. `DairyAngle` callout on overflow/under-dispatch cost.

**Animation spec (new):**
- Table rows fade + slide up, staggered 80ms apart, triggered `whileInView` (framer-motion), not on page load — this section should feel like it's revealing itself as the instructor scrolls to it, not already sitting there when the page opens.
- Add a thin SVG sparkline beneath the table, spanning all 7 points, that draws itself left-to-right (`pathLength: 0 → 1`, ~1.2s, `ease: "easeOut"`) immediately after the rows finish staggering in. This previews the rising trend visually *before* any equation is mentioned — a wordless tease for Beat 2 and 3B, not a spoiler (no axis labels, no numbers on it, just the shape).
- The "Day 8 ???" cell keeps its pulse (already implemented) but should NOT animate in with the sparkline — it stays static/pulsing so it reads as "the unknown," distinct from the "known" trend line.

**Priority:** P0 (table + stagger), P1 (sparkline).

---

## 4. Taxonomy Card — Supervised / Unsupervised / GenAI (5 min)

Unchanged content (3 cards + 5-row contrast table, Module 1.2 contractual requirement). No new animation required beyond a standard `whileInView` staggered fade for the 3 cards. **Priority: P2.**

---

## 5. Beat 2 — Let the Room Guess (10 min)

Unchanged: 3-option `GuessPrompt` (persistence baseline / average / eyeball-the-trend), plus custom numeric guess input that plots on Section E's chart.

**Animation spec (new):**
- When the custom guess is submitted, animate a small marker flying from the guess input toward a preview thumbnail of Section E's chart (a tiny, non-interactive 80×60px sparkline-with-dot rendered inline right after the form, not the full chart) — confirms the guess landed without forcing a scroll. The full Section E chart still receives and displays the same guess when the participant scrolls to it.
- Selecting a `GuessPrompt` option already reveals its explanation (existing behavior) — no change needed there.

**Priority:** P1.

---

## 6. Beat 3A — Origin Story (8 min)

Content: Gauss/Ceres (1801), Legendre vs. Gauss priority dispute (1805/1809), Galton's "regression" (1886). This beat answers "why does this whole endeavor matter" — it stops at Galton. Cauchy's 1847 gradient-descent story has moved to 3B.4, where it lands at the moment gradient descent is actually taught, not nearly an hour before it as a fact the room has to remember.

**Animation spec (new):**
- A horizontal timeline: a single SVG line spanning the three card positions, drawn left-to-right (`pathLength` animation, ~1.5s) as the section scrolls into view.
- Each card's icon/year badge "lights up" (opacity 0.4→1, scale 0.9→1) timed to when the draw-line passes its horizontal position (stagger delays: 0s, 0.5s, 1s), not on independent `whileInView` per card — the shared timeline is what makes it read as one continuous 85-year story instead of three unrelated facts.
- End the timeline on a soft open note (not a hard stop) — a faint dotted continuation past Galton's 1886 marker — since the story resumes in 3B.4. Don't let this beat feel falsely "complete."

**Priority:** P1.

---

## 7. Beat 3B — What "Best Fit" Actually Means: The Deep Dive (~71 min)

This is the core of the module. Every sub-beat below must appear as its own labeled unit (3B.1–3B.8) with its own time badge, matching the pacing table in §2.

### 3B.1 — What the Model Actually Is (8 min)

**Content:** Callback to the opener's restaurant analogy (algorithm = technique, dataset = every dish tasted, training = practicing, model = the finished chef). Formula `y = m·x + c` with glossary (`x`=Feature, `m`=Weight, `c`=Bias, `y`=Label/ŷ). Explicit statement: "the model = the equation + whatever current values m and c hold right now." Aside on feature vectors (forward pointer to 3B.7, don't over-teach vectors on a 1D problem). "70 billion parameters" callout.

**Animation spec (new):**
- Build `EquationTokenHighlight`: render the KaTeX formula with `m`, `x`, `c`, `y` as individually-targetable spans. Hovering (desktop) or tapping (touch) a glossary chip (Feature / Weight / Bias / Label) highlights the matching token in the equation above it in that chip's accent color, with a brief scale-pulse (200ms). This is the single highest-leverage small interaction in this sub-beat: it makes "which symbol is which word" a physically-linked fact instead of a side-by-side coincidence.

**Priority:** P0 (content), P1 (token highlight).

### 3B.2 — Measuring Correctness: the Loss Function (8 min)

**Content:** `GuessPrompt` ("is m=0, c=2000 a good model? How would you know?" — 3 options funneling to "we need a formula for wrongness"). Existing 4-card grid on why squaring the error works. MSE `Formula` with full glossary. Closing note: "at m=0, c=2000, L ≈ 91,014."

**Animation spec (new, P2 polish — budget-permitting only, do not let this delay P0/P1 work elsewhere):**
- Card 1 (no sign cancellation): two small chips labeled `+20` and `−20` slide toward each other and visibly cancel to `0` with a red flash; then two positive `400` bars grow upward beside them.
- Card 2 (punishes big misses): two bars grow on view — `10² = 100` and `20² = 400` — proportionally scaled, side by side.
- Card 3 (smooth for calculus): a small SVG crossfades an `|x|` V-shaped kink into an `x²` smooth U-shape, with a dot tracing the curve — sharp stop vs. smooth glide.
- Card 4 (MLE): a small bell curve fades in with a vertical line through its peak.

**Priority:** P0 (content + GuessPrompt + MSE formula), P2 (four micro-visuals).

### 3B.3 — How Will It Learn? Finding Which Way Is Downhill (10 min)

**Content:** `GuessPrompt` ("loss is high at m=0 — which way do you nudge m?" — 3 options, funnels to "direction depends on local slope, not a fixed rule"). Reveal: the derivative is the exact mathematical version of "which way is downhill from here" — the same downhill language used everywhere else in this module (Cauchy's method in 3B.4, the marker "rolling downhill" in Section E). **Do not introduce "compass" or any other new metaphor here** — one physical image (a ball rolling downhill) carries the whole module; competing metaphors cost the room translation effort for no benefit. Partial derivative formulas, marked "for reference."

**Animation spec (new, P1 — this is the conceptual crux of the whole module, invest here):**
- Build `LossSlice1D`: a small 1D chart of Loss vs. m, holding c fixed at 2000 — a single smooth bowl-shaped curve (parabola-like), NOT the full 2D surface (that's Section E; this is the simplified single-variable version, seen first, on purpose). Plot the current point (m=0) on the curve with a dot, and draw a short tangent-line segment through it whose slope visibly matches the true gradient's sign (exaggerate the angle slightly for visibility if the true value is subtle — label it, don't fabricate the direction).
- Wire this to the `GuessPrompt` above it: after the participant picks an option and the explanation reveals, animate the tangent line rotating into place (300ms ease) rather than appearing instantly — this is the literal visual answer to "which way and how steep."
- This 1D visual exists specifically so the 2D loss-surface heatmap in Section E isn't the first time anyone has seen "slope of a loss curve" — it should already feel familiar by the time they reach it.

**Priority:** P0 (content), P1 (`LossSlice1D` + tangent reveal — treat as close to P0, this is the hardest idea in the module).

### 3B.4 — Learning Rate & Gradient Descent (12 min)

**Content:** Open with the Cauchy story, moved here from 3A: in 1847, Augustin-Louis Cauchy published the "roll downhill" method this exact update rule comes from — told now, at the moment it's needed, not as a fact to hold onto from an hour earlier. Update-rule `Formula` (`m_new = m_old − η·∂L/∂m`, same for c). Too-small / too-large learning rate explanation cards.

**IT-domain anchor (new — place directly here, not only in Beat 5):** one line tying learning rate to something this audience already tunes: *"This is the same trade-off as an autoscaling policy's step size, or a PID controller's gain — too conservative and you're always a step behind demand; too aggressive and you oscillate or thrash."* Land this while the concept is being taught, not five sub-beats later in a generic applications list — domain relevance compounds retention only when it's adjacent to the concept, not appended after it.

**Animation spec (new, P1):**
- Before playing `LearningRateComparison`, add a guess gate: *"Here are three learning rates about to race downhill — which one do you think reaches the bottom fastest, and which one do you think fails completely?"* Let the room answer before pressing play — right now this is the one major reveal in 3B that skips the guess step the rest of the module runs on.
- Build `LearningRateComparison`: three small side-by-side mini-bowl SVGs, each with a marble/dot starting at the same off-center position, animating downhill under three preset learning rates:
  - **Too small:** the dot creeps down in many tiny, barely-visible hops (loop, ~15 tiny steps).
  - **Just right:** the dot rolls smoothly to the bottom in ~5–6 visible steps and settles.
  - **Too large:** the dot overshoots the bottom, bounces to the opposite wall, overshoots again, and on the third bounce flies off the top of the bowl entirely (mirrors the real "Blow-Up" button behavior in Section E — this is a preview of it in miniature).
  - Plays once after the guess is locked in; provide a small "Replay" button (all three restart together, not independently — the side-by-side timing comparison is the entire point).

**Priority:** P1.

### 3B.5 — Batches & Epochs (5 min)

**Content:** Three definition cards (Step / Batch / Epoch). Honest scoping note: today step=epoch because batch=all 7 rows; that stops being true at production scale.

**Animation spec (new, P2):**
- A simple flow diagram: 7 small dots (representing the 7 data points) converge with short animated paths into one "∇ gradient calculation" box, which then feeds one "update" box — looped subtly (opacity pulse on the box, not the whole diagram replaying) to suggest "this repeats."

**Priority:** P2.

### 3B.6 — Initialization & the Slow-Motion Walkthrough (15 min)

**This is the centerpiece of the entire module.** Do not compress this section's build effort even under time pressure elsewhere.

**Content:** Why m=0, c=2000 (arbitrary reasonable start; convexity means init barely matters here — forward-pointer to NN page where it will matter). Full hand-worked Step 1 table (all 7 rows: x, y, prediction, error, squared error → sum 637,100 → MSE 91,014.29 → gradients ∂L/∂m=−2657.14, ∂L/∂c=−568.57 → m_new=53.14, c_new=2011.37). Condensed Step 2 (loss collapses to 4,787.85, m_new=61.95, c_new=2013.79). Closing note: true OLS optimum is m≈47.86, c≈2092.86; gradient descent overshoots and wobbles toward it, doesn't walk straight there; the Auto-Fit button repeats this exact arithmetic ~40 more times in under a second.

**Animation spec (new, P0 — this is what makes "even simple linear regression requires this many calculations" actually land):**

Build `CalculationFlowPlayer`, a controlled step-through animation (Play / Pause / Reset — instructor-paced, **not** autoplay-on-scroll, because the instructor needs to talk over each stage). **Structure Step 1 as a worked example, not seven uniform repetitions:** watching the identical calculation animate seven times in a row is repetition, not reinforcement — cognitive-load research on worked examples says the opposite works better. Fully narrate Monday, then compress the rest.

1. **Row 1 (Monday), fully expanded:** every number explained in place — prediction, error, squared error — each counting up from 0 with a beat between them (~700ms apart) so the instructor can narrate what's happening at each cell.
2. **Rows 2–7, compressed:** the remaining six rows animate in fast and together (~150ms apart, no individual narration beat), each visibly running the identical operation just explained — the point is "same thing, six more times," not six more explanations.
3. **Sum collection:** once all 7 rows have resolved, small dots animate from each row's squared-error cell converging into the sum cell (637,100), landing with a brief pulse.
4. **Gradient computation:** the two gradient values (−2657.14, −568.57) count up beneath the table.
5. **Update:** the final m_new/c_new values count up in the green update box.
6. **Tie to the visual:** immediately after step 5, a compact inline mini loss-surface preview (small version of Section E's heatmap, read-only, no controls) shows the parameter marker animating from (0, 2000) to (53.14, 2011.37) — so the arithmetic and the "rolling downhill" visual are in the same viewport, not separated by a scroll.
7. **Mid-walkthrough guess (new):** pause here, before Step 2 runs. Ask the room: *"Loss just dropped from 91,014 to... well, you tell me — do you think one more step gets us the rest of the way, or is this going to take a while?"* Let them commit to a guess before revealing Step 2's result. This is a real prediction, not a rhetorical pause — it re-engages the room mid-walkthrough instead of letting the second half play as passive narration.
8. **Step 2, fast-forward:** replays the same sequence (rows already compressed, no need for a "row 1 fully expanded" pass this time) at 1.5× speed, landing on the loss collapsing to 4,787.85 — confirming or correcting whatever the room just guessed.

**Priority:** P0 for the full player (steps 1–5, 8), P1 for step 6's inline mini-surface and step 7's guess gate (if descoped, at minimum add a strong textual pointer + auto-scroll-into-view affordance toward Section E instead of step 6, and keep step 7 as a plain spoken instructor prompt in `InstructorNote` if the interactive gate is cut).

### 3B.7 — Generalizing: Adding a Second Feature (8 min)

**Content:** Add temperature as a second feature to the same week, with a festival-driven Saturday spike (2,850L vs. a normal ~2,420L). Formula `ŷ = w1·x_day + w2·x_temp + c`. Comparison table (1-feature vs. 2-feature fit, all 7 days). Honest punchline: temperature only closes the Saturday miss from 347L to 326L — barely anything, because the real driver is a category (festival), not a continuous number. Bridge: "the Neural Network page solves this next — not with more weights on a line, but with a bend."

**Guess gate (new — every other 3B sub-beat opens with a guess; this one was the exception, and shouldn't be):** before revealing the comparison table, ask: *"We're adding temperature to help explain Saturday's spike. Will it — fully fix the miss, partially help, or do basically nothing?"* Let the room commit, then reveal the honest 347L→326L result as a confirmed-or-refuted guess rather than a flat table. Frame the modest result openly rather than as a letdown: *"We picked temperature on purpose — not every feature helps, and figuring out which ones do is half the job."*

**Animation spec (new, P1):**
- Build `WeightVectorViz`: two small labeled arrows (`w1` for day, `w2` for temp) draw in from a shared origin point, then slide together into a bracket notation `[w1, w2]` labeled "weight vector" — a lightweight visual for "multiple weights bundle into one vector," not a literal geometric vector-addition (that would misrepresent the math; keep it as a bundling metaphor, and say so if asked).
- In the comparison table, the Saturday row gets a slow amber/rose pulse (not a jarring animation, a slow 2s breathe) to keep the eye on the one row that matters, and the "(−347)" / "(−326)" difference should animate as a small horizontal bar-length comparison beside the numbers so the "barely anything" claim is visually, not just numerically, obvious.

**Priority:** P1.

### 3B.8 — Recap: The Whole Pipeline, One Breath (5 min)

**Content (new sub-beat):** sixty-plus minutes of genuinely new material just happened; Section E immediately after asks the room to switch into hands-on mode. Close that gap with one consolidation screen — a single card or short vertical list, one line each, in order: **Model** (equation + current m, c) → **Loss** (one number for "how wrong") → **Gradient** (which way is downhill) → **Learning Rate** (how big a step) → **Batch/Epoch** (how much data per step) → **Init + Update** (start somewhere, repeat the step) → **Generalization** (more features, still just a line). No new content, no new numbers — this is purely a "here's everything you just built, in one glance" moment before the room touches the live demo.

**Animation spec (new, P1):**
- The seven labels animate in as a connected vertical (or horizontal, projector-width permitting) chain, staggered ~200ms apart, each with a one-word icon already established earlier in the module (reuse the same icons from 3B.1–3B.7's headers, in order) rather than introducing new iconography here.
- No interaction required — this is a breathing point, not a new guess-and-reveal beat. Keep it under 20 seconds of animation so it doesn't itself become a distraction before the hands-on section.

**Priority:** P1.

---

## 8. Section E — Interactive Regression & Loss-Surface Simulator (15 min)

**Keep all existing functionality:** m/c sliders, Single Step, Auto-Fit, Snap-to-Closed-Form-OLS, Reset, Test-Learning-Rate-Blow-Up, absolute/squared residual toggle, 2D loss-surface heatmap, and the step-history log table added in the previous revision of this module.

**Animation upgrades required (new, P1):**
- The parameter marker on the loss-surface heatmap must **animate its position** between updates (framer-motion `animate` on cx/cy, ~300ms ease) instead of jumping instantly — every step should read as continuous motion "rolling downhill," which is the entire visual metaphor the module has been building toward.
- The trajectory dotted path should draw incrementally (extend the path with an animated stroke, not redraw the whole path statically) as each new point is added.
- The Blow-Up demo should visibly **accelerate**: the marker's step size growing each frame, with a fading trail behind it, before it exits the visible chart area — make the failure feel like a failure, not just a number turning red.
- Step-history table: new rows should slide/fade in from the bottom; if the list exceeds the visible height, auto-scroll the table body to keep the newest row in view.

**Priority:** P1 (marker easing + trail), P2 (auto-scroll polish).

---

## 9. Beat 4 — Break It (10 min)

Unchanged content: seasonal flush-season curve (linear model fails), Anscombe's Quartet (4 datasets, identical stats, wildly different shapes).

**Animation spec (new, P1):**
- Seasonal curve: sequence the reveal — the red dashed "best straight line" draws itself first, confidently, alone on the chart (as if satisfied with itself); only after it finishes does the actual seasonal data animate in on top, staggered point by point, visibly missing the line. The current implementation renders both simultaneously — resequencing this is a small change with a real payoff: the "confidence, then reality" beat is the whole joke of this exhibit.
- Anscombe's Quartet: when switching tabs, animate each point moving from its old position to its new position (shared `layoutId` per point index, framer-motion), rather than an instant re-render — the "same line, radically different data" punchline depends on visibly seeing the points rearrange while the red line stays perfectly still.

**Priority:** P1 (both).

---

## 10. Beat 5 — Apply to Your IT World (5 min)

Unchanged content (3 cards: SAN/NAS disk growth, ticket inflow forecasting, chilling center intake). Standard staggered `whileInView` fade. **Priority: P2.**

---

## 11. Section H — The Bridge to Neural Networks (5 min)

**Content unchanged:** the three-step chain (1 → single line → 2 → multi-input line → 3 → bent line via activation) closing on "That is a Neural Network... Frank Rosenblatt called it a Perceptron in 1958."

**Animation spec (new, P0 — this is explicitly called "the single most important paragraph on this page" in the existing copy; it deserves to be the visual climax, not static text):**

Build `LineToNeuronMorph`, a three-keyframe auto-playing sequence (plays once on scroll-into-view, with a small "Replay" button):

1. **Keyframe 1:** a single straight line on simple axes, labeled `y = m·x + c`.
2. **Keyframe 2:** a second input handle appears and the line visibly gains a second tilt/dimension (represented as the line's slope handle splitting into two, or a small "+ second axis" cue — doesn't need true 3D, a suggestive 2D cue is enough), equation morphs to `y = m₁x₁ + m₂x₂ + c`.
3. **Keyframe 3:** a visible kink bends into the line at a point (the ReLU elbow), equation area shows `ReLU(...)`. The final state holds with the "That is a Neural Network" line fading in beneath it.

Each keyframe transition should take ~800ms–1s with a clear pause between them (not a rushed blur) — the instructor is talking over this, it needs to hold each state long enough to point at.

**Priority:** P0.

---

## 12. New components required — summary table

| Component | Used in | Priority | Notes |
|---|---|---|---|
| `LossSurfaceHeatmap` | Section E, 3B.6 (shared) | P0 (prerequisite for `CalculationFlowPlayer`) | Extract the 2D loss-surface/contour/marker rendering out of the demo into one shared primitive so Section E's full heatmap and 3B.6's inline mini-preview never drift out of sync |
| `EquationTokenHighlight` | 3B.1 | P1 | Wraps `Formula`; hover/tap glossary chip ↔ highlight equation token |
| `LossSlice1D` | 3B.3 | P1 (treat as near-P0) | 1D loss-vs-m curve with animated tangent line; reveal is gated behind the 3B.3 `GuessPrompt` |
| `LearningRateComparison` | 3B.4 | P1 | 3 mini bowls, too-small/just-right/too-large; gated behind a "which one wins / which one fails" guess before it plays; synchronized replay |
| `CalculationFlowPlayer` | 3B.6 | P0 | Play/Pause/Reset step-through: worked-example row 1, compressed rows 2–7, sum/gradient/update, mid-walkthrough guess gate, then Step 2 |
| `WeightVectorViz` | 3B.7 | P1 | Two arrows bundling into `[w1, w2]` bracket notation; reveal gated behind a "will temperature fix Saturday?" guess |
| `LineToNeuronMorph` | Section H | P0 | 3-keyframe line → multi-input → bent-line morph |

All other visual upgrades (staggered fades, marker easing, trajectory drawing, tab-switch layoutId transitions, the 3B.8 recap chain) are modifications to existing components/sections, not new components.

---

## 13. Explicit non-goals

- Do NOT auto-play `CalculationFlowPlayer` or `LineToNeuronMorph` on a loop — both are instructor-paced or one-shot-on-scroll. A looping animation the instructor can't control is worse than a static page for a live-taught session.
- Do NOT build a full interactive 3D/rotatable loss surface for the 2-feature case in 3B.7 — that's disproportionate effort for a "simple second example"; the honest numeric comparison table carries the point.
- Do NOT let any P2 micro-animation (the four loss-function mini-visuals in 3B.2, the batch/epoch flow diagram) block or delay P0/P1 work. Build P0 and P1 items fully functional first; P2 is genuine "if time remains" polish.
- Do NOT change the underlying dataset values, gradient formulas, or computed numbers anywhere in this spec — every number has been hand-verified against `FALLBACK_DATASETS['milk-7day']` and the neural-network page's festival dataset. If a future edit changes the dataset, every quoted number in §7 and §9 must be recomputed, not left stale.
- Do NOT remove or shorten the taxonomy card (§4) or the origin story (§6) — both satisfy specific contractual Module 1/1.2 syllabus items (see §14).
- Do NOT introduce "compass," "GPS," or any other new metaphor for the gradient/derivative. The module runs on exactly one physical image — a ball rolling downhill — from 3B.3 through Cauchy's story in 3B.4 through the marker in Section E. Reuse it; don't compete with it.
- Do NOT duplicate the loss-surface heatmap's SVG/contour rendering between Section E and 3B.6's inline preview — both must consume the same `LossSurfaceHeatmap` primitive (see §12) so a future tweak to one can't silently leave the other stale.

---

## 14. Traceability to `og_requirements.md`

| Module 1.2 syllabus item | Where it's covered |
|---|---|
| Traditional ML vs. GenAI, supervised/unsupervised | §4 Taxonomy card |
| Neural Networks Explained: perceptrons, weights, biases | §7 (3B.1, 3B.4), §11 bridge |
| AI Model Lifecycle: training, inference | §7 (3B.1 model definition, 3B.5 batches/epochs) |
| Key AI Terminology & IT Scenario Mapping | §7 throughout (every symbol given both math and AI names) |

---

## 15. Definition of done

- [ ] All 16 sections in §2's pacing table exist as distinct, individually time-badged units in that order (including the new 3B.8 recap).
- [ ] Every number displayed anywhere in the module matches the hand-verified values in this spec (no placeholder/rounded-differently values).
- [ ] All P0 components (`LossSurfaceHeatmap`, `CalculationFlowPlayer`, `LineToNeuronMorph`) are fully functional, controllable (not auto-looping), and instructor-pace-friendly.
- [ ] Every `GuessPrompt`/guess gate in the module pauses for room interaction before its reveal — verify none auto-reveal: 3B.2, 3B.3, 3B.4 (learning-rate race), 3B.6 (mid-walkthrough "is one step enough?"), and 3B.7 (temperature guess).
- [ ] No competing metaphor for the gradient/derivative appears anywhere — "downhill" only, no "compass" or equivalent.
- [ ] Cauchy's 1847 story appears once, in 3B.4, not in 3A.
- [ ] 3B.6's Step 1 reads as one fully-narrated row (Monday) followed by a compressed pass over the remaining six, not seven uniform repetitions.
- [ ] Section E's parameter marker animates smoothly between every state change (slider drag, Single Step, Auto-Fit, Snap-to-OLS, Reset) — no instant jumps.
- [ ] Section E's full heatmap and 3B.6's inline mini-preview both render via the shared `LossSurfaceHeatmap` primitive, not duplicated code.
- [ ] Page renders with zero console errors and passes `npm run build` with no TypeScript errors.
- [ ] Tested at 1920×1080 (the projector resolution used throughout the course).
