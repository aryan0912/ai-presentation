# Lecture Plan: Day 3 — Talking to the Machine: Industry Standards & The Art of Prompting
**For: Google Antigravity — build `ai4it-web/src/app/day3/` from this plan**
**Author's role:** Content and pedagogy authority, same standard as `day1_linear_regression_spec.md`, `day1_neural_network_spec.md`, `day2_nlp_transformers_spec.md`. This document supersedes the Day 3 section of `AI4IT_Lecture_Plan.md`.
**Companion docs:** `contexts/og_requirements.md` (Modules 2, 3), `contexts/AI4IT_Lecture_Plan.md`, `delivery/day1/*`, `delivery/day2/*` (vocabulary and callback lines this day reuses).

---

## 0. What kind of day this is

Days 1–2 were mostly *this webpage teaches the concept*. Day 3 flips that: most of the actual learning happens in real external tools — ChatGPT, Claude, Gemini, whatever the participant already has access to. **The `ai4it-web` pages for Day 3 are lesson companions, not interactive demos** — they hold the comparison tables, the exact prompts to try, the frameworks, and the exercise prompts, while the actual "doing" happens in the participant's own browser tab with their chosen tool. Build accordingly: less canvas/SVG interactivity, more "here's exactly what to type, here's what to notice."

**Time is not the constraint, same policy as every prior day.** The four-block schedule below (9:30–11:15, 11:30–1:30, 2:30–4:00, 4:15–5:30) is a planning aid, not a hard ceiling.

**The narrative arc for the whole day:** *raw LLM chat feels powerful → but it hits a wall (doesn't know your documents, can't cite, frozen in time) → that wall is this afternoon's RAG problem.* The morning names the wall; the afternoon builds the fix.

---

## 0.1 Pre-session requirements — the single biggest practical risk of the weekend

**Block 4 is a ~50-person parallel hands-on build in a tool nobody has used before. That is exactly where live workshops fall apart.** Install failures, Python version conflicts, port collisions, API-key fumbles, and embedding-model download waits will de-sync the room within ten minutes if this isn't handled in advance. Non-negotiables:

- **Langflow must be installed before the weekend, not live in the room.** Send setup instructions with the Gap Week 1 homework, including a verification step ("run it, confirm the canvas loads, screenshot it").
- **An OpenRouter API key must be provisioned in advance** — either one key per participant, or a shared session key with a documented rate limit (see Day 4 §3.3, where rate limiting becomes a teaching moment rather than an outage).
- **A fallback path for failed installs:** pair participants up (one working laptop between two people is fine), and have a hosted Langflow instance reachable as a last resort.
- **The instructor's completed flow must be exportable and importable as a rescue artifact.** Anyone who falls irrecoverably behind imports it and continues from there rather than dropping out of the exercise entirely.
- **Checkpoint gates every 2–3 nodes** during the build — "everyone's retriever connected? hands up" — so drift is caught early instead of discovered at the end.

**Cut policy, per block, if running long:**
| Block | First thing to cut | Never cut |
|---|---|---|
| 1 | Module 3 discipline examples (drop from 7 to 4) | Tool comparison |
| 2 | The five named patterns (demo 3, list the other 2) | Structured output (§3.4), limitation reveal (§3.6) |
| 3 | Langflow interface tour depth | The six-component walkthrough (§4.1) |
| 4 | The closing "ask it something" round | The build itself — this is the day's payoff |

---

## 1. Pacing table

| Block | Time | Beat | Kind |
|---|---|---|---|
| 1 | 9:30–11:15 (105 min) | Quiz + checkpoint (20), Module 3 compressed (30), tool comparison (15), prompting hands-on begins (40) | ritual → context → reveal → hands-on |
| 2 | 11:30–1:30 (120 min) | Prompt structure, named patterns, zero/few-shot/CoT/ReAct, structured output centerpiece, varied exercises, limitation reveal | hands-on → break |
| *Lunch* | 1:30–2:30 | | |
| 3 | 2:30–4:00 (90 min) | RAG components taught step by step, Langflow basics | reveal → orientation |
| 4 | 4:15–5:30 (75 min) | Assemble the pipeline in Langflow, working chatbot, homework brief | hands-on → close |

---

## 2. Block 1 — Grounding, Comparison, First Prompts (105 min)

### 2.1 Retrieval quiz (Weekend 1) + Checkpoint (20 min)
- Standard ritual, same format as prior days. Checkpoint: 2–3 participants briefly show their gap-week Antigravity build (working or not — the hallucination/failure stories are as valuable as the successes).

