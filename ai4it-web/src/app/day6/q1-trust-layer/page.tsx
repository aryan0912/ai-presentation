import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldAlert, RefreshCw } from 'lucide-react';
import RedTeamingCTF from '../components/RedTeamingCTF';

export default function TrustLayerPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <Link href="/day6" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm font-mono w-fit">
        <ArrowLeft size={16} /> Back to Day 6
      </Link>
      
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Q1: The Trust Layer & Langflow Loops</h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          It's time to build the armor. We are moving from linear workflows to **Cyclic Graphs**. When a guardrail detects PII or a hallucination, it shouldn't just crash—it should loop back and tell the LLM to correct itself.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-8">
        <div className="glass-card">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="text-rose-400" size={24} />
            <h2 className="text-xl font-bold text-white">The Self-Reflection Loop</h2>
          </div>
          <p className="text-slate-300 mb-6 text-sm">
            In production, we never let the LLM talk directly to the user. We intercept the prompt, check for PII, generate the answer, and then a secondary "Guardrail" model reviews the output. If it fails, the workflow loops back.
          </p>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-8 w-full max-w-2xl text-sm font-mono font-bold">
              <div className="p-4 bg-indigo-900/50 text-indigo-300 rounded-lg border border-indigo-500/30">User Prompt</div>
              <ArrowRight className="text-slate-500" />
              <div className="p-4 bg-emerald-900/50 text-emerald-300 rounded-lg border border-emerald-500/30">Primary LLM</div>
              <ArrowRight className="text-slate-500" />
              <div className="p-4 bg-rose-900/50 text-rose-300 rounded-lg border border-rose-500/30">Guardrail Node</div>
              <ArrowRight className="text-slate-500" />
              <div className="p-4 bg-indigo-900/50 text-indigo-300 rounded-lg border border-indigo-500/30">Safe Output</div>
            </div>
            <div className="flex items-center justify-center w-full max-w-2xl relative mt-2">
               <div className="absolute w-[320px] h-10 border-b-2 border-l-2 border-rose-500/50 rounded-bl-xl left-[200px] -top-6 border-dashed"></div>
               <div className="absolute text-rose-400 text-xs font-mono font-bold left-[260px] top-6">LOOP: Error Feedback</div>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="text-rose-400" size={24} />
            <h2 className="text-xl font-bold text-white">Lab: The Red-Team Arena</h2>
          </div>
          <p className="text-slate-300 mb-6 text-sm">
            Before we build the guardrail, you need to understand how the system fails. Use prompt injection below to force the agent to leak the CEO's salary or an Aadhaar number.
          </p>
          <RedTeamingCTF />
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-slate-800">
        <Link href="/day5/q4-scaling-security" className="button-secondary">
          <ArrowLeft size={16} /> Prev: Day 5 Security
        </Link>
        <Link href="/day6/q2-scale-layer" className="button-primary">
          Next: Q2 Scale Layer <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
