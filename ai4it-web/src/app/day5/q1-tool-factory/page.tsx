import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ToolFactoryHandsOn from '../components/ToolFactoryHandsOn';

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-blue-400 font-mono text-sm font-bold uppercase tracking-wider">Day 5 · Quarter 1</span>
        <h1 className="text-4xl font-extrabold text-white mt-1 mb-4">
          Quarter 1: The Wall & The First Tools
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          The pivot from Chatbots to Agentic AI, and building our first deterministic tools (Calculator & SQL).
        </p>
      </div>

      <div className="my-12">
        <ToolFactoryHandsOn />
      </div>

      <div className="flex justify-between pt-8 border-t border-slate-800">
        <div></div>
        <Link href="/day5/q2-agentic-rag" className="button-primary">
          Next <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
