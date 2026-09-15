'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  SplitSquareHorizontal, 
  Layers, 
  Database, 
  Search, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Play, 
  Pause, 
  RotateCcw,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  shortName: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  bgColor: string;
  tag: string;
  day2Callback: string;
  description: string;
}

const STAGES: Stage[] = [
  {
    id: 1,
    name: 'Document Ingestion',
    shortName: 'Doc Ingest',
    icon: <FileText size={18} />,
    color: 'text-sky-400',
    borderColor: 'border-sky-500/40',
    bgColor: 'bg-sky-950/30',
    tag: 'DMS Source',
    day2Callback: 'Raw Unstructured Tokens',
    description: 'Ingests standard enterprise documents: NDDB SOPs, incident logs, chilling manuals.'
  },
  {
    id: 2,
    name: 'Text Chunking',
    shortName: 'Chunker',
    icon: <SplitSquareHorizontal size={18} />,
    color: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    bgColor: 'bg-purple-950/30',
    tag: 'Window Splitting',
    day2Callback: 'Bounded Context Windows',
    description: 'Splits raw text into overlapping windows so context across sentence seams is preserved.'
  },
  {
    id: 3,
    name: 'Vector Embedder',
    shortName: 'Embedder',
    icon: <Layers size={18} />,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-950/30',
    tag: 'Semantic Vectors',
    day2Callback: 'Day 2 Word2Vec / Dense Coordinate Spaces',
    description: 'Transforms text strings into 1536-dimensional floating point vectors representing semantic meaning.'
  },
  {
    id: 4,
    name: 'Vector Database',
    shortName: 'Vector DB',
    icon: <Database size={18} />,
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500/40',
    bgColor: 'bg-indigo-950/30',
    tag: 'Chroma / pgvector',
    day2Callback: 'Nearest-Neighbor Index',
    description: 'Indexes high-dimensional vectors to allow sub-millisecond Cosine / HNSW nearest-neighbor lookups.'
  },
  {
    id: 5,
    name: 'Semantic Retriever',
    shortName: 'Retriever',
    icon: <Search size={18} />,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    bgColor: 'bg-amber-950/30',
    tag: 'Top-K Match',
    day2Callback: 'Dot Product / Cosine Similarity',
    description: 'Converts incoming user query into a vector, queries the DB, and extracts the top 3 closest chunks.'
  },
  {
    id: 6,
    name: 'LLM Synthesis with Citations',
    shortName: 'Augmented LLM',
    icon: <Cpu size={18} />,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/40',
    bgColor: 'bg-rose-950/30',
    tag: 'Grounded Answer',
    day2Callback: 'Prompt Stitching (R-C-I-I-O-C Context)',
    description: 'Injects retrieved chunks directly into prompt context. Model answers strictly grounded with citations.'
  }
];

