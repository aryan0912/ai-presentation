'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GlossItem {
  id: string;
  symbol: string;
  meaning: string;
  aiName: string;
  color: string;
}

const GLOSSARY: GlossItem[] = [
  { id: 'y', symbol: 'y', meaning: 'Predicted milk intake for that day', aiName: 'Label (ŷ)', color: '#38bdf8' },
  { id: 'm', symbol: 'm', meaning: 'Rate of change (+42 Litres per Day)', aiName: 'Weight (w)', color: '#a855f7' },
  { id: 'x', symbol: 'x', meaning: 'Input Day number (1, 2, 3... 7)', aiName: 'Feature', color: '#34d399' },
  { id: 'c', symbol: 'c', meaning: 'Starting collection volume at Day 0', aiName: 'Bias (b)', color: '#f59e0b' },
];

export default function EquationTokenHighlight() {
  const [activeToken, setActiveToken] = useState<string | null>(null);

  return (
    <div className="my-6 p-6 rounded-2xl border border-blue-500/20 bg-slate-950/80 backdrop-blur-md space-y-5">
      
      {/* Interactive Token Formula */}
      <div className="flex items-center justify-center gap-2 font-mono text-2xl md:text-3xl font-extrabold py-2 select-none">
        
        {/* y token */}
        <motion.span
          animate={{
            scale: activeToken === 'y' ? 1.25 : 1,
            color: activeToken === 'y' ? '#38bdf8' : '#ffffff',
            textShadow: activeToken === 'y' ? '0 0 16px rgba(56, 189, 248, 0.8)' : 'none',
          }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800"
          onMouseEnter={() => setActiveToken('y')}
          onMouseLeave={() => setActiveToken(null)}
          onClick={() => setActiveToken(activeToken === 'y' ? null : 'y')}
        >
          y
        </motion.span>

        <span className="text-slate-500">=</span>

        {/* m token */}
        <motion.span
          animate={{
            scale: activeToken === 'm' ? 1.25 : 1,
            color: activeToken === 'm' ? '#c084fc' : '#ffffff',
            textShadow: activeToken === 'm' ? '0 0 16px rgba(192, 132, 252, 0.8)' : 'none',
          }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800"
          onMouseEnter={() => setActiveToken('m')}
          onMouseLeave={() => setActiveToken(null)}
          onClick={() => setActiveToken(activeToken === 'm' ? null : 'm')}
        >
          m
        </motion.span>

        <span className="text-slate-500">·</span>

        {/* x token */}
        <motion.span
          animate={{
            scale: activeToken === 'x' ? 1.25 : 1,
            color: activeToken === 'x' ? '#34d399' : '#ffffff',
            textShadow: activeToken === 'x' ? '0 0 16px rgba(52, 211, 153, 0.8)' : 'none',
          }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800"
          onMouseEnter={() => setActiveToken('x')}
          onMouseLeave={() => setActiveToken(null)}
          onClick={() => setActiveToken(activeToken === 'x' ? null : 'x')}
        >
          x
        </motion.span>

        <span className="text-slate-500">+</span>

        {/* c token */}
        <motion.span
          animate={{
            scale: activeToken === 'c' ? 1.25 : 1,
            color: activeToken === 'c' ? '#f59e0b' : '#ffffff',
            textShadow: activeToken === 'c' ? '0 0 16px rgba(245, 158, 11, 0.8)' : 'none',
          }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800"
          onMouseEnter={() => setActiveToken('c')}
          onMouseLeave={() => setActiveToken(null)}
          onClick={() => setActiveToken(activeToken === 'c' ? null : 'c')}
        >
          c
        </motion.span>
      </div>

      <div className="text-center text-xs font-semibold text-blue-300 font-mono tracking-wide">
        "Prediction = Slope × Input + Starting Offset"
      </div>

      {/* Interactive Glossary Chips */}
      <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
        {GLOSSARY.map((item) => {
          const isActive = activeToken === item.id;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveToken(item.id)}
              onMouseLeave={() => setActiveToken(null)}
              onClick={() => setActiveToken(isActive ? null : item.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'border-sky-400 bg-slate-900 shadow-lg scale-105'
                  : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-sm" style={{ color: item.color }}>
                  {item.symbol}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/50">
                  {item.aiName}
                </span>
              </div>
              <p className="text-slate-300 text-xs leading-tight">{item.meaning}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
