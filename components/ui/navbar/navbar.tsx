import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";

export function Navbar({ children }: { children?: ReactNode }) {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-4 py-4 md:px-6 md:py-5">
      <Logo />
      <div className="flex min-w-0 items-center gap-2">{children}</div>
    </header>
  );
}
