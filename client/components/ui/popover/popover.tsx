import { Popover as ChakraPopover, PopoverRootProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props extends PopoverRootProps {
  trigger: ReactNode;
}

export function Popover({ trigger, children, ...props }: Props) {
  return (
    <ChakraPopover.Root {...props}>
      <ChakraPopover.Trigger asChild>{trigger}</ChakraPopover.Trigger>
      <ChakraPopover.Positioner>
        <ChakraPopover.Content>
          <ChakraPopover.Arrow>
            <ChakraPopover.ArrowTip />
          </ChakraPopover.Arrow>
          <ChakraPopover.Body>{children}</ChakraPopover.Body>
        </ChakraPopover.Content>
      </ChakraPopover.Positioner>
    </ChakraPopover.Root>
  );
}

