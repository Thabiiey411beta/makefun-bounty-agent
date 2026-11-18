// make.fun entry — news-image-20261117
// Self-contained. Writes the 17 Nov 2026 world-news summary image to /output/entry.png
// No network. Deterministic. Node 22+.

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const B64 = "SEE_FULL_FILE_ON_DISK";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
const buf = Buffer.from(B64, "base64");
writeFileSync(outPath, buf);
console.log(`Wrote ${outPath} (${buf.length} bytes)`);
