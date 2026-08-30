'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Clock, FastForward, Pause } from 'lucide-react';

export default function LstmGateFlowViz() {
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
    '<SOS>', 'भारी', 'दूध', 'का', 'टैंकर', 'आज', 'तूफान', 'के', 'ट्रैफिक', 'के', 'कारण', 'बहुत', 'देर', 'से', 'चल', 'रहा', 'है'
  ];

  const MAX_TICK = engTokens.length + hinTokens.length + 2;

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
      }, 500);
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
    "Step 0: 1. Forget Gate (f_t). The sigmoid filter looks at the new word and old hidden state, and outputs a decimal (0 to 1) to multiply against the old cell state. It 'forgets' irrelevant filler words.",
    "Step 1: 2. Input Gate & Candidate (i_t, C~_t). The input gate decides what new info to keep. The Tanh layer creates a vector of new candidate values from the current word.",
    "Step 2: 3. Cell State Update (C_t). We multiply the old state by the Forget Gate, and add the Input * Candidate. This is the protected 'highway' that prevents memory decay!",
    "Step 3: 4. Output Gate (o_t). A final sigmoid filter determines what part of the permanent cell state we need to focus on right now.",
    "Step 4: 5. Hidden State (h_t). We squash the cell state with Tanh and multiply by the Output Gate to emit the final short-term hidden state for this time step.",
    "Step 5: Machine Translation Success! Because the Highway protected the memory of 'tanker' across the entire sentence, the Context Vector is accurate. The Decoder correctly outputs 'टैंकर' (Tanker)!"
  ];

  const getDerivedState = () => {
    if (isPlaying || playTick > 0) {
      // Temporal animation active
      if (playTick < engTokens.length) {
        // Encoding
        return { phase: 'encoder', highlightIdx: playTick, highwayActive: playTick >= 3, contextReady: false, playStatus: `Encoding: Token ${playTick+1}/${engTokens.length}` };
      } else if (playTick >= engTokens.length && playTick < engTokens.length + 2) {
        // Bottleneck pause
        return { phase: 'bottleneck', highlightIdx: -1, highwayActive: true, contextReady: true, playStatus: `Context Vector Generated (Bottleneck)` };
      } else {
        // Decoding
        const decTick = playTick - engTokens.length - 2;
        return { phase: 'decoder', highlightIdx: decTick, highwayActive: true, contextReady: true, playStatus: `Decoding: Token ${decTick+1}/${hinTokens.length}` };
      }
    } else {
      // Explanatory step active
      const getStepVisuals = (stepIndex: number) => {
        return {
          forgetActive: stepIndex === 0 || stepIndex === 2,
          inputActive: stepIndex === 1 || stepIndex === 2,
          highwayActive: stepIndex === 2 || stepIndex === 5,
          outputActive: stepIndex === 3 || stepIndex === 4,
          hiddenActive: stepIndex === 4 || stepIndex === 5
        };
      };
      return { phase: 'intro', highlightIdx: -1, contextReady: false, playStatus: '', ...getStepVisuals(step) };
    }
  };

  const { phase, highlightIdx, highwayActive, contextReady, playStatus, forgetActive, inputActive, outputActive, hiddenActive } = getDerivedState() as any;

  // Visual state overrides when playing
  const isHighwayActive = isPlaying || playTick > 0 ? highwayActive : highwayActive;
  const isHiddenActive = isPlaying || playTick > 0 ? (phase === 'encoder' || phase === 'decoder') : hiddenActive;
  const isInputActive = isPlaying || playTick > 0 ? (phase === 'encoder') : inputActive;
  const isOutputActive = isPlaying || playTick > 0 ? true : outputActive;
  const isForgetActive = isPlaying || playTick > 0 ? true : forgetActive;

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-mono text-xs shadow-2xl relative overflow-hidden">
      {/* Top neon indicator */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-rose-500 to-sky-400 animate-pulse" />

      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-purple-400 font-mono">LSTM</span> Gate Flow
          </h3>
          <div className="text-slate-400 font-sans text-sm mt-1">
            LSTM Cell Highway: The Protected Long-Term Conveyor Belt
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Temporal Player Controls */}
          <button 
            onClick={togglePlay}
            className={`flex items-center gap-2 px-4 py-1.5 font-bold rounded-lg transition-colors ${isPlaying ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_15px_rgba(217,119,6,0.5)]' : 'bg-slate-800 hover:bg-slate-700 text-purple-400 border border-slate-700'}`}
          >
            {isPlaying ? <Pause size={16} className="fill-current" /> : <FastForward size={16} className="fill-current" />}
            {isPlaying ? 'Pause Sequence' : 'Play Full Sequence'}
          </button>
          
          <div className="w-px h-6 bg-slate-700 mx-2" />

          {/* Step Explainer Controls */}
          <button onClick={reset} disabled={step === 0 && !isPlaying && playTick === 0} className="p-2 text-slate-400 hover:text-white disabled:opacity-30">
            <RotateCcw size={18} />
          </button>
          <button onClick={nextStep} disabled={step === totalSteps - 1 || isPlaying || playTick > 0} className="flex items-center gap-2 px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg disabled:opacity-30 disabled:hover:bg-purple-600 transition-colors">
            {step === totalSteps - 1 ? 'Finished' : 'Next Step'}
            <Play size={16} className="fill-current" />
          </button>
        </div>
      </div>

      <div className="text-slate-300 text-sm h-24 md:h-16 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono flex flex-col justify-center">
        {playStatus ? (
          <div className="text-purple-400 font-bold flex items-center gap-2 animate-pulse">
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
              const isRevealed = (isPlaying || playTick > 0) ? (phase === 'decoder' && i <= highlightIdx) : (step >= 5);
              const isCurrent = phase === 'decoder' && highlightIdx === i;
              
              return (
                <span key={i} className={`px-1.5 py-0.5 rounded transition-all duration-300 ${isCurrent ? 'bg-emerald-500 text-white font-bold scale-110 shadow-lg' : i === 4 ? 'text-emerald-400 font-bold underline' : 'text-slate-500'}`}>
                  {isRevealed ? t : '???'}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* High-Resolution Precision SVG Diagram of LSTM Interior */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800 flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
        <svg viewBox="0 0 740 320" className="w-full max-w-[740px] h-[280px]">
          <defs>
            <filter id="glowForget" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#f43f5e" floodOpacity="0.8" />
            </filter>
            <filter id="glowInput" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.8" />
            </filter>
            <filter id="glowOutput" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#34d399" floodOpacity="0.8" />
            </filter>
            <filter id="glowHighway" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#c084fc" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Main Outer LSTM Cell Container Box */}
          <rect x="80" y="40" width="580" height="240" rx="24" fill="#090d16" stroke="#334155" strokeWidth="2" />

          {/* Top Highway: Cell State Conveyor */}
          <line x1="20" y1="90" x2="720" y2="90" stroke={isHighwayActive ? '#c084fc' : '#475569'} strokeWidth={isHighwayActive ? '4' : '2'} filter={isHighwayActive ? 'url(#glowHighway)' : 'none'} className="transition-all duration-300" />
          <polygon points="715,85 730,90 715,95" fill={isHighwayActive ? '#c084fc' : '#475569'} />
          
          <text x="30" y="78" fill="#c084fc" fontSize="11" fontWeight="bold">C_{'{t-1}'} (Past Memory)</text>
          <text x="610" y="78" fill="#c084fc" fontSize="11" fontWeight="bold">C_t (New Memory)</text>

          {/* Bottom Hidden State Highway */}
          <line x1="20" y1="250" x2="720" y2="250" stroke={isHiddenActive ? '#38bdf8' : '#475569'} strokeWidth="2.5" strokeDasharray="4 4" className="transition-all duration-300" />
          <polygon points="715,246 728,250 715,254" fill={isHiddenActive ? '#38bdf8' : '#475569'} />

          {/* Input Vector x_t */}
          <line x1="140" y1="310" x2="140" y2="250" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="140" cy="305" r="14" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
          <text x="140" y="309" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">x_t</text>
          {/* Dynamic text based on play tick */}
          <text x="140" y="325" textAnchor="middle" fill="#fbbf24" fontSize="12" fontStyle="italic">
            {phase === 'encoder' ? `"${engTokens[highlightIdx]}"` : (phase === 'decoder' ? `(Decoder)` : '')}
          </text>
          
          {/* Shared Input Bus */}
          <line x1="140" y1="250" x2="520" y2="250" stroke="#94a3b8" strokeWidth="2" />

          {/* GATE 1: FORGET GATE */}
          <g transform="translate(200, 150)" className="transition-all duration-300">
            <line x1="0" y1="100" x2="0" y2="0" stroke={isForgetActive ? '#f43f5e' : '#475569'} strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="-60" stroke={isForgetActive ? '#f43f5e' : '#475569'} strokeWidth="2" />
            <rect
              x="-24" y="-18" width="48" height="36" rx="8"
              fill={isForgetActive ? '#881337' : '#1e293b'}
              stroke={isForgetActive ? '#f43f5e' : '#475569'}
              strokeWidth="2"
              filter={isForgetActive ? 'url(#glowForget)' : 'none'}
            />
            <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="13" fontWeight="bold">&sigma;</text>
            <text x="0" y="30" textAnchor="middle" fill={isForgetActive ? '#f43f5e' : '#64748b'} fontSize="9" fontWeight="bold">Forget</text>
            <circle cx="0" cy="-60" r="14" fill="#0f172a" stroke={isForgetActive ? '#f43f5e' : '#475569'} strokeWidth="2.5" />
            <text x="0" y="-56" textAnchor="middle" fill={isForgetActive ? '#f43f5e' : '#64748b'} fontSize="14" fontWeight="bold">&times;</text>
          </g>

          {/* GATE 2: INPUT GATE & CANDIDATE */}
          <g transform="translate(360, 150)" className="transition-all duration-300">
            <line x1="-30" y1="100" x2="-30" y2="0" stroke={isInputActive ? '#38bdf8' : '#475569'} strokeWidth="2" />
            <rect
              x="-54" y="-18" width="48" height="36" rx="8"
              fill={isInputActive ? '#0369a1' : '#1e293b'}
              stroke={isInputActive ? '#38bdf8' : '#475569'}
              strokeWidth="2"
              filter={isInputActive ? 'url(#glowInput)' : 'none'}
            />
            <text x="-30" y="4" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">&sigma;</text>
            <text x="-30" y="30" textAnchor="middle" fill={isInputActive ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="bold">Input</text>

            <line x1="30" y1="100" x2="30" y2="0" stroke={isInputActive ? '#38bdf8' : '#475569'} strokeWidth="2" />
            <rect
              x="6" y="-18" width="48" height="36" rx="8"
              fill={isInputActive ? '#0369a1' : '#1e293b'}
              stroke={isInputActive ? '#38bdf8' : '#475569'}
              strokeWidth="2"
              filter={isInputActive ? 'url(#glowInput)' : 'none'}
            />
            <text x="30" y="4" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">tanh</text>
            <text x="30" y="30" textAnchor="middle" fill={isInputActive ? '#38bdf8' : '#64748b'} fontSize="9" fontWeight="bold">Cand.</text>

            <circle cx="0" cy="-25" r="11" fill="#0f172a" stroke={isInputActive ? '#38bdf8' : '#475569'} strokeWidth="2" />
            <text x="0" y="-21" textAnchor="middle" fill={isInputActive ? '#38bdf8' : '#64748b'} fontSize="12" fontWeight="bold">&times;</text>
            <line x1="-30" y1="-18" x2="-10" y2="-25" stroke={isInputActive ? '#38bdf8' : '#475569'} strokeWidth="1.5" />
            <line x1="30" y1="-18" x2="10" y2="-25" stroke={isInputActive ? '#38bdf8' : '#475569'} strokeWidth="1.5" />
            <line x1="0" y1="-36" x2="0" y2="-60" stroke={isInputActive ? '#38bdf8' : '#475569'} strokeWidth="2" />

            <circle cx="0" cy="-60" r="14" fill="#0f172a" stroke={isInputActive ? '#38bdf8' : '#475569'} strokeWidth="2.5" />
            <text x="0" y="-56" textAnchor="middle" fill={isInputActive ? '#38bdf8' : '#64748b'} fontSize="14" fontWeight="bold">+</text>
          </g>

          {/* GATE 3: OUTPUT GATE */}
          <g transform="translate(540, 150)" className="transition-all duration-300">
            <line x1="0" y1="100" x2="0" y2="0" stroke={isOutputActive ? '#34d399' : '#475569'} strokeWidth="2" />
            <rect
              x="-24" y="-18" width="48" height="36" rx="8"
              fill={isOutputActive ? '#065f46' : '#1e293b'}
              stroke={isOutputActive ? '#34d399' : '#475569'}
              strokeWidth="2"
              filter={isOutputActive ? 'url(#glowOutput)' : 'none'}
            />
            <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="13" fontWeight="bold">&sigma;</text>
            <text x="0" y="30" textAnchor="middle" fill={isOutputActive ? '#34d399' : '#64748b'} fontSize="9" fontWeight="bold">Output</text>

            <line x1="-80" y1="-60" x2="40" y2="-60" stroke={isHiddenActive ? '#a855f7' : '#475569'} strokeWidth="2" />
            <line x1="40" y1="-60" x2="40" y2="50" stroke={isHiddenActive ? '#a855f7' : '#475569'} strokeWidth="2" />
            <rect x="22" y="32" width="36" height="24" rx="6" fill="#1e293b" stroke={isHiddenActive ? '#a855f7' : '#475569'} strokeWidth="1.5" />
            <text x="40" y="48" textAnchor="middle" fill={isHiddenActive ? '#c084fc' : '#64748b'} fontSize="9" fontWeight="bold">tanh</text>

            <circle cx="0" cy="70" r="12" fill="#0f172a" stroke={isHiddenActive ? '#34d399' : '#475569'} strokeWidth="2" />
            <text x="0" y="74" textAnchor="middle" fill={isHiddenActive ? '#34d399' : '#64748b'} fontSize="12" fontWeight="bold">&times;</text>
            <line x1="0" y1="18" x2="0" y2="58" stroke={isHiddenActive ? '#34d399' : '#475569'} strokeWidth="2" />
            <line x1="40" y1="56" x2="12" y2="70" stroke={isHiddenActive ? '#a855f7' : '#475569'} strokeWidth="1.5" />
            <line x1="0" y1="82" x2="0" y2="100" stroke={isHiddenActive ? '#34d399' : '#475569'} strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* The Unbreakable Sequential Ceiling */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs font-sans leading-relaxed flex items-start gap-3">
        <Clock size={20} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-mono block mb-0.5">The Unbreakable Sequential Ceiling:</strong>
          While gates solve long-range forgetting, the LSTM is still inherently sequential: <strong>Step 50 cannot compute before Step 49 has finished</strong>. No amount of GPU clusters can parallelize a sequential loop. This architectural bottleneck directly led to the invention of <strong>Transformers (Hop 3)</strong>!
        </div>
      </div>

    </div>
  );
}
