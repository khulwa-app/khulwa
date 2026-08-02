import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Deviation from the generated template: a `variant` axis, so every text field in the product is
 * this one component. Each variant pairs its radius with its padding deliberately, because a
 * browser clips a field's content *and its native selection highlight* to the border radius — a
 * radius larger than the inline padding eats into the glyphs.
 */
const inputVariants = cva(
  "w-full min-w-0 text-base outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-foreground-muted disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        /** Bordered field standing on its own. `px-3` matches the 12px radius exactly. */
        outlined:
          "h-9 rounded-md border border-input bg-transparent px-3 py-1 shadow-xs file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        /** Filled writing surface. `px-4` clears the 14px radius so selection ends land in padding. */
        filled:
          "rounded-lg bg-surface-elevated px-4 py-2.5 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring",
        /**
         * No surface of its own — the parent owns the border, background, and focus treatment.
         * Flush by design, so it has no padding to spend, so it takes no radius. This is the
         * variant that stopped selection rendering as a clipped lozenge on narrow fields.
         */
        plain:
          "flex-1 rounded-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  }
)

function Input({
  className,
  type,
  variant = "outlined",
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
