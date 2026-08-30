'use client';
import React from 'react';
import Link from 'next/link';
import { BrainCircuit, Sparkles, ArrowRight, Layers, Cpu, CheckCircle2, Clock } from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import InstructorNote from '@/components/InstructorNote';
import AttentionArithmeticPlayer from '@/components/AttentionArithmeticPlayer';
import TransformerArchitectureViz from '@/components/TransformerArchitectureViz';
import QkvSpotlightViz from '@/components/QkvSpotlightViz';
import PositionalEncodingViz from '@/components/PositionalEncodingViz';
import ScaledDotProductViz from '@/components/ScaledDotProductViz';
import MultiHeadViz from '@/components/MultiHeadViz';
import { InfraAngle } from '@/components/DomainAngles';

export default function TransformerPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-950/40 border border-sky-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 2 Core Topic · Hop 3 (LSTM &rarr; Transformer) &amp; Attention By Hand</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          3. Transformers: Looking at Everything at Once
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Why parallel matrix operations replaced the sequential crawl, and the exact hand-calculated arithmetic behind Self-Attention.
        </p>

        <InstructorNote
          timing="~90 minutes total (Doubled budget for deep paper alignment)"
          aloudQuestion="Remember Saturday's matrix multiplication Wx + b? Why is computing a matrix of 100 neurons in parallel fundamentally faster than running a 100-step loop?"
          expectedWrongAnswers={[
            "Thinking attention requires reading words in order. Emphasize that attention processes the entire sentence at once, which is why positional encoding is needed."
          ]}
          instructorTip="Walk through the 3-token arithmetic ('tanker is late') by hand! Do not skip the shuffle test ('late is tanker') — that break-it moment proves why Positional Encoding is required."
        />
      </div>

      {/* Hop 3 Opening: Reopening LSTM's Sequential Bottleneck */}
      <ConceptBeat
        kind="problem"
        number="1"
        title="Reopening the Cliffhanger: The Sequential Speed Limit"
        subtitle="Gates fixed forgetting, but step 50 cannot execute before step 49."
        time="8 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-rose-400 uppercase">The Architecture Bottleneck:</span>
            <span className="text-slate-400">Sequential Lock ($O(T)$ Dependency)</span>
          </div>

          <p className="text-slate-300 font-sans text-xs md:text-sm leading-relaxed">
            In LSTM, step 50 cannot begin until step 49 completes. Because memory passes step-by-step like a baton, modern GPU clusters containing thousands of parallel compute cores are forced to sit idle waiting for the loop. Hardware cannot solve a sequential architectural limitation.
          </p>
        </div>
      </ConceptBeat>

      {/* Beat 2: Positional Encoding */}
      <ConceptBeat
        kind="reveal"
        number="2"
        title="Positional Encoding: Injecting Time into Geometry"
        subtitle="Because attention reads everything at once, we must stamp each word with a timestamp."
        time="15 min"
        phase="predict"
      >
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            Unlike RNNs, the Transformer does not have a sequential loop. It reads the entire sentence in parallel. To prevent the model from treating sentences as a scrambled bag of words, we inject sine and cosine waves of varying frequencies into the word embeddings.
          </p>
          <PositionalEncodingViz />
        </div>
      </ConceptBeat>

      {/* Beat 3: Scaled Dot-Product Attention & QKV */}
      <ConceptBeat
        kind="reveal"
        number="3"
        title="Scaled Dot-Product Attention (Q, K, V)"
        subtitle="The database search metaphor that routes information between tokens."
        time="25 min"
        phase="predict"
      >
        <div className="space-y-6">
          <QkvSpotlightViz />
          <ScaledDotProductViz />
        </div>
      </ConceptBeat>

      {/* Beat 4: Multi-Head Attention */}
      <ConceptBeat
        kind="reveal"
        number="4"
        title="Multi-Head Attention"
        subtitle="Splitting the embedding dimension to look for multiple things at once."
        time="15 min"
        phase="predict"
      >
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            Instead of performing a single attention function, the model projects the queries, keys, and values $h$ times in parallel. This allows one head to focus on grammar, another on entity tracking, and another on sentiment.
          </p>
          <MultiHeadViz />
        </div>
      </ConceptBeat>

      {/* Beat 5: §5 & §6 Deep-Dive: Attention By Hand */}
      <ConceptBeat
        kind="reveal"
        number="5"
        title="Attention, By Hand (Exact 3-Token Arithmetic)"
        subtitle="Computing live dot products, softmax weights, and vector blending for 'tanker is late'."
        time="15 min"
        phase="predict"
      >
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            Here is the complete forward pass of Self-Attention computed by hand for the 3-token sentence <strong>&ldquo;tanker is late&rdquo;</strong>:
          </p>

          <AttentionArithmeticPlayer />
        </div>

        <InfraAngle title="Why Attention Scales as O(N²)">
          Because every token computes an attention score with every other token in the prompt, doubling context length from 4,000 to 8,000 tokens quadruples the dot-product matrix operations. This is why high-context LLMs demand massive GPU high-bandwidth memory (HBM3).
        </InfraAngle>
      </ConceptBeat>

      {/* Beat 6: The Full Transformer Block Blueprint */}
      <ConceptBeat
        kind="reveal"
        number="6"
        title="The Full Architecture"
        subtitle="Bringing it all together: From input embeddings to Softmax output."
        time="12 min"
        phase="predict"
      >
        <div className="space-y-6">
          <TransformerArchitectureViz />
        </div>
      </ConceptBeat>



      {/* Next Hop Link */}
      <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <Link href="/day2/lstm" className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5">
          &larr; Back to Hop 2: LSTM &amp; Gates
        </Link>
        <Link
          href="/day2/embeddings"
          className="button-primary"
        >
          <span>Continue to Embeddings &amp; Tokenization</span>
          <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}
