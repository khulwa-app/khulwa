"use client";

import { HStack, Switch, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { NumberField } from "@/components/ui";
import { usePomodoroStore } from "@/modules/pomodoro";

export function PomodoroSection() {
  const t = useTranslations("settings.pomodoro");
  const options = usePomodoroStore((s) => s.options);
  const setOptions = usePomodoroStore((s) => s.setOptions);

  return (
    <VStack align="stretch" gap="2.5">
      <NumberField
        label={t("focus")}
        value={options.focusMinutes}
        min={1}
        unit={t("minutes")}
        onValueChange={(v) => setOptions({ focusMinutes: v })}
      />
      <NumberField
        label={t("shortBreak")}
        value={options.shortBreakMinutes}
        min={1}
        unit={t("minutes")}
        onValueChange={(v) => setOptions({ shortBreakMinutes: v })}
      />
      <NumberField
        label={t("longBreak")}
        value={options.longBreakMinutes}
        min={1}
        unit={t("minutes")}
        onValueChange={(v) => setOptions({ longBreakMinutes: v })}
      />
      <NumberField
        label={t("rounds")}
        value={options.rounds}
        min={1}
        unit={t("roundsUnit")}
        onValueChange={(v) => setOptions({ rounds: v })}
      />

      <HStack justify="space-between" align="center">
        <Text textStyle="body-sm" color="fg.default">
          {t("autoStart")}
        </Text>
        <Switch.Root
          checked={options.autoStart}
          onCheckedChange={(e) => setOptions({ autoStart: e.checked })}
          aria-label={t("autoStart")}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Root>
      </HStack>
    </VStack>
  );
}
