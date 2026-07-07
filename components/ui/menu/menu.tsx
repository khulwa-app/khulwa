"use client";

import { Menu as ChakraMenu, Portal } from "@chakra-ui/react";

function Content({ children, ...props }: ChakraMenu.ContentProps) {
  return (
    <Portal>
      <ChakraMenu.Positioner>
        <ChakraMenu.Content {...props}>{children}</ChakraMenu.Content>
      </ChakraMenu.Positioner>
    </Portal>
  );
}

export const Menu = {
  Root: ChakraMenu.Root,
  Trigger: ChakraMenu.Trigger,
  Content,
  Item: ChakraMenu.Item,
  ItemGroup: ChakraMenu.ItemGroup,
  ItemGroupLabel: ChakraMenu.ItemGroupLabel,
  Separator: ChakraMenu.Separator,
};
