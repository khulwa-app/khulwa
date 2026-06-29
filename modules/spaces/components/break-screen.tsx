"use client";

import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Lock, SkipForward } from "lucide-react";
import { formatClock, formatPomodoro, useClock } from "@/modules/clock";
import { NoorOrb } from "@/modules/companion";
import { PomodoroPhase } from "@/modules/pomodoro";

interface BreakScreenProps {
  phase: PomodoroPhase;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  bloom?: boolean;
  onToggle: () => void;
  onSkip: () => void;
}

export function BreakScreen({ phase, minutes, seconds, isRunning, bloom, onToggle, onSkip }: BreakScreenProps) {
  const t = useTranslations("khulwa");
  const now = useClock();
  const key = phase === PomodoroPhase.LongBreak ? "longBreak" : "shortBreak";

  const lockScreen = () => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) void document.exitFullscreen?.();
    else void document.documentElement.requestFullscreen?.();
  };

  return (
    <VStack gap={{ base: "5", md: "6" }} align="center" maxW="2xl" textAlign="center">
      <NoorOrb size={64} bloom={bloom} />

      <Text textStyle="hero-meta" color="fg.onMeshMuted" suppressHydrationWarning>
        {t("break.currentTime", { time: formatClock(now, { hour12: true }) })}
      </Text>

      <Text textStyle="greeting" color="fg.onMesh">
        {t(`break.${key}.title`)}
      </Text>

      <Text textStyle="body-lg" color="fg.onMeshMuted" maxW="md">
        {t(`break.${key}.subtitle`)}
      </Text>

      <Box w="24" h="1px" bg="glass.borderLit" rounded="full" />

      <Text textStyle="numeric-display" data-numeric color="fg.onMeshSubtle" suppressHydrationWarning>
        {formatPomodoro(minutes, seconds)}
      </Text>

      <HStack gap="3" pt="1">
        <Button variant="onGlass.outline" size="lg" onClick={onToggle}>
          {isRunning ? t("actions.pause") : t("actions.resume")}
        </Button>
        <Button variant="onGlass.ghost" size="lg" onClick={onSkip}>
          <SkipForward size={16} aria-hidden />
          {t("actions.skip")}
        </Button>
        <Button variant="onGlass.ghost" size="lg" onClick={lockScreen}>
          <Lock size={16} aria-hidden />
          {t("break.lockScreen")}
        </Button>
      </HStack>

      <Text textStyle="label-md" color="fg.onMeshSubtle">
        {t("break.footerHint")}
      </Text>
    </VStack>
  );
}
