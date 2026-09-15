import React from 'react';
import { 
  ShieldAlert, 
  TerminalSquare, 
  Activity, 
  CloudCog, 
  Headset, 
  Database, 
  Flame, 
  CheckCircle2, 
  Lock, 
  AlertTriangle 
} from 'lucide-react';

export default function IndustryUseCasesPage() {
  const useCases = [
    {
      title: 'Software Dev & Code Review',
      icon: <TerminalSquare className="text-sky-400" size={24} />,
      description: 'AI catching a null-pointer bug in review before it ships — not writing the feature, catching the mistake.',
      bg: 'bg-sky-950/20',
      border: 'border-sky-500/30'
    },
    {
      title: 'IT Ops / AIOps',
      icon: <Activity className="text-emerald-400" size={24} />,
      description: 'Anomaly detection flagging a metric drift before the pager goes off.',
      bg: 'bg-emerald-950/20',
      border: 'border-emerald-500/30'
    },
    {
      title: 'Cloud Administration',
      icon: <CloudCog className="text-purple-400" size={24} />,
      description: 'Generating a Terraform snippet from a plain-English infra request, then the human reviews it.',
      bg: 'bg-purple-950/20',
      border: 'border-purple-500/30'
    },
    {
      title: 'Cybersecurity',
      icon: <ShieldAlert className="text-rose-400" size={24} />,
      description: 'Triaging a pile of SIEM alerts down to the 3 that actually matter.',
      bg: 'bg-rose-950/20',
      border: 'border-rose-500/30'
    },
    {
      title: 'ITSM / Helpdesk',
      icon: <Headset className="text-amber-400" size={24} />,
      description: 'Auto-classifying a ticket\'s category and urgency before a human ever reads it.',
      bg: 'bg-amber-950/20',
      border: 'border-amber-500/30'
    },
    {
      title: 'Database Administration',
      icon: <Database className="text-indigo-400" size={24} />,
      description: 'Drafting a candidate index or query rewrite for a slow query, human verifies before running.',
      bg: 'bg-indigo-950/20',
      border: 'border-indigo-500/30'
    },
    {
      title: 'Disaster Management',
      icon: <Flame className="text-orange-400" size={24} />,
      description: 'Drafting a first-pass RCA timeline from scattered incident logs.',
      bg: 'bg-orange-950/20',
      border: 'border-orange-500/30'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 p-6 md:p-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 3 · Block 1</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Where AI Already Lives in IT
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          This isn't a demo reel. Everything here is the raw material for the AI-use policy your own department will eventually need. Hold onto that.
        </p>
      </div>

      {/* Grid of Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {useCases.map((uc, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${uc.bg} ${uc.border} flex flex-col gap-4 hover:scale-105 transition-transform duration-300`}>
            <div className="p-3 bg-slate-900 rounded-lg w-fit border border-slate-700">
              {uc.icon}
            </div>
            <div>
              <h3 className="font-bold text-white text-lg leading-tight mb-2">{uc.title}</h3>
              <p className="text-sm text-slate-300">{uc.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tool Comparison Table */}
      <div className="space-y-6 pt-8 border-t border-slate-800">
        <div>
          <h2 className="text-3xl font-bold text-white">The Enterprise Landscape</h2>
          <p className="text-slate-400 mt-1 max-w-2xl text-sm">
            There is no universally "best" tool — there is a best tool for your constraint. If data can't leave the building, that eliminates three of these four rows immediately, regardless of capability.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/50">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-300 border-b border-slate-700">
              <tr>
                <th className="p-4 font-mono font-bold w-1/4">Tool</th>
                <th className="p-4 font-mono font-bold w-1/3">Core Strength</th>
                <th className="p-4 font-mono font-bold">Licensing & Compliance Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/50 transition-colors">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" /> ChatGPT (OpenAI)
                </td>
                <td className="p-4 text-slate-400">Broadest general capability, plugin/tool ecosystem.</td>
                <td className="p-4 font-mono text-xs text-amber-300 bg-amber-950/20">
                  Enterprise tier needed for data-retention guarantees.
                </td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sky-500" /> Microsoft Copilot
                </td>
                <td className="p-4 text-slate-400">Deepest integration if NDDB already runs M365/GitHub.</td>
                <td className="p-4 font-mono text-xs text-sky-300 bg-sky-950/20">
                  Inherits org's existing M365 compliance boundary.
                </td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-indigo-500" /> Google Gemini Enterprise
                </td>
                <td className="p-4 text-slate-400">Strong if already on Google Workspace.</td>
                <td className="p-4 font-mono text-xs text-indigo-300 bg-indigo-950/20">
                  Similar org-boundary inheritance via Workspace.
                </td>
              </tr>
              <tr className="hover:bg-slate-800/50 transition-colors">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <Lock size={16} className="text-orange-500" /> Open-Source (Llama 3, Mistral)
                </td>
                <td className="p-4 text-slate-400">Full data control, zero vendor lock-in. Self-hosted.</td>
                <td className="p-4 font-mono text-xs text-rose-300 bg-rose-950/20 flex items-center gap-2">
                  <AlertTriangle size={14} /> You own the compliance burden entirely — no vendor SLA.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
