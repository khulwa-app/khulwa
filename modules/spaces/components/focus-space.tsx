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

const RING_RADIUS = 142;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function FocusSpace() {
  const t = useTranslations("khulwa");
  const tErrors = useTranslations("errors");
  const hydrated = usePomodoroHydrated();
  const {
    minutes,
    seconds,
    totalSeconds,
    progress,
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
  const elapsedSeconds = Math.max(0, totalSeconds - (minutes * 60 + seconds));
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const ringOffset = RING_CIRCUMFERENCE * (1 - progress);

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
        <div className="relative z-1 flex flex-1 w-full items-center justify-center px-5 pt-24 pb-30 md:px-8 md:py-18">
          <section
            aria-label={t(`phase.${phase}`)}
            className="relative flex w-full max-w-4xl flex-col items-center gap-5 px-2 text-center sm:gap-6 md:px-4"
          >
            <PhaseTabs phase={phase} currentRound={currentRound} totalRounds={totalRounds} onPhaseChange={setPhase} />

            <div className="flex h-8 items-center justify-center">
              <DoingNowCaption />
            </div>

            <div className="relative flex aspect-square w-[min(76vw,21rem)] items-center justify-center md:w-[24rem] lg:w-[26rem]">
              <div
                className="absolute inset-6 rounded-full border border-hairline/70 bg-surface-veil/16 shadow-[inset_0_1px_0_rgb(237_241_238/0.04)] backdrop-blur-[2px]"
                aria-hidden
              />
              <div className="absolute inset-16 rounded-full border border-hairline/45" aria-hidden />

              <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 320 320" aria-hidden>
                <circle
                  cx="160"
                  cy="160"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="rgb(237 241 238 / 0.07)"
                  strokeWidth="5"
                />
                <circle
                  cx="160"
                  cy="160"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={ringOffset}
                  className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
                />
              </svg>

              <div className="relative flex flex-col items-center gap-4">
                <p className="kh-space-kicker text-foreground-muted">
                  {t(`phase.${phase}`)}
                </p>
                <p
                  className="kh-space-timer text-foreground"
                  suppressHydrationWarning
                >
                  {formatPomodoro(minutes, seconds)}
                </p>
                <p
                  aria-live="polite"
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    isRunning ? "text-foreground-secondary" : "text-foreground-muted",
                  )}
                >
                  <span
                    className={cn("size-1.5 rounded-full", isRunning ? "bg-success" : "bg-foreground-muted")}
                    aria-hidden
                  />
                  {stateLabel}
                </p>
              </div>
            </div>

            <dl className="grid w-full max-w-md grid-cols-3 overflow-hidden rounded-2xl border border-hairline bg-surface-veil/55 text-[0.6875rem] backdrop-blur-[8px] sm:rounded-full">
              <div className="px-3 py-2.5">
                <dt className="text-foreground-muted">Round</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
                  {currentRound}/{totalRounds}
                </dd>
              </div>
              <div className="border-x border-hairline px-3 py-2.5">
                <dt className="text-foreground-muted">Elapsed</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">{elapsedMinutes}m</dd>
              </div>
              <div className="px-3 py-2.5">
                <dt className="text-foreground-muted">Progress</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">{Math.round(progress * 100)}%</dd>
              </div>
            </dl>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={reset}
                aria-label={t("actions.reset")}
                disabled={!canReset}
                className="kh-icon-action disabled:pointer-events-none disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <RotateCcw className="size-4.5" />
              </button>

              <button
                type="button"
                onClick={isRunning ? pause : start}
                aria-label={primaryLabel}
                className="kh-primary-action motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {isRunning ? <Pause className="size-4.5 fill-current" /> : <Play className="size-4.5 fill-current" />}
                {primaryLabel}
              </button>

              <button
                type="button"
                onClick={skip}
                aria-label={t("actions.skip")}
                className="kh-icon-action focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <SkipForward className="size-4.5" />
              </button>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-foreground-muted">
              Pick one thing. Keep the field quiet. Let the clock carry the session.
            </p>
          </section>
        </div>
      ) : null}
    </div>
  );
}
