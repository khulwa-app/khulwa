"use client";

import { Text } from "@chakra-ui/react";
import { useLocale } from "next-intl";
import { useClock } from "../hooks";
import { getWeekdayName, formatClock } from "../utils";

export function HomeClock() {
  const locale = useLocale();
  const now = useClock();

  return (
    <Text textStyle="clock-on-media" textAlign="center">
      {`${getWeekdayName(now, locale)} · ${formatClock(now, { hour12: true, locale, withSeconds: true })}`}
    </Text>
  );
}
