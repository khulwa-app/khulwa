import { IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const degular = localFont({
  src: [
    { path: "../assets/fonts/degular/Degular-Regular.otf", weight: "400", style: "normal" },
    { path: "../assets/fonts/degular/Degular-Medium.otf", weight: "500", style: "normal" },
    { path: "../assets/fonts/degular/Degular-Semibold.otf", weight: "600", style: "normal" },
    { path: "../assets/fonts/degular/Degular-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-degular",
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

export const fontVariables = `${degular.variable} ${jetbrainsMono.variable} ${plexSansArabic.variable}`;
