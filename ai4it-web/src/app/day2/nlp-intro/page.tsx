'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, ListTree, Binary, Link2, BookOpen, Sparkles, HelpCircle } from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import InstructorNote from '@/components/InstructorNote';
import TokenizationInspector from '@/components/TokenizationInspector';
import EmbeddingSpace2DViz from '@/components/EmbeddingSpace2DViz';
import HighDimSuperpositionViz from '@/components/HighDimSuperpositionViz';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';

export default function NlpIntroPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 2 · Opening Deep Dive (~25 min)</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          NLP Introduction: Tokens &amp; Word Embeddings
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          How we drag human language, kicking and screaming, into a mathematical coordinate form that neural networks can actually multiply.
        </p>

        <InstructorNote
          timing="~25 minutes total (Opens Day 2)"
          aloudQuestion="Computers are great at math and terrible at language. Give a computer 2+2, it answers instantly. Give it 'I saw her duck', and it has a small existential crisis—duck the bird, or duck the verb? How do we turn text into numbers?"
          expectedWrongAnswers={[
            "Thinking models read whole words or letters. Demonstrate subword chunking and explain why counting Rs in 'strawberry' fails because the model only sees token chunks."
          ]}
          instructorTip="Everything downstream (RNN, LSTM, Transformer) assumes the room has this vocabulary. Do not compress this section! Land the strawberry ransom-note joke and the 3D vs 12,288D superposition mind-bender."
        />
      </div>

      {/* Beat 1: The Cold Open — Text is Not Math */}
      <ConceptBeat
        kind="problem"
        number="1"
        title="Why Language Needs Math: Turning Text into Coordinates"
        subtitle="A neural network only multiplies matrices and adds vectors. It cannot multiply the word 'milk'."
        time="5 min"
        phase="predict"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1 */}
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-lg font-bold text-white">Text is Not Math</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Computers cannot calculate derivatives on ASCII strings. To pass through $Wx+b$, every word must become a numerical vector.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-500">
              "milk" &rarr; ???
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-lg font-bold text-white">Subword Tokens</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Text is chopped into frequent subword chunks. Each chunk receives a distinct integer ID in the model's vocabulary table.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400">
              "milk" &rarr; ID: 412
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-3xl bg-purple-950/20 border border-purple-500/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-lg font-bold text-white">Dense Embeddings</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Token IDs have no math meaning (ID 412 isn't twice ID 206). Each ID is mapped to a geometric vector point in multi-dimensional space.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-purple-800/40 font-mono text-xs text-purple-300">
              412 &rarr; [0.24, -0.89, 0.44, ...]
            </div>
          </div>
        </div>
      </ConceptBeat>

      {/* Beat 2: Subword Tokenization & The Strawberry Joke */}
      <ConceptBeat
        kind="reveal"
        number="2"
        title="Subword Tokenization (Byte-Pair Encoding)"
        subtitle="Notice the model isn't reading whole words. It reads chunks, and it decides the boundaries."
        time="8 min"
        phase="predict"
      >
        <div className="space-y-6">
          <TokenizationInspector />

          {/* Viral Strawberry Payoff Callout */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-xs font-sans text-amber-200 leading-relaxed flex items-start gap-3.5">
            <Sparkles size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-mono block mb-1">The Viral "Strawberry" Payoff:</strong>
              &ldquo;Ask any modern chatbot to count the Rs in &lsquo;strawberry&rsquo;. It often fails! It&rsquo;s not stupid—it literally never sees individual letters, only pre-chopped subword token chunks. Imagine being asked to count letters in a word using only a ransom note made of magazine cutouts—you&rsquo;d struggle too!&rdquo;
            </div>
          </div>

          {/* Character vs Token Quiz */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="text-white font-bold text-xs flex items-center gap-2">
              <HelpCircle size={16} className="text-sky-400" />
              <span>Room Question: Why not just break text into 26 individual character letters?</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              <strong>Answer:</strong> It bloats the sequence length enormously (Attention&rsquo;s computational cost grows with the <em>square</em> of sequence length, so 5&times; more tokens is ~25&times; more compute), and it forces early layers to waste capacity just learning spelling rather than meaning. Subwords strike the optimal engineering balance!
            </p>
          </div>
        </div>
      </ConceptBeat>

      {/* Beat 3: Embeddings — Meaning as Geometry */}
      <ConceptBeat
        kind="reveal"
        number="3"
        title="Vector Embeddings: Meaning as Geometry"
        subtitle="Word2Vec (2013, Google): Vector arithmetic on meaning actually works."
        time="7 min"
        phase="predict"
      >
        <div className="space-y-6">
          <EmbeddingSpace2DViz />

          {/* Word2Vec Famous Vector Arithmetic */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 block text-[11px]">The Famous 2013 Word2Vec Party Trick (Mikolov et al.):</span>
              <div className="text-amber-300 font-bold text-sm">
                Vector(&ldquo;King&rdquo;) &minus; Vector(&ldquo;Man&rdquo;) + Vector(&ldquo;Woman&rdquo;) &approx; Vector(&ldquo;Queen&rdquo;)
              </div>
              <p className="text-slate-400 font-sans text-xs">
                Not a metaphor—literally subtract the numbers in the row, add the woman row, and you land near &ldquo;queen&rdquo;.
              </p>
            </div>
          </div>
        </div>
      </ConceptBeat>

      {/* Beat 4: High-Dimensional Superposition Mind-Bender */}
      <ConceptBeat
        kind="reveal"
        number="4"
        title="The Mind-Bender: High-Dimensional Superposition"
        subtitle="How many perpendicular directions can exist? 3 in 3D, but millions in 12,288D!"
        time="5 min"
        phase="predict"
      >
        <HighDimSuperpositionViz />
      </ConceptBeat>

      {/* Bridge to Hop 1: RNN */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-sky-950/40 via-purple-950/40 to-slate-900 border border-sky-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-sky-400 font-bold">The Bridge to Hop 1</span>
          <h3 className="text-2xl font-bold text-white mt-1">From Vectors to Sequences</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            &ldquo;You now know how text becomes numbers and vectors in space. Next question: once you have a sequence of these numbered chunks, how does a model read them in order?&rdquo;
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link href="/day2/rnn" className="button-primary">
            Next: Hop 1 — RNN &amp; Memory <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
