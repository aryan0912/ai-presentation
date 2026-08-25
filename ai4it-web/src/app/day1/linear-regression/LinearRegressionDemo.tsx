'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Chart, { ChartPoint } from '@/components/Chart';
import BackendBadge from '@/components/BackendBadge';
import LossSurfaceHeatmap from '@/components/LossSurfaceHeatmap';
import {
  stepLinearRegressionApi,
  computeLossSurfaceApi,
  fitLinearRegressionApi,
  DataPoint,
  LossSurfaceResult,
  FALLBACK_DATASETS
} from '@/lib/api';
import { Play, RotateCcw, Zap, AlertTriangle, CheckCircle2, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [showStepInspector, setShowStepInspector] = useState<boolean>(false);

  // Loss Surface & Convergence History Data
  const [surfaceData, setSurfaceData] = useState<LossSurfaceResult | null>(null);
  const [history, setHistory] = useState<{ step: number; m: number; c: number; loss: number; dL_dm?: number; dL_dc?: number }[]>([]);
  const tableScrollRef = useRef<HTMLDivElement | null>(null);

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

  // Auto-scroll Step History table on new entries
  useEffect(() => {
    if (tableScrollRef.current) {
      tableScrollRef.current.scrollTop = tableScrollRef.current.scrollHeight;
    }
  }, [history.length]);

  // Reset to initial baseline
  const handleReset = () => {
    setIsAutoFitting(false);
    setIsDiverging(false);
    setM(0);
    setC(2000);
    setLearningRate(0.02);
    setHistory([]);
  };

  // Closed form exact fit (Reveal Optimal)
  const handleSnapToFit = async () => {
    setIsAutoFitting(false);
    setIsDiverging(false);
    const { result } = await fitLinearRegressionApi(data);
    setM(Number(result.m.toFixed(2)));
    setC(Number(result.c.toFixed(2)));
    setHistory((prev) => [
      ...prev,
      { step: prev.length + 1, m: result.m, c: result.c, loss: result.mse }
    ]);
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
    
    setHistory((prev) => [
      ...prev.slice(-45),
      {
        step: prev.length + 1,
        m: result.new_m,
        c: result.new_c,
        loss: result.loss,
        dL_dm: result.grad_m ?? (m - result.new_m) / stepLR,
        dL_dc: result.grad_c ?? (c - result.new_c) / stepLR,
      }
    ]);
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

  // Latest gradient calculation values
  const lastStep = history.length > 0 ? history[history.length - 1] : null;

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

            {/* Reusable Loss Surface Heatmap */}
            <LossSurfaceHeatmap
              surfaceData={surfaceData}
              currentM={m}
              currentC={c}
              history={history}
              isDiverging={isDiverging}
            />
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed font-mono">
            <strong>Training = Rolling Downhill: </strong>
            Every neural network (including ChatGPT) trains by this exact calculus: evaluating the gradient of the surface and nudging weights downhill until loss stabilizes at the basin.
          </div>
        </div>

      </div>

      {/* Real-Time Step Math Inspector (Shows Exact Arithmetic for Last Step) */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <button
          onClick={() => setShowStepInspector(!showStepInspector)}
          className="w-full flex items-center justify-between text-xs font-mono font-bold text-slate-300 hover:text-white"
        >
          <div className="flex items-center gap-2">
            <span className="text-amber-400">Step Calculation Math Inspector</span>
            <span className="text-slate-500 font-normal">
              {lastStep ? `(Step #${lastStep.step}: m=${lastStep.m.toFixed(2)}, c=${lastStep.c.toFixed(2)})` : '(Click Single Step to view calculations)'}
            </span>
          </div>
          {showStepInspector ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showStepInspector && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3 font-mono text-xs text-slate-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Current Parameters:</span>
                <span className="text-sky-300 font-bold">m = {m.toFixed(2)}, c = {c.toFixed(2)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Evaluated MSE Loss:</span>
                <span className="text-rose-300 font-bold">{Math.round(loss).toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Weight Gradient (∂L/∂m):</span>
                <span className="text-purple-300 font-bold">
                  {lastStep?.dL_dm !== undefined ? lastStep.dL_dm.toFixed(2) : '—'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Bias Gradient (∂L/∂c):</span>
                <span className="text-purple-300 font-bold">
                  {lastStep?.dL_dc !== undefined ? lastStep.dL_dc.toFixed(2) : '—'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-300">Computer's Update Arithmetic: </strong>
              <code>m_next = {m.toFixed(2)} - ({learningRate} × {lastStep?.dL_dm?.toFixed(2) ?? '0.00'})</code> &nbsp;|&nbsp; 
              <code>c_next = {c.toFixed(2)} - ({learningRate} × {lastStep?.dL_dc?.toFixed(2) ?? '0.00'})</code>
            </div>
          </div>
        )}
      </div>

      {/* NEW: Loss vs. Epochs / Iterations Convergence Curve */}
      {history.length > 1 && (
        <div className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                Model Convergence Curve
              </span>
              <h4 className="text-sm font-bold text-white">Loss vs. Steps / Epochs</h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Initial: {Math.round(history[0].loss).toLocaleString()} &rarr; Final: {Math.round(history[history.length - 1].loss).toLocaleString()}
            </span>
          </div>

          <Chart
            points={history.map((h) => ({ x: h.step, y: h.loss }))}
            lines={[
              {
                points: history.map((h) => ({ x: h.step, y: h.loss })),
                color: '#34d399',
                strokeWidth: 2.5,
                label: 'MSE Loss Trajectory',
              },
            ]}
            xLabel="Training Step / Epoch (Click Auto-Fit to watch curve plateau)"
            yLabel="Loss (MSE)"
            height={200}
          />
          <p className="text-[11px] text-slate-400 font-mono">
            Notice how loss plummets rapidly in the first 2-3 steps, then smoothly flattens out (converges) as the parameters settle into the valley basin!
          </p>
        </div>
      )}

      {/* Step History Log — auto-scrollable audit trail */}
      {history.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white">Step History — every update, in order</h4>
            <span className="text-[10px] font-mono text-slate-500">{history.length} step{history.length === 1 ? '' : 's'} recorded</span>
          </div>
          <div ref={tableScrollRef} className="overflow-x-auto max-h-48 overflow-y-auto">
            <table className="w-full text-center border-collapse text-[11px] font-mono">
              <thead className="sticky top-0 bg-slate-950">
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-1.5 px-3">Step #</th>
                  <th className="py-1.5 px-3">m (weight)</th>
                  <th className="py-1.5 px-3">c (bias)</th>
                  <th className="py-1.5 px-3">Loss (MSE)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {history.map((h, idx) => (
                  <tr key={idx} className={idx === history.length - 1 ? 'text-emerald-400 font-bold' : ''}>
                    <td className="py-1 px-3">{h.step}</td>
                    <td className="py-1 px-3">{h.m.toFixed(2)}</td>
                    <td className="py-1 px-3">{h.c.toFixed(2)}</td>
                    <td className="py-1 px-3">{Math.round(h.loss).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
