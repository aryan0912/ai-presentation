---
name: math-typography
description: KaTeX mathematical notation, LaTeX equation formatting, responsive math layout tokens, and typography styling for AI presentations.
---

# Math Typography Skill: KaTeX & Mathematical Presentation

Use this skill when rendering mathematical formulas, equations, gradient descent calculus, and neural network matrix formulations across presentation slides and interactive web panels.

## KaTeX & Typography Standards

### 1. KaTeX Integration Pattern
Use `katex` (or `react-katex`) or standalone KaTeX HTML strings with dark mode styling:
```tsx
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export function MathBlock({ formula, caption }: { formula: string; caption?: string }) {
  return (
    <div className="my-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center font-mono overflow-x-auto">
      <div className="text-lg text-blue-300">
        <BlockMath math={formula} />
      </div>
      {caption && <p className="mt-2 text-xs text-slate-400 font-sans">{caption}</p>}
    </div>
  );
}
```

### 2. Standard Mathematical Tokens for AI Course Modules
- **Linear Regression & Loss**:
  - Prediction: `\hat{y} = mx + c` or `\hat{y} = w^T x + b`
  - Mean Squared Error: `\mathcal{L}(m, c) = \frac{1}{n} \sum_{i=1}^n (y_i - (m x_i + c))^2`
  - Gradients: `\frac{\partial \mathcal{L}}{\partial m} = -\frac{2}{n} \sum x_i (y_i - \hat{y}_i)`, `\frac{\partial \mathcal{L}}{\partial c} = -\frac{2}{n} \sum (y_i - \hat{y}_i)`
- **Neural Network Activations**:
  - Sigmoid: `\sigma(z) = \frac{1}{1 + e^{-z}}`
  - ReLU: `f(z) = \max(0, z)`
  - Forward Step: `a^{[l]} = g(W^{[l]} a^{[l-1]} + b^{[l]})`
- **Attention Mechanism (Day 2 Transformers)**:
  - Scaled Dot-Product Attention: `\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V`

### 3. Responsive Typography & Accent Formatting
- Mathematical variables in running text should use colored badges (e.g. `<span className="font-mono text-blue-400">$w$</span>` and `<span className="font-mono text-pink-400">$b$</span>`).
- High-contrast font pairings: `Inter` or `Geist` for body text, `Fira Code` or `JetBrains Mono` for equations and parameters.
