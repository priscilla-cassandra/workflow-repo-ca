// Reads .env (via dotenv) and writes the public config the browser needs into
// js/env.js. The browser cannot read .env directly on this no-build static site,
// so this script bridges the gap. It runs automatically before `npm run dev`.
//
// Only put values here that are safe to ship to the browser. The Noroff API base
// URL is public, and the Noroff API key is account-scoped and travels in a request
// header anyway, so neither is a real secret — but keeping them in .env lets each
// person configure their own without editing tracked files.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import dotenv from "dotenv";

dotenv.config();

const env = {
  API_BASE_URL: process.env.API_BASE_URL || "https://v2.api.noroff.dev",
  API_KEY: process.env.API_KEY || "",
};

const outPath = resolve(dirname(fileURLToPath(import.meta.url)), "../js/env.js");

const contents = `// AUTO-GENERATED from .env by \`npm run env\` (scripts/generate-env.mjs).
// Do not edit by hand and do not commit — this file is gitignored.
export const ENV = ${JSON.stringify(env, null, 2)};
`;

writeFileSync(outPath, contents);

console.log(`Generated js/env.js (API_BASE_URL=${env.API_BASE_URL})`);
