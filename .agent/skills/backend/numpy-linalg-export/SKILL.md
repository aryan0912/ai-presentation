---
name: numpy-linalg-export
description: Matrix-to-JSON serialization, NumPy tensor transformations, and SVG path / boundary curve generation for AI visualizations.
---

# NumPy LinAlg Export Skill: Matrix Serialization & Geometric Calculations

Use this skill when processing NumPy arrays, performing linear algebra operations (matrix multiplications, eigendecompositions, projections, dot products), and serializing multidimensional tensors to JSON-safe formats for frontend interactive renderers.

## Serialization Conventions

### 1. Robust NumPy to JSON Converter
NumPy floats (`np.float32`, `np.float64`), integers (`np.int64`), and ndarrays must be sanitized before FastAPI JSON serialization:
```python
import numpy as np
from typing import Any

def serialize_numpy(obj: Any) -> Any:
    """Converts numpy arrays, matrices, and scalars to native Python primitives."""
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    elif isinstance(obj, (np.floating, float)):
        return float(obj)
    elif isinstance(obj, (np.integer, int)):
        return int(obj)
    elif isinstance(obj, np.bool_):
        return bool(obj)
    elif isinstance(obj, dict):
        return {k: serialize_numpy(v) for k, v in obj.items()}
    elif isinstance(obj, (list, tuple)):
        return [serialize_numpy(v) for v in obj]
    return obj
```

### 2. SVG Decision Boundary & Geometric Path Generation
Transform linear models or classification decision boundaries into SVG path strings directly from NumPy calculations:
```python
def generate_decision_boundary_svg(weights: np.ndarray, bias: float, x_min: float = 0, x_max: float = 500, y_range: float = 400) -> str:
    """Generates SVG line path 'M x1 y1 L x2 y2' for w1*x + w2*y + b = 0."""
    if len(weights) < 2 or weights[1] == 0:
        return "M 0 0 L 0 0"
    
    # y = -(w1*x + b) / w2
    y1 = -(weights[0] * x_min + bias) / weights[1]
    y2 = -(weights[0] * x_max + bias) / weights[1]
    
    # Invert for SVG y-coordinates
    svg_y1 = max(0, min(y_range, y_range - y1))
    svg_y2 = max(0, min(y_range, y_range - y2))
    
    return f"M {x_min} {svg_y1:.2f} L {x_max} {svg_y2:.2f}"
```

### 3. Tensor Heatmaps & Attention Matrix Serialization
When formatting 2D Attention weights:
```python
def serialize_attention_matrix(weights: np.ndarray, tokens: list[str]) -> dict:
    assert weights.shape[0] == weights.shape[1] == len(tokens)
    return {
        "tokens": tokens,
        "matrix": weights.round(4).tolist(),
        "shape": list(weights.shape)
    }
```
