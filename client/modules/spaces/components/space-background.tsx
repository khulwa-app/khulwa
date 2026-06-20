"use client";

import Image from "next/image";
import { Box } from "@chakra-ui/react";

interface SpaceBackgroundProps {
  src: string;
  tint?: number;
}

export function SpaceBackground({ src, tint = 0.4 }: SpaceBackgroundProps) {
  return (
    <Box position="absolute" inset={0} zIndex={0} overflow="hidden" pointerEvents="none" aria-hidden>
      <Image src={src} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      <Box position="absolute" inset={0} bg="black" opacity={tint} />
      <Box
        position="absolute"
        inset={0}
        bgGradient="to-b"
        gradientFrom="rgba(0,0,0,0.45)"
        gradientVia="rgba(0,0,0,0.1)"
        gradientTo="rgba(0,0,0,0.55)"
      />
    </Box>
  );
}
