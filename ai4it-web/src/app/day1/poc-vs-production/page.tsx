'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertOctagon,
  FileText,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import InstructorNote from '@/components/InstructorNote';
import PocNote from '@/components/PocNote';

export default function PocVsProductionPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-rose-400 bg-rose-950/40 border border-rose-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Enterprise Reality Check · 10 min Budget</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          6. POC vs. Production: Architectural Note #1
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          The difference between a browser proof-of-concept and an enterprise-grade deployed model in an NDDB datacenter.
        </p>

        <InstructorNote
          timing="10 minutes total (13:55 - 14:05)"
          aloudQuestion="If an ML contractor brings you a model that achieved 99% accuracy on a 7-row spreadsheet with no validation split, what is your immediate response as an IT manager?"
          expectedWrongAnswers={[
            "Accepting the 99% claim at face value. Emphasize that without holdout data and drift pipelines, high training accuracy is virtually guaranteed to fail in production."
          ]}
          instructorTip="Close Day 1 with this stark note. Reinforce that Note #2 arrives on Day 4 (RAG) and Note #3 on Day 5 (Agents), all feeding the Day 6 Enterprise Roadmap."
        />
      </div>

      {/* The Stark POC Note Table */}
      <PocNote
        n={1}
        total={3}
        noteHeader="Everything you saw today would fail in production. That's fine — that's what a POC is for. But as IT professionals, you should be able to name exactly why."
        footerText="This is Note #1 of 3. Note #2 arrives on Day 4 (RAG Architectures), and Note #3 on Day 5 (Autonomous Agents). On Day 6, these three notes combine to form your enterprise rollout and governance plan."
        rows={[
          {
            poc: 'Fitted on 7 points with zero holdout test data',
            prod: 'Strict Train / Validation / Test data split (e.g. 70/15/15) to calculate unbiased generalization error.'
          },
          {
            poc: 'Trained once, in memory, in the client browser',
            prod: 'Automated recurring MLOps retraining pipelines as seasonal milk collection patterns drift.'
          },
          {
            poc: 'No telemetry, drift detection, or alerting',
            prod: 'Continuous inference monitoring that triggers alarms when real-world prediction error spikes.'
          },
          {
            poc: 'One hard-coded static JSON dataset',
            prod: 'Production ingestion middleware with schema validation, PII masking, and dead-letter queues.'
          },
          {
            poc: 'No version control or deployment artifacts',
            prod: 'Central Model Registry (MLflow/S3), immutable Docker containers, and instant rollback paths.'
          }
        ]}
      />

      {/* Day 1 Wrap-up & Homework Card */}
      <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase">
          <Calendar size={15} /> Day 1 Wrap-up &amp; Gap-Week 1 Mission
        </div>
        <h3 className="text-2xl font-bold text-white">Your Mission for the Gap Week</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Open <strong>Google Antigravity</strong> on your laptop. Pick one small daily IT operational chore (log parsing, config conversion, or SQL query drafting). Describe your intent, inspect what got built, and run the 4-question judging rubric.
        </p>
        <p className="text-xs text-slate-400 italic">
          Bring your prompt, the result, and your notes on how it performed to Weekend 1 · Day 2.
        </p>
      </div>

      {/* Bridge to Day 2 */}
      <div className="p-8 rounded-2xl border border-purple-500/30 bg-purple-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-purple-400 font-bold">Weekend 1 · Day 1 Complete</span>
          <h3 className="text-2xl font-bold text-white mt-1">See You in Day 2: Memory &amp; Attention</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            "Tomorrow we tackle the sequence problem: Recurrent Neural Networks (RNNs), LSTMs, Vector Embeddings, and the Transformer architecture."
          </p>
        </div>

        <Link href="/course-map" className="button-primary shrink-0">
          Return to Course Map <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
