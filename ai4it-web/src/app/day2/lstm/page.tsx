'use client';
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Layers, Clock, Cpu, Zap, AlertOctagon, History } from 'lucide-react';
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
          <span>Day 2 · Hop 2 (~30 min)</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          2. Long Short-Term Memory: Gates to Protect Memory
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          How learned sigmoid gates protect the cell state conveyor belt from being overwritten—and why the sequential loop remains an unbreakable ceiling.
        </p>

        <InstructorNote
          timing="~30 minutes total (Hop 2)"
          aloudQuestion="The Context Vector bottleneck in the RNN lost the word 'tanker'. We need a way for the network to choose what to remember and what to forget—not blindly squash everything at every step."
          expectedWrongAnswers={[
            "Thinking LSTMs are fully parallel. Point out that step 15 still cannot compute until step 14 finishes—even with 10,000 GPUs."
          ]}
          instructorTip="Move deliberately through the gates. Land the bureaucrat joke and the carpool lane analogy. Then close on the unbreakable sequential ceiling to directly set up Transformers!"
        />
      </div>

      {/* Beat 1: Reopening the RNN Problem */}
      <ConceptBeat
        kind="problem"
        number="1"
        title="The Cliffhanger: RNNs Blindly Overwrite Everything"
        subtitle="The Context Vector bottleneck lost the word 'tanker'. We need selective memory."
        time="5 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-rose-400 uppercase">The Bottleneck Flaw:</span>
            <span className="text-slate-400">Repeated Squashing &amp; Dilution</span>
          </div>

          <p className="text-slate-300 font-sans text-xs md:text-sm leading-relaxed">
            In our RNN demo, every single token forced a matrix multiplication that rewrote the hidden state vector. By step 15, the memory of &ldquo;tanker&rdquo; was squashed into noise. We need an architecture that lets the network <strong>choose what to remember and what to shred</strong>.
          </p>

          {/* The Bureaucrat Joke */}
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/40 font-sans text-purple-200 text-xs md:text-sm leading-relaxed">
            <strong className="text-white font-mono block mb-1">The Bureaucrat Joke:</strong>
            &ldquo;An LSTM gate is a bureaucrat with exactly one job: read this memo, decide keep or shred. Except this bureaucrat never takes lunch and has been doing the job since 1997!&rdquo;
          </div>
        </div>
      </ConceptBeat>

      {/* Beat 2: The Cell State Highway & Learned Gates */}
      <ConceptBeat
        kind="reveal"
        number="2"
        title="The Cell State Highway &amp; Learned Sigmoid Gates"
        subtitle="The deep learning carpool lane: nothing gets squashed, gates control on/off ramps."
        time="15 min"
        phase="predict"
      >
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed">
            <strong className="text-white font-mono">The Carpool Lane Metaphor: </strong>
            The Cell State ($C_t$) is deep learning's uninterrupted carpool lane. Nothing gets squashed in that lane; sigmoid gates ($0$ to $1$) simply decide who is allowed on and off at each exit!
          </div>

          <LstmGateFlowViz />

          <InfraAngle title="IT Monitoring Alert Fatigue vs. LSTM Forget Gates">
            You already write alert-suppression rules deciding what's worth remembering and what's noise. Just as a sysadmin configures Prometheus/Datadog to ignore transient 2-second CPU blips while alerting on sustained database lockouts, an LSTM learns which signals to persist automatically from historical data.
          </InfraAngle>
        </div>
      </ConceptBeat>

      {/* Beat 3: The Unbreakable Sequential Ceiling */}
      <ConceptBeat
        kind="break"
        number="3"
        title="The New Problem: The Unbreakable Sequential Ceiling"
        subtitle="LSTM fixes forgetting. It does NOT fix the sequential bottleneck."
        time="10 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 via-slate-900/80 to-slate-950/90 border border-rose-500/40 space-y-4 text-xs font-sans">
          <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-xs uppercase">
            <AlertOctagon size={16} />
            <span>The Hard Architectural Limit:</span>
          </div>

          <p className="text-slate-200 text-sm leading-relaxed">
            &ldquo;LSTM solved vanishing gradients. It reigned as the undisputed king of NLP for 20 years (1997 to 2017). When Google Translate shocked the world by getting drastically better overnight in 2016, it was powered by a massive LSTM stack. Every smartphone autocomplete keyboard ran on LSTMs.&rdquo;
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300 space-y-2">
            <div className="font-bold text-white uppercase text-[11px]">The Sequential Trap:</div>
            <div>
              Step 15 <strong>cannot</strong> compute before step 14 finishes. You cannot parallelize a sequential loop. Even if Nvidia gives you 10,000 H100 GPUs, an LSTM insists on reading one word at a time.
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed">
            To scale to billions of parameters and internet-scale datasets, we need to completely stop reading sequentially. We need an architecture that looks at <strong>everything all at once</strong>.
          </p>
        </div>
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
          <span>Continue to Hop 3: The Transformer (3B1B)</span>
          <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}
