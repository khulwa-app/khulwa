"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme/system";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { EmotionRegistry } from "./emotion-registry";

export function AppChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ColorModeProvider>
        <ChakraProvider value={system}>{children}</ChakraProvider>
      </ColorModeProvider>
    </EmotionRegistry>
  );
}
