"use client";

import { useTranslations } from "next-intl";
import { Flame } from "lucide-react";
import { Badge } from "./badge";

interface StreakBadgeProps {
  count: number;
}

export function StreakBadge({ count }: StreakBadgeProps) {
  const t = useTranslations("components.badge");
  return (
    <Badge.Root tone="accent" emphasis="subtle">
      <Badge.Icon as={Flame} />
      <Badge.Label>{t("streak", { count })}</Badge.Label>
    </Badge.Root>
  );
}
