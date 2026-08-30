'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, FastForward, Pause } from 'lucide-react';

export default function RnnMemoryDecayViz() {
  const [step, setStep] = useState(0);
  const totalSteps = 6;
  const [isPlaying, setIsPlaying] = useState(false);
  const [playTick, setPlayTick] = useState(0);

  const nextStep = () => {
    setIsPlaying(false);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  };
  const reset = () => {
    setIsPlaying(false);
    setPlayTick(0);
    setStep(0);
  };

  const engTokens = [
    'The', 'heavy', 'milk', 'tanker', 'is', 'unfortunately', 
    'running', 'extremely', 'late', 'today', 'due', 'to', 'storm', 'traffic', '<EOS>'
  ];
  
  const hinTokens = [
    '<SOS>', 'भारी', 'दूध', 'का', '...', 'आज', 'तूफान', 'के', 'ट्रैफिक', 'के', 'कारण', 'बहुत', 'देर', 'से', 'चल', 'रही', 'कार', 'है'
  ];

  const MAX_TICK = engTokens.length + hinTokens.length + 2; // Extra ticks for pauses

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayTick((prev) => {
          if (prev >= MAX_TICK) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 500); // 500ms per tick for smooth but fast reading
    }
    return () => clearInterval(interval);
  }, [isPlaying, MAX_TICK]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (playTick >= MAX_TICK) setPlayTick(0);
      setIsPlaying(true);
    }
  };

  const stepsInfo = [
    "Step 0: We want to translate a full English sentence into Hindi. The RNN uses an Encoder-Decoder architecture.",
    "Step 1: Encoder starts. At Token 4 ('tanker'), the RNN registers the critical subject. Memory is 100%.",
    "Step 2: Encoder finishes. The RNN reads the remaining 11 words. The memory of 'tanker' is squashed repeatedly and decays to 0%.",
    "Step 3: The Bottleneck. The final hidden state of the Encoder is emitted as the 'Context Vector'. It is completely missing the subject!",
    "Step 4: Decoder starts generating Hindi word by word, relying entirely on that flawed Context Vector.",
    "Step 5: Decoder fails! When it needs to output the vehicle, it guesses blindly ('कार' / Car instead of 'टैंकर' / Tanker) because the memory was lost in the bottleneck."
  ];

  // Derive state either from explanatory step OR from the auto-player tick
  const getDerivedState = () => {
    if (isPlaying || playTick > 0) {
      // Temporal animation active
      if (playTick < engTokens.length) {
        // Encoding
        const mem = playTick < 3 ? 0 : playTick === 3 ? 100 : Math.max(0, 100 * Math.pow(0.7, playTick - 3));
        return { phase: 'encoder', highlightIdx: playTick, memory: mem, contextReady: false, playStatus: `Encoding: Token ${playTick+1}/${engTokens.length}` };
      } else if (playTick >= engTokens.length && playTick < engTokens.length + 2) {
        // Bottleneck pause
        return { phase: 'bottleneck', highlightIdx: -1, memory: 0, contextReady: true, playStatus: `Context Vector Generated (Bottleneck)` };
      } else {
        // Decoding
        const decTick = playTick - engTokens.length - 2;
        return { phase: 'decoder', highlightIdx: decTick, memory: 0, contextReady: true, playStatus: `Decoding: Token ${decTick+1}/${hinTokens.length}` };
      }
    } else {
      // Explanatory step active
      switch(step) {
        case 0: return { phase: 'intro', highlightIdx: -1, memory: 0, contextReady: false, playStatus: '' };
        case 1: return { phase: 'encoder', highlightIdx: 3, memory: 100, contextReady: false, playStatus: '' };
        case 2: return { phase: 'encoder', highlightIdx: 14, memory: 5, contextReady: false, playStatus: '' };
        case 3: return { phase: 'bottleneck', highlightIdx: -1, memory: 0, contextReady: true, playStatus: '' };
        case 4: return { phase: 'decoder', highlightIdx: 5, memory: 0, contextReady: true, playStatus: '' };
        case 5: return { phase: 'decoder', highlightIdx: 16, memory: 0, contextReady: true, playStatus: '' };
        default: return { phase: 'intro', highlightIdx: -1, memory: 0, contextReady: false, playStatus: '' };
      }
    }
  };

  const { phase, highlightIdx, memory, contextReady, playStatus } = getDerivedState();

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-sky-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-sky-500 via-purple-500 to-sky-400 animate-pulse" />

      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-sky-400 font-mono">RNN</span> Encoder-Decoder Bottleneck
          </h3>
          <div className="text-slate-400 font-sans text-sm mt-1">
            Why basic RNNs fail at translating long sentences.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Temporal Player Controls */}
          <button 
            onClick={togglePlay}
            className={`flex items-center gap-2 px-4 py-1.5 font-bold rounded-lg transition-colors ${isPlaying ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_15px_rgba(217,119,6,0.5)]' : 'bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700'}`}
          >
            {isPlaying ? <Pause size={16} className="fill-current" /> : <FastForward size={16} className="fill-current" />}
            {isPlaying ? 'Pause Sequence' : 'Play Full Sequence'}
          </button>
          
          <div className="w-px h-6 bg-slate-700 mx-2" />

          {/* Step Explainer Controls */}
          <button onClick={reset} disabled={step === 0 && !isPlaying && playTick === 0} className="p-2 text-slate-400 hover:text-white disabled:opacity-30">
            <RotateCcw size={18} />
          </button>
          <button onClick={nextStep} disabled={step === totalSteps - 1 || isPlaying || playTick > 0} className="flex items-center gap-2 px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg disabled:opacity-30 disabled:hover:bg-sky-600 transition-colors">
            {step === totalSteps - 1 ? 'Finished' : 'Next Step'}
            <Play size={16} className="fill-current" />
          </button>
        </div>
      </div>

      <div className="text-slate-300 text-sm h-20 md:h-12 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono flex flex-col justify-center">
        {playStatus ? (
          <div className="text-sky-400 font-bold flex items-center gap-2 animate-pulse">
            <FastForward size={16} /> <span>{playStatus}</span>
          </div>
        ) : (
          stepsInfo[step]
        )}
      </div>

      {/* Sentence Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden">
          {phase === 'encoder' && <div className="absolute inset-0 bg-sky-900/10 pointer-events-none" />}
          <div className="text-sky-400 font-bold mb-2 uppercase tracking-wide text-[10px]">Source (English)</div>
          <div className="flex flex-wrap gap-1 relative z-10">
            {engTokens.map((t, i) => (
              <span key={i} className={`px-1.5 py-0.5 rounded transition-all duration-300 ${phase === 'encoder' && highlightIdx === i ? 'bg-sky-500 text-white font-bold scale-110 shadow-lg' : i === 3 ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden">
          {phase === 'decoder' && <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none" />}
          <div className="text-emerald-400 font-bold mb-2 uppercase tracking-wide text-[10px]">Target (Hindi)</div>
          <div className="flex flex-wrap gap-1 relative z-10">
            {hinTokens.map((t, i) => {
              // Only reveal target tokens up to the highlight index during playback
              const isRevealed = (isPlaying || playTick > 0) ? (phase === 'decoder' && i <= highlightIdx) : (step >= 4);
              const isCurrent = phase === 'decoder' && highlightIdx === i;
              
              return (
                <span key={i} className={`px-1.5 py-0.5 rounded transition-all duration-300 ${isCurrent ? 'bg-emerald-500 text-white font-bold scale-110 shadow-lg' : i === 16 ? 'text-rose-400 font-bold underline' : 'text-slate-500'}`}>
                  {isRevealed ? t : '???'}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* High-Fidelity SVG Encoder-Decoder Diagram */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        <svg viewBox="-20 -20 840 280" className="w-full max-w-[800px] h-[220px]">
          <defs>
            <filter id="neonShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.6" />
            </filter>
            <filter id="neonShadowDecoder" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10b981" floodOpacity="0.6" />
            </filter>
            <marker id="arrowEnc" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <marker id="arrowDec" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
            </marker>
          </defs>

          {/* Context Vector Bottleneck */}
          <g transform="translate(400, 110)" className={`transition-all duration-700 ${contextReady ? 'opacity-100 scale-110' : 'opacity-30 scale-100'}`}>
             <rect x="-25" y="-35" width="50" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" filter={contextReady ? 'url(#neonShadow)' : 'none'} />
             <text textAnchor="middle" dy="-40" fill="#a855f7" fontSize="10" fontWeight="bold">Context Vector</text>
             <text textAnchor="middle" dy="4" fill="#ddd" fontSize="14" fontWeight="bold">h_N</text>
             <text textAnchor="middle" dy="45" fill="#f43f5e" fontSize="9" fontStyle="italic">"Tanker" missing!</text>
          </g>

          {/* Encoder Side (Left) */}
          <g className={`transition-all duration-500 ${phase === 'encoder' ? 'opacity-100' : 'opacity-40'}`}>
            <text x="150" y="20" fill="#38bdf8" fontSize="12" fontWeight="bold" letterSpacing="1">ENCODER RNN</text>
            
            {/* Cell 1: Early sequence */}
            <rect x="50" y="75" width="84" height="70" rx="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" filter={(phase === 'encoder' && highlightIdx < 10) ? 'url(#neonShadow)' : 'none'} className="transition-all duration-300" />
            <text x="92" y="115" textAnchor="middle" fill="#fff" fontSize="12">Cell {phase === 'encoder' ? Math.min(10, highlightIdx + 1) : 4}</text>
            
            <line x1="134" y1="110" x2="190" y2="110" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowEnc)" />
            
            {/* Cell 2: Late sequence */}
            <rect x="200" y="75" width="84" height="70" rx="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" filter={(phase === 'encoder' && highlightIdx >= 10) ? 'url(#neonShadow)' : 'none'} className="transition-all duration-300" />
            <text x="242" y="115" textAnchor="middle" fill="#fff" fontSize="12">Cell {phase === 'encoder' && highlightIdx >= 10 ? highlightIdx + 1 : 15}</text>

            <line x1="284" y1="110" x2="365" y2="110" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowEnc)" />

            {/* Encoder Inputs */}
            <line x1="92" y1="200" x2="92" y2="145" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowEnc)" />
            <text x="92" y="215" textAnchor="middle" fill="#f59e0b" fontSize="10">{phase === 'encoder' && highlightIdx < 10 ? `"${engTokens[highlightIdx]}"` : '"tanker"'}</text>
            
            <line x1="242" y1="200" x2="242" y2="145" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowEnc)" />
            <text x="242" y="215" textAnchor="middle" fill="#94a3b8" fontSize="10">{phase === 'encoder' && highlightIdx >= 10 ? `"${engTokens[highlightIdx]}"` : '"<EOS>"'}</text>
          </g>

          {/* Decoder Side (Right) */}
          <g className={`transition-all duration-500 ${phase === 'decoder' ? 'opacity-100' : 'opacity-40'}`}>
            <text x="550" y="20" fill="#10b981" fontSize="12" fontWeight="bold" letterSpacing="1">DECODER RNN</text>
            
            <line x1="435" y1="110" x2="505" y2="110" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowDec)" />

            {/* Cell 1: Early Decode */}
            <rect x="515" y="75" width="84" height="70" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" filter={(phase === 'decoder' && highlightIdx < 10) ? 'url(#neonShadowDecoder)' : 'none'} className="transition-all duration-300" />
            <text x="557" y="115" textAnchor="middle" fill="#fff" fontSize="12">Step {phase === 'decoder' ? Math.min(10, highlightIdx + 1) : 1}</text>
            
            <line x1="599" y1="110" x2="655" y2="110" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowDec)" />
            
            {/* Cell 2: Late Decode (Failure) */}
            <rect x="665" y="75" width="84" height="70" rx="14" fill={(phase === 'decoder' && highlightIdx === 16) ? '#451a03' : '#0f172a'} stroke={(phase === 'decoder' && highlightIdx === 16) ? '#f43f5e' : '#10b981'} strokeWidth="2" filter={(phase === 'decoder' && highlightIdx >= 10) ? 'url(#neonShadowDecoder)' : 'none'} className="transition-all duration-300" />
            <text x="707" y="115" textAnchor="middle" fill="#fff" fontSize="12">Step {phase === 'decoder' && highlightIdx >= 10 ? highlightIdx + 1 : 17}</text>

            {/* Decoder Outputs */}
            <line x1="557" y1="75" x2="557" y2="35" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowDec)" />
            <text x="557" y="25" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">{(phase === 'decoder' && highlightIdx < 10) ? hinTokens[highlightIdx] : 'भारी'}</text>
            
            <line x1="707" y1="75" x2="707" y2="35" stroke={(phase === 'decoder' && highlightIdx === 16) ? '#f43f5e' : '#10b981'} strokeWidth="2" markerEnd="url(#arrowDec)" />
            <text x="707" y="25" textAnchor="middle" fill={(phase === 'decoder' && highlightIdx === 16) ? '#f43f5e' : '#10b981'} fontSize="14" fontWeight="bold">{(phase === 'decoder' && highlightIdx >= 10) ? hinTokens[highlightIdx] : 'कार'}</text>
            {(phase === 'decoder' && highlightIdx === 16) && <text x="707" y="10" textAnchor="middle" fill="#f43f5e" fontSize="9">(Wrong!)</text>}
          </g>
        </svg>
      </div>

      {/* Capacity Note */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Memory Retention Gauge */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-center">
          <span className="text-xs text-slate-400 uppercase font-bold block">
            "Tanker" Signal in Network Memory:
          </span>
          <div className={`text-3xl font-black ${memory > 50 ? 'text-emerald-400' : memory > 15 ? 'text-amber-400' : 'text-rose-400'}`}>
            {memory.toFixed(1)}%
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 mt-2">
            <motion.div
              className={`h-full ${memory > 50 ? 'bg-emerald-500' : memory > 15 ? 'bg-amber-500' : 'bg-rose-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${memory}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </div>

        {/* Real World Capacity Note */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center">
           <div className="text-xs font-sans text-slate-300">
             <div className="mb-1"><strong className="text-white">Basic RNN Capacity:</strong> ~10-20 words (1 sentence). Context vectors saturate quickly.</div>
             <div><strong className="text-white">LSTM Capacity:</strong> ~50-100 words (3-4 sentences). Gates protect memory, but still inherently limited by the single-vector bottleneck.</div>
           </div>
        </div>
      </div>

    </div>
  );
}
