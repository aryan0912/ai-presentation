'use client';
import React, { useState } from 'react';
import { Cloud, Server, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LocalModelToggle() {
  const [isLocal, setIsLocal] = useState(false);

  return (
    <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl my-8 relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between mb-8 z-10 relative">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">The Privacy Pivot</h3>
          <p className="text-sm text-slate-400">Tonight you're pointing this pipeline at your own personal documents. Do you want them going to a cloud API?</p>
        </div>

        {/* Toggle */}
        <div className="flex p-1 bg-slate-900 border border-slate-700 rounded-xl shrink-0 cursor-pointer">
          <div 
            onClick={() => setIsLocal(false)}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${!isLocal ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <Cloud size={16} /> Hosted Cloud API
          </div>
          <div 
            onClick={() => setIsLocal(true)}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${isLocal ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            <Server size={16} /> Local Private Model
          </div>
        </div>
      </div>

      {/* Visual State */}
      <div className="relative p-6 rounded-2xl border bg-slate-900 transition-colors duration-500 overflow-hidden flex flex-col md:flex-row items-center gap-8 min-h-[250px]">
        {/* Network Animation BG */}
        <div className={`absolute inset-0 opacity-10 transition-colors duration-1000 ${isLocal ? 'bg-emerald-500' : 'bg-sky-500'}`} />
        
        {/* Laptop */}
        <div className="z-10 bg-slate-950 p-6 rounded-xl border border-slate-700 flex flex-col items-center shadow-2xl relative">
          <Server size={32} className="text-slate-300 mb-2" />
          <span className="font-bold text-slate-300">Your Laptop</span>
          <span className="text-xs text-slate-500 font-mono">192.168.x.x</span>
          
          {/* Data packet animation */}
          {!isLocal && (
            <motion.div 
              animate={{ x: [0, 200] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-1/2 -right-4 w-4 h-4 bg-sky-400 rounded-full blur-sm"
            />
          )}
        </div>

        <div className="flex-1 flex justify-center z-10">
          {isLocal ? (
            <div className="flex flex-col items-center">
              <div className="p-3 bg-emerald-950/50 border border-emerald-900/80 rounded-full mb-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <ShieldCheck size={32} className="text-emerald-400" />
              </div>
              <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Air-gapped</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="h-px w-full max-w-[200px] border-t-2 border-dashed border-sky-500/50 relative">
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-900 px-2 text-[10px] text-sky-400 uppercase tracking-widest font-bold">Public Internet</div>
              </div>
            </div>
          )}
        </div>

        {/* Server */}
        <div className={`z-10 p-6 rounded-xl border flex flex-col items-center shadow-2xl transition-all duration-500 ${isLocal ? 'bg-slate-950/50 border-slate-800 opacity-30 grayscale' : 'bg-slate-950 border-sky-900'}`}>
          <Cloud size={32} className={`mb-2 ${isLocal ? 'text-slate-600' : 'text-sky-400'}`} />
          <span className={`font-bold ${isLocal ? 'text-slate-600' : 'text-slate-200'}`}>Cloud Provider</span>
          <span className="text-xs text-slate-500 font-mono">OpenRouter / OpenAI</span>
        </div>
      </div>

      {/* Explainer text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 relative z-10">
        <div className={`p-4 rounded-xl border transition-colors ${!isLocal ? 'bg-sky-950/20 border-sky-900/50' : 'bg-slate-900 border-slate-800 opacity-50'}`}>
          <h4 className="font-bold text-slate-200 mb-1">When to use Cloud:</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            When you need maximum intelligence (GPT-4) and the data is already public or permitted by corporate policy.
          </p>
        </div>
        <div className={`p-4 rounded-xl border transition-colors ${isLocal ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-slate-900 border-slate-800 opacity-50'}`}>
          <h4 className="font-bold text-slate-200 mb-1">When to use Local (Ollama):</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            When processing PII, internal financials, or unreleased HR policy. The model runs locally on your laptop's GPU.
          </p>
        </div>
      </div>

    </div>
  );
}
