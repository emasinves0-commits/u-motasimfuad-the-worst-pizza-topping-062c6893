// The Worst Pizza Topping entry: writes exactly one funny line to entry.txt.
//
// The line: a pizza topped with last year's tax return, plus a handwritten
// note billing the eater $47.32. The topping is not just inedible paper —
// it is still doing its job, dunning you for an insultingly exact debt.
// One clean turn, one specific number, deadpan pitch voice. That is why it
// beat the frequent-flyer mini-pizza and the $75 parking ticket in the
// glm-5.3-flash duels (2-0 against both).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line, exactly 133 characters / 141 bytes UTF-8. The apostrophe
// in "year's", the em dash, and the quotes around the note are curly
// (U+2019 / U+2014 / U+201C / U+201D); the quotes around Retired Accountant
// are plain ASCII, exactly as the line was generated and dueled. They are
// stored as \u escapes here to keep the source plain ASCII.
const LINE =
  "Our new \u0022Retired Accountant\u0022 pizza comes topped with last year\u2019s tax return\u2014complete with a handwritten note saying \u201cYou owe $47.32.\u201d";

const MIN_LENGTH = 1;
const MAX_LENGTH = 200;
const OUTPUT_FILE = "entry.txt";

// Line breaks to reject: CR, LF, NEL (U+0085), U+2028, U+2029.
const LINE_BREAKS = new RegExp("[\\r\\n\\u0085\\u2028\\u2029]");

function validate(line: string): void {
  // Count code points, not UTF-16 code units, so a non-BMP character
  // would count once, the way the gate counts characters.
  const length = [...line].length;
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(
      `Line must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${length}.`,
    );
  }
  if (LINE_BREAKS.test(line)) {
    throw new Error("Line must be a single line (no line breaks).");
  }
  if (line.trim().length === 0) {
    throw new Error("Line must not be only whitespace.");
  }
}

function main(): void {
  validate(LINE);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  // No trailing newline: the file holds exactly the line, nothing else.
  writeFileSync(join(outputDir, OUTPUT_FILE), LINE, "utf8");
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
