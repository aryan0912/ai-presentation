'use client';
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Eye, EyeOff, Clock, HelpCircle, AlertOctagon } from 'lucide-react';

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
    <div className="my-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/40 text-purple-300 transition-colors"
          title="Toggle with Shift + N"
        >
          <ShieldCheck size={14} className="text-purple-400" />
          <span>Instructor Cue ({isOpen ? 'Visible' : 'Hidden · Press Shift+N'})</span>
          {isOpen ? <EyeOff size={12} /> : <Eye size={12} />}
        </button>
        {timing && <span className="text-xs text-purple-400/80 font-mono flex items-center gap-1"><Clock size={11} /> {timing}</span>}
      </div>

      {isOpen && (
        <div className="mt-2.5 p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 backdrop-blur-md text-xs text-purple-200 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-purple-800/50 pb-2 mb-3">
            <span className="font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <ShieldCheck size={14} /> Instructor Backstage Prompter
            </span>
            {timing && <span className="font-mono text-purple-400 bg-purple-900/60 px-2 py-0.5 rounded">Pacing: {timing}</span>}
          </div>

          {aloudQuestion && (
            <div className="mb-2.5">
              <strong className="text-purple-300 flex items-center gap-1 mb-0.5">
                <HelpCircle size={12} /> Question to Ask Aloud:
              </strong>
              <p className="italic text-purple-100 pl-4 border-l-2 border-purple-400">"{aloudQuestion}"</p>
            </div>
          )}

          {expectedWrongAnswers.length > 0 && (
            <div className="mb-2.5">
              <strong className="text-purple-300 flex items-center gap-1 mb-0.5">
                <AlertOctagon size={12} /> Expected Wrong Answers & How to Guide:
              </strong>
              <ul className="list-disc list-inside space-y-0.5 text-purple-200/90 pl-1">
                {expectedWrongAnswers.map((ans, i) => (
                  <li key={i}>{ans}</li>
                ))}
              </ul>
            </div>
          )}

          {instructorTip && (
            <div className="mt-2 pt-2 border-t border-purple-800/30 text-purple-300/90">
              <strong>Instructor Strategy:</strong> {instructorTip}
            </div>
          )}

          {children}
        </div>
      )}
    </div>
  );
}