### 2.2 Module 3, Compressed: "Where AI Already Lives in IT" (30 min)
**Framing, say explicitly:** *"This isn't a demo reel. Everything here is also the raw material for the AI-use policy your own department will eventually need — hold onto that."*

One IT-relatable hook per discipline, **kept to 3 minutes each, hard**, no hands-on here — this is context, not practice. If time is tight, cut to the four most relevant to the room rather than rushing all seven:
| Discipline | The Hook |
|---|---|
| Software Dev & Code Review | AI catching a null-pointer bug in review before it ships — not writing the feature, catching the mistake |
| IT Ops / AIOps | Anomaly detection flagging a metric drift before the pager goes off |
| Cloud Administration | Generating a Terraform snippet from a plain-English infra request, then the human reviews it |
| Cybersecurity | Triaging a pile of SIEM alerts down to the 3 that actually matter |
| ITSM / Helpdesk | Auto-classifying a ticket's category and urgency before a human ever reads it |
| Database Administration | Drafting a candidate index or query rewrite for a slow query, human verifies before running |
| Disaster Management | Drafting a first-pass RCA timeline from scattered incident logs |

**Explicit forward-pointer, land this clearly:** *"On Day 6 we come back to this exact list when we talk about writing AI policy for NDDB and its subsidiaries. Nothing here is decorative."*

### 2.3 Tool Comparison — The Gap-Fill (15 min)
**Do this before anyone opens a tool.** Table on screen, walk through it:

| Tool | Strength | Licensing / Compliance Note |
|---|---|---|
| ChatGPT (OpenAI) | Broadest general capability, plugin/tool ecosystem | Enterprise tier needed for data-retention guarantees |
| Microsoft Copilot (M365 & GitHub) | Deepest integration if NDDB already runs M365/GitHub | Inherits org's existing M365 compliance boundary |
| Google Gemini Enterprise | Strong if already on Google Workspace | Similar org-boundary inheritance via Workspace |
| Open-source / self-hosted (Llama 3, Mistral, Gemma) | Full data control, zero vendor lock-in | You own the compliance burden entirely — no vendor SLA to point to |

**Land the punchline:** *"There's no universally 'best' tool here — there's a best tool for your constraint. If data can't leave the building, that eliminates three of these four rows immediately, regardless of capability."*

### 2.4 Prompting Hands-On Begins (40 min)
- Each participant opens their own chosen tool (ChatGPT/Claude/Gemini/Copilot — whatever they have access to)
- First live exercise, guess-gated: *"Ask it the same question two different ways. Predict: will the answers differ a little, a lot, or not at all?"* — most guess "a little," the actual divergence usually surprises them
- Second guess-gate, before revealing any framework: *"What do you think actually makes one of those two prompts better than the other? Write down your theory."* Collect two or three answers aloud. Block 2 then reveals the framework that formalizes whatever they just intuited — same "you already knew this, now let's make it exact" device used for Linear Regression's eyeball-the-trend moment on Day 1.
- This block ends mid-exercise — continues directly into Block 2, no reset

---

## 3. Block 2 — The Structure of a Good Prompt (120 min)

### 3.1 Prompt Structure: R-C-I-I-O-C (20 min)
Build one prompt live, piece by piece, narrating each addition:
```
Role:        "You are a senior DBA reviewing a slow query."
Context:     "This query runs every 5 minutes on a table with 40M rows."
Instruction: "Suggest an index that would speed this up."
Input Data:  [paste the actual query]
Output:      "Respond with just the CREATE INDEX statement, one line."
Constraints: "Do not suggest rewriting the query itself."
```
Show the SAME instruction with pieces stripped out one at a time — output quality visibly degrades each time a piece is removed. That's the proof, not an assertion.

### 3.2 Five Named Patterns (20 min)
One IT example each, kept tight:
- **Persona** — "You are a senior SOC analyst..." (frames tone and depth of expertise)
- **Template** — "Fill this exact structure: Symptom / Cause / Fix / Prevention"
- **Recipe** — "Step 1: read the log. Step 2: identify the error class. Step 3: ..."
- **Error-explainer** — "Explain this stack trace to a junior engineer in plain English"
- **Auditor** — "Review this Ansible playbook and flag anything that looks insecure"

