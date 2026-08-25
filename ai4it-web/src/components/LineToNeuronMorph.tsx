'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

export default function LineToNeuronMorph() {
  // Keyframes:
  // 1: Single straight line: y = m·x + c
  // 2: Multi-input planar line: y = w1·x1 + w2·x2 + c
  // 3: Bent activation line (ReLU neuron): y = ReLU(w1·x1 + w2·x2 + c)
  const [keyframe, setKeyframe] = useState<number>(1);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-play once when scrolled into view (NEVER auto-loops at the end)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    if (keyframe === 1) {
      const t = setTimeout(() => setKeyframe(2), 2200);
      return () => clearTimeout(t);
    } else if (keyframe === 2) {
      const t = setTimeout(() => setKeyframe(3), 2500);
      return () => clearTimeout(t);
    }
  }, [hasStarted, keyframe]);

  const handleReplay = () => {
    setKeyframe(1);
    setHasStarted(true);
  };

  return (
    <div
      ref={containerRef}
      className="p-6 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-6 select-none"
    >
      {/* Header with Keyframe Indicator & Replay */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-300 uppercase">
            Evolution: Straight Line &rarr; Neuron
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 font-mono text-[10px]">
            <button
              onClick={() => setKeyframe(1)}
              className={`px-2 py-0.5 rounded transition-colors ${
                keyframe === 1 ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'
              }`}
            >
              1. 1D Line
            </button>
            <button
              onClick={() => setKeyframe(2)}
              className={`px-2 py-0.5 rounded transition-colors ${
                keyframe === 2 ? 'bg-purple-500 text-white font-bold' : 'bg-slate-900 text-slate-400'
              }`}
            >
              2. Multi-Input
            </button>
            <button
              onClick={() => setKeyframe(3)}
              className={`px-2 py-0.5 rounded transition-colors ${
                keyframe === 3 ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'
              }`}
            >
              3. ReLU Kink
            </button>
          </div>

          <button
            onClick={handleReplay}
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
          >
            <RotateCcw size={12} /> Replay
          </button>
        </div>
      </div>

      {/* SVG Canvas for Morphing */}
      <div className="relative w-full h-[220px] bg-slate-900/80 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        <svg viewBox="0 0 500 220" className="w-full h-full">
          {/* Coordinate Axes */}
          <line x1="60" y1="20" x2="60" y2="180" stroke="#334155" strokeWidth="1.5" />
          <line x1="60" y1="180" x2="460" y2="180" stroke="#334155" strokeWidth="1.5" />
          <text x="460" y="200" textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">
            {keyframe === 1 ? 'Feature (x)' : keyframe === 2 ? 'Features (x₁, x₂)' : 'Inputs (∑ wᵢxᵢ + b)'}
          </text>
          <text x="50" y="30" textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">
            Output (y)
          </text>

          {/* Grid lines */}
          <line x1="60" y1="100" x2="460" y2="100" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="260" y1="20" x2="260" y2="180" stroke="#1e293b" strokeDasharray="3 3" />

          {/* KEYFRAME 1: Single straight line */}
          {keyframe === 1 && (
            <motion.g
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 0.8 }}
            >
              <line x1="60" y1="160" x2="440" y2="40" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="60" cy="160" r="4" fill="#38bdf8" />
              <circle cx="250" cy="100" r="4" fill="#38bdf8" />
              <circle cx="440" cy="40" r="4" fill="#38bdf8" />
              <text x="260" y="85" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">
                y = m·x + c
              </text>
            </motion.g>
          )}

          {/* KEYFRAME 2: Multi-input tilted plane / dual lines */}
          {keyframe === 2 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Secondary tilted depth guide */}
              <line x1="100" y1="170" x2="470" y2="55" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" opacity={0.6} />
              <line x1="60" y1="150" x2="430" y2="35" stroke="#c084fc" strokeWidth="3" />

              <circle cx="60" cy="150" r="4" fill="#c084fc" />
              <circle cx="430" cy="35" r="4" fill="#c084fc" />

              {/* Vector cues */}
              <text x="250" y="70" fill="#c084fc" fontSize="12" fontWeight="bold" fontFamily="monospace">
                y = w₁x₁ + w₂x₂ + c
              </text>
              <text x="250" y="90" fill="#a855f7" fontSize="10" fontFamily="monospace">
                (Multiple inputs, still a flat linear plane)
              </text>
            </motion.g>
          )}

          {/* KEYFRAME 3: Non-linear ReLU bend (The Neuron!) */}
          {keyframe === 3 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Flat zero part (suppression) */}
              <line x1="60" y1="180" x2="240" y2="180" stroke="#34d399" strokeWidth="3.5" />
              {/* Active linear ramp */}
              <line x1="240" y1="180" x2="440" y2="40" stroke="#34d399" strokeWidth="3.5" />

              {/* The ReLU Elbow Node */}
              <circle cx="240" cy="180" r="6" fill="#34d399" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
              
              <text x="240" y="160" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">
                The Non-Linear "Elbow" (ReLU)
              </text>
              <text x="350" y="80" fill="#6ee7b7" fontSize="13" fontWeight="bold" fontFamily="monospace">
                y = ReLU(∑ wᵢxᵢ + b)
              </text>
            </motion.g>
          )}
        </svg>
      </div>

      {/* Narrative Footer */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
        {keyframe === 1 && (
          <p>
            <strong className="text-sky-300">Stage 1:</strong> One weight ($m$), one bias ($c$). Draws a single straight line through 1D data.
          </p>
        )}
        {keyframe === 2 && (
          <p>
            <strong className="text-purple-300">Stage 2:</strong> Multiple weights ($w_1, w_2$). Still completely linear — adding inputs tilts the plane, but cannot bend it.
          </p>
        )}
        {keyframe === 3 && (
          <div className="space-y-1">
            <p className="text-emerald-300 font-bold text-sm">
              "That is a Neural Network. An artificial neuron is literally the line you just fitted, with a kink added."
            </p>
            <p className="text-[11px] text-slate-400">
              Frank Rosenblatt called this a Perceptron in 1958. Stack layers of these kinks together, and you can approximate any curve in the universe.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
