"use client";

import { Text } from "@chakra-ui/react";
import { useLocale } from "next-intl";
import { useClock } from "../hooks";
import { getWeekdayName, formatClock } from "../utils";

export function HomeClock() {
  const locale = useLocale();
  const now = useClock();
  const day = getWeekdayName(now, locale);
  const time = formatClock(now, { hour12: true, locale });

  return (
    <Text textStyle="label-md" color="primary.default" textAlign="center" suppressHydrationWarning>
      {`${day} · ${time}`}
    </Text>
  );
}
