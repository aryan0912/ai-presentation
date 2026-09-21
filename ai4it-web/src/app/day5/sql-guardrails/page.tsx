import SqlAgentSimulator from '../components/SqlAgentSimulator';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code } from 'lucide-react';

export default function SqlGuardrailsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <span className="text-emerald-400 font-mono text-sm font-bold uppercase tracking-wider">Day 5 • Rung 3</span>
        <h1 className="text-3xl font-bold text-white mt-2 mb-4">
          SQL Guardrails: The Break-It
        </h1>
        <p className="text-slate-400">
          The difference between letting a model write SQL, and giving a model a safe, parameterized capability.
        </p>
      </div>

      <SqlAgentSimulator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="glass-card">
          <h3 className="text-lg font-bold text-white mb-2">The Danger of Free-Form SQL</h3>
          <p className="text-sm text-slate-300">
            "Clean up the old test records." Nobody attacked this system. A well-meaning colleague typed a reasonable English sentence, and a confident model turned it into a destructive query. The ambiguity was in the request; the damage was in the execution.
          </p>
        </div>
        <div className="glass-card">
          <h3 className="text-lg font-bold text-white mb-2">Safe By Construction</h3>
          <p className="text-sm text-slate-300">
            The real fix isn't checking what it wrote. It's designing the tool so the dangerous thing isn't expressible at all. Every capability you expose is a decision, and the default should be 'no.'
          </p>
        </div>
      </div>

      <div className="p-6 mt-6 rounded-2xl bg-indigo-950/20 border border-indigo-900/40">
        <h3 className="text-lg font-bold text-indigo-400 mb-3 flex items-center gap-2">
          <Code size={18} /> The Architectural Fix (LangGraph)
        </h3>
        <p className="text-sm text-slate-400 mb-4">
          The model's entire job is parameter extraction. It cannot write SQL because it is never asked to.
        </p>
        <pre className="text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 text-indigo-300 overflow-x-auto">
{`@tool
def get_collection_readings(center_id: str, start_date: str,
                            end_date: str, min_litres: float = None):
    """Fetch collection readings for a chilling centre in a date range."""
    # The actual SQL executes safely behind this function barrier`}
        </pre>
      </div>

      <div className="flex justify-between pt-8">
        <Link href="/day5/tool-calling-reveal" className="button-secondary">
          <ArrowLeft size={16} /> Back
        </Link>
        <Link href="/day5/scale-theory" className="button-primary">
          Next: Scale Theory <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
