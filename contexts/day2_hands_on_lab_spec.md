# Day 2 — The Build Lab: "Your Local AI Stack"
**3-hour hands-on block | NDDB ICT team | zero-code-required, sysadmin-native**

> **Design principle:** seven stations, **one growing artifact.** Participants do not do seven disconnected demos — each station adds a capability to the same stack, and the capstone assembles them into something that does real work on a real log file. They leave with files they own and a thing they can show someone.

---

## 0. CRITICAL PATH — must be done before the room opens

**Nothing in this lab works if the laptops aren't prepared. This is the only part that cannot be improvised in the morning.**

### 0.1 Install on every laptop

| Item | Notes |
|---|---|
| **Ollama** | Installer from ollama.com. Verify `ollama --version` returns. |
| **Models, PULLED IN ADVANCE** | See 0.2. **Do not let 30 people pull models live** — it will saturate the network and burn 40 minutes. |
| **Docker Desktop** *(or LM Studio — see 0.4)* | For Station 4. Verify `docker ps` runs without error. |
| **Open WebUI image, PRE-PULLED** | `docker pull ghcr.io/open-webui/open-webui:main` |
| **A text editor** | VS Code or Notepad++. They'll edit a JSON file and a script. |
| **Python 3.10+** *(only if running the capstone in Python)* | PowerShell alternative provided — see Station 8. |
| **curl** | Built into Windows 10+ as `curl.exe`. **See the PowerShell gotcha in 0.5 — this will bite you.** |

### 0.2 Models to pull (verify exact tags tonight with `ollama pull`)

Pull **two chat models of different sizes** — the size difference is itself a teaching moment (Station 2), not just a convenience.

| Model | Approx size | Why |
|---|---|---|
| `llama3.2:1b` | ~1.3 GB | The "it runs on anything" model. Fast on CPU, visibly weaker. |
| `llama3.2:3b` | ~2 GB | The workhorse. Noticeably better, noticeably slower. |
| `nomic-embed-text` | ~275 MB | Embeddings, Station 7. Not a chat model — that surprise is useful. |

**Do not specify a 7B+ model** unless the laptops have 16 GB+ RAM and you have tested it. A model producing 2 tokens/second will kill the room faster than any lecture.

### 0.3 Accounts and keys

- **Hugging Face** — free account, ideally created in advance. Browsing works logged-out; creating one live wastes 10 minutes.
- **OpenRouter** — **one shared key with a hard credit cap** (a few dollars covers the whole room for Station 5). Do NOT have 30 people each sign up and add payment details in a classroom. Print the key on the handout or put it in a shared file.

### 0.4 One decision to make tonight

**Open WebUI (Docker) or LM Studio (standalone installer)?**

- **Open WebUI** — better for this audience. It's a container talking to a local service on a port; that's their native world. Requires Docker to actually work on these laptops.
- **LM Studio** — safer. Single installer, GUI model browser, built-in local server, no Docker. But it manages its own models separately from Ollama, which muddies the "one local runtime" story.

**Recommendation: Open WebUI if Docker is already standard on these machines; LM Studio if it isn't.** Decide from what's actually installed — do not find out at 10 a.m.

### 0.5 The three gotchas that will derail the morning

1. **PowerShell aliases `curl` to `Invoke-WebRequest`.** `curl http://...` will behave strangely. **Always write `curl.exe` in instructions.** Put this in 20pt on the handout.
2. **Single-quoted JSON doesn't work on Windows.** `-d '{"model":...}'` fails in PowerShell and cmd. Use a file instead: save the body as `body.json`, then `curl.exe http://localhost:11434/api/generate -d "@body.json"`. This is robust everywhere and is also a better habit.
3. **Open WebUI in Docker cannot reach `localhost`** — inside the container, `localhost` is the container. It needs `http://host.docker.internal:11434` to find Ollama on Windows/Mac. Pre-bake this into the run command on the handout.

### 0.6 Non-negotiable

