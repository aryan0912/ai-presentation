'use client';
import React from 'react';
import Link from 'next/link';
import { BrainCircuit, Sparkles, ArrowRight, Layers, AlertCircle, Database, HelpCircle } from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import InstructorNote from '@/components/InstructorNote';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';

export default function ChatGptCaseStudyPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 2 Core Topic · §8 Architecture Case Study</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          5. Case Study: How Is ChatGPT Actually Built?
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Transformer architecture + next-token prediction at planetary scale — and naming the Transformer&rsquo;s &ldquo;current problem&rdquo; that bridges to Day 4 RAG.
        </p>

        <InstructorNote
          timing="~20 minutes total"
          aloudQuestion="How does a model trained on general internet text become a helpful assistant? And what happens when you ask it about internal NDDB chilling center SOPs?"
          expectedWrongAnswers={[
            "Believing LLMs have live database access or reasoning minds. Clarify that base LLMs are probability engines trained to predict the next token, frozen at training time."
          ]}
          instructorTip="Emphasize that LLMs are trained by the exact same downhill gradient descent from Saturday! Then end on Hop 4: naming that the model does NOT know internal NDDB SOPs, which directly bridges to Day 4 RAG."
        />
      </div>

      {/* The 3-Stage Pipeline */}
      <ConceptBeat
        kind="reveal"
        number="1"
        title="The 3-Stage LLM Construction Pipeline"
        subtitle="Pre-training, Supervised Instruction Tuning (SFT), and RLHF."
        time="10 min"
        phase="predict"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-sky-400 font-mono font-bold uppercase text-[11px]">Stage 1: Pre-Training</span>
            <h4 className="text-sm font-bold text-white">Next-Token Prediction at Scale</h4>
            <p className="text-slate-300 leading-relaxed">
              Trained on trillions of tokens from public internet text. The model adjusts hundreds of billions of parameters using the exact same <strong>downhill gradient descent</strong> learned in Linear Regression.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-purple-400 font-mono font-bold uppercase text-[11px]">Stage 2: SFT</span>
            <h4 className="text-sm font-bold text-white">Instruction Fine-Tuning</h4>
            <p className="text-slate-300 leading-relaxed">
              Curated pairs of high-quality instructions and ideal answers teach the model to behave as a helpful question-answering assistant rather than simply continuing raw internet text.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-mono font-bold uppercase text-[11px]">Stage 3: RLHF</span>
            <h4 className="text-sm font-bold text-white">Human Alignment</h4>
            <p className="text-slate-300 leading-relaxed">
              Reinforcement Learning from Human Feedback steers the model away from harmful or unhelpful responses, optimizing for safety, helpfulness, and conciseness.
            </p>
          </div>
        </div>
      </ConceptBeat>

      {/* Hop 4 Bridge: Naming the Transformer's Current Problem */}
      <ConceptBeat
        kind="break"
        number="2"
        title="Hop 4: Naming the Transformer's 'Current Problem'"
        subtitle="The model knows the world, but it knows nothing about your internal data."
        time="10 min"
        phase="predict"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 via-slate-900/80 to-slate-950/90 border border-rose-500/40 space-y-4 font-sans text-xs md:text-sm text-slate-200 leading-relaxed shadow-2xl">
          <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-xs uppercase">
            <AlertCircle size={16} />
            The Unresolved Limitation of Standalone Foundation Models:
          </div>

          <p>
            &ldquo;Everything you&rsquo;ve learned today explains how a model like ChatGPT or Llama thinks. <strong>It does not explain how it would know anything about NDDB&rsquo;s own chilling-center SOPs or private incident tickets — because it doesn&rsquo;t.</strong> It was frozen at training time, and it will be confidently wrong about anything private to your organization.&rdquo;
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300">
            <strong>The Direct Bridge to Day 4:</strong>
            &ldquo;That is not a flaw we leave unfixed — that is exactly the problem <strong>Retrieval-Augmented Generation (RAG)</strong> solves on Day 4: dynamically retrieving your private SOP documents and feeding them into the context window before the model answers!&rdquo;
          </div>
        </div>
      </ConceptBeat>

      {/* Next Hop Link */}
      <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <Link href="/day2/embeddings" className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5">
          &larr; Back to Embeddings &amp; Tokenization
        </Link>
        <Link
          href="/day2/hands-on"
          className="button-primary"
        >
          <span>Continue to Afternoon Hands-On Suite</span>
          <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}
