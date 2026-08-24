---
name: framer-motion-stepper
description: Animated step-by-step state transitions, node animations, spring physics, and timeline progression for AI algorithm visualizers.
---

# Framer Motion Stepper Skill: Animated State Transitions

Use this skill when building step-by-step visualizers, forward/backward pass animations, token stream stepping, and state transitions using Framer Motion (or Anime.js fallback) in Next.js.

## Animation Guidelines

### 1. Step-by-Step State Stepper with Framer Motion
```tsx
import { motion, AnimatePresence } from 'framer-motion';

interface StepProps {
  currentStep: number;
  steps: { title: string; description: string; mathSnippet?: string }[];
}

export function StepperProgress({ currentStep, steps }: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: currentStep === idx ? 1.15 : 1,
                backgroundColor: currentStep >= idx ? '#3b82f6' : '#334155',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white"
            >
              {idx + 1}
            </motion.div>
            <span className={`text-xs ${currentStep === idx ? 'text-blue-400 font-semibold' : 'text-slate-500'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="p-4 rounded-lg bg-slate-800/60 border border-slate-700"
        >
          <h4 className="font-semibold text-slate-200">{steps[currentStep].title}</h4>
          <p className="text-sm text-slate-400 mt-1">{steps[currentStep].description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

### 2. Animated Neural Network Node Pulsing
```tsx
export function PulsingNeuron({ activation, label }: { activation: number, label?: string }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1 + activation * 0.2, 1],
        boxShadow: `0px 0px ${Math.max(4, activation * 20)}px rgba(192, 132, 252, ${Math.max(0.2, activation)})`,
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-xs font-mono text-white"
    >
      {activation.toFixed(2)}
    </motion.div>
  );
}
```

### 3. Fallback / Anime.js DOM Interpolation
For pure SVG node morphing without full react-motion re-renders:
```tsx
import anime from 'animejs';

export function morphSvgPath(selector: string, newPath: string, duration: number = 600) {
  anime({
    targets: selector,
    d: [{ value: newPath }],
    duration,
    easing: 'easeOutElastic(1, .8)'
  });
}
```
