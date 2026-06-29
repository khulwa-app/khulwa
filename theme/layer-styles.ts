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
    description: "deep liquid-glass mesh — indigo→violet→navy, theme-invariant, data-phase hue-shift, crossfade",
    value: {
      backgroundColor: "{colors.mesh.floor}",
      backgroundImage:
        "radial-gradient(55% 55% at 20% 16%, {colors.mesh.glowHi} 0%, transparent 48%)," +
        "radial-gradient(75% 70% at 8% 22%, {colors.mesh.glowIndigo} 0%, transparent 52%)," +
        "radial-gradient(80% 75% at 90% 85%, {colors.mesh.glowViolet} 0%, transparent 55%)," +
        "radial-gradient(70% 65% at 70% 55%, {colors.mesh.glowAzure} 0%, transparent 58%)",
      filter: "saturate(1.15)",
      transition: "filter {durations.mood} {easings.standard}",
      "&[data-phase=shortBreak]": { filter: "saturate(1.00) hue-rotate(-38deg)" },
      "&[data-phase=longBreak]": { filter: "saturate(1.05) hue-rotate(28deg)" },
      "&[data-phase=micro]": { filter: "saturate(0.55) brightness(0.82)" },
      "&[data-phase=alert]": { filter: "saturate(0.95) hue-rotate(115deg)" },
      _motionReduce: { transition: "none" },
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
    description: "content glass card — opaque surface + lit hairline + soft rim/lift",
    value: {
      background: "surface.card",
      borderWidth: "1px",
      borderColor: "glass.borderLit",
      borderRadius: "surface",
      boxShadow: "glass-rim-sm",
    },
  },
  "card-anchor": {
    description: "content glass anchor card — roundest tier (doing-now, resume)",
    value: {
      background: "surface.card",
      borderWidth: "1px",
      borderColor: "glass.borderLit",
      borderRadius: "surface",
      boxShadow: "glass-rim-sm",
    },
  },
  raised: {
    description: "clear liquid glass chrome (dock, timer pill, badges) — light veil + specular rim + lift",
    value: {
      background: "glass.chromeBg",
      borderWidth: "1px",
      borderColor: "glass.borderLit",
      backdropFilter: "blur(24px) saturate(1.75)",
      boxShadow: "glass-rim-sm",
    },
  },
  overlay: {
    description: "clear liquid glass panel — modals / palette / sheets / tool panel / menus",
    value: {
      background: "glass.panelBg",
      borderWidth: "1px",
      borderColor: "glass.borderLit",
      borderRadius: "surface",
      backdropFilter: "blur(30px) saturate(1.8)",
      boxShadow: "glass-rim-lg",
    },
  },
});
