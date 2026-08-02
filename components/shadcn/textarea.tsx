import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Deviation from the generated template: the same `variant` axis as Input, so a multi-line field
 * is configured the same way as a single-line one. No `plain` variant — nothing in the product
 * needs a surface-less textarea, and an unused variant is a guess rather than a decision.
 */
const textareaVariants = cva(
  "field-sizing-content w-full text-base outline-none transition-[color,box-shadow] placeholder:text-foreground-muted disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        /** Bordered field standing on its own. `px-3` matches the 12px radius exactly. */
        outlined:
          "min-h-16 rounded-md border border-input bg-transparent px-3 py-2 shadow-xs focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        /** Filled writing surface. `px-4` clears the 14px radius so selection ends land in padding. */
        filled:
          "rounded-lg bg-surface-elevated px-4 py-2.5 leading-6 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring",
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  }
)

function Textarea({
  className,
  variant = "outlined",
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant}
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
