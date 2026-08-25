'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import LossSurfaceHeatmap from './LossSurfaceHeatmap';
import Chart from './Chart';
import { computeLossSurfaceApi, LossSurfaceResult, FALLBACK_DATASETS } from '@/lib/api';

interface RowData {
  day: number;
  name: string;
  actual: number;
  pred1: number;
  err1: number;
  sqErr1: number;
  pred2: number;
  err2: number;
  sqErr2: number;
}

const STEP_DATA: RowData[] = [
  { day: 1, name: 'Mon', actual: 2140, pred1: 2000, err1: -140, sqErr1: 19600, pred2: 2064.51, err2: -75.49, sqErr2: 5698.74 },
  { day: 2, name: 'Tue', actual: 2210, pred1: 2000, err1: -210, sqErr1: 44100, pred2: 2117.65, err2: -92.35, sqErr2: 8528.52 },
  { day: 3, name: 'Wed', actual: 2180, pred1: 2000, err1: -180, sqErr1: 32400, pred2: 2170.79, err2: -9.21, sqErr2: 84.82 },
  { day: 4, name: 'Thu', actual: 2300, pred1: 2000, err1: -300, sqErr1: 90000, pred2: 2223.93, err2: -76.07, sqErr2: 5786.64 },
  { day: 5, name: 'Fri', actual: 2350, pred1: 2000, err1: -350, sqErr1: 122500, pred2: 2277.07, err2: -72.93, sqErr2: 5318.78 },
  { day: 6, name: 'Sat', actual: 2420, pred1: 2000, err1: -420, sqErr1: 176400, pred2: 2330.21, err2: -89.79, sqErr2: 8062.24 },
  { day: 7, name: 'Sun', actual: 2390, pred1: 2000, err1: -390, sqErr1: 152100, pred2: 2383.35, err2: -6.65, sqErr2: 44.22 },
];

