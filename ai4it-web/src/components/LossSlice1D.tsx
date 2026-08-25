'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface LossSlice1DProps {
  isRevealed: boolean;
  className?: string;
}

export default function LossSlice1D({ isRevealed, className = '' }: LossSlice1DProps) {
  const width = 440;
  const height = 240;
  const padding = { top: 30, right: 35, bottom: 45, left: 60 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Bounds: m from -20 to 110, Loss from 0 to 100,000
  const scaleM = (m: number) => Number((padding.left + ((m - -20) / 130) * plotWidth).toFixed(2));
  const scaleLoss = (loss: number) => Number((padding.top + plotHeight - (loss / 100000) * plotHeight).toFixed(2));

  // Generate smooth convex bowl curve for L(m) at fixed c = 2000
  const points: { x: number; y: number }[] = [];
  for (let mVal = -20; mVal <= 110; mVal += 2) {
    // Exact parabola: minimum near m ≈ 53 at fixed c=2000
    const lossVal = 22.8 * Math.pow(mVal - 53.14, 2) + 26600;
    points.push({
      x: scaleM(mVal),
      y: scaleLoss(Math.min(98000, Math.max(2000, lossVal))),
    });
  }

  const pathD = points.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '');

  const startPtX = scaleM(0);
  const startPtY = scaleLoss(91014);

  const optPtX = scaleM(53.14);
  const optPtY = scaleLoss(26600);

  return (
    <div className={`p-6 rounded-2xl bg-slate-950/95 border border-slate-800 space-y-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
            Loss Space View · 1D Slice at Fixed Intercept (c = 2,000 L)
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">
            Loss L vs. Slope m: Visualizing the Downhill Slope
          </h4>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
          Bowl Minimum at m ≈ 53.1
        </span>
      </div>

      <div className="relative w-full h-[240px] bg-slate-900/90 rounded-xl overflow-hidden border border-slate-800/80 flex items-center justify-center select-none">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <defs>
            <linearGradient id="bowlGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Axes */}
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1.5" />
          <line x1={padding.left} y1={padding.top + plotHeight} x2={padding.left + plotWidth} y2={padding.top + plotHeight} stroke="#334155" strokeWidth="1.5" />

          {/* Y Axis Ticks */}
          {[0, 30000, 60000, 90000].map((tVal) => (
            <g key={tVal}>
              <line x1={padding.left - 4} y1={scaleLoss(tVal)} x2={padding.left + plotWidth} y2={scaleLoss(tVal)} stroke="#1e293b" strokeDasharray="3 3" />
              <text x={padding.left - 8} y={scaleLoss(tVal) + 4} textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">
                {(tVal / 1000).toFixed(0)}k
              </text>
            </g>
          ))}

          {/* X Axis Ticks */}
          {[-20, 0, 20, 40, 60, 80, 100].map((mVal) => (
            <g key={mVal}>
              <line x1={scaleM(mVal)} y1={padding.top} x2={scaleM(mVal)} y2={padding.top + plotHeight + 4} stroke="#1e293b" strokeDasharray="3 3" />
              <text x={scaleM(mVal)} y={padding.top + plotHeight + 16} textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
                {mVal}
              </text>
            </g>
          ))}

          {/* Axis Titles */}
          <text x={padding.left + plotWidth / 2} y={height - 8} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">
            Slope Parameter m (Litres / Day)
          </text>
          <text x={18} y={padding.top + plotHeight / 2} textAnchor="middle" transform={`rotate(-90 18 ${padding.top + plotHeight / 2})`} fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">
            Loss L (MSE)
          </text>

          {/* Shaded Area beneath the bowl */}
          <path d={`${pathD} L ${scaleM(110)} ${padding.top + plotHeight} L ${scaleM(-20)} ${padding.top + plotHeight} Z`} fill="url(#bowlGradient)" />

          {/* The Bowl Curve Line */}
          <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="3" />

          {/* Minimum Basin */}
          <circle cx={optPtX} cy={optPtY} r="4" fill="#34d399" />
          <line x1={optPtX} y1={optPtY} x2={optPtX} y2={padding.top + plotHeight} stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" />
          <text x={optPtX} y={optPtY - 8} textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace">
            Lowest Loss Basin (m ≈ 53.1)
          </text>

          {/* Initial State Marker: m = 0, Loss ≈ 91,014 */}
          <circle cx={startPtX} cy={startPtY} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
          <text x={startPtX + 10} y={startPtY - 6} fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">
            Start: m = 0 (Loss: 91,014)
          </text>

          {/* Tangent Slope Vector & Downhill Arrow */}
          {isRevealed && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Tangent line at m=0 */}
              <line
                x1={startPtX - 30}
                y1={startPtY - 35}
                x2={startPtX + 45}
                y2={startPtY + 52}
                stroke="#ec4899"
                strokeWidth="3"
                strokeDasharray="4 2"
              />
              
              {/* Downhill Rolling Arrow */}
              <motion.g
                initial={{ x: 0 }}
                animate={{ x: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              >
                <path d={`M ${startPtX + 15} ${startPtY + 25} L ${startPtX + 45} ${startPtY + 45} L ${startPtX + 40} ${startPtY + 32} Z`} fill="#ec4899" />
              </motion.g>

              {/* Annotation Badge */}
              <rect x={startPtX + 50} y={startPtY + 12} width="165" height="28" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
              <text x={startPtX + 58} y={startPtY + 30} fill="#c7d2fe" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Slope &lt; 0 &rarr; Increase m Downhill
              </text>
            </motion.g>
          )}
        </svg>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
        {isRevealed ? (
          <p className="text-emerald-300">
            <strong>How Calculus Acts as the Compass:</strong> The tangent slope at m = 0 is steep and negative (∂L/∂m = -2,657.14). Because slope measures change going left-to-right, a negative slope means the bowl slopes <em>downward to the right</em>. Therefore, to minimize loss, the algorithm increases m toward 53.14!
          </p>
        ) : (
          <p className="text-slate-400">
            Select an option in the guess prompt above to calculate the local tangent slope and reveal which way is downhill.
          </p>
        )}
      </div>
    </div>
  );
}
