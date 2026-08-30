'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, ListTree, Link2, BookOpen } from 'lucide-react';

export default function NlpIntroPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 2 · Concept Introduction</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Natural Language Processing
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-2xl leading-relaxed">
          How do we teach a mathematical neural network to read a sentence, understand grammar, and fluently translate it into another language?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Challenge of Text */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
            <MessageSquare size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">The Challenge of Text</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Neural networks are purely mathematical machines—they multiply matrices and add vectors. They cannot "read" paragraphs of text. Before we can perform Machine Translation or answer questions, we must convert words into numbers.
          </p>
        </div>

        {/* Tokenization */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
            <ListTree size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Tokenization</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            We split sentences into sequential chunks called <strong>Tokens</strong> (words or sub-words). But an AI cannot look at all 28 tokens at once. It must process them sequentially, one by one, like items on a conveyor belt.
          </p>
        </div>
      </div>

      {/* The Long-Term Dependency Problem */}
      <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900/90 to-purple-950/30 border border-purple-500/30 space-y-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3 text-purple-400 font-mono text-sm uppercase tracking-wider font-bold mb-2">
          <Link2 size={20} />
          <span>The Core Architectural Flaw</span>
        </div>
        
        <h2 className="text-3xl font-bold text-white">The Long-Term Dependency Problem</h2>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
          Imagine translating a 28-word sentence from English to Hindi. If the network is fed one word at a time, how does it connect the <strong>Subject (Token 4)</strong> with the <strong>Verb (Token 28)</strong>? 
        </p>

        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-sm text-slate-400 leading-loose">
          <span>Token 1:</span> <span className="text-slate-500">The</span><br />
          <span>Token 2:</span> <span className="text-slate-500">heavy</span><br />
          <span>Token 3:</span> <span className="text-slate-500">milk</span><br />
          <span className="text-amber-400 font-bold bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/20">Token 4: tanker (Subject)</span><br />
          <span className="text-slate-600 block pl-4 my-2 border-l-2 border-slate-800">...23 tokens pass by...</span>
          <span className="text-rose-400 font-bold bg-rose-950/30 px-2 py-0.5 rounded border border-rose-500/20">Token 28: late (Verb)</span>
        </div>
        
        <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/30 text-blue-200 text-sm leading-relaxed max-w-3xl">
          <strong className="text-blue-400">The Catch:</strong> By the time the network reaches Token 28, it must perfectly remember what the subject was at Token 4. Let's see what happens when we try this in a standard Recurrent Neural Network (RNN).
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
        <Link href="/course-map" className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors">
          <BookOpen size={14} /> Back to Course Map
        </Link>
        <Link href="/day2/rnn" className="button-primary">
          Next: Enter the RNN Architecture <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
