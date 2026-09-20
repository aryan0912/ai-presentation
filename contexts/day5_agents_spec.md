# Lecture Plan: Day 5 — Giving the Copilot Hands: Tools, Agents & the Engineering Landscape
**For: Google Antigravity — build `ai4it-web/src/app/day5/` from this plan**
**Author's role:** Content and pedagogy authority, same standard as `day1_linear_regression_spec.md`, `day1_neural_network_spec.md`, `day2_nlp_transformers_spec.md`, `day3_prompt_engineering_spec.md`, and `day4_rag_architecture_spec.md`. This document supersedes the Day 5 section of `AI4IT_Lecture_Plan.md`.
**Companion docs:** `contexts/day4_rag_architecture_spec.md` (required — today opens by extending yesterday's Copilot), `contexts/og_requirements.md` (Modules 3, 4, 7), `contexts/day6_governance_capstone_spec.md` (receives this day's three cliffhangers).

---

## 0. What kind of day this is

Days 3–4 taught the Copilot to **talk**. Day 5 teaches it to **act**. That is the entire identity of the day, and it's the third act of the course's running three-act structure (Days 1–2 *predicts*, Days 3–4 *talks*, Days 5–6 *acts*).

**The scoping decision that governs everything below:** this day is a **broad survey of the AI-engineering landscape with hands-on stops**, not deep mastery of any single tool. Participants will touch six or seven distinct patterns today. None of them get exhaustive treatment, and that is deliberate — the course's thesis is *specify and judge*, which requires recognizing the whole map, not mastering one corner of it. **Say this framing out loud at the start of the day** (§2.2) so light treatment of each stop reads as intentional rather than rushed.

**Day 5 stays strictly single-agent.** One agent, getting progressively more capable tools. Multi-agent coordination, skills, and the harness concept all belong to Day 6 — they're motivated by *having several agents at once*, which doesn't exist until tomorrow. Do not preempt them beyond the forward-pointers in §5.4.

**Time is not the constraint**, same policy as every prior day. The four-block schedule is a planning aid.

**The escalation spine — each rung adds one new axis, not just "harder":**
| Rung | Tool | New axis it introduces |
|---|---|---|
| 1 | Calculator | A tool exists at all — single call, verifiable result |
| 2 | Agentic RAG | Autonomy over its own process — it decides *how* to retrieve |
| 3 | SQL | Real-world consequence — and therefore real-world danger |
| 4 | MCP | Standardization — tools become portable instead of hand-wired |
| 5 | n8n | Reach — the connector surface of an entire automation ecosystem |

---

## 0.1 Pre-session requirements — non-negotiable

Day 5's §4.1 demo is the only place in the entire course where an agent is deliberately allowed to generate a destructive command. That requires real preparation:

- **A throwaway, disposable database** with realistic sample data (chilling-center collection readings, a `customers` table, an incident log) — **never** anything connected to a real system, and **never** the same instance participants use for anything else.
- **A one-command reset script** for that database, tested before the session. The destructive demo will be run more than once across the room.
- **The database user for the free-form demo (§4.1) needs write permission** — that's the whole point of the demo. The database user for everything afterward (§4.2 onward) must be **read-only**. Two distinct connection strings, prepared in advance, clearly labelled.
- **At least one pre-built MCP server available and tested** (a filesystem server or a database server is simplest) plus whatever client wiring Langflow needs to connect to it.
- **n8n installed locally or a hosted instance reachable** — verified before the weekend, same pre-install discipline as Langflow in `day3_prompt_engineering_spec.md` §0.1. n8n is the second piece of infrastructure this course asks participants to run; treat it with the same seriousness.
- **Langflow, Ollama, and API keys from Weekend 2 still working** — a quick verification step in the opening ritual costs two minutes and saves forty.
- **A pre-built rescue flow** for each hands-on build, importable, for anyone who falls irrecoverably behind.

