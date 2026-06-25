"use client";

import { useEffect, useState } from "react";
import { HStack } from "@chakra-ui/react";
import { ColorModeToggle, Logo, QuietHoursBadge, useColorMode } from "@/components/ui";

export function Navbar() {
  const { colorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Gated on `mounted` to avoid hydration mismatch; defaults to the dark logo
  // (light theme) until the resolved color mode is known.
  const logoVariant = mounted && colorMode === "dark" ? "white" : "dark";

  return (
    <HStack as="header" position="absolute" insetInlineStart={0} insetInlineEnd={0} top={0} px={6} py={4} zIndex="navbar" justify="space-between" align="center">
      <Logo size={40} variant={logoVariant} />
      <HStack gap={2}>
        <ColorModeToggle />
        <QuietHoursBadge on />
      </HStack>
    </HStack>
  );
}
