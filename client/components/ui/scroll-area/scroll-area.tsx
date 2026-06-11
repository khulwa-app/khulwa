"use client";

import { ScrollArea as ChakraScrollArea } from "@chakra-ui/react";

interface ScrollAreaProps extends ChakraScrollArea.RootProps {
  children: React.ReactNode;
}

export function ScrollArea({ children, ...rootProps }: ScrollAreaProps) {
  return (
    <ChakraScrollArea.Root {...rootProps}>
      <ChakraScrollArea.Viewport>
        {/* maxW caps the default minWidth:100% so wide children (long text)
            can't stretch the content past the viewport into x-scroll. */}
        <ChakraScrollArea.Content maxW="full">{children}</ChakraScrollArea.Content>
      </ChakraScrollArea.Viewport>
      <ChakraScrollArea.Scrollbar w="1">
        {/** THe w=1 should be in the recipe base */}
        <ChakraScrollArea.Thumb />
      </ChakraScrollArea.Scrollbar>
    </ChakraScrollArea.Root>
  );
}
