"use client";

import { Text, VStack } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { useUser } from "@/components/providers/session-provider";
import { Home } from "@/theme/slot-recipes/home-space";
import {
  formatClock,
  formatGregorianDate,
  getTimeBand,
  getWeekdayName,
  useClock,
} from "@/modules/clock";
import { TodayProgress } from "@/modules/progress";
import { DoingNowCard } from "@/modules/tasks/components/doing-now/doing-now-card";
import { useMounted } from "@/hooks/use-mounted";
import { SpaceBackground } from "./space-background";

const NBSP = " ";

export function HomeSpace() {
  const t = useTranslations("home");
  const locale = useLocale();
  const user = useUser();
  const name = user?.name?.split(" ")[0]?.trim() || t("guest");
  const now = useClock({ intervalMs: 60_000 });
  const band = getTimeBand(now);
  const mounted = useMounted();

  const time = mounted ? formatClock(now, { hour12: true, locale }) : NBSP;
  const dateLine = mounted
    ? [getWeekdayName(now, locale), formatGregorianDate(now, locale)]
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

      <Home.Stage>
        <Home.Intro>
          <Home.Clock {...entrance(250)}>
            <Text textStyle="clock-display" color="fg.onMesh" suppressHydrationWarning>
              {time}
            </Text>
            <Text textStyle="hero-meta" color="fg.onMesh.muted" suppressHydrationWarning>
              {dateLine}
            </Text>
          </Home.Clock>

          <Text textStyle="greeting" color="fg.onMesh" suppressHydrationWarning {...entrance(350)}>
            {greeting}
          </Text>
        </Home.Intro>

        <VStack w="full" gap="6" {...entrance(450)}>
          <DoingNowCard />
        </VStack>

        {/* <Box {...entrance(150)}>
          <TodayProgress />
        </Box> */}
      </Home.Stage>
    </Home.Root>
  );
}
