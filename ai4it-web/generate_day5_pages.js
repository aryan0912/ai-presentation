const fs = require('fs');
const path = require('path');

const basePath = 'd:/part2/ai-presentation/ai4it-web/src/app/day5';

const pages = [
  {
    dir: 'limitations-to-agents',
    title: '1. Limitations & The Pivot to Agents',
    desc: 'What LLMs fundamentally cannot do (math, live state, actions), and how Agentic AI bridges the gap.',
    component: null
  },
  {
    dir: 'tool-ladder',
    title: '2. The Tool Ladder: Calculator to API',
    desc: 'Attaching the simplest tool (Calculator) to build trust, then graduating to querying APIs and structured data.',
    component: null
  },
  {
    dir: 'mcp-revolution',
    title: '3. The MCP Revolution',
    desc: 'Why MCP if APIs already existed? Exploring the protocol and how to connect it to Claude, ChatGPT, and Antigravity.',
    component: null
  },
  {
    dir: 'build-mcp-sql',
    title: '4. Hands-on 1: Build a Synthetic SQL MCP',
    desc: 'Using a pre-written template to instantly build an MCP server that queries your internal databases.',
    component: 'McpTemplateHandsOn',
    importPath: '../components/McpTemplateHandsOn'
  },
  {
    dir: 'agentic-rag-hr',
    title: '5. Hands-on 2: The Agentic RAG HR Chatbot',
    desc: 'Routing between structured SQL data (leave balances) and unstructured vector search (leave policy).',
    component: 'AgenticRagHrChatbot',
    importPath: '../components/AgenticRagHrChatbot'
  },
  {
    dir: 'langchain-vs-langgraph',
    title: '6. Under the Hood: LangChain vs LangGraph',
    desc: 'Why linear pipelines failed agents, and how cyclic state machines (while loops) changed the game.',
    component: 'LangChainVsLangGraph',
    importPath: '../components/LangChainVsLangGraph'
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
  }

  const content = `${imports}
export default function Page() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-blue-400 font-mono text-sm font-bold uppercase tracking-wider">Day 5 · Block ${idx + 1}</span>
        <h1 className="text-4xl font-extrabold text-white mt-1 mb-4">
          ${p.title}
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          ${p.desc}
        </p>
      </div>

      ${p.component ? `<div className="my-12">\n        <${p.component} />\n      </div>` : `<div className="p-12 border border-slate-700 border-dashed rounded-2xl flex items-center justify-center text-slate-500">\n        Content for ${p.title} goes here.\n      </div>`}

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

console.log('Pages generated successfully!');
