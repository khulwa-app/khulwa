"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { system } from "@/theme/system";

export function AppChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </NextThemesProvider>
  );
}
