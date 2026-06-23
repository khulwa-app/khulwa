"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Space } from "@/modules/space/types";
import { SpaceBackground } from "./space-background";

export function AmbientSpace() {
  const t = useTranslations("khulwa.ambient");
  return (
    <Box position="relative" h="full" w="full" bg="bg.base" overflow="hidden">
      <SpaceBackground space={Space.Ambient} />
      <VStack position="relative" zIndex={1} h="full" w="full" justify="center" align="center" gap="4" padding="6">
        <Text textStyle="heading-h2" color="fg.default">
          {t("title")}
        </Text>
      </VStack>
    </Box>
  );
}
