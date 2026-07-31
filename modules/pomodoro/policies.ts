import type { PomodoroPhase } from "./types";

export function isFocusPhase(phase: PomodoroPhase | null): boolean {
  return phase === "focus";
}

export function canResetPomodoro(phase: PomodoroPhase): boolean {
  return isFocusPhase(phase);
}

export function shouldResumePomodoro(phase: PomodoroPhase, hasStarted: boolean): boolean {
  return !isFocusPhase(phase) || hasStarted;
}
