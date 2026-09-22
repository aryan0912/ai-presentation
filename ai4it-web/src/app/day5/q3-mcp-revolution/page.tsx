import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import McpTemplateHandsOn from '../components/McpTemplateHandsOn';
import McpDiagram from '../components/McpDiagram';

export default function Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-blue-400 font-mono text-sm font-bold uppercase tracking-wider">Day 5 · Quarter 3</span>
        <h1 className="text-4xl font-extrabold text-white mt-1 mb-4">
          Quarter 3: The MCP Revolution
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Solving the N x M plumbing crisis by wrapping our SQL/RAG tools in a standard MCP server.
        </p>
      </div>

      <div className="my-12">
        <McpDiagram />
      </div>

      <div className="my-12">
        <McpTemplateHandsOn />
      </div>

      <div className="flex justify-between pt-8 border-t border-slate-800">
        <Link href="/day5/q2-agentic-rag" className="button-secondary">
          <ArrowLeft size={16} /> Previous
        </Link>
        <Link href="/day5/q4-scaling-security" className="button-primary">
          Next <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
