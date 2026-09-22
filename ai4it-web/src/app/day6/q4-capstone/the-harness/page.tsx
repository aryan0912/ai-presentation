import HarnessTraceInspector from '../../components/HarnessTraceInspector';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function TheHarnessPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <span className="text-blue-400 font-mono text-sm font-bold uppercase tracking-wider">Day 6 • Block 1</span>
        <h1 className="text-3xl font-bold text-white mt-2 mb-4">
          The Harness Reveal
        </h1>
        <p className="text-slate-400">
          The system you've been using all week isn't a magical AI. It's a standard software harness wrapping an LLM.
        </p>
      </div>

      <div className="glass-card border-l-4 border-l-blue-500">
        <h3 className="text-lg font-bold text-blue-400 mb-2">The Illusion of Agency</h3>
        <p className="text-slate-300">
          LLMs don't execute code. They don't have a terminal. A 'Harness' (like LangChain, AutoGen, or Antigravity) runs on a server. The harness prompts the LLM, the LLM replies with a JSON tool request, the harness parses the JSON, executes the code locally, and feeds the output back into the prompt. 
        </p>
      </div>

      <HarnessTraceInspector />

      <div className="flex justify-between pt-8">
        <Link href="/day6/q4-capstone" className="button-secondary">
          <ArrowLeft size={16} /> Back to Q4 Capstone
        </Link>
        <Link href="/day6/q2-scale-layer/fine-tuning-vs-rag" className="button-primary">
          Next: Fine-Tuning vs RAG <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