**Cut policy, per block, if running long:**
| Block | First thing to cut | Never cut |
|---|---|---|
| 1 | Depth of the tool-calling conceptual reveal (§3.3) | The calculator build — it's the day's first win |
| 2 | The LangGraph code walkthrough's depth (§4.3) | §4.1's break-it and §4.2's architectural fix — this pair is the day's spine |
| 3 | n8n's classic-workflow segment (§5.2a), explain without building | The MCP hands-on plug-in (§5.1) |
| 4 | Load-testing methodology detail (§6.2) | The scale guess-gate, the achievement recap, and all three forward-pointers |

---

## 1. Pacing table

| Block | Time | Beat | Kind |
|---|---|---|---|
| **1** | **9:30–11:15 (105 min)** | Ritual (25), landscape framing (5), guess-gated problem (10), tool-calling reveal (15), **Rung 1: calculator** (30), Rung 2 begins (20) | ritual → problem → reveal → hands-on |
| **2** | **11:30–1:30 (120 min)** | Rung 2 completes (25), **Rung 3a: free-form SQL + break-it** (30), **Rung 3b: parameterized fix** (35), LangGraph code read (30) | hands-on → break-it → fix → code literacy |
| *Lunch* | *1:30–2:30* | | |
| **3** | **2:30–4:00 (90 min)** | **Rung 4: MCP reveal + hands-on plug-in** (40), **Rung 5: n8n workflows → agents → hands-on** (50) | reveal → hands-on → survey → hands-on |
| **4** | **4:15–5:30 (75 min)** | Achievement recap (5), **scale theory** (35), guardrails partially-closed (10), close with three forward-pointers (10), buffer (15) | recap → theory → honest flag → close |

---

## 2. Block 1, Part A — Ritual & Framing (30 min)

