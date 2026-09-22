import Link from 'next/link';
import { ArrowRight, AlertTriangle, Calculator, Network, Database, ShieldAlert, GitFork } from 'lucide-react';

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
      
      <div className="flex justify-end pt-4">
        <Link href="/day5/q1-tool-factory" className="button-primary">
          Start Day 5: Quarter 1 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
