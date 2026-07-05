"use client";

import { Presence } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { formatPomodoro } from "@/modules/clock";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { useTasks } from "@/services/tasks";
import { TimerPill } from "@/theme/slot-recipes/floating-timer";
import { usePomodoro } from "../hooks/use-pomodoro.hook";
import { usePomodoroHydrated } from "../hooks/use-pomodoro-hydrated.hook";
import { PomodoroPhase } from "../types";

export function FloatingTimer() {
  const t = useTranslations("pomodoro");
  const hydrated = usePomodoroHydrated();
  const { minutes, seconds, isRunning, hasStarted, phase } = usePomodoro();
  const activeSpace = useSpace((s) => s.activeSpace);
  const changeSpace = useSpace((s) => s.changeSpace);
  const { data: tasks } = useTasks();
  const currentTask = tasks?.find((task) => task.isDoingNow);

  const present = hydrated && hasStarted && activeSpace !== Space.Focus;

  return (
    <TimerPill.Positioner>
      <Presence
        present={present}
        lazyMount
        unmountOnExit
        animationName={{ _open: "panel-in", _closed: "panel-out" }}
        animationDuration="fast"
      >
        <TimerPill.Root
          type="button"
          data-paused={!isRunning || undefined}
          aria-label={t("backToFocus")}
          title={currentTask?.body ?? t("backToFocus")}
          onClick={() => changeSpace(Space.Focus)}
        >
          <TimerPill.Dot data-phase={phase === PomodoroPhase.Focus ? "focus" : undefined} />
          <span suppressHydrationWarning>{formatPomodoro(minutes, seconds)}</span>
        </TimerPill.Root>
      </Presence>
    </TimerPill.Positioner>
  );
}
