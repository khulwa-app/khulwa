"use client";

import { useTranslations } from "next-intl";
import { Badge } from "./badge";

interface RoundBadgeProps {
  current: number;
  total: number;
}

export function RoundBadge({ current, total }: RoundBadgeProps) {
  const t = useTranslations("components.badge");
  return (
    <Badge.Root tone="primary" emphasis="subtle">
      <Badge.Label>{t("round", { current, total })}</Badge.Label>
    </Badge.Root>
  );
}
