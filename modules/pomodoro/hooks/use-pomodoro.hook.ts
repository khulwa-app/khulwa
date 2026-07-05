"use client";

import { PomodoroPhase } from "../types";
import type { PomodoroOptions } from "../types";
import { usePomodoroStore } from "./use-pomodoro-store.hook";

type UsePomodoroReturn = {
  minutes: number;
  seconds: number;
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

const MS_PER_MINUTE = 60_000;

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
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hasStarted = timeLeftMs < phaseMinutes(options, phase) * MS_PER_MINUTE;

  return {
    minutes,
    seconds,
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
