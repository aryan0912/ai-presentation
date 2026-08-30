'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

export default function TransformerArchitectureViz() {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const reset = () => setStep(0);

  const stepsInfo = [
    "Step 0: Inputs & Positional Encoding. Words are embedded into vectors, and sine/cosine waves are added to inject time/position into the geometry.",
    "Step 1: The Encoder Stack (Nx). Tokens run through Self-Attention (sharing context) and a Feed-Forward network, surrounded by residual Add & Norm connections.",
    "Step 2: The Decoder Stack (Nx). Starts with Masked Self-Attention, preventing the model from looking at future words during generation.",
    "Step 3: The Cross-Attention Bridge. The Decoder takes its current state as Queries, and searches the Encoder's final output (Keys/Values) to find relevant source context.",
    "Step 4: Final Output. A Linear layer expands the vector back to vocabulary size, and Softmax turns those scores into probabilities for the next word!"
  ];

  const getStepVisuals = (stepIndex: number) => {
    return {
      inputsActive: stepIndex === 0 || stepIndex > 0,
      encoderActive: stepIndex >= 1,
      decoderActive: stepIndex >= 2,
      crossAttentionActive: stepIndex >= 3,
      outputActive: stepIndex >= 4
    };
  };

  const visuals = getStepVisuals(step);

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-purple-500/30 space-y-6 select-none font-sans text-xs shadow-2xl relative overflow-hidden">
      {/* Top neon indicator */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-sky-500 via-purple-500 to-rose-500 animate-pulse" />

      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-purple-400 font-mono">Transformer</span> Architecture (Figure 1)
          </h3>
          <div className="text-slate-400 font-sans text-sm mt-1">
            The complete Encoder-Decoder blueprint.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={reset} disabled={step === 0} className="p-2 text-slate-400 hover:text-white disabled:opacity-30">
            <RotateCcw size={18} />
          </button>
          <button onClick={nextStep} disabled={step === totalSteps - 1} className="flex items-center gap-2 px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg disabled:opacity-30 disabled:hover:bg-purple-600 transition-colors">
            {step === totalSteps - 1 ? 'Finished' : 'Next Step'}
            <Play size={16} className="fill-current" />
          </button>
        </div>
      </div>

      <div className="text-slate-300 text-sm h-24 md:h-16 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono flex flex-col justify-center">
        {stepsInfo[step]}
      </div>

      {/* High-Fidelity Figure 1 Replica */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
        <svg viewBox="0 -160 600 800" className="w-full max-w-[500px] h-auto">
          <defs>
            <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.8" />
            </filter>
            <filter id="glowPurple" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#c084fc" floodOpacity="0.8" />
            </filter>
            <filter id="glowOrange" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#f97316" floodOpacity="0.8" />
            </filter>
            <marker id="arrowB" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <marker id="arrowP" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#c084fc" />
            </marker>
          </defs>

          {/* BACKGROUND BLOCKS (Nx) */}
          <rect x="100" y="200" width="160" height="280" rx="10" fill="#0f172a" stroke={visuals.encoderActive ? "#38bdf8" : "#334155"} strokeWidth="2" strokeDasharray="4 4" className="transition-all duration-500" />
          <text x="180" y="220" textAnchor="middle" fill={visuals.encoderActive ? "#38bdf8" : "#475569"} fontSize="14" fontWeight="bold">Nx</text>
          
          <rect x="340" y="100" width="160" height="380" rx="10" fill="#0f172a" stroke={visuals.decoderActive ? "#c084fc" : "#334155"} strokeWidth="2" strokeDasharray="4 4" className="transition-all duration-500" />
          <text x="420" y="120" textAnchor="middle" fill={visuals.decoderActive ? "#c084fc" : "#475569"} fontSize="14" fontWeight="bold">Nx</text>

          {/* =========================================================
              ENCODER SIDE (Left)
              ========================================================= */}
          
          {/* Inputs */}
          <rect x="130" y="580" width="100" height="30" rx="4" fill="#1e293b" stroke={visuals.inputsActive ? "#f59e0b" : "#334155"} strokeWidth="2" />
          <text x="180" y="600" textAnchor="middle" fill={visuals.inputsActive ? "#f59e0b" : "#475569"} fontSize="12" fontWeight="bold">Inputs</text>
          <line x1="180" y1="580" x2="180" y2="550" stroke={visuals.inputsActive ? "#f59e0b" : "#334155"} strokeWidth="2" markerEnd="url(#arrowB)" />

          {/* Input Embedding */}
          <rect x="110" y="520" width="140" height="30" rx="4" fill="#0c4a6e" stroke={visuals.inputsActive ? "#38bdf8" : "#334155"} strokeWidth="2" filter={visuals.inputsActive ? "url(#glowBlue)" : "none"} />
          <text x="180" y="540" textAnchor="middle" fill="#e0f2fe" fontSize="12" fontWeight="bold">Input Embedding</text>
          
          <line x1="180" y1="520" x2="180" y2="460" stroke={visuals.inputsActive ? "#38bdf8" : "#334155"} strokeWidth="2" markerEnd="url(#arrowB)" />
          
          {/* Positional Encoding (Circle +) */}
          <circle cx="180" cy="490" r="12" fill="#0f172a" stroke={visuals.inputsActive ? "#38bdf8" : "#334155"} strokeWidth="2" />
          <text x="180" y="495" textAnchor="middle" fill={visuals.inputsActive ? "#38bdf8" : "#475569"} fontSize="16" fontWeight="bold">+</text>
          
          <circle cx="130" cy="490" r="16" fill="none" stroke={visuals.inputsActive ? "#38bdf8" : "#334155"} strokeWidth="1.5" />
          <path d="M 118 490 Q 124 480 130 490 T 142 490" fill="none" stroke={visuals.inputsActive ? "#38bdf8" : "#334155"} strokeWidth="1.5" />
          <line x1="146" y1="490" x2="168" y2="490" stroke={visuals.inputsActive ? "#38bdf8" : "#334155"} strokeWidth="2" markerEnd="url(#arrowB)" />

          {/* Multi-Head Attention (Encoder) */}
          <rect x="120" y="390" width="120" height="40" rx="4" fill="#7c2d12" stroke={visuals.encoderActive ? "#f97316" : "#334155"} strokeWidth="2" filter={visuals.encoderActive ? "url(#glowOrange)" : "none"} />
          <text x="180" y="408" textAnchor="middle" fill="#ffedd5" fontSize="11" fontWeight="bold">Multi-Head</text>
          <text x="180" y="422" textAnchor="middle" fill="#ffedd5" fontSize="11" fontWeight="bold">Attention</text>
          
          <line x1="180" y1="390" x2="180" y2="350" stroke={visuals.encoderActive ? "#38bdf8" : "#334155"} strokeWidth="2" markerEnd="url(#arrowB)" />
          
          {/* Add & Norm */}
          <rect x="120" y="320" width="120" height="30" rx="4" fill="#0f172a" stroke={visuals.encoderActive ? "#38bdf8" : "#334155"} strokeWidth="2" />
          <text x="180" y="340" textAnchor="middle" fill={visuals.encoderActive ? "#e0f2fe" : "#475569"} fontSize="12" fontWeight="bold">Add & Norm</text>
          
          <line x1="180" y1="320" x2="180" y2="280" stroke={visuals.encoderActive ? "#38bdf8" : "#334155"} strokeWidth="2" markerEnd="url(#arrowB)" />

          {/* Residual Connection 1 */}
          <path d="M 180 445 L 105 445 L 105 335 L 120 335" fill="none" stroke={visuals.encoderActive ? "#38bdf8" : "#334155"} strokeWidth="2" markerEnd="url(#arrowB)" />

          {/* Feed Forward */}
          <rect x="120" y="240" width="120" height="40" rx="4" fill="#064e3b" stroke={visuals.encoderActive ? "#34d399" : "#334155"} strokeWidth="2" />
          <text x="180" y="258" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">Feed</text>
          <text x="180" y="272" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">Forward</text>

          <line x1="180" y1="240" x2="180" y2="180" stroke={visuals.encoderActive ? "#38bdf8" : "#334155"} strokeWidth="2" markerEnd="url(#arrowB)" />

          {/* Add & Norm 2 */}
          <rect x="120" y="150" width="120" height="30" rx="4" fill="#0f172a" stroke={visuals.encoderActive ? "#38bdf8" : "#334155"} strokeWidth="2" />
          <text x="180" y="170" textAnchor="middle" fill={visuals.encoderActive ? "#e0f2fe" : "#475569"} fontSize="12" fontWeight="bold">Add & Norm</text>

          <line x1="180" y1="150" x2="180" y2="110" stroke={visuals.encoderActive ? "#38bdf8" : "#334155"} strokeWidth="2" markerEnd="url(#arrowB)" />

          {/* Residual Connection 2 */}
          <path d="M 180 300 L 105 300 L 105 165 L 120 165" fill="none" stroke={visuals.encoderActive ? "#38bdf8" : "#334155"} strokeWidth="2" markerEnd="url(#arrowB)" />

          {/* =========================================================
              DECODER SIDE (Right)
              ========================================================= */}
          
          {/* Outputs (Shifted Right) */}
          <rect x="370" y="580" width="100" height="30" rx="4" fill="#1e293b" stroke={visuals.decoderActive ? "#f59e0b" : "#334155"} strokeWidth="2" />
          <text x="420" y="600" textAnchor="middle" fill={visuals.decoderActive ? "#f59e0b" : "#475569"} fontSize="12" fontWeight="bold">Outputs (Shifted Right)</text>
          <line x1="420" y1="580" x2="420" y2="550" stroke={visuals.decoderActive ? "#f59e0b" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          {/* Output Embedding */}
          <rect x="350" y="520" width="140" height="30" rx="4" fill="#4c1d95" stroke={visuals.decoderActive ? "#c084fc" : "#334155"} strokeWidth="2" filter={visuals.decoderActive ? "url(#glowPurple)" : "none"} />
          <text x="420" y="540" textAnchor="middle" fill="#f3e8ff" fontSize="12" fontWeight="bold">Output Embedding</text>

          <line x1="420" y1="520" x2="420" y2="460" stroke={visuals.decoderActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          {/* Positional Encoding (Circle +) */}
          <circle cx="420" cy="490" r="12" fill="#0f172a" stroke={visuals.decoderActive ? "#c084fc" : "#334155"} strokeWidth="2" />
          <text x="420" y="495" textAnchor="middle" fill={visuals.decoderActive ? "#c084fc" : "#475569"} fontSize="16" fontWeight="bold">+</text>

          <circle cx="470" cy="490" r="16" fill="none" stroke={visuals.decoderActive ? "#c084fc" : "#334155"} strokeWidth="1.5" />
          <path d="M 458 490 Q 464 480 470 490 T 482 490" fill="none" stroke={visuals.decoderActive ? "#c084fc" : "#334155"} strokeWidth="1.5" />
          <line x1="454" y1="490" x2="432" y2="490" stroke={visuals.decoderActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          {/* Masked Multi-Head Attention */}
          <rect x="360" y="390" width="120" height="40" rx="4" fill="#831843" stroke={visuals.decoderActive ? "#f43f5e" : "#334155"} strokeWidth="2" filter={visuals.decoderActive ? "url(#glowOrange)" : "none"} />
          <text x="420" y="408" textAnchor="middle" fill="#ffe4e6" fontSize="11" fontWeight="bold">Masked Multi-Head</text>
          <text x="420" y="422" textAnchor="middle" fill="#ffe4e6" fontSize="11" fontWeight="bold">Attention</text>

          <line x1="420" y1="390" x2="420" y2="350" stroke={visuals.decoderActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          {/* Add & Norm */}
          <rect x="360" y="320" width="120" height="30" rx="4" fill="#0f172a" stroke={visuals.decoderActive ? "#c084fc" : "#334155"} strokeWidth="2" />
          <text x="420" y="340" textAnchor="middle" fill={visuals.decoderActive ? "#f3e8ff" : "#475569"} fontSize="12" fontWeight="bold">Add & Norm</text>

          {/* Residual Connection 1 Decoder */}
          <path d="M 420 445 L 345 445 L 345 335 L 360 335" fill="none" stroke={visuals.decoderActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          {/* Cross Attention Bridge */}
          <line x1="420" y1="320" x2="420" y2="280" stroke={visuals.decoderActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />
          
          <rect x="360" y="240" width="120" height="40" rx="4" fill="#7c2d12" stroke={visuals.crossAttentionActive ? "#f97316" : "#334155"} strokeWidth="2" filter={visuals.crossAttentionActive ? "url(#glowOrange)" : "none"} />
          <text x="420" y="258" textAnchor="middle" fill="#ffedd5" fontSize="11" fontWeight="bold">Multi-Head</text>
          <text x="420" y="272" textAnchor="middle" fill="#ffedd5" fontSize="11" fontWeight="bold">Attention</text>

          {/* CROSS ATTENTION BRIDGE LINES FROM ENCODER */}
          <path d="M 180 110 L 180 80 L 380 80 L 380 240" fill="none" stroke={visuals.crossAttentionActive ? "#38bdf8" : "#334155"} strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowB)" />
          <path d="M 180 110 L 180 80 L 400 80 L 400 240" fill="none" stroke={visuals.crossAttentionActive ? "#38bdf8" : "#334155"} strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowB)" />
          <text x="290" y="70" textAnchor="middle" fill={visuals.crossAttentionActive ? "#38bdf8" : "#475569"} fontSize="12" fontWeight="bold">Keys & Values</text>

          {/* Add & Norm 2 Decoder */}
          <line x1="420" y1="240" x2="420" y2="200" stroke={visuals.crossAttentionActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          <rect x="360" y="170" width="120" height="30" rx="4" fill="#0f172a" stroke={visuals.crossAttentionActive ? "#c084fc" : "#334155"} strokeWidth="2" />
          <text x="420" y="190" textAnchor="middle" fill={visuals.crossAttentionActive ? "#f3e8ff" : "#475569"} fontSize="12" fontWeight="bold">Add & Norm</text>

          {/* Residual Connection 2 Decoder */}
          <path d="M 420 300 L 345 300 L 345 185 L 360 185" fill="none" stroke={visuals.crossAttentionActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          {/* Feed Forward Decoder */}
          <line x1="420" y1="170" x2="420" y2="150" stroke={visuals.crossAttentionActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          <rect x="360" y="110" width="120" height="40" rx="4" fill="#064e3b" stroke={visuals.crossAttentionActive ? "#34d399" : "#334155"} strokeWidth="2" />
          <text x="420" y="128" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">Feed</text>
          <text x="420" y="142" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">Forward</text>

          {/* Add & Norm 3 Decoder */}
          <line x1="420" y1="110" x2="420" y2="90" stroke={visuals.crossAttentionActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          <rect x="360" y="60" width="120" height="30" rx="4" fill="#0f172a" stroke={visuals.crossAttentionActive ? "#c084fc" : "#334155"} strokeWidth="2" />
          <text x="420" y="80" textAnchor="middle" fill={visuals.crossAttentionActive ? "#f3e8ff" : "#475569"} fontSize="12" fontWeight="bold">Add & Norm</text>

          {/* Residual Connection 3 Decoder */}
          <path d="M 420 160 L 345 160 L 345 75 L 360 75" fill="none" stroke={visuals.crossAttentionActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          {/* =========================================================
              OUTPUT (Top Right)
              ========================================================= */}
          
          <line x1="420" y1="60" x2="420" y2="30" stroke={visuals.crossAttentionActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          <rect x="360" y="-10" width="120" height="40" rx="4" fill="#1e293b" stroke={visuals.outputActive ? "#f59e0b" : "#334155"} strokeWidth="2" filter={visuals.outputActive ? "url(#glowOrange)" : "none"} />
          <text x="420" y="15" textAnchor="middle" fill={visuals.outputActive ? "#fde68a" : "#475569"} fontSize="14" fontWeight="bold">Linear</text>

          <line x1="420" y1="-10" x2="420" y2="-40" stroke={visuals.outputActive ? "#f59e0b" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          <rect x="360" y="-80" width="120" height="40" rx="20" fill="#4c1d95" stroke={visuals.outputActive ? "#c084fc" : "#334155"} strokeWidth="2" filter={visuals.outputActive ? "url(#glowPurple)" : "none"} />
          <text x="420" y="-55" textAnchor="middle" fill={visuals.outputActive ? "#f3e8ff" : "#475569"} fontSize="14" fontWeight="bold">Softmax</text>

          <line x1="420" y1="-80" x2="420" y2="-110" stroke={visuals.outputActive ? "#c084fc" : "#334155"} strokeWidth="2" markerEnd="url(#arrowP)" />

          <rect x="360" y="-140" width="120" height="30" rx="4" fill="#1e293b" stroke={visuals.outputActive ? "#34d399" : "#334155"} strokeWidth="2" filter={visuals.outputActive ? "url(#glowBlue)" : "none"} />
          <text x="420" y="-120" textAnchor="middle" fill={visuals.outputActive ? "#a7f3d0" : "#475569"} fontSize="12" fontWeight="bold">Output Probabilities</text>

        </svg>
      </div>

    </div>
  );
}
