'use client';
import React, { useState } from 'react';
import { 
  FileText, 
  SplitSquareHorizontal, 
  Layers, 
  Database, 
  Search, 
  LayoutTemplate, 
  Cpu, 
  MessageSquare,
  CheckCircle2,
  AlertOctagon,
  ChevronRight
} from 'lucide-react';

export default function LangflowBuildPage() {
  const [activeNode, setActiveNode] = useState(1);

  const nodes = [
    {
      id: 1,
      title: 'Document Loader',
      icon: <FileText size={20} className="text-sky-400" />,
      description: 'Point Langflow to the sample document (or your own if ready).',
      gate: false
    },
    {
      id: 2,
      title: 'Chunker Node',
      icon: <SplitSquareHorizontal size={20} className="text-sky-400" />,
      description: 'Set chunk size. Remember the tradeoff: too small loses context, too large dilutes relevance.',
      gate: true
    },
    {
      id: 3,
      title: 'Embedder Node',
      icon: <Layers size={20} className="text-purple-400" />,
      description: 'Connect to an OpenRouter-hosted embedding model (e.g., text-embedding-3-small).',
      gate: false
    },
    {
      id: 4,
      title: 'Vector Store Node',
      icon: <Database size={20} className="text-indigo-400" />,
      description: 'Create the database to hold your embedded chunks.',
      gate: true
    },
    {
      id: 5,
      title: 'Retriever Node',
      icon: <Search size={20} className="text-emerald-400" />,
      description: 'Wire the Vector Store to the Retriever to pull the nearest neighbors.',
      gate: false
    },
    {
      id: 6,
      title: 'Prompt Template Node',
      icon: <LayoutTemplate size={20} className="text-amber-400" />,
      description: 'Look at what this node wants: Role, Context, Instruction. This is exactly the R-C-I-I-O-C framework from this morning! The Context field is now filled automatically by the Retriever.',
      gate: true
    },
    {
      id: 7,
      title: 'LLM Node',
      icon: <Cpu size={20} className="text-rose-400" />,
      description: 'Connect to an OpenRouter chat model (e.g., GPT-4o-mini or Claude 3 Haiku).',
      gate: false
    },
    {
      id: 8,
      title: 'Chat Output',
      icon: <MessageSquare size={20} className="text-rose-400" />,
      description: 'Run it via Langflow\'s chat interface. Ask it something the source document actually answers.',
      gate: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 p-6 md:p-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 3 · Block 4</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Live Build: Your First RAG Pipeline
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Open Langflow. We are going to build this piece by piece. Do not race ahead. We have <span className="text-rose-400 font-bold">Checkpoint Gates</span> where you must raise your hand to confirm your node is connected.
        </p>
      </div>

      {/* Interactive Step-by-Step Build */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Step List (Left Column) */}
        <div className="lg:col-span-5 space-y-3">
          {nodes.map((node) => {
            const isActive = activeNode === node.id;
            const isCompleted = activeNode > node.id;

            return (
              <div 
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                  isActive 
                    ? 'bg-slate-800 border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.15)]' 
                    : isCompleted
                      ? 'bg-slate-900 border-emerald-900/50 opacity-70'
                      : 'bg-slate-950 border-slate-800 opacity-50 hover:opacity-80'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center shrink-0 border border-slate-800">
                  {isCompleted ? <CheckCircle2 size={16} className="text-emerald-500" /> : <span className="text-xs font-bold text-slate-400">{node.id}</span>}
                </div>
                
                <div className="flex-1 font-bold text-white flex items-center gap-2">
                  {node.icon}
                  {node.title}
                </div>

                {node.gate && (
                  <div title="Checkpoint Gate" className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest ${isActive ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-500'}`}>
                    Gate
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Node Detail (Right Column) */}
        <div className="lg:col-span-7">
          <div className="sticky top-24 p-8 rounded-3xl bg-slate-900 border border-slate-800 min-h-[400px] flex flex-col">
            
            {nodes[activeNode - 1].gate && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/30 border border-rose-900/50 flex items-start gap-3">
                <AlertOctagon className="text-rose-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-rose-400">Checkpoint Gate</h4>
                  <p className="text-sm text-rose-300/70 mt-1">
                    Stop here. Raise your hand when this node is connected and configured. We do not move to step {activeNode + 1} until the whole room is synced.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center">
                {React.cloneElement(nodes[activeNode - 1].icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{nodes[activeNode - 1].title}</h2>
                <span className="text-sm font-mono text-slate-500 uppercase tracking-widest">Node {activeNode} of 8</span>
              </div>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed flex-1">
              {nodes[activeNode - 1].description}
            </p>

            {/* Special Highlight for Node 6 */}
            {activeNode === 6 && (
              <div className="mt-6 p-5 rounded-xl bg-amber-950/20 border border-amber-900/50">
                <h4 className="font-bold text-amber-400 mb-2">The Moment It Ties Together</h4>
                <p className="text-sm text-slate-300 italic">
                  "You already know how to write this node. You learned it before lunch. The only thing that's new is that the Context field is now filled dynamically by the Retriever instead of by you pasting it."
                </p>
              </div>
            )}

            <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-800">
              <button 
                onClick={() => setActiveNode(Math.max(1, activeNode - 1))}
                disabled={activeNode === 1}
                className="text-sm text-slate-500 hover:text-white disabled:opacity-30 transition-colors"
              >
                ← Previous Node
              </button>

              <button 
                onClick={() => setActiveNode(Math.min(8, activeNode + 1))}
                disabled={activeNode === 8}
                className="button-primary flex items-center gap-2 disabled:opacity-30"
              >
                Next Node <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Homework Brief */}
      <div className="mt-16 p-8 rounded-3xl bg-slate-950 border border-emerald-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <h2 className="text-2xl font-bold text-emerald-400 mb-2">End of Day 3: Homework Brief</h2>
        <p className="text-slate-300 mb-6 max-w-2xl">
          Tomorrow starts by pointing this exact pipeline at <strong>your</strong> files. Bring documents you'd be comfortable having on screen in this room.
        </p>
        <ul className="space-y-3 text-sm text-slate-400 list-disc pl-5">
          <li><strong>Keep it small:</strong> A handful of documents, not a 400-page archive (otherwise you'll sit watching an embedding progress bar).</li>
          <li><strong>No confidential data:</strong> Do not bring live customer data or PII.</li>
          <li><strong>Fallback:</strong> If you don't bring anything, we will provide sample SOPs and technical manuals.</li>
        </ul>
      </div>

    </div>
  );
}
