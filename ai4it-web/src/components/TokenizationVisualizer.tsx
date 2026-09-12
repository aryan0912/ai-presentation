'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Hash, Type, WholeWord } from 'lucide-react';

type TokenMode = 'word' | 'subword' | 'char';

const EXAMPLE_TEXTS = [
  "Unbelievably, the autocorrect algorithm misunderstood.",
  "ChatGPT uses subword tokenization to read text efficiently.",
  "Supercalifragilisticexpialidocious!"
];

export default function TokenizationVisualizer() {
  const [textIndex, setTextIndex] = useState(0);
  const [mode, setMode] = useState<TokenMode>('subword');
  
  const text = EXAMPLE_TEXTS[textIndex];
  
  const tokenize = (str: string, mode: TokenMode) => {
    if (mode === 'char') {
      return str.split('').map(c => c === ' ' ? ' ' : c);
    }
    if (mode === 'word') {
      return str.split(/(\s+|[.,!])/g).filter(Boolean);
    }
    // Simple mock subword tokenization for demonstration
    const subwordRegex = /(Un|believ|ably|auto|correct|algorithm|mis|under|stood|Chat|G|PT|use|s|sub|word|token|ization|to|read|text|efficient|ly|Super|cali|fragil|istic|expi|ali|docious|[,.!\s])/g;
    
    // Fallback if it doesn't match our specific mock dictionary
    let tokens = str.split(subwordRegex).filter(Boolean);
    
    // Process any large chunks that didn't get split by the mock regex
    let finalTokens: string[] = [];
    tokens.forEach(t => {
      if (t.length > 10 && !t.match(/[\s.,!]/)) {
        finalTokens.push(t.substring(0, 5), t.substring(5));
      } else {
        finalTokens.push(t);
      }
    });
    
    return finalTokens;
  };
  
  const tokens = tokenize(text, mode);

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-950/95 border border-slate-700/50 space-y-8 font-sans shadow-2xl relative overflow-hidden my-8">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-950/40 border border-sky-800/40 px-3 py-1 rounded-full w-fit mb-3">
            <Scissors size={14} />
            <span>How AI Reads</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Tokenization: Chopping up Language
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            AI models don't read words like humans do. They chop text into smaller chunks called "tokens". See why subword tokenization is the gold standard for models like ChatGPT.
          </p>
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
             <button
              onClick={() => setMode('word')}
              className={`px-4 py-2 rounded-md text-xs font-mono transition-all flex items-center gap-2 ${mode === 'word' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <WholeWord size={14} /> Word Level
            </button>
            <button
              onClick={() => setMode('subword')}
              className={`px-4 py-2 rounded-md text-xs font-mono transition-all flex items-center gap-2 ${mode === 'subword' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Hash size={14} /> Subword (Modern AI)
            </button>
            <button
              onClick={() => setMode('char')}
              className={`px-4 py-2 rounded-md text-xs font-mono transition-all flex items-center gap-2 ${mode === 'char' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Type size={14} /> Character
            </button>
          </div>
          
          <button 
            onClick={() => setTextIndex((prev) => (prev + 1) % EXAMPLE_TEXTS.length)}
            className="text-xs font-mono text-slate-400 hover:text-white px-3 py-2 bg-slate-800 rounded-lg transition-colors"
          >
            Try Another Sentence →
          </button>
        </div>

        {/* Token Display */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 min-h-[200px]">
          <div className="flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {tokens.map((token, i) => (
                <motion.div
                  key={`${mode}-${textIndex}-${i}`}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.2, 
                    delay: i * 0.02,
                    type: 'spring',
                    stiffness: 200
                  }}
                  className={`
                    px-2.5 py-1.5 rounded-md text-lg font-mono flex flex-col items-center
                    ${token.match(/^\s+$/) ? 'bg-transparent' : 
                      mode === 'subword' ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50' : 
                      mode === 'word' ? 'bg-sky-950/40 text-sky-300 border border-sky-800/50' : 
                      'bg-purple-950/40 text-purple-300 border border-purple-800/50'}
                  `}
                >
                  {token.match(/^\s+$/) ? <span className="opacity-20 text-slate-500">␣</span> : token}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="mt-8 flex items-center justify-between text-xs font-mono border-t border-slate-800 pt-4 text-slate-400">
            <span>Total Tokens Generated: <strong className="text-white text-base">{tokens.length}</strong></span>
            
            <span className="text-right max-w-md">
              {mode === 'word' && "Word level struggles with punctuation and rare words (like 'unbelievably'). Huge dictionary needed."}
              {mode === 'subword' && "Subword splits rare words ('un-believ-ably') but keeps common ones whole. Perfect balance. This is how ChatGPT works."}
              {mode === 'char' && "Character level creates too many tokens. The AI forgets the beginning of a word before it finishes reading it."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
