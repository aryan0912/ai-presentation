import fs from 'fs';
import path from 'path';

const projectRoot = 'd:/part2/ai-presentation';
const intermediateDir = path.join(projectRoot, '.ua', 'intermediate');
const uaDir = path.join(projectRoot, '.ua');

const assembled = JSON.parse(fs.readFileSync(path.join(intermediateDir, 'assembled-graph.json'), 'utf8'));
const layers = JSON.parse(fs.readFileSync(path.join(intermediateDir, 'layers.json'), 'utf8'));
const tour = JSON.parse(fs.readFileSync(path.join(intermediateDir, 'tour.json'), 'utf8'));

const finalGraph = {
  version: '1.0.0',
  project: {
    name: 'ai-presentation',
    languages: ['Python', 'TypeScript', 'HTML', 'CSS', 'Markdown'],
    frameworks: ['FastAPI', 'Next.js', 'React', 'NumPy', 'Recharts'],
    description: 'AI for ICT Team Presentation, Interactive Visualizers, and Computational Backend',
    analyzedAt: new Date().toISOString(),
    gitCommitHash: '053512e0973e159b5d25512be76f7980cfb23a43'
  },
  nodes: assembled.nodes,
  edges: assembled.edges,
  layers: layers,
  tour: tour
};

// Validate
const nodeIds = new Set(finalGraph.nodes.map(n => n.id));
const edgeNodeIds = new Set();
finalGraph.edges.forEach(e => {
  edgeNodeIds.add(e.source);
  edgeNodeIds.add(e.target);
});

console.log(`Total nodes: ${finalGraph.nodes.length}`);
console.log(`Total edges: ${finalGraph.edges.length}`);
console.log(`Total layers: ${finalGraph.layers.length}`);
console.log(`Tour steps: ${finalGraph.tour.length}`);

// Write final graph
fs.writeFileSync(path.join(uaDir, 'knowledge-graph.json'), JSON.stringify(finalGraph, null, 2));

// Write meta.json
const meta = {
  lastAnalyzedAt: new Date().toISOString(),
  gitCommitHash: '053512e0973e159b5d25512be76f7980cfb23a43',
  version: '1.0.0',
  analyzedFiles: 39
};
fs.writeFileSync(path.join(uaDir, 'meta.json'), JSON.stringify(meta, null, 2));

console.log('Knowledge graph and meta.json successfully written!');
