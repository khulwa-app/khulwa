"use client";

import { memo } from "react";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { PomodoroPhase } from "../types";

type PhaseTabsProps = {
  phase: PomodoroPhase;
  currentRound: number;
  totalRounds: number;
  onPhaseChange: (phase: PomodoroPhase) => void;
};

function PhaseTabsComponent({ phase, currentRound, totalRounds, onPhaseChange }: PhaseTabsProps) {
  const t = useTranslations("khulwa");

  const tabProps = (target: PomodoroPhase) =>
    ({
      role: "tab",
      "aria-selected": phase === target,
      variant: phase === target ? "primary" : "outline",
      size: "sm",
      onClick: () => onPhaseChange(target),
    }) as const;

  return (
    <HStack role="tablist" aria-label={t("aria.phaseTabs")} align="start" gap="2">
      <VStack gap="2" align="center">
        <Button {...tabProps(PomodoroPhase.Focus)}>{t("phase.focus")}</Button>

        <HStack
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={totalRounds}
          aria-valuenow={currentRound}
          aria-label={t("aria.roundProgress", { current: currentRound, total: totalRounds })}
          gap="2"
        >
          {Array.from({ length: totalRounds }, (_, index) => (
            <Box
              key={index}
              aria-hidden
              boxSize="2"
              rounded="full"
              bg={index < currentRound ? "primary.solid" : "fg.onMesh.subtle"}
            />
          ))}
        </HStack>
      </VStack>

      <Button {...tabProps(PomodoroPhase.ShortBreak)}>{t("phase.shortBreak")}</Button>
      <Button {...tabProps(PomodoroPhase.LongBreak)}>{t("phase.longBreak")}</Button>
    </HStack>
  );
}

export const PhaseTabs = memo(PhaseTabsComponent);
PhaseTabs.displayName = "PhaseTabs";
