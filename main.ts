// Fix Human Sleep: Funniest Patch Note.
// Writes one line of patch notes announcing that human sleep is fixed.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE: string =
  "Sleep now ships with an off switch. Side effect: users report dreaming in 4K.";

const outDir: string | undefined = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

// Gate: 1-160 characters, single line, not only whitespace.
if (LINE.length < 1 || LINE.length > 160 || !LINE.trim() || LINE.includes("\n")) {
  console.error("entry fails the gate");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target: string = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Read back and assert byte-identical output: the gate is exact.
const back: string = readFileSync(target, "utf8");
if (back !== LINE || Buffer.byteLength(back, "utf8") !== 77) {
  console.error("read-back mismatch");
  process.exit(1);
}
