"use client";

import { Nav } from "@/theme/slot-recipes/navbar";
import { Logo } from "@/components/ui";

export function Navbar() {
  return (
    <Nav.Root>
      <Nav.Brand>
        <Logo size="8" />
      </Nav.Brand>
    </Nav.Root>
  );
}
