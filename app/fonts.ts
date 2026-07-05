import { Nunito } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
  display: "swap",
  preload: true,
});

export const fontVariables = `${nunito.variable}`;
