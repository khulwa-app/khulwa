"use client";

import { Text } from "@chakra-ui/react";
import { useLocale } from "next-intl";
import { useClock } from "../hooks";
import { getWeekdayName, formatClock } from "../utils";

export function HomeClock() {
  const locale = useLocale();
  // No seconds shown — ticking per minute avoids a re-render every second.
  const now = useClock({ intervalMs: 60_000 });

  return (
    <Text textStyle="clock-on-media" textAlign="center">
      {`${getWeekdayName(now, locale)} · ${formatClock(now, { hour12: true, locale })}`}
    </Text>
  );
}
