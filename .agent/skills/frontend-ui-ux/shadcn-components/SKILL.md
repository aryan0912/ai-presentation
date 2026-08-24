---
name: shadcn-components
description: Design system, accessible UI primitives, dark mode tokens, cards, badges, and glassmorphism styling for AI presentation pages.
---

# Shadcn Components Skill: UI Primitives & Design System

Use this skill to design consistent, high-aesthetic UI layouts, glassmorphism cards, controls, and badges for interactive AI modules and presentations.

## Design Tokens & Standards

### 1. Color Palette & Dark Mode Glassmorphism
- **Background**: `rgba(15, 23, 42, 0.8)` with backdrop blur `backdrop-filter: blur(12px)`.
- **Borders**: Subdued borders `rgba(255, 255, 255, 0.08)` or accent glow borders.
- **Accents**:
  - Primary / Blue: `#3b82f6` (Gradients: `linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)`)
  - Purple / Neural: `#c084fc` / `#a855f7`
  - Emerald / Success: `#22c55e` / `#10b981`
  - Rose / Error / Loss: `#ef4444` / `#f43f5e`
  - Amber / Warning: `#f59e0b` / `#fbbf24`

### 2. Glass Panel Container Pattern
```tsx
export function GlassCard({ children, className = '', glowColor = 'blue' }: { children: React.ReactNode, className?: string, glowColor?: 'blue' | 'purple' | 'emerald' }) {
  const glowMap = {
    blue: 'rgba(59, 130, 246, 0.15)',
    purple: 'rgba(192, 132, 252, 0.15)',
    emerald: 'rgba(34, 197, 94, 0.15)',
  };

  return (
    <div
      className={`rounded-xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 ${className}`}
      style={{ boxShadow: `0 8px 32px 0 ${glowMap[glowColor]}` }}
    >
      {children}
    </div>
  );
}
```

### 3. Accessible Metric & Stat Card Pattern
```tsx
export function MetricCard({ label, value, unit, status = 'neutral' }: { label: string, value: string | number, unit?: string, status?: 'positive' | 'negative' | 'neutral' }) {
  const statusColors = {
    positive: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    negative: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
    neutral: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
  };

  return (
    <div className={`p-4 rounded-lg border ${statusColors[status]}`}>
      <div className="text-xs uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-bold font-mono">
        {value} {unit && <span className="text-sm font-normal text-slate-400">{unit}</span>}
      </div>
    </div>
  );
}
```

### 4. Interactive Sliders & Button Controls
- Ensure every slider has an accompanying numeric read-out and clear physical units (e.g. learning rate, epoch count, neuron count).
- Buttons should have clear loading states (`isCalculating ? 'Computing...' : 'Take Step'`).
