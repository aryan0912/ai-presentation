# AI for ICT Team (NDDB) — Lecture Plan
**6 days | 3 weekends (Sat–Sun), 1-week gap between each | 6 hrs/day**
**Audience:** Sysadmins/Infra/Ops, zero assumed AI background
**Method:** relatable problem → let them guess → reveal + visualize → break it → apply to their world. Every day opens with a retrieval quiz on the last session.
**Running thread — "The Chilling Center Copilot":** one system, extended all course. Days 1–2 it *predicts*, Days 3–4 it *talks*, Days 5–6 it *acts*. Day 6 ends with it doing all three, plus a written rollout plan.
**Antigravity note:** oriented on Day 1, used as the homework tool throughout. Framed as *describe intent → inspect what the agent built → judge if it's right* — never a coding lesson.

---

## WEEKEND 1 — How Machines Learn Patterns

### Day 1 — From a Trendline to a Neural Network
1. **Opener: What is AI, really?** (30 min)
 - Evolution of AI, key terminology, types of AI
 - AI vs ML vs DL vs Generative AI
 - Narrow vs General vs Super AI
 - Current AI trends, AI in Enterprise IT
 - Frame as "the map before the journey" — brisk, not deep
2. **Course map + introduce the Copilot project** (10 min) — this is what we build, piece by piece, over 6 days
3. **Antigravity orientation** (30 min)
 - Install/setup
 - Live demo: describe something small, watch the agent build it
 - Frame explicitly: not a coding lesson — describe intent, inspect the result, judge if it's right
 - This becomes their homework tool from tonight onward
4. **Linear Regression** (65 min)
 - Problem: predict tomorrow's milk collection from the last 7 days
 - Let them guess how they'd do it with what they know first
 - Reveal via draggable-line demo — line adjusts to minimize error
 - Break it: show a curved pattern where a straight line fails
 - 🥛 Dairy angle: this is the simplest real forecasting a chilling center could use today
5. *Break*
6. **Neural Networks** (75 min)
 - Reveal as the fix: stack several bent trendlines together
 - Decision-boundary playground demo — boundary bends as layers/neurons added
 - Apply: predicting with multiple factors at once (temp + day + festival)
 - 🥛 Dairy angle: multi-factor demand forecasting already used in supply chain planning
7. *Lunch*
8. **Case study: "Where is this already used in IT?"** (45 min) — anomaly detection in server metrics, capacity forecasting
9. **Setting up the sequence problem** (20 min) — break: NN fails when order matters — sets up Day 2
10. **You try it** (15 min) — fit a regression line on a new dataset yourself
11. **POC vs. production, note #1** (10 min) — today's demo has no validation, retraining, or monitoring; a real deployment needs all three (quick flag, not a deep dive)

### Day 2 — Memory, Attention, and First Contact with LLMs
1. Retrieval quiz (Day 1) — 5 min
2. **RNN** (55 min)
 - Reveal: read one item at a time, carry a memory forward
 - Hidden-state memory-decay demo
 - Break it: forgets a festival effect from 3 weeks back
 - 🥛 Dairy angle: seasonal/festival demand is exactly this long-range problem
3. **LSTM** (45 min)
 - Reveal: gates deciding what to keep/forget
 - Gate visualization demo
 - Relate to alert-suppression rules they already use
4. *Break*
5. **Transformer** (75 min)
 - Reveal: look at everything at once, weigh relevance ("attention")
 - Attention heatmap demo
 - Flag explicitly: this is what powers ChatGPT/Copilot — the pivot point of the course
6. **You try it** (15 min) — type your own sentence into the attention demo, tweak the NN playground
7. **Quick infra aside** (10 min) — 🧱 what actually runs these models: languages, frameworks, dev environment
8. *Lunch*
9. **Tokenization, Context Window, Embeddings** (30 min) — 2D embedding-space cluster map demo
10. **AI Model Lifecycle, Inference Process, Key Terminology & Scenario Mapping** (20 min) — concise consolidation
11. **Case study: "How is ChatGPT actually built from what you just learned?"** (30 min) — transformer + massive text + next-word prediction = LLM
12. Homework brief (10 min)

