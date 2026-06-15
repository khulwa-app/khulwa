"use client";

import { ScrollArea as ChakraScrollArea } from "@chakra-ui/react";

interface ScrollAreaProps extends ChakraScrollArea.RootProps {
  children: React.ReactNode;
}

export function ScrollArea({ children, ...rootProps }: ScrollAreaProps) {
  return (
    <ChakraScrollArea.Root {...rootProps}>
      <ChakraScrollArea.Viewport>
        {/* Zag injects minWidth:fit-content as an INLINE style, which wide
            children (long nowrap task titles) turn into x-axis overflow.
            Stylesheet rules — even the recipe's !important — proved
            unreliable against it; replacing the inline value via prop merge
            is deterministic. Do not move this into the recipe. */}
        <ChakraScrollArea.Content style={{ minWidth: "100%" }}>{children}</ChakraScrollArea.Content>
      </ChakraScrollArea.Viewport>
      <ChakraScrollArea.Scrollbar>
        <ChakraScrollArea.Thumb />
      </ChakraScrollArea.Scrollbar>
    </ChakraScrollArea.Root>
  );
}
