"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { formatClock, formatPomodoro, useClock } from "@/modules/clock";
import { PomodoroPhase } from "@/modules/pomodoro";

type BreakScreenProps = { phase: PomodoroPhase; minutes: number; seconds: number; isRunning: boolean; onToggle: () => void; onSkip: () => void };

export function BreakScreen({ phase, minutes, seconds, isRunning, onToggle, onSkip }: BreakScreenProps) {
  const t = useTranslations("khulwa"); const now = useClock(); const key = phase === PomodoroPhase.LongBreak ? "longBreak" : "shortBreak";
  const fullscreen = () => { if (document.fullscreenElement) void document.exitFullscreen(); else void document.documentElement.requestFullscreen?.(); };
  return <div className="grid max-w-2xl justify-items-center gap-6 text-center"><p className="text-sm font-medium text-sage-700">{t("break.currentTime", { time: formatClock(now, { hour12: true }) })}</p><h1 className="text-4xl font-semibold tracking-[-0.06em] text-sage-1000 sm:text-6xl">{t(`break.${key}.title`)}</h1><p className="max-w-md text-base leading-7 text-sage-800">{t(`break.${key}.subtitle`)}</p><span className="h-px w-24 bg-sage-300" /><p className="khulwa-numeric text-6xl font-medium tracking-[-0.08em] text-sage-800 sm:text-8xl">{formatPomodoro(minutes, seconds)}</p><div className="flex flex-wrap justify-center gap-3"><Button onClick={onToggle} tone="secondary">{isRunning ? t("actions.pause") : t("actions.resume")}</Button><Button onClick={onSkip} tone="quiet">{t("actions.skip")}</Button><Button onClick={fullscreen} tone="quiet">{t("break.lockScreen")}</Button></div><p className="text-sm text-sage-700">{t("break.footerHint")}</p></div>;
}
