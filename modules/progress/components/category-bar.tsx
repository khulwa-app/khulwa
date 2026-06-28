"use client";

import { useTranslations } from "next-intl";
import { StatBar } from "@/theme/slot-recipes/stat-bar";
import { formatDuration, type CategoryId } from "../categories";

export function CategoryBar({ id, color, seconds, max }: { id: CategoryId; color: string; seconds: number; max: number }) {
  const t = useTranslations("khulwa.categories");
  const pct = max > 0 ? Math.max(3, Math.round((seconds / max) * 100)) : 0;

  return (
    <StatBar.Root>
      <StatBar.Dot bg={color} />
      <StatBar.Label>{t(id)}</StatBar.Label>
      <StatBar.Track>
        <StatBar.Range bg={color} w={`${pct}%`} />
      </StatBar.Track>
      <StatBar.Value>{formatDuration(seconds)}</StatBar.Value>
    </StatBar.Root>
  );
}
