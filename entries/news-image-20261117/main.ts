// make.fun entry — news-image-20261117
// Reads entry.png.b64 (base64 of the summary image) and writes /output/entry.png
// No network. Deterministic. Node 22+.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const b64 = readFileSync(join(__dirname, "entry.png.b64"), "utf8").trim();
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
const buf = Buffer.from(b64, "base64");
writeFileSync(outPath, buf);
console.log(`Wrote ${outPath} (${buf.length} bytes)`);
