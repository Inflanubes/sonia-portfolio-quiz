/**
 * inject-env.js — replaces placeholders in JS files with environment variable values.
 * Run automatically by Vercel's build command (see vercel.json).
 * Also run locally: node scripts/inject-env.js
 */

const fs   = require('fs');
const path = require('path');

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || '';

if (!APPS_SCRIPT_URL) {
  console.error('[inject-env] ERROR: APPS_SCRIPT_URL environment variable is not set.');
  console.error('  Local: add it to your .env file and run: node scripts/inject-env.js');
  console.error('  Vercel: add it in Project Settings → Environment Variables');
  process.exit(1);
}

const trackerPath = path.join(__dirname, '..', 'js', 'tracker.js');
const content     = fs.readFileSync(trackerPath, 'utf8');

if (!content.includes('__APPS_SCRIPT_URL__')) {
  console.log('[inject-env] tracker.js already has the URL injected — skipping.');
  process.exit(0);
}

const updated = content.replace('__APPS_SCRIPT_URL__', APPS_SCRIPT_URL);
fs.writeFileSync(trackerPath, updated, 'utf8');

console.log('[inject-env] APPS_SCRIPT_URL injected into js/tracker.js');
