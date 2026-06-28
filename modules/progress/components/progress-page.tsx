"use client";

import { useTranslations } from "next-intl";
import { Box, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Card } from "@/theme/slot-recipes/card";
import { useProgress } from "@/services/progress";
import { CATEGORIES, formatDuration, type CategoryId } from "../categories";
import { CategoryBar } from "./category-bar";
import { CategoryDonut } from "./category-donut";
import { WeeklyBars } from "./weekly-bars";

const EMPTY: Partial<Record<CategoryId, number>> = {};

function sumTotals(t: Partial<Record<CategoryId, number>>): number {
  return CATEGORIES.reduce((sum, c) => sum + (t[c.id] ?? 0), 0);
}

export function ProgressPage() {
  const t = useTranslations("khulwa.progress");
  const tCat = useTranslations("khulwa.categories");
  const { data: day } = useProgress("day");
  const { data: week, isPending } = useProgress("week");

  const today = day?.totals ?? EMPTY;
  const todayTotal = sumTotals(today);
  const series = week?.series ?? [];
  const weekTotal = sumTotals(week?.totals ?? EMPTY);
  const max = Math.max(...CATEGORIES.map((c) => today[c.id] ?? 0), 1);

  const isEmpty = !isPending && weekTotal === 0 && todayTotal === 0;

  return (
    <Box h="100dvh" overflowY="auto" px={{ base: "5", md: "8" }} pt={{ base: "20", md: "24" }} pb="16">
      <VStack maxW="3xl" mx="auto" align="stretch" gap="6">
        <VStack align="start" gap="1">
          <Heading textStyle="heading-h2" color="fg.default">
            {t("title")}
          </Heading>
          <Text textStyle="body-sm" color="fg.muted">
            {t("subtitle")}
          </Text>
        </VStack>

        {isEmpty ? (
          <Card.Root>
            <Card.Body>
              <Text textStyle="body-md" color="fg.muted" textAlign="center" py="10">
                {t("empty")}
              </Text>
            </Card.Body>
          </Card.Root>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
            <Card.Root>
              <Card.Header>
                <Card.Title>{t("today")}</Card.Title>
                <Card.Meta>{formatDuration(todayTotal)}</Card.Meta>
              </Card.Header>
              <Card.Body alignItems="center" gap="5">
                <CategoryDonut totals={today}>
                  <Text textStyle="numeric-sm" color="fg.default" fontVariantNumeric="tabular-nums">
                    {formatDuration(todayTotal)}
                  </Text>
                  <Text textStyle="label-md" color="fg.subtle">
                    {t("today")}
                  </Text>
                </CategoryDonut>
                <VStack align="stretch" gap="2.5" w="full">
                  {CATEGORIES.map((c) => (
                    <CategoryBar key={c.id} id={c.id} color={c.color} seconds={today[c.id] ?? 0} max={max} />
                  ))}
                </VStack>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Header>
                <Card.Title>{t("last7Days")}</Card.Title>
                <Card.Meta>{formatDuration(weekTotal)}</Card.Meta>
              </Card.Header>
              <Card.Body gap="4">
                <WeeklyBars series={series} />
                <HStack gap="4" wrap="wrap" justify="center">
                  {CATEGORIES.map((c) => (
                    <HStack key={c.id} gap="1.5">
                      <Box w="2.5" h="2.5" rounded="full" bg={c.color} />
                      <Text textStyle="label-md" color="fg.subtle">
                        {tCat(c.id)}
                      </Text>
                    </HStack>
                  ))}
                </HStack>
              </Card.Body>
            </Card.Root>
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  );
}