- **Run the entire lab end-to-end on a representative laptop tonight, timed.** Not a spot check — the whole thing, in order, on the hardware the room will actually use.
- **Capture a screenshot or transcript of every station's successful output.** If a laptop, the network, or OpenRouter fails mid-room, the station still runs off the captures. Put them in the web app as a "what you should be seeing" panel.

---

## 1. Where this sits in Day 2

| Block | Min |
|---|---|
| Retrieval quiz (Day 1) — teams, fast | 5 |
| **First contact + the four mysteries** | 25 |
| **Memory & order** — telephone game → RNN → LSTM | 40 |
| *Break* | 15 |
| **Attention** — the fix. Pronoun pair, their own sentences | 50 |
| *Lunch* | 45 |
| **THE BUILD LAB — Stations 1–8** | 180 |
| *(homework brief folds into the capstone debrief)* | — |

**Total 360.** Two hours of intuition, three hours of building, one hour of breaks. That ratio is the whole point.

Concepts that used to be morning lecture — tokenization, context windows, embeddings, temperature, quantization — are **now taught at the station where they're needed**, with hands on keys. Nothing is dropped; it's relocated to where it means something.

---

## 2. The arc — what they feel

Each station resolves one of the morning's mysteries and adds one capability. Say this out loud at the start and put the board on screen, ticking off as you go:

| Station | They build | Mystery it resolves | Min |
|---|---|---|---|
| 1 | A model running on their own machine | *"Where does the AI actually live?"* | 20 |
| 2 | A second model, chosen and pulled themselves | *"Where do models come from?"* | 15 |
| 3 | An API call to their own AI endpoint | *"How would I ever use this in a script?"* | 25 |
| 4 | A ChatGPT-like web UI, self-hosted | *"Could we run this in-house?"* | 20 |
| 5 | A price/latency comparison, local vs cloud | *"What does this cost us?"* | 25 |
| 6 | A measured token budget, a deliberately broken context | *"Why does it forget? Why is it bad at Gujarati?"* | 25 |
| 7 | A tiny semantic search over IT phrases | *"How could it search meaning, not keywords?"* | 25 |
| 8 | **Capstone: a log triage tool** | — assembles 1, 3, 6 | 25 |

---

## STATION 1 — First contact (20 min)

**Do:** `ollama run llama3.2:3b`, ask it anything.

**Then the moment: turn the wifi off.** Ask it something else. It keeps working.

> *"That is a two-gigabyte file on your laptop, holding a conversation with you, with no internet, no API key, and no bill. Whatever you thought AI was — it's a file and a process. You already know how to run those."*

**Then break it, deliberately:**
- Ask it something about NDDB specifically. It invents something confident and wrong. → **Mystery: why does it lie?**
- Ask the same question twice. Different answers. → **Mystery: why isn't it deterministic?**

**They own:** a running local model.

**Instructor note:** don't rush past the wifi-off beat. Let it land. For an infra audience this is the single biggest reframe of the day — AI stops being someone else's cloud service and becomes a workload they could host.

---

## STATION 2 — Where models come from (15 min)

**Do:** open Hugging Face. Look at one model card together — parameters, license, file sizes, quantization variants.

Then `ollama run llama3.2:1b` and ask it the **same question** they asked the 3B.

> *"Same family, same training, one third the size. Watch what you lose — and watch what you gain."*

Side by side: the 1B is faster and visibly worse. That's the entire size/quality/cost tradeoff, experienced instead of explained. Everything Module 7 says about VRAM sizing and quantization now has a reference point they've felt.

**Teach here, not earlier:** parameter counts (callback to Day 1 — *"7 billion of the weights and biases you fitted by hand"*), quantization as "the same model, stored coarser", licenses as a real procurement question.

**They own:** two models, and an opinion about which to use.

---

## STATION 3 — AI as an endpoint (25 min) ⭐

**This is the station that converts the room.** Everything before it is "using an app." This is the moment AI becomes *infrastructure they can wire into things.*

Save `body.json`:

```json
{
  "model": "llama3.2:3b",
  "prompt": "Summarise this in one line: disk /var is at 94% on node-07",
  "stream": false
}
```

