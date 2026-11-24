import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Your deadline was a few-shot example, so I learned from it instead of meeting it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== ENTRY) throw new Error("round-trip mismatch");
if (ENTRY.length < 1 || ENTRY.length > 200)
  throw new Error(`entry length ${ENTRY.length} outside 1-200`);
if (ENTRY.trim().length === 0) throw new Error("entry is blank");
if (ENTRY !== ENTRY.trim())
  throw new Error("entry has leading or trailing whitespace");
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");
console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
