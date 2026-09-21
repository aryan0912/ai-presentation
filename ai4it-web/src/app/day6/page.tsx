import Link from 'next/link';
import { ArrowRight, Box, Target, Flag, Network } from 'lucide-react';

export default function Day6Page() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Day 6: Full Power, Governance, and Capstone
        </h1>
        <p className="text-lg text-slate-300">
          We've built tools. Today, we string them together, watch them break, and learn how to manage them at an enterprise scale.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-900/50">
        <h2 className="text-xl font-bold text-indigo-400 mb-2">The Culmination</h2>
        <p className="text-slate-300">
          This is where the theory hits reality. How do we keep a multi-agent system from destroying our data? How do we build a roadmap that actually works?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/day6/the-harness" className="glass-card flex flex-col items-start gap-4 hover:border-blue-500/50 group">
          <div className="p-3 rounded-full bg-blue-900/30 text-blue-400 group-hover:bg-blue-900/50 transition-colors">
            <Box size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">1. The Harness Reveal</h3>
            <p className="text-sm text-slate-400">The tool you've been using since Day 1 isn't what you thought it was.</p>
          </div>
        </Link>

        <Link href="/day6/fine-tuning-vs-rag" className="glass-card flex flex-col items-start gap-4 hover:border-cyan-500/50 group">
          <div className="p-3 rounded-full bg-cyan-900/30 text-cyan-400 group-hover:bg-cyan-900/50 transition-colors">
            <Box size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">2. Fine-Tuning vs. RAG</h3>
            <p className="text-sm text-slate-400">The most common enterprise architecture mistake: teaching facts vs styles.</p>
          </div>
        </Link>

        <Link href="/day6/multi-agent-rca" className="glass-card flex flex-col items-start gap-4 hover:border-purple-500/50 group">
          <div className="p-3 rounded-full bg-purple-900/30 text-purple-400 group-hover:bg-purple-900/50 transition-colors">
            <Network size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">3. Multi-Agent RCA & The Cascade</h3>
            <p className="text-sm text-slate-400">What happens when four agents talk to each other, and one makes a tiny mistake?</p>
          </div>
        </Link>

        <Link href="/day6/red-teaming-governance" className="glass-card flex flex-col items-start gap-4 hover:border-rose-500/50 group">
          <div className="p-3 rounded-full bg-rose-900/30 text-rose-400 group-hover:bg-rose-900/50 transition-colors">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">4. Red-Teaming & Governance</h3>
            <p className="text-sm text-slate-400">Try to hack an AI. It's the only way to understand why we need DLP and RBAC.</p>
          </div>
        </Link>

        <Link href="/day6/enterprise-roadmap" className="glass-card flex flex-col items-start gap-4 hover:border-amber-500/50 group">
          <div className="p-3 rounded-full bg-amber-900/30 text-amber-400 group-hover:bg-amber-900/50 transition-colors">
            <Flag size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">5. The Capstone Roadmap</h3>
            <p className="text-sm text-slate-400">Impact vs. Complexity. Don't start your AI journey by building a money pit.</p>
          </div>
        </Link>
      </div>
      
      <div className="flex justify-end pt-4">
        <Link href="/day6/the-harness" className="button-primary">
          Start Day 6 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
