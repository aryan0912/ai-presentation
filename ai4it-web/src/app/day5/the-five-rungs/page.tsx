import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calculator, Bot } from 'lucide-react';

export default function TheFiveRungsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <span className="text-purple-400 font-mono text-sm font-bold uppercase tracking-wider">Day 5 • Rungs 1 & 2</span>
        <h1 className="text-3xl font-bold text-white mt-2 mb-4">
          The Calculator & Agentic RAG
        </h1>
        <p className="text-slate-400">
          Moving from a basic tool call to autonomy over the retrieval process.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="glass-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-900/30 rounded-full text-purple-400">
              <Calculator size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Rung 1: The Calculator</h3>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            A calculator tool doesn't make the model smarter — it makes the answer <strong>verifiable by construction</strong>. That's a different and better property than 'usually right'.
          </p>
          <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs text-slate-400 font-mono">
            Axis introduced: A tool exists at all — single call, verifiable result.
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-900/30 rounded-full text-purple-400">
              <Bot size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Rung 2: Agentic RAG</h3>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            We add a self-evaluation step between retrieval and generation. The pipeline makes a decision about its own work: "do these passages actually contain enough information? If no, reformulate and search again."
          </p>
          <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs text-slate-400 font-mono">
            Axis introduced: Autonomy over its own process. trades determinism for capability.
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Link href="/day5/tool-calling-reveal" className="button-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
        <Link href="/day5/sql-guardrails" className="button-primary">
          Next: SQL Guardrails <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
