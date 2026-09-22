import Link from 'next/link';
import { ArrowLeft, ArrowRight, Network, Target } from 'lucide-react';
import ImpactComplexityMatrix from '../components/ImpactComplexityMatrix';

export default function RealityLayerPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <Link href="/day6" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm font-mono w-fit">
        <ArrowLeft size={16} /> Back to Day 6
      </Link>
      
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Q3: The Reality Layer & AIOps</h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          How do we measure ROI? We don't measure lines of code; we measure **MTTR** (Mean Time To Resolution). We will prioritize our AI initiatives and then build an autonomous n8n workflow to triage server logs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-8">
        <div className="glass-card">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">Enterprise ROI: The Prioritization Matrix</h2>
          </div>
          <p className="text-slate-300 mb-6 text-sm">
            Before buying GPUs, map your initiatives. High Impact, Low Complexity (like Log Parsing) should always be piloted before High Complexity tasks (like an all-knowing HR Chatbot).
          </p>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <ImpactComplexityMatrix />
          </div>
        </div>

        <div className="glass-card">
          <div className="flex items-center gap-3 mb-4">
            <Network className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">Lab: n8n AIOps CRON Orchestration</h2>
          </div>
          <p className="text-slate-300 mb-6 text-sm">
            Langflow waits for a human prompt. An IT outage doesn't. We use n8n for event-driven orchestration (CRON triggers, Webhooks, and Conditional Branching) to ingest logs and auto-create P1 tickets.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 bg-slate-950 p-8 rounded-xl border border-slate-800">
             <div className="w-full max-w-lg border border-slate-700 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-400">
               // n8n Workflow Visualization<br/><br/>
               [CRON Trigger: Every 5 Mins] <br/>
               &nbsp;&nbsp;└── [HTTP Request: Fetch latest Docker Logs]<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── [LLM Chain-of-Thought: Extract RCA]<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── [IF: Critical Error detected?]<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── TRUE: [Jira: Create P1 Ticket] -&gt; [Slack: Alert Team]<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── FALSE: [Stop]
             </div>
             <p className="text-emerald-400 text-sm font-bold mt-2">Objective: Build this workflow in your local n8n instance.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-slate-800">
        <Link href="/day6/q2-scale-layer" className="button-secondary">
          <ArrowLeft size={16} /> Prev: Q2 Scale Layer
        </Link>
        <Link href="/day6/q4-capstone" className="button-primary">
          Next: Q4 Capstone <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
