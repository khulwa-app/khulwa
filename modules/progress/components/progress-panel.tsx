"use client";

import NextLink from "next/link";
import { HStack, Link, Text, VStack } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SidePanel, usePanels, Panel } from "@/modules/panels";
import { Routes } from "@/constants/routes";
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

        <Link asChild textStyle="label-md" color="fg.muted" alignSelf="end" mt="auto">
          <NextLink href={Routes.Progress} onClick={close}>
            {t("seeAll")}
            <ArrowRight size={14} />
          </NextLink>
        </Link>
      </VStack>
    </SidePanel>
  );
}
