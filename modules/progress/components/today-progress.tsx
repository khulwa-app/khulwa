"use client";

import { useTranslations } from "next-intl";
import { CATEGORIES, formatDuration, type CategoryId } from "../categories";
import { useProgress } from "@/services/progress";
import { CategoryBar } from "./category-bar";

const EMPTY: Partial<Record<CategoryId, number>> = {};
export function TodayProgress() { const t = useTranslations("khulwa.progress"); const { data } = useProgress("day"); const today = data?.totals ?? EMPTY; const total = Object.values(today).reduce((sum, value) => sum + (value ?? 0), 0); if (total === 0) return null; const max = Math.max(...CATEGORIES.map((category) => today[category.id] ?? 0), 1); return <section className="rounded-panel border border-sage-300 bg-base-100 p-5"><header className="flex items-baseline justify-between"><h2 className="font-semibold text-sage-1000">{t("today")}</h2><span className="text-sm tabular-nums text-sage-700">{formatDuration(total)}</span></header><div className="mt-5 grid gap-4">{CATEGORIES.filter((category) => (today[category.id] ?? 0) > 0).map((category) => <CategoryBar color={category.color} id={category.id} key={category.id} max={max} seconds={today[category.id] ?? 0} />)}</div></section>; }
