---
name: graphify
description: AST codebase mapping, dependency graphs, and code-to-concept relationship tracing for Python and TypeScript projects.
---

# Graphify Skill: AST Codebase Mapping & Dependency Graphing

Use this skill to inspect, analyze, and visualize the architectural graph, dependency hierarchy, and AST structure across `ai4it-backend` (FastAPI / Python) and `ai4it-web` (Next.js / TypeScript).

## Core Responsibilities
1. **Python AST & Module Traversal (`ai4it-backend`)**:
   - Extract FastAPI route definitions (`@router.post`, `@router.get`).
   - Map Dependency Inversion patterns (`app.services.base` interfaces to implementations in `app.services.*`).
   - Identify Pydantic data schemas (`app.models.*`) and their call sites.
2. **TypeScript / Next.js Component Traversal (`ai4it-web`)**:
   - Map page routes (`app/day1/linear-regression`, `app/day1/neural-network`, etc.) to client components (`LinearRegressionDemo.tsx`, `NeuralNetworkDemo.tsx`).
   - Track state dependencies between UI sliders, animation hooks, and HTTP/WebSocket endpoints.
3. **Cross-Boundary API Contract Verification**:
   - Verify request/response payloads match between frontend `fetch('http://localhost:8000/api/...')` and backend FastAPI route signatures.

## Quick CLI / Python Inspection Snippet
When performing automated codebase mapping:
```python
import ast
import os

def list_fastapi_endpoints(filepath: str):
    with open(filepath, "r", encoding="utf-8") as f:
        tree = ast.parse(f.read(), filename=filepath)
    endpoints = []
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            for dec in node.decorator_list:
                if isinstance(dec, ast.Call) and hasattr(dec.func, 'attr'):
                    endpoints.append((dec.func.attr.upper(), node.name))
    return endpoints
```

## Architectural Guidelines
- Keep domain entities in `models/`, business logic in `services/`, and HTTP wrappers in `api/routes/`.
- Ensure Next.js client visualizers are isolated from layout wrappers.
