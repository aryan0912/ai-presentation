import Link from 'next/link';
import { ArrowLeft, Flag, CheckCircle, BrainCircuit, MessageSquare, Wrench } from 'lucide-react';

export default function CapstonePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <Link href="/day6" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 text-sm font-mono w-fit">
        <ArrowLeft size={16} /> Back to Day 6
      </Link>
      
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Q4: The Final Capstone & Roadmap</h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          It is time to close the triangle. You will finalize your Technical Capstone, draft a Strategic AI Implementation Roadmap for your NDDB department, and graduate from AI4IT.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="glass-card flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6 w-full">
            <Flag className="text-emerald-400" size={24} />
            <h2 className="text-xl font-bold text-white">The Technical Capstone</h2>
          </div>
          
          <div className="relative w-full max-w-[300px] aspect-square my-4">
            {/* Predict */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
               <div className="p-4 bg-indigo-900/50 rounded-full border border-indigo-500/50 text-indigo-400 mb-2">
                 <BrainCircuit size={32} />
               </div>
               <span className="font-bold text-white">PREDICT</span>
               <span className="text-xs text-slate-400">Data & Forecasting</span>
            </div>
            
            {/* Talk */}
            <div className="absolute bottom-0 left-0 flex flex-col items-center">
               <div className="p-4 bg-cyan-900/50 rounded-full border border-cyan-500/50 text-cyan-400 mb-2">
                 <MessageSquare size={32} />
               </div>
               <span className="font-bold text-white">TALK</span>
               <span className="text-xs text-slate-400">RAG & Knowledge</span>
            </div>

            {/* Act */}
            <div className="absolute bottom-0 right-0 flex flex-col items-center">
               <div className="p-4 bg-rose-900/50 rounded-full border border-rose-500/50 text-rose-400 mb-2">
                 <Wrench size={32} />
               </div>
               <span className="font-bold text-white">ACT</span>
               <span className="text-xs text-slate-400">Agents & n8n</span>
            </div>
            
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100">
               <path d="M 50 25 L 20 75 L 80 75 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
               <span className="font-extrabold text-emerald-400 uppercase tracking-widest text-sm">The Copilot</span>
            </div>
          </div>
          
          <p className="text-sm text-slate-400 text-center mt-4">
            Your final challenge: Stitch your guardrails, your RAG, and your n8n workflows into one unified system.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-4">The Strategic Roadmap</h2>
            <p className="text-sm text-slate-300 mb-4">
              Step away from the code. Open `My_AI_Roadmap.md` and draft your 25-minute phased implementation plan.
            </p>
            <ul className="space-y-2 text-sm text-slate-400 font-mono">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Define Core Use Case</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Hardware vs Cloud APIs</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Governance & PII Plan</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Define ROI (MTTR)</li>
            </ul>
          </div>

          <div className="glass-card bg-indigo-950/20 border-indigo-900/50">
            <h2 className="text-xl font-bold text-white mb-2">Course Rating & Feedback</h2>
            <p className="text-sm text-slate-300 mb-6">
              Before you graduate, please take 5 minutes to submit your evaluation. Your feedback shapes the future of AI at NDDB.
            </p>
            <button className="button-primary w-full flex justify-center items-center py-3">
              Open Feedback Form
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-start pt-8 mt-12 border-t border-slate-800">
        <Link href="/day6/q3-reality-layer" className="button-secondary">
          <ArrowLeft size={16} /> Prev: Q3 Reality Layer
        </Link>
      </div>
    </div>
  );
}
