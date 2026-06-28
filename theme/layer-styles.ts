import { defineLayerStyles } from "@chakra-ui/react";

export const layerStyles = defineLayerStyles({
  scrim: {
    description: "modal backdrop",
    value: {
      bg: "bg.scrim",
      backdropFilter: "blur(2px)",
    },
  },
  "space-backdrop": {
    description: "vivid brand mesh behind spaces — full-bleed indigo→violet→magenta→pink",
    value: {
      backgroundColor: "{colors.violet.50}",
      backgroundImage:
        "radial-gradient(58% 54% at 84% 14%, {colors.magenta.300} 0%, {colors.magentaClear} 58%)," +
        "radial-gradient(56% 52% at 78% 86%, {colors.magenta.200} 0%, {colors.magentaClear} 56%)," +
        "radial-gradient(70% 66% at 14% 86%, {colors.violet.300} 0%, {colors.violetClear} 62%)," +
        "radial-gradient(52% 48% at 4% 8%, {colors.indigo.200} 0%, {colors.indigoClear} 55%)," +
        "radial-gradient(100% 90% at 48% 54%, {colors.violet.200} 0%, {colors.violetClear} 70%)",
      _dark: {
        backgroundColor: "{colors.indigo.700}",
        backgroundImage:
          "radial-gradient(62% 58% at 85% 12%, {colors.magenta.500} 0%, {colors.magentaClear} 56%)," +
          "radial-gradient(58% 54% at 80% 88%, {colors.magenta.400} 0%, {colors.magentaClear} 55%)," +
          "radial-gradient(74% 70% at 12% 84%, {colors.violet.500} 0%, {colors.violetClear} 62%)," +
          "radial-gradient(58% 54% at 4% 8%, {colors.indigo.500} 0%, {colors.indigoClear} 56%)," +
          "radial-gradient(92% 82% at 48% 52%, {colors.violet.600} 0%, {colors.violetClear} 70%)",
      },
    },
  },
  noor: {
    description: "the Noor companion — living violet→magenta light",
    value: {
      backgroundImage:
        "radial-gradient(circle at 50% 40%, {colors.violet.400} 0%, {colors.violet.500} 26%, {colors.magenta.500} 60%, {colors.magenta.400} 74%, {colors.magentaClear} 86%)",
      borderRadius: "full",
      filter: "blur(3px)",
      boxShadow: "0 0 40px 8px {colors.magentaA.400}, 0 0 22px 2px {colors.violetA.500}",
      _dark: {
        backgroundImage:
          "radial-gradient(circle at 50% 40%, {colors.violet.300} 0%, {colors.violet.400} 26%, {colors.magenta.400} 60%, {colors.magenta.500} 74%, {colors.magentaClear} 86%)",
      },
    },
  },
  sliderAccent: {
    description: "slim jade volume slider",
    value: {
      "& [data-part=track]": { bg: "border.subtle" },
      "& [data-part=range]": { bg: "primary.default" },
      "& [data-part=thumb]": {
        bg: "primary.default",
        borderColor: "bg.elevated",
        boxShadow: "sm",
      },
    },
  },

  card: {
    description: "resting surface card",
    value: {
      background: "surface.card",
      borderWidth: "1px",
      borderColor: "border.subtle",
      borderRadius: "surface",
      boxShadow: "sm",
    },
  },
  "card-anchor": {
    description: "anchor surface card — roundest tier (doing-now, resume)",
    value: {
      background: "surface.card",
      borderWidth: "1px",
      borderColor: "border.subtle",
      borderRadius: "surface",
      boxShadow: "sm",
    },
  },
  raised: {
    description: "glass-chrome — floating chrome (dock, timer pill, badges)",
    value: {
      background: "glass.chromeBg",
      borderWidth: "1px",
      borderColor: "glass.border",
      backdropFilter: "blur(16px) saturate(1.3)",
      boxShadow: "md",
    },
  },
  overlay: {
    description: "glass-panel — modals / palette / sheets / tool panel / menus",
    value: {
      background: "glass.panelBg",
      borderWidth: "1px",
      borderColor: "glass.border",
      borderRadius: "surface",
      backdropFilter: "blur(28px) saturate(1.4)",
      boxShadow: "xl",
    },
  },
});
