'use client';

import React, { useState } from 'react';
import { User, Bot, Wrench, Server, CheckCircle, ArrowRight, Play, RotateCcw } from 'lucide-react';

export default function ToolCallingFlow() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: '1. User Intent',
      desc: '"Raise a ticket for Anand center - compressor hot."',
      icon: <User className="text-blue-400" size={24} />,
      activeColor: 'bg-blue-900/40 border-blue-500',
    },
    {
      id: 1,
      title: '2. Model Reasons',
      desc: 'LLM realizes it needs to act, emits a JSON tool request.',
      icon: <Bot className="text-purple-400" size={24} />,
      activeColor: 'bg-purple-900/40 border-purple-500',
    },
    {
      id: 2,
      title: '3. Your Code Executes',
      desc: 'Code receives JSON, calls the actual ticket API.',
      icon: <Server className="text-amber-400" size={24} />,
      activeColor: 'bg-amber-900/40 border-amber-500',
    },
    {
      id: 3,
      title: '4. Model Incorporates',
      desc: 'API returns success (Ticket #102). Model formulates response.',
      icon: <Wrench className="text-emerald-400" size={24} />,
      activeColor: 'bg-emerald-900/40 border-emerald-500',
    },
    {
      id: 4,
      title: '5. Final Answer',
      desc: '"I have raised ticket #102 for the Anand center."',
      icon: <CheckCircle className="text-blue-400" size={24} />,
      activeColor: 'bg-blue-900/40 border-blue-500',
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">How Tool Calling Actually Works</h3>
          <p className="text-slate-400 text-sm">
            The model has no hands. It never executes code. It only emits text requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleNext}
            disabled={step === steps.length - 1}
            className="button-primary"
          >
            <Play size={16} /> Step Forward
          </button>
          <button
            onClick={handleReset}
            className="button-secondary text-slate-400"
          >
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {steps.map((s, idx) => (
          <React.Fragment key={s.id}>
            <div
              className={`flex-1 flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-300 ${
                step >= s.id
                  ? s.activeColor
                  : 'bg-slate-900/30 border-slate-800/50 opacity-50 grayscale'
              }`}
            >
              <div className="mb-3 p-3 rounded-full bg-slate-950 border border-slate-800">
                {s.icon}
              </div>
              <h4 className="text-sm font-bold text-slate-200 mb-2">{s.title}</h4>
              <p className="text-xs text-slate-400 font-mono leading-relaxed">
                {s.desc}
              </p>
            </div>
            
            {idx < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center">
                <ArrowRight
                  size={20}
                  className={`transition-colors duration-300 ${
                    step > idx ? 'text-blue-400' : 'text-slate-700'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {step === 2 && (
        <div className="mt-8 p-4 rounded-xl bg-amber-950/20 border border-amber-900/50 animate-in fade-in slide-in-from-bottom-4">
          <h4 className="text-amber-400 text-sm font-bold mb-2 font-mono">🔍 Look Inside the JSON Payload</h4>
          <pre className="text-xs text-amber-200/70 overflow-x-auto">
{`{
  "name": "create_ticket",
  "arguments": {
    "center": "Anand",
    "issue": "compressor hot",
    "priority": "high"
  }
}`}
          </pre>
        </div>
      )}
    </div>
  );
}
