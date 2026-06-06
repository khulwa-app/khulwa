"use client";

import { Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Badge } from "./badge";

export function LiveBadge() {
  const t = useTranslations("components.badge");
  return (
    <Badge.Root tone="neutral" emphasis="solid">
      <Box boxSize="1.5" rounded="full" bg="currentColor" aria-hidden />
      <Badge.Label>{t("liveFocus")}</Badge.Label>
    </Badge.Root>
  );
}
