"use client";

import { create } from "zustand";
import { DEFAULT_POMODORO } from "../constants";
import type { PomodoroOptions } from "../types";
import { PomodoroPhase } from "../types";

type PomodoroState = {
  options: PomodoroOptions;
  phase: PomodoroPhase;
  isRunning: boolean;
  currentRound: number;
  timeLeftMs: number;
  setPhase: (phase: PomodoroPhase) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;

  skip: () => void;
  tick: (deltaMs: number) => void;
};

function durationMinutesFor(options: PomodoroOptions, phase: PomodoroPhase): number {
  switch (phase) {
    case PomodoroPhase.Focus:
      return options.focusMinutes;
    case PomodoroPhase.ShortBreak:
      return options.shortBreakMinutes;
    case PomodoroPhase.LongBreak:
      return options.longBreakMinutes;
  }
}

function computeNextSlot(
  options: PomodoroOptions,
  phase: PomodoroPhase,
  currentRound: number,
): { phase: PomodoroPhase; round: number } {
  switch (phase) {
    case PomodoroPhase.Focus:
      return currentRound < options.rounds
        ? { phase: PomodoroPhase.ShortBreak, round: currentRound }
        : { phase: PomodoroPhase.LongBreak, round: currentRound };
    case PomodoroPhase.ShortBreak:
      return { phase: PomodoroPhase.Focus, round: currentRound + 1 };
    case PomodoroPhase.LongBreak:
      return { phase: PomodoroPhase.Focus, round: 1 };
  }
}

const INITIAL_OPTIONS = DEFAULT_POMODORO;
const INITIAL_PHASE = PomodoroPhase.Focus;
const MS_PER_MINUTE = 60_000;

export const usePomodoroStore = create<PomodoroState>((set) => ({
  options: INITIAL_OPTIONS,
  phase: INITIAL_PHASE,
  isRunning: false,
  currentRound: 1,
  timeLeftMs: durationMinutesFor(INITIAL_OPTIONS, INITIAL_PHASE) * MS_PER_MINUTE,
  setPhase: (phase) =>
    set((s) => ({
      phase,
      timeLeftMs: durationMinutesFor(s.options, phase) * MS_PER_MINUTE,
      isRunning: false,
    })),
  start: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
  reset: () =>
    set((s) => ({
      isRunning: false,
      timeLeftMs: durationMinutesFor(s.options, s.phase) * MS_PER_MINUTE,
    })),
  skip: () =>
    set((s) => {
      const next = computeNextSlot(s.options, s.phase, s.currentRound);
      return {
        phase: next.phase,
        currentRound: next.round,
        timeLeftMs: durationMinutesFor(s.options, next.phase) * MS_PER_MINUTE,
        isRunning: false,
      };
    }),
  tick: (deltaMs) =>
    set((s) => {
      const remaining = s.timeLeftMs - deltaMs;
      if (remaining > 0) {
        return { timeLeftMs: remaining };
      }

      const next = computeNextSlot(s.options, s.phase, s.currentRound);
      return {
        phase: next.phase,
        currentRound: next.round,
        timeLeftMs: durationMinutesFor(s.options, next.phase) * MS_PER_MINUTE,
        isRunning: s.options.autoStart,
      };
    }),
}));
