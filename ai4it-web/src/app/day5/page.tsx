import Link from 'next/link';
import { ArrowRight, Wrench, Shield, Network, LineChart } from 'lucide-react';

export default function Day5Page() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Day 5: Giving the Copilot Hands
        </h1>
        <p className="text-lg text-slate-300">
          Days 3–4 taught the Copilot to <strong>talk</strong>. Today, we teach it to <strong>act</strong>.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-900/50">
        <h2 className="text-xl font-bold text-indigo-400 mb-2">The Landscape Survey</h2>
        <p className="text-slate-300">
          Today is a broad survey of the AI-engineering landscape with hands-on stops, not deep mastery of any single tool. Participants will touch several distinct patterns today. The goal is to specify and judge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/day5/tool-calling-reveal" className="glass-card flex flex-col items-start gap-4 hover:border-blue-500/50 group">
          <div className="p-3 rounded-full bg-blue-900/30 text-blue-400 group-hover:bg-blue-900/50 transition-colors">
            <Wrench size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">1. The Tool-Calling Reveal</h3>
            <p className="text-sm text-slate-400">The model has no hands. Demystifying how an LLM actually acts on the world.</p>
          </div>
        </Link>

        <Link href="/day5/the-five-rungs" className="glass-card flex flex-col items-start gap-4 hover:border-purple-500/50 group">
          <div className="p-3 rounded-full bg-purple-900/30 text-purple-400 group-hover:bg-purple-900/50 transition-colors">
            <Network size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">2. The Calculator & Agentic RAG</h3>
            <p className="text-sm text-slate-400">Rungs 1 & 2: verifiable results and autonomy over the retrieval process.</p>
          </div>
        </Link>

        <Link href="/day5/sql-guardrails" className="glass-card flex flex-col items-start gap-4 hover:border-emerald-500/50 group">
          <div className="p-3 rounded-full bg-emerald-900/30 text-emerald-400 group-hover:bg-emerald-900/50 transition-colors">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">3. SQL Guardrails (Break-it)</h3>
            <p className="text-sm text-slate-400">Rungs 3a & 3b: Why free-form SQL is dangerous, and how architecture saves us.</p>
          </div>
        </Link>

        <Link href="/day5/scale-theory" className="glass-card flex flex-col items-start gap-4 hover:border-rose-500/50 group">
          <div className="p-3 rounded-full bg-rose-900/30 text-rose-400 group-hover:bg-rose-900/50 transition-colors">
            <LineChart size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">4. Scale & Percentiles</h3>
            <p className="text-sm text-slate-400">What breaks at 10,000 users, and why average latency is a lie.</p>
          </div>
        </Link>

        <Link href="/day5/mcp-and-n8n" className="glass-card flex flex-col items-start gap-4 hover:border-amber-500/50 group">
          <div className="p-3 rounded-full bg-amber-900/30 text-amber-400 group-hover:bg-amber-900/50 transition-colors">
            <Wrench size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">5. MCP & n8n Ecosystem</h3>
            <p className="text-sm text-slate-400">Rungs 4 & 5: Standardization via Model Context Protocol and enterprise workflow orchestration.</p>
          </div>
        </Link>
      </div>
      
      <div className="flex justify-end pt-4">
        <Link href="/day5/tool-calling-reveal" className="button-primary">
          Start Day 5 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
