import { defineTextStyles } from "@chakra-ui/react";

// Soft shadows that keep on-media text legible over busy photo backgrounds.
const MEDIA_SHADOW = "0 2px 20px rgba(0,0,0,0.45)";
const MEDIA_SHADOW_SOFT = "0 1px 12px rgba(0,0,0,0.45)";

export const textStyles = defineTextStyles({
  // On-media variants — white ink + shadow baked in, for text over space
  // photo backgrounds (no per-instance color/textShadow props needed).
  "display-on-media": {
    value: {
      fontFamily: "display",
      fontSize: "6xl",
      fontWeight: "medium",
      lineHeight: "1.0625",
      letterSpacing: "-0.025em",
      color: "fg.onMedia",
      textShadow: MEDIA_SHADOW,
    },
  },
  "body-on-media": {
    value: {
      fontFamily: "body",
      fontSize: "xl",
      fontWeight: "normal",
      lineHeight: "1.5",
      letterSpacing: "0",
      color: "fg.onMediaMuted",
      textShadow: MEDIA_SHADOW_SOFT,
    },
  },
  "label-on-media": {
    value: {
      fontFamily: "body",
      fontSize: "xs",
      fontWeight: "medium",
      lineHeight: "1.3333",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: "fg.onMediaMuted",
      textShadow: MEDIA_SHADOW_SOFT,
    },
  },
  "clock-on-media": {
    value: {
      fontFamily: "body",
      fontSize: "md",
      fontWeight: "medium",
      lineHeight: "1.4",
      letterSpacing: "0.01em",
      color: "fg.onMediaMuted",
      textShadow: MEDIA_SHADOW_SOFT,
    },
  },
  "caption-on-media": {
    value: {
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "normal",
      lineHeight: "1.5",
      letterSpacing: "0.02em",
      color: "fg.onMediaMuted",
      textShadow: MEDIA_SHADOW_SOFT,
    },
  },
  "brand-on-media": {
    value: {
      fontFamily: "arabicDisplay",
      fontSize: "xl",
      fontWeight: "normal",
      lineHeight: "1.2",
      letterSpacing: "0",
      color: "primary.default",
      textShadow: MEDIA_SHADOW_SOFT,
    },
  },
  "verse-on-media": {
    value: {
      fontFamily: "arabicDisplay",
      fontSize: "3xl",
      fontWeight: "normal",
      lineHeight: "1.4",
      letterSpacing: "0",
      color: "fg.onMedia",
      textShadow: MEDIA_SHADOW,
    },
  },

  // Themed verse + caption for the flat (non-photo) home — readable in light
  // and dark; the *-on-media variants above are for photo wallpapers only.
  verse: {
    value: {
      fontFamily: "arabicDisplay",
      fontSize: "3xl",
      fontWeight: "normal",
      lineHeight: "1.4",
      letterSpacing: "0",
      color: "fg.default",
    },
  },
  "verse-caption": {
    value: {
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "normal",
      lineHeight: "1.5",
      letterSpacing: "0.02em",
      color: "fg.muted",
    },
  },
  // The home āyah, foregrounded — Reem Kufi (geometric) at display scale.
  // Medium weight reads cleanly large; line-height leaves room for tashkeel.
  // No letter-spacing: Arabic must never be tracked.
  "ayah-hero": {
    value: {
      fontFamily: "arabicDisplay",
      fontWeight: "medium",
      lineHeight: "1.7",
      letterSpacing: "0",
      color: "fg.default",
    },
  },

  "display-xl": {
    value: {
      fontFamily: "display",
      fontSize: "7xl",
      fontWeight: "medium",
      lineHeight: "1.045",
      letterSpacing: "-0.03em",
    },
  },
  "display-lg": {
    value: {
      fontFamily: "display",
      fontSize: "6xl",
      fontWeight: "medium",
      lineHeight: "1.0625",
      letterSpacing: "-0.025em",
    },
  },
  "display-md": {
    value: {
      fontFamily: "display",
      fontSize: "5xl",
      fontWeight: "medium",
      lineHeight: "1.1666",
      letterSpacing: "-0.02em",
    },
  },

  "heading-h1": {
    value: {
      fontFamily: "display",
      fontSize: "4xl",
      fontWeight: "medium",
      lineHeight: "1.2",
      letterSpacing: "-0.015em",
    },
  },
  "heading-h2": {
    value: {
      fontFamily: "display",
      fontSize: "3xl",
      fontWeight: "medium",
      lineHeight: "1.25",
      letterSpacing: "-0.01em",
    },
  },
  "heading-h3": {
    value: {
      fontFamily: "display",
      fontSize: "2xl",
      fontWeight: "semibold",
      lineHeight: "1.3333",
      letterSpacing: "-0.005em",
    },
  },
  "heading-h4": {
    value: {
      fontFamily: "display",
      fontSize: "xl",
      fontWeight: "semibold",
      lineHeight: "1.4",
      letterSpacing: "-0.0025em",
    },
  },
  "heading-h5": {
    value: {
      fontFamily: "display",
      fontSize: "md",
      fontWeight: "semibold",
      lineHeight: "1.5",
      letterSpacing: "0",
    },
  },

  "body-xl": {
    value: {
      fontFamily: "body",
      fontSize: "xl",
      fontWeight: "normal",
      lineHeight: "1.5",
      letterSpacing: "0",
    },
  },
  "body-lg": {
    value: {
      fontFamily: "body",
      fontSize: "lg",
      fontWeight: "normal",
      lineHeight: "1.5555",
      letterSpacing: "0",
    },
  },
  "body-md": {
    value: {
      fontFamily: "body",
      fontSize: "md",
      fontWeight: "normal",
      lineHeight: "1.5",
      letterSpacing: "0",
    },
  },
  "body-sm": {
    value: {
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "normal",
      lineHeight: "1.4285",
      letterSpacing: "0",
    },
  },

  "label-lg": {
    value: {
      fontFamily: "body",
      fontSize: "label-sm",
      fontWeight: "medium",
      lineHeight: "1.2307",
      letterSpacing: "0.03em",
      textTransform: "uppercase",
    },
  },
  "dock-label": {
    value: {
      fontFamily: "body",
      fontSize: "label-sm",
      fontWeight: "medium",
      lineHeight: "1.2307",
      letterSpacing: "0",
    },
  },
  "label-md": {
    value: {
      fontFamily: "body",
      fontSize: "xs",
      fontWeight: "medium",
      lineHeight: "1.3333",
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    },
  },

  "numeric-timer": {
    value: {
      fontFamily: "mono",
      fontSize: "timer",
      fontWeight: "medium",
      lineHeight: "1",
      letterSpacing: "-0.04em",
      fontVariantNumeric: "tabular-nums",
    },
  },
  "numeric-display": {
    value: {
      fontFamily: "mono",
      fontSize: "numeric-display",
      fontWeight: "medium",
      lineHeight: "1.0714",
      letterSpacing: "-0.02em",
      fontVariantNumeric: "tabular-nums",
    },
  },
});
