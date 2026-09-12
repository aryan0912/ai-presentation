'use client';
import React from 'react';
import { Network, Database, Layers, ArrowRight, BrainCircuit } from 'lucide-react';
import TokenizationVisualizer from '@/components/TokenizationVisualizer';
import EmbeddingVisualizer from '@/components/EmbeddingVisualizer';
import RnnMemoryDecayViz from '@/components/RnnMemoryDecayViz';
import LstmGateFlowViz from '@/components/LstmGateFlowViz';
import AttentionVisualizer from '@/components/AttentionVisualizer';
import Link from 'next/link';

export default function NLPIntroPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 2 · NLP Foundations</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Teaching Math to Read
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Computers only understand numbers. To teach AI to read, write, and converse, we have to translate the chaos of human language into structured math. 
        </p>
      </div>

      {/* Part 1: Tokenization */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-mono border border-sky-500/40">1</span>
            Step 1: The Tokenizer
          </h2>
          <p className="text-slate-400 mt-1 max-w-2xl text-sm">
            Before an AI can understand a sentence, it chops the text into pieces called <strong>Tokens</strong>. 
          </p>
        </div>
        
        <TokenizationVisualizer />
      </section>

      {/* Part 2: Embeddings */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-mono border border-purple-500/40">2</span>
            Step 2: Word Embeddings (Coordinates of Meaning)
          </h2>
          <p className="text-slate-400 mt-1 max-w-2xl text-sm">
            Once we have tokens, we map them onto a giant 3D graph. Words with similar meanings are plotted physically close together. This allows the AI to perform math on language.
          </p>
        </div>
        
        <EmbeddingVisualizer />
      </section>

      {/* Part 3: The Memory Problem (RNNs & LSTMs) */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm font-mono border border-rose-500/40">3</span>
            The Memory Bottleneck: RNNs & LSTMs
          </h2>
          <p className="text-slate-400 mt-1 max-w-2xl text-sm">
            Reading text in order requires memory. Early AI struggled terribly with this.
          </p>
        </div>
        
        <RnnMemoryDecayViz />
        <LstmGateFlowViz />
      </section>

      {/* Part 4: Intro to Transformers (Attention) */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-mono border border-indigo-500/40">4</span>
            The Breakthrough: Self-Attention
          </h2>
          <p className="text-slate-400 mt-1 max-w-2xl text-sm">
            The solution to the memory bottleneck was to stop reading word-by-word and look at everything at once.
          </p>
        </div>
        <AttentionVisualizer />
      </section>

      {/* Bridge to Transformers */}
      <div className="p-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-blue-400 font-bold">The 2017 Breakthrough</span>
          <h3 className="text-2xl font-bold text-white mt-1">"Attention Is All You Need"</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            LSTMs were still reading word-by-word. Google researchers realized: what if the AI could read the entire book at once, drawing connections between related words instantly? Thus, the Transformer was born.
          </p>
        </div>

        <Link href="/day2/transformer" className="button-primary shrink-0">
          Enter the Transformer <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
