"use client";

import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { Space } from "@/modules/space/types";
import { backgroundById } from "../backgrounds";
import { useBackground } from "../hooks/use-background-store.hook";

// Flat (default) renders nothing — the space's themed `bg.base` shows through.
// A photo wallpaper renders full-bleed with a solid scrim + grain (no gradients
// or glow) so the on-media text stays legible over it.
export function SpaceBackground({ space }: { space: Space }) {
  const id = useBackground((s) => s.bySpace[space]);
  const bg = backgroundById(id);

  if (bg.kind !== "photo") return null;

  return (
    <Box position="absolute" inset={0} zIndex={0} overflow="hidden" pointerEvents="none" aria-hidden>
      <Image src={bg.src} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      <Box position="absolute" inset={0} bg="black" opacity={0.5} />
      <Box position="absolute" inset={0} layerStyle="grain" />
    </Box>
  );
}
