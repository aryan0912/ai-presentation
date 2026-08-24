'use client';
import React, { useMemo } from 'react';

export interface ChartPoint {
  x: number;
  y: number;
  label?: string;
  color?: string;
  radius?: number;
}

export interface ChartLine {
  id?: string;
  points?: { x: number; y: number }[];
  slope?: number;
  intercept?: number;
  color?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  label?: string;
}

export interface ChartProps {
  width?: number | string;
  height?: number;
  points?: ChartPoint[];
  lines?: ChartLine[];
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  xLabel?: string;
  yLabel?: string;
  showResiduals?: boolean;
  residualLine?: { slope: number; intercept: number };
  squareResiduals?: boolean;
  highlightPoints?: { x: number; y: number; color?: string; label?: string }[];
  title?: string;
  className?: string;
}

export default function Chart({
  width = '100%',
  height = 360,
  points = [],
  lines = [],
  xMin: explicitXMin,
  xMax: explicitXMax,
  yMin: explicitYMin,
  yMax: explicitYMax,
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
  showResiduals = false,
  residualLine,
  squareResiduals = false,
  highlightPoints = [],
  title,
  className = '',
}: ChartProps) {
  const margin = { top: 35, right: 35, bottom: 45, left: 60 };
  const viewBoxWidth = 600;
  const viewBoxHeight = 360;
  const plotWidth = viewBoxWidth - margin.left - margin.right;
  const plotHeight = viewBoxHeight - margin.top - margin.bottom;

  const { xMin, xMax, yMin, yMax } = useMemo(() => {
    let allX: number[] = points.map((p) => p.x);
    let allY: number[] = points.map((p) => p.y);
    highlightPoints.forEach((p) => {
      allX.push(p.x);
      allY.push(p.y);
    });

    if (allX.length === 0) allX = [0, 10];
    if (allY.length === 0) allY = [0, 100];

    const computedXMin = explicitXMin ?? Math.min(...allX);
    const computedXMax = explicitXMax ?? Math.max(...allX);
    const computedYMin = explicitYMin ?? Math.min(...allY);
    const computedYMax = explicitYMax ?? Math.max(...allY);

    const xPadding = (computedXMax - computedXMin) * 0.08 || 1;
    const yPadding = (computedYMax - computedYMin) * 0.08 || 10;

    return {
      xMin: explicitXMin ?? Math.floor(computedXMin - xPadding),
      xMax: explicitXMax ?? Math.ceil(computedXMax + xPadding),
      yMin: explicitYMin ?? Math.floor(computedYMin - yPadding),
      yMax: explicitYMax ?? Math.ceil(computedYMax + yPadding),
    };
  }, [points, highlightPoints, explicitXMin, explicitXMax, explicitYMin, explicitYMax]);

  const scaleX = (x: number) => {
    if (xMax === xMin) return margin.left + plotWidth / 2;
    return margin.left + ((x - xMin) / (xMax - xMin)) * plotWidth;
  };

  const scaleY = (y: number) => {
    if (yMax === yMin) return margin.top + plotHeight / 2;
    return margin.top + plotHeight - ((y - yMin) / (yMax - yMin)) * plotHeight;
  };

  // Generate grid ticks
  const xTicks = useMemo(() => {
    const ticks = [];
    const count = 6;
    for (let i = 0; i <= count; i++) {
      const val = xMin + (i / count) * (xMax - xMin);
      ticks.push(Number(val.toFixed(1)));
    }
    return ticks;
  }, [xMin, xMax]);

  const yTicks = useMemo(() => {
    const ticks = [];
    const count = 5;
    for (let i = 0; i <= count; i++) {
      const val = yMin + (i / count) * (yMax - yMin);
      ticks.push(Number(val.toFixed(0)));
    }
    return ticks;
  }, [yMin, yMax]);

  return (
    <div className={`relative w-full ${className}`} style={{ width, height }}>
      {title && (
        <div className="text-xs font-semibold text-slate-400 mb-1 flex items-center justify-between">
          <span>{title}</span>
        </div>
      )}
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-full overflow-visible select-none"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
      >
        <defs>
          <linearGradient id="chartGridGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Plot Background */}
        <rect
          x={margin.left}
          y={margin.top}
          width={plotWidth}
          height={plotHeight}
          fill="url(#chartGridGradient)"
          rx={6}
          stroke="rgba(255,255,255,0.06)"
        />

        {/* Y Grid & Labels */}
        {yTicks.map((tick, i) => {
          const y = scaleY(tick);
          return (
            <g key={`y-${i}`}>
              <line
                x1={margin.left}
                y1={y}
                x2={margin.left + plotWidth}
                y2={y}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />
              <text
                x={margin.left - 10}
                y={y + 4}
                textAnchor="end"
                fill="#64748b"
                fontSize="11"
                fontFamily="system-ui, sans-serif"
              >
                {tick.toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* X Grid & Labels */}
        {xTicks.map((tick, i) => {
          const x = scaleX(tick);
          return (
            <g key={`x-${i}`}>
              <line
                x1={x}
                y1={margin.top}
                x2={x}
                y2={margin.top + plotHeight}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="3 3"
              />
              <text
                x={x}
                y={margin.top + plotHeight + 18}
                textAnchor="middle"
                fill="#64748b"
                fontSize="11"
                fontFamily="system-ui, sans-serif"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* Axis Titles */}
        <text
          x={margin.left + plotWidth / 2}
          y={margin.top + plotHeight + 38}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="11"
          fontWeight="600"
        >
          {xLabel}
        </text>
        <text
          x={-(margin.top + plotHeight / 2)}
          y={margin.left - 42}
          textAnchor="middle"
          transform="rotate(-90)"
          fill="#94a3b8"
          fontSize="11"
          fontWeight="600"
        >
          {yLabel}
        </text>

        {/* Residuals (Error Bars / Squares) */}
        {showResiduals && residualLine && (
          <g className="residuals">
            {points.map((p, idx) => {
              const predY = residualLine.slope * p.x + residualLine.intercept;
              const px = scaleX(p.x);
              const py = scaleY(p.y);
              const predPy = scaleY(predY);
              const diffY = predPy - py;
              const side = Math.abs(diffY);

              return (
                <g key={`res-${idx}`}>
                  {squareResiduals ? (
                    <rect
                      x={px}
                      y={Math.min(py, predPy)}
                      width={side}
                      height={side}
                      fill="rgba(239, 68, 68, 0.15)"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  ) : (
                    <line
                      x1={px}
                      y1={py}
                      x2={px}
                      y2={predPy}
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* Drawn Lines */}
        {lines.map((line, idx) => {
          let x1 = xMin;
          let x2 = xMax;
          let y1 = line.points ? line.points[0]?.y : (line.slope ?? 0) * x1 + (line.intercept ?? 0);
          let y2 = line.points
            ? line.points[line.points.length - 1]?.y
            : (line.slope ?? 0) * x2 + (line.intercept ?? 0);

          if (line.points && line.points.length > 2) {
            const pathD = line.points.reduce((acc, pt, i) => {
              const px = scaleX(pt.x);
              const py = scaleY(pt.y);
              return i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
            }, '');
            return (
              <path
                key={`line-${idx}`}
                d={pathD}
                fill="none"
                stroke={line.color || '#3b82f6'}
                strokeWidth={line.strokeWidth || 3}
                strokeDasharray={line.strokeDasharray}
              />
            );
          }

          return (
            <line
              key={`line-${idx}`}
              x1={scaleX(x1)}
              y1={scaleY(y1)}
              x2={scaleX(x2)}
              y2={scaleY(y2)}
              stroke={line.color || '#3b82f6'}
              strokeWidth={line.strokeWidth || 3}
              strokeDasharray={line.strokeDasharray}
            />
          );
        })}

        {/* Scatter Points */}
        {points.map((p, idx) => {
          const cx = scaleX(p.x);
          const cy = scaleY(p.y);
          return (
            <g key={`pt-${idx}`} className="transition-all duration-300">
              <circle
                cx={cx}
                cy={cy}
                r={p.radius || 6}
                fill={p.color || '#60a5fa'}
                stroke="#0b0f19"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.7))' }}
              />
              {p.label && (
                <text
                  x={cx}
                  y={cy - 10}
                  textAnchor="middle"
                  fill="#cbd5e1"
                  fontSize="10"
                  fontWeight="600"
                >
                  {p.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Highlight User / Guest Points */}
        {highlightPoints.map((p, idx) => {
          const cx = scaleX(p.x);
          const cy = scaleY(p.y);
          return (
            <g key={`hl-${idx}`}>
              <circle
                cx={cx}
                cy={cy}
                r={9}
                fill="none"
                stroke={p.color || '#f59e0b'}
                strokeWidth="2.5"
                strokeDasharray="3 2"
              />
              <circle cx={cx} cy={cy} r={5} fill={p.color || '#f59e0b'} />
              {p.label && (
                <text
                  x={cx}
                  y={cy - 12}
                  textAnchor="middle"
                  fill={p.color || '#f59e0b'}
                  fontSize="11"
                  fontWeight="bold"
                >
                  {p.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
