import Link from 'next/link';
import { ArrowLeft, ArrowRight, Plug, Workflow, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Day6ConnectorsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-amber-400 font-mono text-sm font-bold uppercase tracking-wider">Day 6 • Block 1</span>
        <h1 className="text-3xl font-extrabold text-white mt-1 mb-2">
          Enterprise Reach: n8n Connectors & POC Hardening
        </h1>
        <p className="text-slate-400 max-w-3xl leading-relaxed">
          Yesterday, we gave the Copilot a brain (LangGraph/Langflow) and custom tools (MCP). 
          Today we give it real enterprise reach through <strong>n8n connectors</strong> (Jira, WhatsApp, SAP), and face <strong>POC vs. Production Note #3</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card border-t-4 border-t-amber-500 p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-900/30 rounded-xl text-amber-400">
              <Workflow size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">n8n: The Enterprise Action Bus</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Langflow is where you design the <em>reasoning loop</em>. <strong>n8n is where you connect to enterprise reality</strong>. 
            Instead of writing custom API code for 400 services, an n8n webhook allows the Copilot to trigger:
          </p>
          <ul className="space-y-1.5 text-xs text-slate-300 font-mono list-disc list-inside">
            <li>Instant SMS / WhatsApp alerts to on-duty BMC engineers.</li>
            <li>Priority P1 incident tickets in Jira Service Management.</li>
            <li>Direct read/write updates to SAP ERP milk collection ledgers.</li>
          </ul>
        </div>

        <div className="glass-card border-t-4 border-t-rose-500 p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-950/40 rounded-xl text-rose-400">
              <ShieldAlert size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">POC vs. Production Note #3</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your Day 5 agent runs happily on localhost. Why would it melt down in production?
          </p>
          <div className="space-y-2 text-xs font-mono text-rose-200">
            <div className="p-2 rounded bg-rose-950/30 border border-rose-900/50">
              <strong>1. Infinite Loop Bleed:</strong> If a tool returns an unexpected string, the model loops forever, burning ₹50,000 in tokens in 10 minutes.
            </div>
            <div className="p-2 rounded bg-rose-950/30 border border-rose-900/50">
              <strong>2. Zero RBAC at the Tool Boundary:</strong> Any user who talks to the agent inherits the agent's database write credentials.
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-800">
        <Link href="/day6" className="button-secondary">
          <ArrowLeft size={16} /> Back to Day 6 Overview
        </Link>
        <Link href="/day6/multi-agent-rca" className="button-primary">
          Next: Multi-Agent RCA & Cascade <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
