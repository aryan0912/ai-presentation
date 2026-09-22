import Link from 'next/link';
import { ArrowRight, Box, Target, Flag, Network, ShieldAlert } from 'lucide-react';

export default function Day6Page() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-emerald-400 font-mono text-sm font-bold uppercase tracking-wider">Weekend 3 · Day 6</span>
        <h1 className="text-4xl font-extrabold text-white mt-1 mb-4">
          Day 6: Production, Scale, and The Final Capstone
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Yesterday, we built tools, MCP servers, and agent workflows. Today, we string them together at scale, test how they fail, stress-test security with red-teaming, and construct a bulletproof enterprise adoption roadmap.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-900/50 flex items-start gap-4">
        <div className="p-3 bg-indigo-900/40 rounded-xl text-indigo-400 shrink-0">
          <Target size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-indigo-300 mb-1">Today's Focus: Theory to Reality</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We are breaking down the vendor hype. Moving from linear workflows to self-reflecting loops, scaling with vLLM, orchestrated AIOps with n8n, and closing with your strategic AI deployment roadmap.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/day6/q1-trust-layer" className="glass-card flex flex-col items-start gap-4 hover:border-rose-500/50 group">
          <div className="p-3 rounded-full bg-rose-900/30 text-rose-400 group-hover:bg-rose-900/50 transition-colors">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Q1: The Trust Layer & Loops</h3>
            <p className="text-sm text-slate-400">Governance, PII Masking, and building Langflow Cyclic Graphs (Self-Reflection Loops) to guarantee safe outputs.</p>
          </div>
        </Link>

        <Link href="/day6/q2-scale-layer" className="glass-card flex flex-col items-start gap-4 hover:border-cyan-500/50 group">
          <div className="p-3 rounded-full bg-cyan-900/30 text-cyan-400 group-hover:bg-cyan-900/50 transition-colors">
            <Box size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Q2: The Scale Layer</h3>
            <p className="text-sm text-slate-400">vLLM vs TGI, Continuous Batching, and Locust Load Testing to visualize p99 latency collapse at scale.</p>
          </div>
        </Link>

        <Link href="/day6/q3-reality-layer" className="glass-card flex flex-col items-start gap-4 hover:border-amber-500/50 group">
          <div className="p-3 rounded-full bg-amber-900/30 text-amber-400 group-hover:bg-amber-900/50 transition-colors">
            <Network size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Q3: The Reality Layer</h3>
            <p className="text-sm text-slate-400">Enterprise AI Implementation ROI and AIOps Log Troubleshooting with n8n CRON triggers & Branching.</p>
          </div>
        </Link>

        <Link href="/day6/q4-capstone" className="glass-card flex flex-col items-start gap-4 hover:border-emerald-500/50 group">
          <div className="p-3 rounded-full bg-emerald-900/30 text-emerald-400 group-hover:bg-emerald-900/50 transition-colors">
            <Flag size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Q4: Capstone & Roadmap</h3>
            <p className="text-sm text-slate-400">The Predict/Talk/Act Integration, Strategic AI Roadmap drafting, and the final Course Rating.</p>
          </div>
        </Link>
      </div>
      
      <div className="flex justify-end pt-4">
        <Link href="/day6/q1-trust-layer" className="button-primary">
          Start Day 6: The Trust Layer <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
