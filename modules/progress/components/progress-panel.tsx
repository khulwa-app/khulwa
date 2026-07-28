"use client";

import NextLink from "next/link";
import { ArrowRight } from "@solar-icons/react";
import { useTranslations } from "next-intl";
import { SidePanel, usePanels, Panel } from "@/modules/panels";
import { Routes } from "@/constants/routes";
import { CATEGORIES, formatDuration, type CategoryId } from "../categories";
import { useProgress } from "@/services/progress";
import { CategoryBar } from "./category-bar";

const EMPTY: Partial<Record<CategoryId, number>> = {};
export function ProgressPanel() { const t = useTranslations("khulwa.progress"); const open = usePanels((state) => state.open === Panel.Progress); const close = usePanels((state) => state.close); const { data, isPending } = useProgress("day"); const today = data?.totals ?? EMPTY; const total = Object.values(today).reduce((sum, value) => sum + (value ?? 0), 0); const max = Math.max(...CATEGORIES.map((category) => today[category.id] ?? 0), 1); return <SidePanel onClose={close} open={open} title={t("title")}><div className="flex h-full w-full flex-col gap-6"><div className="flex items-baseline justify-between"><p className="text-sm text-sage-700">{t("today")}</p><p className="text-xl font-semibold tabular-nums text-sage-1000" suppressHydrationWarning>{isPending ? "—" : formatDuration(total)}</p></div><div className="grid gap-4">{CATEGORIES.map((category) => <CategoryBar color={category.color} id={category.id} key={category.id} max={max} seconds={today[category.id] ?? 0} />)}</div><NextLink className="mt-auto flex items-center justify-end gap-2 text-sm font-semibold text-sage-700 hover:text-sage-1000" href={Routes.Progress} onClick={close}>{t("seeAll")}<ArrowRight className="size-4" /></NextLink></div></SidePanel>; }
