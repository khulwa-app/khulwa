"use client";

import { useTranslations } from "next-intl";
import { Badge } from "./badge";

interface QuietHoursBadgeProps {
  on: boolean;
}

export function QuietHoursBadge({ on }: QuietHoursBadgeProps) {
  const t = useTranslations("components.badge");
  return (
    <Badge.Root tone={on ? "primary" : "neutral"} emphasis={on ? "subtle" : "muted"}>
      <Badge.Label>{t("quietHours", { state: on ? "on" : "off" })}</Badge.Label>
    </Badge.Root>
  );
}
