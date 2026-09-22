const fs = require('fs');
const path = require('path');

const basePath = 'd:/part2/ai-presentation/ai4it-web/src/app/day5';

// 1. Delete old 6 routes
const oldDirs = [
  'limitations-to-agents',
  'tool-ladder',
  'mcp-revolution',
  'build-mcp-sql',
  'agentic-rag-hr',
  'langchain-vs-langgraph'
];
oldDirs.forEach(dir => {
  const p = path.join(basePath, dir);
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
  }
});

// 2. Create new 4 quarters
const pages = [
  {
    dir: 'q1-tool-factory',
    title: 'Quarter 1: The Wall & The First Tools',
    desc: 'The pivot from Chatbots to Agentic AI, and building our first deterministic tools (Calculator & SQL).',
    component: 'ToolFactoryHandsOn',
    importPath: '../components/ToolFactoryHandsOn'
  },
  {
    dir: 'q2-agentic-rag',
    title: 'Quarter 2: Agentic RAG & LangGraph',
    desc: 'Combining structured SQL with unstructured RAG, and using LangGraph state machines for robust routing.',
    components: [
      { name: 'AgenticRagHrChatbot', path: '../components/AgenticRagHrChatbot' },
      { name: 'LangChainVsLangGraph', path: '../components/LangChainVsLangGraph' }
    ]
  },
  {
    dir: 'q3-mcp-revolution',
    title: 'Quarter 3: The MCP Revolution',
    desc: 'Solving the N x M plumbing crisis by wrapping our SQL/RAG tools in a standard MCP server.',
    component: 'McpTemplateHandsOn',
    importPath: '../components/McpTemplateHandsOn'
  },
  {
    dir: 'q4-scaling-security',
    title: 'Quarter 4: Scaling, Security & Governance',
    desc: 'RAG/Agent scaling theory, followed by a Red-Teaming lab to test guardrails and RBAC on our HR Chatbot.',
    component: 'RedTeamingAgentHandsOn',
    importPath: '../components/RedTeamingAgentHandsOn'
  }
];

pages.forEach((p, idx) => {
  const dirPath = path.join(basePath, p.dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const prev = idx > 0 ? pages[idx-1].dir : null;
  const next = idx < pages.length - 1 ? pages[idx+1].dir : null;

  let imports = `import Link from 'next/link';\nimport { ArrowRight, ArrowLeft } from 'lucide-react';\n`;
  if (p.component) {
    imports += `import ${p.component} from '${p.importPath}';\n`;
  } else if (p.components) {
    p.components.forEach(c => {
      imports += `import ${c.name} from '${c.path}';\n`;
    });
  }

  let componentRender = '';
  if (p.component) {
    componentRender = `<div className="my-12">\n        <${p.component} />\n      </div>`;
  } else if (p.components) {
    p.components.forEach(c => {
      componentRender += `<div className="my-12">\n        <${c.name} />\n      </div>\n`;
    });
  }

  const content = `${imports}
export default function Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-blue-400 font-mono text-sm font-bold uppercase tracking-wider">Day 5 · Quarter ${idx + 1}</span>
        <h1 className="text-4xl font-extrabold text-white mt-1 mb-4">
          ${p.title}
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          ${p.desc}
        </p>
      </div>

      ${componentRender}

      <div className="flex justify-between pt-8 border-t border-slate-800">
        ${prev ? `<Link href="/day5/${prev}" className="button-secondary">\n          <ArrowLeft size={16} /> Previous\n        </Link>` : `<div></div>`}
        ${next ? `<Link href="/day5/${next}" className="button-primary">\n          Next <ArrowRight size={16} />\n        </Link>` : `<Link href="/day6" className="button-primary">\n          Continue to Day 6 <ArrowRight size={16} />\n        </Link>`}
      </div>
    </div>
  );
}
`;
  
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
});

console.log('4 Quarter Pages generated successfully!');
