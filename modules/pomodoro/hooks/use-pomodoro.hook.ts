"use client";

import { PomodoroPhase } from "../types";
import type { PomodoroOptions } from "../types";
import { usePomodoroStore } from "./use-pomodoro-store.hook";

type UsePomodoroReturn = {
  minutes: number;
  seconds: number;
  totalSeconds: number;
  progress: number;
  phase: PomodoroPhase;
  currentRound: number;
  totalRounds: number;
  isRunning: boolean;
  hasStarted: boolean;
  completionCount: number;
  lastCompletedPhase: PomodoroPhase | null;
  focusMinutes: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  setPhase: (phase: PomodoroPhase) => void;
};

function phaseMinutes(options: PomodoroOptions, phase: PomodoroPhase): number {
  switch (phase) {
    case PomodoroPhase.Focus:
      return options.focusMinutes;
    case PomodoroPhase.ShortBreak:
      return options.shortBreakMinutes;
    case PomodoroPhase.LongBreak:
      return options.longBreakMinutes;
  }
}

export function usePomodoro(): UsePomodoroReturn {
  const timeLeftMs = usePomodoroStore((s) => s.timeLeftMs);
  const isRunning = usePomodoroStore((s) => s.isRunning);
  const phase = usePomodoroStore((s) => s.phase);
  const currentRound = usePomodoroStore((s) => s.currentRound);
  const options = usePomodoroStore((s) => s.options);
  const start = usePomodoroStore((s) => s.start);
  const pause = usePomodoroStore((s) => s.pause);
  const reset = usePomodoroStore((s) => s.reset);
  const skip = usePomodoroStore((s) => s.skip);
  const setPhase = usePomodoroStore((s) => s.setPhase);
  const completionCount = usePomodoroStore((s) => s.completionCount);
  const lastCompletedPhase = usePomodoroStore((s) => s.lastCompletedPhase);

  const totalSeconds = Math.ceil(timeLeftMs / 1000);
  const phaseTotalSeconds = phaseMinutes(options, phase) * 60;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hasStarted = timeLeftMs < phaseTotalSeconds * 1000;
  const progress = phaseTotalSeconds > 0 ? Math.min(1, Math.max(0, 1 - timeLeftMs / (phaseTotalSeconds * 1000))) : 0;

  return {
    minutes,
    seconds,
    totalSeconds: phaseTotalSeconds,
    progress,
    phase,
    currentRound,
    totalRounds: options.rounds,
    isRunning,
    hasStarted,
    completionCount,
    lastCompletedPhase,
    focusMinutes: options.focusMinutes,
    start,
    pause,
    reset,
    skip,
    setPhase,
  };
}
