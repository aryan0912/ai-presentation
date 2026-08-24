'use client';
import React from 'react';
import { AlertCircle, FileCheck } from 'lucide-react';

interface Row {
  poc: string;
  prod: string;
}

interface PocNoteProps {
  n?: number;
  total?: number;
  rows?: Row[];
  noteHeader?: string;
  footerText?: string;
}

const DEFAULT_ROWS: Row[] = [
  { poc: 'Fitted on 7 points, no holdout data', prod: 'Train/validation/test split with honest error estimation' },
  { poc: 'Trained once, in the browser state', prod: 'Scheduled automated retraining as distribution drifts' },
  { poc: 'No continuous observability or alarms', prod: 'Real-time telemetry alerting when prediction residual spikes' },
  { poc: 'One hard-coded static dataset', prod: 'Production ingestion pipeline with strict schema validation' },
  { poc: 'No versioning or checkpointing', prod: 'Model registry (MLflow/S3), canary rollout, rollback paths' },
];

export default function PocNote({
  n = 1,
  total = 3,
  rows = DEFAULT_ROWS,
  noteHeader = "Everything you saw today would fail in production. That's fine — that's what a POC is for. But you should be able to name exactly why.",
  footerText = 'This is note #1 of 3. Note #2 comes on Day 4 (RAG), note #3 on Day 5 (agents). They get consolidated on Day 6 to construct your real enterprise rollout plan.',
}: PocNoteProps) {
  return (
    <div className="my-8 rounded-xl border border-rose-500/40 bg-slate-950 p-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-rose-500/20 pb-3 mb-4">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertCircle size={20} />
          <span className="font-mono text-xs font-bold uppercase tracking-widest">
            POC vs Production · Note #{n} of {total}
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40">
          Architectural Reality Check
        </span>
      </div>

      <p className="text-sm font-semibold text-white mb-5 leading-relaxed">{noteHeader}</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono">
              <th className="py-2.5 px-3 w-1/2 bg-slate-900/50 rounded-tl-lg">Today's Demo (POC / Exploration)</th>
              <th className="py-2.5 px-3 w-1/2 bg-slate-900/80 rounded-tr-lg text-emerald-400">
                What Production Demands
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                <td className="py-3 px-3 text-slate-400 pr-4">{row.poc}</td>
                <td className="py-3 px-3 text-emerald-300 pl-4 bg-emerald-950/10 border-l border-slate-800">
                  {row.prod}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
        <FileCheck size={14} className="text-slate-500 shrink-0" />
        <span>{footerText}</span>
      </div>
    </div>
  );
}
