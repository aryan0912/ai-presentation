# AI4IT Workshop — Interactive Presentation & Labs

An interactive presentation and workshop suite built for the NDDB ICT AI Training Program, featuring live machine learning simulations, loss landscapes, decision boundary playgrounds, and enterprise architecture case studies.

## Quick Start

### 1. Backend (FastAPI + Python)
```bash
cd ai4it-backend
uv run uvicorn app.main:app --reload --port 8000
```
*(Backend runs at `http://localhost:8000`)*

### 2. Frontend (Next.js 16 + React 19)
```bash
cd ai4it-web
npm install
npm run dev
```
*(Frontend runs at `http://localhost:3000`)*

---
> **Note:** The frontend includes built-in client-side mathematical fallbacks, allowing all interactive demos to run smoothly even without the backend. Visit `http://localhost:3000/status` to check system health.
