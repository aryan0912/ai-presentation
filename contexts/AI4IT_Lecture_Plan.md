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
1. Retrieval quiz (Day 3) — 10 min
2. **Debrief: "Automate an IT Task" exercise** (15 min)
3. **RAG concepts** (80 min)
 - Problem: the Copilot doesn't know NDDB's chilling-center SOPs
 - Let them guess how they'd solve it (usually lands near "just show it the document")
 - Reveal: embed → retrieve → augment → generate — RAG pipeline animation demo
 - 🧱 Databases for AI (vector DBs) introduced here, in context
4. *Break*
5. **Module 4: AI Integration & Architecture** (45 min) — model selection/API consumption, integrating into ERP/CRM/DMS/Email/Helpdesk. The Copilot officially becomes a helpdesk-grounded assistant.
6. **Industry practice: OpenRouter** (30 min)
 - Problem: what if your model provider goes down or a better one ships next month?
 - Reveal: one API, many providers
 - Hands-on: call 2–3 models on the same prompt, compare cost/latency/quality
 - From here on, OpenRouter is the Copilot's actual LLM backend
7. *Lunch*
8. **Hands-on: build a minimal RAG demo** (75 min) — grounding the Copilot in a sample SOP doc, calling models via OpenRouter
9. **POC vs. production, note #2** (10 min) — no access control, no re-indexing pipeline, no retrieval-quality evaluation
10. **Exercise: Generate Scripts & Documentation with AI** (20 min)
11. **Foreshadow + homework brief** (15 min) — "Right now the Copilot can answer — next weekend we teach it to act."

**Gap Week 2 homework:** retrieval quiz + creative build — take the automation idea you're most excited about, attempt a rough first version in Antigravity (broken/incomplete is fine). Bring it to Day 5.

---

## WEEKEND 3 — Making the Copilot Act

### Day 5 — Tool Calling & Agents (Code, then No-Code)
1. Retrieval quiz (Weekend 2) — 10 min
2. **Checkpoint: show what you built** (10 min) — everyone's rough automation attempt; this becomes today's raw material
3. **Debrief: "Generate Scripts & Docs" exercise** (15 min)
4. **Tool calling — the core idea** (65 min)
 - Problem: their own homework builds can usually answer but not act
 - Reveal: give the LLM a menu of tools/functions it can call
 - Tool-calling decision-flow demo
5. **LangGraph — show the code** (60 min) — walk a small agent through step by step, plain language, no assumption they'll code it themselves
6. *Break*
7. **n8n — the same agent, no code** (60 min) — rebuild the identical flow visually, mapping each node back to the LangGraph code just shown
8. *Lunch*
9. **Guided hands-on: extend the Copilot in n8n** (40 min) — continues the RAG-grounded Copilot from Day 4, now able to raise a ticket/alert. 🧱 Containerization/orchestration and model deployment mentioned in context.
10. **Antigravity, continued** (40 min) — scaffold/extend a bigger Copilot piece (e.g. a status dashboard), or finish this morning's homework build
11. **POC vs. production, note #3** (10 min) — today's output is a working demo, not hardened — no auth, no error handling, no load testing
 - *(Day runs ~10 min long — expected)*

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

## Interactive webpages needed
1. Linear regression line-fit (draggable/animated)
2. Neural network decision-boundary playground
3. RNN hidden-state memory-decay demo
4. LSTM gate visualization
5. Transformer attention heatmap
6. 2D embedding-space cluster map
7. RAG pipeline animation
8. Tool-calling decision-flow demo
