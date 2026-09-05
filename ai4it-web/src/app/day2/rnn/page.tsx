'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, AlertTriangle, Zap, History, Network } from 'lucide-react';
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
          <span>Day 2 · Hop 1 (~25 min)</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          1. Recurrent Neural Networks: Giving the Model a Memory
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          How looping a hidden state vector forward allows neural networks to handle sequential data—and why that memory degrades over long horizons.
        </p>

        <InstructorNote
          timing="~25 minutes total"
          aloudQuestion="Remember Saturday's milk collection test? When we shuffled the 7 days, the feedforward network's prediction didn't change at all. Why can't a timeless model be trusted with sequential data?"
          expectedWrongAnswers={[
            "Assuming neural networks remember order by default. Prove that without recurrent connections, networks treat inputs as an unordered bag of numbers."
          ]}
          instructorTip="Do not re-teach tokenization or embeddings here (that was covered in the introductory NLP overview). Focus 100% on the recurrent hidden state loop, the Telephone Game joke, and the Context Vector bottleneck!"
        />
      </div>

      {/* Beat 1: Reopening the Cliffhanger */}
      <ConceptBeat
        kind="problem"
        number="1"
        title="The Cliffhanger: Feedforward Networks Have No Memory"
        subtitle="Yesterday's network was order-blind. Why sequence order changes everything."
        time="7 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-rose-400 uppercase">The Architecture Flaw:</span>
            <span className="text-slate-400">Order Insensitivity (Permutation Invariance)</span>
          </div>

          <p className="text-slate-300 font-sans text-xs md:text-sm leading-relaxed">
            In Saturday's closing test, shuffling the sequence produced the identical prediction because feedforward networks have zero concept of temporal order. A model that cannot tell Monday from Sunday cannot be trusted with sequence tasks—in language, &ldquo;dog bites man&rdquo; and &ldquo;man bites dog&rdquo; use identical words, but mean opposite things! Order is everything.
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sky-300 font-sans text-xs">
            <strong>The Question:</strong> Now that we know text becomes tokens and vector points, how does a model read an entire sequence of them in order?
          </div>
        </div>
      </ConceptBeat>

      {/* Beat 2: The Encoder-Decoder Blueprint & The Telephone Game Joke */}
      <ConceptBeat
        kind="reveal"
        number="2"
        title="The Encoder-Decoder Blueprint: The World's Worst Game of Telephone"
        subtitle="One network reads into a Context Vector; another unfolds it into translation."
        time="8 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono">
            <span className="font-bold text-emerald-400 uppercase">Seq2Seq Translation Blueprint:</span>
            <span className="text-slate-400">English Tokens &rarr; Context Vector ($h_N$) &rarr; Hindi Tokens</span>
          </div>

          <p className="text-slate-300 font-sans text-xs md:text-sm leading-relaxed">
            Say we want to translate an English sentence to Hindi. You can't just translate word by word—word order and grammar don't line up between languages. We need two distinct &ldquo;brains&rdquo;: an <strong>Encoder</strong> that reads, and a <strong>Decoder</strong> that writes.
          </p>

          {/* The Telephone Game Joke */}
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/40 font-sans text-purple-200 text-xs md:text-sm leading-relaxed">
            <strong className="text-white font-mono block mb-1">The Telephone Game Joke:</strong>
            &ldquo;It&rsquo;s the world&rsquo;s worst game of telephone. Read a 25-word sentence, cram every detail into one single vector, hand it to a stranger, and ask them to reconstruct a fluent translation using only that compressed summary! You&rsquo;ve played the game where a message whispered down a line of ten people comes out as pure gibberish. That&rsquo;s exactly what a plain RNN&rsquo;s memory does to a sentence.&rdquo;
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-sky-400 font-bold uppercase">1. The Encoder (Reader)</span>
              <p className="text-xs text-slate-300">
                Reads the sequence one token at a time, continuously rewriting its hidden state vector until it emits a single, final <strong>Context Vector</strong> ($h_N$).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">2. The Decoder (Writer)</span>
              <p className="text-xs text-slate-300">
                Takes that single Context Vector and attempts to unpack it word-by-word into the target language.
              </p>
            </div>
          </div>
        </div>
      </ConceptBeat>

      {/* Beat 3: The Failure in Action (Memory Decay) */}
      <ConceptBeat
        kind="reveal"
        number="3"
        title="The Reveal: Watch 'Tanker' Vanish Into 'Car'"
        subtitle="Let the failure play out loud: the exact word that mattered most didn't survive."
        time="10 min"
        phase="predict"
      >
        <div className="space-y-6">
          <RnnMemoryDecayViz />

          {/* History Worth Telling */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs font-sans">
            <div className="flex items-center gap-2 text-sky-400 font-mono font-bold text-xs uppercase">
              <History size={16} />
              <span>History Worth Telling: Jeffrey Elman &amp; Sepp Hochreiter</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Modern RNNs trace to Jeffrey Elman's 1990 paper <em>&ldquo;Finding Structure in Time&rdquo;</em>—language modeling was the original motivating use case for the entire architecture.
            </p>
            <p className="text-slate-300 leading-relaxed">
              <strong>The Best Fact on This Topic:</strong> The &ldquo;vanishing gradient problem&rdquo;—the mathematical reason RNNs forget—was formally diagnosed by <strong>Sepp Hochreiter in his 1991 diploma thesis</strong> (written in German and largely ignored at first!). Six years later, in 1997, that same Hochreiter co-invented LSTM specifically to fix the problem he had diagnosed. The person who explained why RNNs break is the same person who fixed them!
            </p>
          </div>
        </div>
      </ConceptBeat>

      {/* Next Hop Link */}
      <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <Link href="/day2/nlp-intro" className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5">
          &larr; Back to NLP Intro
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
