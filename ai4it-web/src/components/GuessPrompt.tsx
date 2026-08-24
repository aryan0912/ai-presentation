'use client';
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle2, MessageSquare } from 'lucide-react';

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
    <div className={`p-6 rounded-2xl border border-amber-500/30 bg-amber-950/10 backdrop-blur-md ${className}`}>
      <div className="flex items-start gap-3.5 mb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
          <HelpCircle size={24} />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Interactive Room Pause</span>
          <h3 className="text-xl font-bold text-white mt-0.5">{question}</h3>
          <p className="text-xs text-amber-300/70 mt-1 flex items-center gap-1.5">
            <MessageSquare size={12} />
            {promptGuidance}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-700/60 hover:border-slate-500 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white text-base">{opt.label}</span>
                {opt.value !== undefined && (
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                    {opt.value}
                  </span>
                )}
              </div>

              {isSelected && (
                <div className="mt-3 pt-3 border-t border-amber-500/30 text-xs text-slate-200 leading-relaxed animate-fadeIn">
                  {opt.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allowCustomGuess && (
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-300 block">{customGuessLabel}</label>
            <span className="text-xs text-slate-500">Your dot will be plotted live on the chart below</span>
          </div>

          <form onSubmit={handleCustomSubmit} className="flex items-center gap-2">
            <div className="relative">
              <input
                type="number"
                step="any"
                placeholder="e.g. 2450"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="w-36 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-amber-400"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-500">{customGuessUnit}</span>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all"
            >
              Plot Guess
            </button>
          </form>
          {customSubmitted && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={13} /> Guess plotted! Check Section E chart.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
