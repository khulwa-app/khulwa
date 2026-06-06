"use client";

import { Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export function AmbientSpace() {
  const t = useTranslations("khulwa.ambient");
  return (
    <VStack h="full" w="full" bg="bg.base" justify="center" align="center" gap="4" padding="6">
      <Text textStyle="heading-h2" color="fg.default">
        {t("title")}
      </Text>
    </VStack>
  );
}
