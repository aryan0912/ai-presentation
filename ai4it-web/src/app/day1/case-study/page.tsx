'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Server,
  Activity,
  HardDrive,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Sliders,
  CheckCircle2,
  BellOff,
  TrendingUp,
  Clock
} from 'lucide-react';
import InstructorNote from '@/components/InstructorNote';
import Chart, { ChartPoint } from '@/components/Chart';

export default function CaseStudyPage() {
  // Case 1 State
  const [staticThreshold, setStaticThreshold] = useState<number>(75);
  const [sensitivity, setSensitivity] = useState<'low' | 'balanced' | 'high'>('balanced');
  const [useAdaptive, setUseAdaptive] = useState<boolean>(false);

  // 24-hour server CPU metric simulation (0h to 23h)
  const cpuTimeSeries = useMemo(() => {
    return [
      { hour: 0, cpu: 18, isAnomaly: false },
      { hour: 1, cpu: 15, isAnomaly: false },
      { hour: 2, cpu: 14, isAnomaly: false },
      { hour: 3, cpu: 52, isAnomaly: true }, // Anomalous memory leak / batch at 3 AM!
      { hour: 4, cpu: 17, isAnomaly: false },
      { hour: 5, cpu: 22, isAnomaly: false },
      { hour: 6, cpu: 35, isAnomaly: false },
      { hour: 7, cpu: 55, isAnomaly: false },
      { hour: 8, cpu: 72, isAnomaly: false },
      { hour: 9, cpu: 82, isAnomaly: false }, // Normal 9 AM morning login rush
      { hour: 10, cpu: 86, isAnomaly: false },
      { hour: 11, cpu: 79, isAnomaly: false },
      { hour: 12, cpu: 74, isAnomaly: false },
      { hour: 13, cpu: 78, isAnomaly: false },
      { hour: 14, cpu: 84, isAnomaly: false },
      { hour: 15, cpu: 81, isAnomaly: false },
      { hour: 16, cpu: 75, isAnomaly: false },
      { hour: 17, cpu: 65, isAnomaly: false },
      { hour: 18, cpu: 48, isAnomaly: false },
      { hour: 19, cpu: 38, isAnomaly: false },
      { hour: 20, cpu: 32, isAnomaly: false },
      { hour: 21, cpu: 28, isAnomaly: false },
      { hour: 22, cpu: 22, isAnomaly: false },
      { hour: 23, cpu: 19, isAnomaly: false },
    ];
  }, []);

  // Adaptive baseline: expected daytime curve + 2.5 * stddev
  const adaptiveThresholds = useMemo(() => {
    return cpuTimeSeries.map((p) => {
      // Base expected curve
      const base = 20 + 60 * Math.sin((p.hour / 24) * Math.PI);
      const margin = sensitivity === 'low' ? 30 : sensitivity === 'balanced' ? 20 : 12;
      return { hour: p.hour, threshold: Math.min(95, base + margin) };
    });
  }, [cpuTimeSeries, sensitivity]);

  // Evaluate alerts
  const { falseAlarms, detectedAnomalies, missedAnomalies } = useMemo(() => {
    let fa = 0;
    let da = 0;
    let ma = 0;

    cpuTimeSeries.forEach((pt, i) => {
      const thresh = useAdaptive ? adaptiveThresholds[i].threshold : staticThreshold;
      const triggered = pt.cpu >= thresh;

      if (triggered && !pt.isAnomaly) fa++;
      if (triggered && pt.isAnomaly) da++;
      if (!triggered && pt.isAnomaly) ma++;
    });

    return { falseAlarms: fa, detectedAnomalies: da, missedAnomalies: ma };
  }, [cpuTimeSeries, staticThreshold, useAdaptive, adaptiveThresholds]);

  // Case 2: Disk growth data (Months 1-8 actual, Months 9-14 forecasted)
  const diskData = [
    { x: 1, y: 45.0, label: 'M1' },
    { x: 2, y: 49.2, label: 'M2' },
    { x: 3, y: 52.8, label: 'M3' },
    { x: 4, y: 57.1, label: 'M4' },
    { x: 5, y: 62.0, label: 'M5' },
    { x: 6, y: 66.4, label: 'M6' },
    { x: 7, y: 71.0, label: 'M7' },
    { x: 8, y: 74.8, label: 'M8' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded-full w-fit mb-3">
          <span>Enterprise IT Applications · 30 min Budget</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          3. Case Studies: Where Is This Already Used in IT?
        </h1>
        <p className="text-lg text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Two deep, production-tested IT operational problems: learned anomaly detection in system telemetry, and capacity forecasting with confidence bands.
        </p>

        <InstructorNote
          timing="30 minutes total (12:50 - 13:20)"
          aloudQuestion="How many of you have been paged at 3:00 AM by a static 80% CPU threshold that was triggered by a scheduled backup, or missed a slow memory leak because it was under 80%?"
          expectedWrongAnswers={[
            "Belief that zero false positives and zero false negatives can be achieved simultaneously. Force participants to move the sensitivity slider to see the immutable precision-recall trade-off."
          ]}
          instructorTip="Focus on Case 1 first. Let participants toggle between the static threshold and the learned time-of-day baseline."
        />
      </div>

      {/* CASE 1: Anomaly Detection */}
      <section className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
              Case 1 · Operational Monitoring (AIOps)
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-0.5">
              Anomaly Detection in Server Metrics
            </h2>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40">
            Static Threshold vs. Learned Baseline
          </span>
        </div>

        {/* The 4-Beat Case Narrative */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <strong className="text-rose-400 block mb-1">1. The Problem</strong>
            <p className="text-slate-300">
              A static threshold (e.g. 75% CPU) either floods on-call staff with false alarms during 10 AM login surges or misses a 52% memory leak at 3 AM.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <strong className="text-amber-400 block mb-1">2. What Humans Do Today</strong>
            <p className="text-slate-300">
              Engineers manually tune alert rules, create maintenance blackout windows, or eventually disable noisy alert channels entirely.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <strong className="text-sky-400 block mb-1">3. What the Model Does</strong>
            <p className="text-slate-300">
              Learns the expected circadian baseline for every hour of the week: 52% at 3 AM is flagged as an anomaly, while 82% at 9 AM is recognized as normal.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <strong className="text-purple-400 block mb-1">4. What It Costs You</strong>
            <p className="text-slate-300">
              You must accept the precision/recall trade-off: higher sensitivity catches more zero-day incidents but causes occasional false pages.
            </p>
          </div>
        </div>

        {/* Interactive Anomaly Simulator */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Mode Toggle */}
            <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 font-mono text-xs">
              <button
                onClick={() => setUseAdaptive(false)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  !useAdaptive ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Static Threshold ({staticThreshold}%)
              </button>
              <button
                onClick={() => setUseAdaptive(true)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  useAdaptive ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Learned Time-of-Day Baseline (AIOps)
              </button>
            </div>

            {/* Slider or Sensitivity */}
            {!useAdaptive ? (
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-300">Threshold: <strong>{staticThreshold}%</strong></span>
                <input
                  type="range"
                  min="40"
                  max="90"
                  value={staticThreshold}
                  onChange={(e) => setStaticThreshold(parseInt(e.target.value))}
                  className="w-32 h-1.5 bg-slate-800 rounded appearance-none accent-rose-400"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-300">Sensitivity:</span>
                {(['low', 'balanced', 'high'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSensitivity(s)}
                    className={`px-2.5 py-0.5 rounded capitalize ${
                      sensitivity === s ? 'bg-purple-600 text-white font-bold' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chart Display */}
          <Chart
            points={cpuTimeSeries.map((p) => ({
              x: p.hour,
              y: p.cpu,
              label: `${p.hour}h: ${p.cpu}%`,
              color: p.isAnomaly ? '#f43f5e' : '#60a5fa',
              radius: p.isAnomaly ? 8 : 5,
            }))}
            lines={[
              !useAdaptive
                ? {
                    slope: 0,
                    intercept: staticThreshold,
                    color: '#ef4444',
                    strokeWidth: 2.5,
                    strokeDasharray: '4 4',
                    label: `Static Alarm (${staticThreshold}%)`,
                  }
                : {
                    points: adaptiveThresholds.map((t) => ({ x: t.hour, y: t.threshold })),
                    color: '#34d399',
                    strokeWidth: 3,
                    label: 'Learned Circadian Alarm Surface',
                  },
            ]}
            xMin={0}
            xMax={23}
            yMin={0}
            yMax={100}
            xLabel="Hour of Day (00:00 to 23:00)"
            yLabel="CPU Utilization (%)"
            height={280}
          />

          {/* Alert Scoreboard */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono pt-2">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">False Alarms (Paging at 9 AM):</span>
              <strong className={falseAlarms > 0 ? 'text-rose-400 text-base' : 'text-emerald-400 text-base'}>
                {falseAlarms} False Pages
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">True Anomalies Caught (3 AM Leak):</span>
              <strong className={detectedAnomalies > 0 ? 'text-emerald-400 text-base' : 'text-rose-400 text-base'}>
                {detectedAnomalies} / 1 Caught
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">Silent Misses (Undetected):</span>
              <strong className={missedAnomalies > 0 ? 'text-rose-400 text-base' : 'text-emerald-400 text-base'}>
                {missedAnomalies} Missed
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* CASE 2: Capacity Forecasting */}
      <section className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
              Case 2 · Infrastructure Planning
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-0.5">
              Capacity Forecasting with Confidence Bands
            </h2>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/40">
            Linear Projection + Uncertainty Sizing
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Applying linear regression to SAN storage growth: Month 1 (45%) to Month 8 (75%). The fitted slope predicts crossing the 80% threshold at <strong>Month 9.2</strong>.
        </p>

        {/* Capacity Chart with Widening Confidence Bands */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <Chart
            points={diskData}
            lines={[
              {
                slope: 4.25,
                intercept: 40.5,
                color: '#38bdf8',
                strokeWidth: 3,
                label: 'Fitted Growth: +4.25% / Month',
              },
              {
                slope: 0,
                intercept: 80.0,
                color: '#ef4444',
                strokeWidth: 2,
                strokeDasharray: '3 3',
                label: '80% Critical Threshold',
              },
              {
                points: [
                  { x: 8, y: 74.8 },
                  { x: 10, y: 88.0 },
                  { x: 12, y: 98.0 },
                ],
                color: 'rgba(244, 63, 94, 0.6)',
                strokeWidth: 1.5,
                strokeDasharray: '2 2',
                label: 'Upper Confidence Band (+95%)',
              },
              {
                points: [
                  { x: 8, y: 74.8 },
                  { x: 10, y: 78.0 },
                  { x: 12, y: 84.0 },
                ],
                color: 'rgba(52, 211, 153, 0.6)',
                strokeWidth: 1.5,
                strokeDasharray: '2 2',
                label: 'Lower Confidence Band (-95%)',
              },
            ]}
            xMin={1}
            xMax={13}
            yMin={35}
            yMax={105}
            xLabel="Calendar Month (1 to 8 Actual, 9 to 13 Forecast)"
            yLabel="SAN Storage Utilization (%)"
            height={280}
          />

          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 text-xs md:text-sm text-purple-200 leading-relaxed">
            <strong className="text-purple-300 block mb-1">★ The Golden Rule of IT Forecasting:</strong>
            "The model line doesn't get more wrong the further out you project — it gets <strong>less certain</strong>. The confidence band widens cone-like into the future. Any vendor or automated tool presenting a 12-month prediction as a single thin line is lying to your executive team."
          </div>
        </div>
      </section>

      {/* Honesty Panel: 3 Failures */}
      <section className="p-6 rounded-2xl border border-rose-500/30 bg-slate-950 space-y-4">
        <div className="flex items-center gap-2 text-rose-400">
          <ShieldAlert size={20} />
          <h3 className="text-lg font-bold text-white">Engineering Honesty: 3 AI Deployments That Failed in Industry</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <strong className="text-rose-400 block mb-1">1. Over-Eager Alerting ML</strong>
            <p className="text-slate-400">
              Algorithms that triggered hundreds of predictive tickets per day. Sysadmins suffered alert fatigue and turned the ML model off within 3 weeks.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <strong className="text-rose-400 block mb-1">2. Retraining on Corrupted Output</strong>
            <p className="text-slate-400">
              An IT incident forecasting model that included its own automated test traffic in the retraining pipeline, causing catastrophic feedback drift.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <strong className="text-rose-400 block mb-1">3. Un-actionable Dashboard Noise</strong>
            <p className="text-slate-400">
              Predictive models calculating abstract 30-day risk scores that did not map to any concrete remediation runbook or budget approval cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Bridge */}
      <div className="p-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-blue-400 font-bold">Next: Sequential Deep Learning Setup</span>
          <h3 className="text-2xl font-bold text-white mt-1">When Order Matters</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            "We've seen regression and feedforward nets. Now let's explore why fixed-window architectures fail when sequence and time continuity are introduced."
          </p>
        </div>

        <Link href="/day1/sequence-problem" className="button-primary shrink-0">
          Next: When Order Matters (20m) <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}
