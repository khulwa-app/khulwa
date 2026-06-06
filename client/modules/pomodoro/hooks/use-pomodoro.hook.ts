"use client";

import { useEffect } from "react";
import type { PomodoroPhase } from "../types";
import { usePomodoroStore } from "./use-pomodoro-store.hook";

type UsePomodoroReturn = {
  minutes: number;
  seconds: number;
  phase: PomodoroPhase;
  currentRound: number;
  totalRounds: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  setPhase: (phase: PomodoroPhase) => void;
};

const TICK_INTERVAL_MS = 1000;

export function usePomodoro(): UsePomodoroReturn {
  const timeLeftMs = usePomodoroStore((s) => s.timeLeftMs);
  const isRunning = usePomodoroStore((s) => s.isRunning);
  const phase = usePomodoroStore((s) => s.phase);
  const currentRound = usePomodoroStore((s) => s.currentRound);
  const totalRounds = usePomodoroStore((s) => s.options.rounds);
  const start = usePomodoroStore((s) => s.start);
  const pause = usePomodoroStore((s) => s.pause);
  const reset = usePomodoroStore((s) => s.reset);
  const skip = usePomodoroStore((s) => s.skip);
  const setPhase = usePomodoroStore((s) => s.setPhase);
  const tick = usePomodoroStore((s) => s.tick);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => tick(TICK_INTERVAL_MS), TICK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isRunning, tick]);

  const totalSeconds = Math.ceil(timeLeftMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    minutes,
    seconds,
    phase,
    currentRound,
    totalRounds,
    isRunning,
    start,
    pause,
    reset,
    skip,
    setPhase,
  };
}
