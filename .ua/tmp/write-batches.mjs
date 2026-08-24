import fs from 'fs';
import path from 'path';

const projectRoot = 'd:/part2/ai-presentation';
const intermediateDir = path.join(projectRoot, '.ua', 'intermediate');

// Helper to determine node type based on path & extension
function getNodeInfo(relPath, category, lang) {
  const normPath = relPath.replace(/\\/g, '/');
  const basename = path.basename(normPath);
  
  if (category === 'config' || normPath.endsWith('.json') || normPath.endsWith('.toml') || normPath.endsWith('.mjs') || normPath.endsWith('.config.ts')) {
    return { type: 'config', id: `config:${normPath}`, name: basename };
  }
  if (category === 'docs' || normPath.endsWith('.md')) {
    return { type: 'document', id: `document:${normPath}`, name: basename };
  }
  if (normPath.endsWith('.html') || normPath.endsWith('.css')) {
    return { type: 'file', id: `file:${normPath}`, name: basename };
  }
  return { type: 'file', id: `file:${normPath}`, name: basename };
}

// Generate batch 1
const b1 = {
  nodes: [
    {
      id: "document:ai4it-web/AGENTS.md",
      type: "document",
      name: "AGENTS.md",
      filePath: "ai4it-web/AGENTS.md",
      summary: "Next.js routing, styling, and framework guidance for web agents.",
      tags: ["guidelines", "agents", "docs"],
      complexity: "simple"
    },
    {
      id: "document:ai4it-web/CLAUDE.md",
      type: "document",
      name: "CLAUDE.md",
      filePath: "ai4it-web/CLAUDE.md",
      summary: "Claude workspace guidance file.",
      tags: ["claude", "docs"],
      complexity: "simple"
    },
    {
      id: "document:ai4it-web/README.md",
      type: "document",
      name: "README.md",
      filePath: "ai4it-web/README.md",
      summary: "Frontend documentation for Next.js AI presentation application.",
      tags: ["frontend", "readme", "docs"],
      complexity: "simple"
    },
    {
      id: "config:ai4it-web/package.json",
      type: "config",
      name: "package.json",
      filePath: "ai4it-web/package.json",
      summary: "Frontend npm package configuration defining dependencies like React, Lucide, Recharts, and Katex.",
      tags: ["npm", "package", "config"],
      complexity: "simple"
    },
    {
      id: "config:ai4it-web/tsconfig.json",
      type: "config",
      name: "tsconfig.json",
      filePath: "ai4it-web/tsconfig.json",
      summary: "TypeScript compiler options and path aliases for the Next.js app.",
      tags: ["typescript", "config"],
      complexity: "simple"
    }
  ],
  edges: [
    {
      source: "config:ai4it-web/package.json",
      target: "document:ai4it-web/README.md",
      type: "documents",
      weight: 1
    },
    {
      source: "config:ai4it-web/tsconfig.json",
      target: "config:ai4it-web/package.json",
      type: "configures",
      weight: 1
    }
  ]
};

// Generate batch 2
const b2 = {
  nodes: [
    {
      id: "document:contexts/AI4IT_Lecture_Plan.md",
      type: "document",
      name: "AI4IT_Lecture_Plan.md",
      filePath: "contexts/AI4IT_Lecture_Plan.md",
      summary: "Comprehensive 3-weekend AI for ICT lecture curriculum covering ML, Neural Networks, RAG, Agents, and Governance.",
      tags: ["curriculum", "lecture-plan", "contexts"],
      complexity: "simple"
    },
    {
      id: "document:contexts/day1_opener_content_guide.md",
      type: "document",
      name: "day1_opener_content_guide.md",
      filePath: "contexts/day1_opener_content_guide.md",
      summary: "Instructor presentation talking points and psychological framing for Day 1 opening.",
      tags: ["instructor-guide", "day1", "contexts"],
      complexity: "simple"
    },
    {
      id: "document:contexts/day1_opener_spec.md",
      type: "document",
      name: "day1_opener_spec.md",
      filePath: "contexts/day1_opener_spec.md",
      summary: "Technical specification and interactive UI layout requirements for the Day 1 Opener deck.",
      tags: ["spec", "day1", "contexts"],
      complexity: "simple"
    }
  ],
  edges: [
    {
      source: "document:contexts/day1_opener_spec.md",
      target: "document:contexts/day1_opener_content_guide.md",
      type: "references",
      weight: 1
    },
    {
      source: "document:contexts/day1_opener_content_guide.md",
      target: "document:contexts/AI4IT_Lecture_Plan.md",
      type: "references",
      weight: 1
    }
  ]
};

