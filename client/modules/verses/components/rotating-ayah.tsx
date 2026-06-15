"use client";

import { Text, VStack } from "@chakra-ui/react";
import { useLocale } from "next-intl";
import type { LocaleType } from "@/i18n/config";
import { useRotatingAyah } from "../hooks/use-rotating-ayah.hook";

// The home-space ayah, rotating quietly. Remounting on index change replays a
// soft fade so the swap reads as a crossfade, never a snap; reserved height
// keeps the headline above it from shifting between verses.
export function RotatingAyah() {
  const locale = useLocale() as LocaleType;
  const { ayah, index } = useRotatingAyah();

  return (
    <VStack
      key={index}
      gap="1"
      align="center"
      minH="20"
      justify="center"
      animationName="fade-in"
      animationDuration="slowest"
      animationTimingFunction="ease-out"
      _motionReduce={{ animationName: "none" }}
    >
      <Text textStyle="verse-on-media" dir="rtl" lang="ar">
        {ayah.arabic}
      </Text>
      <Text textStyle="caption-on-media">
        {ayah.meaning[locale]} · {ayah.citation[locale]}
      </Text>
    </VStack>
  );
}
