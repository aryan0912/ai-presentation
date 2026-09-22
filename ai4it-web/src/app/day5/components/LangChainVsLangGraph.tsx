'use client';
import React, { useState, useEffect } from 'react';
import { Network, ArrowRight, Play, Square, Bot, FileText, Settings, RefreshCw, Layers } from 'lucide-react';

export default function LangChainVsLangGraph() {
  const [activeTab, setActiveTab] = useState<'chain' | 'graph'>('chain');
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);

  // Animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => {
          if (activeTab === 'chain' && prev >= 3) return 3; // Chain stops
          if (activeTab === 'graph' && prev >= 5) return 0; // Graph loops
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeTab]);

  const reset = () => {
    setIsPlaying(false);
    setStep(0);
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-xl p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-500/20 rounded-xl mb-4">
          <Layers size={32} className="text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Under the Hood: LangChain vs LangGraph</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Why did the industry move from <strong>Chains</strong> (linear pipelines) to <strong>Graphs</strong> (state machines)? Because true agents need a "while loop" to recover from errors and think in cycles.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => { setActiveTab('chain'); reset(); }}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            activeTab === 'chain' 
              ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          LangChain (Linear)
        </button>
        <button
          onClick={() => { setActiveTab('graph'); reset(); }}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            activeTab === 'graph' 
              ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          LangGraph (Cyclic)
        </button>
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8 min-h-[300px] relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
          >
            {isPlaying ? <Square size={16} /> : <Play size={16} />}
          </button>
          <button 
            onClick={reset}
            className="p-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {activeTab === 'chain' ? (
          // LINEAR CHAIN VISUALIZATION
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-lg font-bold text-blue-300 mb-8">Strict Linear Pipeline</h3>
            <div className="flex items-center gap-4 w-full max-w-3xl justify-between relative">
              
              <div className={`flex flex-col items-center gap-2 z-10 transition-all duration-300 ${step >= 0 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${step === 0 ? 'bg-blue-900 border-blue-500 scale-110' : 'bg-slate-800 border-slate-700'}`}>
                  <FileText className={step === 0 ? 'text-blue-400' : 'text-slate-500'} />
                </div>
                <span className="text-sm font-mono text-slate-300">Prompt</span>
              </div>
              
              <div className="flex-1 h-1 bg-slate-700 relative overflow-hidden">
                <div className={`absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500 ${step >= 1 ? 'w-full' : 'w-0'}`}></div>
              </div>

              <div className={`flex flex-col items-center gap-2 z-10 transition-all duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${step === 1 ? 'bg-blue-900 border-blue-500 scale-110' : 'bg-slate-800 border-slate-700'}`}>
                  <Bot className={step === 1 ? 'text-blue-400' : 'text-slate-500'} />
                </div>
                <span className="text-sm font-mono text-slate-300">LLM Call</span>
              </div>

              <div className="flex-1 h-1 bg-slate-700 relative overflow-hidden">
                <div className={`absolute top-0 left-0 h-full bg-blue-500 transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
              </div>

              <div className={`flex flex-col items-center gap-2 z-10 transition-all duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${step >= 2 ? 'bg-emerald-900 border-emerald-500 scale-110' : 'bg-slate-800 border-slate-700'}`}>
                  <Settings className={step >= 2 ? 'text-emerald-400' : 'text-slate-500'} />
                </div>
                <span className="text-sm font-mono text-slate-300">Output Parsed</span>
              </div>
            </div>
            
            <div className="mt-12 text-center text-slate-400 text-sm max-w-md">
              <p>Data flows strictly left to right. If the Output Parsing fails, the chain breaks entirely. It cannot go back and ask the LLM to fix its formatting.</p>
            </div>
          </div>
        ) : (
          // CYCLIC GRAPH VISUALIZATION
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-lg font-bold text-purple-300 mb-8">Cyclic State Machine (The While Loop)</h3>
            
            <div className="relative w-64 h-64">
              {/* Agent Node */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 transition-all duration-300 ${step === 0 || step === 2 || step === 4 ? 'opacity-100 scale-110' : 'opacity-70'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${step === 0 || step === 2 || step === 4 ? 'bg-purple-900 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-slate-800 border-slate-700'}`}>
                  <Bot className={step === 0 || step === 2 || step === 4 ? 'text-purple-400' : 'text-slate-500'} />
                </div>
                <span className="text-sm font-mono font-bold text-white">Agent Node</span>
                {step === 4 && <span className="absolute -top-6 text-emerald-400 text-xs font-bold animate-bounce">Goal Reached!</span>}
              </div>

              {/* Tool Node */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 transition-all duration-300 ${step === 1 || step === 3 ? 'opacity-100 scale-110' : 'opacity-70'}`}>
                <span className="text-sm font-mono font-bold text-white">Tool Node</span>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${step === 1 || step === 3 ? 'bg-amber-900 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-slate-800 border-slate-700'}`}>
                  <Settings className={step === 1 || step === 3 ? 'text-amber-400' : 'text-slate-500'} />
                </div>
                {step === 1 && <span className="absolute -bottom-6 text-rose-400 text-xs font-bold whitespace-nowrap">Error: Missing Arg</span>}
                {step === 3 && <span className="absolute -bottom-6 text-emerald-400 text-xs font-bold whitespace-nowrap">Success: Data Found</span>}
              </div>

              {/* Right Arrow (Agent to Tool) */}
              <svg className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 100 100">
                <path 
                  d="M 65 30 Q 80 50 65 70" 
                  fill="none" 
                  stroke={step === 0 || step === 2 ? "#a855f7" : "#334155"} 
                  strokeWidth="2"
                  strokeDasharray={step === 0 || step === 2 ? "4 4" : "0"}
                  className={step === 0 || step === 2 ? "animate-[dash_1s_linear_infinite]" : ""}
                />
                <polygon points="63,72 68,68 62,65" fill={step === 0 || step === 2 ? "#a855f7" : "#334155"} />
              </svg>

              {/* Left Arrow (Tool back to Agent) */}
              <svg className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 100 100">
                <path 
                  d="M 35 70 Q 20 50 35 30" 
                  fill="none" 
                  stroke={step === 1 || step === 3 ? "#f59e0b" : "#334155"} 
                  strokeWidth="2"
                  strokeDasharray={step === 1 || step === 3 ? "4 4" : "0"}
                  className={step === 1 || step === 3 ? "animate-[dash_1s_linear_infinite]" : ""}
                />
                <polygon points="37,28 32,32 38,35" fill={step === 1 || step === 3 ? "#f59e0b" : "#334155"} />
              </svg>
            </div>
            
            <div className="mt-8 text-center text-slate-400 text-sm max-w-md">
              <p>LangGraph introduces a shared <strong>State</strong>. The Agent tries a tool, the tool fails, updates the State, and loops back. The Agent sees the error and tries again.</p>
            </div>
            
            <style jsx>{`
              @keyframes dash {
                to { stroke-dashoffset: -8; }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}
