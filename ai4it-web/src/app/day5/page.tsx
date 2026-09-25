import Link from 'next/link';
import { ArrowRight, AlertTriangle, Calculator, Network, Database, ShieldAlert, GitFork, GitBranch } from 'lucide-react';

export default function Day5Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-blue-400 font-mono text-sm font-bold uppercase tracking-wider">Weekend 3 · Day 5</span>
        <h1 className="text-4xl font-extrabold text-white mt-1 mb-4">
          The Full Agentic Stack
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Days 3–4 taught the Copilot to <strong>talk</strong>. Today, we teach it to <strong>act</strong>. 
          We systematically construct the entire modern agent architecture over 4 quarters, with hands-on labs in every single block.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/day5/q1-tool-factory" className="glass-card flex flex-col items-start gap-3 hover:border-rose-500/50 group">
          <div className="p-3 rounded-full bg-rose-900/30 text-rose-400 group-hover:bg-rose-900/50 transition-colors">
            <Calculator size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1">Quarter 1: The Wall & Tool Factory</h3>
            <p className="text-xs text-slate-400">What LLMs can't do natively, and building our first deterministic tools (Calculator & SQL).</p>
          </div>
        </Link>

        <Link href="/day5/q2-agentic-rag" className="glass-card flex flex-col items-start gap-3 hover:border-blue-500/50 group">
          <div className="p-3 rounded-full bg-blue-900/30 text-blue-400 group-hover:bg-blue-900/50 transition-colors">
            <GitFork size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1">Quarter 2: Agentic RAG</h3>
            <p className="text-xs text-slate-400">Combining structured SQL with unstructured RAG, powered by LangGraph state machines.</p>
          </div>
        </Link>

        <Link href="/day5/q3-mcp-revolution" className="glass-card flex flex-col items-start gap-3 hover:border-purple-500/50 group">
          <div className="p-3 rounded-full bg-purple-900/30 text-purple-400 group-hover:bg-purple-900/50 transition-colors">
            <Network size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1">Quarter 3: The MCP Revolution</h3>
            <p className="text-xs text-slate-400">Solving the N x M plumbing crisis by wrapping our tools in a standard MCP server for Claude & Antigravity.</p>
          </div>
        </Link>

        <Link href="/day5/q4-scaling-security" className="glass-card flex flex-col items-start gap-3 hover:border-emerald-500/50 group">
          <div className="p-3 rounded-full bg-emerald-900/30 text-emerald-400 group-hover:bg-emerald-900/50 transition-colors">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-1">Quarter 4: Scaling & Security</h3>
            <p className="text-xs text-slate-400">Scaling theory, agent hallucinations, and a Red-Teaming lab to test guardrails and RBAC on our chatbot.</p>
          </div>
        </Link>
      </div>

      {/* Special Feature: LangGraph Agentic Engine */}
      <Link href="/day5/langgraph-deep-dive" className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/40 hover:border-indigo-400 transition-all group">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-indigo-900/50 text-indigo-300 border border-indigo-500/30 group-hover:scale-105 transition-transform">
            <GitBranch size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-indigo-900/80 text-indigo-300 border border-indigo-700">Special Capstone</span>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">LangGraph Agentic Engine Deep-Dive</h3>
            </div>
            <p className="text-xs text-slate-300 font-sans max-w-2xl">
              State Machines for Modern Agents: Explore how LangGraph implements cyclic self-reflection loops, checkpointing, and Human-in-the-Loop breakpoints for the NDDB 2-Stage Text-to-SQL architecture.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 group-hover:translate-x-1 transition-transform self-end sm:self-center">
          Open Deep-Dive <ArrowRight size={16} />
        </div>
      </Link>
      
      <div className="flex justify-between items-center pt-4">
        <Link href="/day5/langgraph-deep-dive" className="text-xs font-mono text-indigo-400 hover:text-indigo-300">
          Jump directly to LangGraph Deep-Dive &rarr;
        </Link>
        <Link href="/day5/q1-tool-factory" className="button-primary">
          Start Day 5: Quarter 1 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
