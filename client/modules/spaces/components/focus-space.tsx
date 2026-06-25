"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { formatPomodoro } from "@/modules/clock";
import { NoorOrb } from "@/modules/companion";
import { usePomodoro, usePomodoroHydrated, PhaseTabs, PomodoroPhase } from "@/modules/pomodoro";
import { CategoryChip, dayKey, useProgressStore } from "@/modules/progress";
import { DoingNowCaption } from "@/modules/tasks/components/doing-now-caption";
import { SpaceBackground } from "./space-background";

export function FocusSpace() {
  const t = useTranslations("khulwa");
  const hydrated = usePomodoroHydrated();
  const { minutes, seconds, isRunning, hasStarted, phase, currentRound, totalRounds, completionCount, lastCompletedPhase, focusMinutes, start, pause, reset, skip, setPhase } = usePomodoro();
  const primaryLabel = isRunning ? t("actions.pause") : hasStarted ? t("actions.resume") : t("actions.begin");

  const [blooming, setBlooming] = useState(false);
  const prevCompletion = useRef(completionCount);
  useEffect(() => {
    if (completionCount <= prevCompletion.current) return;
    const wasFocus = lastCompletedPhase === PomodoroPhase.Focus;
    prevCompletion.current = completionCount;
    if (!wasFocus) return;
    const { selected, logFocus } = useProgressStore.getState();
    if (selected) logFocus(dayKey(), selected, focusMinutes * 60);
    // Bloom is a celebratory motion flourish — skip it (no remount) when the
    // user prefers reduced motion; the focus log above still happens.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setBlooming(true);
    const id = setTimeout(() => setBlooming(false), 900);
    return () => clearTimeout(id);
  }, [completionCount, lastCompletedPhase, focusMinutes]);

  return (
    <Box position="relative" h="full" w="full" bg="bg.base" overflow="hidden">
      <SpaceBackground />
      {hydrated && (
        <VStack position="relative" zIndex={1} h="full" w="full" justify="center" align="center" padding="6">
          <VStack gap="7" align="center">
            <NoorOrb size={72} bloom={blooming} />

            <PhaseTabs phase={phase} currentRound={currentRound} totalRounds={totalRounds} onPhaseChange={setPhase} />

            <Text textStyle="numeric-display" data-numeric color="fg.default" suppressHydrationWarning>
              {formatPomodoro(minutes, seconds)}
            </Text>

            <DoingNowCaption />

            <CategoryChip />

            <HStack gap="6" align="center">
              <Button onClick={reset} visual="ghost" shape="circle" size="lg" aria-label={t("actions.reset")}>
                <RotateCcw size={20} />
              </Button>
              <Button onClick={isRunning ? pause : start} visual="solid" shape="circle" size="xl" aria-label={primaryLabel}>
                {isRunning ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" />}
              </Button>
              <Button onClick={skip} visual="ghost" shape="circle" size="lg" aria-label={t("actions.skip")}>
                <SkipForward size={20} />
              </Button>
            </HStack>
          </VStack>
        </VStack>
      )}
    </Box>
  );
}
