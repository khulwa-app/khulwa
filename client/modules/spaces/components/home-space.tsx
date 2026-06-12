"use client";

import { Box, Presence, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { HomeClock, useTimeBand } from "@/modules/clock";
import { DoingNowCard } from "@/modules/tasks/components/doing-now-card";
import { SpaceBackground } from "./space-background";

export function HomeSpace() {
  const t = useTranslations("home");
  const tVerse = useTranslations("home.verse");
  const name = t("guest");
  const band = useTimeBand();

  return (
    <Box position="relative" h="full" w="full" bg="bg.base" overflow="hidden">
      <SpaceBackground src="/spaces/door-2.webp" />

      <VStack
        position="relative"
        zIndex={1}
        h="full"
        w="full"
        justify="center"
        align="center"
        gap="12"
        padding="6"
        paddingBlockEnd={{ base: "20", md: "24" }}
      >
        <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
          <VStack gap="6" textAlign="center" minH="40" justify="center">
            <VStack gap="2">
              <HomeClock />
              <Text textStyle="display-on-media">{t(`headline.${band}`, { name })}</Text>
            </VStack>
            <VStack gap="1" align="center">
              <Text textStyle="verse-on-media" dir="rtl" lang="ar">
                {tVerse("arabic")}
              </Text>
              <Text textStyle="caption-on-media">
                {tVerse("meaning")} · {tVerse("citation")}
              </Text>
            </VStack>
          </VStack>
        </Presence>
        <DoingNowCard />
      </VStack>
    </Box>
  );
}
