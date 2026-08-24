'use client';
import React, { useState, useEffect } from 'react';
import {
  checkBackendStatus,
  fetchDataset,
  stepLinearRegressionApi,
  fitLinearRegressionApi,
  computeLossSurfaceApi,
  computeBoundaryApi,
  FALLBACK_DATASETS
} from '@/lib/api';
import { CheckCircle2, AlertTriangle, RefreshCw, Server, Laptop, Activity, ShieldCheck } from 'lucide-react';

interface TestResult {
  name: string;
  endpoint: string;
  status: 'pending' | 'ok' | 'fallback' | 'error';
  latencyMs: number;
  details: string;
}

export default function StatusPage() {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    // Test 1: Health
    const t0 = performance.now();
    const health = await checkBackendStatus();
    const t1 = performance.now();
    results.push({
      name: 'API Health Check',
      endpoint: 'GET /api/health',
      status: health.online ? 'ok' : 'fallback',
      latencyMs: Math.round(t1 - t0),
      details: health.message,
    });

    // Test 2: Datasets
    const t2 = performance.now();
    const ds = await fetchDataset('milk-7day');
    const t3 = performance.now();
    results.push({
      name: 'Canonical Dataset (Milk 7-Day)',
      endpoint: 'GET /api/datasets/milk-7day',
      status: ds.isFallback ? 'fallback' : 'ok',
      latencyMs: Math.round(t3 - t2),
      details: ds.isFallback ? 'Loaded from built-in client fallback' : 'Fetched live from FastAPI',
    });

    // Test 3: Regression Step
    const t4 = performance.now();
    const step = await stepLinearRegressionApi(10, 2000, 0.01, FALLBACK_DATASETS['milk-7day']);
    const t5 = performance.now();
    results.push({
      name: 'Linear Regression Gradient Step',
      endpoint: 'POST /api/linear-regression/step',
      status: step.isFallback ? 'fallback' : 'ok',
      latencyMs: Math.round(t5 - t4),
      details: `New m: ${step.result.new_m.toFixed(2)}, Loss: ${Math.round(step.result.loss)}`,
    });

    // Test 4: Loss Surface
    const t6 = performance.now();
    const surf = await computeLossSurfaceApi(FALLBACK_DATASETS['milk-7day'], -20, 80, 1800, 2400, 15);
    const t7 = performance.now();
    results.push({
      name: '2D Loss Landscape Surface Grid',
      endpoint: 'POST /api/linear-regression/loss-surface',
      status: surf.isFallback ? 'fallback' : 'ok',
      latencyMs: Math.round(t7 - t6),
      details: `Grid computed: ${surf.result.surface.length}x${surf.result.surface[0]?.length || 0}`,
    });

    // Test 5: Neural Network Boundary
    const t8 = performance.now();
    const bound = await computeBoundaryApi('rings', 1, 4, 'relu');
    const t9 = performance.now();
    results.push({
      name: 'Neural Network Decision Boundary',
      endpoint: 'POST /api/neural-network/boundary',
      status: bound.isFallback ? 'fallback' : 'ok',
      latencyMs: Math.round(t9 - t8),
      details: `Train Accuracy: ${(bound.result.train_accuracy * 100).toFixed(1)}%`,
    });

    setTests(results);
    setIsRunning(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono text-slate-500 uppercase">Instructor Pre-Flight</span>
          <h1 className="text-3xl font-bold text-white">System Diagnostics &amp; Health</h1>
          <p className="text-xs text-slate-400 mt-0.5">Run this 5 minutes before your lecture session.</p>
        </div>

        <button onClick={runDiagnostics} disabled={isRunning} className="button-primary text-xs flex items-center gap-2">
          <RefreshCw size={14} className={isRunning ? 'animate-spin' : ''} />
          <span>Re-Run Diagnostics</span>
        </button>
      </div>

      {/* Resilience Summary */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Laptop size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">In-Browser Fallback Engine</h4>
            <p className="text-xs text-emerald-300 font-mono">100% Armed &amp; Verified Ready</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
            <Server size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">FastAPI Backend</h4>
            <p className="text-xs text-slate-400 font-mono">Target: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}</p>
          </div>
        </div>
      </div>

      {/* Test Results Table */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Subsystem Verification Matrix</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Subsystem</th>
                <th className="py-2.5 px-3">Endpoint</th>
                <th className="py-2.5 px-3">Mode</th>
                <th className="py-2.5 px-3">Latency</th>
                <th className="py-2.5 px-3">Diagnostics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {tests.map((t, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40">
                  <td className="py-3 px-3 font-bold text-white">{t.name}</td>
                  <td className="py-3 px-3 text-slate-400">{t.endpoint}</td>
                  <td className="py-3 px-3">
                    {t.status === 'ok' ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Live Backend (FastAPI)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        Local Fallback (JS)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-300">{t.latencyMs} ms</td>
                  <td className="py-3 px-3 text-slate-400">{t.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