export default function RagPipelineVisualizer() {
  const [activeStage, setActiveStage] = useState<number>(2);
  const [chunkSize, setChunkSize] = useState<number>(512);
  const [overlap, setOverlap] = useState<number>(64);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play stepper
  React.useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStage(prev => (prev >= 6 ? 1 : prev + 1));
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStage = STAGES.find(s => s.id === activeStage) || STAGES[0];

  return (
    <div className="space-y-8 rounded-3xl bg-slate-950 border border-slate-800 p-6 md:p-8 shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold mb-1">
            <Sliders size={14} /> Interactive Architecture Walkthrough
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">The 6-Stage RAG Pipeline</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Each component solves a specific mechanical constraint. Inspect the data transformation at each stage from document to cited synthesis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
              isPlaying 
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/30' 
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? 'Pause Auto-Run' : 'Simulate Pipeline'}</span>
          </button>
          <button
            onClick={() => { setIsPlaying(false); setActiveStage(1); }}
            className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* 6 Stage Interactive Diagram Stepper */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
        {STAGES.map((s, idx) => {
          const isCurrent = s.id === activeStage;
          const isPassed = s.id < activeStage;
          return (
            <button
              key={s.id}
              onClick={() => { setIsPlaying(false); setActiveStage(s.id); }}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isCurrent 
                  ? `${s.bgColor} ${s.borderColor} shadow-xl ring-2 ring-white/20` 
                  : isPassed
                    ? 'bg-slate-900/80 border-slate-700/60 opacity-80 hover:opacity-100'
                    : 'bg-slate-900/30 border-slate-800/80 opacity-40 hover:opacity-75'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center ${
                  isCurrent ? `${s.color} bg-slate-900 border border-white/20` : 'text-slate-400 bg-slate-800'
                }`}>
                  {s.icon}
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">
                  0{s.id}
                </span>
              </div>
              <div>
                <div className={`font-bold text-xs ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                  {s.shortName}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {s.tag}
                </div>
              </div>
              {isCurrent && (
                <motion.div 
                  layoutId="active-indicator" 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500" 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Stage Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
        
        {/* Left Column: Conceptual Breakdown & Trade-offs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider ${currentStage.bgColor} ${currentStage.color} border ${currentStage.borderColor}`}>
              Stage 0{currentStage.id}: {currentStage.name}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {currentStage.description}
          </p>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
            <div className="text-sky-400 font-mono font-semibold flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Direct Link to Day 2 Foundation:</span>
            </div>
            <p className="text-slate-300 leading-normal">
              {currentStage.day2Callback}
            </p>
          </div>

          {/* Special Interactive Controls based on Stage */}
          {activeStage === 2 && (
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-300">
                <span>Interactive Chunk Parameters</span>
                <span className="text-slate-400">Size: {chunkSize}w | Overlap: {overlap}w</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Chunk Size (Tokens)</span>
                  <span className="font-mono text-white">{chunkSize} words</span>
                </div>
                <input 
                  type="range" 
                  min="128" 
                  max="1024" 
                  step="64"
                  value={chunkSize}
                  onChange={(e) => setChunkSize(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Boundary Overlap</span>
                  <span className="font-mono text-white">{overlap} words ({Math.round((overlap/chunkSize)*100)}%)</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="256" 
                  step="16"
                  value={overlap}
                  onChange={(e) => setOverlap(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div className="text-[11px] text-purple-300/80 pt-1">
                {chunkSize < 256 ? (
                  <span className="text-amber-400">Warning: Too small. High retrieval fragmentation, sentences broken across chunks.</span>
                ) : chunkSize > 768 ? (
                  <span className="text-rose-400">Warning: Too large. Dilutes semantic specificity; merges irrelevant SOP sections into one vector.</span>
                ) : (
                  <span className="text-emerald-400 font-semibold">Optimal enterprise balance: 256–512 words captures full technical procedures with clean overlap.</span>
                )}
              </div>
            </div>
          )}

          {activeStage === 4 && (
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs space-y-2">
              <div className="font-mono font-bold text-indigo-300">Vector Storage Economics for NDDB</div>
              <p className="text-slate-300 leading-relaxed">
                A typical 2,000-document SOP repository yields ~15,000 chunks. At 1,536 dimensions (float32), the entire vector index requires only <strong>~92 MB of RAM</strong>.
              </p>
              <div className="text-emerald-400 font-mono text-[11px]">
                Architectural Decision: Chroma or PostgreSQL pgvector handles this in-memory with zero dedicated cluster overhead.
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Data Representation Simulation */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
            <span className="font-semibold text-slate-300">Data Stream Inspector</span>
            <span className="text-[10px] uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
              Live Stage Data
            </span>
          </div>

          <div className="py-4 space-y-3 overflow-y-auto max-h-[300px]">
            {activeStage === 1 && (
              <div className="space-y-2 text-slate-300">
                <div className="text-[11px] text-sky-400 font-bold">SOURCE: "SOP-742-Chilling-Center-Thermostat-Reset.pdf"</div>
                <div className="p-3 bg-slate-900 rounded border border-slate-800 text-[11px] leading-relaxed text-slate-300">
                  "Section 4.1: If glycol temperature exceeds 4.5°C for more than 15 minutes, the emergency compressor safety trip will engage. To manually reset the digital thermostat: 1. Isolate main breaker switch Q3. 2. Depress the red bypass valve for 5 seconds until pressure stabilizes at 3.2 bar. 3. Re-engage breaker Q3..."
                </div>
              </div>
            )}

            {activeStage === 2 && (
              <div className="space-y-2">
                <div className="text-[11px] text-purple-400 font-bold">GENERATED CHUNKS (With {overlap}w overlap):</div>
                <div className="p-2.5 bg-slate-900 rounded border border-purple-900/40 text-[11px] text-slate-300 space-y-1">
                  <span className="text-purple-400 font-bold block">Chunk ID #402-A (Words 1–{chunkSize}):</span>
                  "...glycol temperature exceeds 4.5°C... To manually reset digital thermostat: 1. Isolate breaker Q3..."
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded border border-purple-900/40 text-[11px] text-slate-400 space-y-1">
                  <span className="text-purple-400 font-bold block">Chunk ID #402-B (Words {chunkSize - overlap}–{chunkSize * 2 - overlap}):</span>
                  "[OVERLAP] ...isolate breaker Q3. 2. Depress red bypass valve for 5s... 3. Re-engage breaker Q3..."
                </div>
              </div>
            )}

            {activeStage === 3 && (
              <div className="space-y-2">
                <div className="text-[11px] text-emerald-400 font-bold">VECTOR EMBEDDING TENSOR:</div>
                <div className="p-3 bg-slate-900 rounded border border-emerald-900/40 text-[11px] text-emerald-300 font-mono leading-relaxed break-all">
                  [ 0.0142, -0.0891, 0.2314, 0.0051, -0.1982, 0.3421, 0.0841, -0.0411, 0.1129, -0.2541, 0.0412, ... 1,525 more dimensions ]
                </div>
                <div className="text-[10px] text-slate-400">
                  Geometric meaning encoded: Proximity to "compressor failure", "temperature spike", "maintenance reset".
                </div>
              </div>
            )}

            {activeStage === 4 && (
              <div className="space-y-2">
                <div className="text-[11px] text-indigo-400 font-bold">VECTOR STORE INDEX (HNSW GRAPH):</div>
                <div className="p-3 bg-slate-900 rounded border border-indigo-900/40 text-[11px] text-slate-300 space-y-1.5">
                  <div className="flex justify-between">
                    <span>Index Size:</span>
                    <span className="text-indigo-300">14,280 Chunks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage Engine:</span>
                    <span className="text-indigo-300">pgvector (Postgres 16)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Query Latency:</span>
                    <span className="text-emerald-400 font-bold">4.2 ms</span>
                  </div>
                </div>
              </div>
            )}

            {activeStage === 5 && (
              <div className="space-y-2">
                <div className="text-[11px] text-amber-400 font-bold">QUERY: "How do I reset the thermostat when chilling fails?"</div>
                <div className="p-2.5 bg-slate-900 rounded border border-amber-900/40 text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between text-amber-300 font-bold">
                    <span>Hit 1: Chunk #402-A</span>
                    <span className="text-emerald-400">Cosine: 0.892</span>
                  </div>
                  <div className="text-slate-400 text-[10px]">
                    SOP-742 Section 4.1: Manual digital thermostat reset procedure...
                  </div>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Hit 2: Chunk #118-C</span>
                    <span>Cosine: 0.741</span>
                  </div>
                  <div className="text-[10px]">
                    SOP-118: Refrigerant pressure thresholds during alarm states...
                  </div>
                </div>
              </div>
            )}

            {activeStage === 6 && (
              <div className="space-y-2">
                <div className="text-[11px] text-rose-400 font-bold">GROUNDED SYNTHESIS WITH PROVENANCE:</div>
                <div className="p-3 bg-slate-900 rounded border border-rose-900/40 text-[11px] text-slate-200 leading-relaxed space-y-2">
                  <p>
                    To reset the chilling center thermostat when the compressor trips, perform the following procedure:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                    <li>Isolate main breaker switch Q3.</li>
                    <li>Depress the red bypass valve for 5 seconds until pressure reaches 3.2 bar.</li>
                    <li>Re-engage breaker Q3.</li>
                  </ol>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-sky-400">
                    <span className="flex items-center gap-1 font-bold">
                      <ShieldCheck size={12} className="text-emerald-400" /> Grounded in SOP-742 §4.1
                    </span>
                    <span className="text-slate-500">Hallucination Risk: 0.0%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Stage Navigation:</span>
            <div className="flex gap-2">
              <button
                disabled={activeStage <= 1}
                onClick={() => setActiveStage(prev => Math.max(1, prev - 1))}
                className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-slate-800"
              >
                Previous
              </button>
              <button
                disabled={activeStage >= 6}
                onClick={() => setActiveStage(prev => Math.min(6, prev + 1))}
                className="px-2 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold disabled:opacity-30 flex items-center gap-1"
              >
                Next <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
