// make.fun entry — news-image-20261117
// Assembles entry image from part*.b64 files and writes /output/entry.png
// No network. Deterministic. Node 22+.

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const parts = readdirSync(__dirname)
  .filter(f => /^part\d+\.b64$/.test(f))
  .sort((a, b) => parseInt(a.slice(4)) - parseInt(b.slice(4)));
const b64 = parts.map(f => readFileSync(join(__dirname, f), "utf8").trim()).join("");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
const buf = Buffer.from(b64, "base64");
writeFileSync(outPath, buf);
console.log(`Wrote ${outPath} (${buf.length} bytes from ${parts.length} parts)`);
