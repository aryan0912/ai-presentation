import Link from 'next/link';
import { ArrowRight, ArrowLeft, Wrench, ShieldAlert, Cpu, Layers, HelpCircle, CheckCircle2 } from 'lucide-react';
import ToolFactoryHandsOn from '../components/ToolFactoryHandsOn';

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <Link href="/day5" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm font-mono w-fit">
        <ArrowLeft size={16} /> Back to Day 5 Overview
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-2">
          Act 3 • Giving the Copilot Hands
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Q1: The Wall, The First Tools &amp; Verifiable Execution
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          Foundation models are probabilistic word predictors, not calculators. When an LLM is asked to multiply large numbers or calculate exact dates, it guesses based on token probabilities. To achieve deterministic reliability, we give the model tools.
        </p>
      </div>

      {/* The Probabilistic Wall */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The Probabilistic Wall: Why LLMs Cannot Do Math</h2>
            <p className="text-xs text-slate-400">Next-Token Prediction vs Deterministic Execution</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 space-y-2">
            <span className="text-rose-400 font-bold block text-sm">Naive LLM Generation</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              Query: <em>&quot;What is 14,285 × 387?&quot;</em><br/>
              The model generates tokens based on what numbers commonly appear in training corpora. It might confidently output <strong>5,528,395</strong>—off by 100 digits without realizing it made an error.
            </p>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
            <span className="text-emerald-400 font-bold block text-sm">Tool-Augmented Execution</span>
            <p className="text-slate-300 font-sans leading-relaxed">
              The model emits a structured function call payload: <code className="text-emerald-300">&#123;&quot;tool&quot;: &quot;calculator&quot;, &quot;args&quot;: &#123;&quot;a&quot;: 14285, &quot;b&quot;: 387, &quot;op&quot;: &quot;*&quot;&#125;&#125;</code>.<br/>
              Python executes it deterministically and returns <strong>5,528,295</strong> with 100% mathematical precision.
            </p>
          </div>
        </div>
      </div>

      {/* Mental Model Demolition */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl">
            <Cpu size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The Core Mental Model: What Tool-Calling Actually Is</h2>
            <p className="text-xs text-slate-400">Demystifying the LLM Tool Calling Protocol</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          The foundation model <strong>does not run Python or touch databases directly</strong>. The LLM simply stops generating text and produces a strongly-typed JSON schema. The host runtime executes the function and injects the output back:
        </p>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center gap-3 text-xs font-mono">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 text-center flex-1">
              1. User Prompt
            </div>
            <span className="text-slate-500">➔</span>
            <div className="p-3 bg-indigo-950/60 border border-indigo-500/40 rounded-lg text-indigo-300 text-center flex-1">
              2. LLM Emits JSON Tool Call
            </div>
            <span className="text-slate-500">➔</span>
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-emerald-300 text-center flex-1">
              3. Python Host Executes Tool
            </div>
            <span className="text-slate-500">➔</span>
            <div className="p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-lg text-cyan-300 text-center flex-1">
              4. Output Fed to LLM
            </div>
          </div>
        </div>
      </div>

      {/* The 5 Rungs of Agentic Autonomy */}
      <div className="glass-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
            <Layers size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The 5 Rungs of Agentic Autonomy</h2>
            <p className="text-xs text-slate-400">From deterministic calculators to autonomous orchestration</p>
          </div>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-blue-400 font-bold">Rung 1: Deterministic Math Tools</span>
            <span className="text-slate-300">Calculator, Date formatting, String parsing</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-cyan-400 font-bold">Rung 2: Structured Querying</span>
            <span className="text-slate-300">Read-Only SQL with AST parsing &amp; Schema introspection</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-emerald-400 font-bold">Rung 3: Multi-Tool Agent Loops</span>
            <span className="text-slate-300">ReAct (Reason + Act) autonomous iteration loops</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-indigo-400 font-bold">Rung 4: Dynamic Protocol Integration</span>
            <span className="text-slate-300">Model Context Protocol (MCP) standardized JSON-RPC 2.0</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-amber-400 font-bold">Rung 5: Event-Driven Automation</span>
            <span className="text-slate-300">n8n workflows, Webhooks, CRON triggers &amp; Branching</span>
          </div>
        </div>
      </div>

      {/* Interactive Tool Factory */}
      <div className="my-8">
        <ToolFactoryHandsOn />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t border-slate-800">
        <Link href="/day5" className="button-secondary">
          <ArrowLeft size={16} /> Day 5 Overview
        </Link>
        <Link href="/day5/q2-agentic-rag" className="button-primary">
          Next: Q2 Structured SQL &amp; Agentic Loops <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
