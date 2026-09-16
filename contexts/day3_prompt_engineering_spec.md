# Lecture Plan: Day 3 — Talking to the Machine: Industry Standards & The Art of Prompting
**For: Google Antigravity — build `ai4it-web/src/app/day3/` from this plan**
**Author's role:** Content and pedagogy authority, same standard as `day1_linear_regression_spec.md`, `day1_neural_network_spec.md`, `day2_nlp_transformers_spec.md`, and `day4_rag_architecture_spec.md`. This document supersedes the Day 3 section of `AI4IT_Lecture_Plan.md`.
**Companion docs:** `contexts/og_requirements.md` (Modules 2, 3), `contexts/AI4IT_Lecture_Plan.md`, `delivery/day1/*`, `delivery/day2/*`.

---

## 0. What kind of day this is

Days 1–2 were mostly *this webpage teaches the concept*. Day 3 flips that: most of the actual learning happens in real tools — ChatGPT, Claude, Gemini, Copilot in the morning, and **Langflow** in the afternoon. **The `ai4it-web` pages for Day 3 are lesson companions, not interactive demos** — they hold the comparison tables, the exact prompts to try, the frameworks, and the exercise prompts, while the actual "doing" happens in the participant's own browser tab.

**Time is not the constraint, same policy as every prior day.** The updated four-block schedule below provides plenty of time for hands-on experimentation, visual pipeline wiring, and troubleshooting.

**The narrative arc for the whole day:** 
*Prompting is powerful and structured output makes it usable for IT $\rightarrow$ but prompt engineering alone hits a wall (doesn't know internal documents, can't cite, knowledge cutoffs) $\rightarrow$ before lunch we introduce Langflow to turn prompts into visual pipelines (scraping a webpage/processing text) $\rightarrow$ after lunch we replace that static input with full RAG plumbing (chunk, embed, store, retrieve) so every participant ends the day with a working, self-assembled RAG bot.*

---

## 0.1 Pre-session requirements & De-risking Langflow

In this updated schedule, **Langflow is introduced before lunch (11:30–01:30)** rather than late in the afternoon. This completely de-risks the workshop:
- Environment and browser connectivity are verified before lunch.
- Participants get an early, low-stakes win (simple Webpage Analyzer / Text Prompt flow).
- The 1-hour lunch break serves as a natural buffer to rescue any laptop/Python/API-key issues.
- When they return for RAG at 02:30, Langflow is already familiar.

---

## 1. Pacing & Schedule Table

