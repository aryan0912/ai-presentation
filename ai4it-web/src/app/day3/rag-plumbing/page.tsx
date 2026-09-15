import React from 'react';
import { 
  Lock, 
  Search, 
  Layers, 
  Database, 
  Cpu, 
  MessageSquare, 
  ArrowRight,
  SplitSquareHorizontal
} from 'lucide-react';
import Link from 'next/link';
import RagPipelineVisualizer from '@/components/RagPipelineVisualizer';

export default function RagPlumbingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20 p-6 md:p-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Day 3 · Block 3</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Hitting the Wall: The Need for RAG
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Ask your tool something about an internal NDDB SOP, or an incident that happened this morning. It either hallucinates confidently, or honestly says it doesn't know. 
        </p>
      </div>

      {/* The Limitation Wall */}
      <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <h2 className="text-2xl font-bold text-white mb-6">The Three Walls of Raw Prompts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-rose-950/50 flex items-center justify-center border border-rose-900">
              <Lock className="text-rose-400" size={20} />
            </div>
            <h3 className="font-bold text-slate-200">No Internal Knowledge</h3>
            <p className="text-sm text-slate-400">It doesn't know your SOPs, your logs, or your chilling center metrics.</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-rose-950/50 flex items-center justify-center border border-rose-900">
              <Layers className="text-rose-400" size={20} />
            </div>
            <h3 className="font-bold text-slate-200">Token Limits</h3>
            <p className="text-sm text-slate-400">You can't just paste a 400-page manual into the prompt box. It won't fit.</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-rose-950/50 flex items-center justify-center border border-rose-900">
              <Search className="text-rose-400" size={20} />
            </div>
            <h3 className="font-bold text-slate-200">No Citations</h3>
            <p className="text-sm text-slate-400">When it answers, it can't tell you exactly which page of which manual it read to get that answer.</p>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-sm italic font-serif">
          "That's not a bug you can prompt your way out of — the fix is architectural. We have to build plumbing."
        </div>
      </section>

      {/* RAG Components Bit by Bit */}
      <section className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Retrieval-Augmented Generation (RAG)</h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm">
            How do we fix the walls above? We connect the LLM to a searchable database of our own documents. Here are the 6 mechanical steps that make it happen.
          </p>
        </div>

        {/* Interactive 6-Stage Visualizer */}
        <RagPipelineVisualizer />

        <div className="space-y-4 relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-800 hidden md:block"></div>

          {/* Component 1 */}
          <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
            <div className="w-12 h-12 rounded-full bg-sky-950/50 border border-sky-900 flex items-center justify-center shrink-0">
              <SplitSquareHorizontal className="text-sky-400" size={24} />
            </div>
            <div className="flex-1 p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="text-xl font-bold text-sky-400 mb-2">1. Chunking</h3>
              <p className="text-sm text-slate-300 mb-4">A whole document is too big to hand an LLM at once, and mixes many topics.</p>
              <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-400 border border-slate-800">
                <strong>Solution:</strong> Split the document into overlapping passages, small enough to be specific, large enough to keep context.
              </div>
            </div>
          </div>

          {/* Component 2 */}
          <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
            <div className="w-12 h-12 rounded-full bg-purple-950/50 border border-purple-900 flex items-center justify-center shrink-0">
              <Layers className="text-purple-400" size={24} />
            </div>
            <div className="flex-1 p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="text-xl font-bold text-purple-400 mb-2">2. Embedding</h3>
              <p className="text-sm text-slate-300 mb-4">We need to find <em>relevant</em> chunks based on meaning, not just exact keyword matches.</p>
              <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-400 border border-slate-800">
                <strong>Solution:</strong> Turn each chunk into a vector map coordinate. (Remember Day 2's Embedding Space!)
              </div>
            </div>
          </div>

          {/* Component 3 */}
          <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
            <div className="w-12 h-12 rounded-full bg-indigo-950/50 border border-indigo-900 flex items-center justify-center shrink-0">
              <Database className="text-indigo-400" size={24} />
            </div>
            <div className="flex-1 p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="text-xl font-bold text-indigo-400 mb-2">3. Vector Store</h3>
              <p className="text-sm text-slate-300 mb-4">We need to search thousands of chunks instantly.</p>
              <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-400 border border-slate-800">
                <strong>Solution:</strong> A specialized database indexed for "find nearest vectors" (nearest neighbors).
              </div>
            </div>
          </div>

          {/* Component 4 */}
          <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
            <div className="w-12 h-12 rounded-full bg-emerald-950/50 border border-emerald-900 flex items-center justify-center shrink-0">
              <Search className="text-emerald-400" size={24} />
            </div>
            <div className="flex-1 p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="text-xl font-bold text-emerald-400 mb-2">4. Retrieval</h3>
              <p className="text-sm text-slate-300 mb-4">When a user asks a question, how do we know which chunks to pick?</p>
              <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-400 border border-slate-800">
                <strong>Solution:</strong> Embed the question itself into the same map, and grab the chunks closest to it.
              </div>
            </div>
          </div>

          {/* Component 5 */}
          <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
            <div className="w-12 h-12 rounded-full bg-amber-950/50 border border-amber-900 flex items-center justify-center shrink-0 relative overflow-hidden">
               <div className="absolute inset-0 bg-amber-500/20 animate-pulse" />
              <Cpu className="text-amber-400 relative z-10" size={24} />
            </div>
            <div className="flex-1 p-6 rounded-2xl bg-amber-950/10 border border-amber-900/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <h3 className="text-xl font-bold text-amber-400 mb-2 flex items-center gap-2">
                5. Augmentation 
                <span className="text-[10px] bg-amber-950 text-amber-500 px-2 py-0.5 rounded-full border border-amber-800/50 uppercase tracking-widest font-mono">The Callback</span>
              </h3>
              <p className="text-sm text-slate-300 mb-4">The LLM still doesn't know the answer, it just has candidate passages.</p>
              <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-400 border border-slate-800">
                <strong>Solution:</strong> Stuff the retrieved chunks into the prompt as <strong>CONTEXT</strong> before the question. This is literally the R-<strong>C</strong>-I-I-O-C framework you learned this morning!
              </div>
            </div>
          </div>

          {/* Component 6 */}
          <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
            <div className="w-12 h-12 rounded-full bg-rose-950/50 border border-rose-900 flex items-center justify-center shrink-0">
              <MessageSquare className="text-rose-400" size={24} />
            </div>
            <div className="flex-1 p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="text-xl font-bold text-rose-400 mb-2">6. Generation</h3>
              <p className="text-sm text-slate-300 mb-4">Turn grounded context + question into a final human-readable answer.</p>
              <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-400 border border-slate-800">
                <strong>Solution:</strong> The exact same next-token-prediction from Day 2, just with a better-informed input prompt.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Bridge to Langflow Build */}
      <div className="p-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-blue-400 font-bold">The Assembly Phase</span>
          <h3 className="text-2xl font-bold text-white mt-1">Ready to build the plumbing?</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            We are going to use Langflow—a visual canvas—to drag and drop these exact 6 components into a working RAG pipeline.
          </p>
        </div>

        <Link href="/day3/langflow-build" className="button-primary shrink-0">
          Enter Langflow Build <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
