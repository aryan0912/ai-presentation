# Lecture Plan: Day 4 — From a Working Chatbot to Something You'd Actually Ship
**For: Google Antigravity — build `ai4it-web/src/app/day4/` from this plan**
**Author's role:** Content and pedagogy authority, same standard as prior day specs. This document supersedes the Day 4 section of `AI4IT_Lecture_Plan.md`.
**Companion docs:** `contexts/day3_prompt_engineering_spec.md` (required — today opens by exporting yesterday's artifact), `contexts/og_requirements.md` (Module 4, Module 7), `contexts/AI4IT_Lecture_Plan.md`.

---

## 0. What kind of day this is

Day 3 ended with a working chatbot everyone built themselves. **Day 4's entire identity is: take that same artifact and make it robust, private, and something you could actually be responsible for.** Every beat today should reference *their own* Day 3 build, not a fresh example — this is the single strongest continuity device available today, use it constantly.

**Time is not the constraint**, same policy as every prior day.

**The two-audience framing that should run through the whole afternoon:** *"Imagine two situations — a vendor proposes building NDDB a RAG chatbot, what do you ask them? Or your own department wants one for a team of about 50 — what do you actually need to get right?"* Introduce this explicitly before Block 3 and keep returning to it.

---

## 1. Pacing table

| Block | Time | Beat | Kind |
|---|---|---|---|
| 1 | 9:30–11:15 (105 min) | Quiz + debrief (15), point it at their own documents + the messy-document problem/Docling (55), export to Antigravity + LangChain-as-code literacy (35) | ritual → hands-on → reveal |
| 2 | 11:30–1:30 (120 min) | Multi-query generation built into the architecture (60), local model switch (20), API mechanics taught in context (40) | reveal → hands-on |
| *Lunch* | 1:30–2:30 | | |
| 3 | 2:30–4:00 (90 min) | Hybrid search (25), reranking (25), RAG evaluation (30), buffer (10) | reveal → reveal → reveal |
| 4 | 4:15–5:30 (75 min) | Team-of-50 decision exercise (25), enterprise generalization (20), Weekend 2 closing synthesis (15), feedback (10), homework brief (5) | apply → peak → recap |

**Block 1 is deliberately ordered hands-on-first.** An earlier draft opened with 30 minutes of code reading at 10 AM; Docling comes first instead because it's visually satisfying (garbled text → clean Markdown) and gets hands moving early. The code is then more interesting to read, because the Docling step is already sitting in it.

**Cut policy, per block, if running long:**
| Block | First thing to cut | Never cut |
|---|---|---|
| 1 | Depth of the code walkthrough | Docling working on a real messy file |
| 2 | API caching discussion | Multi-query actually working, local model switch |
| 3 | Reranking demo (explain without building) | Hybrid search, the eval-vs-LLM-eval distinction |
| 4 | Nothing — this block is protected | All of it, especially §5.3 and §5.4 |

---

## 2. Block 1 — Their Own Documents, the Mess Inside Them, and the Code Underneath (105 min)

### 2.1 Retrieval quiz (Day 3) + Debrief (15 min)
Standard ritual.

### 2.2 Point It at Their Own Documents — and Watch It Break (55 min)
**Hands on keyboards within the first 20 minutes of the day. This is the energy beat, don't lead with code.**

- Each participant swaps yesterday's sample document for their own files (fallback set available per Day 3's homework brief for anyone without usable input)
- Clean text files work immediately — a quick early win
- **Then the failure, guess-gated before it happens:** put a genuinely messy file on screen — a scanned PDF, a two-column layout, a PDF with embedded tables — and ask: *"This is a normal document. What do you think a plain Python text extractor does with it?"* Let them guess. Then run it.
- Watch it produce garbled, interleaved, useless text — two columns read straight across, tables flattened into word soup
- **Reveal: Docling** — IBM's open-source document-conversion library. Same file, clean structured Markdown out the other side, tables intact, reading order correct
- **Explicit gap-fill connection, say this out loud:** *"This is, word for word, what the syllabus calls 'Document Management System integration — intelligent OCR, automated document categorization.' You just did enterprise DMS integration without anyone calling it that."*
- One-line aside: **unstructured.io** is the other name they'll meet doing similar work in the wild — recognized, not taught
- Swap Docling into the pipeline in place of the plain-text loader, re-run, ask a question the messy document actually answers

