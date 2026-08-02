import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * A text control with no surface of its own. It sits inside a container that owns the border,
 * background, and focus treatment — a quick-add row, a composer bar, a task row.
 *
 * It carries **no border radius on purpose**, and that is the whole reason this exists rather than
 * each call site hand-rolling `bg-transparent`:
 *
 * The browser clips a field's native selection highlight to its border-radius. On a control with a
 * surface that is invisible — and therefore usually no inline padding either — the arc cuts into
 * the glyphs instead of into empty padding. It is worst on narrow fields, where the radius clamps
 * to half the shorter side and the whole field renders as a lozenge: a 24px-wide ETA field with a
 * 12px radius has no straight edge left at all, so selecting its text hid the first digit.
 *
 * The rule this encodes: **radius is a property of a surface.** No surface, no radius. If one of
 * these ever gains a real background, it also has to earn `padding-inline >= radius` first.
 *
 * `tests/plain-field.test.ts` fails the build if a transparent input picks up a radius again.
 */
export function PlainField({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      data-slot="plain-field"
      className={cn(
        "min-w-0 flex-1 rounded-none bg-transparent outline-none",
        "placeholder:text-foreground-muted",
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
        className,
      )}
      {...props}
    />
  );
}
