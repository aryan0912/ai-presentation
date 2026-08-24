# Build Spec: Day 1 Opener — "What is AI, Really?"
**For: Google Antigravity — build this as a working webpage**
**Context for the agent:** This is a single scroll-based webpage used by a live instructor on a projector, at the very start of a 6-day AI course for NDDB's ICT/Infra/Ops team (sysadmins, zero prior AI background). It is the FIRST 30 minutes of Day 1, framed explicitly as "the map before the journey" — brisk, high-level orientation, not deep technical teaching. The instructor scrolls through it themselves; the audience just watches the screen. Keep it clean, fast to load, and self-contained.

---

## 1. Delivery mode & technical requirements

- **Single HTML file** (inline CSS + JS, no build step, no framework). Antigravity should be able to open it directly in a browser with no server.
- **Navigation:** scroll-based, single continuous page, divided into full-viewport-height sections (`scroll-snap-type: y proximity` so each scroll settles cleanly on a section, but doesn't feel rigid/locked).
- **No progress bar, no timer, no slide counter** — keep the chrome invisible. The instructor paces manually.
- Section transitions: content should fade/slide in as it enters the viewport (use `IntersectionObserver`, not a heavy animation library).
- Must render correctly on a 1920x1080 projector at 100% zoom. Desktop-only — no need to optimize for mobile.
- No external dependencies except a Google Font link (see style guide) — everything else self-contained so it works with no internet in the room.

## 2. Visual style guide

- **Tone:** clean, corporate, professional. This is a management-adjacent technical audience — no cartoonish illustration, no dairy/milk motifs in this section (save that for later days).
- **Palette:** neutral base with one confident accent.
  - Background: off-white / very light grey (`#FAFAFA` or `#F5F6F8`)
  - Primary text: near-black slate (`#1A1D23`)
  - Secondary text/muted: `#6B7280`
  - Accent: a single confident blue (`#2452F5` or similar) used sparingly — for highlights, active states, key numbers
  - Card backgrounds: white with a subtle border/shadow, not heavy drop-shadows
- **Typography:** one clean sans-serif (e.g. Inter, or system-ui stack). Large, confident headline sizes (48–72px for section titles), generous line-height and whitespace. This is presentation typography, not document typography — err large.
- **Layout:** generous padding, lots of negative space, max content width ~1100px centered. Avoid clutter — one idea per screen.

## 3. Content structure — 7 sections, ~30 minutes total

Each section below = roughly one "scroll stop." Content is provided; Antigravity should use it directly (don't invent new facts), but may adjust phrasing for on-screen brevity.

---

### Section 0 — Cold open (≈2 min)
**Goal:** hook, not information.

- Full-bleed section, centered, huge type.
- Headline: **"What is AI, really?"**
- Subline (smaller, muted): *"Before we build anything — let's get the map right."*
- A single interactive prompt below: a text-only rhetorical question that appears after a short delay:
  *"If you had to explain AI to someone in one sentence — what would you say?"*
- No answer given here. Just a beat of reflection before moving on. (Instructor asks the room out loud.)

---

### Section 1 — Evolution of AI (≈5 min)
**Goal:** show AI is not new; it's been building for 70+ years, in eras.

**Interaction:** horizontal or vertical timeline, scroll-triggered — each era's marker lights up/expands as it scrolls into view. Clicking a marker expands a short blurb (optional nice-to-have; not required to click through live).

Timeline content (era → year → one-line description + curious insight):
1. **Pre-Dawn & Rule-Based Systems** (1940s–1980s) — "If-this-then-that" logic, hand-coded by humans. No learning involved. *Curious Insight:* Alan Turing's Bombe machine breaking the Enigma code in WWII was arguably an early form of this. Later, ELIZA (1966) fooled people into thinking a rule-based script was a real psychotherapist!
2. **Machine Learning** (1990s–2000s) — Systems start learning patterns from data instead of being explicitly programmed. *Curious Insight:* In 1997, IBM's Deep Blue beat world chess champion Garry Kasparov, proving machines could out-calculate human grandmasters, though it still didn't "learn" like modern AI.
3. **Deep Learning** (2010s) — Neural networks with many layers; breakthroughs in image and speech recognition. *Curious Insight:* In 2012, an AI called AlexNet looked at millions of images and dropped the error rate in image recognition so drastically (26% to 15%) that it single-handedly sparked the modern AI boom.
4. **Generative AI** (2020s) — Models that don't just classify or predict — they create text, code, images, and more. *Curious Insight:* ChatGPT hit 100 million users in just two months—making it the fastest-growing consumer application in internet history at the time.

Closing line under the timeline: *"Each era didn't replace the last — it built on it. Today's AI still uses ideas from every stage above."*

---

### Section 2 — Key terminology, fast (≈3 min)
**Goal:** vocabulary they'll need for the rest of the course, no deep dives.

**Interaction:** a row of 5 flip-cards (click or hover to flip front→back). Front = term, back = one-line plain-English definition.

Cards:
- **Algorithm** → "A step-by-step set of rules a computer follows to solve a problem."
- **Model** → "The trained result — what you get after an algorithm has learned from data."
- **Training** → "The process of showing a model examples so it learns patterns."
- **Inference** → "Using an already-trained model to make a prediction on new data."
- **Dataset** → "The examples used to train (or test) a model."

Closing line: *"You'll hear these five words constantly for the next 6 days. That's all they mean."*

---

### Section 3 — AI vs ML vs DL vs Generative AI (≈7 min)
**Goal:** the classic nested-circle mental model, made concrete with an IT-relevant example at each layer.

**Interaction:** nested-circles (concentric) diagram — AI (outermost) → ML → DL → Generative AI (innermost). Clicking/hovering each ring highlights it and reveals a definition + one enterprise-IT example in a side panel.

Content per ring:
- **AI (Artificial Intelligence)** — "Any system that mimics intelligent behavior." *Example: a rule-based alert system that pages on-call staff.*
- **ML (Machine Learning)** — "AI that learns patterns from data rather than being explicitly programmed." *Example: predicting disk failure from historical SMART data.*
- **DL (Deep Learning)** — "ML using layered neural networks, good at complex patterns." *Example: detecting anomalies in network traffic images/graphs.*
- **Generative AI** — "Deep learning that creates new content — text, code, images." *Example: Copilot writing a shell script from a plain-English request.*

Closing line: *"Every ring is a subset of the one before it. Generative AI is a very specific, very recent slice of a much older field."*

---

### Section 4 — Narrow vs General vs Super AI (≈5 min)
**Goal:** cut through hype — clarify what exists today vs sci-fi.

**Interaction:** a horizontal slider/spectrum visual with three zones. As the instructor "drags" (or it auto-highlights on scroll) a marker across the spectrum, each zone highlights with its label and description. Place a clear "👉 we are here" marker pinned at Narrow AI.

Zones:
- **Narrow AI (ANI)** — *"We are here."* AI that does one task well: spam filters, recommendation engines, ChatGPT, image recognition. Everything in production today is this.
- **General AI (AGI)** — Hypothetical AI with human-level reasoning across any task. Does not exist yet. Actively researched, timelines are disputed.
- **Super AI (ASI)** — Hypothetical AI that surpasses human intelligence across all domains. Purely theoretical/speculative — no working example, mentioned here only to complete the picture.

Closing line: *"Everything we build this week — including the Copilot — is Narrow AI. That's not a limitation to apologize for; it's the entire industry today."*

---

### Section 5 — Current AI trends + AI in Enterprise IT (≈6 min)
**Goal:** ground it in what's happening right now, specifically in IT operations.

**Interaction:** a grid of 4–6 cards, staggered fade-in on scroll. Each card: icon/label + one-line trend + one-line "what this looks like in IT."

Cards:
- **LLMs & Copilots** — Large language models embedded directly into developer and ops tools. *In IT: code review, log summarization, ticket drafting.*
- **AI Agents** — Models that don't just answer — they take actions via tools. *In IT: an agent that reads an alert, checks a runbook, and opens a ticket itself.*
- **RAG (Retrieval-Augmented Generation)** — Models grounded in your own private documents/data, not just public training data. *In IT: an assistant that actually knows your SOPs.*
- **AI in Cybersecurity** — Pattern-based threat and anomaly detection at machine speed. *In IT: flagging unusual login patterns before a human would notice.*
- **Multi-model / provider flexibility** — Teams increasingly avoid locking into one AI vendor. *In IT: routing requests across multiple model providers for cost/reliability.*

Closing line: *"Every one of these trends — copilots, agents, RAG, multi-model routing — is something we will build, piece by piece, over the next 6 days."*

---

### Section 6 — Bridge to the course map (≈2 min)
**Goal:** close the opener, hand off cleanly to the next agenda item (Course map + Copilot intro).

- Large centered closing line: **"That's the map. Now let's start the journey."**
- Small subline: *"Next: the 6-day roadmap, and the system we'll build together — the Chilling Center Copilot."*
- End of file — no further scroll.

---

## 4. Explicit non-goals (so Antigravity doesn't over-build)

- Do NOT add a quiz/scoring mechanic here — that belongs to the retrieval-quiz format used elsewhere in the course, not this opener.
- Do NOT add sound/audio narration.
- Do NOT make it mobile-responsive — presenter/projector use only.
- Do NOT add dairy/NDDB visual branding in this specific section — keep it clean/corporate per the style guide above; dairy framing starts in the Linear Regression module later on Day 1.
- Do NOT add navigation menus, headers, or footers — it's a single uninterrupted scroll experience.

## 5. Definition of done

- Opens directly as a static HTML file in Chrome, no console errors.
- All 7 sections scroll smoothly in order, each section's content animates in once (not repeatedly re-triggering on scroll-up/down jitter).
- All interactive elements (flip cards, nested-circle hover/click, spectrum highlight) work with mouse only.
- Total content matches the "balanced" density above — headline + visual + 2–3 short bullets per topic — nothing more.
