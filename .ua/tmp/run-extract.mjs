import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const intermediateDir = 'd:/part2/ai-presentation/.ua/intermediate';
const batchesFile = path.join(intermediateDir, 'batches.json');
const batches = JSON.parse(fs.readFileSync(batchesFile, 'utf8'));

const userProfile = process.env.USERPROFILE || '';
const pluginRoot = path.join(userProfile, '.understand-anything', 'repo', 'understand-anything-plugin');
const skillScript = path.join(userProfile, '.gemini', 'config', 'skills', 'understand', 'extract-structure.mjs');

for (const b of batches.batches) {
  const inPath = path.join(intermediateDir, `batch-${b.batchIndex}-input.json`);
  const outPath = path.join(intermediateDir, `batch-${b.batchIndex}-structure.json`);
  fs.writeFileSync(inPath, JSON.stringify({
    projectRoot: 'd:/part2/ai-presentation',
    batchFiles: b.files,
    batchImportData: b.batchImportData
  }, null, 2));

  const cmd = `node "${skillScript}" "${inPath}" "${outPath}"`;
  execSync(cmd, {
    env: {
      ...process.env,
      NODE_PATH: `${pluginRoot}/node_modules;${pluginRoot}/packages/core/node_modules`,
      PLUGIN_ROOT: pluginRoot
    },
    stdio: 'inherit'
  });
  console.log(`Extracted batch ${b.batchIndex}`);
}
