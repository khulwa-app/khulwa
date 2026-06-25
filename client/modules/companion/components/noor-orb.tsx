"use client";

import { Box } from "@chakra-ui/react";

export function NoorOrb({ size = 88, bloom = false }: { size?: number; bloom?: boolean }) {
  return (
    <Box
      key={bloom ? "bloom" : "rest"}
      aria-hidden
      boxSize={`${size}px`}
      layerStyle="noor"
      // Promote to its own compositor layer so the orb's animated filter
      // repaints in isolation and never invalidates the rest of the page.
      willChange="transform"
      // Rest: two stacked animations — a faster glowing pulse + a continuous
      // one-direction hue cycle, so the orb is always living and shifting.
      animationName={bloom ? "noor-bloom" : "noor-pulse, noor-hue"}
      animationDuration={bloom ? "0.8s" : "3.2s, 7s"}
      animationTimingFunction={bloom ? "ease-in-out" : "ease-in-out, ease-in-out"}
      animationIterationCount={bloom ? "1" : "infinite, infinite"}
      _motionReduce={{ animationName: "none", opacity: 0.85 }}
    />
  );
}
