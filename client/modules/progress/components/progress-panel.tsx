"use client";

import { HStack, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { SidePanel, usePanels, Panel } from "@/modules/panels";
import { CATEGORIES, dayKey, formatDuration, type CategoryId } from "../categories";
import { useProgressHydrated, useProgressStore } from "../hooks";
import { CategoryBar } from "./category-bar";

const EMPTY: Partial<Record<CategoryId, number>> = {};

export function ProgressPanel() {
  const t = useTranslations("khulwa.progress");
  const hydrated = useProgressHydrated();
  const open = usePanels((s) => s.open === Panel.Progress);
  const close = usePanels((s) => s.close);
  const byDate = useProgressStore((s) => s.byDate);

  const today = byDate[dayKey()] ?? EMPTY;
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
            {hydrated ? formatDuration(total) : "—"}
          </Text>
        </HStack>

        <VStack align="stretch" gap="3.5">
          {CATEGORIES.map((c) => (
            <CategoryBar key={c.id} id={c.id} color={c.color} seconds={hydrated ? (today[c.id] ?? 0) : 0} max={max} />
          ))}
        </VStack>
      </VStack>
    </SidePanel>
  );
}
