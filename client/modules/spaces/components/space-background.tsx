"use client";

import { Box } from "@chakra-ui/react";

// Calm ambient wash behind every space — a subtle violet/magenta backdrop.
export function SpaceBackground() {
  return (
    <Box
      position="absolute"
      inset={0}
      zIndex={0}
      pointerEvents="none"
      aria-hidden
      layerStyle="space-backdrop"
    />
  );
}