### 3.3 Zero-Shot / Few-Shot / Chain-of-Thought / ReAct (20 min)
- **Zero-shot:** just ask directly — baseline
- **Few-shot:** give 2–3 example input→output pairs before the real question — show the output snapping to the demonstrated format
- **Chain-of-thought:** "think step by step before answering" — show it catching an arithmetic/logic error a direct answer missed
- **ReAct** (brief, conceptual only — full ReAct agents are Day 5's job): reasoning interleaved with tool calls — *"you'll build this for real in two weekends, today just recognize the name"*

### 3.4 Centerpiece: Structured Output (30 min)
**This is the most important 30 minutes of the day.** Land it explicitly: *"A script can't parse 'well, it depends on a few factors.' It can parse `{"root_cause": "disk_full", "confidence": 0.8}`. This is the actual skill that turns an LLM from a chat toy into IT infrastructure."*
- Ask for unstructured prose first, watch it ramble
- Same request, now with an explicit JSON schema in the prompt — output snaps into shape
- Show a brittleness failure: a slightly ambiguous schema produces malformed JSON — the fix is being more explicit, not giving up on structure
- Mention (don't deep-dive) that production systems use schema validation (e.g., Pydantic) to catch and retry malformed output automatically — this is a Day 4/5-adjacent forward-pointer, not today's build

### 3.5 Exercises — Deliberately Varied (20 min)
Three distinct exercise types, not one repeated three times:
1. **Draft an SOP** — "Turn this rough bullet list into a formal SOP paragraph for chilling-center compressor maintenance"
2. **Parse a raw log** — paste a genuinely messy log excerpt, extract structured fields (timestamp, error code, severity) as JSON
3. **Extract structured ticket fields** — paste a rambling helpdesk ticket, extract category/urgency/summary as JSON

### 3.6 Close of First Half — Name the Limitation (10 min)
**This is the bridge into RAG — earned, not asserted.** Ask the room: *"Ask your tool something about an internal NDDB SOP, or something that happened this week. What happens?"*
- It either hallucinates confidently, or honestly says it doesn't know
- **Land the line:** *"It doesn't know your SOPs, it can't tell you where an answer came from, and its knowledge stops at some training cutoff date. That's not a bug you can prompt your way out of — the fix is architectural. That's this afternoon."*

---

## 4. Block 3 — RAG, Component by Component (90 min)

**Reveal, not lecture. Each component gets: what problem it solves, then how it works, before moving to the next.** No hands-on yet — orientation before assembly.

**Open with a guess-gate, before showing the table below:** *"You've just established that the model doesn't know your documents. So — how would you fix that? You have the whole architecture available to you: what would you actually do?"* The room almost always lands near *"just show it the document"* — which is correct, and is exactly the setup for why chunking exists: *"Right instinct. Now — what if the document is 400 pages and the model can only hold 8,000 tokens?"*

| Component | What Problem It Solves | How |
|---|---|---|
| **Chunking** | A whole document is too big to hand an LLM at once, and mixes many topics | Split into overlapping passages, small enough to be specific, large enough to keep context |
| **Embedding** | Need to find *relevant* chunks, not just keyword matches | Turn each chunk into a vector — meaning as geometry, direct callback to Day 2's `EmbeddingSpace2DViz` |
| **Vector store** | Need to search thousands of chunks fast | A database indexed for "find nearest vectors," not exact match |
| **Retrieval** | Given a question, which chunks are actually relevant | Embed the question too, find its nearest chunk-neighbors |
| **Augmentation** | The LLM still doesn't know the answer, just has candidate passages | Stuff the retrieved chunks into the prompt as context, before the question |
| **Generation** | Turn grounded context + question into a final answer | The exact same next-token-prediction from Day 2, just with better-informed input |

**Explicit callback:** *"Every one of these six words traces back to something you already learned. Embedding — Day 2. Prompt augmentation — literally the R-C-I-I-O-C structure from this morning, with retrieved chunks slotted into Context. Nothing here is new math. It's new plumbing."*

### 4.2 Langflow Basics (remaining time in block)
- What it is: a visual canvas where each RAG component above is a draggable node
- Tour the interface: input node, chunker node, embedder node, vector store node, retriever node, prompt node, LLM node, output node
- **Do not build anything yet** — this block ends with orientation; Block 4 is the build

---

## 5. Block 4 — Build It, End of Day (75 min)

### 5.1 Assemble the Pipeline (55 min)
Live, guided, piece by piece — each node gets wired in as its underlying concept from Block 3 is recalled. **Checkpoint gate after nodes 2, 4, and 6** — "hands up when yours is connected" — so nobody silently falls behind (see §0.1).

1. Document loader node (a sample document or their own, if ready)
2. Chunker node — set chunk size, discuss the tradeoff (too small loses context, too large dilutes relevance) — **checkpoint gate**
3. Embedder node — connect to an OpenRouter-hosted embedding model
4. Vector store node — **checkpoint gate**
5. Retriever node
6. **Prompt template node — this is the moment the whole day ties together, do not treat it as just another node.** Stop the room here and say it explicitly:
   > *"Look at what this node wants from you. A role. Context. An instruction. The input data. An output format. Constraints. That is exactly the framework you spent this morning learning — and the only thing that's new is that the Context field is now filled automatically by the retriever instead of by you pasting it. You already know how to write this node. You learned it before lunch."*
   
   This is the single strongest connection available between the day's two halves — without it, the morning and afternoon risk feeling like two unrelated courses. **Checkpoint gate.**
7. LLM node — connect to an OpenRouter chat model
8. Run it via Langflow's chat interface, ask it something the source document actually answers

### 5.2 End of Day (20 min)
- Each participant has a working chatbot they assembled themselves
- **This is the sense-of-achievement close — do not rush it.** A brief round of "ask it something and see what happens" across the room
- **Homework brief — bring their own documents tomorrow, with guardrails that must be stated explicitly, not left implied:**
  - *"Bring documents you'd be comfortable having on screen in this room."* Say it plainly — tomorrow's exercise is personal-document RAG, and someone will otherwise bring genuinely confidential material into a shared workshop
  - Size guideline: a handful of documents, not an archive — a 400-page PDF will take long enough to embed that they'll sit watching a progress bar instead of learning
  - **A fallback document set must be provided** (sample SOPs, manuals, technical docs) for anyone who brings nothing, brings something unsuitable, or has an extraction failure — nobody sits out tomorrow's main exercise for lack of input files
  - Mention that tomorrow starts by pointing this same pipeline at *their* files — the homework has an immediate, visible payoff, which is what makes people actually do it

---

## 6. Non-goals

- Do NOT resolve the "doesn't know my documents" limitation from §3.6 today — that's the whole point of Day 4, don't preempt it
- Do NOT build multi-query generation, hybrid search, or reranking today — Day 4's job, keep today's pipeline deliberately simple
- Do NOT deep-dive ReAct agents — name it, recognize it, move on; Day 5 builds it for real
- Do NOT let Module 3 (§2.2) run past 40 minutes — it's context-setting, not the day's substance
- Do NOT introduce local models today — OpenRouter only, for fast, frictionless assembly; the local-model switch is Day 4's privacy-motivated move

---

## 7. Traceability to `og_requirements.md`

| Syllabus item | Where covered |
|---|---|
| Module 2: Enterprise Tool Comparison | §2.3 |
| Module 2: Prompt Structure & Design Principles | §3.1 |
| Module 2: Prompt Patterns (persona/template/recipe/error-explainer/auditor) | §3.2 |
| Module 2: Zero-shot/Few-shot/CoT/ReAct | §3.3 |
| Module 2: Refining/iterating, deterministic output formatting | §3.4 |
| Module 2 Hands-on: draft SOPs, automate scripts, parse log formats | §3.5 |
| Module 3: all seven IT disciplines | §2.2 |
| Module 4: RAG concepts (chunking, embedding, vector storage, retrieval, augmentation) | §4.1 |

---

## 8. Definition of done

- [ ] Tool comparison (§2.3) happens before any hands-on prompting, not after
- [ ] Structured-output section (§3.4) shows a real before/after (unstructured prose vs. schema-constrained JSON), not just an assertion
- [ ] All three exercise types in §3.5 are present — SOP drafting, log parsing, ticket extraction — not one repeated
- [ ] The limitation reveal (§3.6) is stated explicitly and NOT resolved same-day
- [ ] Each RAG component in §4.1 is explicitly connected back to something already taught (embeddings→Day 2, prompt structure→this morning)
- [ ] Guess-gates are present before the framework reveal (§2.4) and before the RAG component walkthrough (§4.1) — the course's stated method, not optional decoration
- [ ] The prompt-template node moment (§5.1 step 6) is delivered as a deliberate stop-the-room callback, not passed over as one node among eight
- [ ] Checkpoint gates are run after nodes 2, 4, and 6 during the build
- [ ] Pre-session Langflow install, API keys, fallback pairing, and the importable rescue flow (§0.1) are all arranged **before** the weekend — not discovered live
- [ ] The homework brief states the confidentiality guardrail and size guideline out loud, and a fallback document set exists
- [ ] Every participant leaves Block 4 with a working, self-assembled Langflow chatbot
