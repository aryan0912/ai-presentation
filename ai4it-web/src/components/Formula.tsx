'use client';
import React, { useMemo } from 'react';
import katex from 'katex';

interface GlossItem {
  symbol: string;
  meaning: string;
  aiName?: string;
}

interface FormulaProps {
  latex: string;
  plainSummary?: string;
  gloss?: GlossItem[];
  displayMode?: boolean;
  className?: string;
}

export default function Formula({
  latex,
  plainSummary,
  gloss = [],
  displayMode = true,
  className = '',
}: FormulaProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
      });
    } catch (err) {
      return latex;
    }
  }, [latex, displayMode]);

  return (
    <div className={`my-6 p-6 rounded-2xl border border-sky-500/25 bg-gradient-to-b from-sky-950/20 via-slate-900/80 to-slate-950/90 backdrop-blur-xl shadow-2xl relative overflow-hidden ${className}`}>
      {/* Top subtle glowing hairline */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
      <div className="absolute top-0 right-0 w-64 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div
        className="text-white text-center overflow-x-auto py-3 text-lg md:text-2xl font-light tracking-wide select-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {plainSummary && (
        <div className="mt-2 text-center text-xs md:text-sm font-semibold text-sky-300 font-mono tracking-wide flex items-center justify-center gap-2">
          <span className="text-sky-500">&ldquo;</span>
          <span>{plainSummary}</span>
          <span className="text-sky-500">&rdquo;</span>
        </div>
      )}

      {gloss.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {gloss.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-all text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-sky-400 text-sm">{item.symbol}</span>
                {item.aiName && (
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-purple-950/90 text-purple-300 border border-purple-700/50">
                    {item.aiName}
                  </span>
                )}
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed font-sans mt-0.5">{item.meaning}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

