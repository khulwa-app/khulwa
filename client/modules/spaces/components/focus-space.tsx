"use client";

import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { RotateCcw, SkipForward } from "lucide-react";
import { formatPomodoro } from "@/modules/clock";
import { usePomodoro, usePomodoroHydrated, PhaseTabs } from "@/modules/pomodoro";
import { DoingNowCaption } from "@/modules/tasks/components/doing-now-caption";

export function FocusSpace() {
  const t = useTranslations("khulwa");
  const hydrated = usePomodoroHydrated();
  const { minutes, seconds, isRunning, hasStarted, phase, currentRound, totalRounds, start, pause, reset, skip, setPhase } = usePomodoro();
  const primaryLabel = isRunning ? t("actions.pause") : hasStarted ? t("actions.resume") : t("actions.begin");

  return (
    <Box position="relative" h="full" w="full" bg="bg.base" overflow="hidden">
      {hydrated && (
        <VStack position="relative" h="full" w="full" justify="center" align="center" gap="5" padding="6">
          <Text textStyle="label-md" color="fg.muted">
            {t(`eyebrow.${phase}`)}
          </Text>

          <PhaseTabs phase={phase} currentRound={currentRound} totalRounds={totalRounds} onPhaseChange={setPhase} />

          <Text textStyle="numeric-display" data-numeric color="fg.default" suppressHydrationWarning>
            {formatPomodoro(minutes, seconds)}
          </Text>

          <DoingNowCaption />

          <HStack gap="3">
            <Button onClick={isRunning ? pause : start} visual="solid" size="lg">
              {primaryLabel}
            </Button>
            <Button onClick={reset} visual="ghost" size="md" shape="pill" w="12" aria-label={t("actions.pause")}>
              <RotateCcw size={20} />
            </Button>
            <Button onClick={skip} visual="ghost" size="md" shape="pill" w="12" aria-label={t("actions.resume")}>
              <SkipForward size={20} />
            </Button>
          </HStack>
        </VStack>
      )}
    </Box>
  );
}