Then:

```
curl.exe http://localhost:11434/api/generate -d "@body.json"
```

JSON comes back. **They just called an AI from a terminal, against a service on their own machine.**

Then let them change the prompt in the file and re-run. Then add `"stream": true` and watch it arrive token by token — a free, visceral demonstration that generation is sequential, one token at a time. That's the next-token concept delivered without a slide.

**Teach here:** it's a normal HTTP service on a port. It has a process, logs, a port, and resource usage. They can monitor it, restart it, put it behind a proxy. This is their job description applied to AI.

**They own:** `body.json` and a working curl command.

---

## STATION 4 — Give it a face (20 min)

**Do:** run Open WebUI in Docker, pointed at their Ollama:

```
docker run -d -p 3000:8080 ^
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 ^
  -v open-webui:/app/backend/data ^
  --name open-webui ghcr.io/open-webui/open-webui:main
```

Open `localhost:3000`. It's a ChatGPT-like interface — **running entirely on their laptop.**

> *"Nothing you type here leaves this machine. Consider what that means for the documents you couldn't paste into ChatGPT."*

That sentence is the Module 5 data-privacy argument, delivered at the exact moment they can feel it. Let it sit.

**They own:** a self-hosted AI chat interface. This is the station that makes people take photos of their own screen.

**Fallback:** if Docker misbehaves, LM Studio reaches the same destination. Don't debug Docker for 30 people — switch and move.

---

## STATION 5 — Local vs cloud, and what it costs (25 min)

**Do:** OpenRouter with the shared key. Send the **same prompt** to three models — one small, one mid, one frontier-class. Record three things in a table they fill in themselves:

| Model | Answer quality (1–5, their call) | Latency | Cost per 1M tokens |
|---|---|---|---|

Then add a fourth row: **their local 3B**, which costs ₹0 and leaks nothing.

> *"Now you have a procurement conversation instead of an opinion. Some jobs need the frontier model. Most jobs don't. You now have the data to argue either way."*

**Teach here:** one API, many providers; why you'd avoid vendor lock-in; why routing by task matters. This is Module 4's model-selection content, delivered as an experiment rather than a slide.

**They own:** a filled-in comparison table — a genuine artifact they can take to management.

**Cost control:** one key, hard cap, short prompts. Have captured results as fallback if the network is bad.

---

## STATION 6 — Tokens, money, and Gujarati (25 min) ⭐

**Do:** open a tokenizer, paste their own text. Watch it split. Watch the count.

Then **paste Gujarati or Hindi** and watch the token count explode — the same sentence costing several times more than English.

> *"Module 1 promised vernacular interfaces for milk producers. Here's what nobody mentions: the same sentence in Gujarati can cost several times what it costs in English, and fits in a fraction of the context. That's a real budget line and a real design constraint. You found it on day two."*

**Test the exact text tonight so you know the number before you're standing in front of them.**

Then break the context window on purpose: paste a long document into Open WebUI, keep chatting, watch the model lose the original instruction. *"Where did it go?"* — that's eviction, felt rather than described.

**Teach here:** tokens ≠ words; context window as a hard budget; why your prompt got truncated; why long chats drift.

**They own:** a measured token cost for their own language — and a finding worth escalating.

---

## STATION 7 — Meaning, not keywords (25 min)

**Do:** `nomic-embed-text` via the API. Point out immediately that it **doesn't chat** — ask it something and you get numbers. That surprise is the lesson: not all models talk.

Embed a handful of IT phrases:

```
"server down"  "host unreachable"  "box is dead"  "machine not responding"
"server upgrade"  "scheduled maintenance"  "milk collection delayed"
```

Compare similarity. The first four cluster together despite sharing almost no words. "Server upgrade" sits far away despite sharing a word with "server down".

> *"Keyword search would have matched 'server upgrade' and missed 'box is dead'. This matches the way your team actually writes tickets."*

Then let them add **their own ticket phrasings** and see where they land.

**Teach here:** embeddings as coordinates for meaning; cosine similarity without the formula; why this is the foundation of search that works.

