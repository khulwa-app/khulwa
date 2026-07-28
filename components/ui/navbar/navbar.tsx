"use client";

import type { ReactNode } from "react";
import { Logo } from "@/components/ui";

export function Navbar({ children }: { children?: ReactNode }) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
      <div className="pointer-events-auto"><Logo size="8" variant="white" /></div>
      {children ? <div className="pointer-events-auto flex min-w-0 flex-col items-end gap-2">{children}</div> : null}
    </header>
  );
}
