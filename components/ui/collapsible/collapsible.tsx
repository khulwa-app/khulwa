import { Collapsible as ChakraCollapsible, CollapsibleRootProps } from "@chakra-ui/react";

interface Props extends Omit<CollapsibleRootProps, "children"> {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const Collapsible = ({ trigger, children, ...props }: Props) => {
  return (
    <ChakraCollapsible.Root {...props}>
      <ChakraCollapsible.Trigger asChild>{trigger}</ChakraCollapsible.Trigger>
      <ChakraCollapsible.Content>{children}</ChakraCollapsible.Content>
    </ChakraCollapsible.Root>
  );
};
