import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** 44px capsule holding 36px controls at 4px padding — plan section 6.1. */
export function DockCapsule({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "pointer-events-auto flex h-11 items-center gap-1 rounded-full border border-hairline bg-surface-veil p-1 shadow-dock backdrop-blur-[10px]",
        className,
      )}
      {...props}
    />
  );
}
