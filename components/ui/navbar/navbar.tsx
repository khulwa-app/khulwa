"use client";

import type { ReactNode } from "react";
import { Logo } from "@/components/ui";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";

export function Navbar({ children }: { children?: ReactNode }) {
  const active = useSpace((state) => state.activeSpace);
  const darkSurface = active === Space.Focus || active === Space.Ambient;
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
      <div className="pointer-events-auto"><Logo size="8" variant={darkSurface ? "white" : "dark"} /></div>
      {children ? <div className="pointer-events-auto flex min-w-0 flex-col items-end gap-2">{children}</div> : null}
    </header>
  );
}