| Block | Time | Duration | Beat & Technical Focus | Delivery Kind |
|---|---|---|---|---|
| **1** | **09:30–11:30** | **120 min** | **Context, Comparison & The Art of Prompting** | ritual → context → hands-on |
| | 09:30–09:50 | 20 min | Retrieval Quiz (Weekend 1 recap) + Checkpoint | ritual |
| | 09:50–10:15 | 25 min | Module 3: Where AI Already Lives in IT (7 discipline hooks) | context |
| | 10:15–10:30 | 15 min | Enterprise Tool Comparison (OpenAI vs. Copilot vs. Gemini vs. Local) | comparison |
| | 10:30–11:30 | 60 min | **Prompt Engineering in Action:**<br>• Guess-gated live prompt variations<br>• The R-C-I-I-O-C Framework (Role, Context, Instruction, Input, Output, Constraints)<br>• 5 Named Patterns (Persona, Template, Recipe, Error-Explainer, Auditor)<br>• Zero-shot, Few-shot, Chain-of-Thought (CoT), ReAct preview<br>• **Centerpiece: Structured Output (Strict JSON vs. rambling prose)**<br>• Varied IT exercises (SOP drafting, log parsing, ticket extraction)<br>• **The Limitation Reveal:** Asking about internal NDDB SOPs $\rightarrow$ hallucination/wall | hands-on in browser tabs |
| *Flex Note* | *11:15–11:30* | | *If prompt engineering finishes early, transition into Langflow ahead of schedule.* | |
| **2** | **11:30–01:30** | **120 min** | **Meet Langflow: Turning Prompts into Visual Pipelines** | orientation → visual build |
| | 11:30–11:55 | 25 min | **Langflow Orientation:** Canvas anatomy, node inputs/outputs, parameters, running flows | orientation |
| | 11:55–12:45 | 50 min | **Pipeline 1 Hands-On: Webpage / Text Analyzer:**<br>• URL / Web Scraper Node (or Raw Text Input)<br>• Prompt Template Node (**Connecting morning's R-C-I-I-O-C directly to the canvas!**)<br>• LLM Node (OpenRouter / OpenAI chat model)<br>• Chat / Text Output | guided visual build |
| | 12:45–01:30 | 45 min | **Testing, Variation & Room Verification:**<br>• Run the flow on live web pages and error logs<br>• Catch and resolve any participant port, browser, or API key errors<br>• **Milestone:** Everyone goes to lunch with a working, green-lit Langflow pipeline | experimentation & rescue buffer |
| *Lunch* | *01:30–02:30* | *60 min* | *Lunch Break (Natural buffer for any remaining machine troubleshooting)* | |
| **3** | **02:30–03:30** | **60 min** | **RAG Architecture: Component by Component** | architectural reveal |
| | 02:30–03:30 | 60 min | **Component Walkthrough & Guess-Gates:**<br>• The Core Challenge: 500-page manuals vs. token limits<br>• 1. Chunking (size vs. overlap tradeoffs)<br>• 2. Embedding (meaning as geometry, callback to Day 2)<br>• 3. Vector Database (indexing high-dimensional vectors)<br>• 4. Retrieval (cosine similarity & top-$k$ selection)<br>• 5. Augmentation (stuffing context into the morning's prompt template!)<br>• 6. Generation (grounded next-token prediction) | conceptual walkthrough |
| **4** | **03:30–05:30** | **120 min** | **Hands-On: Build the Full RAG Pipeline & Day Close** | hands-on assembly → close |
| | 03:30–04:45 | 75 min | **Pipeline 2 Assembly in Langflow (with Checkpoint Gates):**<br>1. Document Loader Node<br>2. Chunker Node [Checkpoint Gate 1]<br>3. Embedder Node<br>4. Vector Store Node (Chroma/FAISS) [Checkpoint Gate 2]<br>5. Retriever Node<br>6. **Prompt Template Node [The Grand Connection Gate 3]**<br>7. LLM Chat Node<br>8. Chat Interface execution | guided assembly |
| | 04:45–05:15 | 30 min | **Testing, Verification & Grounding:**<br>• Ask questions directly from the uploaded document<br>• Observe citations, accuracy, and refusal when facts are absent | testing & validation |
| | 05:15–05:30 | 15 min | **Sense of Achievement & Day 4 Setup:**<br>• Celebrate building a working custom RAG bot<br>• **Homework Brief:** Bring clean, non-confidential department files tomorrow for Docling, Multi-Query, and Hybrid Search upgrades | wrap-up |

---

## 2. Block 1 — Context, Comparison & The Art of Prompting (120 min)

### 2.1 Retrieval Quiz (Weekend 1) + Checkpoint (20 min)
- Standard ritual. 2–3 participants briefly share experiences with their gap-week Antigravity build.

### 2.2 Module 3: "Where AI Already Lives in IT" (25 min)
**Framing:** *"This isn't a demo reel. Everything here is raw material for the AI-use policy your own department will need."*
One 3-minute IT hook per discipline:
1. **Software Dev & Code Review:** AI catching null pointers and off-by-one errors during PR reviews.
2. **IT Ops / AIOps:** Metric drift anomaly detection before pager duty triggers.
3. **Cloud Administration:** Plain-English infra requests translated to Terraform snippets for human review.
4. **Cybersecurity:** SIEM alert prioritization (distilling 1,000 alerts down to the 3 real incidents).
5. **ITSM / Helpdesk:** Auto-tagging ticket category, sentiment, and routing priority.
6. **Database Administration:** Query explain plan analysis and candidate index suggestions.
7. **Disaster Management:** First-pass incident timeline reconstruction from distributed server logs.

### 2.3 Tool Comparison — Enterprise Perspective (15 min)
Walk through the trade-offs before opening tools:
- **ChatGPT (OpenAI):** Broadest capability, plugin ecosystem; requires Enterprise tier for zero data-retention guarantees.
- **Microsoft Copilot (M365 & GitHub):** Deepest integration into existing corporate Microsoft compliance boundaries.
- **Google Gemini Enterprise:** Strong integration for Workspace environments with enterprise privacy controls.
- **Open-source / Self-hosted (Llama 3, Mistral, Gemma via Ollama):** 100% data sovereignty; you own the hosting and compliance burden.
*Punchline:* *"There is no universally 'best' tool—there is only the best tool for your security and data constraints."*

### 2.4 Prompt Engineering Hands-On in Browser Tabs (60 min)
Participants open their own tools (ChatGPT/Claude/Gemini/Copilot).
1. **Live Guess-Gate Prompts:** Compare two subtly different prompts; observe dramatic divergence in output quality.
2. **The R-C-I-I-O-C Framework:**
   - **R**ole: *"You are a senior DBA reviewing a slow query."*
   - **C**ontext: *"This query runs every 5 minutes on a table with 40M rows."*
   - **I**nstruction: *"Suggest an index that would speed this up."*
   - **I**nput Data: `[paste SQL query]`
   - **O**utput Format: *"Respond with just the CREATE INDEX statement, one line."*
   - **C**onstraints: *"Do not rewrite the query itself."*
   - Show how stripping elements degrades performance.
3. **5 Named Patterns:** Persona, Template, Recipe, Error-Explainer, Auditor.
4. **Zero-Shot / Few-Shot / Chain-of-Thought (CoT) / ReAct (preview).**
5. **Centerpiece — Structured Output:**
   *Say explicitly:* *"Scripts cannot parse conversational prose. Scripts parse JSON. Structured output is what turns an LLM from a chat toy into programmable IT infrastructure."*
   - Unstructured output vs. strict JSON schema output.
6. **Varied IT Exercises:**
   - Exercise 1: SOP drafting from rough bullet points.
   - Exercise 2: Parsing dirty Linux syslog entries into JSON (`timestamp`, `severity`, `service`, `message`).
   - Exercise 3: Categorizing helpdesk tickets into JSON.
7. **The Limitation Reveal (The Bridge to Langflow & RAG):**
   - *"Ask your tool about an internal NDDB plant SOP or something that happened today."*
   - Watch it hallucinate or refuse.
   - *Punchline:* *"It doesn't know your documents. You cannot prompt your way out of missing knowledge. That requires architecture."*

---

## 3. Block 2 — Meet Langflow: Visual Prompt Pipelines (120 min)

### 3.1 Langflow Orientation (25 min)
- Open Langflow locally.
- Explain the canvas: Nodes, Inputs, Parameters, and Output sockets.
- Emphasize: *"Langflow is not coding—it is visual plumbing for the prompts you just wrote."*

### 3.2 Pipeline 1 Hands-On: Webpage / Text Analyzer (50 min)
Assemble a 4-node flow live:
1. **Web Scraper / URL Loader (or Raw Text Node):** Ingests live text or a public URL.
2. **Prompt Template Node:** 
   - **The Aha Moment:** Re-use the morning's **R-C-I-I-O-C** framework!
   - Define template:
     ```
     Role: You are an IT systems analyst.
     Context: The following text was extracted from a web source: {webpage_text}
     Instruction: Analyze the system architecture and list potential security vulnerabilities.
     Output Format: Output as a JSON object with keys "summary" and "vulnerabilities".
     ```
   - Show that `{webpage_text}` automatically generates an input socket on the node!
3. **LLM Node:** Connect to OpenRouter / Chat Model.
4. **Chat / Text Output:** View the parsed JSON result.

### 3.3 Testing, Variations & Room Verification (45 min)
- Run the pipeline on 2–3 different IT URLs or pasted log files.
- Walk the room to verify every participant's pipeline is running and producing valid output.
- **De-risking buffer:** Any participant facing port conflicts, Ollama/OpenRouter API issues, or UI hangs gets resolved now.
- **Milestone:** Every single participant leaves for lunch with a functioning visual pipeline on their screen.

---

## 4. Block 3 — RAG Architecture: Component by Component (60 min)

Reveal the 6 components of Retrieval-Augmented Generation before building:
1. **Chunking:** Why we cannot pass 400 pages at once. Window size vs. context loss.
2. **Embedding:** Mapping text to high-dimensional semantic coordinates (direct callback to Day 2).
3. **Vector Database:** Indexing semantic coordinates for lightning-fast approximate nearest neighbor (ANN) search.
4. **Retrieval:** Querying the vector space using the embedded user question to find the top-$k$ relevant chunks.
5. **Augmentation:** Slotting the retrieved chunks into the `{context}` variable of the prompt template.
6. **Generation:** Grounded generation where the LLM synthesizes an answer strictly from the retrieved chunks.

*Explicit Callback:*
> *"Every single piece connects to what you've learned. Embedding is Day 2. Augmentation is literally the R-C-I-I-O-C template from this morning, with the retrieved chunks slotted into Context. Nothing here is new magic—it's new plumbing."*

---

## 5. Block 4 — Build It: Full RAG Pipeline in Langflow (120 min)

### 5.1 Assembling Pipeline 2 (75 min)
Build the complete RAG chatbot node by node with strict Checkpoint Gates:
1. **Document Loader Node:** Load sample SOP or technical manual.
2. **Recursive Character Text Splitter (Chunker):** Set chunk size to 500, overlap to 50. **[Checkpoint Gate 1 - Hands up when connected]**
3. **Embedder Node:** Select embedding model.
4. **Vector Store Node (Chroma / In-Memory):** Connect chunker and embedder. **[Checkpoint Gate 2 - Hands up]**
5. **Retriever Node:** Expose vector search with $k=4$.
6. **Prompt Template Node [The Climax of the Day]:**
   - Show how the retriever output plugs directly into the `{context}` variable:
     ```
     Role: You are an authorized NDDB technical operations assistant.
     Context: Use ONLY the following retrieved operational passages: {context}
     Instruction: Answer the user's question: {question}
     Constraints: If the answer is not in the context, say "Information not found in authorized documents."
     ```
   - **[Checkpoint Gate 3 - Stop the room and celebrate this connection]**
7. **LLM Node & Chat Output Interface:** Complete the loop.

### 5.2 Testing, Grounding & Verification (30 min)
- Ask questions directly answered by the document $\rightarrow$ Observe precise citations and grounded answers.
- Ask questions deliberately omitted from the document $\rightarrow$ Observe the model cleanly refusing instead of hallucinating.

### 5.3 Sense of Achievement & Day 4 Setup (15 min)
- Celebrate: Every participant has built a fully functional RAG pipeline.
- **Homework Brief:** Bring non-confidential department files (PDFs, manuals, SOPs) for tomorrow.
- Forward pointer: *"Tomorrow morning, we export this visual pipeline into Antigravity to see the Python code, fix messy PDF layouts with Docling, upgrade retrieval with Multi-Query and Hybrid Search, and make it enterprise-secure."*

---

## 6. Definition of Done for Day 3 Spec

- [x] Langflow introduced before lunch (Block 2) with a simple Webpage / Text Analyzer pipeline.
- [x] Lunch break positioned as a 60-minute technical buffer to de-risk room-wide setup.
- [x] Morning prompt engineering connects directly to Langflow's Prompt Template node (`R-C-I-I-O-C`).
- [x] Structured output (JSON) delivered as the IT centerpiece.
- [x] Full RAG architecture explained conceptually in Block 3 and assembled hands-on in Block 4.
- [x] Checkpoint gates enforced at nodes 2, 4, and 6 during the RAG assembly.
- [x] Homework brief clearly states file size guidelines and confidentiality guardrails.
