"use client";

import { Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export function StatsSpace() {
  const t = useTranslations("spaces.stats");
  return (
    <VStack h="full" w="full" bg="bg.base" justify="center" align="center" gap="4" padding="6">
      <Text textStyle="heading-h2" color="fg.default">
        {t("title")}
      </Text>
      <Text textStyle="body-md" color="fg.muted">
        {t("placeholder")}
      </Text>
    </VStack>
  );
}
