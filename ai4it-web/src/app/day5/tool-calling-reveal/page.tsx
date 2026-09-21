import ToolCallingFlow from '../components/ToolCallingFlow';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ToolCallingRevealPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <span className="text-blue-400 font-mono text-sm font-bold uppercase tracking-wider">Day 5 • Block 1B</span>
        <h1 className="text-3xl font-bold text-white mt-2 mb-4">
          The Problem & The Reveal
        </h1>
      </div>

      <div className="glass-card border-l-4 border-l-rose-500">
        <h3 className="text-lg font-bold text-rose-400 mb-2">The Hallucination Hook</h3>
        <p className="text-slate-300 italic mb-4">
          "Raise a ticket for the chilling centre at Anand — the compressor readings are out of range."
        </p>
        <p className="text-slate-300">
          The Copilot says: <strong>"I've raised ticket #4471 for you."</strong>
        </p>
        <div className="mt-4 p-3 bg-rose-950/30 rounded border border-rose-900 text-sm text-rose-300">
          There is no ticket. There is no ticketing system connected to this thing. It said that because "I've raised the ticket" is a statistically excellent next sentence. This is the most dangerous failure mode: an AI that confidently reports an action it never took.
        </div>
      </div>

      <ToolCallingFlow />

      <div className="flex justify-between pt-8">
        <Link href="/day5" className="button-secondary">
          <ArrowLeft size={16} /> Back to Day 5
        </Link>
        <Link href="/day5/the-five-rungs" className="button-primary">
          Next: Rung 1 & 2 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
