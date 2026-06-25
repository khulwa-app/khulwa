"use client";

import { Text, VStack } from "@chakra-ui/react";
import { useLocale } from "next-intl";
import type { LocaleType } from "@/i18n/config";
import { useRotatingAyah } from "../hooks/use-rotating-ayah.hook";

export function RotatingAyah({
  compact = false,
  corner = false,
}: {
  compact?: boolean;
  corner?: boolean;
}) {
  const locale = useLocale() as LocaleType;
  const { ayah, index } = useRotatingAyah();

  if (corner) {
    return (
      <VStack
        key={index}
        gap="1"
        align="end"
        textAlign="end"
        animationName="fade-in"
        animationDuration="slowest"
        animationTimingFunction="ease-out"
        _motionReduce={{ animationName: "none" }}
      >
        <Text textStyle="ayah-hero-corner" dir="rtl" lang="ar">
          {ayah.arabic}
        </Text>
        <Text textStyle="verse-meaning">{ayah.meaning[locale]}</Text>
      </VStack>
    );
  }

  return (
    <VStack
      key={index}
      gap={compact ? "2" : "5"}
      align="center"
      w="full"
      maxW={compact ? "xl" : "3xl"}
      paddingInline="4"
      animationName="fade-in"
      animationDuration="slowest"
      animationTimingFunction="ease-out"
      _motionReduce={{ animationName: "none" }}
    >
      <Text
        textStyle={compact ? "ayah-hero-compact" : "ayah-hero"}
        textAlign="center"
        dir="rtl"
        lang="ar"
        color={compact ? "fg.muted" : "fg.default"}
      >
        {ayah.arabic}
      </Text>

      <Text
        textStyle={compact ? "body-sm" : "body-md"}
        textAlign="center"
        maxW="lg"
        color={compact ? "fg.subtle" : "fg.muted"}
      >
        {ayah.meaning[locale]}
      </Text>

      {!compact && (
        <Text textStyle="label-md" color="fg.subtle">
          {ayah.citation[locale]}
        </Text>
      )}
    </VStack>
  );
}
