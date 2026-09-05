'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Sparkles, Cpu, GitFork, ArrowRight } from 'lucide-react';

export default function AttentionVsMlpDivisionViz() {
  const [selectedBlock, setSelectedBlock] = useState<'attention' | 'mlp'>('attention');

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-indigo-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-800/40 px-3 py-1 rounded-full w-fit mb-2">
            <GitFork size={14} />
            <span>3B1B Act 4 · DeepMind Interpretability Finding</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            The Critical Division of Labor: Attention vs. MLPs
          </h3>
          <p className="text-slate-400 text-xs font-sans mt-1">
            Why &ldquo;Attention Is All You Need&rdquo; is a misnomer: Attention routes relationships, while Feed-Forward MLPs store world facts.
          </p>
        </div>

        {/* Toggle selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedBlock('attention')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
              selectedBlock === 'attention'
                ? 'bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-600/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            1. Attention Blocks (The Switchboard)
          </button>
          <button
            onClick={() => setSelectedBlock('mlp')}
            className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
              selectedBlock === 'mlp'
                ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            2. MLP Blocks (The Memory Filing Cabinet)
          </button>
        </div>
      </div>

      {/* The Concrete Example: Michael Jordan */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
          The Fact-Retrieval Test:
        </span>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-200 flex flex-wrap items-center gap-2">
          <span>&ldquo;Michael Jordan plays the sport of</span>
          <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
            basketball
          </span>
          <span>&rdquo;</span>
        </div>
        <p className="text-xs font-sans text-slate-300 leading-relaxed">
          The word <em>&ldquo;basketball&rdquo;</em> is nowhere in the input prompt. Where was that factual association stored during training? <strong>In the MLP layers!</strong>
        </p>
      </div>

      {/* Side-by-Side Architectural Division Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Attention Blocks */}
        <div
          onClick={() => setSelectedBlock('attention')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedBlock === 'attention'
              ? 'bg-sky-950/30 border-sky-400 shadow-xl shadow-sky-500/10'
              : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase flex items-center gap-2">
              <Cpu size={16} />
              <span>Multi-Head Attention Layers</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
              ~33% of Parameters
            </span>
          </div>

          <h4 className="text-base font-bold text-white mb-2">The Dynamic Switchboard (Routes Context)</h4>
          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
            Attention blocks <strong>do NOT memorize factual trivia</strong>. Their sole job is to move information between tokens in the sequence—passing &ldquo;fluffy&rdquo; into &ldquo;creature&rdquo; or resolving pronoun referents (&ldquo;it&rdquo; &rarr; &ldquo;tanker&rdquo;).
          </p>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-sky-300 font-mono">
            <strong>Analogy:</strong> The telephone switchboard operator routing communication lines between different departments.
          </div>
        </div>

        {/* Card 2: MLP Blocks */}
        <div
          onClick={() => setSelectedBlock('mlp')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            selectedBlock === 'mlp'
              ? 'bg-purple-950/30 border-purple-400 shadow-xl shadow-purple-500/10'
              : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-2">
              <Database size={16} />
              <span>Feed-Forward MLP Layers</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
              ~67% of Parameters
            </span>
          </div>

          <h4 className="text-base font-bold text-white mb-2">The Memory Filing Cabinet (Stores World Facts)</h4>
          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
            In 2023, DeepMind interpretability researchers discovered that <strong>over 90% of factual knowledge associations</strong> (e.g., Paris &rarr; France, Gandhi &rarr; India) are stored inside the feed-forward MLP weights!
          </p>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-purple-300 font-mono">
            <strong>Analogy:</strong> The massive library archive containing encyclopedias, manuals, and trained factual memory.
          </div>
        </div>
      </div>

      {/* Residual Connection Note */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-sans text-slate-300 leading-relaxed flex items-center gap-3">
        <Sparkles size={20} className="text-amber-400 shrink-0" />
        <div>
          <strong className="text-white font-mono">Why Residual Add Connections ($\Delta E$) Matter:</strong>
          Instead of replacing the vector, each Attention and MLP block simply adds a small change ($\Delta E$) onto the original highway. This prevents vanishing gradients, allowing modern models to stack 96 to 128 layers deep without signal loss!
        </div>
      </div>
    </div>
  );
}
