"use client";

import { useTranslations } from "next-intl";
import { formatDuration } from "../utils";
import { useProgress } from "@/services/progress";

export function TodayProgress() { const t = useTranslations("khulwa.progress"); const { data } = useProgress("day"); const total = data?.totalSeconds ?? 0; if (total === 0) return null; return <section className="rounded-panel border border-sage-300 bg-base-100 p-5"><header className="flex items-baseline justify-between"><h2 className="font-semibold text-sage-1000">{t("today")}</h2><span className="text-sm tabular-nums text-sage-700">{formatDuration(total)}</span></header><div className="mt-5 h-2 overflow-hidden rounded-full bg-sage-800"><span className="block h-full w-full rounded-full bg-sage-500" /></div></section>; }
