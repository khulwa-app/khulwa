"use client";

import { useTranslations } from "next-intl";
import { Check } from "@zappicon/react";
import { Badge } from "./badge";

export function ScheduleBadge() {
  const t = useTranslations("components.badge");
  return (
    <Badge.Root tone="success" emphasis="subtle">
      <Badge.Icon as={Check} />
      <Badge.Label>{t("onSchedule")}</Badge.Label>
    </Badge.Root>
  );
}
