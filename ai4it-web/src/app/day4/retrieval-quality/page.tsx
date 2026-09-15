'use client';
import React from 'react';
import { ArrowRight, Scale, Filter, Search, FileCheck } from 'lucide-react';
import Link from 'next/link';
import HybridSearchVisualizer from '@/components/HybridSearchVisualizer';
import AdvancedRetrievalComparator from '@/components/AdvancedRetrievalComparator';

export default function RetrievalQualityPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 p-6 md:p-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 4 · Block 3</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Retrieval Quality & Evaluation
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          How do we improve the results of our search? And more importantly, how do we prove to our stakeholders that the RAG pipeline is actually grounded in reality and not just hallucinating fluently?
        </p>
      </div>

      {/* Primary Interactive Workbench: Multi-Query, Hybrid, and RAGAS */}
      <section className="space-y-6">
        <AdvancedRetrievalComparator />
      </section>

      {/* Hybrid Search */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Search className="text-sky-400" />
            1. Hybrid Search
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            Semantic Vector search is incredible at finding concepts. But it completely fails at finding exact alphanumeric identifiers like error codes, hostnames, or part numbers.
          </p>
        </div>
        
        <HybridSearchVisualizer />
      </section>

      {/* Reranking */}
      <section className="space-y-6 pt-12 border-t border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Filter className="text-amber-400" />
            2. Reranking (The Funnel)
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            Hybrid search returns the top 20 candidate chunks. But the LLM context window can only hold a few, and the order matters. We use a "Cross-Encoder" to re-score and filter those 20 down to the top 3.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center max-w-2xl mx-auto relative">
          <div className="flex gap-2 justify-center flex-wrap max-w-sm mb-4">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`w-8 h-8 rounded border ${i < 3 ? 'bg-emerald-950/50 border-emerald-500/50' : 'bg-slate-900 border-slate-800'} flex items-center justify-center text-[10px] text-slate-500`}>
                doc
              </div>
            ))}
          </div>
          <div className="text-xs text-slate-400 mb-6 font-mono">20 Chunks from Hybrid Search</div>

          <div className="border-t-[60px] border-l-[40px] border-r-[40px] border-t-amber-900/40 border-l-transparent border-r-transparent w-48 relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-amber-400 font-bold text-sm bg-amber-950 px-3 py-1 rounded-full border border-amber-900 shadow-[0_0_15px_rgba(245,158,11,0.2)] whitespace-nowrap">
              Cross-Encoder Reranker
            </div>
          </div>

          <div className="text-xs text-slate-400 mt-6 mb-4 font-mono">Top 3 Chunks sent to LLM</div>
          <div className="flex gap-4 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 bg-emerald-950 border border-emerald-900 rounded-lg text-emerald-400 text-xs font-bold shadow-lg">
                High-Relevance Doc {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation */}
      <section className="space-y-6 pt-12 border-t border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Scale className="text-rose-400" />
            3. RAG Evaluation vs. LLM Evaluation
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            When a vendor proposes building a RAG system for NDDB, "how did you measure retrieval quality and groundedness?" is the highest-value question you can ask. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg font-bold text-slate-300 mb-4 pb-2 border-b border-slate-800">LLM Evaluation</h3>
            <p className="text-sm text-slate-400 mb-4">
              "Is GPT-4 smarter than Claude 3?"<br/><br/>
              This evaluates the underlying foundation model independent of your documents or pipeline. You generally don't do this yourself; you rely on public leaderboards.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/50 shadow-[0_0_20px_rgba(225,29,72,0.05)]">
            <h3 className="text-lg font-bold text-rose-400 mb-4 pb-2 border-b border-rose-900/50">RAG Evaluation (RAGAS)</h3>
            <p className="text-sm text-slate-300 mb-4">
              "Did we retrieve the right chunks, and did the answer stick to them?"
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FileCheck size={16} className="text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Faithfulness</strong>
                  <span className="text-slate-400">Did the final answer hallucinate, or is every claim supported by the retrieved context?</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <FileCheck size={16} className="text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Context Precision / Recall</strong>
                  <span className="text-slate-400">Did we retrieve garbage, or did we successfully pull the actual SOP needed to answer the question?</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-6 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 italic flex items-start gap-4">
          <div className="p-2 bg-slate-900 rounded border border-slate-700 shrink-0 font-bold text-sky-400">LLM-as-Judge</div>
          <p>
            How do we score thousands of outputs for "Faithfulness" without a human reading all of them? We use the R-C-I-I-O-C prompt framework from yesterday to write a strict rubric, and have a strong model (like GPT-4) score the RAG pipeline's answers automatically. <strong>Yesterday's skill is today's quality gate.</strong>
          </p>
        </div>
      </section>

      {/* Bridge to Decision Exercise */}
      <div className="p-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
        <div>
          <span className="text-xs font-mono uppercase text-blue-400 font-bold">Level 4</span>
          <h3 className="text-2xl font-bold text-white mt-1">The Team of 50 Exercise</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            You know how to build it. You know how to measure it. Now, it's time to make the hard architectural decisions for your department.
          </p>
        </div>

        <Link href="/day4/decision-exercise" className="button-primary shrink-0">
          Enter The Decision Exercise <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
