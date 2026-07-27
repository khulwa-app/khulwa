"use client";

import { Text } from "@chakra-ui/react";
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

  const time = mounted ? formatClock(now, { hour12: true, meridiem: false, locale }) : NBSP;
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
          <Text textStyle="hero-greeting" color="fg" suppressHydrationWarning {...entrance(250)}>
            {greeting}
          </Text>

          <Text
            textStyle="clock-display"
            color="fg"
            suppressHydrationWarning
            {...entrance(350)}
          >
            {time}
          </Text>

          <Text
            textStyle="hero-date"
            color="fg.muted"
            suppressHydrationWarning
            {...entrance(450)}
          >
            {dateLine}
          </Text>
        </Home.Intro>
      </Home.Stage>
    </Home.Root>
  );
}
