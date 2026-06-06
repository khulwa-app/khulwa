"use client";

import { Box, VStack, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { HomeClock, useClock, getTimeBand } from "@/modules/clock";

export function HomeSpace() {
  const t = useTranslations("home");
  const now = useClock();
  const band = getTimeBand(now);
  // TODO: wire real user name once auth is connected.
  const name = t("guest");

  return (
    <Box position="relative" h="full" w="full" bg="bg.base" overflow="hidden">
      <VStack position="relative" h="full" w="full" justify="center" align="center" gap="12" padding="6">
        <VStack gap="3" textAlign="center">
          <HomeClock />
          <Text textStyle="display-lg" color="fg.default" suppressHydrationWarning>
            {t(`headline.${band}`, { name })}
          </Text>
          <Text textStyle="body-lg" color="fg.muted">
            {t("subtitle")}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
