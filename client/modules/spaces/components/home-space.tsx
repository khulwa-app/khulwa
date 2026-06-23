"use client";

import { Box, Presence, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { HomeClock, useTimeBand } from "@/modules/clock";
import { DoingNowCard } from "@/modules/tasks/components/doing-now-card";
import { RotatingAyah } from "@/modules/verses";
import { Space } from "@/modules/space/types";
import { backgroundById } from "../backgrounds";
import { useBackground } from "../hooks/use-background-store.hook";
import { SpaceBackground } from "./space-background";

export function HomeSpace() {
  const t = useTranslations("home");
  const name = t("guest");
  const band = useTimeBand();
  // Photo wallpaper → always-light "on-media" text; flat themed base → themed text.
  const onMedia = backgroundById(useBackground((s) => s.bySpace[Space.Home])).kind === "photo";

  return (
    <Box position="relative" h="full" w="full" bg="bg.base" overflow="hidden">
      <SpaceBackground space={Space.Home} />

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
          <VStack gap="10" textAlign="center" justify="center">
            {/* Demoted header — a quiet line, so the āyah leads. */}
            <VStack gap="1.5">
              <HomeClock onMedia={onMedia} />
              <Text
                textStyle="body-lg"
                color={onMedia ? "fg.onMediaMuted" : "fg.muted"}
                textShadow={onMedia ? "0 1px 12px rgba(0,0,0,0.45)" : undefined}
              >
                {t(`headline.${band}`, { name })}
              </Text>
            </VStack>

            {/* The hero — reserve height so verse rotation never shifts the layout. */}
            <Box minH={{ base: "64", md: "72" }} display="flex" alignItems="center" justifyContent="center">
              <RotatingAyah onMedia={onMedia} />
            </Box>
          </VStack>
        </Presence>
        <DoingNowCard />
      </VStack>
    </Box>
  );
}
