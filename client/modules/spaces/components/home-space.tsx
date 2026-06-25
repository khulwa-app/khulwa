"use client";

import { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { formatClock, getTimeBand, getWeekdayName, useClock } from "@/modules/clock";
import { NoorOrb } from "@/modules/companion";
import { ResumeSessionCard } from "@/modules/pomodoro";
import { TodayProgress } from "@/modules/progress";
import { DoingNowCard } from "@/modules/tasks/components/doing-now-card";
import { RotatingAyah } from "@/modules/verses";
import { SpaceBackground } from "./space-background";
const NBSP = " ";

export function HomeSpace() {
  const t = useTranslations("home");
  const locale = useLocale();
  const name = t("guest");
  // Single per-minute tick — no seconds, so no per-second re-render. The time
  // band is derived from the same `now`, so there's only one interval.
  const now = useClock({ intervalMs: 60_000 });
  const band = getTimeBand(now);
  // Mount gate: the clock/date/greeting derive from the live time, so render
  // them only after hydration. Kills the SSR/client text mismatch and reserves
  // height to avoid layout shift.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const time = mounted ? formatClock(now, { hour12: true, locale }) : NBSP;
  const dateLine = mounted ? buildDateLine(now, locale) : NBSP;
  const greeting = mounted ? t(`headline.${band}`, { name }) : NBSP;

  // One-by-one first-view reveal: each element rises + fades in, offset by a
  // growing delay. Gated on `mounted` so it plays once content is real (no SSR
  // flash, no layout shift — hidden elements still reserve their height).
  // Reduced motion collapses to a plain, delay-free fade.
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
    <Box position="relative" h="full" w="full" bg="bg.base" overflow="hidden">
      <SpaceBackground />

      <Box
        position="absolute"
        top={{ base: "20", md: "24" }}
        insetInlineEnd={{ base: "4", md: "6" }}
        zIndex={2}
        maxW="3xs"
        pointerEvents="none"
      >
        <RotatingAyah corner />
      </Box>

      <VStack
        position="relative"
        zIndex={1}
        h="full"
        w="full"
        justify="center"
        align="center"
        gap="10"
        padding="6"
        paddingBlockEnd={{ base: "24", md: "28" }}
      >
        <VStack gap="6" textAlign="center">
          <Box {...entrance(0)}>
            <NoorOrb />
          </Box>

          <VStack gap="1.5" {...entrance(120)}>
            <Text textStyle="clock-display" color="fg.muted" suppressHydrationWarning>
              {time}
            </Text>
            <Text textStyle="overline" color="fg.subtle" suppressHydrationWarning>
              {dateLine}
            </Text>
          </VStack>

          <Text textStyle="greeting" color="fg.default" suppressHydrationWarning {...entrance(240)}>
            {greeting}
          </Text>
        </VStack>

        <VStack w="full" gap="6" {...entrance(380)}>
          <ResumeSessionCard />
          <DoingNowCard />
        </VStack>
        <Box {...entrance(500)}>
          <TodayProgress />
        </Box>
      </VStack>
    </Box>
  );
}

function buildDateLine(now: Date, locale: string): string {
  const weekday = getWeekdayName(now, locale);
  const gregorian = now.toLocaleDateString(locale, { day: "numeric", month: "long" });
  let hijri = "";
  try {
    hijri = new Intl.DateTimeFormat(`${locale}-u-ca-islamic-umalqura`, {
      day: "numeric",
      month: "long",
    }).format(now);
  } catch {
    hijri = "";
  }
  return [weekday, gregorian, hijri].filter(Boolean).join(" · ");
}
