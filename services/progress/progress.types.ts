export type Streak = { current: number; longest: number; lastActiveDay: string | null };

export type ProgressRange = "day" | "week";
export type ProgressSeriesPoint = {
  day: string;
  focusSeconds: number;
  sessions: number;
};

export type ProgressTotals = {
  focusSeconds: number;
  sessions: number;
  averageSessionSeconds: number;
};

export type RecentFocusSession = {
  id: string;
  durationSeconds: number;
  startedAt: string;
  endedAt: string;
};

export type ProgressResponse = {
  range: ProgressRange;
  totals: ProgressTotals;
  series: ProgressSeriesPoint[];
  recentSessions: RecentFocusSession[];
};

export type LogFocusInput = {
  durationSeconds: number;
  startedAt: string;
  endedAt: string;
};

export type LogFocusResponse = {
  streak: Streak;
};
