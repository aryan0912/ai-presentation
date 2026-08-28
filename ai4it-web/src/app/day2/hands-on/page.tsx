'use client';
import React from 'react';
import Link from 'next/link';
import { Terminal, Cpu, FileText, Network, CheckCircle2, ArrowRight, Trophy, Sparkles } from 'lucide-react';
import ConceptBeat from '@/components/ConceptBeat';
import InstructorNote from '@/components/InstructorNote';
import OllamaTerminalSimulator from '@/components/OllamaTerminalSimulator';
import QuantizationLicenseComparator from '@/components/QuantizationLicenseComparator';
import OpenRouterApiTester from '@/components/OpenRouterApiTester';
import { DairyAngle, InfraAngle } from '@/components/DomainAngles';

export default function HandsOnPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 2 Afternoon Suite · §9–§12 Hands-On &amp; Weekend 1 Closing Synthesis</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          6. Hands-On: Running, Comparing &amp; Deploying LLMs
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Running real local language models on your machine with Ollama, evaluating Hugging Face quantization &amp; commercial licenses, calling multi-provider APIs via OpenRouter, and measuring our Weekend 1 distance traveled.
        </p>

        <InstructorNote
          timing="~90 minutes total (Afternoon Hands-On + Closing Synthesis)"
          aloudQuestion="How do we actually run an open-weights model on our local IT hardware? And how do we judge if a model on Hugging Face is commercially legal to deploy?"
          expectedWrongAnswers={[
            "Believing you need hundreds of cloud GPUs to test models. Show that small quantized models (Llama 3.2 1B / 3B) run fast on a single standard laptop CPU/GPU."
          ]}
          instructorTip="Protect the hands-on time! Ensure every student pulls and prompts a model on their own machine. In §12, do NOT cut the Closing Synthesis — walk backward through Saturday-Sunday progress out loud to convert capability into felt competence."
        />
      </div>

      {/* §9 Hands-On: Ollama */}
      <ConceptBeat
        kind="apply"
        number="1"
        title="§9 Hands-On: Run a Model Yourself with Ollama"
        subtitle="Real local inference executing on your own laptop hardware."
        time="30 min"
        phase="predict"
      >
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            Follow along with the projector scaffolding below to run <code>ollama</code> on your local machine, feeding it chilling-center log diagnostic challenges:
          </p>

          <OllamaTerminalSimulator />
        </div>
      </ConceptBeat>

      {/* §10 Hands-On: Hugging Face Quantization & Licensing */}
      <ConceptBeat
        kind="apply"
        number="2"
        title="§10 Hugging Face: Quantization & Commercial Licensing"
        subtitle="Comparing VRAM footprints (FP16 vs INT8 vs INT4) and legal deployment rights."
        time="30 min"
        phase="predict"
      >
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            How to evaluate model cards on Hugging Face before bringing an AI model into enterprise infrastructure:
          </p>

          <QuantizationLicenseComparator />
        </div>
      </ConceptBeat>

      {/* §11 Hands-On: OpenRouter */}
      <ConceptBeat
        kind="apply"
        number="3"
        title="§11 OpenRouter: One API, Many Providers (Mechanics Only)"
        subtitle="A unified REST endpoint that can route across Meta, Mistral, and Anthropic models."
        time="15 min"
        phase="predict"
      >
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            Testing multi-provider API calls using standardized payloads:
          </p>

          <OpenRouterApiTester />
        </div>
      </ConceptBeat>

      {/* §12 Weekend 1 Closing Synthesis (Protected Beat!) */}
      <ConceptBeat
        kind="reveal"
        number="4"
        title="§12 Weekend 1 Closing Synthesis: Distance Traveled"
        subtitle="Measuring what you built and understood from Saturday morning to Sunday evening."
        time="15 min"
        phase="predict"
      >
        <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-950/40 via-slate-900/90 to-slate-950/95 border border-purple-500/40 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-sky-400 via-purple-500 to-emerald-400" />

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
              <Trophy size={28} className="animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase text-purple-400">Weekend 1 Milestone Completed</span>
              <h3 className="text-2xl font-bold text-white tracking-tight">From a 7-Day Guess to Running LLMs</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold block">Saturday&rsquo;s Journey (Foundations):</span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li>Guessed tomorrow&rsquo;s chilling center milk collection</li>
                <li>Hand-computed gradient descent &amp; learning rate steps</li>
                <li>Understood how ReLU kinks turn flat lines into neurons</li>
                <li>Saw that a Linear Layer is literally just $Wx+b$</li>
                <li>Traced Backprop: error flowing through the same weights in reverse</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">Sunday&rsquo;s Journey (Modern AI):</span>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li>Saw why RNNs forget long-range multi-week patterns</li>
                <li>Understood why LSTMs hit an unbreakable sequential ceiling</li>
                <li>Hand-calculated Self-Attention dot products &amp; softmax</li>
                <li>Understood Subword Tokenization &amp; 2D Vector Embeddings</li>
                <li>Personally ran a real local LLM and evaluated commercial licenses</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 text-xs font-sans text-purple-200 leading-relaxed">
            <strong>The Bridge to Weekend 2:</strong>
            &ldquo;You now understand how AI models predict and think. Next weekend (Days 3 &amp; 4), we make the Copilot <strong>talk</strong> — mastering prompt engineering, log parsing, and grounding the model in real NDDB SOP documents via Retrieval-Augmented Generation (RAG)!&rdquo;
          </div>
        </div>
      </ConceptBeat>

      {/* Course Map Link */}
      <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <Link href="/day2/chatgpt-case-study" className="text-slate-400 hover:text-white font-mono text-xs flex items-center gap-1.5">
          &larr; Back to ChatGPT Case Study
        </Link>
        <Link
          href="/course-map"
          className="button-primary"
        >
          <span>View 6-Day Course Roadmap</span>
          <ArrowRight size={14} />
        </Link>
      </div>

    </div>
  );
}
