import MultiAgentRcaSimulator from '../components/MultiAgentRcaSimulator';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function MultiAgentRcaPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-blue-400 font-mono text-sm font-bold uppercase tracking-wider">Day 6 • Block 2</span>
        <h1 className="text-3xl font-bold text-white mt-2 mb-4">
          Multi-Agent RCA & The Cascade
        </h1>
        <p className="text-slate-400">
          When multiple agents collaborate, the output is often spectacular. But when they fail, the errors compound silently into confident hallucinations.
        </p>
      </div>

      <MultiAgentRcaSimulator />

      <div className="glass-card mt-8">
        <h3 className="text-lg font-bold text-white mb-2">The Danger of the Chain</h3>
        <p className="text-sm text-slate-300 mb-4">
          In a single-agent system, an error looks like a traceback. In a multi-agent system, Agent B doesn't know Agent A made a mistake. Agent B assumes the data is ground truth, processes it perfectly, and hands it to Agent C. 
        </p>
        <p className="text-sm text-slate-300">
          The final output (Agent C) looks incredibly professional, well-reasoned, and completely hallucinated. This is why <strong>Supervisors</strong> and strict typing at the boundary edges are required.
        </p>
      </div>

      <div className="flex justify-between pt-8 border-t border-slate-800">
        <Link href="/day6/n8n-connectors" className="button-secondary">
          <ArrowLeft size={16} /> Back: n8n Connectors
        </Link>
        <Link href="/day6/red-teaming-governance" className="button-primary">
          Next: Red-Teaming & Governance <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
