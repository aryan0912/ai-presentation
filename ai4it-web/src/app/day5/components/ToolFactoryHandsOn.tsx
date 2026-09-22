'use client';
import React, { useState } from 'react';
import { Calculator, Database, Bot, Terminal, AlertTriangle, CheckCircle2, X } from 'lucide-react';

export default function ToolFactoryHandsOn() {
  const [tools, setTools] = useState({
    calculator: false,
    sql: false,
  });

  const [activePrompt, setActivePrompt] = useState<'math' | 'data' | null>(null);

  const prompts = {
    math: "Multiply 34,871.45 by 87.23 and divide by 1.18",
    data: "Fetch the current temperature of Chiller 4"
  };

  const getResponse = () => {
    if (activePrompt === 'math') {
      if (tools.calculator) {
        return (
          <div className="bg-emerald-950 border border-emerald-800 p-3 rounded-lg text-emerald-300 font-mono text-sm flex flex-col gap-2">
            <div className="flex items-center gap-2"><CheckCircle2 size={16} /> [TOOL CALL]: calculator</div>
            <div className="text-slate-400">{"{"}</div>
            <div className="pl-4 text-slate-300">"expression": "(34871.45 * 87.23) / 1.18"</div>
            <div className="text-slate-400">{"}"}</div>
            <div className="text-xs text-slate-500 mt-2">// The system executes this deterministically.</div>
          </div>
        );
      } else {
        return (
          <div className="bg-rose-950 border border-rose-800 p-3 rounded-lg text-rose-300 font-sans text-sm flex flex-col gap-2">
            <div className="flex items-center gap-2"><AlertTriangle size={16} /> [HALLUCINATION]</div>
            <div>"The answer is approximately 2,578,144.20."</div>
            <div className="text-xs text-rose-400/70 mt-2">// The LLM guessed the next tokens and failed at math.</div>
          </div>
        );
      }
    }

    if (activePrompt === 'data') {
      if (tools.sql) {
        return (
          <div className="bg-emerald-950 border border-emerald-800 p-3 rounded-lg text-emerald-300 font-mono text-sm flex flex-col gap-2">
            <div className="flex items-center gap-2"><CheckCircle2 size={16} /> [TOOL CALL]: query_sql</div>
            <div className="text-slate-400">{"{"}</div>
            <div className="pl-4 text-slate-300">"query": "SELECT temp FROM chillers WHERE id='CH-04'"</div>
            <div className="text-slate-400">{"}"}</div>
            <div className="text-xs text-slate-500 mt-2">// The system executes the query on the real database.</div>
          </div>
        );
      } else {
        return (
          <div className="bg-rose-950 border border-rose-800 p-3 rounded-lg text-rose-300 font-sans text-sm flex flex-col gap-2">
            <div className="flex items-center gap-2"><AlertTriangle size={16} /> [KNOWLEDGE CUTOFF]</div>
            <div>"I do not have access to real-time sensor data or internal NDDB chilling center metrics."</div>
            <div className="text-xs text-rose-400/70 mt-2">// The LLM cannot access private databases without a tool.</div>
          </div>
        );
      }
    }

    return (
      <div className="text-slate-500 text-sm italic p-4 text-center">
        Select a prompt above to see how the LLM responds...
      </div>
    );
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-xl p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">The Tool Factory Sandbox</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          Toggle the tools available to the LLM and click a prompt. Watch how a raw LLM hallucinates, while an Agent generates deterministic tool calls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Tool Configuration */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Available Tools</h3>
          
          <button 
            onClick={() => setTools({ ...tools, calculator: !tools.calculator })}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
              tools.calculator ? 'bg-blue-900/30 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${tools.calculator ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-500'}`}>
                <Calculator size={20} />
              </div>
              <div className="text-left">
                <div className={`font-bold ${tools.calculator ? 'text-blue-100' : 'text-slate-300'}`}>Calculator Tool</div>
                <div className="text-xs text-slate-500">evaluate_math_expression(expr)</div>
              </div>
            </div>
            {tools.calculator ? <CheckCircle2 className="text-blue-400" size={20} /> : <X className="text-slate-600" size={20} />}
          </button>

          <button 
            onClick={() => setTools({ ...tools, sql: !tools.sql })}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
              tools.sql ? 'bg-emerald-900/30 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${tools.sql ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
                <Database size={20} />
              </div>
              <div className="text-left">
                <div className={`font-bold ${tools.sql ? 'text-emerald-100' : 'text-slate-300'}`}>SQL Database Tool</div>
                <div className="text-xs text-slate-500">query_internal_db(query)</div>
              </div>
            </div>
            {tools.sql ? <CheckCircle2 className="text-emerald-400" size={20} /> : <X className="text-slate-600" size={20} />}
          </button>
        </div>

        {/* Right Side: Chat & Response */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Test the LLM</h3>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setActivePrompt('math')}
              className={`flex-1 p-2 text-xs font-medium rounded border transition-colors ${
                activePrompt === 'math' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Ask Math Question
            </button>
            <button 
              onClick={() => setActivePrompt('data')}
              className={`flex-1 p-2 text-xs font-medium rounded border transition-colors ${
                activePrompt === 'data' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Ask Database Question
            </button>
          </div>

          <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-4 min-h-[220px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-slate-300 text-sm font-semibold border-b border-slate-700 pb-2">
              <Bot size={18} className="text-indigo-400" /> Model Output
            </div>
            
            {activePrompt && (
              <div className="mb-4">
                <div className="text-xs text-slate-500 mb-1">User Prompt:</div>
                <div className="bg-slate-800/80 p-2 rounded text-sm text-slate-300 border border-slate-700/50">
                  "{prompts[activePrompt]}"
                </div>
              </div>
            )}

            <div className="mt-auto">
              {getResponse()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
