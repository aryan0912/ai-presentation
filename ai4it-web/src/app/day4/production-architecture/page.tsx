'use client';
import React from 'react';
import { ArrowRight, ServerCog, KeyRound, Activity, KeySquare, HardDrive } from 'lucide-react';
import Link from 'next/link';
import MultiQueryDiagram from '@/components/MultiQueryDiagram';
import LocalModelToggle from '@/components/LocalModelToggle';

export default function ProductionArchitecturePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 p-6 md:p-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 4 · Block 2</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Production Architecture & Privacy
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          How do we handle questions that don't perfectly match our documents? And how do we guarantee our internal data never leaves our network?
        </p>
      </div>

      {/* Multi-Query Architecture */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ServerCog className="text-sky-400" />
            1. Multi-Query Generation
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            If the user asks "why is my tanker late" but the document says "delayed dispatch procedures," the retriever misses. We fix this architecturally by having a cheap LLM rewrite the user's question 3 different ways before searching.
          </p>
        </div>
        
        <MultiQueryDiagram />
      </section>

      {/* Local Model Switch */}
      <section className="space-y-6 pt-12 border-t border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <HardDrive className="text-emerald-400" />
            2. Switch to Local Models (Privacy)
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            Self-hosted models like Llama 3, Mistral, and Gemma allow you to build RAG pipelines over confidential data without sending it to a 3rd-party server.
          </p>
        </div>
        
        <LocalModelToggle />
      </section>

      {/* API Mechanics Dashboard */}
      <section className="space-y-6 pt-12 border-t border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="text-amber-400" />
            3. API Mechanics in Context
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            If you are using a hosted API (OpenRouter/OpenAI) for a team of 50 people, you need to understand the mechanics of how that pipeline actually works in production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound size={18} className="text-rose-400" />
              <h3 className="font-bold text-white">Authentication & Keys</h3>
            </div>
            <p className="text-sm text-slate-400">
              Keys are environment variables, never hardcoded. If your key leaks, an attacker can rack up a $10,000 bill in hours.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={18} className="text-orange-400" />
              <h3 className="font-bold text-white">Rate Limiting</h3>
            </div>
            <p className="text-sm text-slate-400">
              What happens when 50 people hit 'send' at exactly 9:00 AM? Your API limits (Requests Per Minute) will block traffic. You must build queues.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <KeySquare size={18} className="text-sky-400" />
              <h3 className="font-bold text-white">Token Usage Tracking</h3>
            </div>
            <p className="text-sm text-slate-400">
              This is the literal unit your API bill is measured in. RAG increases costs because you are passing thousands of tokens of context on every single query.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <ServerCog size={18} className="text-emerald-400" />
              <h3 className="font-bold text-white">Caching & Monitoring</h3>
            </div>
            <p className="text-sm text-slate-400">
              If 5 people ask the exact same question, don't re-embed and re-generate. Cache it. Monitor latency with tools like Langfuse, Prometheus, and Grafana.
            </p>
          </div>
        </div>
      </section>

      {/* Production Defenses: RBAC & Guardrails */}
      <section className="space-y-6 pt-12 border-t border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <KeyRound className="text-rose-400" />
            4. Production Defenses: RBAC & Out-of-Domain Guardrails
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            Two major enterprise vulnerabilities: unauthorized users accessing confidential executive data, and adversarial/irrelevant prompts causing hallucinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              A. Metadata Pre-Filtering (RBAC)
            </h3>
            <p className="text-sm text-slate-300">
              When a junior technician asks: <em>"What is the executive bonus policy?"</em>, standard vector search will retrieve confidential HR chunks if they are in the same vector space.
            </p>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-sky-300 border border-slate-800">
              {`// Ingest with metadata tags:
{ "file": "exec_bonus.pdf", "clearance": "Level_3" }

// Query pre-filtered by user session:
retriever.get_relevant_documents(
  query, 
  filter={"clearance": {"$lte": user_session.clearance}}
)`}
            </div>
            <p className="text-xs text-slate-400">
              The database filters out forbidden chunks <strong>before</strong> similarity search occurs. No unauthorized tokens ever reach the LLM.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              B. Out-of-Domain Guardrails & Refusal
            </h3>
            <p className="text-sm text-slate-300">
              When a user asks: <em>"Who won the 2024 IPL final?"</em> or tries a prompt injection attack, a naive RAG pipeline searches milk plant SOPs and hallucinates bizarre answers.
            </p>
            <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-amber-300 border border-slate-800">
              {`Role: Authorized NDDB Operational Assistant
Constraints:
- You ONLY answer questions grounded in the context.
- If the question is outside plant operations or missing:
  Respond: "Information not found in authorized operational manuals."
- NEVER answer from general world knowledge.`}
            </div>
            <p className="text-xs text-slate-400">
              Enforce a strict refusal boundary at the prompt template level, or use a lightweight classifier gate before triggering vector retrieval.
            </p>
          </div>
        </div>
      </section>

      {/* Bridge to Retrieval Quality */}
      <div className="p-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
        <div>
          <span className="text-xs font-mono uppercase text-blue-400 font-bold">Level 3</span>
          <h3 className="text-2xl font-bold text-white mt-1">Retrieval Quality & Evaluation</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Now that it scales, how do we know if it's actually retrieving the *right* documents, and whether it's telling the truth?
          </p>
        </div>

        <Link href="/day4/retrieval-quality" className="button-primary shrink-0">
          Enter Quality & Eval <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
