import { Manrope, Nunito } from "next/font/google";

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

/** Legacy Chakra surfaces still resolve `fonts.body`; removed with Chakra in Phase 6. */
export const nunito = Nunito({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
  display: "swap",
  preload: false,
});

export const fontVariables = `${manrope.variable} ${nunito.variable}`;
