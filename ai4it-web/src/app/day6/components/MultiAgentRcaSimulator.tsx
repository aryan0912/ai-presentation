'use client';

import React, { useState } from 'react';
import { Network, Database, FileText, AlertTriangle, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export default function MultiAgentRcaSimulator() {
  const [errorEnabled, setErrorEnabled] = useState(false);
  const [simState, setSimState] = useState<number>(0);

  const runSim = () => {
    setSimState(1);
    setTimeout(() => setSimState(2), 1000);
    setTimeout(() => setSimState(3), 2000);
    setTimeout(() => setSimState(4), 3000);
  };

  const resetSim = () => setSimState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <h4 className="font-bold text-slate-200">RCA Simulator</h4>
          <p className="text-xs text-slate-400">Watch how data flows through a multi-agent system.</p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={errorEnabled}
              onChange={(e) => { setErrorEnabled(e.target.checked); resetSim(); }}
              className="accent-rose-500 w-4 h-4"
            />
            <span className={errorEnabled ? 'text-rose-400 font-bold' : 'text-slate-400'}>
              Inject Parsing Error (European Date)
            </span>
          </label>
          <button onClick={resetSim} className="button-secondary text-xs py-1 px-3">Reset</button>
          <button onClick={runSim} disabled={simState > 0} className="button-primary text-xs py-1 px-3">
            <Play size={14} /> Run
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
        <AgentCard 
          title="Agent 1: Log Parser" 
          icon={<FileText />}
          status={simState >= 1 ? 'done' : 'waiting'}
          result={
            simState >= 1 ? (
              errorEnabled 
                ? <span className="text-rose-400">Timestamp: 04/05/2026<br/>(Read as April 5 instead of May 4)</span> 
                : <span className="text-emerald-400">Parsed: May 4, 2026</span>
            ) : null
          }
        />
        <ArrowRight className="hidden md:block self-center text-slate-600" />
        <AgentCard 
          title="Agent 2: Correlator" 
          icon={<Network />}
          status={simState >= 2 ? 'done' : 'waiting'}
          result={
            simState >= 2 ? (
              errorEnabled 
                ? <span className="text-rose-400">Timeline ordered backward.<br/>DB caused LB failure.</span> 
                : <span className="text-emerald-400">Timeline correct.<br/>LB caused DB failure.</span>
            ) : null
          }
        />
        <ArrowRight className="hidden md:block self-center text-slate-600" />
        <AgentCard 
          title="Agent 3: RCA Writer" 
          icon={<Database />}
          status={simState >= 3 ? 'done' : 'waiting'}
          result={
            simState >= 3 ? (
              <span className="text-blue-400">Generated Executive Report</span>
            ) : null
          }
        />
      </div>

      {simState === 4 && (
        <div className={`p-6 rounded-2xl border animate-in slide-in-from-bottom-4 ${errorEnabled ? 'bg-rose-950/20 border-rose-900/50' : 'bg-emerald-950/20 border-emerald-900/50'}`}>
          <div className="flex items-center gap-3 mb-4">
            {errorEnabled ? <AlertTriangle className="text-rose-400" /> : <CheckCircle2 className="text-emerald-400" />}
            <h3 className={`text-xl font-bold ${errorEnabled ? 'text-rose-400' : 'text-emerald-400'}`}>
              Final Incident Report
            </h3>
          </div>
          {errorEnabled ? (
            <div className="text-sm text-slate-300 space-y-2">
              <p className="font-bold text-rose-300">Executive Summary (Flawed)</p>
              <p>At 03:00, the Database went offline, causing a cascading failure that eventually took down the Load Balancer.</p>
              <p className="italic text-rose-400/80">Recommendation: Reboot the database and expand disk size.</p>
              <div className="mt-4 pt-4 border-t border-rose-900 text-xs text-rose-300/80 font-mono">
                <strong>Silent Failure:</strong> The report looks professional and confident, but it's completely wrong. The agents trusted the previous step implicitly, laundering a small date parsing error into a massive diagnostic failure.
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-300 space-y-2">
              <p className="font-bold text-emerald-300">Executive Summary (Accurate)</p>
              <p>At 03:00, the Load Balancer experienced a traffic spike, which overwhelmed the Database and caused a timeout.</p>
              <p className="italic text-emerald-400/80">Recommendation: Increase Load Balancer rate limits.</p>
              <div className="mt-4 pt-4 border-t border-emerald-900 text-xs text-emerald-300/80 font-mono">
                <strong>Success:</strong> A perfect incident report, automatically generated by three coordinating agents.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AgentCard({ title, icon, status, result }: { title: string, icon: React.ReactNode, status: 'waiting'|'done', result: React.ReactNode }) {
  return (
    <div className={`flex-1 p-4 rounded-xl border flex flex-col transition-all ${status === 'done' ? 'bg-slate-900 border-blue-500/50' : 'bg-slate-900/50 border-slate-800'}`}>
      <div className={`mb-3 p-2 w-fit rounded-lg ${status === 'done' ? 'bg-blue-900/30 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
        {icon}
      </div>
      <h4 className={`text-sm font-bold mb-2 ${status === 'done' ? 'text-slate-200' : 'text-slate-500'}`}>{title}</h4>
      <div className="text-xs font-mono min-h-[40px]">
        {result || <span className="text-slate-600">Waiting...</span>}
      </div>
    </div>
  );
}
