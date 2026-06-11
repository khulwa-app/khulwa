"use client";

import dynamic from "next/dynamic";
import { Box, VStack } from "@chakra-ui/react";
import { DoingNowCard } from "@/modules/tasks/components/doing-now-card";
import { SpaceBackground } from "./space-background";

const HomeHeader = dynamic(() => import("./home-header").then((m) => m.HomeHeader), {
  ssr: false,
  loading: () => <Box h="40" />,
});

export function HomeSpace() {
  return (
    <Box position="relative" h="full" w="full" bg="bg.base" overflow="hidden">
      <SpaceBackground src="/spaces/door-2.webp" />

      <VStack position="relative" zIndex={1} h="full" w="full" justify="center" align="center" gap="12" padding="6">
        <HomeHeader />
        <DoingNowCard />
      </VStack>
    </Box>
  );
}
