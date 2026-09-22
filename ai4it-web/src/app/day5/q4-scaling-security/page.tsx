import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import RedTeamingAgentHandsOn from '../components/RedTeamingAgentHandsOn';

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-blue-400 font-mono text-sm font-bold uppercase tracking-wider">Day 5 · Quarter 4</span>
        <h1 className="text-4xl font-extrabold text-white mt-1 mb-4">
          Quarter 4: Scaling, Security & Governance
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          RAG/Agent scaling theory, followed by a Red-Teaming lab to test guardrails and RBAC on our HR Chatbot.
        </p>
      </div>

      <div className="my-12">
        <RedTeamingAgentHandsOn />
      </div>

      <div className="flex justify-between pt-8 border-t border-slate-800">
        <Link href="/day5/q3-mcp-revolution" className="button-secondary">
          <ArrowLeft size={16} /> Previous
        </Link>
        <Link href="/day6" className="button-primary">
          Continue to Day 6 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
