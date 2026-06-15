import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticShadows = defineSemanticTokens.shadows({
  focus: { value: "{shadows.focus}" },
  "glow-sage": { value: "{shadows.glow-sage}" },

  // The chrome family's shadow: top catch-light + hairline ring + depth.
  // One name per elevation so every glass surface (dock, pills, doing-now
  // card, panels) composes the same three layers.
  glass: {
    value: "{shadows.edge-highlight}, {shadows.edge-ring}, {shadows.sm}",
  },
  "glass.hover": {
    value: "{shadows.edge-highlight}, {shadows.edge-ring}, {shadows.md}",
  },
  "glass.dense": {
    value: "{shadows.edge-highlight}, {shadows.edge-ring}, {shadows.lg}",
  },
});
