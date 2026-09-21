'use client';

import React, { useState } from 'react';
import { Terminal, CheckCircle2, XCircle, AlertCircle, Wrench, Search } from 'lucide-react';

export default function HarnessTraceInspector() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const traceSteps = [
    {
      id: 1,
      type: 'thought',
      content: 'I need to find the three sites with the steepest week-over-week decline from this CSV.',
      icon: <Terminal size={16} className="text-slate-400" />,
      highlight: null
    },
    {
      id: 2,
      type: 'tool',
      content: 'Action: python_eval\nInput: import pandas as pd...',
      icon: <Wrench size={16} className="text-blue-400" />,
      highlight: 'good'
    },
    {
      id: 3,
      type: 'error',
      content: 'Error: FileNotFoundError: No such file or directory: "data.csv"',
      icon: <XCircle size={16} className="text-rose-400" />,
      highlight: 'waste'
    },
    {
      id: 4,
      type: 'thought',
      content: 'I must have the wrong file path. Let me check the directory contents.',
      icon: <Terminal size={16} className="text-slate-400" />,
      highlight: 'recovery'
    },
    {
      id: 5,
      type: 'tool',
      content: 'Action: run_command\nInput: ls -la',
      icon: <Wrench size={16} className="text-blue-400" />,
      highlight: null
    },
    {
      id: 6,
      type: 'tool',
      content: 'Action: run_command\nInput: rm -rf tmp/',
      icon: <AlertCircle size={16} className="text-amber-400" />,
      highlight: 'hitl'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
          <Search size={16} /> Execution Trace
        </h3>
        <div className="space-y-2">
          {traceSteps.map((step) => (
            <div
              key={step.id}
              onClick={() => setSelectedStep(step.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-colors ${selectedStep === step.id ? 'bg-slate-800 border-blue-500' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{step.icon}</div>
                <div className="flex-1">
                  <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap">{step.content}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-center items-center text-center">
        {!selectedStep ? (
          <div className="text-slate-500 text-sm italic">
            Click on a step in the trace to analyze it.
          </div>
        ) : (
          <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4">
            {traceSteps.find(s => s.id === selectedStep)?.highlight === 'good' && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900/50">
                <CheckCircle2 className="mx-auto text-emerald-400 mb-3" size={32} />
                <h4 className="font-bold text-emerald-300 mb-2">Good Decision</h4>
                <p className="text-xs text-slate-400">The agent immediately recognized it needed a custom Python script to parse the CSV effectively.</p>
              </div>
            )}
            {traceSteps.find(s => s.id === selectedStep)?.highlight === 'waste' && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/50">
                <XCircle className="mx-auto text-rose-400 mb-3" size={32} />
                <h4 className="font-bold text-rose-300 mb-2">Wasted Step</h4>
                <p className="text-xs text-slate-400">It guessed the filename instead of checking the environment first, wasting a model call.</p>
              </div>
            )}
            {traceSteps.find(s => s.id === selectedStep)?.highlight === 'recovery' && (
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-900/50">
                <Terminal className="mx-auto text-blue-400 mb-3" size={32} />
                <h4 className="font-bold text-blue-300 mb-2">Error Recovery</h4>
                <p className="text-xs text-slate-400">The harness caught the exception, fed it back to the model, and the model correctly decided to list the directory to find the real file.</p>
              </div>
            )}
            {traceSteps.find(s => s.id === selectedStep)?.highlight === 'hitl' && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-900/50">
                <AlertCircle className="mx-auto text-amber-400 mb-3" size={32} />
                <h4 className="font-bold text-amber-300 mb-2">HITL Required</h4>
                <p className="text-xs text-slate-400">The agent decided to run a destructive command. A human-in-the-loop checkpoint should have paused execution here.</p>
              </div>
            )}
            {traceSteps.find(s => s.id === selectedStep)?.highlight === null && (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <Terminal className="mx-auto text-slate-400 mb-3" size={32} />
                <h4 className="font-bold text-slate-300 mb-2">Routine Step</h4>
                <p className="text-xs text-slate-400">Standard agent behavior. Nothing critical to analyze here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
