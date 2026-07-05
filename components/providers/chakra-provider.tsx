"use client";

import { ChakraProvider as ChakraUI } from "@chakra-ui/react";
import { system } from "@/theme/system";

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraUI value={system}>{children}</ChakraUI>;
}