### 2.3 Export to Antigravity + LangChain-as-Code Literacy (35 min)
Now that there's something interesting in the pipeline, go read it.
- Export yesterday's flow (now with the Docling step) and open the generated code in Antigravity — same "describe intent, inspect, judge" framing from Day 1, applied to code they authored indirectly through a visual tool
- Walk through it, mapping each call back to a node they placed themselves:
  - Document loader → yesterday's loader node, now Docling
  - Text splitter → the chunker, with real `chunk_size` / `chunk_overlap` values instead of an abstract slider
  - The embedding call, vector store init, retriever, prompt template, LLM call
- **Land the point:** *"You didn't write this from scratch, and you're not about to become a Python developer. But you can read it now and know what every line is responsible for. That's the actual skill this course has been building since Day 1 — specify, inspect, judge — applied to code instead of a model's answer."*

---

## 3. Block 2 — Multi-Query, Going Local, and API Mechanics In Context (120 min)

### 3.1 Level 2 — Multi-Query Generation, Built Into the Same Architecture (60 min)
**Motivate with a concrete failure first:** ask the Day-3 chatbot a question phrased differently from how the source document phrases it — e.g., user asks *"why is my tanker late"* but the SOP says *"delayed dispatch procedures."* Watch retrieval miss or retrieve weakly.

**Guess-gate before revealing the fix:** *"The answer is in the document. The retriever didn't find it. Why not?"* Let the room work it out — someone will land near "the words don't match," which is exactly right and is the whole motivation for what comes next. Then: *"So if the problem is that the user's words don't match the document's words — what would you do about it?"* The instinct they produce is usually some version of "ask it differently," which is literally multi-query generation.
- **Reveal:** add an LLM node that takes the user's question and generates 2–3 reformulated versions
- Wire in parallel retrieval branches, one per reformulated query
- Add a merge/dedupe step before the final generation call
- Run the same failing question again — watch it now retrieve the right chunk
- **This is a real architectural change to yesterday's flow, built hands-on in Langflow, not just explained**

### 3.2 Switch to Local Models (20 min)
**Motivate with privacy, explicitly:** *"Tonight you're pointing this at your own personal documents. Do you want those going to a cloud API, even a good one? Or would you rather it never leaves your laptop?"*
- Swap the OpenRouter LLM node for a local model via Ollama
- Same for the embedding model if feasible
- Explicitly name self-hosted model options per the syllabus: Llama 3, Mistral, Gemma
- Run the pipeline against an actual personal document brought from home

### 3.3 API Mechanics — Taught In Context, the Gap-Fill (40 min)
**Do not lecture this separately — teach it at the exact moment they're configuring the API nodes.**
- **Authentication:** while wiring the OpenRouter API key into Langflow, discuss key management — why it's an environment variable, not hardcoded in the flow
- **Rate limiting:** *"If your OpenRouter key is shared across a 50-person team, what happens when three people hit 'send' at once? What happens when 50 people do?"* — introduce the concept concretely, not abstractly
- **Token usage tracking:** show where Langflow (or the OpenRouter dashboard) surfaces per-call token counts — this is the literal unit their eventual API bill is measured in, direct callback to Day 2's tokenization content
- **Caching:** *"If five people ask the exact same question this hour, does it need to re-embed, re-retrieve, and re-generate five times?"* — introduce caching as the obvious answer, note it's a real production optimization
- **Monitoring, named explicitly:** Langflow's own run logs are the toy version; name **Langfuse, Prometheus, Grafana** as what a real production LLM deployment would use for the same visibility, per the syllabus's Module 7 naming

---

## 4. Block 3 — Making Retrieval Good, and Knowing Whether It Is (90 min)

**Open with the two-audience framing (see §0) here, explicitly, before diving in.** This block has one coherent theme: improve retrieval, then measure it — the three sections below belong together.

### 4.1 Hybrid Search (25 min)
**Motivate with a concrete IT failure, guess-gated:** ask the pipeline to find something referencing an exact identifier — an error code, a hostname, "BMC-402" — using pure vector search. Before running it: *"This is an exact string that appears in the document. Will semantic search find it? Why or why not?"*
- Run it. Watch it underperform or miss, because an exact alphanumeric code carries almost no semantic "meaning" for an embedding to match on
- **Reveal:** combine vector similarity with keyword/BM25 search — the two failure modes cancel out (vector misses exact tokens, keyword misses paraphrases)
- Add a hybrid retriever node, re-run the failing query, watch it succeed

