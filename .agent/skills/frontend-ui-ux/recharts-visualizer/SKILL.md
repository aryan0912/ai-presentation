---
name: recharts-visualizer
description: Reactive graphs, SVG scatter plots, line charts, loss curves, and tensor heatmaps for AI data visualization.
---

# Recharts Visualizer Skill: Interactive Charts & Tensor Heatmaps

Use this skill to implement clean, performant, and responsive charts for machine learning curves (loss progression, training vs validation), 2D scatter plots with decision boundaries, and 2D tensor/attention heatmaps.

## Visualization Patterns

### 1. Training Loss & Metric Progression (Recharts)
```tsx
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface LossPoint {
  epoch: number;
  loss: number;
  valLoss?: number;
}

export function LossChart({ data }: { data: LossPoint[] }) {
  return (
    <div className="w-full h-64 bg-slate-900/50 p-4 rounded-xl border border-white/5">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="epoch" stroke="#64748b" tick={{ fontSize: 12 }} />
          <YAxis stroke="#64748b" tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
            itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
          />
          <Line type="monotone" dataKey="loss" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
          {data[0]?.valLoss !== undefined && (
            <Line type="monotone" dataKey="valLoss" stroke="#ec4899" strokeWidth={2} dot={false} strokeDasharray="4 4" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### 2. Attention Weight & 2D Tensor Heatmap
```tsx
export function AttentionHeatmap({ matrix, tokens }: { matrix: number[][], tokens: string[] }) {
  return (
    <div className="overflow-x-auto p-4 bg-slate-900/60 rounded-xl border border-white/10">
      <div className="grid" style={{ gridTemplateColumns: `auto repeat(${tokens.length}, minmax(40px, 1fr))` }}>
        {/* Header Row */}
        <div className="p-2 font-mono text-xs text-slate-500">Tokens</div>
        {tokens.map((tok, i) => (
          <div key={i} className="p-2 text-center font-mono text-xs text-blue-400 font-semibold truncate">
            {tok}
          </div>
        ))}

        {/* Matrix Rows */}
        {matrix.map((row, rIdx) => (
          <React.Fragment key={rIdx}>
            <div className="p-2 font-mono text-xs text-blue-400 font-semibold flex items-center">
              {tokens[rIdx]}
            </div>
            {row.map((val, cIdx) => (
              <div
                key={cIdx}
                title={`Token "${tokens[rIdx]}" -> "${tokens[cIdx]}": ${val.toFixed(3)}`}
                className="h-10 m-0.5 rounded flex items-center justify-center font-mono text-xs text-white transition-colors duration-200"
                style={{
                  backgroundColor: `rgba(99, 102, 241, ${Math.max(0.1, val)})`,
                  border: `1px solid rgba(129, 140, 248, ${val > 0.4 ? 0.6 : 0.1})`
                }}
              >
                {val.toFixed(2)}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
```