export default function CalculationFlowPlayer() {
  const [stage, setStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [userGuessStep2, setUserGuessStep2] = useState<string | null>(null);
  const [surfaceData, setSurfaceData] = useState<LossSurfaceResult | null>(null);

  const milkData = FALLBACK_DATASETS['milk-7day'];

  useEffect(() => {
    computeLossSurfaceApi(milkData, -40, 120, 1600, 2600, 20).then((res) => {
      setSurfaceData(res.result);
    });
  }, [milkData]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (stage === 0) {
      timerRef.current = setTimeout(() => setStage(1), 400);
    } else if (stage === 1) {
      timerRef.current = setTimeout(() => setStage(2), 1200);
    } else if (stage === 2) {
      timerRef.current = setTimeout(() => setStage(3), 1100);
    } else if (stage === 3) {
      timerRef.current = setTimeout(() => setStage(4), 1200);
    } else if (stage === 4) {
      timerRef.current = setTimeout(() => {
        setStage(5);
        setIsPlaying(false);
      }, 1800);
    } else if (stage === 6) {
      timerRef.current = setTimeout(() => {
        setStage(7);
        setIsPlaying(false);
      }, 1500);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, stage]);

  const handlePlayToggle = () => {
    if (stage >= 7) {
      setStage(0);
      setIsPlaying(true);
    } else if (stage === 5 && !userGuessStep2) {
      return;
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleStepForward = () => {
    if (stage < 7) {
      setStage((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStage(0);
    setUserGuessStep2(null);
  };

  const currentParams = React.useMemo(() => {
    if (stage < 4) return { m: 0, c: 2000, loss: 91014.29 };
    if (stage < 6) return { m: 53.14, c: 2011.37, loss: 4787.85 };
    return { m: 61.95, c: 2013.79, loss: 2450.0 };
  }, [stage]);

  const historyPoints = React.useMemo(() => {
    const pts = [{ m: 0, c: 2000, loss: 91014.29 }];
    if (stage >= 4) pts.push({ m: 53.14, c: 2011.37, loss: 4787.85 });
    if (stage >= 6) pts.push({ m: 61.95, c: 2013.79, loss: 2450.0 });
    return pts;
  }, [stage]);

  return (
    <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-6">
      
      {/* Top Header & Instructor Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wide">
            Interactive Slow-Motion Walkthrough
          </span>
          <h4 className="text-xl font-bold text-white mt-0.5">
            Step-by-Step Training Arithmetic &amp; Visual Line Shift
          </h4>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause size={14} /> Pause
              </>
            ) : stage >= 7 ? (
              <>
                <RotateCcw size={14} /> Replay
              </>
            ) : (
              <>
                <Play size={14} /> Play
              </>
            )}
          </button>

          <button
            onClick={handleStepForward}
            disabled={isPlaying || stage >= 7 || (stage === 5 && !userGuessStep2)}
            className="button-secondary text-xs px-2.5 py-1.5 disabled:opacity-40"
          >
            Next Step <ChevronRight size={14} />
          </button>

          <button
            onClick={handleReset}
            className="button-secondary text-xs px-2.5 py-1.5 text-slate-400 hover:text-white"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      {/* STEP 1 SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 border border-sky-800/40 px-2.5 py-0.5 rounded">
            STEP 1 · Initial Baseline: m = 0, c = 2000
          </span>
          <span className="text-xs font-mono text-slate-400">
            {stage === 0 && 'Ready to start'}
            {stage === 1 && '1. Monday fully evaluated'}
            {stage === 2 && '2. Rows 2–7 evaluated'}
            {stage === 3 && '3. Summing squared errors'}
            {stage >= 4 && '4. Parameter update applied!'}
          </span>
        </div>

        {/* 7-Row Hand-Worked Step 1 Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
          <table className="w-full text-center border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80">
                <th className="py-2 px-3">Day (x)</th>
                <th className="py-2 px-3">Actual Intake (y)</th>
                <th className="py-2 px-3 text-sky-400">Prediction (ŷ)</th>
                <th className="py-2 px-3 text-rose-400">Error (ŷ - y)</th>
                <th className="py-2 px-3 text-purple-300">Squared Error (ŷ - y)²</th>
                <th className="py-2 px-3 text-amber-300">Slope Term: (ŷ - y)·x</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {STEP_DATA.map((row, idx) => {
                const isRowVisible = stage >= (idx === 0 ? 1 : 2);
                const isFirstRow = idx === 0;

                return (
                  <tr
                    key={row.day}
                    className={`transition-colors ${
                      isFirstRow && stage === 1 ? 'bg-sky-950/30 font-bold' : ''
                    }`}
                  >
                    <td className="py-2 px-3 text-white font-semibold">{row.name} (Day {row.day})</td>
                    <td className="py-2 px-3">{row.actual.toLocaleString()} L</td>
                    <td className="py-2 px-3 text-sky-300">
                      {isRowVisible ? `${row.pred1.toLocaleString()} L` : '—'}
                    </td>
                    <td className="py-2 px-3 text-rose-400">
                      {isRowVisible ? `${row.err1} L` : '—'}
                    </td>
                    <td className="py-2 px-3 text-purple-300 font-semibold">
                      {isRowVisible ? row.sqErr1.toLocaleString() : '—'}
                    </td>
                    <td className="py-2 px-3 text-amber-300">
                      {isRowVisible ? (row.err1 * row.day).toLocaleString() : '—'}
                    </td>
                  </tr>
                );
              })}

              {/* Sum Row */}
              <tr className="border-t-2 border-slate-700 bg-slate-950/90 font-bold text-white">
                <td colSpan={4} className="py-2.5 px-3 text-right text-slate-400">
                  Totals (∑):
                </td>
                <td className="py-2.5 px-3 text-purple-300 text-sm">
                  {stage >= 3 ? (
                    <motion.span initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="inline-block">
                      637,100
                    </motion.span>
                  ) : '—'}
                </td>
                <td className="py-2.5 px-3 text-amber-300 text-sm">
                  {stage >= 3 ? '-9,300' : '—'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Step 1 Computed Metric Tiles with Clear Formulas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block mb-1">Mean Squared Error (Loss L):</span>
            {stage >= 3 ? (
              <span className="text-rose-300 text-sm font-bold">637,100 / 7 = 91,014.29</span>
            ) : (
              <span className="text-slate-600 font-bold">—</span>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block mb-1">Bias Gradient: 2/n · ∑(error)</span>
            {stage >= 4 ? (
              <span className="text-purple-300 text-sm font-bold">2/7 × (-1,990) = -568.57</span>
            ) : (
              <span className="text-slate-600 font-bold">—</span>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block mb-1">Weight Gradient: 2/n · ∑(error·x)</span>
            {stage >= 4 ? (
              <span className="text-purple-300 text-sm font-bold">2/7 × (-9,300) = -2,657.14</span>
            ) : (
              <span className="text-slate-600 font-bold">—</span>
            )}
          </div>
        </div>

        {/* SIDE-BY-SIDE DUAL VISUAL: Live Line Tilt + Loss Heatmap Roll */}
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-4 font-mono text-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/40 pb-3">
              <div>
                <span className="text-emerald-400 font-bold uppercase block text-sm">
                  Step 1 Update Applied: m &rarr; 53.14, c &rarr; 2,011.37
                </span>
                <p className="text-emerald-300/80 text-[11px]">
                  m_new = 0 - (0.02 × -2,657.14) = <strong>53.14</strong> &nbsp;|&nbsp; c_new = 2,000 - (0.02 × -568.57) = <strong>2,011.37</strong>
                </p>
              </div>
              <span className="bg-emerald-900/60 text-emerald-200 px-2.5 py-1 rounded text-xs font-bold border border-emerald-700/60">
                1 Step Finished
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              
              {/* Dual Visual 1: Line physically tilts up from flat in Data Space */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-bold text-sky-400 block mb-2 text-center">
                  Data Space: Line Tilts from Flat (m=0) &rarr; Rising (m=53.14)
                </span>
                <Chart
                  points={milkData.map((d: any) => ({ x: d.x, y: d.y, label: d.label }))}
                  lines={[
                    {
                      slope: 0,
                      intercept: 2000,
                      color: '#64748b',
                      strokeWidth: 1.5,
                      strokeDasharray: '3 3',
                      label: 'Initial (m=0, c=2000)',
                    },
                    {
                      slope: currentParams.m,
                      intercept: currentParams.c,
                      color: '#34d399',
                      strokeWidth: 3,
                      label: `Step 1 (m=${currentParams.m}, c=${currentParams.c})`,
                    },
                  ]}
                  xMin={0}
                  xMax={8}
                  yMin={1800}
                  yMax={2600}
                  xLabel="Day of Week"
                  yLabel="Litres"
                  height={180}
                />
              </div>

              {/* Dual Visual 2: Marker rolls downhill in Loss Space */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col items-center">
                <span className="text-[11px] font-bold text-purple-400 block mb-2 text-center">
                  Loss Space: Marker Rolls Downhill on Loss Landscape
                </span>
                <LossSurfaceHeatmap
                  surfaceData={surfaceData}
                  currentM={currentParams.m}
                  currentC={currentParams.c}
                  history={historyPoints}
                  isMiniPreview={true}
                />
              </div>

            </div>
          </motion.div>
        )}
      </div>

      {/* MID-WALKTHROUGH GUESS GATE */}
      {stage >= 5 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3"
        >
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <HelpCircle size={18} />
            <span>Mid-Walkthrough Check: Will one more step get us all the way?</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Loss just dropped from 91,014 to 4,787 on the very first update (95% drop). Will Step 2 hit the bottom?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-xs">
            <button
              onClick={() => {
                setUserGuessStep2('one-step');
                if (stage === 5) setStage(6);
              }}
              className={`p-3 rounded-lg border text-left transition-colors ${
                userGuessStep2 === 'one-step'
                  ? 'border-amber-400 bg-amber-950/40 text-amber-200'
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
              }`}
            >
              <strong>1. Done in Step 2</strong>
              <span className="block text-[10px] text-slate-400 mt-1">Hits the bottom immediately</span>
            </button>

            <button
              onClick={() => {
                setUserGuessStep2('overshoot');
                if (stage === 5) setStage(6);
              }}
              className={`p-3 rounded-lg border text-left transition-colors ${
                userGuessStep2 === 'overshoot'
                  ? 'border-amber-400 bg-amber-950/40 text-amber-200'
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
              }`}
            >
              <strong>2. Wobbles &amp; takes ~40 steps</strong>
              <span className="block text-[10px] text-slate-400 mt-1">Overshoots slightly then settles</span>
            </button>

            <button
              onClick={() => {
                setUserGuessStep2('stuck');
                if (stage === 5) setStage(6);
              }}
              className={`p-3 rounded-lg border text-left transition-colors ${
                userGuessStep2 === 'stuck'
                  ? 'border-amber-400 bg-amber-950/40 text-amber-200'
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
              }`}
            >
              <strong>3. Gets stuck</strong>
              <span className="block text-[10px] text-slate-400 mt-1">Stalls out</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2 FAST-FORWARD SECTION */}
      {stage >= 6 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-300">
              STEP 2 · Starting from m = 53.14, c = 2011.37
            </span>
            <span className="text-emerald-400 font-bold">Loss Collapsed to: 4,787.85</span>
          </div>

          <p className="text-slate-400 text-[11px] leading-relaxed">
            Recomputed gradients: ∂L/∂m ≈ -440.46, ∂L/∂c ≈ -120.69.
          </p>

          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-200">
            m_new = 53.14 - (0.02 × -440.46) = <strong className="text-white">61.95</strong> &nbsp;·&nbsp;
            c_new = 2,011.37 - (0.02 × -120.69) = <strong className="text-white">2,013.79</strong>
          </div>

          <p className="text-slate-400 text-[11px] leading-relaxed mt-2">
            Notice m overshot slightly past the true closed-form optimum (<strong className="text-sky-300">m ≈ 47.86, c ≈ 2,092.86</strong>). Gradient descent wobbles downhill rather than walking in a straight line.
          </p>
        </motion.div>
      )}

    </div>
  );
}
