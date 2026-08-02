import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

/**
 * Text fields go through one component with a `variant`, because the radius/padding pairing that
 * keeps a browser from clipping content and selection highlights is decided per variant. A
 * hand-rolled `<input>` opts out of that reasoning silently — which is exactly how the ETA field
 * ended up rendering its selection as a clipped lozenge.
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

test("no hand-rolled text fields outside the primitives", () => {
  const offenders: string[] = [];

  for (const dir of SCAN_DIRS) {
    for (const file of walk(join(ROOT, dir))) {
      const source = readFileSync(file, "utf8");
      for (const match of source.matchAll(/<(input|textarea)\b/g)) {
        offenders.push(`${file.replace(`${ROOT}/`, "")}: <${match[1]}>`);
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `use <Input>/<Textarea> with a variant instead of a raw element:\n  ${offenders.join("\n  ")}`,
  );
});

test("every field variant pairs its radius with enough inline padding", () => {
  // A stadium sets radius = height/2 and a rounded box clips content to its padding box, so any
  // variant that carries a radius has to spend at least that much inline padding. `plain` is the
  // case that cannot, which is why it takes no radius at all.
  const RADIUS_PX: Record<string, number> = { "rounded-md": 12, "rounded-lg": 14, "rounded-xl": 20 };
  const PADDING_PX: Record<string, number> = { "px-3": 12, "px-4": 16 };

  for (const primitive of ["input", "textarea"]) {
    const source = readFileSync(join(ROOT, "components/shadcn", `${primitive}.tsx`), "utf8");
    const variants = [...source.matchAll(/^\s{8}(outlined|filled|plain):\s*\n?\s*"([^"]+)"/gm)];
    assert.ok(variants.length > 0, `no variants parsed from ${primitive}.tsx`);

    for (const [, name, classes] of variants) {
      const radiusClass = Object.keys(RADIUS_PX).find((r) => classes.includes(r));
      if (!radiusClass) {
        assert.ok(
          classes.includes("rounded-none"),
          `${primitive}.${name} has no radius class — pin it with rounded-none so intent is explicit`,
        );
        continue;
      }
      const padClass = Object.keys(PADDING_PX).find((p) => classes.includes(p));
      assert.ok(padClass, `${primitive}.${name} carries ${radiusClass} but no inline padding`);
      assert.ok(
        PADDING_PX[padClass!] >= RADIUS_PX[radiusClass],
        `${primitive}.${name}: ${padClass} (${PADDING_PX[padClass!]}px) is less than ${radiusClass} (${RADIUS_PX[radiusClass]}px)`,
      );
    }
  }
});
