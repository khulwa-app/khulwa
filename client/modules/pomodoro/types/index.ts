export enum PomodoroPhase {
  Focus = "focus",
  ShortBreak = "shortBreak",
  LongBreak = "longBreak",
}

export type PomodoroOptions = {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  rounds: number;
  autoStart: boolean;
};
