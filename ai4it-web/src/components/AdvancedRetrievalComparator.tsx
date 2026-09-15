'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  GitFork, 
  Layers, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  Sliders, 
  ShieldAlert, 
  HelpCircle,
  Activity,
  FileCheck2
} from 'lucide-react';

export default function AdvancedRetrievalComparator() {
  const [retrievalMode, setRetrievalMode] = useState<'naive' | 'multiquery' | 'hybrid'>('multiquery');
  const [activeTab, setActiveTab] = useState<'retrieval' | 'evaluation'>('retrieval');

  // RAGAS interactive demo state
  const [evalScenario, setEvalScenario] = useState<'grounded' | 'hallucinated' | 'irrelevant'>('grounded');

  return (
    <div className="space-y-8 rounded-3xl bg-slate-950 border border-slate-800 p-6 md:p-8 shadow-2xl">
      {/* Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold mb-1">
            <Sliders size={14} /> Production Search & Verification
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Advanced Retrieval & Evaluation Engine</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Simulate query reformulation for vocabulary mismatch, compare hybrid search ranking, and inspect quantitative RAGAS evaluation metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('retrieval')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'retrieval' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitFork size={13} /> Retrieval Architectures
          </button>
          <button
            onClick={() => setActiveTab('evaluation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'evaluation' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale size={13} /> RAGAS Evaluation & Auditing
          </button>
        </div>
      </div>

      {activeTab === 'retrieval' ? (
        <div className="space-y-6">
          {/* Query Setup Callout */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                The Real-World Dilemma
              </span>
              <div className="text-sm font-semibold text-white">
                User Query: <span className="font-mono text-amber-300">"Why is my tanker late?"</span>
              </div>
              <div className="text-xs text-slate-400">
                Target SOP Entry: <span className="font-mono text-slate-300">"Section 8.2: Delayed Dispatch & Transit Contingency Procedures"</span>
              </div>
            </div>

            {/* Architecture Selector */}
            <div className="flex gap-2">
              <button
                onClick={() => setRetrievalMode('naive')}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold border transition-all ${
                  retrievalMode === 'naive' 
                    ? 'bg-rose-950/40 border-rose-500 text-rose-300 ring-1 ring-rose-500/30' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                1. Naive Semantic
              </button>
              <button
                onClick={() => setRetrievalMode('multiquery')}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold border transition-all ${
                  retrievalMode === 'multiquery' 
                    ? 'bg-sky-950/40 border-sky-500 text-sky-300 ring-1 ring-sky-500/30' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                2. Multi-Query Reformulation
              </button>
              <button
                onClick={() => setRetrievalMode('hybrid')}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold border transition-all ${
                  retrievalMode === 'hybrid' 
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                3. Hybrid BM25 + Rerank
              </button>
            </div>
          </div>

          {/* Architecture Visual Execution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Flow Visualization */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
                <span className="text-slate-300 font-bold uppercase tracking-wider">Execution Pipeline Topology</span>
                <span className="text-slate-500">Method: {retrievalMode.toUpperCase()}</span>
              </div>

              {retrievalMode === 'naive' && (
                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300">Single Embedding Call: embed("Why is my tanker late?")</span>
                    <span className="text-sky-400 font-bold">[1536-dim vector]</span>
                  </div>
                  <div className="flex justify-center text-slate-600">
                    <ArrowRight className="rotate-90" size={16} />
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 flex items-center justify-between">
                    <span className="text-slate-300">Vector Index Search (Nearest Neighbor)</span>
                    <span className="text-rose-400 font-bold">Low Cosine Proximity</span>
                  </div>
                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 text-xs text-rose-300 space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertCircle size={14} /> The Semantic Gap Failure
                    </div>
                    <p className="text-slate-300 leading-relaxed font-sans text-xs">
                      "Tanker" and "Dispatch" belong to slightly different contextual clusters in general embedding space. Because no exact keyword match is performed, the relevant contingency SOP ranks at position #14, completely outside the top-3 context window.
                    </p>
                  </div>
                </div>
              )}

              {retrievalMode === 'multiquery' && (
                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-sky-900/50 space-y-2">
                    <div className="text-sky-400 font-bold flex items-center gap-1.5">
                      <GitFork size={14} /> Multi-Query Reformulation LLM Node:
                    </div>
                    <ul className="space-y-1.5 text-slate-300 pl-2 border-l border-sky-800/40">
                      <li>Q1: "Why is my tanker late?" (Original)</li>
                      <li>Q2: "What factors cause delayed dispatch of milk collection tankers?" (Expanded)</li>
                      <li>Q3: "Standard procedure for milk transport transit delay notifications" (Technical)</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-400">Search 1: 0 hits</div>
                    <div className="p-2 bg-slate-950 rounded border border-sky-800 text-sky-300 font-bold">Search 2: Hit #8.2</div>
                    <div className="p-2 bg-slate-950 rounded border border-sky-800 text-sky-300 font-bold">Search 3: Hit #8.2</div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-emerald-900/40 flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">Merge & Deduplicate: Target SOP #8.2 Captured!</span>
                    <span className="text-[10px] text-slate-400">Deduped Chunks: 4</span>
                  </div>
                </div>
              )}

              {retrievalMode === 'hybrid' && (
                <div className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-sky-900/40 space-y-1">
                      <span className="text-sky-400 font-bold block">Dense Vector Stream</span>
                      <span className="text-[10px] text-slate-400">Semantic cosine similarity over conceptual intent.</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-amber-900/40 space-y-1">
                      <span className="text-amber-400 font-bold block">Sparse BM25 Stream</span>
                      <span className="text-[10px] text-slate-400">Exact lexical keyword frequency (tanker, delay, dispatch).</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-purple-900/40 flex items-center justify-between">
                    <span className="text-purple-300 font-bold flex items-center gap-1.5">
                      <Filter size={14} /> Cross-Encoder Reranker Node (Top 20 → Top 3)
                    </span>
                    <span className="text-[10px] text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                      Score: 0.962
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/50 text-xs text-emerald-300">
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      <CheckCircle2 size={14} /> Maximum Precision Architecture
                    </div>
                    <p className="font-sans text-slate-300 text-xs leading-relaxed">
                      BM25 captures exact route IDs and SOP section numbers; dense search captures contextual symptoms; cross-encoder re-evaluates query-document pairs jointly to guarantee top accuracy.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Output Scorecard */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between font-mono text-xs">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-slate-300 font-bold uppercase tracking-wider">Retrieval Precision Metric</span>
                  <span className="text-[10px] text-slate-500">Benchmark Test</span>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                      <span>Target Chunk Rank:</span>
                      <span className={`font-bold ${
                        retrievalMode === 'naive' ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {retrievalMode === 'naive' ? 'Rank #14 (Missed)' : 'Rank #1 (Retrieved)'}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          retrievalMode === 'naive' ? 'w-[15%] bg-rose-500' : retrievalMode === 'multiquery' ? 'w-[85%] bg-sky-500' : 'w-[98%] bg-emerald-500'
                        }`} 
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 font-sans">
                    <div className="text-[11px] text-slate-400 font-mono">Retrieved SOP Excerpt:</div>
                    <p className="text-slate-200 text-xs leading-relaxed">
                      {retrievalMode === 'naive' ? (
                        <span className="text-rose-300/80 italic">
                          "SOP-102: Vehicle tire maintenance schedules and grease point inspections..." (Irrelevant chunk pulled due to weak semantic match).
                        </span>
                      ) : (
                        <span>
                          "SOP-8.2: In the event of transit delay exceeding 45 minutes, driver must contact central dispatch and log ambient temperature reading..."
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Latency Trade-off:</span>
                <span className="text-slate-300 font-mono">
                  {retrievalMode === 'naive' ? '~45 ms' : retrievalMode === 'multiquery' ? '~280 ms' : '~140 ms'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Evaluation (RAGAS) Tab */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Scenario Controls */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="text-xs font-mono text-rose-400 uppercase tracking-wider font-bold">
                Automated Quality Scoring
              </div>
              <h3 className="text-lg font-bold text-white">RAGAS Evaluation Framework</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rather than trusting subjective "looks good to me" opinions, enterprise AI teams run mathematical ground-truth tests using LLM-as-a-judge.
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Select Test Scenario:</span>
                <button
                  onClick={() => setEvalScenario('grounded')}
                  className={`w-full p-3 rounded-xl text-left text-xs font-mono transition-all border ${
                    evalScenario === 'grounded' 
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Scenario A: Perfect Grounded Retrieval
                </button>
                <button
                  onClick={() => setEvalScenario('hallucinated')}
                  className={`w-full p-3 rounded-xl text-left text-xs font-mono transition-all border ${
                    evalScenario === 'hallucinated' 
                      ? 'bg-rose-950/40 border-rose-500 text-rose-300' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Scenario B: Hallucinated Output (Unfaithful)
                </button>
                <button
                  onClick={() => setEvalScenario('irrelevant')}
                  className={`w-full p-3 rounded-xl text-left text-xs font-mono transition-all border ${
                    evalScenario === 'irrelevant' 
                      ? 'bg-amber-950/40 border-amber-500 text-amber-300' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Scenario C: Irrelevant Chunks (Low Precision)
                </button>
              </div>

              {/* Crucial Vendor Audit Box */}
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs space-y-1.5 mt-4">
                <div className="font-bold text-purple-300 flex items-center gap-1.5">
                  <ShieldAlert size={14} /> The Essential Vendor Question
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed italic">
                  "How did you mathematically measure retrieval precision and faithfulness, and what were your exact RAGAS benchmark numbers?"
                </p>
              </div>
            </div>

            {/* Right Metric Gauges */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs font-mono">
                <span className="text-slate-300 font-bold uppercase tracking-wider">Calculated RAGAS Scorecard</span>
                <span className="text-slate-500">Range: 0.00 – 1.00</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Metric 1: Faithfulness */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Faithfulness</span>
                  <div className={`text-3xl font-extrabold font-mono ${
                    evalScenario === 'hallucinated' ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {evalScenario === 'hallucinated' ? '0.24' : '0.97'}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">
                    Did the answer stick strictly to retrieved context claims?
                  </p>
                </div>

                {/* Metric 2: Context Precision */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Context Precision</span>
                  <div className={`text-3xl font-extrabold font-mono ${
                    evalScenario === 'irrelevant' ? 'text-amber-400' : '0.92'
                  }`}>
                    {evalScenario === 'irrelevant' ? '0.38' : '0.92'}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">
                    Ratio of retrieved chunks that were actually relevant.
                  </p>
                </div>

                {/* Metric 3: Context Recall */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Context Recall</span>
                  <div className="text-3xl font-extrabold font-mono text-emerald-400">
                    {evalScenario === 'irrelevant' ? '0.45' : '1.00'}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">
                    Did the search capture all required information chunks?
                  </p>
                </div>
              </div>

              {/* LLM-as-a-Judge Evaluation Logic */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 font-mono">
                <div className="flex items-center justify-between text-sky-400">
                  <span className="font-bold flex items-center gap-1.5">
                    <FileCheck2 size={14} /> LLM-as-Judge Prompt Rubric:
                  </span>
                  <span className="text-[10px] text-slate-500">Evaluator: Claude-3.5-Haiku</span>
                </div>
                <pre className="text-slate-300 text-[11px] whitespace-pre-wrap leading-relaxed bg-slate-900/80 p-3 rounded border border-slate-800">
{`PROMPT: "Read the Question, Answer, and Retrieved Context below.
Judge whether every factual statement in the Answer is directly entailed
by the Context. If claims are made that are absent from the context,
flag as Unfaithful. Return score 0.0 to 1.0 with justification."`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
