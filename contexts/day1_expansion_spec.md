# Build Spec: Day 1 Expansion — Course Map, Antigravity, and a Real Linear Regression
**For: Google Antigravity — extend the existing `ai4it-web` Next.js app**
**Companion docs:** `contexts/og_requirements.md` (the client's original syllabus — **the contractual deliverable**), `contexts/AI4IT_Lecture_Plan.md` (the delivery plan derived from it), `contexts/day1_opener_spec.md` (already built as `/`), `contexts/day1_opener_content_guide.md` (instructor framing).

> **v2 changes from the first draft of this spec:**
> 1. The Chilling Center Copilot is now a **demonstrated reference system, not a built-along project** (§3, §3.5). Cost-driven.
> 2. Added `/day1/dairy-ai` (§3A) — the Module 1 "AI in Dairy Ecosystem" / "Future of AI in Dairy Ecosystem" requirement, which had no home anywhere on the site.
> 3. Opener trends grid extended with **edge AI, small language models, and multi-modal** — named in Module 1 and currently missing (§3B).
> 4. Added **Traditional ML vs GenAI / supervised vs unsupervised** framing to the regression page (§5-A2) — a Module 1.2 requirement Day 1 never states.
> 5. `m` and `c` are now explicitly named **weight and bias** (§5-D1, §5-H) — Module 1.2 vocabulary.
> 6. Day 1 time budget rebalanced (§2A) and a syllabus traceability table added (§17).

---

## 0. What already exists (do not rebuild)

| Route | File | State |
|---|---|---|
| `/` | `src/app/page.tsx` | Done — Day 1 opener: cold open, AI evolution timeline, terminology flip-cards, nested rings, ANI/AGI/ASI spectrum, enterprise trends, bridge CTA |
| `/day1/linear-regression` | `src/app/day1/linear-regression/` | Thin — one gradient-descent demo, no concept scaffolding |
| `/day1/neural-network` | `src/app/day1/neural-network/` | Thin — forward-pass demo, analogy is slightly wrong (see §6) |
| Backend | `ai4it-backend/` | FastAPI + service-layer pattern. `/api/linear-regression/step`, `/api/neural-network/*` |

**Stack facts to respect:** Next.js 16 App Router, React 19, `framer-motion`, `animejs`, `lucide-react`, plain CSS with the `.glass-panel` / `.glass-card` / `.button-primary` utilities in `globals.css`. Dark theme, tokens in `:root` (`--bg-color: #0b0f19`, accent `#3b82f6`). Fonts: Inter (body) + Outfit (headings). **Read `ai4it-web/AGENTS.md` and the docs in `node_modules/next/dist/docs/` before writing routing code — this Next.js version differs from training data.**

---

## 1. The problem this spec solves

Day 1 in the lecture plan is **6 hours**. The site currently carries maybe 45 minutes of it. Three concrete gaps:

1. **No course map page.** Lecture-plan item #2 ("Course map + introduce the Copilot project", 10 min) has nowhere to live. The audience never sees the 6-day arc or what the Chilling Center Copilot actually is. Right now the opener's closing line promises "Next: the 6-day roadmap" and then links straight to linear regression — a broken promise on screen.
2. **No Antigravity orientation page.** Item #3, 30 min, and it's the tool they use for homework all course. Nothing exists.
3. **Linear regression is budgeted 65 minutes and contains no concepts.** No origin story, no explanation of *why* the error is squared, no loss landscape, no evaluation metric, no "break it" moment, no bridge to the neuron. It is a slider demo, not a lesson. Also missing: the case study block (45 min), the sequence-problem setup (20 min), the "you try it" (15 min), and POC-vs-production note #1 (10 min).

**The method the whole course runs on** (from the lecture plan) must be visible in the page structure, in this order:

> relatable problem → **let them guess** → reveal + visualize → **break it** → apply to their world

Every new concept page below is laid out in exactly those five beats. The "let them guess" beat is a real on-screen pause, not a rhetorical flourish — the instructor stops and asks the room.

---

## 2. New route map

```
/                              exists — opener   (30 min)  + §3B additions
/course-map                    NEW   §3   (10 min)
/day1/dairy-ai                 NEW   §3A  (20 min)
/antigravity                   NEW   §4   (30 min)
/day1/linear-regression        REBUILD §5 (65 min)
/day1/neural-network           EXPAND  §6 (75 min)
/day1/case-study               NEW   §7   (30 min)
/day1/sequence-problem         NEW   §8   (20 min)
/day1/lab                      NEW   §9   (15 min "you try it")
/day1/poc-vs-production        NEW   §10  (10 min)
```

Update `src/components/Sidebar.tsx`: group links under day headings, and put the minute budget next to each item as a small muted badge (the instructor uses this to pace; the room reads it as an agenda). Add a collapsible per day so Weekend 2/3 can be stubbed without cluttering.

Suggested sidebar structure:

```
AI4IT Workshop
-- OPENING
   Welcome & Overview            30m
   The 6-Day Map                 10m
   AI in the Dairy Ecosystem     20m
   Antigravity Setup             30m
-- DAY 1 · Patterns
   1. Linear Regression          65m
   2. Neural Networks            75m
   3. Case Study: AI in IT       30m
   4. When Order Matters         20m
   5. Lab: You Try It            15m
   6. POC vs Production          10m
-- DAY 2 · Memory & Attention   (stubs, existing links)
```

### 2A. Time budget — read this before building

Day 1 is 6 hours = 360 min. Subtract one 15-min break and a 45-min lunch → **~300 min of teaching time.** The lecture plan's original Day 1 totals exactly 300. This spec adds `/day1/dairy-ai` (+20, a contractual Module 1 item) and offsets it by trimming `/day1/case-study` 45 → 30, because its capacity-forecasting case overlaps with §5-G and its anomaly-detection case overlaps with the dairy page's cold-chain example.

**New total: 305 min — a 5-minute overrun, which is within noise.** Do not add further sections without removing something. If the room runs slow, `/day1/lab` (15 min) is the designed cut — it is a repeat of a skill already practised, not new material.

The `<InstructorNote>` component (§13) must display each section's budget so the instructor can see drift live.

---

## 3. NEW `/course-map` — The 6-Day Map + the Copilot

**10 min. Goal: they leave knowing what they're building and when each piece arrives.**

### Section A — "One system, six days"

Full-width horizontal arc, three phases, animated left-to-right on scroll (framer-motion `whileInView`):

| Phase | Days | The Copilot… | What they learn |
|---|---|---|---|
| **Predicts** | 1–2 | forecasts tomorrow's milk collection | regression → neural nets → RNN/LSTM → transformers |
| **Talks** | 3–4 | answers questions about NDDB's own SOPs | prompting → RAG → integration |
| **Acts** | 5–6 | raises a ticket, sends an alert, on its own | tool calling → agents → governance |

Each phase is a card that expands on hover/click to reveal the day-by-day breakdown. Colour-code the three phases and **reuse those three colours consistently everywhere else in the app** — every concept page gets a small "you are here" chip in its phase colour. Suggested: Predicts `#60a5fa`, Talks `#a78bfa`, Acts `#34d399` (already the opener's palette).

### Section B — "Meet the Chilling Center Copilot" — **as a reference system, not a build target**

> **Framing change — apply this everywhere the Copilot is mentioned, on every page and every day.**
> The Copilot is **shown, not built by the room.** It is the worked example that every concept points at — a system the instructor demonstrates, and which the participants learn to *read, judge, and specify*, rather than assemble. The old "we build this together, piece by piece" line must be removed from the opener's closing section and anywhere else it appears.

Replacement wording for this page:

> "You are not going to build this. You're going to understand it well enough to specify it, judge it, and decide whether it belongs in your part of NDDB. Every concept over the next six days is one capability in this diagram — and by Day 6 you'll be able to point at any box and say what's inside it, what it costs, and how it fails."

This is a **stronger** position for this audience, not a weaker one. Sysadmins and infra engineers are not being hired to write models; they are being asked to evaluate, host, secure, and operate them. Specify-and-judge is the actual job. Say that out loud on this page.

**What replaces the hands-on:** the per-day exercises from the syllabus (the five named Labs in `og_requirements.md`) and the Antigravity gap-week builds. Those stay fully hands-on and cost nothing per participant. Only the *Copilot itself* becomes demonstration-only.

A single diagram of the reference system, built up in layers as the user scrolls — start with just a box labelled "Copilot", then reveal each subsystem with the day number it is explained on:

```
              +--------------------------+
              |   Chilling Center        |
              |       Copilot            |
              +-----------+--------------+
     +--------------------+-------------------+
 [ PREDICT ]         [ ANSWER ]           [ ACT ]
 forecast model      RAG over SOPs        tools + agent
   (Day 1-2)          (Day 3-4)           (Day 5-6)
     |                    |                   |
 collection data     SOP documents      ticketing / alerts
```

Implement as inline SVG with framer-motion `pathLength` / opacity staggering — **not** an image. Greyed-out subsystems for days not yet reached; the page reads the current day from a simple constant so it can be re-shown on Day 3 and Day 5 with more lit up. Expose that as `const CURRENT_DAY = 1;` at the top of the file with a comment.

**Each box is a clickable capability card.** Because the system is demonstrated rather than built, these cards carry the weight the build used to carry. Every card shows the same four fields — this is the specification habit the course is really teaching:

| Field | Example (the PREDICT box) |
|---|---|
| **What it does** | Forecasts tomorrow's collection per chilling center |
| **What it needs** | 90 days of collection history, ~50 MB, no GPU |
| **What it costs** | Effectively nothing — runs on a CPU in milliseconds |
| **How it fails** | Confidently wrong on festivals and policy changes |

Cards for the Day 3–6 boxes start locked/greyed with "unlocks Day 4" and fill in as the course progresses. The "How it fails" row is mandatory on every card and is the single most valuable column for this audience.

### Section C — Ground rules (short, 4 cards)

- **You will not be coding, and you will not be building the Copilot.** You'll describe intent, inspect results, and judge whether they're right.
- **Every day starts with a quiz** on the last one. Not graded — retrieval beats re-reading.
- **Nothing here is production-ready.** We'll flag exactly why, three times.
- **Homework is a build, not a worksheet.** Broken is fine. Bring it anyway.

### Section D — Bridge

> "The Copilot's first job is to predict. And every prediction machine in AI — including the one behind ChatGPT — is a descendant of one 200-year-old idea. Let's go meet it."

CTA → `/day1/dairy-ai` (next in running order) with a secondary link to `/day1/linear-regression`.

---

## 3.5. Cost model — what the Copilot reduction actually changes

The reason for the change is cost, so the spec should be precise about where cost lives. It is **not evenly spread across the six days**:

| Phase | Days | What powers it | Per-participant cost |
|---|---|---|---|
| **Predicts** | 1–2 | Deterministic maths — NumPy in `ai4it-backend`. No LLM anywhere. | **Zero** |
| **Talks** | 3–4 | LLM API calls per query (OpenRouter) | Real, scales with headcount |
| **Acts** | 5–6 | LLM calls in an agent loop — several per task | Highest, and unbounded if a loop misbehaves |

**Two consequences for this build:**

1. **Day 1 keeps a genuinely live Copilot demo, at no cost.** The PREDICT capability is regression and a small neural net — exactly what `ai4it-backend` already computes. Everything in §5 and §6 can stay fully interactive and hands-on. **Do not water down Day 1 for cost reasons; there is no cost on Day 1.** The reduction is a Day 3–6 concern.
2. **For Days 3–6, build one instructor-driven instance**, not thirty. One shared deployment the instructor drives on the projector, with **pre-captured transcripts as a fallback** so the demo still runs if the network or the API is down. That preserves the narrative spine at roughly 1/30th the cost. Budget the API spend once, for rehearsal plus the live sessions.

> **Open item, out of scope for this spec but needs a decision before Weekend 3:** the lecture plan's Day 6 capstone is *"finish/demo the full Copilot (predicts, talks, acts) to the group."* That no longer works if nobody built one. A workable replacement, consistent with the specify-and-judge framing: participants present a **written specification and evaluation** of one Copilot capability for their own area — using the four-field card format from §3-B — instead of a working demo. That also feeds Module 6's roadmap exercise more directly than a demo would. Flagging it here so it isn't discovered on Day 6.

---

## 3A. NEW `/day1/dairy-ai` — AI in the Dairy Ecosystem

**20 min. This is a contractual Module 1 deliverable** (`og_requirements.md` → "AI in Dairy Ecosystem" and "Future of AI in Dairy Ecosystem") **and it currently has no home anywhere on the site.** The opener spec deliberately excludes dairy content ("no dairy/milk motifs in this section — save that for later days"), and the lecture plan only sprinkles 🥛 asides inside technical sections. Neither satisfies the requirement, and for an NDDB audience this is the section they are most likely to care about.

Place it immediately after `/course-map`, before the technical content. Rationale: it answers "why is *this organisation* doing this course" before the room has to sit through gradient descent.

### Section A — Present tense: where AI already touches the dairy chain

An interactive chain diagram — **farmer → collection → chilling center → transport → processing → distribution** — where clicking each stage reveals the AI application at that point. Cover the syllabus's named items, no more:

| Stage | Application (from Module 1) |
|---|---|
| Farmer | Cattle health diagnostics; vernacular farmer-facing digital services |
| Collection | Milk procurement records; automated yield forecasting |
| Chilling center | **Cold-chain predictive monitoring** — the course's running example |
| Transport | Traceability across the chain |
| Processing | Quality diagnostics / testing |
| Cooperative (overlay) | Cooperative data analytics, supply chain intelligence |

Highlight the chilling-center node in the PREDICT phase colour and label it *"this is the one we follow all course"* — this is where the running example gets planted.

### Section B — Future tense (Module 1's "Future of AI in Dairy Ecosystem")

Three cards, clearly marked as **not yet real** — this audience will punish overselling:

- **Autonomous supply chain coordination** — routing and scheduling that adjusts itself to collection volumes.
- **Real-time quality testing** — inline analysis rather than lab turnaround.
- **Conversational vernacular interfaces for milk producers** — a farmer asking a question in their own language and getting a useful answer.

Under each, a one-line honest status: *what exists today, what's missing, what it would take.* Do not present any of these as shipping.

### Section C — The edge-AI hook (ties to §3B)

One panel, and it is the most NDDB-specific point in the whole of Day 1:

> A chilling center is an **edge site**. Intermittent connectivity, no server room, no one on site to restart anything. That single fact rules out a large part of what people mean when they say "just use AI" — and it is exactly why **small language models and edge AI** (§3B) matter more here than they do in a Bangalore data centre.

This sets up Day 6's infrastructure module and gives the Module 7 content a concrete reason to exist. Carry it forward as a recurring constraint.

### Section D — Bridge

> "Cold-chain prediction is the simplest of all of these, and it's the one we can build up from first principles. Let's start there — with the oldest prediction method there is."

---

## 3B. Additions to the existing opener (`/`)

Two gaps against Module 1 in the already-built page. Both are small edits, not a rebuild.

**1. The trends grid is missing three named items.** Module 1's "Current AI Trends" specifies *autonomous agents, multi-modal systems, edge AI, and small language models (SLMs).* The current grid has agents ✅ but no multi-modal, no edge AI, no SLMs. Add three cards in the existing `.trend-card` style:

- **Multi-modal systems** — one model handling text, images, and audio together. *In IT: reading a screenshot of an error, not just the log line.*
- **Edge AI** — models running at the site, not in the cloud. *In IT: inference at a chilling center with intermittent connectivity.*
- **Small Language Models (SLMs)** — compact models that run on modest hardware. *In IT: a 3B model on an on-prem box, no per-token bill, no data leaving the building.*

The last two are the ones this audience should remember; they connect straight to §3A-C and to Module 7's on-prem/hybrid infrastructure content. Consider promoting Edge AI + SLMs to a paired highlight card.

**2. The "AI in Enterprise IT" framing line from Module 1 is absent.** Add it as the trends section's closing line, replacing or preceding the current one:

> *"Shifting IT from a cost centre to a proactive, automated intelligence hub."* Then, immediately, the honest version: *"That's the pitch. Whether it's true in your area is a question you'll be able to answer for yourself by Day 6."*

**3. Remove the build-along promise.** The opener's closing section currently says the Copilot is *"the system we'll build together."* Per §3, change to *"the system we'll follow, take apart, and learn to judge."*

---

## 4. NEW `/antigravity` — Orientation

**30 min. Goal: installed, ran one thing, and correctly framed. Explicitly NOT a coding lesson.**

### Section A — The reframe (must come first, before any install step)

Three-column contrast, large type:

| What this is NOT | What this IS |
|---|---|
| Learning to code | Learning to **describe intent** |
| Reading the output line by line | **Inspecting** what got built |
| Trusting it | **Judging** whether it's right |

Closing line: *"If you can write a clear ticket, you can drive this."*

### Section B — Setup checklist

Interactive checklist with `localStorage` persistence (wrap every read/write in try/catch — some rooms run locked-down browsers). Steps as a numbered vertical stepper, each expandable:

1. Download & install
2. Sign in
3. Open a new empty folder as a workspace
4. Verify: the agent panel responds to "hello"

Include a visible **"I'm stuck"** panel with the two or three failure modes the instructor expects (proxy/firewall at NDDB, sign-in loop, workspace permissions). Leave the exact remediation text as a `TODO(instructor)` comment — the instructor fills these in after a dry run on the real network.

### Section C — Live demo script (instructor-facing, but on screen)

A three-beat panel the instructor drives live. Put the **exact prompt text** on screen in a copyable code block so the room can follow along:

> **Beat 1 — describe:** "Build me a single HTML page that shows today's date and a countdown to 6 PM."
> **Beat 2 — inspect:** scroll the generated file together. Ask the room: *"What is this line doing?"* Don't answer everything.
> **Beat 3 — judge:** "Is it right? How would we know?" → change the system clock or the target hour and watch it break/hold.

### Section D — The judging rubric (the actual takeaway)

Four questions they'll reuse every day of the course. Make these visually prominent — they recur on Day 5 and Day 6:

1. Does it do what I asked, or what it assumed I asked?
2. What happens at the edges — empty input, huge input, wrong type?
3. Would I be comfortable if this ran unattended?
4. Can I explain it to the next person?

### Section E — Homework framing

Tonight's brief in one card, matching the lecture plan's Gap Week 1 homework: pick one small daily annoyance, describe it to Antigravity, let it build something. **Doesn't need to work or be useful.** Bring it (or a screenshot) to Day 3.

---

## 5. REBUILD `/day1/linear-regression`

**65 min. This is the page the whole course's credibility rests on.** Keep the existing `LinearRegressionDemo.tsx` — it becomes Section E. Everything else is new. Structure the page as scroll sections mirroring the five-beat method.

### A — The problem (beat 1: relatable problem)

Present the actual data before any concept. A table of the last 7 days of milk collection at one chilling center (litres), plus tomorrow blank with a `?`.

```
Mon 2,140 · Tue 2,210 · Wed 2,180 · Thu 2,300 · Fri 2,350 · Sat 2,420 · Sun 2,390 · Mon ???
```

Use these numbers consistently across the entire page and reuse them on Day 2 for the RNN demo, so the dataset becomes a familiar object.

### A2 — Name the kind of problem this is (Module 1.2, currently missing everywhere)

**~5 min, in-page, no separate route.** `og_requirements.md` Module 1.2 opens with *"Traditional ML vs. Generative AI: supervised/unsupervised predictive modeling vs. probabilistic content generation."* Day 1 spends six hours doing supervised learning and never once names it. Fix that here, at the first moment it's concrete rather than abstract.

Three short definitional beats, each anchored to the milk data already on screen:

- **Supervised** — we have the right answers for past days, so the model can be corrected. *That's what we're doing.* The known answers have a name: **labels**. The inputs have a name: **features**.
- **Unsupervised** — no right answers; the model groups what looks alike. *Example they'll meet on Day 2: clustering embeddings.*
- **Generative** — doesn't predict a number, produces content one token at a time. *That's ChatGPT, and it's Day 2 onwards.*

Then the one distinction that actually matters to this audience, as a two-column panel:

| Traditional ML (Days 1–2) | Generative AI (Days 2–6) |
|---|---|
| Predicts a number or a class | Produces text, code, images |
| Same input → same output | Same input → different output each time |
| Wrong is measurable (RMSE) | Wrong is a judgement call |
| Runs on a CPU, costs nothing per call | Needs a GPU or an API, costs per token |
| Fails visibly | **Fails fluently** |

> Closing line, on screen: *"Both are 'AI'. Only one of them can tell you how wrong it is. Keep that column in your head for the next six days."*

That last row is the honest through-line of the whole course and lands best here, before anyone has seen an LLM.

### B — Let them guess (beat 2 — DO NOT SKIP)

A dedicated full-height section. Show three answer methods as clickable cards, **with no "correct" marker**:

- **"Just use yesterday's number"** → 2,390. Reveal on click: this is the *persistence baseline*. State plainly: it is often hard to beat, and any real forecasting project must beat it to justify existing. This is a genuine professional point, not a joke option.
- **"Average the week"** → 2,284. Reveal: throws away the trend entirely.
- **"Eyeball the trend and extend it"** → ~2,450. Reveal: **this is linear regression.** You already do it. The rest of this session is just making "eyeball" precise.

Add a free-text input where a participant's guess can be typed and plotted as a dot on the chart in Section E later (persist in component state / `localStorage`). Cheap to build, and it makes the reveal land — their line is on the screen next to the fitted one.

### C — Where this came from (beat 3a: the origin story — **the biggest current gap**)

The explicit complaint about the current page: it contains not one concept about where regression came from. Three cards on a timeline, in the visual language already used by the opener's evolution timeline (reuse that CSS):

**1801 — A lost planet.**
Giuseppe Piazzi spots a new object (Ceres), tracks it for weeks, then loses it in the sun's glare. Nobody knows where to look when it re-emerges. A 24-year-old Carl Friedrich Gauss fits a curve to the handful of noisy observations and predicts where it will reappear. Astronomers point their telescopes there. It's there.
*The point: least squares was invented to make a prediction from too little, noisy data — exactly our problem.*

**1805 — Who invented it.**
Adrien-Marie Legendre publishes the method of least squares first. Gauss says he'd been using it since 1795 and publishes his version in 1809, connecting it to the normal distribution. One of the most famous priority disputes in mathematics.
*The point: the method is 220 years old, and it is still the single most-used model in industry.*

**1886 — Where the weird name comes from.**
Francis Galton studies the heights of parents and their children. Very tall parents have tall children — but on average **closer to the population mean** than the parents were. He calls this "regression towards mediocrity."
*The point: "regression" is not a technical description of fitting lines. It's a leftover name from a 19th-century observation about height. Everyone has to be told this once.*

Add a short callout closing the section: **1847 — Cauchy publishes gradient descent.** The method that Section E's "Auto-Fit" button uses is 178 years old and is still how every neural network in the world, including GPT-class models, is trained.

### D — What "best fit" actually means (beat 3b: reveal)

Three stacked sub-sections; each must be a distinct on-screen moment.

**D1. The line.** `y = m·x + c`. Render with KaTeX (check `package.json` — if `katex` is absent, add it; do not hand-roll math markup). Label every symbol in plain language directly under the formula: *m = how much collection changes per day. c = where we start. x = which day. y = predicted litres.* Add a plain-English restatement: **"prediction = slope × input + offset."**

**Then immediately give both symbols their AI names**, as a labelled callout — Module 1.2 lists *"perceptrons, weights, biases, activation functions"* as required vocabulary, and this is the only place in the course where those words can be introduced against something the room already understands:

> `m` has another name: the **weight**. `c` has another name: the **bias**.
> Every time you hear that a model "has 7 billion parameters," it means it has 7 billion of these two things. Not 7 billion ideas — 7 billion `m`s and `c`s.

That single sentence does more to demystify LLM parameter counts than anything on Day 2 will. Repeat the weight/bias labels on the slider controls in Section E, next to `m` and `c`, so the vocabulary is reinforced by use rather than by a glossary.

**D2. Measuring wrongness.** Add an interactive the current page lacks: a toggle between **absolute error** and **squared error** on the same badly-fitted line, with the residual bars redrawn. Then answer the question every sharp participant asks:

> **Why square the error?**
> - Negatives don't cancel positives.
> - A 20-litre miss hurts 4× as much as a 10-litre miss — big misses are the ones that spoil milk.
> - It's smooth, so calculus can find the minimum. Absolute error has a kink at zero.
> - Under the assumption that noise is Gaussian, least squares is the *most likely* line. (Gauss again, 1809.)

Also introduce the metrics here, with the plain-language gloss: **MSE** (squared litres — meaningless units), **RMSE** (litres — "we're typically off by about X litres"), **R²** ("how much of the variation the line explains"). RMSE is the one they should quote to management.

**D3. The loss landscape** — the highest-value new visual on the page. Currently the app shows loss as a number, which teaches nothing. Show it as a **surface**: a 2D contour/heatmap with `m` on one axis and `c` on the other, colour = MSE, with a marker for the current `(m, c)`. As the user drags the sliders in Section E, the marker moves across the landscape; as gradient descent runs, it traces a visible path downhill into the basin.

> **This single visual is what makes every later day make sense.** "Training" is this marker rolling downhill. Say that on screen, in those words: *"Every model in this course — including the one behind ChatGPT — is trained by exactly this: rolling a marker downhill on a surface like this one. The surface just has billions of axes instead of two."*

Implementation: precompute the MSE grid on the backend (§11) and render as an SVG heatmap or `<canvas>`. A 60×60 grid is plenty. Don't attempt real 3D.

### E — The existing demo, upgraded

Keep `LinearRegressionDemo.tsx`. Four changes:

1. **Add the loss landscape** beside the fit chart, marker synced to `(m, c)`.
2. **Add an "Auto-Fit" run button** — repeated stepping with `requestAnimationFrame` (~30 steps), so the room sees convergence as motion instead of clicking "step" 30 times.
3. **Add a learning-rate blow-up preset.** Set LR large (e.g. `0.5`) and the marker overshoots and diverges. Caption: *"Too big a step and it never lands. Too small and you're here all day. That trade-off never goes away — on Day 5 you'll hear the same argument about agents."* This is the first honest "AI can fail" moment in the course; do not cut it.
4. **Fix the fragility** (see §12) — the demo hard-codes `http://localhost:8000` and silently dies if the backend isn't up. On a projector, in front of 30 people, that is a total failure.

### F — Break it (beat 4 — currently missing entirely)

Two exhibits, both interactive.

**F1. The curve.** A dataset with a genuine bend — collection rises through the flush season, plateaus, falls. Fit the best possible straight line; show that it is confidently, uniformly wrong. **This is the exact motivation for the neural network page** — say so on screen and link forward.

**F2. Anscombe's quartet (1973).** Four small datasets with *identical* mean, variance, correlation, and *identical* fitted regression line — that look nothing alike when plotted (one clean line, one a curve, one with a single outlier dragging the fit, one a vertical stack with one stray point). Show all four side by side with the same line drawn through each, and the identical summary statistics printed underneath.

> Takeaway line, on screen: **"The metrics said all four models were the same. Only one of them was any good. If you take one habit from today: plot it."**

Use the canonical Anscombe values — the whole point is that the statistics match to 2–3 decimals, so they must be exact.

### G — Apply to their world (beat 5)

Three short cards, each mapping the same equation onto something they already own:

- **Capacity planning** — disk usage vs. week → when do we hit 80%?
- **Ticket volume** — tickets vs. month → next quarter's staffing.
- **Chilling center** — collection vs. day → tomorrow's tanker scheduling.

Then one honest caveat card: *"All three assume the future looks like the past, in a straight line. The moment it doesn't — a festival, a new plant, a policy change — the line lies confidently. That's not a bug in the maths; it's the assumption you agreed to."*

### H — The bridge to neural networks (**the most important paragraph on the page**)

End the page with this, prominently:

> One linear regression: `y = m·x + c` — one weight, one bias.
> Add more inputs: `y = m₁x₁ + m₂x₂ + m₃x₃ + c` — more weights, still one bias. Still a straight thing, just in more dimensions.
> Now bend the output with one small function, and stack a few of them.
> **That is a neural network. A neuron is literally the line you just fitted, with a kink added.**
> **And it has a name: Frank Rosenblatt called it a *perceptron*, in 1958.**

Show this as a three-frame animated transition: the fitted line → three lines stacked in a small network diagram → a bent decision boundary. Reuse the phase colours. This is the single sentence that makes Day 2 comprehensible, and right now the site never says it.

Close the page with the parameter-count payoff, since the weight/bias vocabulary from §5-D1 is now loaded:

> *"You just tuned 2 parameters by hand and it took you a few minutes. GPT-class models tune hundreds of billions of the same two things, by the same downhill method you watched on the landscape. That is the entire difference in kind: there isn't one. Only scale."*

---

## 6. EXPAND `/day1/neural-network`

**75 min.** Keep `NeuralNetworkDemo.tsx`. Add around it:

### A — Fix the framing

The current "committee of experts" analogy describes an **ensemble**, not a neural network, and will mislead anyone who later meets random forests. Replace with the lecture plan's own framing: **"stack several bent trendlines together."** Keep a committee-flavoured sentence only for the *hidden layer* — each hidden unit specialising in one aspect is fair — but lead with the stacked-lines reveal.

### B — The activation function (new, ~10 min)

The kink is the entire trick and the page never mentions it. One interactive: a straight line with a slider that introduces the bend (ReLU), showing that *without* it, stacking layers collapses back to a single straight line.

> **"Ten linear layers stacked = one linear layer. Without the bend, depth buys you nothing."** Demonstrate numerically — compose two linear layers, show the result is still linear.

Show ReLU, sigmoid, tanh side by side with one line on why ReLU won (cheap, doesn't saturate, trains fast).

### C — Decision-boundary playground

The lecture plan calls for a playground where the boundary bends as layers/neurons are added. Verify the existing demo does this; if it only does a forward pass, extend it: neuron-count and layer-count sliders, boundary redrawn live, on a dataset a straight line provably cannot separate (concentric rings or two moons). Add a **"try 1 neuron"** preset that visibly fails — the failure is the lesson.

### D — Backpropagation, honestly

The existing "error flows backwards" card is good. Add one sentence tying it back: *"Backpropagation is the loss-landscape marker from the last page — just with thousands of axes instead of two. Same rolling downhill, same learning-rate trade-off."* Reuse the landscape visual in miniature.

### E — Multi-factor forecast (dairy angle, per plan)

Extend the running example: predict collection from **temperature + day-of-week + festival flag**, not just day number. Show that adding the festival flag is what a straight line on day-number alone could never capture.

### F — Break it → Day 2

End with the plan's setup: the network sees the seven days as seven independent numbers. It has **no idea they're in order**. Shuffle the inputs and show the prediction is unchanged. That's the hook for `/day1/sequence-problem`.

---

## 7. NEW `/day1/case-study` — "Where is this already used in IT?"

**30 min** (trimmed from 45 to fund `/day1/dairy-ai` — see §2A). Two deep cases, not a list of buzzwords. Each follows: the problem → what a human does today → what the model does → what it costs you.

Because of the trim, **Case 1 is the priority**; Case 2 leans on §5-G rather than re-teaching the fit. If time runs short, Case 2 compresses to its confidence-band point alone.

**Case 1 — Anomaly detection in server metrics.** Interactive: a CPU/temp time series with a threshold slider. Show the classic failure — a static threshold either floods you with false alarms or misses the slow creep. Then show a learned baseline that adapts by time-of-day (Sunday 3 AM traffic ≠ Monday 10 AM traffic). Include a **false-positive / false-negative trade-off** control, and be explicit that you must choose which error you'd rather have. This is their world; they've all been paged at 3 AM by a dumb threshold.

**Case 2 — Capacity forecasting.** Direct callback: this is Section A's straight line, applied to disk growth. Show the fitted line, the projected 80% crossing date, and — importantly — the **confidence band widening** the further out you go. Caption: *"The line doesn't get more wrong further out. It gets less certain. Any forecast without a band is hiding something."*

Close with a small honesty panel: three things the industry tried that didn't work well (over-eager alerting ML that teams switched off, models retrained on their own bad output, dashboards nobody looked at). Credibility with a sysadmin audience is bought with failure stories, not success stories.

---

## 8. NEW `/day1/sequence-problem` — When order matters

**20 min. This page's only job is to create a question that Day 2 answers.**

One interactive: the 7-day milk series. A **shuffle button** reorders the inputs. The neural network's prediction is **identical**. Then a second panel shows a human looking at the same shuffled data and immediately saying "that's not a trend any more."

Then a second failure: a festival three weeks back that lifted collection. Show that a fixed 7-day window literally cannot see it — the information is outside the input.

End on the open question, large type, no answer:

> **"How do you give a model a memory?"**
> *Next session.*

---

## 9. NEW `/day1/lab` — You try it

**15 min.** A fresh dataset (not the milk data — use ticket volume or disk usage) with the same fit interface, no guidance, and a **leaderboard-style RMSE readout** so the room competes. Add a "reveal the optimal fit" button (closed-form least squares from the backend) so they can see how close they got by hand.

Then the Antigravity handoff: the exact prompt to paste, to have the agent do the same fit in Python with scikit-learn. Include the expected output so they can judge it — which is the §4 rubric in action.

---

## 10. NEW `/day1/poc-vs-production` — Note #1

**10 min. Deliberately plain — no glass, no animation.** A stark two-column table: *What we built today* vs. *What a real deployment needs*.

| Today's demo | Production needs |
|---|---|
| Fitted on 7 points, no holdout | Train/validation/test split, honest error estimate |
| Trained once, in the browser | Scheduled retraining as data drifts |
| No monitoring | Alerting when prediction error grows |
| One hard-coded dataset | A pipeline, with schema checks |
| No versioning | Model registry, rollback path |

Header line: *"Everything you saw today would fail in production. That's fine — that's what a POC is for. But you should be able to name exactly why."*

Footer: *"This is note #1 of 3. Note #2 comes on Day 4 (RAG), note #3 on Day 5 (agents). They get consolidated on Day 6 and feed straight into your rollout plan."*

---

## 11. Backend additions (`ai4it-backend`)

Follow the existing pattern exactly: Pydantic model in `app/models/`, logic in `app/services/` behind an ABC in `services/base.py`, thin router in `app/api/routes/`, registered in `main.py`. Keep it NumPy-only; no scikit-learn dependency for these.

| Endpoint | Purpose |
|---|---|
| `POST /api/linear-regression/loss-surface` | `{data, m_range, c_range, resolution}` → 2D MSE grid for the landscape heatmap (§5-D3) |
| `POST /api/linear-regression/fit` | closed-form least squares → optimal `m`, `c`, MSE, RMSE, R² (§9 reveal, §5-D2 metrics) |
| `GET  /api/datasets/{name}` | serves the canonical datasets: `milk-7day`, `milk-seasonal-curve`, `anscombe`, `tickets`, `disk-usage`. **Single source of truth — the frontend must not duplicate these arrays.** |
| `POST /api/neural-network/boundary` | grid of predictions for the decision-boundary playground (§6-C) |
| `POST /api/neural-network/train` | run N epochs, return loss history + final weights (§6-D) |

---

## 12. Reliability — must-fix, not nice-to-have

This site is driven live on a projector, likely on NDDB's network. Three current risks:

1. **Hard-coded `http://localhost:8000`** in `LinearRegressionDemo.tsx`. Move to `NEXT_PUBLIC_API_URL` with a `localhost:8000` default. Add `.env.example`.
2. **Silent failure.** The fetch currently `console.error`s and leaves the UI frozen — invisible to the room, baffling to the instructor. Every demo must (a) show a visible, calm "backend offline — running in local mode" badge, and (b) **fall back to an in-browser JS implementation of the same maths.** All Day-1 maths is a few lines of arithmetic; there is no excuse for a black screen. The backend then demonstrates architecture rather than being a single point of failure for the lecture.
3. **No offline story.** Google Fonts go through `next/font` (self-hosted at build time — fine). Confirm nothing else hits the network at runtime.

Add a `/status` route (unlisted in the sidebar) showing backend reachability and the health of each demo, so the instructor can green-light everything in the five minutes before the session starts.

---

## 13. Cross-cutting components to build once and reuse

| Component | Used by | Notes |
|---|---|---|
| `<ConceptBeat kind="problem\|guess\|reveal\|break\|apply">` | every concept page | Renders the consistent section header + phase chip, so the five-beat method is visually recognisable by the third page |
| `<GuessPrompt>` | §5-B, §6, §7, §8 | The pause-and-ask block. Muted until clicked, then reveals |
| `<InstructorNote>` | everywhere | Collapsed by default, toggled by a keyboard shortcut (suggest `Shift+N`) so it's invisible on the projector but available to the instructor. Holds timing, the question to ask aloud, and the expected wrong answers |
| `<DairyAngle>` / `<InfraAngle>` | per the lecture plan's 🥛 / 🧱 markers | Consistent styling for the two recurring aside types |
| `<PocNote n={1}>` | §10 and later days | Same plain-table treatment each time |
| `<Formula>` | §5-D, §6 | KaTeX wrapper with the mandatory plain-language symbol gloss underneath — never render bare math |
| `<Chart>` | all demos | One shared SVG scaffold (axes, grid, responsive viewBox). The existing demo hard-codes pixel maths (`point.x * 50`, `400 - y*30`) which won't survive a second dataset or a different projector aspect ratio |

---

## 14. Build order (dependency-aware)

1. **`<Chart>` + `<ConceptBeat>` + `<InstructorNote>`** — everything else depends on these
2. **§12 reliability fixes** — before adding demos, not after
3. **§3B opener edits** — smallest change, closes three contractual Module 1 gaps, and removes the build-along promise before anything else references it
4. **`/course-map`** — cheap, high visible value, closes the opener's broken promise
5. **`/day1/dairy-ai`** — contractual, self-contained, no dependency on the demo infrastructure
6. **§5 linear regression rebuild** — the big one; do §5-C (origin story) and §5-D3 (loss landscape) first, they're the highest-value pieces; §5-A2 and §5-D1 are cheap text additions that close Module 1.2 gaps
7. **`/antigravity`** — must exist before the first session ends
8. **§6 neural network expansion**
9. **`/day1/sequence-problem`** + **`/day1/poc-vs-production`** — short, do together
10. **`/day1/case-study`** + **`/day1/lab`**
11. **Sidebar restructure + `/status`**

---

## 15. Acceptance criteria

- [ ] Every route in §2 exists and is reachable from the sidebar, grouped by day with minute badges
- [ ] Section budgets sum to ~305 min per §2A; no section added without one removed
- [ ] **Every Module 1 and 1.2 row in §17 is satisfied** — this is the contractual check, run it last
- [ ] The Copilot is described as demonstrated/judged, never as built-by-the-room — check the opener's closing section specifically, which currently says "build together"
- [ ] Every capability card in §3-B has all four fields, including "How it fails"
- [ ] `/day1/dairy-ai` covers all six present-tense chain stages and all three future items, with the future ones marked not-yet-real
- [ ] The opener's trends grid includes multi-modal, edge AI, and SLMs
- [ ] Linear regression page contains all five beats, in order, each visually distinct
- [ ] The origin story (Ceres / Legendre–Gauss / Galton) is on the page, with the "where the name comes from" point made explicitly
- [ ] The loss landscape renders and its marker moves during gradient descent
- [ ] Anscombe's quartet shows four different shapes with matching printed statistics
- [ ] The neuron-is-a-line bridge (§5-H) is on screen in words, animated
- [ ] `/day1/neural-network` demonstrates that stacked linear layers collapse without an activation
- [ ] **Every demo works with the backend stopped**, showing a visible offline badge
- [ ] No hard-coded API URLs anywhere
- [ ] Instructor notes are hidden by default and toggleable
- [ ] Renders correctly at 1920×1080, 100% zoom (the projector), with no horizontal scroll
- [ ] `npm run build` and `npm run lint` both pass clean

---

## 16. Facts to get right (verify before shipping — these will be said out loud to a room)

- Piazzi discovered Ceres on 1 Jan 1801; Gauss's predicted position let it be recovered in Dec 1801.
- Legendre published least squares in 1805; Gauss published in 1809, claiming prior use from 1795.
- Galton's 1886 paper is "Regression towards Mediocrity in Hereditary Stature."
- Cauchy described gradient descent in 1847.
- Anscombe's quartet is from F. J. Anscombe, 1973 — use the canonical values so the summary statistics genuinely match.
- Rosenblatt's perceptron is 1958 — worth one line on the neural network page as the moment the "line with a kink" got its name.

If any of these can't be verified, cut the claim rather than paraphrasing it loosely. A wrong date in front of this audience costs more than a missing one.

---

## 17. Syllabus traceability — Modules 1 & 1.2 against Day 1

`og_requirements.md` is the client's document and the thing NDDB signed off on. Every Module 1 and 1.2 bullet must land somewhere. This table is the audit; **✱ marks what this v2 spec adds.**

### Module 1 — Introduction of AI

| Syllabus bullet | Where it lands |
|---|---|
| Evolution of AI | `/` — evolution timeline ✅ built |
| AI Terminology & Core Taxonomy | `/` — flip-cards ✅ built |
| AI vs ML vs DL vs GenAI | `/` — nested rings ✅ built |
| ANI vs AGI vs ASI | `/` — spectrum ✅ built |
| Current trends: autonomous agents | `/` — trends grid ✅ built |
| Current trends: **multi-modal** | ✱ §3B — missing, add |
| Current trends: **edge AI** | ✱ §3B + §3A-C — missing, add |
| Current trends: **SLMs** | ✱ §3B — missing, add |
| AI in Enterprise IT (cost centre → intelligence hub) | ✱ §3B-2 — framing line missing, add |
| **AI in Dairy Ecosystem** (procurement, traceability, cold chain, cattle health, yield forecasting, cooperative analytics) | ✱ §3A-A — **no home at all today** |
| **Future of AI in Dairy Ecosystem** (autonomous supply chain, real-time quality testing, vernacular interfaces) | ✱ §3A-B — **no home at all today** |

### Module 1.2 — AI Fundamentals for IT (the parts that belong on Day 1)

| Syllabus bullet | Where it lands |
|---|---|
| **Traditional ML vs GenAI; supervised/unsupervised** | ✱ §5-A2 — **never stated on Day 1 today** |
| Neural Networks: **perceptrons** | ✱ §5-H — Rosenblatt 1958 |
| Neural Networks: **weights, biases** | ✱ §5-D1 — named against `m` and `c` |
| Neural Networks: activation functions | §6-B |
| Neural Networks: deep layers | §6-C |
| Transformers, tokenization, context windows, embeddings, model lifecycle, inference, foundation models, decoding params | **Day 2** — correctly out of scope here (lecture plan Day 2, items 5–11) |

### Not on Day 1, tracked so nothing is silently dropped

Modules 2–7 and Labs 1–5 map to Days 3–6 per the lecture plan's own coverage check. Two items to keep an eye on, both flagged rather than solved here:

- **Lab exercises.** `og_requirements.md` names five labs. `/day1/lab` (§9) is **not** one of them — it's an extra Day 1 practice slot. All five named labs still sit on Days 3–6 and are unaffected by the Copilot change, since they use ChatGPT/Copilot/Gemini and Antigravity directly, not the Copilot build.
- **Day 6 capstone.** Needs replacing under the demonstration-only model — see the open item in §3.5.

---

## 18. One documented divergence from `og_requirements.md`

The client document specifies an **"Intensive 1-Day Instructor-Led Training / Workshop."** The delivery plan is **6 days across 3 weekends.** This spec builds to the 6-day plan.

That expansion is assumed to be already agreed — the lecture plan is written against it and this spec follows the lecture plan. **It is noted here only so it is a recorded decision rather than a discovered surprise**, and because it has one practical consequence worth stating: at 6× the contracted duration, every syllabus bullet gets real depth rather than a mention, which is exactly why the coverage table in §17 matters. Nothing in the original scope should be *thinner* than a 1-day course would have made it.
