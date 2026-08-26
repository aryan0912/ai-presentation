'use client';
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Eye, EyeOff, Clock, HelpCircle, AlertOctagon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InstructorNoteProps {
  timing?: string;
  aloudQuestion?: string;
  expectedWrongAnswers?: string[];
  instructorTip?: string;
  children?: React.ReactNode;
}

export default function InstructorNote({
  timing,
  aloudQuestion,
  expectedWrongAnswers = [],
  instructorTip,
  children,
}: InstructorNoteProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'N' || e.key === 'n')) {
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="my-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-xl border transition-all duration-200 ${
            isOpen
              ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
              : 'bg-purple-950/40 hover:bg-purple-900/50 border-purple-700/40 text-purple-300'
          }`}
          title="Toggle with Shift + N"
        >
          <ShieldCheck size={14} className={isOpen ? 'text-white' : 'text-purple-400'} />
          <span className="font-mono">Instructor Cue ({isOpen ? 'Visible' : 'Hidden · Shift+N'})</span>
          {isOpen ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>
        {timing && (
          <span className="text-xs text-purple-400/90 font-mono flex items-center gap-1.5 bg-purple-950/40 px-2.5 py-1 rounded-lg border border-purple-800/40">
            <Clock size={12} /> {timing}
          </span>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            className="mt-3.5 p-5 rounded-2xl border border-purple-500/40 bg-gradient-to-b from-purple-950/40 via-slate-900/90 to-slate-950/95 backdrop-blur-xl text-xs text-purple-200 shadow-2xl overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

            <div className="flex items-center justify-between border-b border-purple-800/50 pb-2.5 mb-4">
              <span className="font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2 font-mono">
                <ShieldCheck size={16} className="text-purple-400" /> Instructor Backstage Prompter
              </span>
              {timing && (
                <span className="font-mono text-[11px] text-purple-300 bg-purple-900/70 px-2.5 py-0.5 rounded-full border border-purple-700/50">
                  Pacing: {timing}
                </span>
              )}
            </div>

            {aloudQuestion && (
              <div className="mb-3.5">
                <strong className="text-purple-300 flex items-center gap-1.5 mb-1.5 font-mono">
                  <HelpCircle size={14} className="text-purple-400" /> Question to Ask Aloud:
                </strong>
                <p className="italic text-purple-100 text-sm pl-4 border-l-2 border-purple-400 py-0.5 leading-relaxed bg-purple-950/30 rounded-r-lg">
                  &ldquo;{aloudQuestion}&rdquo;
                </p>
              </div>
            )}

            {expectedWrongAnswers.length > 0 && (
              <div className="mb-3.5">
                <strong className="text-purple-300 flex items-center gap-1.5 mb-1.5 font-mono">
                  <AlertOctagon size={14} className="text-rose-400" /> Expected Misconceptions & How to Guide:
                </strong>
                <ul className="list-disc list-inside space-y-1 text-purple-200/90 pl-1 leading-relaxed">
                  {expectedWrongAnswers.map((ans, i) => (
                    <li key={i}>{ans}</li>
                  ))}
                </ul>
              </div>
            )}

            {instructorTip && (
              <div className="mt-3 pt-3 border-t border-purple-800/40 text-purple-200/90 leading-relaxed bg-purple-950/20 p-3 rounded-xl border border-purple-900/40">
                <strong className="text-purple-300 font-mono block mb-0.5">Instructor Strategy:</strong>
                {instructorTip}
              </div>
            )}

            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

