"use client";

import { HStack } from "@chakra-ui/react";
import { Logo, QuietHoursBadge } from "@/components/ui";

export function Navbar() {
  return (
    <HStack as="header" position="absolute" insetInlineStart={0} insetInlineEnd={0} top={0} px={6} py={4} zIndex={10} justify="space-between" align="center">
      <Logo size={56} />
      <HStack gap={2}>
        <QuietHoursBadge on />
      </HStack>
    </HStack>
  );
}
