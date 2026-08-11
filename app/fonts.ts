import { Nunito, Plus_Jakarta_Sans } from "next/font/google";

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
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

export const fontVariables = `${plusJakartaSans.variable} ${nunito.variable}`;
