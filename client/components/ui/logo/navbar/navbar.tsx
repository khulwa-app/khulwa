import { Logo } from "@/components/ui";
import { Box, HStack, Text } from "@chakra-ui/react";

export function Navbar() {
  return (
    <HStack position="absolute" top={0} left={0} right={0} p={4} zIndex={10}>
      <Logo />
      <Box>
        <Text>Test</Text>
      </Box>
    </HStack>
  );
}
