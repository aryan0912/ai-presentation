'use client';
import React from 'react';
import Link from 'next/link';
import { Activity, ArrowRight, History, Layers, Cpu, ShieldAlert, Sparkles } from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import InstructorNote from '@/components/InstructorNote';
import RnnMemoryDecayViz from '@/components/RnnMemoryDecayViz';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';

export default function RnnPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-950/40 border border-sky-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 2 Topic 2 · Hop 1 (NN &rarr; RNN)</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          1. Recurrent Neural Networks: Giving the Model a Memory
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          How looping a hidden state vector forward allows neural networks to process time-series sequences — and why that memory begins to fade over long horizons.
        </p>

        <InstructorNote
          timing="~15 minutes total — Hop 1"
          aloudQuestion="Remember Saturday's permutation-invariance test? If we shuffled the 7 days of milk collection, our feedforward neural network output didn't change at all. Why is a timeless model dangerous for IT and language?"
          expectedWrongAnswers={[
            "Assuming feedforward networks track order automatically. Prove that unless time is explicitly looped into state, feedforward networks treat inputs as an unordered bag of numbers."
          ]}
          instructorTip="Reopen Neural Network Section E's break-it moment first! Do not start with a fresh problem. Emphasize that in language ('dog bites man' vs. 'man bites dog'), sequence order is everything."
        />
      </div>

      {/* Hop 1: Reopening the Cliffhanger */}
      <ConceptBeat
        kind="problem"
        number="1"
        title="Reopening the Cliffhanger: Feedforward Networks Have No Memory"
        subtitle="We left this broken on Saturday on purpose. Let's look at why order matters."
        time="5 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-rose-400 uppercase">Saturday's Break-It Finding:</span>
            <span className="text-slate-400">Order Insensitivity</span>
          </div>

          <p className="text-slate-300 font-sans text-xs md:text-sm leading-relaxed">
            In Saturday's closing test, shuffling the 7 days produced the identical prediction because feedforward networks have zero concept of temporal order. A model that cannot tell Monday from Sunday cannot be trusted with language, where order dictates meaning (&ldquo;server rebooted after patch&rdquo; vs &ldquo;patch applied after reboot&rdquo;).
          </p>
        </div>
      </ConceptBeat>

      {/* Hop 1 Reveal & Interactive Memory Decay */}
      <ConceptBeat
        kind="reveal"
        number="2"
        title="The RNN Loop & The Long-Range Decay Problem"
        subtitle="Carrying a hidden state vector forward step-by-step."
        time="10 min"
        phase="predict"
      >
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            An RNN processes one step at a time, carrying a running memory vector ($h_t$) to the next step. But because that vector is repeatedly multiplied and squashed at every step, early signals from weeks ago fade away:
          </p>

          <RnnMemoryDecayViz />
        </div>

        <DairyAngle title="The Long-Document Translation Problem">
          If the subject of a paragraph is introduced in the first sentence ("tanker"), an RNN's hidden state will have overwritten that subject with recent filler words by the time it reaches the last sentence. When translating the verb at the end, the memory of the original subject is almost completely lost.
        </DairyAngle>
      </ConceptBeat>

      {/* Next Hop Link */}
      <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <Link href="/day2/nlp-intro" className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5">
          &larr; Back to NLP & MT Intro
        </Link>
        <Link
          href="/day2/lstm"
          className="button-primary"
        >
          <span>Continue to Hop 2: LSTM &amp; Gates</span>
          <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}
