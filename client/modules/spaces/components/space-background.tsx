"use client";

import { Box } from "@chakra-ui/react";

export function SpaceBackground() {
  return <Box position="absolute" inset={0} zIndex={0} pointerEvents="none" aria-hidden layerStyle="space-backdrop" />;
}
