import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

/**
 * A browser clips a text control's native selection highlight to its border-radius. On a control
 * with no visible surface — and so usually no inline padding — that arc cuts into the glyphs
 * rather than into empty padding, and on a narrow field the radius clamps to half the box and eats
 * the first character outright. `components/ui/plain-field.tsx` exists to make "no surface, no
 * radius" the default; this keeps a hand-rolled input from quietly reintroducing the combination.
 */
const ROOT = join(import.meta.dirname, "..");
const SCAN_DIRS = ["app", "modules", "components/ui"];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return walk(full);
    return full.endsWith(".tsx") ? [full] : [];
  });
}

/**
 * Every `<input …>` / `<textarea …>` opening tag, as raw text. No dotall flag needed — the negated
 * class already spans newlines, which matters because these tags are written multi-line.
 */
function textControlTags(source: string): string[] {
  return [...source.matchAll(/<(?:input|textarea)\b[^>]*>/g)].map((m) => m[0]);
}

test("no transparent text control carries a border radius", () => {
  const offenders: string[] = [];

  for (const dir of SCAN_DIRS) {
    for (const file of walk(join(ROOT, dir))) {
      const source = readFileSync(file, "utf8");
      for (const tag of textControlTags(source)) {
        if (!tag.includes("bg-transparent")) continue;
        const radius = tag.match(/\brounded-(?!none\b)[a-z0-9[\]]+/);
        if (radius) {
          offenders.push(`${file.replace(`${ROOT}/`, "")}: ${radius[0]}`);
        }
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `transparent text controls must not be rounded — use PlainField instead:\n  ${offenders.join("\n  ")}`,
  );
});

test("PlainField itself pins the radius off", () => {
  const source = readFileSync(join(ROOT, "components/ui/plain-field.tsx"), "utf8");
  assert.match(source, /rounded-none/, "PlainField must set rounded-none explicitly");
  assert.match(source, /bg-transparent/, "PlainField must be transparent");
});
