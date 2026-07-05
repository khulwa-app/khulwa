"use client";

import { useLocale } from "next-intl";
import { chakra, HStack, Text, VStack } from "@chakra-ui/react";
import { CATEGORIES, type CategoryId } from "../categories";

type Totals = Partial<Record<CategoryId, number>>;
type Series = Array<{ day: string } & Totals>;

const TRACK_H = 168;

function lastSevenDays(): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export function WeeklyBars({ series }: { series: Series }) {
  const locale = useLocale();
  const byDay = new Map(series.map((row) => [row.day, row]));
  const days = lastSevenDays();

  const dayTotal = (day: string) => CATEGORIES.reduce((sum, c) => sum + (byDay.get(day)?.[c.id] ?? 0), 0);
  const max = Math.max(...days.map(dayTotal), 1);

  return (
    <HStack align="end" justify="space-between" gap="2" h={`${TRACK_H + 24}px`}>
      {days.map((day) => {
        const row = byDay.get(day);
        const total = dayTotal(day);
        const weekday = new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" }).format(
          new Date(`${day}T00:00:00Z`),
        );
        return (
          <VStack key={day} flex="1" gap="2" justify="end" h="full">
            <chakra.div
              w="full"
              maxW="36px"
              mx="auto"
              h={`${(total / max) * TRACK_H}px`}
              display="flex"
              flexDirection="column-reverse"
              rounded="md"
              overflow="hidden"
              css={{ transition: "height 400ms ease", "@media (prefers-reduced-motion: reduce)": { transition: "none" } }}
            >
              {CATEGORIES.map((c) => {
                const value = row?.[c.id] ?? 0;
                if (value <= 0) return null;
                return <chakra.div key={c.id} bg={c.color} h={`${(value / total) * 100}%`} />;
              })}
            </chakra.div>
            <Text textStyle="label-md" color="fg.subtle">
              {weekday}
            </Text>
          </VStack>
        );
      })}
    </HStack>
  );
}
