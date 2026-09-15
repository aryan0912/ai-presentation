'use client';
import React from 'react';
import { Sparkles, Route, Building2 } from 'lucide-react';
import TeamOf50Exercise from '@/components/TeamOf50Exercise';
import EnterpriseArchitectureSandbox from '@/components/EnterpriseArchitectureSandbox';
import Link from 'next/link';

export default function DecisionExercisePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 p-6 md:p-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 4 · Block 4</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Judgment & The Big Picture
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          That conversation you are about to have — that is the job. Not building it. Deciding whether it should be built that way.
        </p>
      </div>

      {/* Interactive Architecture Simulator */}
      <section className="space-y-6">
        <EnterpriseArchitectureSandbox />
      </section>

      {/* The Exercise */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Route className="text-sky-400" />
            1. The Team of 50 Exercise
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            Read the scenario below. Work with your group to decide the architecture. Commit to your answers before revealing the reference solutions.
          </p>
        </div>
        
        <TeamOf50Exercise />
      </section>

      {/* Enterprise Generalization */}
      <section className="space-y-6 pt-12 border-t border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="text-emerald-400" />
            2. Enterprise Generalization
          </h2>
          <p className="text-slate-400 mt-1 max-w-3xl text-sm">
            You built this for yourself, on your own documents. But the identical pattern — chunk, embed, retrieve, augment, generate — is what scales to your organization's entire infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="font-bold text-white mb-2 pb-2 border-b border-slate-800 text-sm uppercase tracking-widest text-sky-400">ERP Systems</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Automated data extraction from invoices, and ledger anomaly auditing using hybrid search.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="font-bold text-white mb-2 pb-2 border-b border-slate-800 text-sm uppercase tracking-widest text-purple-400">CRM Systems</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Real-time sentiment analysis on customer logs, and automated intelligent routing based on semantic similarity.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="font-bold text-white mb-2 pb-2 border-b border-slate-800 text-sm uppercase tracking-widest text-amber-400">Email</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Auto-classification of inbound requests, spam filtering, and drafting contextual replies based on history.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="font-bold text-white mb-2 pb-2 border-b border-slate-800 text-sm uppercase tracking-widest text-rose-400">Helpdesk</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Virtual agents answering L1 queries (exactly like the RAG pipeline you built today), and auto-updating knowledge bases.
            </p>
          </div>
        </div>
      </section>

      {/* The Closing Synthesis */}
      <section className="pt-12 border-t border-slate-800 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="p-8 md:p-12 rounded-3xl bg-slate-950 border border-emerald-900/50 shadow-2xl relative z-10 text-center">
          <Sparkles className="text-emerald-400 mx-auto mb-6" size={48} />
          <h2 className="text-3xl font-bold text-white mb-6">Weekend 2 Close</h2>
          <p className="text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto italic">
            "Yesterday morning you hit a wall — a raw LLM that didn't know your documents. By end of yesterday you'd built a chatbot yourself, piece by piece, that solved it. Today you made it read messy real documents, made it smarter about ambiguous questions, made it private, made its retrieval accurate, and learned how to check whether it's telling the truth. And you just saw that everything you built today scales to your entire organization, not just your own files."
          </p>
        </div>
      </section>

    </div>
  );
}
