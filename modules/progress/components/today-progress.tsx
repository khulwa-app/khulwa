"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/theme/slot-recipes/card";
import { CATEGORIES, formatDuration, type CategoryId } from "../categories";
import { useProgress } from "@/services/progress";
import { CategoryBar } from "./category-bar";

const EMPTY: Partial<Record<CategoryId, number>> = {};

export function TodayProgress() {
  const t = useTranslations("khulwa.progress");
  const { data } = useProgress("day");

  const today = data?.totals ?? EMPTY;
  const total = Object.values(today).reduce((sum, v) => sum + (v ?? 0), 0);
  if (total === 0) return null;

  const max = Math.max(...CATEGORIES.map((c) => today[c.id] ?? 0), 1);

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{t("today")}</Card.Title>
        <Card.Meta>{formatDuration(total)}</Card.Meta>
      </Card.Header>
      <Card.Body gap="2.5">
        {CATEGORIES.filter((c) => (today[c.id] ?? 0) > 0).map((c) => (
          <CategoryBar key={c.id} id={c.id} color={c.color} seconds={today[c.id] ?? 0} max={max} />
        ))}
      </Card.Body>
    </Card.Root>
  );
}
