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
      title: '1. Document Loader',
      icon: <FileText size={20} className="text-sky-400" />,
      description: 'Point Langflow to the sample document (PDF/TXT/Markdown). If using local files, provide the local file path or upload directly into the canvas.',
      config: 'File: sample_sop_anand_chilling.txt (or upload your 3-page PDF)',
      gate: false
    },
    {
      id: 2,
      title: '2. Recursive Chunker',
      icon: <SplitSquareHorizontal size={20} className="text-sky-400" />,
      description: 'Split document into manageable semantic chunks. Chunk size 500 characters, overlap 50 characters to prevent cutting sentences in half.',
      config: 'Chunk Size: 500 | Chunk Overlap: 50 | Separators: ["\\n\\n", "\\n", " "]',
      gate: true,
      gateAction: 'Stop here. Raise your hand when chunker is wired to Document Loader. Observe how text is chopped before embedding.'
    },
    {
      id: 3,
      title: '3. Embedder Node',
      icon: <Layers size={20} className="text-purple-400" />,
      description: 'Converts chunks to dense vectors. On 16GB laptops without GPU, use local Ollama embeddings (nomic-embed-text) for 100% offline execution with zero memory strain.',
      config: 'Provider: Ollama Embeddings (http://localhost:11434) | Model: nomic-embed-text (or text-embedding-3-small via OpenRouter)',
      gate: false
    },
    {
      id: 4,
      title: '4. Vector Store Node',
      icon: <Database size={20} className="text-indigo-400" />,
      description: 'ChromaDB or In-Memory Vector Store. Ingests chunked text documents and calculates vector embeddings.',
      config: 'Collection: nddb_sop_store | Distance: Cosine Similarity',
      gate: true,
      gateAction: 'Stop here. Raise your hand when Vector Store is connected to both Chunker and Embedder. Vector database is now populated!'
    },
    {
      id: 5,
      title: '5. Retriever Node',
      icon: <Search size={20} className="text-emerald-400" />,
      description: 'Queries the Vector Store using approximate nearest neighbor search to pull the top-k most relevant chunks.',
      config: 'Search Type: Similarity | Search Kwargs (k): 4',
      gate: false
    },
    {
      id: 6,
      title: '6. Prompt Template Node',
      icon: <LayoutTemplate size={20} className="text-amber-400" />,
      description: 'The Climax: Connect the Retriever output into {context}! This is the exact R-C-I-I-O-C template from this morning, now populated automatically.',
      config: `Role: You are an authorized NDDB technical operations assistant.
Context: Use ONLY the following retrieved operational passages: {context}
Instruction: Answer the user question: {question}
Constraints: If the answer is not in the context, say "Information not found in authorized documents."`,
      gate: true,
      gateAction: 'The Grand Connection! Verify that Retriever output connects to {context} socket. Raise your hand to celebrate.'
    },
    {
      id: 7,
      title: '7. LLM Chat Node',
      icon: <Cpu size={20} className="text-rose-400" />,
      description: 'Inference model that synthesizes the grounded answer. Use Ollama (llama3.2:3b / phi3:mini) for local execution or OpenRouter.',
      config: 'Provider: Ollama (http://localhost:11434) | Model: llama3.2:3b (or phi3:mini) | Temperature: 0.1',
      gate: false
    },
    {
      id: 8,
      title: '8. Chat Interface',
      icon: <MessageSquare size={20} className="text-rose-400" />,
      description: 'Test grounding and refusal. Ask questions present in the SOP to test citations, then ask unanswerable questions to verify refusal.',
      config: 'Playground Chat: Test with "What is the threshold for Tank #3?"',
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
                  <p className="text-sm text-rose-300/80 mt-1">
                    {nodes[activeNode - 1].gateAction || `Stop here. Raise your hand when this node is connected and configured. We do not move to step ${activeNode + 1} until the whole room is synced.`}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center">
                {React.cloneElement(nodes[activeNode - 1].icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{nodes[activeNode - 1].title}</h2>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Step {activeNode} of 8</span>
              </div>
            </div>

            <p className="text-base text-slate-300 leading-relaxed mb-6">
              {nodes[activeNode - 1].description}
            </p>

            {/* Node Configuration Details */}
            {nodes[activeNode - 1].config && (
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">Canvas Configuration</span>
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap">
                  {nodes[activeNode - 1].config}
                </pre>
              </div>
            )}

            {/* Special Highlight for Node 6 */}
            {activeNode === 6 && (
              <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-900/50">
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
