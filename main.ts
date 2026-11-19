// main.ts — THE WORLD, 19 November 2026 (make.fun news-image-20261119)
//
// Validates the front-page image entry.png next to this script and copies
// it into the output directory given as the first argument.
//
// Usage: node main.ts ./out
//
// The checks are strict on purpose: the file must be a real PNG with a
// 13-byte IHDR chunk, an IEND trailer, exactly 1024x1024 pixels, and a
// total size of at most 1 MiB. Anything else fails loudly and nothing
// is copied.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const MAX_BYTES = 1024 * 1024;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  const outDir = process.argv[2];
  if (!outDir) {
    fail("missing output directory argument — usage: node main.ts <out-dir>");
  }

  // entry.png lives next to this script. Prefer the script's own folder
  // when it is known, and fall back to the working directory otherwise.
  const scriptDir =
    typeof __dirname !== "undefined" ? __dirname : process.cwd();
  const source = join(scriptDir, "entry.png");
  if (!existsSync(source)) {
    fail(`entry.png not found next to main.ts (${source})`);
  }

  const size = statSync(source).size;
  if (size > MAX_BYTES) {
    fail(`entry.png is ${size} bytes, over the 1 MiB limit`);
  }

  const data = readFileSync(source);
  if (data.length < 8 || !data.subarray(0, 8).equals(PNG_SIGNATURE)) {
    fail("entry.png is not a PNG file (bad signature)");
  }

  // First chunk must be IHDR and its length field must read exactly 13.
  if (data.length < 25) {
    fail("entry.png is too short to hold a PNG header");
  }
  const firstLength = data.readUInt32BE(8);
  const firstType = data.subarray(12, 16).toString("ascii");
  if (firstType !== "IHDR") {
    fail(`first chunk is ${firstType}, expected IHDR`);
  }
  if (firstLength !== 13) {
    fail(`IHDR chunk length is ${firstLength}, expected 13`);
  }

  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
    fail(`entry.png is ${width}x${height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`);
  }

  // The file must end with a 12-byte IEND chunk: length 0, type IEND.
  if (data.length < 12) {
    fail("entry.png is too short to hold an IEND trailer");
  }
  const tail = data.subarray(data.length - 12);
  if (tail.readUInt32BE(0) !== 0 || tail.subarray(4, 8).toString("ascii") !== "IEND") {
    fail("entry.png has no IEND trailer");
  }

  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.png");
  copyFileSync(source, target);
  // Confirm the copy landed whole before reporting success.
  const copiedSize = statSync(target).size;
  if (copiedSize !== size) {
    fail(`copy incomplete: ${target} is ${copiedSize} bytes, expected ${size}`);
  }
  console.log(`entry.png: ${width}x${height}, ${size} bytes -> ${target}`);
}

main();
