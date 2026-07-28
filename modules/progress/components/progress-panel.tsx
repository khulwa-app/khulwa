"use client";

import NextLink from "next/link";
import { ArrowRight } from "@solar-icons/react";
import { useTranslations } from "next-intl";
import { SidePanel, usePanels, Panel } from "@/modules/panels";
import { Routes } from "@/constants/routes";
import { formatDuration } from "../utils";
import { useProgress } from "@/services/progress";

export function ProgressPanel() { const t = useTranslations("khulwa.progress"); const open = usePanels((state) => state.open === Panel.Progress); const close = usePanels((state) => state.close); const { data, isPending } = useProgress("day"); const total = data?.totalSeconds ?? 0; return <SidePanel onClose={close} open={open} title={t("title")}><div className="flex h-full w-full flex-col gap-6"><section className="rounded-panel border border-sage-300 bg-base-100 p-5"><p className="text-sm text-sage-700">{t("today")}</p><p className="khulwa-numeric mt-2 text-4xl font-bold tabular-nums text-sage-1000" suppressHydrationWarning>{isPending ? "—" : formatDuration(total)}</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-sage-800"><span className="block h-full rounded-full bg-sage-500" style={{ width: total > 0 ? "100%" : "0%" }} /></div></section><NextLink className="mt-auto flex items-center justify-end gap-2 text-sm font-semibold text-sage-700 hover:text-sage-1000" href={Routes.Progress} onClick={close}>{t("seeAll")}<ArrowRight className="size-4" /></NextLink></div></SidePanel>; }
