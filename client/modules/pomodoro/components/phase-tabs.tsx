"use client";

import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { PomodoroPhase } from "../types";

type PhaseTabsProps = {
  phase: PomodoroPhase;
  currentRound: number;
  totalRounds: number;
  onPhaseChange: (phase: PomodoroPhase) => void;
};

const PHASES: readonly PomodoroPhase[] = Object.values(PomodoroPhase);

export function PhaseTabs({ phase, currentRound, totalRounds, onPhaseChange }: PhaseTabsProps) {
  const t = useTranslations("khulwa");

  return (
    <HStack role="tablist" aria-label={t("aria.phaseTabs")} align="start" gap="2">
      {PHASES.map((p) => {
        const active = p === phase;
        const isFocusTab = p === PomodoroPhase.Focus;
        return (
          <VStack key={p} gap="2" align="center">
            <Button
              role="tab"
              aria-selected={active}
              visual={active ? "solid" : "outline"}
              size="sm"
              shape="pill"
              onClick={() => onPhaseChange(p)}
            >
              {t(`phase.${p}`)}
            </Button>
            {isFocusTab && (
              <HStack
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={totalRounds}
                aria-valuenow={currentRound}
                aria-label={t("aria.roundProgress", { current: currentRound, total: totalRounds })}
                gap="2"
              >
                {Array.from({ length: totalRounds }, (_, index) => {
                  const filled = index < currentRound;
                  return (
                    <Box
                      key={index}
                      aria-hidden
                      boxSize="2"
                      rounded="full"
                      bg={filled ? "primary.default" : "primary.subtle"}
                    />
                  );
                })}
              </HStack>
            )}
          </VStack>
        );
      })}
    </HStack>
  );
}
