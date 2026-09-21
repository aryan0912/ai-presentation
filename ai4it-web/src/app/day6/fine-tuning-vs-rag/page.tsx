import Link from 'next/link';
import { ArrowLeft, ArrowRight, Settings2, Search } from 'lucide-react';

export default function FineTuningVsRagPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <span className="text-purple-400 font-mono text-sm font-bold uppercase tracking-wider">Day 6 • Block 1</span>
        <h1 className="text-3xl font-bold text-white mt-2 mb-4">
          Fine-Tuning vs. RAG
        </h1>
        <p className="text-slate-400">
          The most common architectural mistake is trying to teach a model facts by fine-tuning it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Search size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-emerald-400 mb-2 flex items-center gap-2">
              <Search size={20} /> RAG (Retrieval)
            </h3>
            <p className="font-bold text-white mb-4">Use for: Changing Facts & Knowledge</p>
            <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside">
              <li>"What is the current policy on remote work?"</li>
              <li>"Who is the manager of the Anand facility?"</li>
              <li>"How much milk was collected yesterday?"</li>
            </ul>
            <div className="mt-6 p-3 bg-emerald-950/30 rounded border border-emerald-900/50 text-xs text-emerald-300">
              <strong>Analogy:</strong> Giving an employee an open-book exam with the latest company manual.
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Settings2 size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-purple-400 mb-2 flex items-center gap-2">
              <Settings2 size={20} /> Fine-Tuning (LoRA)
            </h3>
            <p className="font-bold text-white mb-4">Use for: Formats, Tones, & Stable Behaviors</p>
            <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside">
              <li>"Always respond in JSON matching this exact schema."</li>
              <li>"Speak in the voice of a very formal legal advisor."</li>
              <li>"Learn the syntax of our obscure, proprietary programming language."</li>
            </ul>
            <div className="mt-6 p-3 bg-purple-950/30 rounded border border-purple-900/50 text-xs text-purple-300">
              <strong>Analogy:</strong> Sending an employee to medical school to learn how to think like a doctor.
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Link href="/day6/the-harness" className="button-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
        <Link href="/day6/multi-agent-rca" className="button-primary">
          Next: Multi-Agent RCA <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
