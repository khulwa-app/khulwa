"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPomodoro } from "@/modules/clock";
import {
  canResetPomodoro,
  isFocusPhase,
  shouldResumePomodoro,
  usePomodoro,
  usePomodoroHydrated,
  PhaseTabs,
} from "@/modules/pomodoro";
import { useLogFocusSession } from "@/services/progress";
import { toast } from "@/lib/toast";
import { DoingNowCaption } from "@/modules/tasks/components/doing-now/doing-now-caption";
import { SpaceBackground } from "./space-background";

export function FocusSpace() {
  const t = useTranslations("khulwa");
  const tErrors = useTranslations("errors");
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
  const canReset = canResetPomodoro(phase);
  const isResumable = shouldResumePomodoro(phase, hasStarted);
  const primaryLabel = isRunning ? t("actions.pause") : isResumable ? t("actions.resume") : t("actions.begin");
  const stateLabel = isRunning ? t("state.running") : hasStarted ? t("state.paused") : t("state.ready");

  const { mutate: logSession } = useLogFocusSession();
  // Guards against re-sending the same completion, e.g. on a re-render or a Strict Mode double
  // effect. It advances only once the request has actually resolved — advancing on dispatch meant
  // a failed POST silently discarded a session the user cannot recreate.
  const dispatchedCompletion = useRef(completionCount);
  useEffect(() => {
    if (completionCount <= dispatchedCompletion.current) return;
    const attempted = completionCount;
    dispatchedCompletion.current = attempted;

    if (!isFocusPhase(lastCompletedPhase)) return;
    const endedAt = new Date();
    const startedAt = new Date(endedAt.getTime() - focusMinutes * 60_000);
    logSession(
      {
        durationSeconds: focusMinutes * 60,
        startedAt: startedAt.toISOString(),
        endedAt: endedAt.toISOString(),
      },
      {
        onError: () => {
          // Let the next render retry, and tell the user rather than losing it quietly.
          dispatchedCompletion.current = attempted - 1;
          toast.error(tErrors("sessionLost"));
        },
      },
    );
  }, [completionCount, lastCompletedPhase, focusMinutes, logSession, tErrors]);

  return (
    <div className="relative flex min-h-full w-full flex-col overflow-x-hidden bg-canvas">
      <SpaceBackground />
      {hydrated ? (
        <div className="relative z-1 flex flex-1 w-full flex-col items-center justify-center gap-6 px-6 py-16 md:gap-8 md:py-20">
          <PhaseTabs phase={phase} currentRound={currentRound} totalRounds={totalRounds} onPhaseChange={setPhase} />

          <DoingNowCaption />

          <p
            className="tabular text-[64px] leading-none font-semibold md:text-[104px]"
            suppressHydrationWarning
          >
            {formatPomodoro(minutes, seconds)}
          </p>

          <p
            aria-live="polite"
            className={cn(
              "flex items-center gap-2 text-xs font-medium",
              isRunning ? "text-foreground-secondary" : "text-foreground-muted",
            )}
          >
            <span
              className={cn("size-1.5 rounded-full", isRunning ? "bg-success" : "bg-foreground-muted")}
              aria-hidden
            />
            {stateLabel}
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={reset}
              aria-label={t("actions.reset")}
              disabled={!canReset}
              className="flex size-11 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-surface-elevated hover:text-foreground disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <RotateCcw className="size-5" />
            </button>

            <button
              type="button"
              onClick={isRunning ? pause : start}
              aria-label={primaryLabel}
              className="flex size-15 items-center justify-center rounded-full bg-primary text-primary-foreground transition-[background-color,transform] duration-[var(--duration-press)] hover:bg-primary-hover active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {isRunning ? <Pause className="size-6 fill-current" /> : <Play className="size-6 fill-current" />}
            </button>

            <button
              type="button"
              onClick={skip}
              aria-label={t("actions.skip")}
              className="flex size-11 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-surface-elevated hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <SkipForward className="size-5" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
