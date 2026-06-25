"use client";

import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider, useTheme } from "next-themes";

export type ColorMode = "light" | "dark";

// Wraps next-themes. attribute="class" matches Chakra's default `_dark` (.dark)
// selector. Light is forced as default and the OS preference is ignored.
export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    />
  );
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const colorMode = (resolvedTheme ?? "light") as ColorMode;
  const toggleColorMode = () => setTheme(colorMode === "dark" ? "light" : "dark");
  return { colorMode, setColorMode: setTheme, toggleColorMode };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}
