'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sliders,
  Sparkles,
  Layers,
  BrainCircuit,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { usePresentation } from './PresentationContext';

interface BeatLink {
  id: string;
  label: string;
  badge?: string;
}

export default function LectureHeader() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar, activeBeat } = usePresentation();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Define beats per page
  const pageBeats: Record<string, BeatLink[]> = {
    '/day1/linear-regression': [
      { id: 'beat-1', label: '1. Observations' },
      { id: 'beat-2', label: '2. Guess' },
      { id: 'beat-3a', label: '3A. Origin' },
      { id: 'beat-3b1', label: '3B.1 Model' },
      { id: 'beat-3b2', label: '3B.2 Loss' },
      { id: 'beat-3b3', label: '3B.3 Downhill' },
      { id: 'beat-3b4', label: '3B.4 Step' },
      { id: 'beat-3b6', label: '3B.6 Arithmetic' },
      { id: 'beat-3b7', label: '3B.7 2-Feature' },
      { id: 'beat-3b8', label: '3B.8 Recap' },
      { id: 'section-e', label: 'E. Simulator' },
      { id: 'beat-4', label: '4. Break It' },
      { id: 'beat-5', label: '5. Apply IT' },
      { id: 'section-h', label: 'H. Bridge NN' },
    ],
    '/day1/neural-network': [
      { id: 'beat-1', label: '1. Saturday Miss' },
      { id: 'beat-2', label: '2. What Missed' },
      { id: 'beat-3a', label: '3A. The Bend' },
      { id: 'beat-3b1', label: '3B.1 Neuron' },
      { id: 'beat-3b2', label: '3B.2 Hand Pass' },
      { id: 'beat-3b4', label: '3B.4 Chain Rule' },
      { id: 'beat-3b5', label: '3B.5 Matrix Layer' },
      { id: 'beat-3b6', label: '3B.6 Backprop' },
      { id: 'beat-3b7', label: '3B.7 Init' },
      { id: 'section-c', label: 'C. Playground' },
      { id: 'section-d', label: 'D. Reconciled' },
      { id: 'section-e', label: 'E. Break Time' },
    ],
    '/day2/rnn': [
      { id: 'hop-1-problem', label: '1. Cliffhanger' },
      { id: 'hop-1-decay', label: '2. 28-Day Decay' },
    ],
    '/day2/lstm': [
      { id: 'hop-2-problem', label: '1. Overwriting' },
      { id: 'hop-2-gates', label: '2. Cell Highway' },
    ],
    '/day2/transformer': [
      { id: 'hop-3-problem', label: '1. Speed Limit' },
      { id: 'hop-3-parallel', label: '2. Matrix Payoff' },
      { id: 'hop-3-attention', label: '3. Hand Attention' },
    ],
    '/day2/embeddings': [
      { id: 'tokenization', label: '1. Subwords' },
      { id: 'embeddings', label: '2. 2D Vector Map' },
    ],
    '/day2/chatgpt-case-study': [
      { id: 'pipeline', label: '1. 3 Stages' },
      { id: 'current-problem', label: '2. Hop 4 Problem' },
    ],
    '/day2/hands-on': [
      { id: 'ollama', label: '1. Ollama' },
      { id: 'huggingface', label: '2. Quant & License' },
      { id: 'openrouter', label: '3. OpenRouter' },
      { id: 'synthesis', label: '4. Closing Synthesis' },
    ],
  };

  const currentBeats = pageBeats[pathname] || [];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full mb-8 bg-slate-950/85 backdrop-blur-2xl border-b border-slate-800/80 px-4 py-2.5 rounded-2xl shadow-xl flex items-center justify-between gap-3 select-none">
      
      {/* Left: Sidebar Toggle & Page Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          title={isSidebarCollapsed ? 'Expand Sidebar ([)' : 'Collapse to Presentation Mode ([)'}
          className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
        >
          {isSidebarCollapsed ? (
            <>
              <ChevronRight size={15} className="text-sky-400" />
              <span className="hidden sm:inline">Sidebar</span>
            </>
          ) : (
            <>
              <ChevronLeft size={15} className="text-sky-400" />
              <span className="hidden sm:inline">Theatre Mode</span>
            </>
          )}
        </button>

        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-slate-600">/</span>
          <span className="text-slate-300 font-semibold truncate max-w-[200px]">
            {pathname.includes('linear-regression')
              ? 'Linear Regression'
              : pathname.includes('neural-network')
              ? 'Neural Networks'
              : pathname.replace('/', '').replace('day1/', '') || 'Welcome'}
          </span>
        </div>
      </div>

      {/* Center: Lecture Beat Stepper Jump Pills */}
      {currentBeats.length > 0 && (
        <div className="flex items-center gap-1 overflow-x-auto py-1 px-2 no-scrollbar max-w-[55vw]">
          {currentBeats.map((b) => (
            <button
              key={b.id}
              onClick={() => handleScrollTo(b.id)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-slate-400 hover:text-white transition-all hover:border-slate-600"
            >
              {b.label}
            </button>
          ))}
        </div>
      )}

      {/* Right: Quick Controls (Shift+N Reminder & Fullscreen) */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen Presentation"
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all"
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

    </header>
  );
}