### 2.1 Opening ritual (25 min)
- **Retrieval quiz (Weekend 2)** — 10 min, standard format. Probe: the six RAG components, why hybrid search beats pure vector search on an error code, what faithfulness measures, what the parameterized-vs-freeform distinction will later echo (don't ask that last one yet — it's today's content).
- **Checkpoint: the gap-week automation attempt** — 10 min. Two or three participants show the automation they sketched. Broken is fine and expected. **This is today's raw material** — the whole day is about turning "I want this to happen automatically" into "an agent that can actually do it."
- **Debrief: the "Generate Scripts & Documentation" exercise** — 5 min. This is also where **Module 3's Automation & Infrastructure Management content** (Ansible playbook drafting, Bash/PowerShell scripting, container manifest verification) gets cashed in — through their own attempts, not a separate lecture. Ask specifically: *"Did the generated script run? Did you read it before running it?"* The second question matters more.
- **Two-minute infrastructure check:** Langflow loads, API key works, n8n reachable. Catch failures now.

### 2.2 Name the day's framing out loud (5 min)
**Do not skip this.** It's the permission structure for everything that follows:

> *"Today you're going to touch six or seven different tools and patterns. Calculator tools, database agents, a protocol called MCP, a workflow platform called n8n. You are not going to master any of them. That's not the goal and we don't have time for it.*
>
> *The goal is that you know the landscape well enough that when a vendor, a consultant, or a colleague shows you one of these, you recognize what you're looking at and you know what question to ask. That's the job. That has been the job since Day 1."*

---

## 3. Block 1, Part B — The Problem & The Reveal (25 min)

### 3.1 Guess-gated problem (10 min)
Open yesterday's RAG Copilot. Ask it something it can answer well — establish it works. Then:

> *"Now watch this. I'm going to ask it to actually do something."*

Type: **"Raise a ticket for the chilling centre at Anand — the compressor readings are out of range."**

One of two things happens, and both are the point:
- It explains *how* one would raise a ticket (helpful, useless)
- Or worse — it says something like *"I've raised ticket #4471 for you"* — **a complete fabrication**, because it has no ticketing system and no ability to reach one

**If you get the second behaviour, stop and dwell on it:**
> *"It told me it raised a ticket. There is no ticket. There is no ticketing system connected to this thing. It said that because 'I've raised the ticket' is a statistically excellent next sentence — and that's all it's ever doing. This is the most dangerous failure mode in this entire course: an AI that confidently reports an action it never took."*

**Then the guess-gate:**
> *"So how would you actually give it the ability to act? Not to describe acting — to act."*

Let the room work it. They'll land near *"connect it to something"* / *"give it access to the ticket system"* — which is correct, and is exactly the reveal.

### 3.2 Reveal tool-calling conceptually (15 min)
No code. Four sentences and a diagram:

> *"You give the model a menu. Each item on the menu is a function it's allowed to call, with a description of what it does and what inputs it needs. The model doesn't run the function — it can't. It emits a request: 'call `raise_ticket` with these arguments.' Your code runs the function, gets the result, and hands the result back into the conversation. Then the model continues, now knowing what happened."*

**The critical clarification, because it's almost always misunderstood:**
> *"The model never executes anything. It has no hands. All it ever does — still, even now — is produce text. The text just happens to be a structured request that your code knows how to act on. Every 'AI agent' you have ever heard of is this, plus a loop."*

**Diagram to build for the page:** user message → model → *(tool request)* → your code executes → *(result)* → model → answer. Loop the middle section, because the model may call several tools in sequence.

---

## 4. Block 1C + Block 2 — The Three Rungs (135 min)

### 4.0 Rung 1 — The Calculator (30 min)
*Axis: a tool exists at all.*

**The guess-gate, with an honest 2026 caveat.** Ask the room a compound, domain-grounded arithmetic question and have them predict whether the raw model gets it right:

> **"47 chilling centres each collected 8,163 litres yesterday. We lost 3.7% to spoilage. What was the net collection?"**
>
> *(Correct answer: 47 × 8,163 = 383,661 L; spoilage 14,195.46 L; **net 369,465.54 L**.)*

**Instructor preparation note, important:** frontier models in 2026 often get this right. **Test your exact prompt in advance.** If the model succeeds, do not pretend it failed — the honest framing is stronger anyway:

> *"It got it right. Here's the problem: how do you know? You'd have to do the arithmetic yourself to check. And if it had been wrong by 4%, the answer would have looked exactly as confident as this one. A calculator tool doesn't make it smarter — it makes the answer **verifiable by construction**. That's a different and better property than 'usually right.'"*

**The hands-on build (Langflow):**
1. Add a calculator/math tool node
2. Wire it as an available tool to the LLM node
3. Re-run the same question
4. **Inspect the trace** — show the model emitting the tool call, the tool returning the exact figure, the model composing the final sentence around it

**Land the win explicitly:** *"That's an agent. Genuinely. A model that chose to use a tool and incorporated the result. Everything else today is this, with more interesting tools."*

### 4.1 Rung 2 — Agentic RAG (45 min, spans the break)
*Axis: autonomy over its own process.*

**Framing first — this is an upgrade, not a rebuild:**
> *"We're not building anything new here. We're going back to yesterday's Copilot and changing one thing about how it thinks."*

**The motivating failure.** Ask the Day-4 Copilot a question whose answer is thin or awkwardly phrased in the source documents — the same vocabulary-mismatch problem from Day 4's multi-query section, but now approached differently:

> *"Yesterday we fixed vocabulary mismatch by always generating three versions of every query. That works, but it's dumb in a specific way: it does the same amount of work every time, whether the first retrieval was excellent or useless."*

**The guess-gate:**
> *"What would a human researcher do differently?"*

The room lands on: *look at what you found, and if it's not good enough, search again differently.* That's the reveal.

**The build:** add a self-evaluation step between retrieval and generation:
1. Retrieve chunks as normal
2. **New node:** ask the LLM *"do these passages actually contain enough information to answer the question? Answer only YES or NO."*
3. **Conditional branch:** if NO → reformulate the query and retrieve again (cap at 2–3 attempts to prevent loops); if YES → proceed to generation
4. Show the trace on a *good* question (one retrieval, straight through) and a *thin* question (two or three retrievals, then answers)

**Name what changed:**
> *"Yesterday's pipeline always did the same thing. This one makes a decision about its own work. That's the difference between a pipeline and an agent, and it's a smaller change than you'd expect — one evaluation step and one conditional."*

**Flag the cost honestly:** *"It's now unpredictable how long a query takes and how much it costs. Every agentic decision you add trades determinism for capability. Remember that when someone proposes an 'autonomous' system to you."*

### 4.2 Rung 3a — Free-Form SQL, and the Break (30 min)
*Axis: real-world consequence.*

**⚠️ Safety preconditions — verify before this section (see §0.1):** throwaway database, write-permitted connection, reset script tested and at hand.

**Build the naive version first, and build it well** so the failure lands as a genuine surprise rather than a strawman:
- A tool that takes a SQL string and executes it against the database
- The LLM's job: translate natural language → SQL → call the tool → explain the result
- **Demo the success case first.** *"Which chilling centres collected less than 5,000 litres last week?"* → correct SQL, correct rows, clean plain-English answer. **Let the room be impressed.** This is genuinely useful and they should feel that.
- Try two or three more legitimate questions. Let confidence build.

**Now the guess-gate — and make them commit before running it:**
> *"I'm going to give it this instruction: **'Clean up the old test records in the customers table.'** Before I hit enter — what do you think it does? Write it down."*

Take three or four predictions aloud. Then run it.

**What typically happens:** it generates a `DELETE FROM customers WHERE ...` with a guessed condition — or, alarmingly often, something far broader than intended, because *"old test records"* was never a SQL-expressible concept and the model resolved the ambiguity by guessing.

**Sit in the silence for a moment.** Then:

> *"Nobody attacked this system. There's no hacker. A well-meaning colleague typed a reasonable English sentence, and a confident model turned it into a destructive query against a customer table. The ambiguity was in the request. The damage was in the execution."*

**The joke that lands, because this room knows exactly how bad an unscoped DELETE is:**
> *"This is Little Bobby Tables all over again — except this time there's no malicious input. The LLM is the thing writing the dynamic SQL now, and 'sanitize your inputs' doesn't help when the input is a perfectly polite English sentence."*

### 4.3 Rung 3b — The Architectural Fix (35 min)

**Guess-gate the fix before revealing it:**
> *"How do you stop that? And I'll rule out the obvious answer first: 'tell it in the prompt not to do destructive things' — why is that not good enough?"*

The room usually gets there: *prompts aren't guarantees*, the model can still be talked into it, and you're relying on the thing you don't trust to police itself.

**The reveal — the shift from validation to architecture:**
> *"The real fix isn't checking what it wrote. It's designing the tool so the dangerous thing isn't expressible at all."*

**Rebuild as a parameterized tool.** The SQL is pre-written by a human, fixed, reviewed. Only parameters are exposed:

```
get_collection_readings(
    center_id: string,
    start_date: date,
    end_date: date,
    min_litres: number | null
) -> rows
```

The SQL inside is static:
```sql
SELECT center_id, reading_date, litres_collected
FROM collection_readings
WHERE center_id = :center_id
  AND reading_date BETWEEN :start_date AND :end_date
  AND (:min_litres IS NULL OR litres_collected >= :min_litres)
ORDER BY reading_date
LIMIT 500;
```

**The model's entire job is now parameter extraction** — pull `center_id`, dates, and thresholds out of natural language. It cannot write SQL because it is never asked to.

**Re-run the destructive instruction. Nothing happens.**
> *"'Clean up the old test records.' There is no tool that can do that. Not blocked, not filtered, not caught by a validator — it simply does not exist as a capability. The request fails because the system was never given hands for it."*

**Name the principle, because it generalizes far beyond SQL:**
> *"Two ways to make an AI system safe. One: let it do anything, then try to catch the bad cases. Two: only give it capabilities that are safe by construction. The first one is what most demos do. The second one is what you actually ship. Every capability you expose is a decision, and the default should be 'no.'"*

**Then be honest about the trade-off** — this is what keeps it credible:
> *"You lost something real. The free-form version could answer questions I never anticipated. This one answers exactly the questions I pre-approved. That's the trade, and it's the same trade as every API you've ever designed. You already know how to think about this — it's least privilege, applied to a language model."*

**Add the remaining belt-and-braces layers briefly** (they're in the SQL above, point at them): read-only database user, forced `LIMIT`, query timeout, and human-in-the-loop confirmation for anything beyond `SELECT`. **Explicitly note that HITL is Module 5's concept, arriving properly tomorrow.**

### 4.4 Read the LangGraph Code Underneath (30 min)

**Same "read your own artifact" pattern as Day 4's LangChain walkthrough** — now illuminating the agent *loop* rather than the RAG *chain*.

Walk the exported/equivalent LangGraph code for the SQL agent they just built. The pieces that matter:

- **The state object** — what carries between steps (messages so far, tool results)
- **The tool definition** — *point at this deliberately and slow down*:
  ```python
  @tool
  def get_collection_readings(center_id: str, start_date: str,
                              end_date: str, min_litres: float = None):
      """Fetch collection readings for a chilling centre in a date range."""
      ...
  ```
  > *"A name. A parameter list with types. A description. That's the entire contract between the model and your system — and notice the docstring isn't a comment, it's functionally part of the interface. It's how the model knows what this tool is for."*
- **The agent node** — model call with tools bound
- **The tool node** — executes whatever the model requested
- **The conditional edge** (`should_continue`) — *"did the model ask for a tool, or is it done?"* — **this conditional is the loop**, and the loop is the agent
- **The graph compile** — wiring the above into something runnable

**Land the point, tying back to Day 1:**
> *"You're not going to write this. But look at how little there is. An agent is a model, a list of tools, and a loop that asks 'are you done yet?' Everything impressive you've seen in the last two years is this, with better tools and more patience. And this — reading generated code and judging whether it's right — is exactly what we said Antigravity was for on Day 1."*

---

## 5. Block 3 — Standardization & Reach (90 min)

### 5.1 Rung 4 — MCP (40 min)
*Axis: standardization — tools stop being hand-wired.*

**Motivate it off what's literally still on screen from §4.4:**
> *"You just looked at a tool definition: a name, typed parameters, a description. You hand-wired that one. Now — guess-gate — imagine NDDB needs fifty of these. The ticketing system, the ERP, the document store, four different monitoring tools, each built by a different vendor at a different time. What's the problem?"*

The room gets there: *every integration is bespoke, nothing is reusable, and every agent you build re-does all of it.*

**The reveal:**
> *"MCP — Model Context Protocol — is a standard for exactly this. A tool provider runs a small server that publishes a list of tools, each with the name/parameters/description shape you just read. Any MCP-speaking agent can connect, ask 'what can you do?', and immediately use everything it finds. You stop writing integrations and start plugging things in."*

**Draw the comparison to something they already know:**
> *"It's ODBC for tools. Before ODBC, every application needed a bespoke driver for every database. After it, one interface, many databases. Same shape of problem, same shape of solution."*

**The hands-on plug-in — this is the win, keep it fast (~20 min):**
1. Point their agent at a pre-built MCP server (filesystem or database)
2. **Show the tool discovery step explicitly** — the agent lists what the server offers, without anyone writing a definition
3. Ask the agent something that requires one of those new tools
4. Watch it work

> *"You didn't write a line of integration code. You didn't define a tool. You pointed at a server, and your agent got new capabilities. That's the whole pitch."*

**The honest caveats, briefly — this room will be the ones asked about them:**
- MCP is young; the ecosystem is uneven in quality
- **An MCP server is code you're trusting.** Connecting one is a supply-chain decision, not a configuration change — *"the same question you'd ask about any third-party dependency, and you already know how to ask it"*
- The §4.3 lesson still applies: a badly-designed MCP tool can be exactly as dangerous as free-form SQL. **Standardized does not mean safe.**

**Forward-pointer:** *"Tomorrow, the thing that manages all of this — the loop, the tool list, the context — gets a name, and you'll recognize it."*

### 5.2 Rung 5 — n8n: Workflows, Then Agents (50 min)
*Axis: reach — the connector surface of a full automation ecosystem.*

#### 5.2a Classic workflows first, with no AI at all (15 min)
**Deliberately start pre-AI**, because it explains why n8n's connector library exists and why it's so large:

> *"n8n has been around since before any of this. It's a workflow automation tool: something happens, then a chain of steps runs. No language model anywhere near it."*

Build or demo one trivial workflow live: **a webhook/schedule trigger → a condition → post to a channel and file a record.** Three or four nodes, two minutes.

> *"Boring, and that's the point. This pattern has been running enterprise plumbing for years. Which means someone has already written the connector for your ticketing system, your email, your ERP, your CRM — hundreds of them. That library is the entire reason n8n is in this course."*

#### 5.2b n8n's AI Agent node — the same pattern, vastly more reach (15 min)
> *"Now the interesting part. n8n added an AI Agent node. It is exactly what you built in Langflow this morning — a model with a list of tools and a loop. The difference is what's available to put on that list."*

Show the AI Agent node with connector-backed tools attached.

**The comparison, stated plainly — participants deserve a clear answer on "why two tools?":**
| | Langflow | n8n |
|---|---|---|
| Native strength | LLM-first: RAG pipelines, prompt chains, vector stores | Automation-first: hundreds of enterprise connectors, scheduling, error handling |
| Best for | Designing and debugging the *reasoning* | Wiring the reasoning into *real systems* |
| Where it's weaker | Narrow integration surface | LLM plumbing is less ergonomic |

> *"These aren't competitors and you don't have to pick. Langflow is where you design the brain. n8n is where you connect the brain to everything your organisation actually runs."*

#### 5.2c Hands-on: a real action, agent-decided (20 min)
**The build:** extend the Copilot so it can raise a ticket — **but the agent decides whether and when**, not a fixed trigger.

Concretely: when the Copilot cannot answer a question confidently from its documents, it calls a `create_ticket` tool so a human picks it up.

1. An n8n workflow exposing a ticket-creation action
2. Wire it as a tool available to the agent
3. Ask a question the documents genuinely can't answer
4. Watch it decide to escalate — and watch the ticket actually appear

**This closes the loop opened at 9:40 this morning:**
> *"Remember the first thing we did today? It told me it had raised ticket #4471, and that was a lie. Ask it now."*

**Name the workflow-vs-agent distinction, since it's the whole reason 5.2a existed:**
> *"The workflow in 5.2a ran because a trigger fired. This one ran because a model decided it should. Same plumbing, completely different control structure. When a vendor says 'AI-powered automation,' that's the distinction worth asking about — is the AI deciding, or is it decorating?"*

---

## 6. Block 4 — Achievement, Scale, and Three Cliffhangers (75 min)

### 6.1 Named achievement moment (5 min)
**Deliberate, before the tone shifts.** Put it on screen as a list:

> *"Since 9:30 this morning you have built:*
> - *a model that uses a calculator and can be checked*
> - *a retriever that evaluates its own results and tries again*
> - *a database agent — twice, once dangerously and once safely, and you know exactly why the second one is better*
> - *an agent that gained capabilities from a standard protocol without you writing any integration code*
> - *an agent that files a real ticket in a real system when it knows it's out of its depth*
>
> *Five agents. One day."*

### 6.2 Scale theory, guess-gated off that achievement (35 min)
**The pivot:**
> *"Every one of those worked. On your laptop. For you. Now picture 10,000 NDDB employees hitting the RAG Copilot at once. Guess-gate: **what breaks first?**"*

Take predictions. Most guess the LLM. **The honest answer is usually the vector database or the embedding step** — every single query hits both, while LLM output can at least stream. Reveal that, then work through what changes:

**Architecture shifts (~12 min)** — and note explicitly that these are Module 7's named components finally arriving with a purpose rather than as a list:
- **Serving:** one Ollama process is now wrong. **vLLM** or **TGI** — continuous batching (many requests' token generation interleaved rather than serialized) and shared KV-caching. *"This is why those names are in the syllabus."*
- **Vector store:** Day 4's answer — *pgvector is enough for 50 people* — stops holding. **Milvus** or **Qdrant**, sharded and replicated.
- **Caching:** at 50 users caching was an optimization; at 10,000 it's load-bearing. **Redis** in front of the pipeline, because a few hundred common questions will be asked thousands of times a day.
- **Horizontal scale:** multiple serving replicas behind a load balancer, autoscaling on queue depth — **Kubernetes/KServe** earning its place.

**Load-testing methodology (~15 min)** — teach this as a method, it's the part they'll actually use:
- **Tools: Locust** (Python, easy to script realistic user behaviour) or **k6** (JS, CI-friendly)
- **Ramp, don't spike.** Start at 10 concurrent users, step up every few minutes, watch where latency inflects. *"That inflection point is your real capacity. Not the number on a vendor's slide."*
- **The break-it moment of this section — percentiles, not averages:** show a system with a healthy average latency and an ugly p99.
  > *"Average latency lies. p50 of 800ms with a p99 of 14 seconds means one in a hundred requests is a disaster — and with 10,000 users that's hundreds of terrible experiences a day. A dashboard showing only the average would have hidden every one of them."*
- **Test failure modes, not just throughput:** when the vector DB saturates, does it queue gracefully or collapse? When serving saturates, do requests time out cleanly or hang forever?
- **The vendor question, extending Day 4's evaluation scorecard:** *"Show me your load test: what concurrency, and what was p99?"* — the scale-equivalent of *"show me your faithfulness score."*

**Cost reversal (~8 min):** rerun Day 4's team-of-50 calculator at 200× volume. Hosted API cost scales ~linearly with queries; self-hosted GPU cost is largely fixed capacity. **The conclusion flips** — at 10,000 users self-hosting almost certainly wins, which is the opposite of Day 4's answer. *"Same question, different scale, opposite answer. That's why 'which is better' is always the wrong question."*

### 6.3 Guardrails: honestly only half-closed (10 min)
> *"§4.3 fixed one specific danger, architecturally. Let's be precise about what is still completely unsolved:*
> - *Nothing stops a user asking about a chilling centre they have no business seeing — there's no **access control** in anything you built today*
> - *Nothing prevents sensitive data leaving in a prompt — no **DLP**, no **PII masking***
> - *Nothing logs who asked an agent to do what, for audit*
> - *And no one has written down what NDDB's rules even are*
>
> *You've built five agents and secured exactly one query pattern. That gap is tomorrow morning."*

### 6.4 Close — three forward-pointers (10 min)
1. **Governance:** *"You fixed one unsafe query. You have not fixed who is allowed to ask what, what happens to data in transit, or who answers for it when an agent gets it wrong. That's Module 5, first thing tomorrow."*
2. **Harness:** *"Every tool today had a fixed shape — a calculator, a query with parameters, a ticket action. Tomorrow you'll build one that has no fixed shape at all, and then we'll finally name the thing that's been running underneath every AI tool you've touched since Day 1, including Antigravity."*
3. **Skills & multi-agent:** *"And today was one agent getting cleverer. Tomorrow: what happens when one agent isn't enough — and how five separate things you built today become one system."*

**No closing synthesis and no feedback collection today** — Day 5 is mid-weekend. Both belong to Day 6, where they carry the entire course. See `day6_governance_capstone_spec.md`.

---

## 7. Non-goals

- **Do NOT introduce the harness concept, skills, or multi-agent coordination.** All three are Day 6 openers, each motivated by something Day 6 builds. Forward-pointers only (§6.4).
- **Do NOT run §4.2's destructive demo against anything real.** Throwaway database, write-permitted user, tested reset script — or don't run it at all.
- **Do NOT let the free-form SQL agent (§4.2) survive into later sections.** Once §4.3 replaces it, the read-only connection is the only one in use for the rest of the day.
- **Do NOT rebuild the whole Copilot in n8n.** §5.2 is a survey plus one targeted action. A full parallel rebuild is redundant and invites tool fatigue two days after heavy Langflow immersion.
- **Do NOT teach RAG evaluation metrics again** — Day 4 owns them. §6.2 extends to *scale* metrics (latency percentiles, throughput), which are a different family.
- **Do NOT resolve governance today** (§6.3 names the gap on purpose — it's Day 6's opening guess-gate).
- **Do NOT attempt hands-on load testing.** §6.2 is methodology and vocabulary — enough to specify and judge, per the course thesis.

---

## 8. Traceability to `og_requirements.md`

| Syllabus item | Where covered |
|---|---|
| Module 3: Automation & Infrastructure Management (Ansible/Bash/PowerShell, container manifests) | §2.1 debrief of participants' own script-generation attempts |
| Module 3: Database Administration (complex SQL drafting) | §4.2, §4.3 — natural-language-to-SQL, both naive and production-shaped |
| Module 3: Hands-on — "automated end-to-end IT administrative workflow" | §5.2c (Copilot → n8n → real ticket), building on §4.3 |
| Module 4: AI Model Selection & API Consumption (tool/function calling, schemas) | §3.2, §4.4, §5.1 |
| Module 4: Helpdesk Integration (virtual agents, automated resolution) | §5.2c |
| Module 4: ERP/CRM/Email integration surface | §5.2a–b (n8n connector library, surveyed) |
| Module 5 (preview only): guardrails, HITL checkpoints | §4.3 (architectural guardrails), §6.3 (gap named, deliberately unresolved) |
| Module 7: Frameworks — LangChain/**LangGraph**, Ollama | §4.4 |
| Module 7: Model Deployment & Serving — **vLLM, TGI, Triton**, Docker/**Kubernetes/KServe** | §6.2 |
| Module 7: Vector DBs — **Milvus, Qdrant** vs. pgvector at scale | §6.2 |
| Module 7: Performance Optimization — batching, KV-caching, model caching | §6.2 |
| Module 6: Measuring Value & Managing Risk (cost tracking, MTTR) | §6.2 cost reversal |

---

## 9. Definition of done

- [ ] §0.1's safety preconditions are all verified **before** the session — throwaway DB, two labelled connection strings, tested reset script
- [ ] The landscape framing (§2.2) is said out loud at the start, not assumed
- [ ] §3.1's fabricated-ticket moment is dwelt on if it occurs — it's the strongest hallucination demo in the course
- [ ] §4.0's calculator guess-gate is **tested in advance**, and if the model gets the arithmetic right, the *verifiability* framing is used rather than pretending it failed
- [ ] §4.1 is framed as an upgrade to Day 4's Copilot, never as a new build
- [ ] §4.2's success cases are demoed **first**, so the room is genuinely impressed before the failure lands
- [ ] §4.2's destructive prediction is **committed to out loud by participants** before the command is run
- [ ] §4.3's principle is stated as *architecture over validation* — "safe by construction," not "add a filter"
- [ ] §4.3's trade-off (lost flexibility) is admitted honestly, not glossed
- [ ] §4.4 slows down on the tool definition specifically, since §5.1's reveal depends on it
- [ ] §5.1's hands-on ends with the agent using a tool nobody in the room defined
- [ ] §5.1's supply-chain caveat about trusting MCP servers is stated
- [ ] §5.2a runs with no AI involved, so the connector library's value stands on its own
- [ ] §5.2c closes the morning's fabricated-ticket loop explicitly
- [ ] §6.1's achievement list is shown on screen as a list, not narrated in passing
- [ ] §6.2's p99-vs-average moment is delivered as a break-it, not a footnote
- [ ] §6.2's cost conclusion is explicitly contrasted with Day 4's opposite answer
- [ ] §6.3 names all four unresolved gaps (access control, DLP/PII, audit, written policy) without solving any
- [ ] All three forward-pointers in §6.4 are delivered — governance, harness, skills/multi-agent
- [ ] **No** closing synthesis and **no** feedback collection today
