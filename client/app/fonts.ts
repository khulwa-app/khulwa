import { Reem_Kufi, Noto_Sans_Arabic } from "next/font/google";

// Display family — wordmark, hero headlines (h1, h2, h3 only)
export const reemKufi = Reem_Kufi({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

// Body / UI / numeric family — covers everything else, both LTR and RTL
// Tabular figures via font-feature-settings on numeric textStyles
export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const fontVariables = `${reemKufi.variable} ${notoSansArabic.variable}`;
