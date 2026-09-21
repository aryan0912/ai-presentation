import RedTeamingCTF from '../components/RedTeamingCTF';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function RedTeamingGovernancePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <span className="text-rose-400 font-mono text-sm font-bold uppercase tracking-wider">Day 6 • Block 3</span>
        <h1 className="text-3xl font-bold text-white mt-2 mb-4">
          Red-Teaming & Governance
        </h1>
        <p className="text-slate-400">
          The best way to understand enterprise AI governance is to try and break a system. Try to hack the corporate assistant below.
        </p>
      </div>

      <RedTeamingCTF />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="glass-card">
          <h4 className="font-bold text-white mb-2">Prompt Injection</h4>
          <p className="text-xs text-slate-400">Attacker embeds instructions in the data (like a resume) telling the AI to ignore instructions and hire them.</p>
        </div>
        <div className="glass-card">
          <h4 className="font-bold text-white mb-2">Data Leakage (DLP)</h4>
          <p className="text-xs text-slate-400">The model has access to the whole DB. User asks "What is my manager's salary?" The model happily complies without RBAC.</p>
        </div>
        <div className="glass-card">
          <h4 className="font-bold text-white mb-2">The Solution: Guardrails</h4>
          <p className="text-xs text-slate-400">We put a secondary, tiny LLM in front of the main one, trained only to output 'SAFE' or 'UNSAFE'.</p>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Link href="/day6/multi-agent-rca" className="button-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
        <Link href="/day6/enterprise-roadmap" className="button-primary">
          Next: Enterprise Roadmap <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
