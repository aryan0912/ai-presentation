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
            LangChain-as-Code Literacy
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            You didn't write this Python code from scratch, and you aren't about to become a Python developer. But you can read it now and know what every line is responsible for. That's the actual skill: <strong>specify, inspect, judge.</strong>
          </p>
        </div>
        
        <InteractiveCodeAnnotator />
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
