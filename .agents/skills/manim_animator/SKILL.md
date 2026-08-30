---
name: manim-animator
description: >-
  Use this skill to generate high-quality, 3Blue1Brown-style Manim Python scripts for mathematical and architectural animations, specifically focused on Transformer and Attention mechanisms.
---

# Manim Animator Skill

You have been invoked to generate `manim` Python scripts for creating high-quality mathematical animations. The user wants to visualize complex concepts—specifically the Transformer architecture and Attention mechanism—using `manim` (like the 3Blue1Brown videos).

## Role and Constraints

1.  **Strict Manim Syntax:** You must write Python code compatible with the latest version of Manim Community (`manim`). Do not use outdated `manimlib` or ManimGL syntax unless explicitly requested.
2.  **No Placeholders:** Write complete, executable `Scene` classes. Do not leave `TODOs` or `pass` blocks. The user intends to run your code directly.
3.  **Visual Style:**
    *   Use a dark background (default).
    *   Use high-contrast, beautiful colors (e.g., `BLUE_D`, `TEAL_D`, `YELLOW_D`, `RED_D`).
    *   Ensure all text and equations are properly scaled and readable.
    *   Use smooth animations (`Create`, `Transform`, `FadeIn`, `Write`).
4.  **Math Rendering:** Use `MathTex` for all equations and mathematical variables.
5.  **Pacing:** Add `self.wait()` statements to give the viewer time to read and understand each step.

## Domain: Transformers & Attention

When the user asks for animations related to **Transformers**, **Self-Attention**, **Positional Encodings**, or **QKV Matrices**, follow these specific visual guidelines:

### 1. Token Passing & Positional Encoding
*   **Tokens:** Represent words as clean, rounded rectangles or elegant text objects.
*   **Embeddings:** Represent vectors as vertical arrays or color-coded grids (e.g., using `Matrix` or `DecimalTable`).
*   **Positional Encoding:** Show a sine/cosine wave blending into the vector. Use color interpolation (e.g., from blue to red) to represent the addition of position.

### 2. Query, Key, Value (QKV) Matrices
*   **Analogy:** Visually distinguish Q, K, and V.
    *   **Query (Q):** "What I am looking for." (Color: Red/Pink)
    *   **Key (K):** "What I contain." (Color: Yellow/Orange)
    *   **Value (V):** "My actual payload." (Color: Blue/Teal)
*   **Matrix Multiplication:** Show the dot product between a Query and a Key. Highlight the row of Q and the column of K, showing them combining into a scalar score.

### 3. Attention Score Calculation
*   **Softmax:** Show the raw dot-product scores (logits) scaling down into percentages (0.0 to 1.0) that sum to 100%. Use a bar chart or opacity-shifting lines to represent these weights.
*   **Context Vector:** Show the Attention Weights multiplying the Values ($V$) and summing together to form the final contextualized word embedding.

## Output Format

When responding to the user, output the complete Python script enclosed in a fenced code block:

```python
from manim import *

class TransformerAttentionScene(Scene):
    def construct(self):
        # Your beautiful animation code here
        pass
```

You may also provide brief instructions on how the user should run the file (e.g., `manim -pql attention.py TransformerAttentionScene`).
