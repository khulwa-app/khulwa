export type CategoryId = "deepWork" | "learning" | "reading" | "dhikr";

export type Streak = { current: number; longest: number; lastActiveDay: string | null };

export type ProgressRange = "day" | "week";
export type ProgressTotals = Partial<Record<CategoryId, number>>;
export type ProgressResponse = {
  range: ProgressRange;
  totals: ProgressTotals;
  series: Array<{ day: string } & ProgressTotals>;
};

export type LogFocusInput = {
  taskId?: string | null;
  category: CategoryId | null;
  durationSeconds: number;
  startedAt: string;
  endedAt: string;
};