// Generate batch 3
const b3 = {
  nodes: [
    {
      id: "document:.agent/skills/backend/fastapi-step-tracer/SKILL.md",
      type: "document",
      name: "fastapi-step-tracer/SKILL.md",
      filePath: ".agent/skills/backend/fastapi-step-tracer/SKILL.md",
      summary: "Skill defining step-by-step state streaming and telemetry standards in FastAPI.",
      tags: ["agent-skill", "fastapi", "backend"],
      complexity: "simple"
    },
    {
      id: "document:.agent/skills/backend/graphify/SKILL.md",
      type: "document",
      name: "graphify/SKILL.md",
      filePath: ".agent/skills/backend/graphify/SKILL.md",
      summary: "Skill for converting matrices into graph node and edge topologies.",
      tags: ["agent-skill", "graphify", "backend"],
      complexity: "simple"
    },
    {
      id: "document:.agent/skills/backend/numpy-linalg-export/SKILL.md",
      type: "document",
      name: "numpy-linalg-export/SKILL.md",
      filePath: ".agent/skills/backend/numpy-linalg-export/SKILL.md",
      summary: "Skill for linear algebra operations and export protocols with NumPy.",
      tags: ["agent-skill", "numpy", "backend"],
      complexity: "simple"
    },
    {
      id: "document:.agent/skills/frontend-ui-ux/framer-motion-stepper/SKILL.md",
      type: "document",
      name: "framer-motion-stepper/SKILL.md",
      filePath: ".agent/skills/frontend-ui-ux/framer-motion-stepper/SKILL.md",
      summary: "Frontend animation and step-by-step interactive stepper guidelines using Framer Motion.",
      tags: ["agent-skill", "framer-motion", "frontend"],
      complexity: "simple"
    },
    {
      id: "document:.agent/skills/frontend-ui-ux/math-typography/SKILL.md",
      type: "document",
      name: "math-typography/SKILL.md",
      filePath: ".agent/skills/frontend-ui-ux/math-typography/SKILL.md",
      summary: "Mathematical formula rendering and KaTeX typography guidelines.",
      tags: ["agent-skill", "katex", "math", "frontend"],
      complexity: "simple"
    },
    {
      id: "document:.agent/skills/frontend-ui-ux/recharts-visualizer/SKILL.md",
      type: "document",
      name: "recharts-visualizer/SKILL.md",
      filePath: ".agent/skills/frontend-ui-ux/recharts-visualizer/SKILL.md",
      summary: "Chart and regression curve visualizer standards using Recharts.",
      tags: ["agent-skill", "recharts", "frontend"],
      complexity: "simple"
    },
    {
      id: "document:.agent/skills/frontend-ui-ux/shadcn-components/SKILL.md",
      type: "document",
      name: "shadcn-components/SKILL.md",
      filePath: ".agent/skills/frontend-ui-ux/shadcn-components/SKILL.md",
      summary: "Shadcn UI component standards and dark-mode styling rules.",
      tags: ["agent-skill", "shadcn", "frontend"],
      complexity: "simple"
    },
    {
      id: "config:ai4it-backend/.python-version",
      type: "config",
      name: ".python-version",
      filePath: "ai4it-backend/.python-version",
      summary: "Specifies Python version 3.12 for backend runtime.",
      tags: ["python", "config"],
      complexity: "simple"
    },
    {
      id: "document:ai4it-backend/README.md",
      type: "document",
      name: "README.md",
      filePath: "ai4it-backend/README.md",
      summary: "Backend service documentation placeholder.",
      tags: ["backend", "readme", "docs"],
      complexity: "simple"
    },
    {
      id: "config:ai4it-backend/pyproject.toml",
      type: "config",
      name: "pyproject.toml",
      filePath: "ai4it-backend/pyproject.toml",
      summary: "UV / Hatchling backend project definition with FastAPI and NumPy dependencies.",
      tags: ["python", "uv", "config"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-backend/app/main.py",
      type: "file",
      name: "main.py",
      filePath: "ai4it-backend/app/main.py",
      summary: "FastAPI entrypoint with CORS middleware and route mounting.",
      tags: ["fastapi", "entrypoint", "backend"],
      complexity: "simple"
    },
    {
      id: "function:ai4it-backend/app/main.py:create_app",
      type: "function",
      name: "create_app",
      filePath: "ai4it-backend/app/main.py",
      summary: "Factory creating the FastAPI instance and registering routes.",
      tags: ["factory", "fastapi"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-backend/app/api/routes/linear_regression.py",
      type: "file",
      name: "linear_regression.py",
      filePath: "ai4it-backend/app/api/routes/linear_regression.py",
      summary: "FastAPI route for computing single step linear regression updates.",
      tags: ["route", "linear-regression", "fastapi"],
      complexity: "simple"
    },
    {
      id: "endpoint:ai4it-backend/app/api/routes/linear_regression.py:step_linear_regression",
      type: "endpoint",
      name: "POST /api/v1/linear-regression/step",
      filePath: "ai4it-backend/app/api/routes/linear_regression.py",
      summary: "Endpoint calculating gradient descent weight and bias updates.",
      tags: ["endpoint", "linear-regression"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-backend/app/api/routes/neural_network.py",
      type: "file",
      name: "neural_network.py",
      filePath: "ai4it-backend/app/api/routes/neural_network.py",
      summary: "FastAPI route executing feedforward passes on a toy neural network.",
      tags: ["route", "neural-network", "fastapi"],
      complexity: "simple"
    },
    {
      id: "endpoint:ai4it-backend/app/api/routes/neural_network.py:forward_pass_nn",
      type: "endpoint",
      name: "POST /api/v1/neural-network/forward",
      filePath: "ai4it-backend/app/api/routes/neural_network.py",
      summary: "Endpoint evaluating multi-layer activations.",
      tags: ["endpoint", "neural-network"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-backend/app/models/linear_regression.py",
      type: "file",
      name: "linear_regression.py",
      filePath: "ai4it-backend/app/models/linear_regression.py",
      summary: "Pydantic models for DataPoint, RegressionState, and step results.",
      tags: ["pydantic", "models", "linear-regression"],
      complexity: "simple"
    },
    {
      id: "class:ai4it-backend/app/models/linear_regression.py:RegressionState",
      type: "class",
      name: "RegressionState",
      filePath: "ai4it-backend/app/models/linear_regression.py",
      summary: "Pydantic schema representing regression weights, bias, and points.",
      tags: ["pydantic", "schema"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-backend/app/models/neural_network.py",
      type: "file",
      name: "neural_network.py",
      filePath: "ai4it-backend/app/models/neural_network.py",
      summary: "Pydantic models for neural network layers and forward pass results.",
      tags: ["pydantic", "models", "neural-network"],
      complexity: "simple"
    },
    {
      id: "class:ai4it-backend/app/models/neural_network.py:NNState",
      type: "class",
      name: "NNState",
      filePath: "ai4it-backend/app/models/neural_network.py",
      summary: "Pydantic schema for network weight matrices and bias vectors.",
      tags: ["pydantic", "schema"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-backend/app/services/base.py",
      type: "file",
      name: "base.py",
      filePath: "ai4it-backend/app/services/base.py",
      summary: "Abstract base interfaces for regression and neural network calculation services.",
      tags: ["interfaces", "services", "base"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-backend/app/services/linear_regression.py",
      type: "file",
      name: "linear_regression.py",
      filePath: "ai4it-backend/app/services/linear_regression.py",
      summary: "NumPy-powered gradient calculation and MSE loss evaluation service.",
      tags: ["numpy", "gradient-descent", "service"],
      complexity: "moderate"
    },
    {
      id: "class:ai4it-backend/app/services/linear_regression.py:LinearRegressionService",
      type: "class",
      name: "LinearRegressionService",
      filePath: "ai4it-backend/app/services/linear_regression.py",
      summary: "Service implementing analytical & numerical gradient steps.",
      tags: ["service", "math"],
      complexity: "moderate"
    },
    {
      id: "file:ai4it-backend/app/services/neural_network.py",
      type: "file",
      name: "neural_network.py",
      filePath: "ai4it-backend/app/services/neural_network.py",
      summary: "Matrix multiplication and activation function evaluation service.",
      tags: ["numpy", "activations", "service"],
      complexity: "moderate"
    },
    {
      id: "class:ai4it-backend/app/services/neural_network.py:NeuralNetworkService",
      type: "class",
      name: "NeuralNetworkService",
      filePath: "ai4it-backend/app/services/neural_network.py",
      summary: "Service calculating forward passes across hidden and output layers.",
      tags: ["service", "neural-network"],
      complexity: "moderate"
    },
    {
      id: "config:ai4it-web/eslint.config.mjs",
      type: "config",
      name: "eslint.config.mjs",
      filePath: "ai4it-web/eslint.config.mjs",
      summary: "ESLint configuration extending Next.js core web vitals and TypeScript rules.",
      tags: ["eslint", "linter", "config"],
      complexity: "simple"
    },
    {
      id: "config:ai4it-web/next.config.ts",
      type: "config",
      name: "next.config.ts",
      filePath: "ai4it-web/next.config.ts",
      summary: "Next.js configuration options.",
      tags: ["nextjs", "config"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-web/src/app/globals.css",
      type: "file",
      name: "globals.css",
      filePath: "ai4it-web/src/app/globals.css",
      summary: "Global CSS style definitions, theme variables, and Tailwind resets.",
      tags: ["styles", "css", "theme"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-web/src/app/day1/linear-regression/page.tsx",
      type: "file",
      name: "page.tsx",
      filePath: "ai4it-web/src/app/day1/linear-regression/page.tsx",
      summary: "Next.js page route hosting the Linear Regression interactive demo.",
      tags: ["page", "route", "nextjs"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-web/src/app/day1/linear-regression/LinearRegressionDemo.tsx",
      type: "file",
      name: "LinearRegressionDemo.tsx",
      filePath: "ai4it-web/src/app/day1/linear-regression/LinearRegressionDemo.tsx",
      summary: "Interactive linear regression visualizer with real-time gradient descent stepping and Recharts scatter plot.",
      tags: ["react", "recharts", "visualization", "demo"],
      complexity: "moderate"
    },
    {
      id: "function:ai4it-web/src/app/day1/linear-regression/LinearRegressionDemo.tsx:LinearRegressionDemo",
      type: "function",
      name: "LinearRegressionDemo",
      filePath: "ai4it-web/src/app/day1/linear-regression/LinearRegressionDemo.tsx",
      summary: "React component rendering parameter sliders, data points, and loss curves.",
      tags: ["component", "react"],
      complexity: "moderate"
    },
    {
      id: "file:ai4it-web/src/app/day1/neural-network/page.tsx",
      type: "file",
      name: "page.tsx",
      filePath: "ai4it-web/src/app/day1/neural-network/page.tsx",
      summary: "Next.js page route hosting the Neural Network forward pass visualizer.",
      tags: ["page", "route", "nextjs"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-web/src/app/day1/neural-network/NeuralNetworkDemo.tsx",
      type: "file",
      name: "NeuralNetworkDemo.tsx",
      filePath: "ai4it-web/src/app/day1/neural-network/NeuralNetworkDemo.tsx",
      summary: "Visual multi-layer perceptron node and weight activation visualizer.",
      tags: ["react", "svg", "neural-network", "visualization"],
      complexity: "moderate"
    },
    {
      id: "function:ai4it-web/src/app/day1/neural-network/NeuralNetworkDemo.tsx:NeuralNetworkDemo",
      type: "function",
      name: "NeuralNetworkDemo",
      filePath: "ai4it-web/src/app/day1/neural-network/NeuralNetworkDemo.tsx",
      summary: "React component animating weight matrices and neuron firing thresholds.",
      tags: ["component", "react"],
      complexity: "moderate"
    }
  ],
  edges: [
    {
      source: "file:ai4it-backend/app/main.py",
      target: "file:ai4it-backend/app/api/routes/linear_regression.py",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/main.py",
      target: "file:ai4it-backend/app/api/routes/neural_network.py",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/api/routes/linear_regression.py",
      target: "file:ai4it-backend/app/services/linear_regression.py",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/api/routes/linear_regression.py",
      target: "file:ai4it-backend/app/models/linear_regression.py",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/api/routes/neural_network.py",
      target: "file:ai4it-backend/app/services/neural_network.py",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/api/routes/neural_network.py",
      target: "file:ai4it-backend/app/models/neural_network.py",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/services/linear_regression.py",
      target: "file:ai4it-backend/app/services/base.py",
      type: "implements",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/services/neural_network.py",
      target: "file:ai4it-backend/app/services/base.py",
      type: "implements",
      weight: 1
    },
    {
      source: "file:ai4it-web/src/app/day1/linear-regression/page.tsx",
      target: "file:ai4it-web/src/app/day1/linear-regression/LinearRegressionDemo.tsx",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-web/src/app/day1/neural-network/page.tsx",
      target: "file:ai4it-web/src/app/day1/neural-network/NeuralNetworkDemo.tsx",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/main.py",
      target: "function:ai4it-backend/app/main.py:create_app",
      type: "contains",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/api/routes/linear_regression.py",
      target: "endpoint:ai4it-backend/app/api/routes/linear_regression.py:step_linear_regression",
      type: "contains",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/api/routes/neural_network.py",
      target: "endpoint:ai4it-backend/app/api/routes/neural_network.py:forward_pass_nn",
      type: "contains",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/models/linear_regression.py",
      target: "class:ai4it-backend/app/models/linear_regression.py:RegressionState",
      type: "contains",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/models/neural_network.py",
      target: "class:ai4it-backend/app/models/neural_network.py:NNState",
      type: "contains",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/services/linear_regression.py",
      target: "class:ai4it-backend/app/services/linear_regression.py:LinearRegressionService",
      type: "contains",
      weight: 1
    },
    {
      source: "file:ai4it-backend/app/services/neural_network.py",
      target: "class:ai4it-backend/app/services/neural_network.py:NeuralNetworkService",
      type: "contains",
      weight: 1
    },
    {
      source: "file:ai4it-web/src/app/day1/linear-regression/LinearRegressionDemo.tsx",
      target: "function:ai4it-web/src/app/day1/linear-regression/LinearRegressionDemo.tsx:LinearRegressionDemo",
      type: "contains",
      weight: 1
    },
    {
      source: "file:ai4it-web/src/app/day1/neural-network/NeuralNetworkDemo.tsx",
      target: "function:ai4it-web/src/app/day1/neural-network/NeuralNetworkDemo.tsx:NeuralNetworkDemo",
      type: "contains",
      weight: 1
    }
  ]
};

// Generate batch 4
const b4 = {
  nodes: [
    {
      id: "file:ai4it-web/src/app/layout.tsx",
      type: "file",
      name: "layout.tsx",
      filePath: "ai4it-web/src/app/layout.tsx",
      summary: "Root layout component configuring global fonts, metadata, and sidebar container.",
      tags: ["layout", "root", "nextjs"],
      complexity: "simple"
    },
    {
      id: "function:ai4it-web/src/app/layout.tsx:RootLayout",
      type: "function",
      name: "RootLayout",
      filePath: "ai4it-web/src/app/layout.tsx",
      summary: "React server component wrapping application pages with navigation frame.",
      tags: ["layout", "react"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-web/src/app/page.module.css",
      type: "file",
      name: "page.module.css",
      filePath: "ai4it-web/src/app/page.module.css",
      summary: "CSS module styles for interactive presentation homepage.",
      tags: ["styles", "css-module"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-web/src/app/page.tsx",
      type: "file",
      name: "page.tsx",
      filePath: "ai4it-web/src/app/page.tsx",
      summary: "Interactive Next.js presentation deck and taxonomy navigator for Day 1 AI concepts.",
      tags: ["page", "home", "presentation", "nextjs"],
      complexity: "complex"
    },
    {
      id: "function:ai4it-web/src/app/page.tsx:Home",
      type: "function",
      name: "Home",
      filePath: "ai4it-web/src/app/page.tsx",
      summary: "Interactive slide deck component with timeline, concentric circles, and AI taxonomy.",
      tags: ["component", "react"],
      complexity: "complex"
    },
    {
      id: "file:ai4it-web/src/components/Sidebar.tsx",
      type: "file",
      name: "Sidebar.tsx",
      filePath: "ai4it-web/src/components/Sidebar.tsx",
      summary: "Navigation sidebar highlighting active lecture modules and demos.",
      tags: ["navigation", "sidebar", "component"],
      complexity: "simple"
    },
    {
      id: "function:ai4it-web/src/components/Sidebar.tsx:Sidebar",
      type: "function",
      name: "Sidebar",
      filePath: "ai4it-web/src/components/Sidebar.tsx",
      summary: "Sidebar rendering module links.",
      tags: ["component", "react"],
      complexity: "simple"
    },
    {
      id: "file:ai4it-web/src/components/sidebar.css",
      type: "file",
      name: "sidebar.css",
      filePath: "ai4it-web/src/components/sidebar.css",
      summary: "Styles for the collapsible sidebar.",
      tags: ["styles", "sidebar"],
      complexity: "simple"
    },
    {
      id: "file:day1_opener.html",
      type: "file",
      name: "day1_opener.html",
      filePath: "day1_opener.html",
      summary: "Standalone single-file HTML presentation slide deck for Day 1 opening lecture with built-in styling and animations.",
      tags: ["html", "standalone", "presentation", "deck"],
      complexity: "complex"
    }
  ],
  edges: [
    {
      source: "file:ai4it-web/src/app/layout.tsx",
      target: "file:ai4it-web/src/components/Sidebar.tsx",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-web/src/app/layout.tsx",
      target: "file:ai4it-web/src/app/globals.css",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-web/src/app/page.tsx",
      target: "file:ai4it-web/src/app/page.module.css",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-web/src/components/Sidebar.tsx",
      target: "file:ai4it-web/src/components/sidebar.css",
      type: "imports",
      weight: 1
    },
    {
      source: "file:ai4it-web/src/app/layout.tsx",
      target: "function:ai4it-web/src/app/layout.tsx:RootLayout",
      type: "contains",
      weight: 1
    },
    {
      source: "file:ai4it-web/src/app/page.tsx",
      target: "function:ai4it-web/src/app/page.tsx:Home",
      type: "contains",
      weight: 1
    },
    {
      source: "file:ai4it-web/src/components/Sidebar.tsx",
      target: "function:ai4it-web/src/components/Sidebar.tsx:Sidebar",
      type: "contains",
      weight: 1
    },
    {
      source: "file:day1_opener.html",
      target: "document:contexts/day1_opener_spec.md",
      type: "implements",
      weight: 1
    }
  ]
};

fs.writeFileSync(path.join(intermediateDir, 'batch-1.json'), JSON.stringify(b1, null, 2));
fs.writeFileSync(path.join(intermediateDir, 'batch-2.json'), JSON.stringify(b2, null, 2));
fs.writeFileSync(path.join(intermediateDir, 'batch-3.json'), JSON.stringify(b3, null, 2));
fs.writeFileSync(path.join(intermediateDir, 'batch-4.json'), JSON.stringify(b4, null, 2));
console.log('Batch files 1-4 created.');
