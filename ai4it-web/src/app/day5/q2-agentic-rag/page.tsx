import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import AgenticRagHrChatbot from '../components/AgenticRagHrChatbot';
import LangChainVsLangGraph from '../components/LangChainVsLangGraph';

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-blue-400 font-mono text-sm font-bold uppercase tracking-wider">Day 5 · Quarter 2</span>
        <h1 className="text-4xl font-extrabold text-white mt-1 mb-4">
          Quarter 2: Agentic RAG & LangGraph
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Combining structured SQL with unstructured RAG, and using LangGraph state machines for robust routing.
        </p>
      </div>

      <div className="my-12">
        <AgenticRagHrChatbot />
      </div>
<div className="my-12">
        <LangChainVsLangGraph />
      </div>


      <div className="flex justify-between pt-8 border-t border-slate-800">
        <Link href="/day5/q1-tool-factory" className="button-secondary">
          <ArrowLeft size={16} /> Previous
        </Link>
        <Link href="/day5/q3-mcp-revolution" className="button-primary">
          Next <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
