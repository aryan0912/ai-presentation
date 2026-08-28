'use client';
import React from 'react';
import Link from 'next/link';
import { Layers, Compass, ArrowRight, Sparkles, Hash, HardDrive } from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import InstructorNote from '@/components/InstructorNote';
import TokenizationInspector from '@/components/TokenizationInspector';
import EmbeddingSpace2DViz from '@/components/EmbeddingSpace2DViz';
import TextToVectorPipelineViz from '@/components/TextToVectorPipelineViz';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';

export default function EmbeddingsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 2 Core Topic · §7 Tokenization, Context Windows &amp; Vector Embeddings</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          4. Tokenization &amp; Vector Embeddings
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          How computers convert raw unstructured text into token IDs and geometric vector points where distance represents semantic meaning.
        </p>

        <InstructorNote
          timing="~25 minutes total"
          aloudQuestion="How does an AI model read text? Does it read whole words, letters, or numbers? Let's inspect subword token slicing."
          expectedWrongAnswers={[
            "Thinking models understand words directly. Explain that models only process numerical token IDs, converted into coordinate vectors via an embedding lookup table."
          ]}
          instructorTip="Demonstrate how technical terms like 'Kubernetes' or 'chilling-center' split into subword pieces. Then use the 2D cluster map to prove that semantic similarity is literally geometric closeness."
        />
      </div>

      {/* The Fundamental NLP Transformation: Words -> Numbers -> Vectors */}
      <ConceptBeat
        kind="problem"
        number="1"
        title="The NLP Foundation: Words Must Become Coordinates"
        subtitle="Computers cannot perform matrix calculus on English letters. The 4-step transformation."
        time="8 min"
        phase="predict"
      >
        <TextToVectorPipelineViz />
      </ConceptBeat>

      {/* Tokenization Beat */}
      <ConceptBeat
        kind="reveal"
        number="2"
        title="Subword Tokenization (Byte-Pair Encoding)"
        subtitle="Text sliced into frequent subword chunks with discrete integer token IDs."
        time="10 min"
        phase="predict"
      >
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            Before attention runs, raw text strings are converted into a sequence of integer <strong>Token IDs</strong> using Byte-Pair Encoding (BPE):
          </p>

          <TokenizationInspector />
        </div>
      </ConceptBeat>

      {/* Vector Embeddings Beat */}
      <ConceptBeat
        kind="reveal"
        number="2"
        title="Vector Embeddings: Meaning as Geometric Coordinates"
        subtitle="Words with similar meaning point in similar directions in multi-dimensional space."
        time="15 min"
        phase="predict"
      >
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            Every token ID is mapped to a dense numerical vector via a lookup table. When vectors point in similar directions (high cosine similarity), the model understands they share semantic context:
          </p>

          <EmbeddingSpace2DViz />
        </div>

        <InfraAngle title="Vector Databases in Enterprise IT">
          On Day 4, we will store these exact vector embeddings inside specialized Vector Databases (like pgvector / Qdrant) to search through thousands of NDDB chilling center SOP manuals in milliseconds.
        </InfraAngle>
      </ConceptBeat>

      {/* Next Hop Link */}
      <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <Link href="/day2/transformer" className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5">
          &larr; Back to Transformers &amp; Attention
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
