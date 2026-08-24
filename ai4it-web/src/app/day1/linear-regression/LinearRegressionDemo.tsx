'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Chart, { ChartPoint } from '@/components/Chart';
import BackendBadge from '@/components/BackendBadge';
import {
  stepLinearRegressionApi,
  computeLossSurfaceApi,
  fitLinearRegressionApi,
  DataPoint,
  LossSurfaceResult,
  FALLBACK_DATASETS
} from '@/lib/api';
import { Play, RotateCcw, Zap, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

interface LinearRegressionDemoProps {
  initialData?: DataPoint[];
  userGuess?: number | null;
  onStateChange?: (m: number, c: number, loss: number) => void;
}

export default function LinearRegressionDemo({
  initialData,
  userGuess,
  onStateChange
}: LinearRegressionDemoProps) {
  const data = useMemo(() => initialData || FALLBACK_DATASETS['milk-7day'], [initialData]);

  // Model parameters (Slope m, Intercept c)
  const [m, setM] = useState<number>(0);
  const [c, setC] = useState<number>(2000);
  const [learningRate, setLearningRate] = useState<number>(0.02);
  const [loss, setLoss] = useState<number>(0);
  const [isAutoFitting, setIsAutoFitting] = useState<boolean>(false);
  const [isDiverging, setIsDiverging] = useState<boolean>(false);
  const [errorMode, setErrorMode] = useState<'linear' | 'squared'>('squared');

  // Loss Surface Data
  const [surfaceData, setSurfaceData] = useState<LossSurfaceResult | null>(null);
  const [history, setHistory] = useState<{ m: number; c: number; loss: number }[]>([]);

  // Calculate loss locally on change
  const currentLoss = useMemo(() => {
    let sum = 0;
    for (const p of data) {
      const pred = m * p.x + c;
      const err = pred - p.y;
      sum += errorMode === 'squared' ? err * err : Math.abs(err);
    }
    return sum / data.length;
  }, [m, c, data, errorMode]);

  useEffect(() => {
    setLoss(currentLoss);
    if (onStateChange) onStateChange(m, c, currentLoss);
  }, [m, c, currentLoss, onStateChange]);

  // Compute Loss surface on mount or data change
  useEffect(() => {
    computeLossSurfaceApi(data, -40, 120, 1600, 2600, 24).then((res) => {
      setSurfaceData(res.result);
    });
  }, [data]);

  // Reset to initial baseline
  const handleReset = () => {
    setIsAutoFitting(false);
    setIsDiverging(false);
    setM(0);
    setC(2000);
    setHistory([]);
  };

  // Closed form exact fit (Reveal Optimal)
  const handleSnapToFit = async () => {
    setIsAutoFitting(false);
    setIsDiverging(false);
    const { result } = await fitLinearRegressionApi(data);
    setM(Number(result.m.toFixed(2)));
    setC(Number(result.c.toFixed(2)));
    setHistory((prev) => [...prev, { m: result.m, c: result.c, loss: result.mse }]);
  };

  // Perform single gradient step
  const handleStep = async (stepLR = learningRate) => {
    const { result } = await stepLinearRegressionApi(m, c, stepLR, data);
    
    // Check divergence threshold
    if (Math.abs(result.new_m) > 500 || result.loss > 5000000) {
      setIsDiverging(true);
      setIsAutoFitting(false);
    }

    setM(Number(result.new_m.toFixed(2)));
    setC(Number(result.new_c.toFixed(2)));
    setHistory((prev) => [...prev.slice(-40), { m: result.new_m, c: result.new_c, loss: result.loss }]);
  };

  // Auto-fit loop with requestAnimationFrame
  const animationRef = useRef<number | null>(null);
  useEffect(() => {
    if (!isAutoFitting) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    let count = 0;
    const maxSteps = 45;

    const runLoop = async () => {
      if (count >= maxSteps || isDiverging) {
        setIsAutoFitting(false);
        return;
      }
      count++;
      await handleStep(learningRate);
      animationRef.current = requestAnimationFrame(runLoop);
    };

    animationRef.current = requestAnimationFrame(runLoop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isAutoFitting, isDiverging, m, c, learningRate]);

  // Set blowup LR
  const handleTriggerBlowup = () => {
    setM(20);
    setC(2100);
    setLearningRate(0.35);
    setIsDiverging(false);
    setIsAutoFitting(true);
  };

  // Points for chart
  const chartPoints: ChartPoint[] = useMemo(() => {
    return data.map((d: DataPoint) => ({
      x: d.x,
      y: d.y,
      label: d.label,
      color: '#60a5fa',
    }));
  }, [data]);

  // Next-day prediction (x=8)
  const tomorrowPrediction = Math.round(m * 8 + c);

  return (
    <div className="space-y-6">
      {/* Top Controls & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoFitting(!isAutoFitting)}
            disabled={isDiverging}
            className={`button-primary text-sm ${isAutoFitting ? 'bg-amber-600 hover:bg-amber-500' : ''}`}
          >
            {isAutoFitting ? (
              <>
                <RotateCcw size={16} className="animate-spin" /> Auto-Fitting...
              </>
            ) : (
              <>
                <Play size={16} /> Auto-Fit (Gradient Descent)
              </>
            )}
          </button>

          <button
            onClick={() => handleStep()}
            disabled={isAutoFitting || isDiverging}
            className="button-secondary text-sm"
          >
            Single Step
          </button>

          <button onClick={handleSnapToFit} className="button-secondary text-sm text-emerald-300">
            <Zap size={14} className="text-emerald-400" /> Snap to Closed-Form OLS
          </button>

          <button onClick={handleReset} className="button-secondary text-sm text-slate-400">
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTriggerBlowup}
            className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 text-xs font-mono font-bold flex items-center gap-1.5"
            title="Demonstrates what happens when learning rate is set too large"
          >
            <AlertTriangle size={13} /> Test Learning Rate Blow-Up (LR=0.35)
          </button>
          <BackendBadge />
        </div>
      </div>

      {isDiverging && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/60 text-rose-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-rose-400 shrink-0" />
            <span>
              <strong>Divergence Alert!</strong> The learning rate (LR={learningRate}) was too large; the parameter updates overshot the valley and rocketed to infinity!
            </span>
          </div>
          <button onClick={handleReset} className="px-3 py-1 bg-rose-800 hover:bg-rose-700 text-white rounded font-bold">
            Reset to Safety
          </button>
        </div>
      )}

      {/* Two Column Layout: Fit Chart (Left) + Loss Landscape (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Interactive Fit Chart */}
        <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold uppercase">1. Milk Collection vs. Day</span>
                <h4 className="text-lg font-bold text-white">Line of Best Fit: y = {m}x + {c}</h4>
              </div>
              
              {/* Residuals Toggle */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
                <button
                  onClick={() => setErrorMode('linear')}
                  className={`px-2 py-0.5 rounded ${errorMode === 'linear' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                >
                  Absolute Residuals
                </button>
                <button
                  onClick={() => setErrorMode('squared')}
                  className={`px-2 py-0.5 rounded ${errorMode === 'squared' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                >
                  Squared Error (MSE)
                </button>
              </div>
            </div>

            <Chart
              points={chartPoints}
              lines={[
                {
                  slope: m,
                  intercept: c,
                  color: '#38bdf8',
                  strokeWidth: 3,
                  label: `y = ${m}x + ${c}`,
                },
              ]}
              showResiduals={true}
              residualLine={{ slope: m, intercept: c }}
              squareResiduals={errorMode === 'squared'}
              highlightPoints={
                userGuess
                  ? [{ x: 8, y: userGuess, color: '#f59e0b', label: `Your Guess: ${userGuess} L` }]
                  : [{ x: 8, y: tomorrowPrediction, color: '#34d399', label: `Model Day 8: ${tomorrowPrediction} L` }]
              }
              xMin={0}
              xMax={9}
              yMin={1800}
              yMax={2700}
              xLabel="Day of Week (1=Mon ... 7=Sun, 8=Mon Forecast)"
              yLabel="Milk Intake (Litres)"
              height={320}
            />
          </div>

          {/* Sliders for m (weight) and c (bias) */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <span className="text-sky-400 text-sm">m</span> (Slope / <strong className="text-purple-300">Weight</strong>): {m} L/day
                </span>
                <span className="text-slate-500">Range: -30 to 90</span>
              </div>
              <input
                type="range"
                min="-30"
                max="90"
                step="0.5"
                value={m}
                onChange={(e) => setM(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <span className="text-sky-400 text-sm">c</span> (Intercept / <strong className="text-purple-300">Bias</strong>): {c} L
                </span>
                <span className="text-slate-500">Range: 1800 to 2500</span>
              </div>
              <input
                type="range"
                min="1800"
                max="2500"
                step="5"
                value={c}
                onChange={(e) => setC(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>
          </div>
        </div>

        {/* Right Column: 2D Loss Landscape Surface Heatmap */}
        <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">2. The 2D Loss Surface (MSE)</span>
                <h4 className="text-lg font-bold text-white">Rolling the Marker Downhill</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Current Error</span>
                <span className="text-sm font-mono font-bold text-rose-400">
                  {errorMode === 'squared' ? `MSE: ${Math.round(loss).toLocaleString()}` : `MAE: ${Math.round(loss)} L`}
                </span>
              </div>
            </div>

            {/* SVG Loss Landscape Heatmap */}
            <div className="relative w-full h-[300px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Render Contour/Heatmap cells if available */}
                {surfaceData &&
                  surfaceData.surface.map((row, rIdx) => {
                    const cellHeight = 300 / surfaceData.surface.length;
                    return row.map((val, cIdx) => {
                      const cellWidth = 400 / row.length;
                      // Normalize loss to 0..1 for color
                      const norm = Math.min(1, Math.max(0, Math.log(val + 1) / Math.log(200000)));
                      // Hue from blue (low) to purple/red (high)
                      const hue = (1 - norm) * 220; // 220 = blue, 0 = red
                      return (
                        <rect
                          key={`cell-${rIdx}-${cIdx}`}
                          x={cIdx * cellWidth}
                          y={rIdx * cellHeight}
                          width={cellWidth + 0.5}
                          height={cellHeight + 0.5}
                          fill={`hsl(${hue}, 70%, ${15 + (1 - norm) * 25}%)`}
                        />
                      );
                    });
                  })}

                {/* Contour Iso-lines Simulation */}
                <ellipse cx="230" cy="180" rx="35" ry="25" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="230" cy="180" rx="75" ry="55" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="230" cy="180" rx="125" ry="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                {/* Global Minimum Star */}
                <circle cx="230" cy="180" r="4" fill="#34d399" />
                <text x="230" y="170" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                  Optimal Basin (Minimum Loss)
                </text>

                {/* Trajectory line from history */}
                {history.length > 1 && (
                  <path
                    d={history.reduce((acc, pt, i) => {
                      // Map m: -40..120 -> 0..400; c: 1600..2600 -> 300..0
                      const px = ((pt.m - -40) / 160) * 400;
                      const py = 300 - ((pt.c - 1600) / 1000) * 300;
                      return i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
                    }, '')}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Current Parameter Marker */}
                {(() => {
                  const px = Math.min(390, Math.max(10, ((m - -40) / 160) * 400));
                  const py = Math.min(290, Math.max(10, 300 - ((c - 1600) / 1000) * 300));
                  return (
                    <g>
                      <circle cx={px} cy={py} r="10" fill="rgba(245, 158, 11, 0.4)" className="animate-ping" />
                      <circle cx={px} cy={py} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                      <text x={px} y={py - 12} textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
                        (m={m}, c={c})
                      </text>
                    </g>
                  );
                })()}
              </svg>

              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-1 rounded">
                X: Slope (m) | Y: Intercept (c)
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed font-mono">
            <strong>Training = Rolling Downhill: </strong>
            Every neural network (including ChatGPT) trains by this exact calculus: evaluating the gradient of the surface and nudging weights downhill until loss stabilizes at the basin.
          </div>
        </div>

      </div>

      {/* Metrics Summary Strip */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Current Weight (m)</span>
          <span className="text-lg font-bold text-white font-mono">{m} L/day</span>
        </div>
        <div>
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Current Bias (c)</span>
          <span className="text-lg font-bold text-white font-mono">{c} L</span>
        </div>
        <div>
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Root Mean Sq Error (RMSE)</span>
          <span className="text-lg font-bold text-sky-400 font-mono">± {Math.round(Math.sqrt(loss))} Litres</span>
        </div>
        <div>
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Tomorrow Forecast (Day 8)</span>
          <span className="text-lg font-bold text-emerald-400 font-mono">{tomorrowPrediction} Litres</span>
        </div>
      </div>
    </div>
  );
}
