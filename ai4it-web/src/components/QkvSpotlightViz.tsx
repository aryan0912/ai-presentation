'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, ArrowRight, Zap, Layers } from 'lucide-react';

export default function QkvSpotlightViz() {
  const [selectedWord, setSelectedWord] = useState<'tanker' | 'is' | 'late'>('late');

  const words = [
    { id: 'tanker', word: 'tanker', query: 'Looking for: status/location', key: 'Contains: transport vessel', value: 'Payload: heavy milk carrier [1, 0]' },
    { id: 'is', word: 'is', query: 'Looking for: state predicate', key: 'Contains: tense linking verb', value: 'Payload: present state [0, 1]' },
    { id: 'late', word: 'late', query: 'Looking for: who or what is delayed', key: 'Contains: temporal condition', value: 'Payload: delay attribute [1, 1]' },
  ];

  const current = words.find((w) => w.id === selectedWord) || words[2];

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-950/95 border border-amber-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
            Intuition Visualizer · How Self-Attention Thinks
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            Query, Key, Value (Q, K, V): The Three Lenses on Every Word
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs">Focus Token:</span>
          {words.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelectedWord(w.id as any)}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                selectedWord === w.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              &ldquo;{w.word}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* 3 Lenses Explanation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Lens 1: Query (Orange) */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-amber-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              1. Query Vector (Q)
            </span>
            <span className="text-slate-500 text-[10px]">W_Q &times; x</span>
          </div>
          <div className="text-sm font-bold text-white">&ldquo;What am I looking for?&rdquo;</div>
          <p className="text-slate-300 font-sans text-xs leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            For &ldquo;{current.word}&rdquo;: <span className="text-amber-300 font-bold">{current.query}</span>
          </p>
        </div>

        {/* Lens 2: Key (Blue) */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sky-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              2. Key Vector (K)
            </span>
            <span className="text-slate-500 text-[10px]">W_K &times; x</span>
          </div>
          <div className="text-sm font-bold text-white">&ldquo;What do I contain?&rdquo;</div>
          <p className="text-slate-300 font-sans text-xs leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            For &ldquo;{current.word}&rdquo;: <span className="text-sky-300 font-bold">{current.key}</span>
          </p>
        </div>

        {/* Lens 3: Value (Emerald) */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              3. Value Vector (V)
            </span>
            <span className="text-slate-500 text-[10px]">W_V &times; x</span>
          </div>
          <div className="text-sm font-bold text-white">&ldquo;What information do I pass?&rdquo;</div>
          <p className="text-slate-300 font-sans text-xs leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            For &ldquo;{current.word}&rdquo;: <span className="text-emerald-300 font-bold">{current.value}</span>
          </p>
        </div>

      </div>

      {/* The Filing Cabinet Metaphor Callout */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-sans text-slate-300 leading-relaxed">
        <strong className="text-amber-300 font-mono block mb-1">The Filing Cabinet Search Metaphor:</strong>
        Think of attention like a database query: your <strong>Query (Q)</strong> searches against every file&rsquo;s <strong>Key / Label (K)</strong> using dot-product similarity. When a Key matches your Query, you pull out that file&rsquo;s actual content &mdash; the <strong>Value (V)</strong> &mdash; and pool them together!
      </div>

    </div>
  );
}
