export type Streak = { current: number; longest: number; lastActiveDay: string | null };

export type ProgressRange = "day" | "week";
export type ProgressResponse = {
  range: ProgressRange;
  totalSeconds: number;
  series: Array<{ day: string; totalSeconds: number }>;
};

export type LogFocusInput = {
  durationSeconds: number;
  startedAt: string;
  endedAt: string;
};
