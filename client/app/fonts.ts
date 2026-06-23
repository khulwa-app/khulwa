import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic, Inter, Reem_Kufi } from "next/font/google";

export const geist = Geist({
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

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

// Arabic coverage for the bilingual UI (Geist/Inter are Latin-only); harmonises
// with Inter for body/UI text.
export const plexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic-body",
  display: "swap",
  preload: true,
});

// Reem Kufi — geometric kufi for the āyah / Arabic display. Clean and minimal,
// supports vowelled (tashkeel) text.
export const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic-display",
  display: "swap",
  preload: false,
});

export const fontVariables = `${geist.variable} ${inter.variable} ${geistMono.variable} ${plexSansArabic.variable} ${reemKufi.variable}`;
