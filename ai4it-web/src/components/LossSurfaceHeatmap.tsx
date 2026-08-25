'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { LossSurfaceResult } from '@/lib/api';

interface LossSurfaceHeatmapProps {
  surfaceData: LossSurfaceResult | null;
  currentM: number;
  currentC: number;
  history?: { m: number; c: number; loss: number }[];
  isMiniPreview?: boolean;
  className?: string;
  isDiverging?: boolean;
}

export default function LossSurfaceHeatmap({
  surfaceData,
  currentM,
  currentC,
  history = [],
  isMiniPreview = false,
  className = '',
  isDiverging = false,
}: LossSurfaceHeatmapProps) {
  // Mapping bounds: m (-40 to 120), c (1600 to 2600)
  const mMin = -40;
  const mMax = 120;
  const cMin = 1600;
  const cMax = 2600;

  const width = isMiniPreview ? 260 : 400;
  const height = isMiniPreview ? 180 : 300;

  const scaleM = (val: number) => {
    return Math.min(width - 8, Math.max(8, ((val - mMin) / (mMax - mMin)) * width));
  };

  const scaleC = (val: number) => {
    return Math.min(height - 8, Math.max(8, height - ((val - cMin) / (cMax - cMin)) * height));
  };

  const markerX = scaleM(currentM);
  const markerY = scaleC(currentC);

  // Optimal target (m ≈ 47.86, c ≈ 2092.86)
  const optX = scaleM(47.86);
  const optY = scaleC(2092.86);

  return (
    <div className={`relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        style={{ width: '100%', height: isMiniPreview ? '180px' : '300px' }}
      >
        {/* Render Contour/Heatmap cells */}
        {surfaceData &&
          surfaceData.surface.map((row, rIdx) => {
            const cellHeight = height / surfaceData.surface.length;
            return row.map((val, cIdx) => {
              const cellWidth = width / row.length;
              const norm = Math.min(1, Math.max(0, Math.log(val + 1) / Math.log(250000)));
              const hue = (1 - norm) * 220; // 220 = blue/valley, 0 = red/steep
              return (
                <rect
                  key={`cell-${rIdx}-${cIdx}`}
                  x={cIdx * cellWidth}
                  y={rIdx * cellHeight}
                  width={cellWidth + 0.5}
                  height={cellHeight + 0.5}
                  fill={`hsl(${hue}, 75%, ${12 + (1 - norm) * 28}%)`}
                />
              );
            });
          })}

        {/* Contour Iso-lines Simulation */}
        <ellipse cx={optX} cy={optY} rx={width * 0.1} ry={height * 0.09} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="3 3" />
        <ellipse cx={optX} cy={optY} rx={width * 0.22} ry={height * 0.2} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
        <ellipse cx={optX} cy={optY} rx={width * 0.36} ry={height * 0.32} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

        {/* Global Minimum Basin */}
        <circle cx={optX} cy={optY} r={isMiniPreview ? 3 : 4} fill="#34d399" />
        {!isMiniPreview && (
          <text x={optX} y={optY - 8} textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
            Optimal Basin (Min Loss)
          </text>
        )}

        {/* Incremental Trajectory History Path */}
        {history.length > 1 && (
          <path
            d={history.reduce((acc, pt, i) => {
              const px = scaleM(pt.m);
              const py = scaleC(pt.c);
              return i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
            }, '')}
            fill="none"
            stroke="#f59e0b"
            strokeWidth={isMiniPreview ? '1.5' : '2'}
            strokeDasharray="2 2"
            opacity={0.85}
          />
        )}

        {/* Animated Parameter Marker with Eased Motion */}
        <motion.g
          animate={{ x: markerX, y: markerY }}
          transition={{ type: 'spring', damping: 25, stiffness: 140 }}
        >
          {isDiverging ? (
            <>
              <circle cx={0} cy={0} r={16} fill="rgba(244, 63, 94, 0.4)" className="animate-ping" />
              <circle cx={0} cy={0} r={8} fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
            </>
          ) : (
            <>
              <circle cx={0} cy={0} r={isMiniPreview ? 8 : 10} fill="rgba(245, 158, 11, 0.35)" />
              <circle cx={0} cy={0} r={isMiniPreview ? 4 : 5.5} fill="#f59e0b" stroke="#ffffff" strokeWidth={1.5} />
            </>
          )}

          {!isMiniPreview && (
            <text
              x={0}
              y={-10}
              textAnchor="middle"
              fill={isDiverging ? '#f43f5e' : '#f59e0b'}
              fontSize="10"
              fontWeight="bold"
              className="select-none pointer-events-none drop-shadow-md"
            >
              ({currentM.toFixed(1)}, {currentC.toFixed(0)})
            </text>
          )}
        </motion.g>
      </svg>

      <div className={`absolute bottom-2 left-2 text-[9px] font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800/80 ${isMiniPreview ? 'text-[8px] py-0' : ''}`}>
        {isMiniPreview ? '2D Loss Landscape' : 'X: Weight (m) · Y: Bias (c)'}
      </div>
    </div>
  );
}
