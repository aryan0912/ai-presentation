import Link from 'next/link';
import { ArrowRight, ArrowLeft, Network, GitBranch, Database, ShieldAlert, Sparkles, Clock, AlertTriangle } from 'lucide-react';
import AgenticRagHrChatbot from '../components/AgenticRagHrChatbot';
import LangChainVsLangGraph from '../components/LangChainVsLangGraph';

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <Link href="/day5" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-mono w-fit">
        <ArrowLeft size={16} /> Back to Day 5 Overview
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-2">
          Act 3 • Intelligent Orchestration
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Q2: Agentic RAG, Routing &amp; LangGraph State Machines
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Yesterday, RAG was a passive linear pipe. Today, the agent acts as an intelligent traffic router—triaging requests between relational SQL databases, vector document stores, and state-mutating APIs.
        </p>
      </div>

      {/* The 3 Technological Universes of HR Queries */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
            <Network size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The Enterprise Triage Problem</h2>
            <p className="text-xs text-slate-400">Why naive single-backend RAG systems choke on real employee queries</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30 space-y-2">
            <span className="text-indigo-400 font-bold block text-sm">1. Relational SQL</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              <em>&quot;How many casual leaves do I have left?&quot;</em><br/>
              An exact integer balance stored in PostgreSQL <code className="text-indigo-300">leave_balances</code>. Vector search cannot calculate or guarantee exact primary-key numbers.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 space-y-2">
            <span className="text-cyan-400 font-bold block text-sm">2. Semantic Vector RAG</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              <em>&quot;What is the bereavement leave policy?&quot;</em><br/>
              Unstructured policy handbook text (Clause SEC-HR-4.3). SQL databases have no column for subjective operational policies.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 space-y-2">
            <span className="text-rose-400 font-bold block text-sm">3. Transactional API</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              <em>&quot;Apply for 3 days of sick leave tomorrow.&quot;</em><br/>
              State-mutating action requiring an authenticated <code className="text-rose-300">POST /api/leaves/apply</code> request with business rule validation.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive HR Router */}
      <div className="my-8">
        <AgenticRagHrChatbot />
      </div>

      {/* LangChain vs LangGraph Architectural Comparison */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <GitBranch size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Chains vs State Machines: Why the Industry Moved to LangGraph</h2>
            <p className="text-xs text-slate-400">Directed Acyclic Graphs (DAG) vs Cyclic State Machines</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                <th className="p-3">Architectural Pattern</th>
                <th className="p-3">Data Flow Structure</th>
                <th className="p-3">Handling Errors &amp; Tool Retries</th>
                <th className="p-3">Human-in-the-Loop (HITL) Support</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-rose-400">LangChain (Chains)</td>
                <td className="p-3">Strict Linear DAG (Acyclic: Left ➔ Right)</td>
                <td className="p-3 text-slate-400">Cannot loop backward; requires fragile nested while-loops</td>
                <td className="p-3 text-slate-400">Cannot pause execution mid-pipeline for supervisor approval</td>
              </tr>
              <tr className="hover:bg-slate-900/30">
                <td className="p-3 font-bold text-emerald-400">LangGraph (State Machines)</td>
                <td className="p-3">Cyclic Graph with Conditional Edges &amp; State dict</td>
                <td className="p-3 text-emerald-300 font-bold">Native loops: Send error traceback back to LLM to self-correct</td>
                <td className="p-3 text-emerald-300 font-bold">Native Interrupts: Pauses graph state until human confirms action</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive LangChain vs LangGraph Simulator */}
      <div className="my-8">
        <LangChainVsLangGraph />
      </div>

      {/* Self-Reflection Tradeoff Warning */}
      <div className="p-5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs font-mono text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <Clock size={18} />
          The Engineering Trade-Off: Predictable Latency vs Intelligent Recovery
        </div>
        <p className="font-sans leading-relaxed text-slate-300">
          In a passive DAG, every call takes ~800ms and consumes 400 tokens. In an autonomous self-reflection loop, an agent might iterate 3 times, taking <strong>4.5 seconds and 3,000 tokens</strong> to self-correct. For user-facing SLAs &lt;1s, use deterministic guardrails; reserve multi-loop reflection for background triage and complex workflows.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t border-slate-800">
        <Link href="/day5/q1-tool-factory" className="button-secondary">
          <ArrowLeft size={16} /> Prev: Q1 The Wall &amp; Tools
        </Link>
        <Link href="/day5/q3-mcp-revolution" className="button-primary">
          Next: Q3 The MCP Revolution <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
