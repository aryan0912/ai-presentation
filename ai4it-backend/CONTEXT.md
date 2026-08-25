# Backend Context & Architecture (`ai4it-backend`)

## Overview
FastAPI service running on Python 3.12 with PyTorch, NumPy, and Scikit-learn. Serves real-time training simulation endpoints, loss surfaces, and synthetic dairy domain datasets.

## Key Directories
- `app/`
  - `main.py` — FastAPI app initialization, CORS middleware (`*`), health endpoint `/api/health`.
  - `api/routes/`
    - `linear_regression.py` — Gradient descent step-by-step telemetry (`/api/linear-regression/train`)
    - `neural_network.py` — Multi-layer perceptron training & 2D decision boundary grid (`/api/neural-network/train`)
    - `datasets.py` — Synthetic dairy domain datasets (milk yield, fat/SNF anomaly clustering) (`/api/datasets/*`)
  - `models/` — Pydantic request/response schemas.
  - `services/` — Core ML computation engines (NumPy/PyTorch).

## Running Backend
```bash
uv run uvicorn app.main:app --reload --port 8000
```
API docs available at `http://localhost:8000/docs`.
