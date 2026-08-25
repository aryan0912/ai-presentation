# AI & Agent Context Hub (`.ua`)

Welcome to the central entry point and context router for the **AI4IT Workshop / Presentation Codebase**.

This hub provides rapid, token-efficient routing so AI models, subagents, and developers can immediately access relevant subsystem context without loading the entire project history.

---

## 🗺️ Codebase Map & Subsystem Routing

| Subsystem / Layer | Path | Core Tech | Context Guide |
| :--- | :--- | :--- | :--- |
| **Frontend Web App** | [`/ai4it-web`](file:///e:/ai-ses/ai-present/ai4it-web) | Next.js 16 (App Router), React 19, Tailwind CSS, Pretext, Lucide | [Frontend Context](file:///e:/ai-ses/ai-present/ai4it-web/CONTEXT.md) |
| **Backend API Engine** | [`/ai4it-backend`](file:///e:/ai-ses/ai-present/ai4it-backend) | FastAPI, PyTorch, NumPy, Scikit-learn, Uvicorn | [Backend Context](file:///e:/ai-ses/ai-present/ai4it-backend/CONTEXT.md) |
| **Standalone Slides / Opener** | [`/day1_opener.html`](file:///e:/ai-ses/ai-present/day1_opener.html) | Single-file HTML5/CSS3/Vanilla JS (Standalone) | [Curriculum & Specs](file:///e:/ai-ses/ai-present/contexts/INDEX.md) |
| **Curriculum & Specifications** | [`/contexts`](file:///e:/ai-ses/ai-present/contexts) | Markdown Specs, Lecture Plans, Case Studies | [Curriculum Index](file:///e:/ai-ses/ai-present/contexts/INDEX.md) |

---

## ⚡ Fast-Path Invariants & Operating Rules

1. **Dual-Mode Frontend-Backend Execution**:
   - The frontend is designed with **zero-backend dependency fallbacks** (client-side JS math approximations).
   - If backend is offline (`http://localhost:8000`), frontend routes still function in fallback mode.
2. **Text Measurement & Types (`@chenglou/pretext`)**:
   - When rendering dynamic canvas/text layout via Pretext, use `prepareWithSegments` instead of `prepare` whenever `layoutWithLines` is called.
3. **API Contract**:
   - Backend routes are exposed under `/api/*` (e.g. `/api/linear-regression/train`, `/api/neural-network/train`, `/api/datasets/*`).

---

## 📂 Quick Links
- 📘 [Curriculum Specs & Lecture Plan](file:///e:/ai-ses/ai-present/contexts/INDEX.md)
- ⚛️ [Frontend Architecture & Components](file:///e:/ai-ses/ai-present/ai4it-web/CONTEXT.md)
- 🐍 [Backend Architecture & Endpoints](file:///e:/ai-ses/ai-present/ai4it-backend/CONTEXT.md)
