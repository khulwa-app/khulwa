"use client";

import { Button, HStack, Text, VStack, Wrap } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { usePomodoro } from "@/modules/pomodoro/hooks/use-pomodoro";
import { Logo } from "@/components/ui";

const pomodoroOptions = {
  duration: 25,
  rounds: 4,
  autoStart: true,
};

export default function DashboardHomePage() {
  const tActions = useTranslations("actions");
  const tHome = useTranslations("home");
  const { minutes, seconds, isRunning, start, pause, reset, skip, currentRound } = usePomodoro(pomodoroOptions);

  return (
    <VStack minH="dvh" justify="center" align="center" gap="8" padding="6">
      <Wrap>
        <Logo />
      </Wrap>

      <Text textStyle="heading-h1" color="fg.subtle">
        {tHome("round", { current: currentRound, total: pomodoroOptions.rounds })}
      </Text>

      <Text textStyle="numeric-timer" data-numeric color="fg">
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </Text>

      <HStack gap="3">
        <Button onClick={isRunning ? pause : start} colorPalette="teal" size="lg" rounded="full" px="8">
          {isRunning ? tActions("pause") : tActions("start")}
        </Button>
        <Button onClick={reset} variant="outline" colorPalette="stone" size="lg" rounded="full">
          {tActions("reset")}
        </Button>
        <Button onClick={skip} variant="ghost" colorPalette="stone" size="lg" rounded="full">
          {tActions("skip")}
        </Button>
      </HStack>
    </VStack>
  );
}
