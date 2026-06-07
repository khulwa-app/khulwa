"use client";

import dynamic from "next/dynamic";
import { Box, Presence, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { UpNextCard } from "./up-next-card";
import { SpaceBackground } from "./space-background";

// Time header is client-only: its values come from local time (clock + band)
// which the server can't render. ssr: false avoids a wrong/blank step; the
// reserved-height fallback prevents layout shift while the chunk mounts.
const HomeHeader = dynamic(() => import("./home-header").then((m) => m.HomeHeader), {
  ssr: false,
  loading: () => <Box h="40" />,
});

export function HomeSpace() {
  const t = useTranslations("home");

  return (
    <Box position="relative" h="full" w="full" bg="bg.base" overflow="hidden">
      <SpaceBackground src="/spaces/door-2.webp" />

      <VStack position="relative" zIndex={1} h="full" w="full" justify="center" align="center" gap="12" padding="6">
        <HomeHeader />
          <UpNextCard taskTitle={t("upNext.sampleTask")} focusMin={30} breakMin={5} />
      </VStack>
    </Box>
  );
}