**They own:** a tiny semantic search over their own vocabulary — **and the exact mechanism Day 4's RAG is built on.** End with: *"Remember this. On Day 4 we point it at NDDB's SOPs."*

---

## STATION 8 — CAPSTONE: the log triage tool (25 min)

**The payoff. Assembles Stations 1, 3, and 6 into something that does their actual job.**

Give them a messy sample log — mixed services, a couple of real errors buried in noise. Give them a script (PowerShell and Python versions, both under 20 lines) that reads the file, sends it to their local model with a system prompt, and prints structured triage.

The **system prompt is the part they edit**, and it's where the learning is:

```
You are an IT operations assistant. Given raw log lines, return exactly:
SEVERITY: (critical/warning/info)
SERVICE: (which service failed)
LIKELY CAUSE: (one line)
FIRST ACTION: (one concrete step)
Do not speculate beyond the log content.
```

Run it. It works. **Then have them tune the prompt for their own environment** — their service names, their severity language, their runbook conventions.

**Then, deliberately, break it:** feed it a log with an error it can't explain. Watch it invent a plausible cause. → *"Mystery one, answered. It lies because it's built to produce the most likely next words, not the true ones. Every guardrail we discuss on Day 6 exists because of what you just watched."*

**They own:** a working log triage tool, with a prompt they wrote, running on a model on their own machine, with no cloud and no bill.

---

## 3. Making it feel like they built something

The engineering is necessary but not sufficient. These four things create the ownership feeling, and they're nearly free:

1. **Name it.** Not "the script" — *"your NDDB Log Triage Assistant."* Have them put their own name in a header comment. Naming creates ownership; it's the cheapest trick in workshop design and it works every time.
2. **One folder, theirs.** `C:\ai-lab\` — `body.json`, the comparison table, the phrase list, the triage script. At the end: *"Everything in that folder, you made today."*
3. **Show and tell — 10 minutes, three volunteers.** Someone demos their tuned prompt. Social proof does more for retention than any recap slide, and it generates the Day 3 checkpoint energy for free.
4. **A one-page takeaway** listing what they built, where the files are, and the exact commands to restart it all on Monday. Without this, 80% of it evaporates by the next weekend.

---

## 4. Failure plan

| If this breaks | Do this |
|---|---|
| A laptop can't run Ollama | Pair them up. Two to a machine is fine and often better — they talk to each other. |
| Docker won't cooperate | Switch that person to LM Studio. Don't debug in front of the room. |
| Network dies | Stations 1–4 and 6–8 are **fully offline.** Only Station 5 (OpenRouter) and the HF browsing in Station 2 need internet. Run the captures for those and move on. |
| Model is too slow on weak hardware | Drop everyone to `llama3.2:1b`. Speed matters more than quality for every station except 2 and 8. |
| Running long | **Station 4 is the designed cut** — it's the most impressive and the least essential. Station 7 must survive; Day 4 depends on it. |

**Have a floating helper.** One person circulating to unstick individuals is worth more than any amount of prepared material — a stuck participant at station 3 is lost for the rest of the afternoon.

---

## 5. What this replaces from the original Day 2

Nothing is dropped. It is relocated from lecture into hands:

| Original plan item | Now |
|---|---|
| Tokenization, context window (30 min lecture) | Station 6, hands-on |
| Embeddings + 2D cluster map (part of the 30) | Station 7, hands-on |
| Quick infra aside — languages, frameworks (10 min) | Stations 1–4, experienced |
| Model lifecycle, inference, quantization (20 min) | Station 2, felt as 1B vs 3B |
| Case study: "how ChatGPT is built" (30 min) | Capstone debrief — they assemble it themselves |
| RNN (55) + LSTM (45) = 100 min | Compressed to 40 min, as the telephone game |

The RNN/LSTM compression is what funds the lab. Those two architectures have real narrative value — *the memory problem, two attempts, and the failure that produced attention* — and close to zero operational value for this audience. They will never host one. They will host what's in this lab.
