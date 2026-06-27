"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { Home } from "@/theme/slot-recipes/home-space";
import {
  formatClock,
  formatGregorianDate,
  formatHijriDate,
  getTimeBand,
  getWeekdayName,
  useClock,
} from "@/modules/clock";
import { NoorOrb } from "@/modules/companion";
import { TodayProgress } from "@/modules/progress";
import { DoingNowCard } from "@/modules/tasks/components/doing-now-card";
import { RotatingAyah } from "@/modules/verses";
import { useMounted } from "@/hooks/use-mounted";
import { SpaceBackground } from "./space-background";

const NBSP = " ";

export function HomeSpace() {
  const t = useTranslations("home");
  const locale = useLocale();
  const name = t("guest");
  const now = useClock({ intervalMs: 60_000 });
  const band = getTimeBand(now);
  const mounted = useMounted();

  const time = mounted ? formatClock(now, { hour12: true, locale }) : NBSP;
  const dateLine = mounted
    ? [getWeekdayName(now, locale), formatGregorianDate(now, locale), formatHijriDate(now, locale)]
        .filter(Boolean)
        .join(" · ")
    : NBSP;
  const greeting = mounted ? t(`headline.${band}`, { name }) : NBSP;

  const entrance = (delayMs: number) =>
    mounted
      ? {
          animationName: "rise-in",
          animationDuration: "slow",
          animationDelay: `${delayMs}ms`,
          animationTimingFunction: "enter",
          animationFillMode: "backwards" as const,
          _motionReduce: { animationName: "fade-in", animationDelay: "0ms" },
        }
      : { opacity: 0 };

  return (
    <Home.Root>
      <SpaceBackground />

      <Home.Corner>
        <RotatingAyah />
      </Home.Corner>

      <Home.Stage>
        <Home.Intro>
          <Box {...entrance(0)}>
            <NoorOrb />
          </Box>

          <Home.Clock {...entrance(120)}>
            <Text textStyle="clock-display" color="fg.onMesh" suppressHydrationWarning>
              {time}
            </Text>
            <Text textStyle="overline" color="fg.onMeshMuted" suppressHydrationWarning>
              {dateLine}
            </Text>
          </Home.Clock>

          <Text textStyle="greeting" color="fg.onMesh" suppressHydrationWarning {...entrance(240)}>
            {greeting}
          </Text>
        </Home.Intro>

        <VStack w="full" gap="6" {...entrance(380)}>
          <DoingNowCard />
        </VStack>

        <Box {...entrance(500)}>
          <TodayProgress />
        </Box>
      </Home.Stage>
    </Home.Root>
  );
}
