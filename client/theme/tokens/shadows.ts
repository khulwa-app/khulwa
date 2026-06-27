import { defineTokens } from "@chakra-ui/react";

export const shadows = defineTokens.shadows({
  focus: { value: "0 0 0 2px {colors.bg.elevated}, 0 0 0 4px {colors.ring}" },

  xsLight: { value: "0 1px 2px rgba(26, 24, 20, 0.04)" },
  smLight: { value: "0 1px 2px rgba(26, 24, 20, 0.05), 0 2px 6px rgba(26, 24, 20, 0.06)" },
  mdLight: { value: "0 2px 4px rgba(26, 24, 20, 0.06), 0 8px 24px rgba(26, 24, 20, 0.08)" },
  lgLight: { value: "0 4px 8px rgba(26, 24, 20, 0.06), 0 16px 40px rgba(26, 24, 20, 0.10)" },
  xlLight: { value: "0 8px 16px rgba(26, 24, 20, 0.08), 0 24px 64px rgba(26, 24, 20, 0.12)" },

  xsDark: { value: "0 1px 2px rgba(0, 0, 0, 0.30)" },
  smDark: { value: "0 1px 2px rgba(0, 0, 0, 0.32), 0 2px 6px rgba(0, 0, 0, 0.36)" },
  mdDark: { value: "0 2px 4px rgba(0, 0, 0, 0.38), 0 8px 24px rgba(0, 0, 0, 0.44)" },
  lgDark: { value: "0 4px 8px rgba(0, 0, 0, 0.40), 0 16px 40px rgba(0, 0, 0, 0.50)" },
  xlDark: { value: "0 8px 16px rgba(0, 0, 0, 0.44), 0 24px 64px rgba(0, 0, 0, 0.58)" },

  glowSageLight: { value: "0 0 32px 4px rgba(124, 152, 133, 0.30)" },
  glowSageDark: { value: "0 0 32px 6px rgba(124, 152, 133, 0.22)" },
});
