"use client";

import { EmotionRegistry } from "./emotion-registry";
import { ColorModeProvider } from "./color-mode-provider";
import { ChakraProvider } from "./chakra-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ColorModeProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </ColorModeProvider>
    </EmotionRegistry>
  );
}
