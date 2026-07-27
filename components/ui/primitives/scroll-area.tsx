import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function NativeScrollArea({ className, children, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={cn("min-h-0 overflow-auto overscroll-contain pr-1", className)} {...props}>{children}</div>;
}
