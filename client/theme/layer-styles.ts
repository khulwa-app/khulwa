import { defineLayerStyles } from "@chakra-ui/react";

// Khulwa's floating-chrome material. Everything that floats over a photo
// space (dock items, pills, the doing-now card, tool panels) draws from this
// one definition so the whole chrome family reads as the same glass.
export const layerStyles = defineLayerStyles({
  glass: {
    description: "quiet glass — dock items, pills, doing-now card",
    value: {
      background: "bg.elevated/55",
      backdropFilter: "blur(8px)",
      boxShadow: "glass",
    },
  },
  // Same family, thicker scrim: text-dense surfaces (task panel) need more
  // backing than a pill or icon to stay readable over a busy photo. Edge
  // definition comes from the hairline ring inside the glass shadows, not a
  // border.
  "glass.dense": {
    description: "dense glass — panels with body text over media",
    value: {
      background: "bg.elevated/80",
      backdropFilter: "blur(16px)",
      boxShadow: "glass.dense",
    },
  },
});
