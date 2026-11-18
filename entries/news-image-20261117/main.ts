// make.fun entry for news-image-20261117
// Deterministic: copies the pre-built summary image to /output/entry.png
// No network. Same bytes on every run.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.png");
const src = join(__dirname, "entry.png");

if (!existsSync(src)) {
  console.error("entry.png missing next to main.ts");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, outPath);
console.log(`Wrote ${outPath}`);
