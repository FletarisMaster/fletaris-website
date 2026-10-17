// Copies the facts the trust page shows from the app repo (fletaris-personal), so the website
// and the app's legal pages keep one source of truth: F02's subprocessor list and data
// residency (src/content/legal/subprocessors.ts). Re-run and commit whenever that file changes:
//
//   node scripts/sync-app-data.mjs ../fletaris-personal
//
// Node 24 strips the TypeScript types on import, so no build step is needed.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const appRepo = process.argv[2];
if (!appRepo) {
  console.error('Usage: node scripts/sync-app-data.mjs <path to fletaris-personal>');
  process.exit(1);
}

const source = 'src/content/legal/subprocessors.ts';
const { SUBPROCESSORS, DATA_RESIDENCY } = await import(pathToFileURL(resolve(appRepo, source)).href);
const commit = execFileSync('git', ['-C', appRepo, 'log', '-1', '--format=%h', '--', source], { encoding: 'utf8' }).trim();

const out = resolve(import.meta.dirname, '../src/data/app/trust.json');
writeFileSync(
  out,
  JSON.stringify({ source: `fletaris-personal/${source}@${commit}`, dataResidency: DATA_RESIDENCY, subprocessors: SUBPROCESSORS }, null, 2) + '\n',
);
console.log(`Wrote ${out} from ${source}@${commit}`);
