"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { PomodoroPhase } from "../types";

type PhaseTabsProps = { phase: PomodoroPhase; currentRound: number; totalRounds: number; onPhaseChange: (phase: PomodoroPhase) => void; tone?: "light" | "dark" };

function PhaseTabsComponent({ phase, currentRound, totalRounds, onPhaseChange, tone = "light" }: PhaseTabsProps) {
  const t = useTranslations("khulwa");
  const phases = [PomodoroPhase.Focus, PomodoroPhase.ShortBreak, PomodoroPhase.LongBreak] as const;
  return <div aria-label={t("aria.phaseTabs")} className="grid justify-items-center gap-3" role="tablist"><div className={cn("tabs tabs-box rounded-control border p-1", tone === "dark" ? "border-sage-700 bg-sage-900" : "border-sage-300 bg-base-100")}>{phases.map((target) => <button aria-selected={phase === target} className={cn("tab h-10 rounded-[0.65rem] px-3 text-sm font-semibold", phase === target ? tone === "dark" ? "bg-sage-500 text-sage-1000" : "bg-sage-800 text-sage-100" : tone === "dark" ? "text-sage-200" : "text-sage-700")} key={target} onClick={() => onPhaseChange(target)} role="tab" type="button">{t(`phase.${target}`)}</button>)}</div><div aria-label={t("aria.roundProgress", { current: currentRound, total: totalRounds })} className="flex gap-2" role="progressbar">{Array.from({ length: totalRounds }, (_, index) => <span className={cn("size-2 rounded-full", index < currentRound ? tone === "dark" ? "bg-sage-500" : "bg-sage-700" : tone === "dark" ? "bg-sage-700" : "bg-sage-300")} key={index} />)}</div></div>;
}

export const PhaseTabs = memo(PhaseTabsComponent);
PhaseTabs.displayName = "PhaseTabs";
