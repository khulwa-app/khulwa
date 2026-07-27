import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Panel({ className, children, ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return <section className={cn("rounded-panel border border-sage-300 bg-base-100", className)} {...props}>{children}</section>;
}

export function PanelHeader({ className, children, ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return <header className={cn("flex items-center justify-between gap-4 border-b border-sage-300 px-5 py-4", className)} {...props}>{children}</header>;
}

export function PanelBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={cn("p-5", className)} {...props}>{children}</div>;
}
