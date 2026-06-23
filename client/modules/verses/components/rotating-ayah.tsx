"use client";

import { Text, VStack } from "@chakra-ui/react";
import { useLocale } from "next-intl";
import type { LocaleType } from "@/i18n/config";
import { useRotatingAyah } from "../hooks/use-rotating-ayah.hook";

const MEDIA_SHADOW = "0 2px 20px rgba(0,0,0,0.5)";

// The home āyah, minimal: a large geometric (Reem Kufi) verse, a quiet
// translation, and a small citation — nothing else. Remounting on index change
// replays a soft crossfade. `onMedia` switches to always-light ink over photo
// wallpapers.
export function RotatingAyah({ onMedia = false }: { onMedia?: boolean }) {
  const locale = useLocale() as LocaleType;
  const { ayah, index } = useRotatingAyah();

  const ink = onMedia ? "fg.onMedia" : "fg.default";
  const inkMuted = onMedia ? "fg.onMediaMuted" : "fg.muted";
  const inkSubtle = onMedia ? "fg.onMediaMuted" : "fg.subtle";
  const shadow = onMedia ? MEDIA_SHADOW : undefined;

  return (
    <VStack
      key={index}
      gap="5"
      align="center"
      w="full"
      maxW="3xl"
      paddingInline="4"
      animationName="fade-in"
      animationDuration="slowest"
      animationTimingFunction="ease-out"
      _motionReduce={{ animationName: "none" }}
    >
      <Text
        textStyle="ayah-hero"
        fontSize={{ base: "4xl", md: "6xl" }}
        textAlign="center"
        dir="rtl"
        lang="ar"
        color={ink}
        textShadow={shadow}
      >
        {ayah.arabic}
      </Text>

      <Text textStyle="body-md" textAlign="center" maxW="lg" color={inkMuted} textShadow={shadow}>
        {ayah.meaning[locale]}
      </Text>

      <Text textStyle="label-md" color={inkSubtle} textShadow={shadow}>
        {ayah.citation[locale]}
      </Text>
    </VStack>
  );
}
