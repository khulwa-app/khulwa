"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { formatPomodoro } from "@/modules/clock";
import { CategoryChip, useProgressStore } from "@/modules/progress";
import { useLogFocusSession } from "@/services/progress";
import { DoingNowCaption } from "@/modules/tasks/components/doing-now/doing-now-caption";
import { usePomodoro, usePomodoroHydrated, PhaseTabs, PomodoroPhase } from "@/modules/pomodoro";
import { SpaceBackground } from "./space-background";

function ControlIcon({ kind }: { kind: "play" | "pause" | "reset" | "skip" }) {
  if (kind === "play") return <svg aria-hidden className="size-6" viewBox="0 0 24 24"><path d="m8 5 11 7-11 7V5Z" fill="currentColor" /></svg>;
  if (kind === "pause") return <svg aria-hidden className="size-6" viewBox="0 0 24 24"><path d="M7 5h3v14H7zm7 0h3v14h-3z" fill="currentColor" /></svg>;
  if (kind === "reset") return <svg aria-hidden className="size-5" fill="none" viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>;
  return <svg aria-hidden className="size-5" fill="none" viewBox="0 0 24 24"><path d="m5 5 8 7-8 7V5Zm9 0 5 7-5 7V5Z" fill="currentColor" /></svg>;
}

export function FocusSpace() {
  const t = useTranslations("khulwa");
  const hydrated = usePomodoroHydrated();
  const timer = usePomodoro();
  const selected = useProgressStore((state) => state.selected);
  const { mutate: logSession } = useLogFocusSession();
  const loggedCompletion = useRef(timer.completionCount);
  useEffect(() => { if (timer.completionCount <= loggedCompletion.current) return; loggedCompletion.current = timer.completionCount; if (timer.lastCompletedPhase !== PomodoroPhase.Focus) return; const endedAt = new Date(); logSession({ category: selected, durationSeconds: timer.focusMinutes * 60, startedAt: new Date(endedAt.getTime() - timer.focusMinutes * 60_000).toISOString(), endedAt: endedAt.toISOString() }); }, [logSession, selected, timer.completionCount, timer.focusMinutes, timer.lastCompletedPhase]);

  if (!hydrated) return <section className="min-h-dvh bg-sage-1000" />;
  return <section className="relative grid min-h-dvh place-items-center overflow-hidden bg-sage-1000 px-5 py-24"><SpaceBackground tone="night" /><div className="relative grid justify-items-center gap-7 text-center"><PhaseTabs currentRound={timer.currentRound} onPhaseChange={timer.setPhase} phase={timer.phase} tone="dark" totalRounds={timer.totalRounds} /><p className="khulwa-numeric text-[clamp(5rem,16vw,11rem)] font-bold leading-none tracking-[-0.06em] text-sage-100">{formatPomodoro(timer.minutes, timer.seconds)}</p><DoingNowCaption tone="dark" /><CategoryChip tone="dark" /><div className="flex items-center gap-4"><button aria-label={t("actions.reset")} className="grid size-12 place-items-center rounded-full border border-sage-700 bg-sage-900 text-sage-100 hover:border-sage-500 hover:bg-sage-800" onClick={timer.reset} type="button"><ControlIcon kind="reset" /></button><button aria-label={timer.isRunning ? t("actions.pause") : timer.hasStarted ? t("actions.resume") : t("actions.begin")} className="grid size-16 place-items-center rounded-full bg-sage-500 text-sage-1000 shadow-none transition-colors hover:bg-sage-400" onClick={timer.isRunning ? timer.pause : timer.start} type="button"><ControlIcon kind={timer.isRunning ? "pause" : "play"} /></button><button aria-label={t("actions.skip")} className="grid size-12 place-items-center rounded-full border border-sage-700 bg-sage-900 text-sage-100 hover:border-sage-500 hover:bg-sage-800" onClick={timer.skip} type="button"><ControlIcon kind="skip" /></button></div></div></section>;
}
