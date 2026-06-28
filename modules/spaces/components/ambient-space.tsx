"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { SpaceBackground } from "./space-background";

export function AmbientSpace() {
  const t = useTranslations("khulwa.ambient");
  return (
    <Box position="relative" minH="full" w="full" bg="bg.base" overflowX="hidden">
      <SpaceBackground />
      <VStack
        position="relative"
        zIndex={1}
        minH="full"
        w="full"
        justify="center"
        align="center"
        gap="4"
        paddingInline="6"
        paddingBlock={{ base: "20", md: "24" }}
      >
        <Text textStyle="heading-h2" color="fg.default">
          {t("title")}
        </Text>
      </VStack>
    </Box>
  );
}
