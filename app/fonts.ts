import { IBM_Plex_Sans_Arabic, Nunito } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
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

export const fontVariables = `${nunito.variable} ${plexSansArabic.variable}`;
