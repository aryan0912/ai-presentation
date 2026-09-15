'use client';
import React, { useState } from 'react';
import { Network, Database, Cpu, Search, SplitSquareHorizontal, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MultiQueryDiagram() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Standard RAG", desc: "User asks a question. We search the DB for those exact words." },
    { title: "The Failure", desc: "User says 'tanker late'. DB says 'delayed dispatch'. No match." },
    { title: "Multi-Query Branching", desc: "LLM reformulates the question 3 ways in parallel." },
    { title: "Merge & Generate", desc: "All results are merged, deduped, and fed to the final LLM." }
  ];

  const advance = () => setActiveStep(s => (s + 1) % 4);

  return (
    <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl my-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Step Controls */}
        <div className="md:w-1/3 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-xl">The Word Match Problem</h3>
          </div>
          
          <div className="space-y-2">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  activeStep === idx 
                    ? 'bg-slate-800 border-sky-500/50 shadow-lg' 
                    : 'bg-slate-900/50 border-slate-800 opacity-60'
                }`}
              >
                <h4 className={`font-bold text-sm ${activeStep === idx ? 'text-sky-400' : 'text-slate-300'}`}>
                  {idx + 1}. {step.title}
                </h4>
                {activeStep === idx && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-xs text-slate-400 mt-2">
                    {step.desc}
                  </motion.p>
                )}
              </div>
            ))}
          </div>

          <button onClick={advance} className="w-full mt-4 p-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-colors shadow-lg shadow-sky-900/50">
            Next Step →
          </button>
        </div>

        {/* Diagram Area */}
        <div className="md:w-2/3 min-h-[350px] bg-slate-900 rounded-2xl border border-slate-700 flex flex-col items-center justify-center p-8 relative">
          
          <div className="text-center font-mono text-sm text-slate-300 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 mb-8 z-10 w-full max-w-sm shadow-xl">
            User: "Why is my tanker late?"
          </div>

          <AnimatePresence mode="popLayout">
            {activeStep === 0 && (
              <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full max-w-sm">
                <div className="w-px h-8 bg-slate-600"></div>
                <div className="p-4 bg-emerald-950/40 border border-emerald-900/50 rounded-xl text-emerald-400 text-sm font-bold flex items-center gap-2">
                  <Search size={18} /> Vector Database Search
                </div>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full max-w-sm">
                <div className="w-px h-8 bg-rose-500"></div>
                <div className="p-4 bg-rose-950/40 border border-rose-900/50 rounded-xl text-rose-400 text-sm font-bold flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2"><Search size={18} /> Vector Database Search</div>
                  <span className="text-xs font-normal">Misses document containing "Delayed Dispatch"</span>
                </div>
              </motion.div>
            )}

            {(activeStep === 2 || activeStep === 3) && (
              <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full">
                <div className="w-px h-6 bg-sky-500"></div>
                
                {/* LLM Reformulator Node */}
                <div className="p-3 bg-sky-950/50 border border-sky-800 rounded-lg text-sky-300 text-xs font-bold font-mono shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                  LLM Reformulator
                </div>
                
                {/* Branches */}
                <div className="flex gap-4 mt-4 relative w-full max-w-md justify-between">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-slate-700"></div>
                  
                  <div className="flex flex-col items-center flex-1 z-10 pt-4">
                    <div className="w-px h-4 bg-slate-700 absolute top-0"></div>
                    <div className="p-2 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 text-center shadow-lg">
                      "Why is my tanker late?"
                    </div>
                  </div>
                  <div className="flex flex-col items-center flex-1 z-10 pt-4">
                    <div className="w-px h-4 bg-slate-700 absolute top-0"></div>
                    <div className="p-2 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 text-center shadow-lg">
                      "Chilling center delay reasons"
                    </div>
                  </div>
                  <div className="flex flex-col items-center flex-1 z-10 pt-4">
                    <div className="w-px h-4 bg-slate-700 absolute top-0"></div>
                    <div className="p-2 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 text-center shadow-lg">
                      "Delayed dispatch procedure"
                    </div>
                  </div>
                </div>

                {activeStep === 3 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center w-full mt-4">
                    <div className="flex gap-12 w-full max-w-md justify-center mb-4">
                      <div className="w-px h-6 bg-emerald-500"></div>
                      <div className="w-px h-6 bg-emerald-500"></div>
                      <div className="w-px h-6 bg-emerald-500"></div>
                    </div>
                    
                    <div className="p-4 w-full max-w-md bg-emerald-950/40 border border-emerald-900 rounded-xl text-emerald-400 text-sm font-bold flex justify-center items-center gap-2">
                      <CheckCircle2 size={18} /> Merge & Deduplicate Context
                    </div>
                    
                    <div className="w-px h-6 bg-slate-600"></div>
                    <div className="p-3 w-full max-w-xs bg-slate-900 border border-slate-700 rounded-xl text-white text-sm font-bold flex justify-center items-center gap-2">
                      <MessageSquare size={16} /> Final LLM Answer
                    </div>
                  </motion.div>
                )}

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
