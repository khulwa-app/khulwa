import { defineSemanticTokens } from "@chakra-ui/react";

// Per-space gradients deferred to user-selectable Background Picker.
// Single canvas gradient kept as subtle wash for default surface.
export const semanticGradients = defineSemanticTokens.gradients({
  canvasBg: {
    value: "{gradients.appCanvas}",
  },
  brandSheen: {
    value: "{gradients.brandSheen}",
  },
});
