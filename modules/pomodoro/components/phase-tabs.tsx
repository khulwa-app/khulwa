"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PomodoroPhase } from "../types";

type PhaseTabsProps = {
  phase: PomodoroPhase;
  currentRound: number;
  totalRounds: number;
  onPhaseChange: (phase: PomodoroPhase) => void;
};

const PHASES = [PomodoroPhase.Focus, PomodoroPhase.ShortBreak, PomodoroPhase.LongBreak] as const;

function PhaseTabsComponent({ phase, currentRound, totalRounds, onPhaseChange }: PhaseTabsProps) {
  const t = useTranslations("khulwa");

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="tablist"
        aria-label={t("aria.phaseTabs")}
        className="flex items-center gap-1 rounded-full border border-hairline bg-surface-veil p-1"
      >
        {PHASES.map((target) => (
          <button
            key={target}
            type="button"
            role="tab"
            aria-selected={phase === target}
            onClick={() => onPhaseChange(target)}
            className={cn(
              "h-8 rounded-full px-3 text-xs font-medium transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              phase === target
                ? "bg-primary text-primary-foreground"
                : "text-foreground-secondary hover:bg-surface-elevated hover:text-foreground",
            )}
          >
            {t(`phase.${target}`)}
          </button>
        ))}
      </div>

      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={totalRounds}
        aria-valuenow={currentRound}
        aria-label={t("aria.roundProgress", { current: currentRound, total: totalRounds })}
        className="flex items-center gap-2"
      >
        {Array.from({ length: totalRounds }, (_, index) => (
          <span
            key={index}
            aria-hidden
            className={cn("size-1.5 rounded-full", index < currentRound ? "bg-primary" : "bg-border")}
          />
        ))}
      </div>
    </div>
  );
}

export const PhaseTabs = memo(PhaseTabsComponent);
PhaseTabs.displayName = "PhaseTabs";
