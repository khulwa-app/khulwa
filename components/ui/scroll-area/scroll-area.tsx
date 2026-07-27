import type { HTMLAttributes, ReactNode } from "react";
import { NativeScrollArea } from "@/components/ui/primitives";

interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Native overflow area; themed scrollbars are intentionally left to the browser. */
export function ScrollArea({ children, ...props }: ScrollAreaProps) {
  return <NativeScrollArea {...props}>{children}</NativeScrollArea>;
}
