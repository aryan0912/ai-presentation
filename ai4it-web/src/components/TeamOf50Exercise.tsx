'use client';
import React, { useState } from 'react';
import { Users, FileText, Lock, DollarSign, ShieldAlert, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TeamOf50Exercise() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
      icon: <Users className="text-sky-400" />,
      title: "1. Hosted API or self-hosted local model? Justify it.",
      answer: "Hosted API (or a real GPU server) is likely required. One local model handles one user comfortably; 50 people with overlapping queries needs a request queue and concurrent inference power."
    },
    {
      icon: <Database className="text-purple-400" />,
      title: "2. Which vector store? Why not one of the others?",
      answer: "pgvector is very likely enough at this scale if NDDB already runs Postgres. Don't let a vendor over-engineer this. Milvus/Qdrant/Pinecone are real tools solving real problems that 50 users do not have."
    },
    {
      icon: <Lock className="text-rose-400" />,
      title: "3. How do you stop a restricted document from reaching someone who shouldn't see it?",
      answer: "Metadata tags on chunks, filtered at retrieval time. The same metadata that powers citations. There is no clean 'magic' answer here, but you must know to ask the vendor how they handle it."
    },
    {
      icon: <DollarSign className="text-emerald-400" />,
      title: "4. Roughly what does this cost per month? Show your reasoning.",
      answer: "API token cost × expected query volume (plus fixed DB hosting), versus GPU/server amortization for local. Either answer is defensible; an unjustified answer is not."
    },
    {
      icon: <ShieldAlert className="text-amber-400" />,
      title: "5. What do you check before letting 50 colleagues touch it?",
      answer: "A small fixed set of known Q&A pairs (a golden dataset), run and eyeballed using LLM-as-judge. Not a full academic eval harness, but definitely not just 'vibes'."
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Scenario Card */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full border-b border-l border-amber-500/20" />
        <div className="absolute top-4 right-4"><FileText className="text-amber-500/30" size={64} /></div>

        <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest font-mono text-amber-500">The Scenario</h3>
        
        <div className="space-y-4 text-lg text-slate-300 font-serif leading-relaxed relative z-10">
          <p>
            Your department wants a RAG assistant over roughly <strong className="text-white">2,000 internal documents</strong> — SOPs, manuals, and past incident reports. 
          </p>
          <p>
            About <strong className="text-white">50 people</strong> will use it, mostly during working hours. Some documents are <strong className="text-white border-b-2 border-rose-500/50">restricted</strong> to certain roles. Budget exists but is not unlimited. 
          </p>
          <p className="font-bold text-white mt-8 uppercase tracking-widest text-sm font-mono">
            Make the calls:
          </p>
        </div>
      </div>

      {/* Accordion Questions */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const isOpen = openIndex === idx;
          
          return (
            <div key={idx} className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
              <button 
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-700">
                    {q.icon}
                  </div>
                  <span className="font-bold text-white text-lg">{q.title}</span>
                </div>
                <ChevronDown className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 pl-20">
                      <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/50 flex items-start gap-3">
                        <Check className="text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold block mb-1">Reference Answer</span>
                          <p className="text-slate-300 leading-relaxed text-sm">{q.answer}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
}

// Quick dummy component for the icon missing in import
function Database({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>;
}
