"use client";

import { useTranslations } from "next-intl";
import Fire from "@/assets/svg/icons/fire.svg";
import { Badge } from "./badge";

interface StreakBadgeProps {
  count: number;
}

export function StreakBadge({ count }: StreakBadgeProps) {
  const t = useTranslations("components.badge");
  return (
    <Badge.Root tone="accent" emphasis="subtle">
      <Badge.Icon as={Fire} />
      <Badge.Label>{t("streak", { count })}</Badge.Label>
    </Badge.Root>
  );
}
