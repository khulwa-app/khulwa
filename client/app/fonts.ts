import { Geist, Geist_Mono, Inter } from "next/font/google";

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

export const fontVariables = `${geist.variable} ${inter.variable} ${geistMono.variable}`;
