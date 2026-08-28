'use client';
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Layers, Clock, Cpu, Zap } from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import InstructorNote from '@/components/InstructorNote';
import LstmGateFlowViz from '@/components/LstmGateFlowViz';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';

export default function LstmPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 2 Topic 2 · Hop 2 (RNN &rarr; LSTM)</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          2. Long Short-Term Memory: Deciding What to Forget
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          How learned gates protect the cell state memory highway from being overwritten — and why sequential execution remains a fundamental architectural bottleneck.
        </p>

        <InstructorNote
          timing="~15 minutes total — Hop 2"
          aloudQuestion="How do your IT monitoring alert rules decide what to notify you about vs. what to silence? In an LSTM, gates perform that exact same filtering, learned automatically from data."
          expectedWrongAnswers={[
            "Thinking LSTMs are fully parallel. Point out that step 50 still cannot execute until step 49 has finished."
          ]}
          instructorTip="Open directly by restating RNN's memory decay problem! Then show how the Cell State highway acts like a protected conveyor belt. End on the sequential bottleneck to set up Transformers."
        />
      </div>

      {/* Hop 2 Opening: Reopening RNN's Memory Decay Problem */}
      <ConceptBeat
        kind="problem"
        number="1"
        title="Reopening the Cliffhanger: RNNs Overwrite Their Own Memory"
        subtitle="RNN gave the model a memory, but by week 3, week 1 is gone."
        time="5 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-rose-400 uppercase">The RNN Limitation:</span>
            <span className="text-slate-400">Continuous Memory Overwriting</span>
          </div>

          <p className="text-slate-300 font-sans text-xs md:text-sm leading-relaxed">
            In our previous section, we saw that standard RNNs overwrite their hidden state vector at every step. Because every step applies a new matrix transformation, critical long-range signals (like a major festival 3 weeks ago or the opening subject of a paragraph) are completely diluted into noise.
          </p>
        </div>
      </ConceptBeat>

      {/* Hop 2 Reveal: LSTM Gated Architecture */}
      <ConceptBeat
        kind="reveal"
        number="2"
        title="The Cell State Highway & Learned Gates"
        subtitle="Alert-suppression rules learned directly from data."
        time="10 min"
        phase="predict"
      >
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            LSTM introduces an uninterrupted <strong>Cell State Conveyor Belt ($C_t$)</strong> running down the top of the network, protected by three sigmoid gates:
          </p>

          <LstmGateFlowViz />
        </div>

        <InfraAngle title="Alert Fatigue vs. LSTM Forget Gates">
          Just as a sysadmin configures alert-suppression rules to ignore transient CPU spikes while persisting critical hardware alarms, an LSTM&rsquo;s Forget and Input gates learn when to ignore routine daily noise and when to write a high-priority incident into long-term memory.
        </InfraAngle>
      </ConceptBeat>

      {/* Next Hop Link */}
      <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <Link href="/day2/rnn" className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5">
          &larr; Back to Hop 1: RNN Memory
        </Link>
        <Link
          href="/day2/transformer"
          className="button-primary"
        >
          <span>Continue to Hop 3: Transformers &amp; Attention</span>
          <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}