**Gap Week 1 homework:** retrieval quiz mid-week + creative build — pick one small daily annoyance, describe it to Antigravity, let it build something (doesn't need to work or be useful). Bring it/a screenshot to Day 3.

---

## WEEKEND 2 — Making the Copilot Talk

### Day 3 — Prompt Engineering & AI Across IT
1. Retrieval quiz (Weekend 1) — 10 min
2. **Checkpoint: show what you built** (10 min) — quick, celebratory round of gap-week Antigravity builds
3. **Module 2: Prompt Engineering** (80 min)
 - Let them feel it first: same question, different phrasing, different answers
 - ChatGPT/Copilot/Gemini compared
 - Prompt structure & design principles, patterns for IT tasks
 - Zero-shot / few-shot / chain-of-thought
 - Refining and iterating prompts
 - **Exercise: Prompt Engineering for IT Tasks**
4. *Break*
5. **Module 3, part 1** (90 min) — AI in Software Dev & Code Review, IT Ops & Incident Response, Cloud Administration
 - Live demo: AI triaging a log file
 - 🥛 Dairy angle: chilling-center sensor logs as the working example
6. *Lunch*
7. **Module 3, part 2** (90 min) — Cybersecurity & Threat Detection, ITSM, Automation & Infra Mgmt, DB Administration, Disaster Management
 - **Exercise: Automate an IT Task Using AI**
8. **Case study: "How does Copilot know your codebase?"** (30 min) — sets up embeddings → RAG for Day 4
 - *(Day runs ~10 min long — expected, from the checkpoint addition)*

### Day 4 — Grounding the Copilot in Real Data (RAG)
*Like Days 1–2, Day 4 is no longer capped to a 6-hour day by design — depth over schedule. Full-course reconciliation stays a deliberately separate, later decision.*

1. Retrieval quiz (Day 3) — 10 min
2. **Debrief: "Automate an IT Task" exercise** (15 min)
3. **RAG concepts** (80 min)
 - Problem: the Copilot doesn't know NDDB's chilling-center SOPs
 - Let them guess how they'd solve it (usually lands near "just show it the document")
 - Reveal: embed → retrieve → augment → generate — RAG pipeline animation demo
 - 🧱 Databases for AI: **Chroma** specifically, introduced in context as the vector DB the hands-on pipeline actually uses — not left generic
4. *Break*
5. **Module 4: AI Integration & Architecture** (45 min) — model selection/API consumption, integrating into ERP/CRM/DMS/Email/Helpdesk. The Copilot officially becomes a helpdesk-grounded assistant.
6. **Industry practice: hosted vs. local, and the provider landscape** (30 min)
 - Problem: what if your model provider goes down, or a better one ships next month — or your data can't leave the building at all?
 - Reveal: three real paths, not one — self-host (Ollama, already hands-on from Day 2), aggregate across providers (OpenRouter), or go direct to one cloud vendor's managed platform (**AWS Bedrock, Azure AI Foundry, GCP Vertex**, named specifically)
 - Hands-on: call 2–3 models on the same prompt via OpenRouter, compare cost/latency/quality
 - From here on, OpenRouter is the Copilot's actual LLM backend
7. *Lunch*
8. **Hands-on: build the RAG pipeline, code then no-code** (90 min)
 - Build it once in **LangChain** (code) — chunking, embedding, Chroma storage, retrieval, prompt augmentation, generation
 - Rebuild the identical pipeline in **Langflow** (no-code, visual) — **each participant installs Langflow locally**, from its open-source repo, same "make it personal" pattern as Day 2's Ollama install — not a projector-only demo
 - Every generated answer ships with a **citation back to the exact source SOP chunk** — the concrete, checkable proof grounding actually worked, not just a claim
9. **Re-indexing: the simple version, tied to what they just built** (20 min) — extends POC-vs-production note #2 from a bare flag into real, simple content, not a new standalone topic
 - Change a source SOP, re-run ingestion, watch the chunk/embedding update in Chroma
 - Immediately contrast with what industry-grade re-indexing actually requires — incremental updates instead of full re-embeds, versioning, avoiding staleness/downtime — **name the gap explicitly, don't let the simple version quietly pass as production-ready**
 - Same chunk-level metadata that powers citations is also what a production system would use for **document-level access control** (who's allowed to retrieve which chunk) — one line here, ties back to Module 5's RBAC content on Day 6
 - POC vs. production, note #2, now with real substance: no enforced access control, simplified re-indexing, no retrieval-quality evaluation
10. **Exercise: Generate Scripts & Documentation with AI** (20 min)
11. **Foreshadow + homework brief** (15 min) — "Right now the Copilot can answer — next weekend we teach it to act."

**Gap Week 2 homework:** retrieval quiz + creative build — take the automation idea you're most excited about, attempt a rough first version in Antigravity (broken/incomplete is fine). Bring it to Day 5.

---

## WEEKEND 3 — Making the Copilot Act

### Day 5 — Tool Calling & Agents (Code, Langflow, then n8n)
1. Retrieval quiz (Weekend 2) — 10 min
2. **Checkpoint: show what you built** (10 min) — everyone's rough automation attempt; this becomes today's raw material
3. **Debrief: "Generate Scripts & Docs" exercise** (15 min)
4. **Tool calling — the core idea** (65 min)
 - Problem: their own homework builds can usually answer but not act
 - Reveal: give the LLM a menu of tools/functions it can call
 - Tool-calling decision-flow demo
5. **LangGraph — show the code** (60 min) — walk a small agent through step by step, plain language, no assumption they'll code it themselves; this is what's actually running underneath the visual tools they're about to touch
6. *Break*
7. **Langflow — build the same agent, hands-on** (60 min) — the room already has Langflow installed and familiar from Day 4's RAG lab; now use it to build an agent, mapping each node back to the LangGraph code just shown
8. **n8n — what it offers beyond Langflow, briefly** (25 min) — a comparative aside, not a full parallel rebuild: n8n's real differentiator is its enormous library of pre-built connectors to real enterprise systems (Slack, email, ticketing, ERP/CRM) versus Langflow's narrower, more LLM-native integration surface — ties directly back to Module 3/4's ERP/CRM/ITSM integration content
9. *Lunch*
10. **Guided hands-on: extend the Copilot in n8n** (40 min) — continues the RAG-grounded Copilot from Day 4, now able to raise a ticket/alert. **Deliberately n8n here, not Langflow** — this is exactly the real-system-integration task n8n's connector library is built for, giving it a genuine, non-redundant role rather than feeling vestigial next to Langflow. 🧱 Containerization/orchestration and model deployment mentioned in context.
11. **Antigravity, continued** (40 min) — scaffold/extend a bigger Copilot piece (e.g. a status dashboard), or finish this morning's homework build
12. **POC vs. production, note #3** (10 min) — today's output is a working demo, not hardened — no auth, no error handling, no load testing
 - *(Day runs long — expected, same "depth over schedule" policy as Day 4)*

### Day 6 — Governance, the Real Infra, and Capstone
1. Retrieval quiz (Day 5) — 10 min
2. **Module 5: Responsible AI & Governance** (50 min)
 - Hallucinations, bias, output validation — explicit callback to every model built this course, including Day 1's regression/NN
 - Security & privacy considerations
 - AI governance frameworks for enterprise
 - **Exercise: Spot and Correct AI Output Errors**
3. **Module 6: Enterprise AI Implementation** (45 min)
 - Readiness assessment & adoption roadmap
 - Selecting and piloting AI tools in IT teams
 - Measuring value and managing risk
 - **Exercise: Troubleshoot and Analyse Logs with AI**
 - Sets up the Roadmap half of the capstone
4. *Break*
5. **Module 7, consolidated** (50 min) — 🧱 Compute/Hardware/Storage/Networking for AI, Cloud AI Platforms (AWS + agnostic/OSS), Open Source AI Platforms, AI Security, Monitoring, Performance Optimization, Disaster Recovery, Existing Application Upgradation
 - Framed as "what it would take to run everything you built this weekend, for real, at NDDB scale" — crisp, since most pieces were already introduced in context
6. **POC vs. production, consolidated wrap-up** (10 min) — pulls notes #1–3 into one clear before/after; sets up the Roadmap exercise directly
7. *Lunch*
8. **Case study: "How is agentic AI changing IT/agri-tech operations, industry-wide?"** (15 min)
9. **Capstone, part 1 — technical** (75 min) — finish/demo the full Copilot (predicts, talks, acts) to the group
10. **Capstone, part 2 — strategic: AI Implementation Roadmap** (35 min) — each person/team writes a short plan for rolling this out in their own area of NDDB IT
11. **Course wrap** (10 min) — "how the marvel is achieved," full-circle recap

---

## Coverage check
Every Module 1–7 item and every named exercise from the original PDF syllabus is placed above, including the Dairy Ecosystem angle (🥛, distributed) and all Module 7 sub-topics (🧱, distributed + consolidated on Day 6).

**Addendum (client email, post-original-syllabus):** Hosted vs. local models, LangChain, LangGraph, Langflow, n8n, and Enterprise AI & Security were all already planned or contractually named (Module 7) — see Day 2, Day 4, and Day 5 above for exactly where each now lives. Chroma is now the specific vector DB used in the Day 4 hands-on (previously left generic). Citations/source references, document re-indexing (tied to industry-grade contrast), and document-level access control are genuinely new additions, folded into Day 4 rather than given a new day — see Day 4 items 8–9 above.

**Environment setup, not just the webpages below:** Day 4 now requires each participant to install Langflow locally, the same "make it personal" pattern as Day 1's Antigravity install and Day 2's Ollama install — this is real, self-hosted software the room runs on their own machines, not a custom page this codebase builds. Flag it in pre-session setup instructions alongside Antigravity and Ollama.

## Interactive webpages needed
1. Linear regression line-fit (draggable/animated)
2. Neural network decision-boundary playground
3. RNN hidden-state memory-decay demo
4. LSTM gate visualization
5. Transformer attention heatmap
6. 2D embedding-space cluster map
7. RAG pipeline animation
8. Tool-calling decision-flow demo
