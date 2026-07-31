import { and, desc, eq, gt, gte, lt, sql } from "drizzle-orm";
import type { DB } from "../db";
import { focusSession } from "../db/schema/focus";
import type {
  ProgressRange,
  ProgressResponse,
  ProgressSeriesPoint,
  RecentFocusSession,
} from "../../services/progress/progress.types";

export type ProgressWindow = {
  start: Date;
  endExclusive: Date;
  dayCount: 1 | 7;
};

export type ProgressAggregateRow = {
  day: string;
  focusSeconds: number;
  sessions: number;
};

export type ProgressRecentRow = {
  id: string;
  durationSeconds: number;
  startedAt: Date;
  endedAt: Date;
};

type ProgressDatabase = Pick<DB, "select">;

function toUtcDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function createProgressWindow(range: ProgressRange, now: Date = new Date()): ProgressWindow {
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const dayCount = range === "week" ? 7 : 1;
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - (dayCount - 1));
  const endExclusive = new Date(today);
  endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);
  return { start, endExclusive, dayCount };
}

function progressSessionPredicate(userId: string, window: ProgressWindow) {
  return and(
    eq(focusSession.userId, userId),
    gte(focusSession.endedAt, window.start),
    lt(focusSession.endedAt, window.endExclusive),
    gt(focusSession.durationSeconds, 0),
    sql`${focusSession.endedAt} >= ${focusSession.startedAt}`,
  );
}

export function buildProgressAggregateQuery(database: ProgressDatabase, userId: string, window: ProgressWindow) {
  const utcDay = sql<string>`to_char(${focusSession.endedAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`;

  return database
    .select({
      day: utcDay,
      focusSeconds: sql<number>`coalesce(sum(${focusSession.durationSeconds}), 0)`.mapWith(Number),
      sessions: sql<number>`count(*)`.mapWith(Number),
    })
    .from(focusSession)
    .where(progressSessionPredicate(userId, window))
    .groupBy(utcDay)
    .orderBy(utcDay);
}

export function buildRecentFocusSessionsQuery(database: ProgressDatabase, userId: string, window: ProgressWindow) {
  return database
    .select({
      id: focusSession.id,
      durationSeconds: focusSession.durationSeconds,
      startedAt: focusSession.startedAt,
      endedAt: focusSession.endedAt,
    })
    .from(focusSession)
    .where(progressSessionPredicate(userId, window))
    .orderBy(desc(focusSession.endedAt))
    .limit(10);
}

function isValidAggregateRow(
  row: ProgressAggregateRow,
  seriesByDay: Map<string, ProgressSeriesPoint>,
): row is ProgressAggregateRow {
  return (
    seriesByDay.has(row.day) &&
    Number.isSafeInteger(row.focusSeconds) &&
    row.focusSeconds > 0 &&
    Number.isSafeInteger(row.sessions) &&
    row.sessions > 0
  );
}

function isValidRecentRow(row: ProgressRecentRow, window: ProgressWindow): boolean {
  return (
    typeof row.id === "string" &&
    Number.isSafeInteger(row.durationSeconds) &&
    row.durationSeconds > 0 &&
    row.startedAt instanceof Date &&
    row.endedAt instanceof Date &&
    Number.isFinite(row.startedAt.getTime()) &&
    Number.isFinite(row.endedAt.getTime()) &&
    row.endedAt >= row.startedAt &&
    row.endedAt >= window.start &&
    row.endedAt < window.endExclusive
  );
}

export function createProgressResponse(
  range: ProgressRange,
  window: ProgressWindow,
  aggregateRows: ProgressAggregateRow[],
  recentRows: ProgressRecentRow[],
): ProgressResponse {
  const seriesByDay = new Map<string, ProgressSeriesPoint>();
  for (let index = 0; index < window.dayCount; index += 1) {
    const date = new Date(window.start);
    date.setUTCDate(date.getUTCDate() + index);
    const day = toUtcDay(date);
    seriesByDay.set(day, { day, focusSeconds: 0, sessions: 0 });
  }

  for (const row of aggregateRows) {
    if (!isValidAggregateRow(row, seriesByDay)) continue;
    seriesByDay.set(row.day, {
      day: row.day,
      focusSeconds: row.focusSeconds,
      sessions: row.sessions,
    });
  }

  const series = [...seriesByDay.values()];
  const focusSeconds = series.reduce((sum, point) => sum + point.focusSeconds, 0);
  const sessions = series.reduce((sum, point) => sum + point.sessions, 0);
  const averageSessionSeconds = sessions === 0 ? 0 : Math.round(focusSeconds / sessions);
  const recentSessions: RecentFocusSession[] = recentRows
    .filter((row) => isValidRecentRow(row, window))
    .slice(0, 10)
    .map((row) => ({
      id: row.id,
      durationSeconds: row.durationSeconds,
      startedAt: row.startedAt.toISOString(),
      endedAt: row.endedAt.toISOString(),
    }));

  return {
    range,
    totals: { focusSeconds, sessions, averageSessionSeconds },
    series,
    recentSessions,
  };
}
