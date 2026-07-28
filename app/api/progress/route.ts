import { and, eq, gte } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyFocusTotal } from "@/lib/db/schema/focus";
import { requireUser } from "@/lib/api/auth";
import { json, route } from "@/lib/api/http";

function toDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return toDay(d);
}

export const GET = route(async (req) => {
  const user = await requireUser();
  const range = new URL(req.url).searchParams.get("range") === "week" ? "week" : "day";
  const since = range === "week" ? daysAgo(6) : toDay(new Date());

  const rows = await db
    .select({
      day: dailyFocusTotal.day,
      totalSeconds: dailyFocusTotal.totalSeconds,
    })
    .from(dailyFocusTotal)
    .where(and(eq(dailyFocusTotal.userId, user.id), gte(dailyFocusTotal.day, since)));

  const totalSeconds = rows.reduce((sum, row) => sum + row.totalSeconds, 0);

  const series = rows
    .map((row) => ({ day: row.day, totalSeconds: row.totalSeconds }))
    .sort((a, b) => a.day.localeCompare(b.day));

  return json({ range, totalSeconds, series });
});