### 4.2 Reranking (25 min)
- **Motivate:** hybrid retrieval now returns the top 20 candidates — not all equally good, and the LLM's context window can only hold a few
- **Reveal:** a smaller, more precise cross-encoder re-scores just those 20 (cheap, because it's a small candidate set, not the whole store) and reorders them; only the top 3–5 reach the LLM
- Add a reranker node, show the reordering happen live on a real query
- If time is short, this one can be explained-with-a-demo rather than built hands-on (see cut policy in §1)

### 4.3 RAG Evaluation vs. LLM Evaluation (30 min)
**Moved here from Block 4 deliberately — this is a retrieval-quality topic, it belongs beside hybrid search and reranking, not tacked onto the closing block.**

**Draw the distinction explicitly, this is the point of the section:**
- **LLM evaluation** asks: is the underlying model any good — independent of your documents, your retrieval, your pipeline
- **RAG evaluation** asks: did we retrieve the *right* chunks, and did the answer actually stay grounded in them, or did it wander off and invent something

Name **RAGAS**-style metrics concretely:
- **Faithfulness** — did the answer stick to what the retrieved context actually said
- **Context precision / recall** — were the retrieved chunks actually relevant, and did we get all the relevant ones

**Introduce "LLM-as-judge":** an LLM call that scores another LLM's answer against a rubric.
> **Explicit callback, land this clearly:** *"The prompting skills from yesterday — role, instruction, structured output — are exactly what you use to build the judge that checks this system's own answers. Yesterday's skill is today's quality gate."*

**The vendor-facing version of this, state it plainly:** *"When someone proposes building you a RAG system, 'how did you measure retrieval quality and groundedness, and what were the numbers' is the single highest-value question you can ask. If the answer is vibes, you've learned something important."*

---

## 5. Block 4 — Judgment, the Big Picture, and the Close (75 min)

**This entire block is protected — nothing in it gets cut for time.** It contains the week's emotional peak and the feedback collection, and its structure is deliberately engineered around the peak-end rule, exactly as Weekend 1's close was.

### 5.1 Team-of-50 Decision Exercise — Participatory, Not a Lecture (25 min)
**This must not be delivered as a checklist read aloud.** The course's entire thesis since Day 1 has been *"specify and judge is the actual job"* — this is the last substantive content of the week and it should be the moment they visibly **do** judgment work, not watch someone else do it.

**Format:** hand out a scenario card, put participants in pairs or small groups, give them ~12 minutes to make actual decisions, then ~13 minutes comparing answers across the room — arguing about the disagreements is the valuable part.

**The scenario card (build this as a printable/on-screen artifact):**
> *Your department wants a RAG assistant over roughly 2,000 internal documents — SOPs, manuals, and past incident reports. About 50 people will use it, mostly during working hours. Some documents are restricted to certain roles. Budget exists but is not unlimited. Make the calls:*
> 1. *Hosted API or self-hosted local model? Justify it.*
> 2. *Which vector store? Why not one of the others?*
> 3. *How do you stop a restricted document from reaching someone who shouldn't see it?*
> 4. *Roughly what does this cost per month? Show your reasoning.*
> 5. *What do you check before letting 50 colleagues touch it?*

**Instructor's reference answers, for the comparison round — hold these back until groups have committed:**
- **Concurrency/hosting:** one local model handles one user comfortably; 50 people with overlapping queries needs a request queue, a real GPU server, or hosted inference. Do the napkin math live rather than asserting it.
- **Vector store:** **pgvector is very likely enough at this scale if NDDB already runs Postgres** — explicit callback to Day 2's vector-DB discussion, and a genuine *"don't let a vendor over-engineer this"* moment. Milvus/Qdrant/Pinecone are real tools solving real problems that 50 users do not have.
- **Access control:** metadata tags on chunks, filtered at retrieval time — the same metadata that powers citations. There's no clean answer here and that's fine; the point is they now know the question exists.
- **Cost:** API token cost × expected query volume vs. GPU/server amortization. Either answer is defensible; an *unjustified* answer is not.
- **Pre-rollout check:** a small fixed set of known Q&A pairs, run and eyeballed — not a full eval harness, but not nothing either.

**Close the exercise by naming what they just did:** *"That conversation you just had — that's the job. Not building it. Deciding whether it should be built that way."*

### 5.2 Enterprise Generalization — The High-Note Beat (20 min)
**This is the deliberate emotional peak of the week, positioned right before the closing synthesis. It is the ambition-expanding moment: small personal win → big institutional possibility.**
- *"You built this for yourself, on your own documents. The identical pattern — chunk, embed, retrieve, augment, generate — is what scales to your organization's ERP, CRM, email, and helpdesk."*
- Walk through, briefly, one sentence each: ERP (data extraction, ledger anomaly auditing), CRM (sentiment, routing), Email (classification, phishing filtering), Helpdesk (virtual agents, auto-updating knowledge bases)
- **Explicit callback to Block 1:** *"You already did the DMS piece this morning with Docling, without the label. This is the rest of the list."*

### 5.3 Weekend 2 Closing Synthesis (15 min)
**Mirrors Weekend 1's closing synthesis exactly — same peak-end device, don't skip or compress this.**
> *"Yesterday morning you hit a wall — a raw LLM that didn't know your documents. By end of yesterday you'd built a chatbot yourself, piece by piece, that solved it. Today you made it read messy real documents, made it smarter about ambiguous questions, made it private, made its retrieval accurate, and learned how to check whether it's telling the truth. And you just saw that everything you built today scales to your entire organization, not just your own files."*

**Sequencing, critical:** collect feedback **immediately** after this synthesis (10 min), before the homework brief — same peak-end reasoning as Weekend 1. Administrative content between the emotional peak and the feedback form measurably drags scores down.

### 5.4 Homework Brief (5 min, last)
Standard Gap Week 2 framing per `AI4IT_Lecture_Plan.md` — after feedback is collected, never before.

---

## 6. Non-goals

- Do NOT build a full production deployment (containers, orchestration, load testing) today — that's a glimpse reserved for Day 6's consolidated infrastructure pass, not a Day 4 build
- Do NOT build a real evaluation harness — §5.1 is conceptual plus naming real tools/metrics, not a coding exercise
- Do NOT let the enterprise generalization beat (§5.2) turn into a second full teaching pass on Module 4's integration items — one sentence each, it's a capstone gesture, not new content
- Do NOT skip or compress the Weekend 2 closing synthesis (§5.3) for time — it is, along with the enterprise-generalization beat immediately before it, the highest-leverage moment of the entire week for feedback quality
- Do NOT deliver §5.1 as an instructor-read checklist. If groups don't get time to commit to their own answers before hearing the reference ones, the exercise has failed and become a lecture
- Do NOT open Block 1 with code reading. Hands on keyboards within 20 minutes — see §1's note on ordering

---

## 7. Traceability to `og_requirements.md`

| Syllabus item | Where covered |
|---|---|
| Module 4: AI Model Selection & API Consumption (proprietary vs. self-hosted, named models) | §3.2, §3.3 |
| Module 4: REST API integration, auth, rate limiting, token tracking, caching | §3.3 |
| Module 4: RAG hands-on exercise | Carries through from Day 3, extended all of Day 4 |
| Module 4: DMS Integration (intelligent OCR, document categorization) | §2.2 |
| Module 4: ERP/CRM/Email/Helpdesk Integration | §5.2 |
| Module 7: LLM observability (Langfuse, Prometheus, Grafana) | §3.3 |
| Module 7: Vector databases (dedicated vs. pgvector) | §5.2 |

---

## 8. Definition of done

- [ ] Block 1 puts hands on keyboards within the first 20 minutes — their own documents first, code reading second, never the reverse
- [ ] The messy-document failure is guess-gated before it's demonstrated, not just shown
- [ ] The Docling section explicitly names the DMS/"intelligent OCR" connection out loud
- [ ] Multi-query generation is built as a real architectural change inside Langflow, guess-gated with a concrete before/after failure case, not just explained
- [ ] The local-model switch is explicitly motivated by privacy, at the point personal documents are introduced
- [ ] API mechanics (auth, rate limiting, token tracking, caching, monitoring tools) are taught at the moment of configuring the API nodes, not as a separate lecture block
- [ ] Hybrid search is guess-gated ("will semantic search find an exact error code?") before the demo
- [ ] RAG evaluation sits in Block 3 beside hybrid search and reranking, not appended to the closing block
- [ ] The RAG-vs-LLM-evaluation distinction is stated explicitly, with RAGAS metrics and LLM-as-judge named, plus the vendor-facing question
- [ ] **§5.1 is run as a real group decision exercise** — scenario card distributed, groups commit to answers *before* hearing the reference answers
- [ ] The enterprise-generalization beat (§5.2) and closing synthesis (§5.3) both survive intact regardless of time pressure — Block 4 is protected in full
- [ ] Feedback collection is sequenced immediately after the closing synthesis, before the homework brief
