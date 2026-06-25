import { DM_Sans, IBM_Plex_Sans_Arabic, Inter, JetBrains_Mono, Reem_Kufi } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

export const plexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic-body",
  display: "swap",
  preload: true,
});

export const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic-display",
  display: "swap",
  preload: false,
});

export const fontVariables = `${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable} ${plexSansArabic.variable} ${reemKufi.variable}`;
