'use client';

import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Database, FileX, Shield, Play } from 'lucide-react';

export default function SqlAgentSimulator() {
  const [prompt, setPrompt] = useState('Clean up the old test records in the customers table.');
  const [simState, setSimState] = useState<'idle' | 'running' | 'done'>('idle');
  const [activePane, setActivePane] = useState<'freeform' | 'parameterized'>('freeform');

  const runSimulation = () => {
    setSimState('running');
    setTimeout(() => {
      setSimState('done');
    }, 1500);
  };

  const resetSim = () => {
    setSimState('idle');
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex bg-slate-900 rounded-xl border border-slate-800 p-1">
        <button
          onClick={() => { setActivePane('freeform'); resetSim(); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${activePane === 'freeform' ? 'bg-rose-950/50 text-rose-400 border border-rose-900/50' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <AlertTriangle size={16} /> The Dangerous Way (Free-Form SQL)
        </button>
        <button
          onClick={() => { setActivePane('parameterized'); resetSim(); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${activePane === 'parameterized' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/50' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <ShieldCheck size={16} /> Safe By Construction (Parameterized)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: User Input */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col">
          <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
            <UserIcon /> User Instruction
          </h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 text-sm font-mono focus:outline-none focus:border-blue-500 resize-none"
            placeholder="Type an instruction here..."
          />
          <div className="mt-auto pt-6 flex justify-end">
            <button
              onClick={runSimulation}
              disabled={simState === 'running'}
              className={`${activePane === 'freeform' ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'} text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50`}
            >
              {simState === 'running' ? <span className="animate-pulse">Processing...</span> : <><Play size={16} /> Execute Instruction</>}
            </button>
          </div>
        </div>

        {/* Right Column: System Execution */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden">
          {activePane === 'freeform' ? (
            <div className="h-full flex flex-col">
              <h3 className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2">
                <Database size={16} /> Tool Action: Execute Raw SQL
              </h3>
              
              <div className="flex-1 border border-slate-800 rounded-xl bg-slate-900 overflow-hidden flex flex-col">
                <div className="bg-slate-800/50 py-2 px-4 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">LLM Generated SQL</span>
                  {simState === 'done' && <span className="text-rose-400 text-xs font-bold animate-pulse">EXECUTED</span>}
                </div>
                <div className="p-4 flex-1">
                  {simState === 'idle' ? (
                    <div className="h-full flex items-center justify-center text-slate-600 text-sm font-mono italic">Waiting for execution...</div>
                  ) : (
                    <pre className={`text-sm font-mono ${simState === 'done' ? 'text-rose-400' : 'text-slate-400'} whitespace-pre-wrap`}>
                      {simState === 'running' ? 'Generating SQL based on prompt...' : "DELETE FROM customers \nWHERE created_at < '2020-01-01'\nAND status = 'test';"}
                    </pre>
                  )}
                </div>
              </div>

              {simState === 'done' && (
                <div className="mt-4 p-4 bg-rose-950/40 border border-rose-900/50 rounded-xl text-rose-300 text-sm flex items-start gap-3 animate-in slide-in-from-bottom-2">
                  <FileX className="shrink-0 mt-0.5" size={18} />
                  <p>
                    <strong>Data Destruction!</strong> The LLM resolved the ambiguity of "old test records" by guessing a date constraint. It just dropped a huge chunk of your database.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <h3 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <Shield size={16} /> Tool Action: extract_params_for_report
              </h3>
              
              <div className="flex-1 border border-slate-800 rounded-xl bg-slate-900 overflow-hidden flex flex-col">
                <div className="bg-slate-800/50 py-2 px-4 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Tool Definition Constraints</span>
                </div>
                <div className="p-4 text-xs font-mono text-slate-400 space-y-2">
                  <p className="text-slate-300 mb-2">Available capability:</p>
                  <code className="block bg-slate-950 p-2 rounded border border-slate-800">
                    get_collection_readings(center_id, start_date)
                  </code>
                  <p className="text-slate-500 mt-4 italic">No destructive tools are registered in the agent's harness.</p>
                </div>
              </div>

              {simState === 'done' && (
                <div className="mt-4 p-4 bg-emerald-950/40 border border-emerald-900/50 rounded-xl text-emerald-300 text-sm flex items-start gap-3 animate-in slide-in-from-bottom-2">
                  <ShieldCheck className="shrink-0 mt-0.5" size={18} />
                  <p>
                    <strong>Action Denied.</strong> The LLM cannot write SQL. It can only fill out parameters for approved tools. Since there is no tool to "clean up records", the request safely fails.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <div className="bg-blue-900/40 p-1.5 rounded-md">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}
