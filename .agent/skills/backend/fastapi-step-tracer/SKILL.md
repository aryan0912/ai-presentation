---
name: fastapi-step-tracer
description: Python state streaming, live execution logging, SSE/WebSocket iteration streaming, and step-by-step model training telemetry.
---

# FastAPI Step Tracer Skill: Python State Streaming & Telemetry

Use this skill to implement and maintain step-by-step telemetry, intermediate calculation logs, and real-time state streaming between FastAPI backend algorithms (e.g. gradient descent, backpropagation epochs, RNN hidden state unrolling, LSTM gating) and frontend visualizers.

## Patterns & Standards

### 1. Step-by-Step State Response Format
Every step-driven API response should follow a predictable schema exposing both initial state, intermediate gradients/activations, and new state:
```python
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class StepTelemetry(BaseModel):
    step_index: int
    loss: float
    parameters: Dict[str, float]
    gradients: Dict[str, float]
    intermediate_tensors: Optional[Dict[str, Any]] = None
    explanation: Optional[str] = None
```

### 2. Streaming Epoch Updates (SSE / StreamingResponse)
For multi-epoch simulations (e.g., training a neural network or running multi-step gradient descent):
```python
import json
import asyncio
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

router = APIRouter(tags=["telemetry"])

async def simulate_training_generator(epochs: int, lr: float):
    for epoch in range(1, epochs + 1):
        # Calculate step
        yield f"data: {json.dumps({'epoch': epoch, 'loss': 1.0 / epoch, 'status': 'in_progress'})}\n\n"
        await asyncio.sleep(0.05)
    yield f"data: {json.dumps({'status': 'completed'})}\n\n"

@router.get("/stream-training")
async def stream_training(epochs: int = 100, lr: float = 0.01):
    return StreamingResponse(simulate_training_generator(epochs, lr), media_type="text/event-stream")
```

### 3. Structured Logging & Error Handling
- Use structured JSON logs with trace IDs for each computation request.
- Log shape mismatches, NaN loss values, and division-by-zero guards before returning 422/500 HTTP status.
