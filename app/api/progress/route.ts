import { and, eq, gte } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyCategoryTotal } from "@/lib/db/schema/focus";
import type { Category } from "@/lib/services/tracking";
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
      day: dailyCategoryTotal.day,
      category: dailyCategoryTotal.category,
      totalSeconds: dailyCategoryTotal.totalSeconds,
    })
    .from(dailyCategoryTotal)
    .where(and(eq(dailyCategoryTotal.userId, user.id), gte(dailyCategoryTotal.day, since)));

  const totals: Partial<Record<Category, number>> = {};
  const seriesMap = new Map<string, Partial<Record<Category, number>>>();
  for (const r of rows) {
    totals[r.category] = (totals[r.category] ?? 0) + r.totalSeconds;
    const bucket = seriesMap.get(r.day) ?? {};
    bucket[r.category] = r.totalSeconds;
    seriesMap.set(r.day, bucket);
  }

  const series = [...seriesMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, cats]) => ({ day, ...cats }));

  return json({ range, totals, series });
});
