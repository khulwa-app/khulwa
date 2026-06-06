import type { PomodoroOptions } from "../types";

export const DEFAULT_POMODORO: PomodoroOptions = {
  focusMinutes: 30,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  rounds: 4,
  autoStart: true,
};
