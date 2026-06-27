"use client";

import { Box, Flex, VStack } from "@chakra-ui/react";
import { Logo } from "@/components/ui";
import { LoginForm } from "./login-form";

export function LoginScreen() {
  return (
    <Flex minH="100vh" align="center" justify="center" position="relative" overflow="hidden" bg="bg.base" px="6">
      <Box position="absolute" inset={0} layerStyle="space-backdrop" pointerEvents="none" aria-hidden />

      <VStack position="relative" zIndex={1} w="full" maxW="sm" gap="9">
        <Logo size="10" href={null} />
        <LoginForm />
      </VStack>
    </Flex>
  );
}
