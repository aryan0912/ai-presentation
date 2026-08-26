'use client';
import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
  id: string;
  label: string;
  value?: string | number;
  explanation: string;
  isBaseline?: boolean;
}

interface GuessPromptProps {
  question: string;
  promptGuidance?: string;
  options: Option[];
  onSelectOption?: (option: Option) => void;
  allowCustomGuess?: boolean;
  customGuessLabel?: string;
  customGuessUnit?: string;
  onCustomGuessSubmit?: (val: number) => void;
  className?: string;
}

export default function GuessPrompt({
  question,
  promptGuidance = 'Pause and ask the room before clicking to reveal.',
  options,
  onSelectOption,
  allowCustomGuess = false,
  customGuessLabel = 'Enter your numerical prediction:',
  customGuessUnit = 'litres',
  onCustomGuessSubmit,
  className = '',
}: GuessPromptProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [customValue, setCustomValue] = useState<string>('');
  const [customSubmitted, setCustomSubmitted] = useState(false);

  const handleSelect = (opt: Option) => {
    setSelectedId(opt.id);
    setRevealed(true);
    if (onSelectOption) onSelectOption(opt);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(customValue);
    if (!isNaN(num) && onCustomGuessSubmit) {
      onCustomGuessSubmit(num);
      setCustomSubmitted(true);
      try {
        localStorage.setItem('ai4it_user_guess', num.toString());
      } catch (err) {}
    }
  };

  return (
    <div className={`p-6 md:p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-slate-900/60 to-slate-950/80 backdrop-blur-xl shadow-2xl relative overflow-hidden ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      <div className="flex items-start gap-4 mb-6 relative z-10">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/40 text-amber-400 shadow-lg shadow-amber-500/10">
          <HelpCircle size={26} className="animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/60">
              Interactive Room Pause
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-1 tracking-tight">{question}</h3>
          <p className="text-xs text-amber-200/80 mt-1.5 flex items-center gap-1.5 font-mono">
            <MessageSquare size={13} className="text-amber-400" />
            {promptGuidance}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 relative z-10">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer select-none relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-b from-amber-500/20 to-amber-950/40 border-amber-400 shadow-xl shadow-amber-500/20 transform scale-[1.02]'
                  : 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40 hover:bg-slate-800/80 hover:scale-[1.01]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
              )}

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-bold text-white text-base leading-snug">{opt.label}</span>
                {opt.value !== undefined && (
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/30 shrink-0">
                    {opt.value}
                  </span>
                )}
              </div>

              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-amber-500/30 text-xs text-amber-100 leading-relaxed font-sans"
                >
                  <p className="bg-amber-950/40 p-2.5 rounded-lg border border-amber-500/20">
                    {opt.explanation}
                  </p>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {allowCustomGuess && (
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 relative z-10 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-sm font-bold text-slate-200 block">{customGuessLabel}</label>
            <span className="text-xs text-slate-400 font-mono">Your prediction will be plotted live on the chart</span>
          </div>

          <form onSubmit={handleCustomSubmit} className="flex items-center gap-2.5">
            <div className="relative">
              <input
                type="number"
                step="any"
                placeholder="e.g. 2450"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="w-40 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-500 font-mono">{customGuessUnit}</span>
            </div>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
            >
              <span>Plot Guess</span>
              <ArrowRight size={14} />
            </button>
          </form>
          {customSubmitted && (
            <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono font-semibold w-full md:w-auto">
              <CheckCircle2 size={15} /> Guess plotted! Check Section E chart.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

