"use client";

import { Fire } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { HStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useStreak } from "@/services/progress";
import { usePanels, Panel } from "@/modules/panels";

export function StreakBadge() {
  const t = useTranslations("components.badge");
  const tTools = useTranslations("dock.tools");
  const { data } = useStreak();
  const togglePanel = usePanels((s) => s.toggle);
  const count = data?.current ?? 0;
  if (count <= 0) return null;

  return (
    <HStack
      as="button"
      gap="1.5"
      h="7"
      paddingInline="2.5"
      rounded="full"
      layerStyle="raised"
      color="fg"
      textStyle="label-md"
      fontVariantNumeric="tabular-nums"
      cursor="pointer"
      onClick={() => togglePanel(Panel.Progress)}
      title={`${t("streak", { count })} · ${tTools("progress")}`}
      aria-label={`${t("streak", { count })} · ${tTools("progress")}`}
    >
      <Icon icon={Fire} boxSize="3.25" color="primary.solid" />
      {count}
    </HStack>
  );
}
