'use client';
import React, { useState } from 'react';
import { Network, Database, Globe, Terminal, Server, ArrowRightLeft, Cpu, Activity, Workflow } from 'lucide-react';

export default function McpDiagram() {
  const [showMcp, setShowMcp] = useState(false);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-xl p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-purple-500/20 rounded-xl mb-4">
          <Network size={32} className="text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">The Integration Problem</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          Before MCP, every AI agent needed custom code to talk to every data source (N x M). 
          MCP introduces a standard protocol—the "USB-C of AI"—reducing the problem to 1 x 1.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-slate-800 p-1 rounded-lg inline-flex">
          <button 
            onClick={() => setShowMcp(false)}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${
              !showMcp ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            The Old Way (N × M)
          </button>
          <button 
            onClick={() => setShowMcp(true)}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${
              showMcp ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            The MCP Way (USB-C)
          </button>
        </div>
      </div>

      <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-8 min-h-[400px] flex items-center justify-center relative overflow-hidden">
        
        {!showMcp ? (
          // N x M Spaghetti Visual
          <div className="w-full max-w-3xl flex justify-between items-center relative animate-fade-in">
            {/* Hosts */}
            <div className="flex flex-col gap-6 z-10">
              <div className="bg-slate-800 border border-slate-600 p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg"><Cpu size={24} /></div>
                <span className="font-bold text-slate-200">Claude</span>
              </div>
              <div className="bg-slate-800 border border-slate-600 p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><Terminal size={24} /></div>
                <span className="font-bold text-slate-200">ChatGPT</span>
              </div>
              <div className="bg-slate-800 border border-slate-600 p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Activity size={24} /></div>
                <span className="font-bold text-slate-200">Antigravity</span>
              </div>
            </div>

            {/* Spaghetti Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              {/* Claude to DB/API/Files */}
              <path d="M 180 60 Q 400 60 620 60" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 180 60 Q 400 150 620 180" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 180 60 Q 400 250 620 300" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              
              {/* ChatGPT to DB/API/Files */}
              <path d="M 180 180 Q 400 100 620 60" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 180 180 Q 400 180 620 180" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 180 180 Q 400 250 620 300" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />

              {/* Antigravity to DB/API/Files */}
              <path d="M 180 300 Q 400 200 620 60" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 180 300 Q 400 250 620 180" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 180 300 Q 400 300 620 300" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            {/* The Custom Code Wall */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
              <div className="w-16 h-32 bg-rose-500/20 border-2 border-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-rose-400 font-bold -rotate-90 whitespace-nowrap">Custom SDKs</span>
              </div>
              <div className="w-16 h-32 bg-rose-500/20 border-2 border-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-rose-400 font-bold -rotate-90 whitespace-nowrap">API Keys</span>
              </div>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-6 z-10">
              <div className="bg-slate-800 border border-slate-600 p-4 rounded-xl flex items-center gap-3 w-40">
                <div className="p-2 bg-slate-700 text-slate-300 rounded-lg"><Database size={24} /></div>
                <span className="font-bold text-slate-200">SQL DB</span>
              </div>
              <div className="bg-slate-800 border border-slate-600 p-4 rounded-xl flex items-center gap-3 w-40">
                <div className="p-2 bg-slate-700 text-slate-300 rounded-lg"><Globe size={24} /></div>
                <span className="font-bold text-slate-200">REST API</span>
              </div>
              <div className="bg-slate-800 border border-slate-600 p-4 rounded-xl flex items-center gap-3 w-40">
                <div className="p-2 bg-slate-700 text-slate-300 rounded-lg"><Workflow size={24} /></div>
                <span className="font-bold text-slate-200">Local Files</span>
              </div>
            </div>
          </div>
        ) : (
          // MCP Architecture
          <div className="w-full max-w-4xl flex flex-col items-center gap-8 relative animate-fade-in">
            <div className="flex justify-between items-center w-full relative z-10">
              {/* Hosts */}
              <div className="flex flex-col gap-4">
                <div className="bg-slate-800 border border-slate-600 px-4 py-2 rounded-xl flex items-center gap-3 w-40">
                  <Cpu size={18} className="text-orange-400" />
                  <span className="font-bold text-slate-200 text-sm">Claude</span>
                </div>
                <div className="bg-slate-800 border border-slate-600 px-4 py-2 rounded-xl flex items-center gap-3 w-40">
                  <Terminal size={18} className="text-emerald-400" />
                  <span className="font-bold text-slate-200 text-sm">ChatGPT</span>
                </div>
                <div className="bg-slate-800 border border-slate-600 px-4 py-2 rounded-xl flex items-center gap-3 w-40 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <Activity size={18} className="text-blue-400" />
                  <span className="font-bold text-blue-300 text-sm">Antigravity</span>
                </div>
              </div>

              {/* MCP Protocol Bus */}
              <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                <div className="w-full h-2 bg-purple-500/30 rounded-full relative">
                  <div className="absolute top-1/2 left-0 w-full border-t-2 border-purple-500 border-dashed animate-[dash_2s_linear_infinite]"></div>
                </div>
                <div className="bg-purple-900 border-2 border-purple-500 px-4 py-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                  <span className="font-bold text-purple-200 text-sm flex items-center gap-2">
                    <ArrowRightLeft size={16} /> JSON-RPC over Stdio
                  </span>
                </div>
              </div>

              {/* MCP Server */}
              <div className="bg-slate-800 border-2 border-emerald-500 p-6 rounded-2xl flex flex-col items-center gap-4 w-48 shadow-[0_0_20px_rgba(16,185,129,0.2)] relative">
                <div className="absolute -top-3 bg-emerald-500 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">MCP Server</div>
                <Server size={40} className="text-emerald-400" />
                <span className="text-sm font-mono text-slate-300 text-center">Your Python/Node.js Boilerplate</span>
              </div>
            </div>

            {/* Backend connection */}
            <div className="w-px h-12 bg-emerald-500/50 border-l-2 border-emerald-500 border-dashed ml-auto mr-24"></div>

            {/* Resources */}
            <div className="flex justify-end w-full gap-4 relative z-10">
              <div className="bg-slate-800 border border-slate-600 p-4 rounded-xl flex items-center gap-3 shadow-lg">
                <Database size={20} className="text-slate-400" />
                <span className="font-bold text-slate-200 text-sm">SQL DB</span>
              </div>
              <div className="bg-slate-800 border border-slate-600 p-4 rounded-xl flex items-center gap-3 shadow-lg">
                <Globe size={20} className="text-slate-400" />
                <span className="font-bold text-slate-200 text-sm">REST API</span>
              </div>
            </div>

          </div>
        )}

      </div>
      
      <style jsx>{`
        @keyframes dash {
          to { stroke-dashoffset: -16; }
        }
      `}</style>
    </div>
  );
}
