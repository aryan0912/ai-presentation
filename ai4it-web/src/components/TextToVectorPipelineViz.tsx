'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Sparkles, Binary, Compass, Layers, Check } from 'lucide-react';

export default function TextToVectorPipelineViz() {
  const [stage, setStage] = useState<number>(1);
  const [selectedWord, setSelectedWord] = useState<number>(0);

  const rawText = "tanker reached chilling center";
  
  const tokens = [
    { word: "tanker", id: 38401, oneHotIdx: 3, denseVec: [0.82, -0.45, 0.91, 0.12] },
    { word: "reached", id: 8201, oneHotIdx: 7, denseVec: [-0.15, 0.76, 0.34, -0.62] },
    { word: "chilling", id: 24190, oneHotIdx: 1, denseVec: [0.94, -0.38, 0.88, 0.05] },
    { word: "center", id: 6241, oneHotIdx: 5, denseVec: [0.65, 0.22, -0.18, 0.74] },
  ];

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-950/95 border border-sky-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      {/* Header & Stage Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
            NLP Foundation · From Characters to Geometric Space
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            The 4-Stage &ldquo;Words to Numbers to Vectors&rdquo; Visual Pipeline
          </h4>
        </div>

        <div className="flex gap-1.5 text-[11px]">
          {[
            { id: 1, label: '1. Raw Text' },
            { id: 2, label: '2. Token IDs' },
            { id: 3, label: '3. One-Hot Matrix' },
            { id: 4, label: '4. Dense Embeddings' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setStage(s.id)}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold ${
                stage === s.id
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage Canvas */}
      <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 min-h-[260px] flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Stage 1: Raw String */}
        {stage === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-4"
          >
            <span className="text-slate-400 text-xs font-sans">Computers cannot perform calculus on letters:</span>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-lg md:text-2xl font-bold text-white tracking-widest px-8 shadow-inner">
              &ldquo;{rawText}&rdquo;
            </div>
            <div className="text-[11px] text-amber-400 font-sans flex items-center gap-1.5 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-800/40">
              <Sparkles size={13} />
              Step 1: Slice sentence into discrete vocabulary tokens
            </div>
          </motion.div>
        )}

        {/* Stage 2: Token IDs */}
        {stage === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-4 w-full"
          >
            <span className="text-slate-400 text-xs font-sans">Every word looks up its unique integer dictionary index:</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
              {tokens.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/40 flex flex-col items-center gap-1 shadow-lg"
                >
                  <span className="text-sm font-bold text-white">&ldquo;{t.word}&rdquo;</span>
                  <span className="text-xs font-bold text-sky-400 font-mono bg-sky-950 px-2 py-0.5 rounded border border-sky-800/50">
                    ID: {t.id}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="text-[11px] text-rose-400 font-sans bg-rose-950/30 px-3 py-1 rounded-full border border-rose-800/40">
              Problem: ID 38401 is not "larger" than ID 6241 — integers falsely imply numerical rank!
            </div>
          </motion.div>
        )}

        {/* Stage 3: One-Hot Vectors */}
        {stage === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-4 w-full"
          >
            <span className="text-slate-400 text-xs font-sans">Convert IDs to orthogonal sparse vectors (100,000-dimensional columns with a single 1):</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
              {tokens.map((t, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-purple-500/40 space-y-1.5">
                  <div className="text-center font-bold text-purple-300">&ldquo;{t.word}&rdquo;</div>
                  <div className="p-2 bg-slate-900 rounded font-mono text-[10px] space-y-0.5 text-slate-500 border border-slate-800">
                    <div>[ 0 ]</div>
                    <div>[ 0 ]</div>
                    <div className="text-emerald-400 font-bold bg-emerald-950/80 rounded px-1">[ 1 ] &larr; Index {t.oneHotIdx}</div>
                    <div>[ 0 ]</div>
                    <div>[ ... ] (50,000 zeros)</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-amber-400 font-sans bg-amber-950/30 px-3 py-1 rounded-full border border-amber-800/40">
              Problem: Every word vector is perpendicular (dot product = 0)! &ldquo;Tanker&rdquo; and &ldquo;chilling&rdquo; have zero connection.
            </div>
          </motion.div>
        )}

        {/* Stage 4: Dense Vector Embeddings */}
        {stage === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-4 w-full"
          >
            <span className="text-slate-400 text-xs font-sans">Sparse vector &times; Embedding Matrix $W_E$ = Continuous Dense Coordinates in Geometric Space:</span>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full max-w-3xl">
              {tokens.map((t, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/50 space-y-2 shadow-lg">
                  <div className="text-center font-bold text-emerald-300 text-sm">&ldquo;{t.word}&rdquo;</div>
                  <div className="p-2 bg-slate-900 rounded font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1">
                    {t.denseVec.map((v, vIdx) => (
                      <div key={vIdx} className="flex justify-between">
                        <span className="text-slate-500">dim_{vIdx}:</span>
                        <span className={`font-bold ${v > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{v.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-emerald-300 font-sans bg-emerald-950/40 px-3.5 py-1 rounded-full border border-emerald-500/40 font-bold">
              Payoff: Now words are geometric coordinates! We can calculate angles, distances, and run dot products.
            </div>
          </motion.div>
        )}

      </div>

      {/* Narrative Footer */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-sans text-slate-300 leading-relaxed">
        <strong className="text-sky-300 font-mono block mb-1">The Universal Truth of Natural Language Processing:</strong>
        Computers do not understand language. They only understand vectors in geometric space. Transforming words into numbers through tokenization and dense embeddings is the bridge that allows neural networks and transformers to process text as mathematical coordinates!
      </div>

    </div>
  );
}
