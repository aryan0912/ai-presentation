# Lecture Plan: Day 6 — The Full Power, The Hard Questions, and Your Own Plan
**For: Google Antigravity — build `ai4it-web/src/app/day6/` from this plan**
**Author's role:** Content and pedagogy authority, same standard as all prior day specs. This document supersedes the Day 6 section of `AI4IT_Lecture_Plan.md`.
**Companion docs:** `contexts/day5_agents_spec.md` (required — today opens by resolving Day 5's three cliffhangers), `contexts/og_requirements.md` (Modules 5, 6, 7 + Labs 4 and 5).

---

## 0. What kind of day this is

Day 6 does three jobs, in this order: **show how far current-generation AI actually goes** (harness, skills, multi-agent), **ask the hard questions nobody has asked yet** (governance, red-teaming, compliance), and **hand each person a plan for their own job** (capstone).

**Critical framing note — read before writing any page copy.** Earlier course planning referenced a single continuous "Chilling Centre Copilot" project running across all six days. **That thread was not followed through in practice** and must not be referenced as if it were. Participants finish this course holding a *collection* of things they built — a RAG chatbot, several agents, a ticket integration — not one named product. The capstone is framed accordingly: *"show something you built"* plus *"write the plan for your own area."* Do not write copy that assumes a single shared artifact.

**This day carries more contractual content than any other** (Module 5 in full, Module 6 in full, Module 7's remainder, Labs 4 and 5). That load is only survivable because of two deliberate consolidations:
- **Lab 5 (multi-service log troubleshooting → RCA) *is* the multi-agent build.** One exercise, two syllabus obligations.
- **Lab 4 (red-teaming) *is* how Module 5 is taught.** Participants find the failures themselves, then the content explains what they found.

**Module 7's remainder is delivered as a reference handout with a guided walk, not as teaching.** Say so out loud. Hardware sizing tables and networking topologies do not survive a Sunday afternoon; knowing the handout exists does.

**The last 75 minutes are the most important of the entire course** — they contain the capstone, the closing synthesis, and the feedback collection. They are protected absolutely. See §6 and §7.

---

## 0.1 Pre-session requirements

- **A sandboxed code-execution environment** for §2.2 — containerized or otherwise isolated, no network access, hard timeout. This is *not* the same safety problem as Day 5's SQL tool and the difference is a teaching point (§2.2).
- **A realistic multi-service log bundle** for Lab 5 (§3.2): four services (application server, database, load balancer, cache), a genuine cascading failure buried in them, timestamps that actually correlate, and enough noise that the answer isn't obvious on a skim. **Build this in advance and verify the RCA is derivable** — a bundle with no discoverable answer wrecks the exercise.
- **An annotated agent execution trace** for §2.3's reading exercise — a real one, with at least one wasted step and one good recovery visible.
- **Printed handouts:** (a) the Module 7 infrastructure reference, (b) the Module 6 roadmap template. Both are worked with directly, not just mentioned.
- Everything from Day 5 still running: Langflow, n8n, MCP server, API keys.

**Cut policy, per block, if running long:**
| Block | First thing to cut | Never cut |
|---|---|---|
| 1 | The LoRA/QLoRA segment (§2.5) — reduce to the decision rule alone | The harness reveal and the Claude Code / Antigravity naming (§2.3) |
| 2 | Number of services in the log bundle (four → two) | The error-cascade break-it (§3.3) |
| 3 | Module 7 walk (§4.5) — hand it out, skip the walk | Red-teaming (§4.2) and the bias segment (§4.3) |
| 4 | **Nothing. This block is protected in full.** | All of it |

---

## 1. Pacing table

| Block | Time | Beat | Kind |
|---|---|---|---|
| **1** | **9:30–11:15 (105 min)** | Ritual (15), code-execution tool (20), **harness reveal + trace reading** (35), skills (20), fine-tuning-vs-RAG decision (15) | ritual → build → reveal → build → decision |
| **2** | **11:30–1:30 (120 min)** | Multi-agent guess-gate + reveal (20), **Lab 5: multi-service log RCA build** (75), error-cascade break-it + debrief (25) | reveal → build → break-it |
| *Lunch* | *1:30–2:30* | | |
| **3** | **2:30–4:00 (90 min)** | Governance guess-gate (10), **Lab 4: red-teaming** (25), Module 5 taught from what they found (25), Module 7 reference walk (15), Module 6 roadmap framework (15) | attack → explain → reference → framework |
| **4** | **4:15–5:30 (75 min)** | Capstone showcase (15), roadmap writing (20), **share-out** (15), **course-wide closing synthesis** (15), **feedback** (8), wrap (2) | celebrate → commit → synthesize → capture |

---

## 2. Block 1 — How Far This Actually Goes (105 min)

### 2.1 Opening ritual (15 min)
Retrieval quiz on Day 5 — probe: what tool-calling actually is (the model emits a request, it never executes anything), why the parameterized SQL tool beats the free-form one, what MCP standardizes, what breaks first at 10,000 users, and the workflow-versus-agent distinction. Brief checkpoint on anything participants tried overnight.

### 2.2 Build a code-execution tool (20 min)
**Motivate from a gap in yesterday's toolkit:**
> *"Yesterday you built tools with fixed shapes — a calculator, a query with four parameters, a ticket action. Here's a request none of them can serve: 'Take this CSV of readings, find the three sites with the steepest week-over-week decline, and tell me the percentages.' There is no pre-built tool for that. There can't be — you'd need a different tool for every question of that shape."*

**The build:** a sandboxed Python execution tool. The agent writes a small script, runs it, reads stdout, and answers from the result. Show it working on the CSV question.

**The safety point, which is genuinely different from Day 5's — do not skip it:**
> *"Yesterday's lesson was 'narrow the capability until the dangerous thing isn't expressible.' You cannot do that here. Generality is the entire point of this tool — the moment you narrow it, it stops being useful.*
>
> *So the guardrail moves. It's no longer interface design; it's **isolation**. Container, no network, read-only filesystem, hard timeout, resource caps. You stop trying to control *what* it writes and start controlling *what its code can reach*.*
>
> *Two different problems, two different answers. Knowing which one you're facing is the skill."*

### 2.3 The harness reveal (35 min) — the day's first peak
**Guess-gate, straight off what they just built:**
> *"This tool has no fixed shape. The script might fail and need fixing. It might need to run three times. The output might be huge and need trimming before it goes back to the model. So — who decides when it's finished? Who catches the error and feeds it back? Who keeps the conversation from overflowing the context window?"*

Let them work it. They'll arrive at *"something has to manage the loop."*

**The reveal:**
> *"That something is called a **harness**. It's the runtime that wraps the model: dispatching tool calls, capturing results and errors, deciding whether to continue or stop, managing what stays in the context window and what gets dropped, retrying intelligently when something fails.*
>
> *The model is the reasoning. The harness is everything else. And it is where most of the engineering in a real agentic system actually lives."*

**Then the full-circle moment — this is why harness belongs on the final day:**
> *"You have been using one since Day 1.*
>
> *Antigravity is a harness. When you described something and watched it build, inspect, correct itself and try again — that loop was a harness driving a model. **Claude Code** is a harness. The **Claude Agent SDK** is a harness you can build your own on top of. Every agentic coding tool you've heard of is a model plus a harness, and the difference between a good one and a bad one is almost entirely the harness.*
>
> *On Day 1 we told you: describe intent, inspect what was built, judge whether it's right. You now know what was running underneath that the whole time."*

**The trace-reading exercise (~15 min, active not passive):** hand out a real annotated agent trace. Participants mark, individually then in pairs:
- Where did it make a genuinely good decision?
- Where did it waste a step?
- Where did it recover from an error, and how?
- Where *should* a human have been asked before it continued?

That last question is a deliberate seed for §4.4's human-in-the-loop content.

### 2.4 Skills (20 min)
**Motivate from repetition:**
> *"You wrote a careful prompt on Day 3 — role, context, instruction, output format, constraints. How many times would you retype that if you used it every week?"*

**Reveal:** a skill is that prompt, packaged with a name, so the harness can invoke it on demand instead of a human retyping it.

**Hands-on:** take one of their Day 3 prompts (the log-parsing one or the ticket-extraction one) and package it as a named, reusable skill. Invoke it by name.

> *"You didn't build anything new. You packaged something you already made two weekends ago so it never has to be rebuilt. That's the whole idea — and at organisation scale, it's how a team stops having forty private versions of the same prompt and starts having one reviewed version everybody uses."*

### 2.5 Fine-tuning vs. RAG — the decision nobody has asked yet (15 min)
Closes a genuine Module 1.2 gap, and it's a question they *will* be asked.

**Guess-gate:** *"Someone proposes 'let's fine-tune a model on NDDB's data instead of all this retrieval plumbing.' Good idea or not?"*

**The content, kept to the decision rule:**
- **Fine-tuning** (**LoRA / QLoRA** — low-rank adaptation, which makes it cheap enough to be practical) teaches a model *how to behave*: tone, format, domain vocabulary, consistent output shape. It bakes in behaviour.
- **RAG** gives a model *what to know right now*: facts, documents, current state.
- **The rule:** *"Facts that change → RAG. Behaviour that's stable → fine-tune. Your SOPs get revised quarterly; fine-tuning them in means retraining quarterly and you still can't cite a source. That's why almost every enterprise system you'll evaluate is RAG-first."*
- **The honest exception:** if you need a consistent output format or a specialised vocabulary that prompting keeps failing at, fine-tuning is the right tool — and LoRA makes it affordable.

---

## 3. Block 2 — Multi-Agent, Built as Lab 5 (120 min)

### 3.1 Guess-gate and reveal (20 min)
> *"You now have a pile of agents. Here's a real job: four services — application server, database, load balancer, cache. Something broke at 3am and the failure cascaded across all four. You need a root-cause analysis.*
>
> *Do you build one agent with twenty tools that does all of it, or several specialists that coordinate? Which, and why?"*

Take arguments both ways — both have real merit and the room will find both.

**Reveal the supervisor pattern**, with the honest reasoning:
> *"Specialists win for a specific reason: an agent's reliability degrades as its tool list grows. Twenty tools means twenty chances to pick the wrong one. Three agents with four tools each are individually far more reliable — and when one fails, you can see *which* one failed. A monolith just gives you a bad answer with no way to locate the fault."*

Draw the architecture: **supervisor** routes to → **log parser** (extracts structured events per service) → **correlator** (builds a cross-service timeline, finds causal ordering) → **RCA writer** (produces the structured incident report).

### 3.2 Lab 5 — build it (75 min)
**Input:** the prepared multi-service log bundle.
**Output:** a structured RCA — incident timeline, root-cause hypothesis, contributing factors, affected services, recommended remediation.

Build order, with checkpoint gates:
1. **Log parser agent** — takes raw logs from one service, emits structured events (timestamp, severity, service, event type, message). Reuses the Day 3 log-parsing skill from §2.4 — *point this out, it's a satisfying callback.* **Gate.**
2. **Correlator agent** — takes structured events from all four services, orders them into a single timeline, identifies which event plausibly triggered which. **Gate.**
3. **RCA writer agent** — takes the correlated timeline, produces the structured report in a fixed schema (Day 3's structured-output skill, again reused).
4. **Supervisor** — sequences the three, passes outputs forward.
5. **Run it end to end** on the full bundle.

**The achievement:** a system that reads four services' logs and produces a usable incident report. This is a genuinely impressive thing to have built, and it directly answers Module 3's Disaster Management / RCA content — *say that out loud*, since that discipline has only had a three-minute hook until now.

### 3.3 The error-cascade break-it (25 min)
**Guess-gate before demonstrating:**
> *"One weakness of this architecture is much worse than the others. What do you think happens if the log parser misreads a timestamp — say it parses a date as US format when it's actually European?"*

Let them predict, then show it: the correlator builds a timeline in the wrong order, concludes the database failure *caused* the load-balancer failure when it was the reverse, and the RCA writer produces a **confident, professional, completely wrong incident report.**

> *"Nothing errored. Nothing crashed. Every agent did exactly its job. The report looks excellent — and it would send a team to fix the wrong thing at 4am.*
>
> *This is the characteristic failure of multi-agent systems: **errors compound silently, because each agent trusts the previous one's output completely.** A single agent that gets confused often shows it. A chain of agents launders a small error into a confident conclusion."*

**Debrief — what multi-agent costs, stated honestly:**
| Buys you | Costs you |
|---|---|
| Specialisation → higher per-agent reliability | Coordination overhead and latency |
| Isolatable failure — you know which agent broke | Silent error compounding across the chain |
| Parallelism where steps are independent | Harder debugging; more surface to monitor |
| Independently replaceable components | Higher cost per request — several model calls, not one |

> *"When a vendor says 'multi-agent,' the question is not 'how many agents.' It's: **what happens when agent two is wrong, and how would you know?**"*

---

## 4. Block 3 — The Hard Questions (90 min)

### 4.1 Governance guess-gate — resolve Day 5's cliffhanger (10 min)
> *"Yesterday you fixed one unsafe query, architecturally. I then named four things still completely broken: nobody's checking who's allowed to ask what, nothing stops sensitive data going out in a prompt, nothing logs who asked an agent to do what, and nobody has written down what the rules even are.*
>
> *Before I teach any of it — take the first one. Someone asks your RAG system about a document they have no business reading. What actually stops them right now?"*

The honest answer is *nothing*. Sit with that for a second, then:

> *"Rather than lecture you about AI risk, I'd like you to go find it yourselves. You have twenty-five minutes to break each other's systems."*

### 4.2 Lab 4 — Red-teaming (25 min)
**Pairs. Swap systems. Attack objectives, given as a scored list:**
1. Make it state something false **with confidence** (hallucination)
2. Make it reveal content from a document it shouldn't surface (access leakage)
3. Make it produce a script or command with a security flaw
4. Make it contradict an answer it gave you two questions ago
5. Make it take an action it shouldn't have taken

**Run it as a competition.** Collect the best findings on a shared board. This is genuinely fun, and it produces the teaching material for §4.3 — which is the entire point.

### 4.3 Module 5, taught from what they just found (25 min)
Work through the board. Each category of attack they succeeded at maps to a named concept:

- **Hallucination and output validation** — they produced live examples minutes ago. Teach the taxonomy (fabricated facts, fabricated citations, fabricated *actions* — callback to Day 5's fake ticket #4471), then validation strategies: schema validation, groundedness checking against retrieved context (Day 4's faithfulness metric, now as a runtime guard rather than an evaluation metric), and confidence thresholds that trigger escalation.

- **Bias — and flag explicitly that this is the first time the course has addressed it.** Make it concrete for *this* audience, not abstract:
  > *"Bias in an IT context doesn't look like a headline. It looks like a triage agent that consistently rates tickets from one department as lower priority — because historically those tickets took longer to resolve, so the training data taught it they were less urgent. It looks like a code reviewer that flags unfamiliar patterns as defects because its training skewed toward one ecosystem. It looks like a vendor recommendation that's always the same vendor.*
  >
  > *None of these are anyone's intent. All of them are the system faithfully reproducing a pattern in its data. That's what socio-technical bias means, and you find it by **measuring outcomes across groups**, not by reading the model's mind."*

- **Data leakage prevention** — preventing corporate data reaching public training sets. Direct callback to Day 3's tool-comparison table (retention tiers) and Day 4's privacy-motivated local-model switch. *"You already made this decision twice without calling it DLP."*

- **PII masking, sanitisation, anonymisation** — pre-processing before data reaches a model; where in the pipeline it belongs.

- **RBAC** — the answer to §4.1's opening question: metadata tags on chunks, filtered at retrieval time, so restricted content never reaches the prompt. Callback to Day 4's team-of-50 access-control question, which was deliberately left open.

- **Human-in-the-loop checkpoints** — callback to §2.3's trace exercise (*"where should a human have been asked?"*). Where to place them, and the honest cost: every HITL gate adds latency and needs a staffed human, so placing them everywhere means the system is unusable and placing them nowhere means it's unsafe. That trade is a judgement call, which is exactly their job.

- **Guardrail tooling, named:** **NeMo Guardrails**, **Llama Guard** — the productised versions of what they just tried to defeat.

- **Frameworks and compliance, kept practical:** **ISO/IEC 42001** (AI management systems — the AI equivalent of an ISO 27001 posture), and **India's DPDPA** — which is the one that actually binds NDDB, so give it the most time: consent, purpose limitation, data-principal rights, and what it means when personal data passes through a model. Then **an ICT AI Review Board** and an **acceptable-use policy** as the organisational mechanism.

> *"Here's the callback worth making: on Day 3, when we toured where AI already lives in IT, I said to hold onto that list because it's the raw material for policy. This is that moment. Which of those uses does NDDB allow, under what conditions, reviewed by whom?"*

### 4.4 Module 7 — reference walk, explicitly not teaching (15 min)
**Hand out the infrastructure reference. Say plainly:**
> *"You will not remember these tables, and you don't need to. What matters is that this exists and you know what's in it. Fifteen minutes, pointing at things."*

Walk the headings, pausing only where there's a judgement worth flagging:
- **Compute:** H100 / A100 / L40S / RTX class, TPU vs. GPU vs. CPU, VRAM sizing for inference vs. fine-tuning, PCIe vs. SXM, power and cooling. *Flag: VRAM is the constraint that decides which models you can run at all — Day 2's quantization arithmetic is the tool for that.*
- **Storage and networking:** NVMe throughput, Ceph / MinIO for distributed storage, InfiniBand vs. 100GbE RoCE. *Flag: this only matters at training or multi-node serving scale — don't let a vendor sell you InfiniBand for a 50-user chatbot.*
- **OS and environments:** RHEL / Ubuntu Server, CUDA, cuDNN, ROCm, Conda, venvs, JupyterLab.
- **Frameworks:** PyTorch, Hugging Face Transformers, **LlamaIndex** (the RAG-focused alternative to LangChain), vLLM, Ollama, **TensorRT-LLM**.
- **Quantization formats:** **GGUF, AWQ, EXL2** — Day 2 taught the arithmetic; these are the file formats it arrives in.
- **Cloud AI platforms:** **AWS Bedrock, Azure AI Foundry, GCP Vertex AI** versus self-hosted open stacks. *Flag: this is the third option alongside the hosted-API and self-host choices from Days 4–5 — a managed platform inside your own cloud boundary.*
- **Disaster recovery for AI systems:** checkpoint replication, model caching, multi-region failover. *Flag: your vector store is now stateful production data — it needs the same backup posture as a database, and most teams forget this.*
- **Application modernisation:** monolith → microservices with AI middleware, event-driven architectures (**Kafka / RabbitMQ**). *Flag: the realistic NDDB pattern is AI as a service alongside existing systems, not a rewrite.*
- **Edge AI and SLMs:** small models running close to the data — genuinely relevant for cold-chain and field deployments where connectivity is unreliable.

### 4.5 Module 6 — the roadmap framework (15 min)
**Framed as scaffolding for what happens next, not standalone content:**
> *"This is the template you're about to fill in for your own area. Twelve minutes, then you use it."*

- **Readiness assessment, four dimensions:** infrastructure, data quality, security posture, team capability. *"Data quality is the one that kills projects. If your documents are chaos, RAG inherits the chaos — you saw that with Docling on Day 4."*
- **The prioritisation matrix — draw it and use it live:** High Impact vs. Low Complexity, four quadrants. Take two or three real ideas from the room's gap-week attempts and place them on the grid together. *"Start bottom-right: high impact, low complexity. Everyone wants to start top-left because it's exciting. That's how pilots die."*
- **PoC design:** define success metrics **before** you start, sandbox it, plan onboarding. *"'We'll see how it goes' is not a success metric. 'Reduces average triage time by 30% on 100 real tickets' is."*
- **Measuring value:** ROI, **MTTR** reduction, developer velocity, compute cost tracking — the cost calculators from Days 4 and 5 are the inputs here.
- **Phased milestones and change management:** *"The technical work is the easy part. Getting forty colleagues to trust and use it is the hard part, and it needs a plan too."*

---

## 5. Block 4 — Capstone and Close (75 min) — PROTECTED

### 5.1 Capstone Part 1 — showcase (15 min)
> *"Over six days you've built a pile of things. Show us one you're proud of."*

Open floor, two minutes each, 5–7 people. Deliberately **not** a single shared product demo — people show different things (a RAG chatbot, a SQL agent, today's RCA system, a gap-week Antigravity build), and the room sees the breadth of what it collectively made. Keep it warm and fast.

### 5.2 Capstone Part 2 — the roadmap, written (20 min)
Individual, quiet, using the Module 6 template:
- One AI initiative for **your own area** of NDDB ICT
- Where it sits on the impact/complexity grid, and why
- What you'd pilot first, and the success metric
- What infrastructure and governance it needs
- The honest risks, and what would make you stop

> *"This is the actual output of this course. Not the chatbot — the judgement to decide what should be built, and to say why."*

### 5.3 Share-out (15 min) — the emotional peak
**Do not skip this and do not let it be silent writing only.** Four or five people read **just the headline** of their plan aloud — one or two sentences, the thing they're going to try to get built.

> *"Not the whole plan. One line. What are you going to go do?"*

The room hearing itself commit, out loud, to real things is the strongest moment available in this course. It is personal, forward-looking, and collective all at once — which is exactly what a final session should end on.

### 5.4 Course-wide closing synthesis (15 min)
**Walk the entire six days backward, as a list. The length of the list is the point.**

> *"Six days ago, some of you had never used an AI tool for work.*
>
> - *Day 1: you hand-computed a regression, then stacked them into a neural network and watched it learn.*
> - *Day 2: you followed attention through an actual matrix and ran a language model on your own laptop.*
> - *Day 3: you learned to make a model produce something a script can parse — and built a retrieval system from nothing.*
> - *Day 4: you made it handle real documents, made it honest about its sources, and learned to measure whether it's telling the truth.*
> - *Day 5: you gave it hands. Five agents. You also made one generate a destructive query, and then you fixed that properly.*
> - *Today: you built a system where several agents investigate an incident together, you broke each other's systems on purpose, and you wrote a plan for your own department.*
>
> *That is not an introduction to AI. That's a working engineering literacy in it."*

**Then reopen the question that has been sitting unanswered since the first hour of Day 1:**

> *"On the very first morning I asked: what is AI, really? And I didn't answer it. I gave you Larry Tesler's line instead — **'AI is whatever machines can't do yet.'** Every time something works, we stop calling it AI and start calling it software. Spam filters were AI once. Autocomplete was AI once.*
>
> *Six days later, you've built the things people are currently calling AI. You know what's inside them: a matrix multiplication, a similarity search, a loop that asks 'are you done yet.' You know exactly where they break, because you broke them yourself.*
>
> *So — you tell me. What is AI?"*

**Take two or three answers from the room. Let them have the last word on it.** Then:

> *"Whatever it is — you're no longer on the outside of it. Your job isn't to be impressed by it or afraid of it. It's to decide what's worth building, insist on knowing whether it works, and say no when it shouldn't be built at all. That's what we've been practising for six days."*

### 5.5 Feedback (8 min) — immediately, no gap
**Nothing administrative between §5.4 and this.** Not the certificate process, not the follow-up material, not thank-yous. The peak-end effect leaks away in exactly that gap, and this feedback is the reason the whole close was engineered this way.

### 5.6 Wrap (2 min, hard limit)
Thank the room. Point at where materials live. Stop.

---

## 6. Non-goals

- **Do NOT reference a single continuous "Chilling Centre Copilot" project.** It wasn't followed through; framing the capstone around it would be dishonest and would land badly with a room that knows what it actually built. See §0.
- **Do NOT teach Module 7's infrastructure content properly.** §4.4 is a reference walk by design. Attempting real depth here will eat the capstone, which is a far worse trade.
- **Do NOT let red-teaming (§4.2) run past 25 minutes.** It's enjoyable enough to eat the hour. The findings are raw material for §4.3, not the destination.
- **Do NOT lecture Module 5 before §4.2.** The entire design is that participants discover the failures first, then the content names what they found. Reversing that order makes it a compliance lecture.
- **Do NOT skip the error-cascade demo (§3.3)** to save time on the multi-agent build. A multi-agent system that only ever works is a dishonest lesson.
- **Do NOT let anything administrative sit between §5.4 and §5.5.**
- **Do NOT extend §5.6 past two minutes.** Everything after the peak dilutes it.

---

## 7. Traceability to `og_requirements.md`

| Syllabus item | Where covered |
|---|---|
| Module 1: Current trends — autonomous agents, multi-modal, **edge AI, SLMs** | §3 (agents), §4.4 (edge/SLM) |
| Module 1.2: AI Model Lifecycle — **fine-tuning (LoRA/QLoRA)** | §2.5 |
| Module 3: Disaster Management & Business Continuity, RCA | §3.2 (Lab 5 — first real treatment) |
| Module 5: Hallucinations, output validation | §4.2, §4.3 |
| Module 5: **Bias**, synthetic drift, socio-technical bias | §4.3 (first coverage in the course) |
| Module 5: Guardrails, HITL checkpoints | §4.3, seeded in §2.3 |
| Module 5: DLP, PII masking, anonymisation, **RBAC** | §4.3 |
| Module 5: **ISO/IEC 42001**, **DPDPA**, AI Review Board, acceptable use | §4.3 |
| Module 5: **Lab 4 — red-teaming and error auditing** | §4.2 |
| Module 6: Readiness assessment, **Impact/Complexity matrix** | §4.5 |
| Module 6: PoC design, success metrics, sandboxing | §4.5 |
| Module 6: ROI, **MTTR**, velocity, compute cost | §4.5 |
| Module 6: Implementation plan, phasing, change management | §4.5, §5.2 |
| Module 6: **Lab 5 — multi-service log troubleshooting → RCA** | §3.2 |
| Module 7: Compute, storage, networking, OS/environments | §4.4 |
| Module 7: **LlamaIndex, TensorRT-LLM, PyTorch** | §4.4 |
| Module 7: **Cloud AI platforms — Bedrock / Azure AI Foundry / Vertex** | §4.4 |
| Module 7: **NeMo Guardrails, Llama Guard** | §4.3 |
| Module 7: Quantization formats **GGUF/AWQ/EXL2**, DR, checkpoint replication | §4.4 |
| Module 7: **Application modernisation, Kafka/RabbitMQ** | §4.4 |

---

## 8. Definition of done

- [ ] No page copy or spoken framing references a single continuous six-day project (§0)
- [ ] §2.2 states the isolation-vs-interface distinction explicitly — it's the day's first real engineering insight
- [ ] §2.3's harness reveal names **Antigravity, Claude Code, and the Claude Agent SDK**, and closes the Day 1 "describe intent → inspect → judge" loop out loud
- [ ] §2.3's trace exercise asks "where should a human have been asked?" — seeding §4.3's HITL content
- [ ] §2.4's skill is packaged from an **existing Day 3 prompt**, never written fresh
- [ ] §2.5 delivers the fine-tune-vs-RAG decision as a **rule**, not a survey
- [ ] Lab 5's log bundle is verified in advance to contain a **derivable** root cause
- [ ] §3.2 explicitly names that it's satisfying Module 3's Disaster Management content
- [ ] §3.3's error cascade is **guess-gated before it's shown**, and the resulting wrong RCA looks genuinely professional
- [ ] §4.2 runs **before** any Module 5 teaching — discovery precedes explanation
- [ ] §4.3's bias segment uses **IT-specific** examples (triage priority, code review, vendor recommendation), never abstract ones
- [ ] §4.3 makes the Day 3 callback — "hold onto that list, it's the raw material for policy" — explicit
- [ ] §4.4 is announced as a reference walk, not taught as content
- [ ] §4.5's impact/complexity matrix is populated **live with the room's own ideas**
- [ ] §5.1 is an open showcase of varied work, not a single product demo
- [ ] §5.3's share-out happens aloud — the roadmap is never left as silent writing
- [ ] §5.4 walks all six days as a list, then reopens the Day 1 question and **lets the room answer it**
- [ ] §5.5 follows §5.4 with **zero** administrative content in between
- [ ] §5.6 is under two minutes

---

## 9. Self-assessment

**Rating: 9.7.**

**What earns it:** every reveal is guess-gated (§2.3, §3.1, §3.3, §4.1, §2.5), and the two contractual labs are consolidated into content rather than bolted on — red-teaming *is* how governance is taught, and the multi-agent build *is* Lab 5, which also finally pays off Module 3's Disaster Management content. The harness reveal lands the course's single best callback (the tool they've used since Day 1, finally named), and the close is engineered in the right order: celebrate, commit aloud, synthesise the full arc, reopen the unanswered Day 1 question, then capture feedback with nothing in between. The error-cascade demo keeps the multi-agent lesson honest rather than promotional, and the §2.2 isolation-vs-interface distinction gives the day a genuine engineering insight rather than only tooling.

**What keeps it off a 10:** Module 7's remainder is genuinely under-taught — it's a handout with a walk, which is the right triage but is still a real compromise against the syllabus. And Block 3 is dense: red-teaming, all of Module 5, an infrastructure walk and the Module 6 framework inside ninety minutes leaves no slack. If the room is engaged, §4.4 will be the casualty, which the cut policy anticipates but doesn't fully solve.
