"use client";

import { Flame } from "lucide-react";
import { Box, HStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useStreak } from "@/services/progress";

export function StreakBadge() {
  const t = useTranslations("components.badge");
  const { data } = useStreak();
  const count = data?.current ?? 0;
  if (count <= 0) return null;

  return (
    <HStack
      as="span"
      gap="1.5"
      h="7"
      paddingInline="2.5"
      rounded="full"
      layerStyle="raised"
      color="fg.default"
      textStyle="label-md"
      fontVariantNumeric="tabular-nums"
      title={t("streak", { count })}
      aria-label={t("streak", { count })}
    >
      <Box asChild color="accent.default" display="inline-flex">
        <Flame size={13} aria-hidden />
      </Box>
      {count}
    </HStack>
  );
}
