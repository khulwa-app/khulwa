"use client";

import { Presence, VStack, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { HomeClock, useTimeBand } from "@/modules/clock";

export function HomeHeader() {
  const t = useTranslations("home");
  const tVerse = useTranslations("home.verse");
  const name = t("guest");
  const band = useTimeBand();

  return (
    <Presence present animationName={{ _open: "fade-in" }} animationDuration="moderate">
      <VStack gap="4" textAlign="center" minH="40" justify="center">
        <HomeClock />
        <Text textStyle="display-on-media">{t(`headline.${band}`, { name })}</Text>
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
  );
}
