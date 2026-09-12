'use client';
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Network, BookOpen, Layers } from 'lucide-react';

const SENTENCE = "The animal didn't cross the street because it was too tired .".split(' ');

// Define attention weights for the word "it" (index 8)
// High attention on "animal" (1), low on others.
const ATTENTION_WEIGHTS: Record<number, number> = {
  0: 0.05, // The
  1: 0.85, // animal
  2: 0.02, // didn't
  3: 0.03, // cross
  4: 0.01, // the
  5: 0.15, // street
  6: 0.05, // because
  7: 0.02, // it (self)
  8: 0.01, // was
  9: 0.01, // too
  10: 0.01, // tired
  11: 0.01 // .
};

export default function AttentionVisualizer() {
  const [activeWord, setActiveWord] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lines, setLines] = useState<{ x1: number, y1: number, x2: number, y2: number, weight: number }[]>([]);

  // Calculate SVG line coordinates between the active word and all other words
  const calculateLines = () => {
    if (activeWord === null || !containerRef.current) {
      setLines([]);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const activeEl = wordRefs.current[activeWord];
    
    if (!activeEl) return;
    
    const activeRect = activeEl.getBoundingClientRect();
    const startX = activeRect.left - containerRect.left + activeRect.width / 2;
    // Draw from the top of the word
    const startY = activeRect.top - containerRect.top; 

    const newLines = SENTENCE.map((_, index) => {
      const targetEl = wordRefs.current[index];
      if (!targetEl || index === activeWord) return null;

      const targetRect = targetEl.getBoundingClientRect();
      const endX = targetRect.left - containerRect.left + targetRect.width / 2;
      const endY = targetRect.top - containerRect.top;

      // Mock weights if not "it" (index 7)
      let weight = 0.05;
      if (activeWord === 7) {
        weight = ATTENTION_WEIGHTS[index] || 0.01;
      } else if (activeWord === 1) { // animal -> tired
         if (index === 10) weight = 0.7;
         if (index === 3) weight = 0.4;
      } else if (activeWord === 5) { // street -> cross
         if (index === 3) weight = 0.8;
      }

      return { x1: startX, y1: startY, x2: endX, y2: endY, weight };
    }).filter(Boolean) as any[];

    setLines(newLines);
  };

  // Re-calculate lines when active word changes or window resizes
  useLayoutEffect(() => {
    calculateLines();
    window.addEventListener('resize', calculateLines);
    return () => window.removeEventListener('resize', calculateLines);
  }, [activeWord]);

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-slate-700/50 space-y-8 font-sans shadow-2xl relative overflow-hidden my-8">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-800/40 px-3 py-1 rounded-full w-fit mb-3">
            <Network size={14} />
            <span>The Magic of Transformers</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Self-Attention: Reading Context
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Instead of reading word-by-word like an RNN, a Transformer reads the whole sentence at once. It draws invisible laser lines connecting every word to every other word to understand context.
          </p>
        </div>
      </div>

      <div className="relative z-10 space-y-8">
        
        <div className="p-4 bg-indigo-950/20 border border-indigo-900/40 rounded-xl flex items-start gap-3">
          <Eye className="text-indigo-400 mt-0.5 shrink-0" size={18} />
          <p className="text-sm text-indigo-200">
            <strong>Hover over the word "it".</strong> How does the AI know if "it" refers to the animal or the street? Watch the connection strength.
          </p>
        </div>

        {/* Interactive Sentence Area */}
        <div 
          ref={containerRef} 
          className="relative p-12 mt-12 bg-slate-900/60 rounded-2xl border border-slate-800 min-h-[250px] flex items-end justify-center"
        >
          {/* SVG Canvas for Attention Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
            <AnimatePresence>
              {lines.map((line, i) => {
                // Determine color and thickness based on weight
                const isHeavy = line.weight > 0.3;
                const strokeColor = isHeavy ? 'rgba(129, 140, 248, 0.8)' : 'rgba(100, 116, 139, 0.2)'; // indigo-400 vs slate-500
                const strokeWidth = Math.max(1, line.weight * 10);
                
                // Draw a bezier curve arching upwards
                const midX = (line.x1 + line.x2) / 2;
                const heightOffset = Math.abs(line.x1 - line.x2) * 0.3 + 20; // Arch higher if words are further apart
                const pathData = `M ${line.x1} ${line.y1} Q ${midX} ${Math.min(line.y1, line.y2) - heightOffset} ${line.x2} ${line.y2}`;

                return (
                  <motion.path
                    key={`${activeWord}-${i}`}
                    d={pathData}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                );
              })}
            </AnimatePresence>
          </svg>

          {/* The Words */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-12 z-10 mt-20">
            {SENTENCE.map((word, index) => {
              const isHovered = activeWord === index;
              const isTargetHeavy = activeWord === 7 && ATTENTION_WEIGHTS[index] > 0.3;
              
              return (
                <span
                  key={index}
                  ref={(el) => { wordRefs.current[index] = el; }}
                  onMouseEnter={() => setActiveWord(index)}
                  onMouseLeave={() => setActiveWord(null)}
                  className={`text-xl md:text-3xl font-bold font-serif transition-all duration-300 cursor-crosshair px-2 py-1 rounded-lg ${
                    isHovered 
                      ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.6)] scale-110 -translate-y-2' 
                      : isTargetHeavy 
                        ? 'text-indigo-300 bg-indigo-950/50 scale-105'
                        : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
        
        {/* Explanation Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <Layers size={16} className="text-sky-400" /> 
              The Cocktail Party Problem
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              When you are in a noisy room, your brain focuses (pays attention) to the one person speaking to you and ignores the background noise. Self-attention does this for words in a sentence.
            </p>
          </div>
          
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <BookOpen size={16} className="text-amber-400" /> 
              The Filing Cabinet (Q, K, V)
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Under the hood, it acts like a library system: <br/><br/>
              <strong>Query:</strong> The word "it" asks, <em>"Who is the subject?"</em><br/>
              <strong>Key:</strong> The word "animal" holds a tag saying, <em>"I am the subject!"</em><br/>
              <strong>Value:</strong> The context of the animal is transferred to "it".
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
