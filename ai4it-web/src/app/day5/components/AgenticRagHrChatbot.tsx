'use client';
import React, { useState } from 'react';
import { Database, FileText, Bot, ArrowRight, ArrowDown, User, Network, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AgenticRagHrChatbot() {
  const [activeScenario, setActiveScenario] = useState<number | null>(null);

  const scenarios = [
    {
      id: 1,
      query: "How many casual leaves do I have left this year?",
      intent: "structured",
      description: "The Agent recognizes this requires an exact number from the database.",
      tool: "SQL Database (Leaves Table)"
    },
    {
      id: 2,
      query: "What is the bereavement policy for immediate family?",
      intent: "unstructured",
      description: "The Agent recognizes this requires reading the PDF employee handbook.",
      tool: "Vector DB (RAG Search)"
    },
    {
      id: 3,
      query: "I need to take 3 days of sick leave starting tomorrow.",
      intent: "action",
      description: "The Agent recognizes this is an action that modifies state.",
      tool: "API POST (Apply Leave)"
    }
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-xl p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-amber-500/20 rounded-xl mb-4">
          <UserCog size={32} className="text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Agentic RAG: The HR Chatbot</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Unlike simple RAG which only searches documents, an <strong>Agentic RAG</strong> system acts as a router. 
          It decides whether to query a SQL database for exact numbers, search a Vector DB for policies, or trigger an API action.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
        {/* Left Side: User Inputs */}
        <div className="flex flex-col gap-3 w-full lg:w-1/3">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Simulate User Query</h3>
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(s.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                activeScenario === s.id 
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-100' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <User size={18} className={activeScenario === s.id ? 'text-blue-400' : 'text-slate-500'} />
                <span className="text-sm font-medium">"{s.query}"</span>
              </div>
            </button>
          ))}
        </div>

        {/* Middle: The Agent Router */}
        <div className="flex flex-col items-center relative">
          <div className="hidden lg:block w-16 h-px bg-slate-700 absolute left-[-64px] top-1/2"></div>
          <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 z-10 transition-colors duration-500 ${
            activeScenario ? 'bg-indigo-900 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.4)]' : 'bg-slate-800 border-slate-700'
          }`}>
            <Bot size={40} className={activeScenario ? 'text-indigo-400' : 'text-slate-500'} />
          </div>
          <div className="mt-4 text-center">
            <span className="font-bold text-slate-200">The LLM Router</span>
            <p className="text-xs text-slate-500 mt-1">Decides which tool to use</p>
          </div>
          
          {/* Dynamic routing arrow visualization (Desktop) */}
          {activeScenario && (
            <div className="hidden lg:block absolute right-[-64px] top-1/2 w-16 h-px bg-indigo-500">
              <div className="absolute right-0 top-[-4px] w-2 h-2 border-t-2 border-r-2 border-indigo-500 rotate-45"></div>
            </div>
          )}
        </div>

        {/* Right Side: Tools */}
        <div className="flex flex-col gap-4 w-full lg:w-1/3 relative">
          {/* SQL Tool */}
          <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
            activeScenario === 1 ? 'bg-emerald-900/30 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-slate-800/50 border-slate-700/50 opacity-50'
          }`}>
            <div className={`p-3 rounded-lg ${activeScenario === 1 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
              <Database size={24} />
            </div>
            <div>
              <h4 className={`font-bold ${activeScenario === 1 ? 'text-emerald-300' : 'text-slate-400'}`}>SQL Database</h4>
              <p className="text-xs text-slate-500 mt-1">Employee Leave Balances</p>
            </div>
            {activeScenario === 1 && <CheckCircle2 className="ml-auto text-emerald-400" size={20} />}
          </div>

          {/* RAG Tool */}
          <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
            activeScenario === 2 ? 'bg-amber-900/30 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-slate-800/50 border-slate-700/50 opacity-50'
          }`}>
            <div className={`p-3 rounded-lg ${activeScenario === 2 ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-500'}`}>
              <FileText size={24} />
            </div>
            <div>
              <h4 className={`font-bold ${activeScenario === 2 ? 'text-amber-300' : 'text-slate-400'}`}>Vector Search (RAG)</h4>
              <p className="text-xs text-slate-500 mt-1">PDF HR Policy Documents</p>
            </div>
            {activeScenario === 2 && <CheckCircle2 className="ml-auto text-amber-400" size={20} />}
          </div>

          {/* Action Tool */}
          <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
            activeScenario === 3 ? 'bg-rose-900/30 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'bg-slate-800/50 border-slate-700/50 opacity-50'
          }`}>
            <div className={`p-3 rounded-lg ${activeScenario === 3 ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700 text-slate-500'}`}>
              <Network size={24} />
            </div>
            <div>
              <h4 className={`font-bold ${activeScenario === 3 ? 'text-rose-300' : 'text-slate-400'}`}>API Action</h4>
              <p className="text-xs text-slate-500 mt-1">POST /api/leaves/apply</p>
            </div>
            {activeScenario === 3 && <CheckCircle2 className="ml-auto text-rose-400" size={20} />}
          </div>
        </div>
      </div>

      {/* Explanation Banner */}
      {activeScenario && (
        <div className="mt-8 p-4 bg-slate-800 rounded-xl border border-slate-700 flex gap-4 animate-fade-in">
          <div className="shrink-0 p-2 bg-indigo-500/20 rounded-full text-indigo-400 h-fit">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-200 mb-1">Agent Reasoning Trace</h4>
            <p className="text-sm text-slate-400">
              {scenarios.find(s => s.id === activeScenario)?.description} The LLM generated a structured JSON payload targeting the <strong className="text-slate-300">{scenarios.find(s => s.id === activeScenario)?.tool}</strong> tool instead of just generating conversational text.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Minimal placeholder for UserCog since it wasn't imported from lucide-react in the header
function UserCog(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <circle cx="19" cy="11" r="2" />
      <path d="M19 8v1.5" />
      <path d="M19 12.5V14" />
      <path d="M21.5 11H20" />
      <path d="M18 11h-1.5" />
    </svg>
  );
}
