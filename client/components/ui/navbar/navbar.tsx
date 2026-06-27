"use client";

import { Nav } from "@/theme/slot-recipes/navbar";
import { ColorModeToggle, Logo, QuietHoursBadge } from "@/components/ui";

export function Navbar() {
  return (
    <Nav.Root>
      <Nav.Brand>
        <Logo size="10" />
      </Nav.Brand>
      <Nav.Actions>
        <ColorModeToggle />
        <QuietHoursBadge on />
      </Nav.Actions>
    </Nav.Root>
  );
}
