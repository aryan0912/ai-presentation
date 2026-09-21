import ImpactComplexityMatrix from '../components/ImpactComplexityMatrix';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function EnterpriseRoadmapPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <span className="text-amber-400 font-mono text-sm font-bold uppercase tracking-wider">Day 6 • Block 4</span>
        <h1 className="text-3xl font-bold text-white mt-2 mb-4">
          The Enterprise Roadmap (Capstone)
        </h1>
        <p className="text-slate-400">
          Not all AI projects are created equal. The key to surviving the AI hype cycle is picking projects in the top-left quadrant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <ImpactComplexityMatrix />

        <div className="space-y-6">
          <div className="glass-card">
            <h3 className="text-xl font-bold text-emerald-400 mb-3">The "Quick Wins" Quadrant</h3>
            <p className="text-sm text-slate-300 mb-4">
              High Impact, Low Complexity. Start here. These build trust and momentum without requiring heavy infrastructure or perfect data.
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-emerald-400 mt-1 shrink-0" /> Log Summarization for Level 1 IT Support</li>
              <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-emerald-400 mt-1 shrink-0" /> Policy Q&A Chatbot (RAG on HR docs)</li>
              <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-emerald-400 mt-1 shrink-0" /> Code completion (Copilots for devs)</li>
            </ul>
          </div>

          <div className="glass-card border-l-4 border-l-rose-500">
            <h3 className="text-xl font-bold text-rose-400 mb-3">The "Money Pits" Quadrant</h3>
            <p className="text-sm text-slate-300 mb-4">
              Low Impact, High Complexity. Avoid these at all costs. These are usually "AI for the sake of AI" projects driven by executives who want a press release.
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-rose-400 mt-1 shrink-0" /> Full Automated Code Refactoring</li>
              <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-rose-400 mt-1 shrink-0" /> Predictive maintenance on perfectly working physical assets without sensors</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Link href="/day6/red-teaming-governance" className="button-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
        <Link href="/" className="button-primary">
          Finish Course & Return to Home
        </Link>
      </div>
    </div>
  );
}
