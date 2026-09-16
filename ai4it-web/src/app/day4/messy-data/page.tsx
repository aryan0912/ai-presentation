'use client';
import React from 'react';
import { ArrowRight, Code2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import DoclingVisualizer from '@/components/DoclingVisualizer';
import InteractiveCodeAnnotator from '@/components/InteractiveCodeAnnotator';

export default function MessyDataPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 p-6 md:p-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-950/40 border border-sky-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 4 · Block 1</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Messy Data & The Code Underneath
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Yesterday, you built a working chatbot on a clean text file. But enterprise data is never clean text. Let's point your pipeline at a real-world document and watch it break.
        </p>
      </div>

      {/* Docling Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="text-rose-400" />
            The Extractor Failure
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            This is, word for word, what the syllabus calls "Document Management System integration — intelligent OCR, automated document categorization." You are doing enterprise DMS integration without anyone calling it that.
          </p>
        </div>
        
        <DoclingVisualizer />
      </section>

      {/* Code Walkthrough Section */}
      <section className="space-y-6 pt-12 border-t border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="text-indigo-400" />
            1. LangChain-as-Code Literacy: Under the Hood
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            Exporting your Day 3 Langflow visual flow reveals standard LangChain Expression Language (LCEL) code. You don't need to write this from scratch, but you must know how to inspect and judge it.
          </p>
        </div>
        
        <InteractiveCodeAnnotator />

        {/* The LangChain Reality Check */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-900 border border-amber-900/40 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
            <span>Critical Reality Check · Where LangChain Breaks in Production</span>
          </div>
          <p className="text-sm text-slate-300 italic">
            "LangChain is fantastic for prototyping in an afternoon, but you must know where it bites you in an enterprise IT environment."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Leaky Abstractions</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Simple operations are wrapped in 7 layers of inheritance. When an API call fails, stack traces are 40 lines deep into framework internals.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Hidden Prompts & Bloat</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pre-built chains inject undocumented system prompts behind your back, silently burning token quotas and inflating monthly bills.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Brittle Updates</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Frequent breaking API changes between minor versions can break CI/CD pipelines. For production microservices, many teams prefer raw database SDKs and direct REST calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Document Lifecycle & Re-ingestion Section */}
      <section className="space-y-6 pt-12 border-t border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="text-emerald-400" />
            2. Re-ingestion & Document Lifecycle
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            What happens next month when Plant SOP v1.2 is released? Wiping the entire database to re-embed 2,000 files takes hours and costs thousands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 font-mono font-bold flex items-center justify-center text-sm border border-sky-800">1</div>
            <h4 className="font-bold text-white text-sm">Content Hashing</h4>
            <p className="text-xs text-slate-400">Compute a SHA-256 hash of each document during initial ingestion.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm border border-emerald-800">2</div>
            <h4 className="font-bold text-white text-sm">Change Detection</h4>
            <p className="text-xs text-slate-400">If the hash matches the database catalog, skip embedding entirely (0 token cost).</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-800">3</div>
            <h4 className="font-bold text-white text-sm">Purge & Replace</h4>
            <p className="text-xs text-slate-400">If the hash differs, delete only that document's chunk IDs, re-embed, and upsert.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-400 font-mono font-bold flex items-center justify-center text-sm border border-rose-800">4</div>
            <h4 className="font-bold text-white text-sm">Tombstoning</h4>
            <p className="text-xs text-slate-400">Flag deleted files with a tombstone so obsolete operational rules are purged from vector memory.</p>
          </div>
        </div>
      </section>

      {/* Bridge to Production Architecture */}
      <div className="p-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
        <div>
          <span className="text-xs font-mono uppercase text-blue-400 font-bold">Level 2</span>
          <h3 className="text-2xl font-bold text-white mt-1">Multi-Query & Going Local</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Now that we can parse messy documents, we need to handle messy user questions and make sure our private data never leaves the building.
          </p>
        </div>

        <Link href="/day4/production-architecture" className="button-primary shrink-0">
          Enter Production Architecture <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
