'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Move, Info } from 'lucide-react';

interface WordPoint {
  id: string;
  word: string;
  category: 'dairy' | 'it';
  x: number; // 2D coordinates on [-10, 10] plane
  y: number;
}

export default function EmbeddingSpace2DViz() {
  const [selectedWordA, setSelectedWordA] = useState<string>('tanker');
  const [selectedWordB, setSelectedWordB] = useState<string>('chilling');

  // Illustrative 2D coordinates representing semantic clustering
  const words: WordPoint[] = [
    // Dairy / Chilling cluster
    { id: 'tanker', word: 'tanker', category: 'dairy', x: -6.5, y: 5.5 },
    { id: 'chilling', word: 'chilling', category: 'dairy', x: -5.8, y: 7.2 },
    { id: 'compressor', word: 'compressor', category: 'dairy', x: -4.2, y: 6.0 },
    { id: 'milk', word: 'milk', category: 'dairy', x: -7.0, y: 4.0 },
    { id: 'pasteurizer', word: 'pasteurizer', category: 'dairy', x: -4.5, y: 8.1 },

    // IT / Infrastructure cluster
    { id: 'server', word: 'server', category: 'it', x: 6.2, y: -4.5 },
    { id: 'database', word: 'database', category: 'it', x: 7.5, y: -3.8 },
    { id: 'disk', word: 'disk', category: 'it', x: 5.0, y: -6.2 },
    { id: 'latency', word: 'latency', category: 'it', x: 4.2, y: -3.0 },
    { id: 'firewall', word: 'firewall', category: 'it', x: 7.8, y: -6.0 },
  ];

  const wordA = words.find((w) => w.id === selectedWordA) || words[0];
  const wordB = words.find((w) => w.id === selectedWordB) || words[1];

  // Calculate cosine similarity: (A · B) / (||A|| * ||B||)
  const dot = wordA.x * wordB.x + wordA.y * wordB.y;
  const magA = Math.sqrt(wordA.x * wordA.x + wordA.y * wordA.y);
  const magB = Math.sqrt(wordB.x * wordB.x + wordB.y * wordB.y);
  const cosSim = Number((dot / (magA * magB)).toFixed(3));

  // Canvas scaling: map [-10, 10] to [40, 460]
  const scale = (val: number) => 250 + val * 20;

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-950/95 border border-sky-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      {/* Header & Word Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
            §7 Interactive Demo · Meaning as Geometry
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            2D Embedding Space: Distance = Semantic Similarity
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedWordA}
            onChange={(e) => setSelectedWordA(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-sky-300 font-bold px-2.5 py-1.5 rounded-lg"
          >
            {words.map((w) => (
              <option key={w.id} value={w.id}>Word A: {w.word}</option>
            ))}
          </select>

          <span className="text-slate-500 font-bold">vs</span>

          <select
            value={selectedWordB}
            onChange={(e) => setSelectedWordB(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-emerald-300 font-bold px-2.5 py-1.5 rounded-lg"
          >
            {words.map((w) => (
              <option key={w.id} value={w.id}>Word B: {w.word}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Cosine Similarity Score Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-slate-400">Selected Angle:</span>
          <span className="text-sky-300 font-bold text-sm">&ldquo;{wordA.word}&rdquo;</span>
          <span className="text-slate-500">&harr;</span>
          <span className="text-emerald-300 font-bold text-sm">&ldquo;{wordB.word}&rdquo;</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Cosine Similarity:</span>
          <span className={`px-3 py-1 rounded-lg font-bold text-base ${cosSim > 0.7 ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : cosSim > 0 ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'bg-rose-950 text-rose-300 border border-rose-500/40'}`}>
            {cosSim} ({cosSim > 0.7 ? 'High Semantic Match' : cosSim > 0 ? 'Partial Match' : 'Unrelated Clusters'})
          </span>
        </div>
      </div>

      {/* 2D Coordinate Vector Canvas */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center relative">
        <svg viewBox="0 0 500 500" className="w-full max-w-[460px] h-[360px]">
          {/* Coordinate Axes */}
          <line x1="250" y1="20" x2="250" y2="480" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="20" y1="250" x2="480" y2="250" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

          {/* Cluster Label Backgrounds */}
          <rect x="40" y="40" width="160" height="30" rx="6" fill="#0369a1" fillOpacity="0.1" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
          <text x="50" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold">🥛 Dairy / Cold-Chain</text>

          <rect x="300" y="430" width="160" height="30" rx="6" fill="#047857" fillOpacity="0.1" stroke="#059669" strokeWidth="1" strokeDasharray="2 2" />
          <text x="310" y="450" fill="#34d399" fontSize="11" fontWeight="bold">💻 IT / Infrastructure</text>

          {/* Vector Arrows from Origin (250, 250) for Selected Words */}
          <line
            x1="250" y1="250" x2={scale(wordA.x)} y2={scale(wordA.y)}
            stroke="#38bdf8" strokeWidth="2.5"
          />
          <line
            x1="250" y1="250" x2={scale(wordB.x)} y2={scale(wordB.y)}
            stroke="#34d399" strokeWidth="2.5"
          />

          {/* Word Dots */}
          {words.map((w) => {
            const isA = w.id === selectedWordA;
            const isB = w.id === selectedWordB;
            const isDairy = w.category === 'dairy';

            return (
              <g key={w.id} className="cursor-pointer" onClick={() => { setSelectedWordA(w.id); }}>
                <circle
                  cx={scale(w.x)}
                  cy={scale(w.y)}
                  r={isA || isB ? 7 : 5}
                  fill={isA ? '#38bdf8' : isB ? '#34d399' : isDairy ? '#0284c7' : '#059669'}
                  stroke="#ffffff"
                  strokeWidth={isA || isB ? 2 : 1}
                />
                <text
                  x={scale(w.x) + 8}
                  y={scale(w.y) + 4}
                  fill={isA ? '#38bdf8' : isB ? '#34d399' : '#cbd5e1'}
                  fontSize="11"
                  fontWeight={isA || isB ? 'bold' : 'normal'}
                >
                  {w.word}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Honest Honesty Note */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-sans leading-relaxed flex items-start gap-2.5">
        <Info size={16} className="text-sky-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200 font-mono block mb-0.5">Honest Coordinate Labeling:</strong>
          These 2D coordinates are illustrative teaching values placed on 2D axes so we can clearly see the geometry of semantic clustering. In real LLMs (e.g. OpenAI <code>text-embedding-3</code>, Mistral Embed), embeddings live in 768 to 3,072 dimensions, where words cluster across thousands of conceptual directions at once!
        </div>
      </div>

    </div>
  );
}
