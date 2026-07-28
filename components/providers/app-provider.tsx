"use client";

import { ColorModeProvider } from "./color-mode-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <ColorModeProvider>{children}</ColorModeProvider>;
}
