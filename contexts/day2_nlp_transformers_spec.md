# Lecture Plan: Day 2 — Memory, Attention, and First Contact with LLMs (Rebuild)
**For: Google Antigravity — build `ai4it-web/src/app/day2/` from this plan**
**Author's role:** Content and pedagogy authority, same standard as `day1_linear_regression_spec.md` and `day1_neural_network_spec.md`. This document supersedes the Day 2 section of `AI4IT_Lecture_Plan.md` and any prior Day 2 build spec.
**Companion docs:** `day1_linear_regression_spec.md`, `day1_neural_network_spec.md` (required reading — this day's vocabulary, dot-product literacy, and "downhill" story all come from there), `contexts/og_requirements.md` (Module 1.2), `contexts/AI4IT_Lecture_Plan.md`.

---

## 0. The design bar

Weekend 1 ends today. The goal is not "cover the material" — it's that the room leaves Sunday evening **feeling powerful, not just informed.** Understanding why a transformer works is necessary but not sufficient for that; watching someone run a real model themselves, having their own progress made visible to them, and knowing something concrete they didn't know Saturday morning (which model they're legally allowed to deploy, for instance) — those are what actually produce the feeling. Design accordingly: if anything has to be cut live, the morning's theoretical completeness is more expendable than the afternoon's hands-on or the closing recap. Those two carry the day's actual payoff.

**Time is not the constraint here, the same way it wasn't for Day 1.** The requirement is that the session be excellent, not that it fit a fixed clock.

---

## 1. Pacing table

| # | Beat | Time | Kind | Connects to Day 1 |
|---|---|---|---|---|
| — | Retrieval quiz (Day 1) | 10 min | ritual | — |
| 1 | Hop 1 — NN → RNN: Giving the Model a Memory | 15 min | problem→reveal | Directly reopens NN Section E's permutation-invariance break-it |
| 2 | Hop 2 — RNN → LSTM: Deciding What to Forget | 15 min | problem→reveal | Same "downhill" training story, new architecture |
| 3 | Hop 3 — LSTM → Transformer: Look at Everything at Once | 15 min | reveal | Parallelism payoff reuses NN 3B.5's `Wx+b` matrix literacy |
| 4 | Attention, By Hand | 20 min | reveal | Dot products reused directly from NN 3B.2/3B.5 |
| 5 | The Order Problem, Again | 8 min | break | Reuses NN Section E's exact break-it demo, second payoff |
| 6 | Tokenization & Embeddings | 20 min | reveal | Vectors, dot products — same vocabulary, new object (words) |
| 7 | Case Study: How Is ChatGPT Actually Built? | 20 min | apply | Bridges to Day 3–4, names the Transformer's "current problem" |
| | *Lunch — hard boundary, theory ends here* | | | |
| 8 | Hands-On: Ollama — Run a Model Yourself | 30 min | hands-on | — |
| 9 | Hands-On: Hugging Face — Find, Compare, and Judge | 30 min | hands-on | Quantization and licensing taught in context here |
| 10 | OpenRouter — One API, Many Providers (Mechanics Only) | 15 min | hands-on | The *why* stays a Day 4 problem, not repeated here |
| 11 | Weekend 1 Closing Synthesis | 15 min | recap | Makes Saturday-to-Sunday progress visible |
| — | Homework brief (Gap Week 1) | 10 min | ritual | — |
| | **Total** | **~243 min (~4h) + quiz/breaks/lunch** | | |

---

## 2. Hop 1 — NN → RNN: Giving the Model a Memory (15 min)

**Do not open with a new problem.** Neural Network's own closing break-it moment — shuffle the 7 days, the feedforward network's prediction doesn't change, because it has zero concept of order — is still live from Saturday. Put it back on screen. *"We left this broken on purpose. A model that can't tell Monday from Sunday can't be trusted with language, where order is everything — 'dog bites man' and 'man bites dog' use the identical words."*

**Reveal:** an RNN reads one item at a time and carries a hidden state forward — a running summary of everything seen so far, updated at each step. Visualize as a single cell processing a sequence left to right, passing a memory vector to itself.

**New problem, stated immediately, not left for the room to discover:** that hidden state gets overwritten at every step, so information from many steps back fades — a festival effect from 3 weeks earlier gets diluted into nothing by the time the model reaches today. Demo: hidden-state memory-decay visualization, an early signal fading to near-zero influence over ~20 steps.

**No hand-derivation of RNN's own backpropagation-through-time required.** This is a conceptual/visual beat — see §9 non-goals.

---

## 3. Hop 2 — RNN → LSTM: Deciding What to Forget (15 min)

**Reveal:** an LSTM adds gates — small learned decisions at each step about what to keep, what to forget, and what to write to memory. Relate directly to something the room already does: *"You already write alert-suppression rules that decide what's worth remembering and what's noise. A gate is the same idea, learned instead of hand-coded."*

**New problem, stated immediately:** gates fix long-range forgetting, but the architecture is still fundamentally sequential — step 50 can't start until step 49 finishes. That's a hard ceiling on speed no amount of better hardware fixes, because the limitation is architectural, not computational. This directly sets up Hop 3's payoff.

**No gate-arithmetic derivation required** — same non-goal as Hop 1.

---

## 4. Hop 3 — The Transformer Deep Dive: The 3B1B Perspective (~120 min)

**Redesigned for intuition-first pedagogy, directly incorporating the mental models from Grant Sanderson's (3Blue1Brown) video.**

The module is structured as a continuous narrative:
1. **Act 1: The Goal & The Hook:** Establishing that a chatbot is simply a next-token predictor wrapped in a user-assistant template. Introduce the Temperature ($T$) slider to show how randomness adds natural flow.
2. **Act 2: Data Representation (Tokens & Embeddings):**
   - *The "Character vs Token" Quiz:* Why not break text into individual characters? (Answer: Context window bloat and semantic loss).
   - *The Mind-Bender (Vector Space Superposition):* Quiz 1: How many mutually perpendicular vectors fit in $n$-D space? (Answer: $n$). Quiz 2: How many if they only have to be "almost" perpendicular (88°-92°)? (Answer: Capacity grows exponentially). This explains how a 12,288-dimensional space can store millions of rich concepts.
3. **Act 3: The Mechanics of Attention (Q, K, V):**
   - *The Fluffy Blue Creature:* Visualizing grammatical routing. The noun "creature" (Query) asks "Are there any adjectives in front of me?". The adjectives "fluffy" and "blue" (Keys) respond.
   - *Dot Product Alignment & Softmax:* Measuring how well Queries and Keys align, and normalizing with Softmax to behave like weights.
   - *The Causal Mask:* Setting future values to $-\infty$ so tokens cannot cheat during autoregressive training.
   - *Value Update:* Moving the actual payload via a low-rank transformation and applying it via a residual connection (adding $\Delta E$ to the original embedding).
4. **Act 4: Scaling Up (Multi-Head & MLPs):**
   - *Multi-Head Attention:* The adjective-noun relationship is just one "head". We run dozens in parallel for grammar, adverbs, etc.
   - *Attention vs MLPs:* The critical division of labor. Attention blocks *route* contextual information. MLP blocks *store* factual world knowledge (e.g., knowing Michael Jordan plays basketball). Repeating this cycle (Attention $\rightarrow$ MLP) up to 96 times enriches the vectors continuously.
5. **Act 5: Core Takeaways:** GPU parallelizability, unsupervised pre-training, and multimodality.

---

## 5. Attention, By Hand (20 min)

**This is the sub-beat that makes Day 2 match Day 1's standard — real numbers, not a diagram alone.** A toy 3-token sentence, kept small enough to compute live: **"tanker is late."**

Assign small, illustrative 2D vectors to each token — same spirit as every prior "untrained starting point" in this course (LR's `m=0,c=2000`, NN's `w1=50,w2=-10`): not claimed to be real trained embeddings, just small enough to compute by hand.

```
tanker = [1, 0]
is     = [0, 1]
late   = [1, 1]
```

**Compute how much "late" should attend to each word** (query = "late"'s own vector, dot-product against every word — including itself):

```
score(late, tanker) = [1,1]·[1,0] = 1
score(late, is)     = [1,1]·[0,1] = 1
score(late, late)   = [1,1]·[1,1] = 2
```

**Turn scores into weights with softmax** (introduce softmax plainly: *"turns any list of numbers into positive weights that sum to 1 — bigger scores get proportionally bigger weight, nothing goes negative"*):

```
e^1 = 2.718,  e^1 = 2.718,  e^2 = 7.389   → sum = 12.825

weight(tanker) = 2.718 / 12.825 ≈ 0.212
weight(is)     = 2.718 / 12.825 ≈ 0.212
weight(late)   = 7.389 / 12.825 ≈ 0.576
```

**Blend the words together using those weights** (weighted sum of the same vectors):

```
new "late" = 0.212×[1,0] + 0.212×[0,1] + 0.576×[1,1] = [0.788, 0.788]
```

*"'Late' just looked at every word in the sentence, decided it was most relevant to itself (58%), and blended in 'tanker' and 'is' equally (21% each). That blended vector — not the original — is what moves forward into the rest of the network. Every word in a real sentence does this simultaneously, for every other word, all at once. That simultaneity is the entire architecture."*

**Required, honest caveat, do not skip:** *"Real transformers don't compare raw word vectors directly — each word gets projected into a Query, a Key, and a Value first, through three separate `Wx+b` layers, so the model can learn what's worth comparing rather than being stuck comparing raw embeddings. You already know why that works — it's the exact same linear layer from Saturday, used three times. We simplified it to one vector per word so the arithmetic stays live-computable; the mechanism is identical, just with three learned lenses instead of one raw one."*

---

## 6. The Order Problem, Again (8 min)

**Reuse NN Section E's exact break-it demo, second payoff.** Shuffle "tanker is late" into "late is tanker" and rerun the attention computation from §5. **The scores are identical** — attention has no built-in sense of position, only content. A feedforward network didn't know Monday from Sunday; attention, unmodified, doesn't know first word from last.

*"Same failure, different disguise. That's not a coincidence — it's because attention is fundamentally the same kind of operation as a plain feedforward layer: a weighted combination of inputs, with no position baked in. The fix has a name, worth knowing even briefly: positional encoding — a small extra signal added to each word's vector before attention runs, so the model can tell 'first' from 'last' even though the attention math itself still can't."* One sentence of resolution is enough here — this isn't a sub-beat that needs its own derivation, it's a payoff for a break-it moment the room already earned on Day 1.

---

## 7. Tokenization & Embeddings (20 min)

**Content:** text → tokens (a live example: split a real sentence, show subword splitting on an uncommon word — this is where most people's mental model breaks, worth showing explicitly). Tokens → vectors: an embedding is nothing but a lookup table, one row per token, and §5's toy vectors were a preview of exactly this. 2D embedding-space cluster map demo: plot related words closer together, unrelated words farther apart, to make "meaning as geometry" visible rather than asserted. Context window: a plain, concrete definition — the number of tokens the model can hold in its attention computation at once, and why that number has a cost (attention computes a score between every pair of tokens — double the sequence, roughly quadruple the comparisons).

---

## 8. Case Study: How Is ChatGPT Actually Built? (20 min)

**Content:** transformer architecture + next-token prediction, trained on massive text, at scale — the same downhill/gradient-descent story from Linear Regression, just with billions of parameters instead of two.

**Close by naming the Transformer's own "current problem" explicitly — this is Hop 4, and it isn't new time, it's a connection that already exists silently in the course and deserves to be said out loud:** *"Everything you've learned today explains how a model like this thinks. It does not explain how it would know anything about NDDB's own chilling-center SOPs — because it doesn't. Frozen at training time, confidently wrong about anything it wasn't shown. That's not a flaw we're leaving unfixed — that's exactly the problem Day 4 solves."* This is the bridge into RAG that the original lecture plan already relies on ("How does Copilot know your codebase?") — say it plainly here instead of leaving it implicit.

---

## 9. Hands-On: Ollama — Run a Model Yourself (30 min)

**Framing, not a new concept:** *"You already know how to run a service on a machine. This is that, with a language model as the payload."* Live: install/pull a small model, run it, send it a prompt, watch it respond. This is the day's first genuine power moment — protect this time above the morning's completeness if anything runs long.

---

## 10. Hands-On: Hugging Face — Find, Compare, and Judge (30 min)

**Framing:** *"A registry, the way Docker Hub is a registry — except what you're pulling is a model, not a container image."* Browse, compare a couple of models for the same task.

**Quantization, taught in context here, not as a slide:** when a model's page shows 4-bit / 8-bit / 16-bit variants, stop and explain the tradeoff live — smaller number, smaller file, faster, less precise; this is the actual, concrete answer to the syllabus's "AI Inference Process: quantization (FP16, INT8, INT4)" item, taught where it's visible rather than abstracted.

**Licensing, taught in context here too:** stop on a model's license tag and walk through what it actually means — personal/research use only, vs. commercial-permitted, vs. the various "non-commercial" (NC) restrictions, vs. gated/open-weight-but-not-fully-open-source models (the Llama Community License is a good concrete example to point at directly). Frame this explicitly as a different kind of power than the technical content: *"This is the difference between confidently telling your procurement team 'we can deploy this' and guessing."* Worth naming the cross-link to Module 5's governance/compliance content on Day 6 when it comes up.

---

## 11. OpenRouter — One API, Many Providers (Mechanics Only) (15 min)

**Mechanics only — the *why* is Day 4's job, not repeated here.** Show the shape of the thing: one API, multiple backend providers, a single call that could hit any of them. **Do not** build the "what if your provider goes down" argument here — that's Day 4's opener, and repeating it here would flatten its payoff two weekends later. If asked why this matters, a single deferring line is enough: *"Good question — that's exactly where Day 4 picks this up."*

---

## 12. Weekend 1 Closing Synthesis (15 min)

**Not a recap of facts — a visible measurement of distance traveled.** Walk backward through the two days out loud: *"Saturday morning, you guessed tomorrow's milk number. By lunch you were hand-computing gradient descent. By Saturday evening you understood what a neuron actually does and why it's called a linear layer. This morning you watched attention decide which word in a sentence mattered most to another word, by hand. This afternoon, you personally ran a real language model, and you can now tell your team which ones you're legally allowed to deploy."* This beat exists specifically to convert accumulated capability into a *felt* sense of it — do not cut this for time; it is one of the two highest-leverage beats in the entire two-day arc, alongside §9.

**Optional, cheap addition:** a peer-visibility moment during §9/§10 — "show your neighbor which model you got running" — external confirmation of competence, not just internal.

---

## 13. Non-goals

- Do NOT hand-derive RNN backpropagation-through-time or LSTM's gate arithmetic. Both architectures are taught as a conceptual bridge toward attention — see §0 and §2/§3 — not as standalone rigorous topics. Neither appears in `og_requirements.md`'s contractual syllabus; both exist purely as narrative scaffolding in the derived lecture plan.
- Do NOT build the full multi-head, multi-layer, learned-Q/K/V-projection version of attention live. §5's simplified single-vector version, with the explicit caveat about what's simplified, is the correct scope for a live room.
- Do NOT repeat Day 4's "why OpenRouter" argument in §11. Mechanics only; defer the reasoning explicitly.
- Do NOT let §9 or §12 get cut to preserve morning completeness under time pressure. If a cut is needed, it comes from the theory chain (§2–§4), not the hands-on afternoon or the closing synthesis.
- Do NOT introduce a new metaphor for the downhill/training story inside the case study (§8). Same "downhill" language as Linear Regression and Neural Networks, just applied at LLM scale.

---

## 14. Traceability to `og_requirements.md`

| Module 1.2 syllabus item | Where it's covered |
|---|---|
| Transformers Architecture: attention, self-attention, parallel processing | §4, §5, §6 |
| Tokenization & Context Windows | §7 |
| Embeddings & Vector Representations | §5 (preview), §7 |
| Foundation Models & LLMs Explained (parameter sizes, model families) | §10 (Hugging Face browsing) |
| AI Inference Process: quantization (FP16/INT8/INT4) | §10, taught in context |
| AI Model Lifecycle: pre-training at scale | §8 |
| AI Model Selection & API Consumption (Module 4, pulled forward) | §9, §10, §11 |

---

## 15. Definition of done

- [ ] Hop 1 opens by reopening Neural Network's actual permutation-invariance demo on screen, not a new example.
- [ ] §5's attention arithmetic is shown as real computed numbers (scores, softmax weights, blended vector), matching the values in this document exactly.
- [ ] §5 includes the required caveat about Q/K/V projections being simplified away — this is not optional, it's what keeps the simplification honest.
- [ ] §6 reruns the exact same computation on the shuffled sentence and shows the scores are identical, not merely asserts it.
- [ ] §8 explicitly states the Transformer's "current problem" (doesn't know NDDB's SOPs) out loud, naming the Day 4 connection directly.
- [ ] §10 covers both quantization and licensing in context during live model browsing, not as separate slides.
- [ ] §11 does not repeat Day 4's resilience argument — mechanics only, with an explicit deferral if asked.
- [ ] §12 (closing synthesis) exists as its own beat, distinct from and prior to the homework brief.
- [ ] No RNN/LSTM gate or backprop-through-time arithmetic appears anywhere in the build.
