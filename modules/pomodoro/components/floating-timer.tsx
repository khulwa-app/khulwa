"use client";

import { useTranslations } from "next-intl";
import { formatPomodoro } from "@/modules/clock";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { useTasks } from "@/services/tasks";
import { usePomodoro } from "../hooks/use-pomodoro.hook";
import { usePomodoroHydrated } from "../hooks/use-pomodoro-hydrated.hook";
import { PomodoroPhase } from "../types";

export function FloatingTimer() { const t = useTranslations("pomodoro"); const hydrated = usePomodoroHydrated(); const { minutes, seconds, isRunning, hasStarted, phase } = usePomodoro(); const activeSpace = useSpace((state) => state.activeSpace); const changeSpace = useSpace((state) => state.changeSpace); const { data: tasks } = useTasks(); const currentTask = tasks?.find((task) => task.isDoingNow); if (!(hydrated && hasStarted && activeSpace !== Space.Focus)) return null; return <button aria-label={t("backToFocus")} className="fixed left-1/2 top-5 z-20 flex h-9 -translate-x-1/2 items-center gap-2 rounded-full border border-sage-300 bg-base-100 px-3 font-mono text-sm font-semibold tabular-nums text-sage-1000 hover:border-sage-500" data-paused={!isRunning || undefined} onClick={() => changeSpace(Space.Focus)} title={currentTask?.body ?? t("backToFocus")} type="button"><span className={phase === PomodoroPhase.Focus ? "size-2 rounded-full bg-sage-500" : "size-2 rounded-full bg-sage-200"} /><span suppressHydrationWarning>{formatPomodoro(minutes, seconds)}</span></button>; }
