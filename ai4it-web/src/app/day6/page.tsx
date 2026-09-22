import Link from 'next/link';
import { ArrowRight, Box, Target, Flag, Network, Workflow, ShieldAlert } from 'lucide-react';

export default function Day6Page() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-emerald-400 font-mono text-sm font-bold uppercase tracking-wider">Weekend 3 · Day 6</span>
        <h1 className="text-4xl font-extrabold text-white mt-1 mb-4">
          Day 6: Enterprise Hardening, Governance & Capstone
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
            Light on boring slides, heavy on critical judgment: testing multi-agent cascading failures, hacking prompt injection in a live CTF, and prioritizing your NDDB AI implementation roadmap.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/day6/n8n-connectors" className="glass-card flex flex-col items-start gap-4 hover:border-amber-500/50 group">
          <div className="p-3 rounded-full bg-amber-900/30 text-amber-400 group-hover:bg-amber-900/50 transition-colors">
            <Workflow size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">1. n8n Enterprise Connectors</h3>
            <p className="text-sm text-slate-400">Connecting agent logic to real IT reality: WhatsApp alerts, Jira tickets, SAP ledgers, and POC hardening.</p>
          </div>
        </Link>

        <Link href="/day6/multi-agent-rca" className="glass-card flex flex-col items-start gap-4 hover:border-purple-500/50 group">
          <div className="p-3 rounded-full bg-purple-900/30 text-purple-400 group-hover:bg-purple-900/50 transition-colors">
            <Network size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">2. Multi-Agent RCA & Cascade</h3>
            <p className="text-sm text-slate-400">What happens when 4 agents collaborate and one makes a small error? How hallucinations compound invisibly.</p>
          </div>
        </Link>

        <Link href="/day6/red-teaming-governance" className="glass-card flex flex-col items-start gap-4 hover:border-rose-500/50 group">
          <div className="p-3 rounded-full bg-rose-900/30 text-rose-400 group-hover:bg-rose-900/50 transition-colors">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">3. Red-Teaming & Governance CTF</h3>
            <p className="text-sm text-slate-400">Interactive CTF: prompt injection, DLP salary leakage, and secondary guardrail models.</p>
          </div>
        </Link>

        <Link href="/day6/scale-and-deployment" className="glass-card flex flex-col items-start gap-4 hover:border-cyan-500/50 group">
          <div className="p-3 rounded-full bg-cyan-900/30 text-cyan-400 group-hover:bg-cyan-900/50 transition-colors">
            <Box size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">4. Scale, Percentiles & Sizing</h3>
            <p className="text-sm text-slate-400">Enterprise deployment reality: vLLM serving, vector sharding, p99 latency traps, and on-prem GPU hardware sizing.</p>
          </div>
        </Link>

        <Link href="/day6/enterprise-roadmap" className="glass-card flex flex-col items-start gap-4 hover:border-emerald-500/50 group">
          <div className="p-3 rounded-full bg-emerald-900/30 text-emerald-400 group-hover:bg-emerald-900/50 transition-colors">
            <Flag size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">5. The Capstone Roadmap</h3>
            <p className="text-sm text-slate-400">Impact vs. Complexity matrix: prioritizing quick wins and building an NDDB deployment roadmap.</p>
          </div>
        </Link>
      </div>
      
      <div className="flex justify-end pt-4">
        <Link href="/day6/n8n-connectors" className="button-primary">
          Start Day 6: n8n Connectors & Hardening <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
