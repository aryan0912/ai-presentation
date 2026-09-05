'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Users, Layers, ExternalLink, Cpu, Database, GitFork, Shuffle, ShieldCheck } from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import InstructorNote from '@/components/InstructorNote';
import TemperatureSamplingViz from '@/components/TemperatureSamplingViz';
import HighDimSuperpositionViz from '@/components/HighDimSuperpositionViz';
import FluffyCreatureRoutingViz from '@/components/FluffyCreatureRoutingViz';
import AttentionVsMlpDivisionViz from '@/components/AttentionVsMlpDivisionViz';
import PositionalEncodingViz from '@/components/PositionalEncodingViz';
import QkvGenerationViz from '@/components/QkvGenerationViz';
import ScaledDotProductViz from '@/components/ScaledDotProductViz';
import MultiHeadViz from '@/components/MultiHeadViz';
import MaskedAttentionViz from '@/components/MaskedAttentionViz';
import TransformerArchitectureViz from '@/components/TransformerArchitectureViz';
import AttentionArithmeticPlayer from '@/components/AttentionArithmeticPlayer';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';

export default function TransformerPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 bg-sky-950/40 border border-sky-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 2 Core Topic · Hop 3 (The 3Blue1Brown 5-Act Deep Dive)</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          3. The Transformer: Looking at Everything at Once
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          How moving from a sequential loop to a parallel attention matrix revolutionized language AI, unlocked planetary-scale GPU compute, and gave birth to ChatGPT.
        </p>

        <InstructorNote
          timing="~120 minutes total (Intuition First, Math Second)"
          aloudQuestion="Remember LSTM's bottleneck? Step 50 cannot compute until step 49 finishes. Even with 10,000 GPUs, an LSTM reads one word at a time. What happens when we process all 2,000 words at the exact same time?"
          expectedWrongAnswers={[
            "Thinking attention stores all world facts. Emphasize the DeepMind discovery: Attention routes information; MLPs store factual memory."
          ]}
          instructorTip="Follow the 5-Act narrative arc strictly: Act 1 (Temperature) -> Act 2 (Superposition callback) -> Act 3 (Fluffy blue creature & Hand arithmetic) -> Act 4 (Multi-Head & MLPs) -> Act 5 (GPU parallelism & Pre-training)."
        />
      </div>

      {/* Act 1: The Goal & Next-Token Prediction */}
      <ConceptBeat
        kind="problem"
        number="1"
        title="Act 1: The Goal — Next-Token Prediction & The Temperature Knob"
        subtitle="Strip away the marketing hype: an LLM is a next-token predictor wrapped in a dialogue template."
        time="15 min"
        phase="predict"
      >
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="text-amber-400" size={18} />
              What Is an LLM, Actually?
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              ChatGPT, Claude, Llama—every large language model shipping today does exactly one thing: <strong>Given some input text, predict what comes next.</strong> That is the entire job.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              It doesn't just guess one word. It assigns a probability to every possible token in its vocabulary. To generate paragraphs, it samples from that probability distribution, appends the word to the input, and repeats 200 to 500 times.
            </p>
          </div>

          <TemperatureSamplingViz />
        </div>
      </ConceptBeat>

      {/* Act 2: Data Representation (The 60-Second Callback) */}
      <ConceptBeat
        kind="reveal"
        number="2"
        title="Act 2: Data Representation — The 60-Second Callback"
        subtitle="Tokens, vector space embeddings, and high-dimensional superposition."
        time="5 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/30 to-slate-900 border border-purple-500/40 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 font-mono font-bold text-xs uppercase">
            <Layers size={16} />
            <span>The Quick Callback:</span>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed">
            &ldquo;In our opening NLP session, we learned how raw text is sliced into subword tokens, mapped to dense geometric vectors, and packed via almost-orthogonal superposition into high-dimensional space (12,288D). That is our raw material. Now: how does the network allow these vectors to communicate?&rdquo;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono pt-1">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
              <span className="text-sky-400 font-bold block mb-0.5">&bull; Subword Tokens:</span>
              Chunks like &ldquo;tank&rdquo; + &ldquo;er&rdquo; mapped to vocabulary IDs.
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
              <span className="text-emerald-400 font-bold block mb-0.5">&bull; Superposition:</span>
              Exponential capacity for hundreds of thousands of concepts in high dimensions.
            </div>
          </div>
        </div>
      </ConceptBeat>

      {/* Act 3: The Mechanics of Attention (Q, K, V) */}
      <ConceptBeat
        kind="reveal"
        number="3"
        title="Act 3: The Mechanics of Attention (Q, K, V)"
        subtitle="The Fluffy Blue Creature: Grammatical routing, Scaled Dot-Products, and Hand Arithmetic."
        time="45 min"
        phase="predict"
      >
        <div className="space-y-8">
          {/* Part 3A: Grammatical Routing Metaphor */}
          <div>
            <h4 className="text-white font-bold text-base mb-2">3A. Grammatical Routing: The Fluffy Blue Creature</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Watch how words ask questions (Query), raise their hands (Key), and pass descriptive context (Value) to update isolated word representations into rich phrases:
            </p>
            <FluffyCreatureRoutingViz />
          </div>

          {/* Part 3B: Learned Linear Projections (W_Q, W_K, W_V) */}
          <div className="border-t border-slate-800/80 pt-8">
            <h4 className="text-white font-bold text-base mb-2">3B. Where Do Q, K, and V Come From? (Learned Projections)</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Real models don't compare raw coordinates. Each token is multiplied by three specialized matrix layers (<code className="text-rose-400 font-mono">W_Q</code>, <code className="text-amber-400 font-mono">W_K</code>, <code className="text-sky-400 font-mono">W_V</code>)—which are literally the exact same $Wx+b$ linear layers from Saturday!
            </p>
            <QkvGenerationViz />
          </div>

          {/* Part 3C: Scaled Dot-Product & Softmax */}
          <div className="border-t border-slate-800/80 pt-8">
            <h4 className="text-white font-bold text-base mb-2">3C. The Matchmaking Formula: Scaled Dot-Product Attention</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              To measure alignment, we compute the dot product ($Q \cdot K^T$), divide by $\sqrt{'{'}d_k{'}'}$ (to prevent huge scores from freezing softmax gradients), and normalize into clean percentages:
            </p>
            <ScaledDotProductViz />
          </div>

          {/* Part 3D: Hand-Computed Arithmetic */}
          <div className="border-t border-slate-800/80 pt-8">
            <h4 className="text-white font-bold text-base mb-2">3D. Hand-Computed Attention: Trace &ldquo;tanker is late&rdquo;</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Let's prove there is zero magic inside. Step through the exact numbers for a 3-token sentence by hand:
            </p>
            <AttentionArithmeticPlayer />
          </div>

          {/* Part 3E: The Order Problem & Positional Encoding */}
          <div className="border-t border-slate-800/80 pt-8">
            <h4 className="text-white font-bold text-base mb-2">3E. The Order Problem: Why Shuffling Words Breaks Attention</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              When we shuffle &ldquo;tanker is late&rdquo; into &ldquo;late is tanker&rdquo;, raw attention computes identical scores! Attention alone has zero concept of time or position. We must add <strong>Positional Encodings</strong> (sine &amp; cosine wave timestamps) into the vectors before attention runs:
            </p>
            <PositionalEncodingViz />
          </div>

          {/* Part 3F: Causal Masking */}
          <div className="border-t border-slate-800/80 pt-8">
            <h4 className="text-white font-bold text-base mb-2">3F. The Causal Mask: Preventing Peeking into the Future</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              During generation and training, words cannot peek at future tokens. We set all future attention scores to $-\infty$ before Softmax so future words have strictly <strong>0.0%</strong> influence:
            </p>
            <MaskedAttentionViz />
          </div>
        </div>
      </ConceptBeat>

      {/* Act 4: Scaling Up — Multi-Head & The MLPs */}
      <ConceptBeat
        kind="reveal"
        number="4"
        title="Act 4: Scaling Up — Multi-Head & The Critical Division of Labor"
        subtitle="96 heads in parallel + DeepMind finding: Attention routes, MLPs store world facts."
        time="30 min"
        phase="predict"
      >
        <div className="space-y-8">
          {/* Multi-Head Attention */}
          <div>
            <h4 className="text-white font-bold text-base mb-2">4A. Multi-Head Attention (Parallel Perspectives)</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              One head tracks adjectives; another tracks pronouns; a third tracks verb tense. Modern models run 96 attention heads in parallel on GPUs:
            </p>
            <MultiHeadViz />
          </div>

          {/* Attention vs. MLPs Division */}
          <div className="border-t border-slate-800/80 pt-8">
            <h4 className="text-white font-bold text-base mb-2">4B. The Critical Division of Labor: Attention vs. MLPs</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Where does world knowledge live? In 2023, DeepMind proved that 90% of factual associations live in the Feed-Forward MLP layers, not in attention!
            </p>
            <AttentionVsMlpDivisionViz />
          </div>

          {/* Figure 1 Blueprint */}
          <div className="border-t border-slate-800/80 pt-8">
            <h4 className="text-white font-bold text-base mb-2">4C. The Complete Architecture (Figure 1)</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Everything snaps together into the legendary 2017 <em>&ldquo;Attention Is All You Need&rdquo;</em> architecture:
            </p>
            <TransformerArchitectureViz />
          </div>
        </div>
      </ConceptBeat>

      {/* Act 5: Core Takeaways & GPU Parallelism */}
      <ConceptBeat
        kind="reveal"
        number="5"
        title="Act 5: Core Takeaways — Why Transformers Took Over the World"
        subtitle="GPU Parallelism, Unsupervised Pre-training, and Multimodality."
        time="25 min"
        phase="predict"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Takeaway 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                <Cpu size={20} />
              </div>
              <h4 className="text-base font-bold text-white">1. GPU Parallelism</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unlike RNNs, the entire 2,000-token sequence is calculated in one single matrix multiply. It was built for the exact parallel hardware Nvidia already had.
              </p>
            </div>

            {/* Takeaway 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Sparkles size={20} />
              </div>
              <h4 className="text-base font-bold text-white">2. Unsupervised Pre-Training</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                The training label is simply the next word. Trillions of internet words provide free, unlimited training data without needing human manual labelers!
              </p>
            </div>

            {/* Takeaway 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <Layers size={20} />
              </div>
              <h4 className="text-base font-bold text-white">3. Universal Multimodality</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Break images into 16&times;16 pixel patches or audio into spectrogram slices—they all become vectors in the same coordinate space. Attention is input-agnostic.
              </p>
            </div>
          </div>

          {/* Interactive Live Sandbox Tool */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-white font-bold text-base flex items-center justify-center md:justify-start gap-2">
                <span>Interactive Live Sandbox: Transformer Explainer</span>
                <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full">Interactive Web Tool</span>
              </div>
              <p className="text-slate-300 text-xs md:text-sm max-w-xl">
                Inspect a real GPT-2 transformer running live in your browser with temperature sliders, top-k/top-p sampling, and attention heatmaps.
              </p>
            </div>
            <a
              href="https://poloclub.github.io/transformer-explainer/"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs md:text-sm flex items-center gap-2 transition-all shadow-lg shadow-purple-600/30 shrink-0"
            >
              <span>Launch Transformer Explainer</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </ConceptBeat>

      {/* Next Hop Link */}
      <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <Link href="/day2/lstm" className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5">
          &larr; Back to Hop 2: LSTM
        </Link>
        <Link
          href="/day2/chatgpt-case-study"
          className="button-primary"
        >
          <span>Continue to Case Study: How ChatGPT is Built</span>
          <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}
