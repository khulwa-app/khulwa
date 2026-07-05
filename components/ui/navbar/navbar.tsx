"use client";

import type { ReactNode } from "react";
import { Nav } from "@/theme/slot-recipes/navbar";
import { Logo } from "@/components/ui";

export function Navbar({ children }: { children?: ReactNode }) {
  return (
    <Nav.Root>
      <Nav.Brand>
        <Logo size="12" variant="white" />
      </Nav.Brand>
      <Nav.Actions>{children}</Nav.Actions>
    </Nav.Root>
  );
}
