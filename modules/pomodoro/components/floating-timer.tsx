"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { formatPomodoro } from "@/modules/clock";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePresence } from "@/modules/panels";
import { useTasks } from "@/services/tasks";
import { usePomodoro } from "../hooks/use-pomodoro.hook";
import { usePomodoroHydrated } from "../hooks/use-pomodoro-hydrated.hook";
import { PomodoroPhase } from "../types";

const EXIT_MS = 130;

export function FloatingTimer() {
  const t = useTranslations("pomodoro");
  const hydrated = usePomodoroHydrated();
  const { minutes, seconds, isRunning, hasStarted, phase } = usePomodoro();
  const activeSpace = useSpace((s) => s.activeSpace);
  const changeSpace = useSpace((s) => s.changeSpace);
  const { data: tasks } = useTasks();
  const currentTask = tasks?.find((task) => task.isDoingNow);

  const present = hydrated && hasStarted && activeSpace !== Space.Focus;
  const { mounted, state } = usePresence(present, EXIT_MS);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-20 flex justify-center">
      <button
        type="button"
        data-state={state}
        // The countdown itself is the button's visible text, so it stays part of the accessible name.
        aria-label={`${formatPomodoro(minutes, seconds)} · ${t("backToFocus")}`}
        title={currentTask?.body ?? t("backToFocus")}
        onClick={() => changeSpace(Space.Focus)}
        className={cn(
          "tabular pointer-events-auto flex h-9 items-center gap-2 rounded-full border border-hairline bg-surface-veil px-3.5 text-sm font-medium backdrop-blur-[10px]",
          "transition-[opacity,transform] ease-out motion-reduce:transition-none",
          "duration-[var(--duration-enter)] data-[state=closed]:duration-[var(--duration-exit)]",
          "data-[state=open]:translate-y-0 data-[state=open]:opacity-100",
          "data-[state=closed]:-translate-y-2 data-[state=closed]:opacity-0",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            !isRunning ? "bg-foreground-muted" : phase === PomodoroPhase.Focus ? "bg-primary" : "bg-success",
          )}
        />
        <span suppressHydrationWarning>{formatPomodoro(minutes, seconds)}</span>
      </button>
    </div>
  );
}
