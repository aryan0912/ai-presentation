'use client';
import React from 'react';
import { Sparkles, HelpCircle, Eye, AlertTriangle, ArrowUpRight, Clock } from 'lucide-react';

export type BeatKind = 'problem' | 'guess' | 'reveal' | 'break' | 'apply';
export type PhaseKind = 'predict' | 'talks' | 'acts';

interface ConceptBeatProps {
  kind: BeatKind;
  number?: string | number;
  title: string;
  subtitle?: string;
  time?: string;
  phase?: PhaseKind;
  children?: React.ReactNode;
  className?: string;
}

const BEAT_CONFIG: Record<BeatKind, { label: string; icon: any; color: string; bg: string; border: string; glow: string }> = {
  problem: {
    label: 'Beat 1 · Relatable Problem',
    icon: Sparkles,
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.08)',
    border: 'rgba(56, 189, 248, 0.25)',
    glow: 'rgba(56, 189, 248, 0.15)',
  },
  guess: {
    label: 'Beat 2 · Let Them Guess',
    icon: HelpCircle,
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.08)',
    border: 'rgba(251, 191, 36, 0.25)',
    glow: 'rgba(251, 191, 36, 0.15)',
  },
  reveal: {
    label: 'Beat 3 · Reveal & Visualize',
    icon: Eye,
    color: '#c084fc',
    bg: 'rgba(192, 132, 252, 0.08)',
    border: 'rgba(192, 132, 252, 0.25)',
    glow: 'rgba(192, 132, 252, 0.15)',
  },
  break: {
    label: 'Beat 4 · Break It',
    icon: AlertTriangle,
    color: '#f43f5e',
    bg: 'rgba(244, 63, 94, 0.08)',
    border: 'rgba(244, 63, 94, 0.25)',
    glow: 'rgba(244, 63, 94, 0.15)',
  },
  apply: {
    label: 'Beat 5 · Apply To Your World',
    icon: ArrowUpRight,
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.08)',
    border: 'rgba(52, 211, 153, 0.25)',
    glow: 'rgba(52, 211, 153, 0.15)',
  },
};

const PHASE_CONFIG: Record<PhaseKind, { label: string; color: string; bg: string }> = {
  predict: { label: 'Phase 1: PREDICTS (Days 1-2)', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' },
  talks: { label: 'Phase 2: TALKS (Days 3-4)', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.12)' },
  acts: { label: 'Phase 3: ACTS (Days 5-6)', color: '#34d399', bg: 'rgba(52, 211, 153, 0.12)' },
};

export default function ConceptBeat({
  kind,
  number,
  title,
  subtitle,
  time,
  phase = 'predict',
  children,
  className = '',
}: ConceptBeatProps) {
  const beat = BEAT_CONFIG[kind];
  const phaseInfo = PHASE_CONFIG[phase];
  const Icon = beat.icon;

  return (
    <section className={`my-16 pt-10 pb-6 border-t border-slate-800/90 relative ${className}`}>
      {/* Top Accent Gradient Line */}
      <div 
        className="absolute top-0 left-0 h-[2px] w-28 rounded-full"
        style={{ background: `linear-gradient(90deg, ${beat.color}, transparent)` }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            style={{
              color: beat.color,
              backgroundColor: beat.bg,
              border: `1px solid ${beat.border}`,
              boxShadow: `0 2px 10px ${beat.glow}`,
            }}
          >
            <Icon size={14} className="animate-pulse" />
            {beat.label}
          </span>

          <span
            className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-semibold tracking-wide border border-white/5"
            style={{ color: phaseInfo.color, backgroundColor: phaseInfo.bg }}
          >
            {phaseInfo.label}
          </span>
        </div>

        {time && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono font-medium px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800">
            <Clock size={13} className="text-slate-400" />
            <span>{time}</span>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-3">
          {number && <span className="text-slate-500 font-mono text-xl">{number}.</span>}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
            {title}
          </span>
        </h2>
        {subtitle && <p className="text-slate-400 mt-2 text-sm md:text-base max-w-3xl leading-relaxed">{subtitle}</p>}
      </div>

      <div className="beat-content space-y-6">{children}</div>
    </section>
  );
}

