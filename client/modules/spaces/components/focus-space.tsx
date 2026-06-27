"use client";

import { useEffect, useRef, useState } from "react";
import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { formatPomodoro } from "@/modules/clock";
import { NoorOrb } from "@/modules/companion";
import { usePomodoro, usePomodoroHydrated, PhaseTabs, PomodoroPhase } from "@/modules/pomodoro";
import { CategoryChip, useProgressStore } from "@/modules/progress";
import { useLogFocusSession } from "@/services/progress";
import { DoingNowCaption } from "@/modules/tasks/components/doing-now/doing-now-caption";
import { SpaceBackground } from "./space-background";

export function FocusSpace() {
  const t = useTranslations("khulwa");
  const hydrated = usePomodoroHydrated();
  const {
    minutes,
    seconds,
    isRunning,
    hasStarted,
    phase,
    currentRound,
    totalRounds,
    completionCount,
    lastCompletedPhase,
    focusMinutes,
    start,
    pause,
    reset,
    skip,
    setPhase,
  } = usePomodoro();
  const primaryLabel = isRunning ? t("actions.pause") : hasStarted ? t("actions.resume") : t("actions.begin");

  const [prevCompletion, setPrevCompletion] = useState(completionCount);
  const [blooming, setBlooming] = useState(false);
  if (completionCount !== prevCompletion) {
    setPrevCompletion(completionCount);
    const wasFocus = lastCompletedPhase === PomodoroPhase.Focus;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setBlooming(wasFocus && !reduce);
  }

  const selected = useProgressStore((s) => s.selected);
  const { mutate: logSession } = useLogFocusSession();
  const loggedCompletion = useRef(completionCount);
  useEffect(() => {
    if (completionCount <= loggedCompletion.current) return;
    loggedCompletion.current = completionCount;
    if (lastCompletedPhase !== PomodoroPhase.Focus) return;
    const endedAt = new Date();
    const startedAt = new Date(endedAt.getTime() - focusMinutes * 60_000);
    logSession({
      category: selected,
      durationSeconds: focusMinutes * 60,
      startedAt: startedAt.toISOString(),
      endedAt: endedAt.toISOString(),
    });
  }, [completionCount, lastCompletedPhase, focusMinutes, selected, logSession]);

  useEffect(() => {
    if (!blooming) return;
    const id = setTimeout(() => setBlooming(false), 900);
    return () => clearTimeout(id);
  }, [blooming]);

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
              <IconButton onClick={reset} variant="ghost" boxSize="12" rounded="full" aria-label={t("actions.reset")}>
                <RotateCcw size={20} />
              </IconButton>
              <IconButton
                onClick={isRunning ? pause : start}
                variant="primary"
                boxSize="16"
                rounded="full"
                aria-label={primaryLabel}
              >
                {isRunning ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" />}
              </IconButton>
              <IconButton onClick={skip} variant="ghost" boxSize="12" rounded="full" aria-label={t("actions.skip")}>
                <SkipForward size={20} />
              </IconButton>
            </HStack>
          </VStack>
        </VStack>
      )}
    </Box>
  );
}
