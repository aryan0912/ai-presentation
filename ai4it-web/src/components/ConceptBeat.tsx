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

const BEAT_CONFIG: Record<BeatKind, { label: string; icon: any; color: string; bg: string; border: string }> = {
  problem: {
    label: 'Beat 1 · Relatable Problem',
    icon: Sparkles,
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.1)',
    border: 'rgba(96, 165, 250, 0.3)',
  },
  guess: {
    label: 'Beat 2 · Let Them Guess',
    icon: HelpCircle,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.3)',
  },
  reveal: {
    label: 'Beat 3 · Reveal & Visualize',
    icon: Eye,
    color: '#a78bfa',
    bg: 'rgba(167, 139, 250, 0.1)',
    border: 'rgba(167, 139, 250, 0.3)',
  },
  break: {
    label: 'Beat 4 · Break It',
    icon: AlertTriangle,
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.3)',
  },
  apply: {
    label: 'Beat 5 · Apply To Your World',
    icon: ArrowUpRight,
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.1)',
    border: 'rgba(52, 211, 153, 0.3)',
  },
};

const PHASE_CONFIG: Record<PhaseKind, { label: string; color: string; bg: string }> = {
  predict: { label: 'Phase 1: PREDICTS (Days 1-2)', color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.15)' },
  talks: { label: 'Phase 2: TALKS (Days 3-4)', color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.15)' },
  acts: { label: 'Phase 3: ACTS (Days 5-6)', color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)' },
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
    <section className={`my-12 pt-8 pb-4 border-t border-slate-800/80 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              color: beat.color,
              backgroundColor: beat.bg,
              border: `1px solid ${beat.border}`,
            }}
          >
            <Icon size={14} />
            {beat.label}
          </span>

          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold"
            style={{ color: phaseInfo.color, backgroundColor: phaseInfo.bg }}
          >
            {phaseInfo.label}
          </span>
        </div>

        {time && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Clock size={13} className="text-slate-500" />
            <span>{time}</span>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-baseline gap-3">
          {number && <span className="text-slate-500 font-mono text-xl">{number}.</span>}
          <span>{title}</span>
        </h2>
        {subtitle && <p className="text-slate-400 mt-1.5 text-base max-w-3xl">{subtitle}</p>}
      </div>

      <div className="beat-content">{children}</div>
    </section>
  );
}
