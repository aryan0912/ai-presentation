import Link from 'next/link';
import { ArrowLeft, ArrowRight, Plug, Workflow } from 'lucide-react';

export default function McpAndN8nPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <span className="text-amber-400 font-mono text-sm font-bold uppercase tracking-wider">Day 5 • Rung 4 & 5</span>
        <h1 className="text-3xl font-bold text-white mt-2 mb-4">
          Standardization & Reach (MCP + n8n)
        </h1>
        <p className="text-slate-400">
          Tools stop being hand-wired. Agents get the connector surface of an entire automation ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card border-t-4 border-t-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400"><Plug size={24} /></div>
            <h3 className="text-xl font-bold text-white">Rung 4: MCP</h3>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            Model Context Protocol is the ODBC for tools. You stop writing integrations and start plugging things in. An MCP-speaking agent can connect, ask 'what can you do?', and immediately use everything it finds.
          </p>
          <div className="p-3 bg-blue-950/20 rounded border border-blue-900/40 text-xs text-blue-300">
            <strong>The supply-chain caveat:</strong> Connecting an MCP server is a supply-chain decision, not a configuration change. Standardized does not mean safe.
          </div>
        </div>

        <div className="glass-card border-t-4 border-t-amber-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-900/30 rounded-lg text-amber-400"><Workflow size={24} /></div>
            <h3 className="text-xl font-bold text-white">Rung 5: n8n</h3>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            n8n provides the connector library. Langflow is where you design the brain (RAG, prompt chains). n8n is where you connect the brain to your ticketing system, ERP, or CRM using pre-built enterprise connectors.
          </p>
          <div className="p-3 bg-amber-950/20 rounded border border-amber-900/40 text-xs text-amber-300">
            <strong>Agent vs Workflow:</strong> A workflow runs because a trigger fired. An agent workflow runs because a model decided it should.
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Link href="/day5/scale-theory" className="button-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
        <Link href="/day5" className="button-secondary text-slate-400">
          Finish Day 5 
        </Link>
      </div>
    </div>
  );
}
