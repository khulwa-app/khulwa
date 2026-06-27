"use client";

import { HStack, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { SidePanel, usePanels, Panel } from "@/modules/panels";
import { CATEGORIES, formatDuration, type CategoryId } from "../categories";
import { useProgress } from "@/services/progress";
import { CategoryBar } from "./category-bar";

const EMPTY: Partial<Record<CategoryId, number>> = {};

export function ProgressPanel() {
  const t = useTranslations("khulwa.progress");
  const open = usePanels((s) => s.open === Panel.Progress);
  const close = usePanels((s) => s.close);
  const { data, isPending } = useProgress("day");

  const today = data?.totals ?? EMPTY;
  const total = Object.values(today).reduce((sum, v) => sum + (v ?? 0), 0);
  const max = Math.max(...CATEGORIES.map((c) => today[c.id] ?? 0), 1);

  return (
    <SidePanel open={open} onClose={close} title={t("title")}>
      <VStack h="full" w="full" gap="5" align="stretch">
        <HStack justify="space-between" align="baseline">
          <Text textStyle="label-md" color="fg.subtle">
            {t("today")}
          </Text>
          <Text textStyle="heading-h4" color="fg.default" fontVariantNumeric="tabular-nums" suppressHydrationWarning>
            {isPending ? "—" : formatDuration(total)}
          </Text>
        </HStack>

        <VStack align="stretch" gap="3.5">
          {CATEGORIES.map((c) => (
            <CategoryBar key={c.id} id={c.id} color={c.color} seconds={today[c.id] ?? 0} max={max} />
          ))}
        </VStack>
      </VStack>
    </SidePanel>
  );
}
