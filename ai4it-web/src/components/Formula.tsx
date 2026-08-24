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
    <div className={`my-4 p-5 rounded-xl border border-blue-500/20 bg-slate-900/70 backdrop-blur-md ${className}`}>
      <div
        className="text-white text-center overflow-x-auto py-2 text-lg md:text-xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {plainSummary && (
        <div className="mt-2 text-center text-xs font-semibold text-blue-300 font-mono tracking-wide">
          "{plainSummary}"
        </div>
      )}

      {gloss.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {gloss.map((item, idx) => (
            <div key={idx} className="p-2 rounded bg-slate-950/60 border border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-mono font-bold text-sky-400">{item.symbol}</span>
                {item.aiName && (
                  <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 border border-purple-800/50">
                    {item.aiName}
                  </span>
                )}
              </div>
              <p className="text-slate-300 text-[11px] leading-tight">{item.meaning}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
