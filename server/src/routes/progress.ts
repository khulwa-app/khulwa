import { Router } from "express";
import { and, eq, gte } from "drizzle-orm";
import { db } from "../db/index.js";
import { dailyCategoryTotal, streak } from "../db/schema/focus.js";
import type { Category } from "../services/tracking.js";

function toDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return toDay(d);
}

export const streakRouter = Router();

streakRouter.get("/", async (req, res) => {
  const userId = req.user!.id;
  const [row] = await db.select().from(streak).where(eq(streak.userId, userId));
  res.json({
    current: row?.current ?? 0,
    longest: row?.longest ?? 0,
    lastActiveDay: row?.lastActiveDay ?? null,
  });
});

export const progressRouter = Router();

progressRouter.get("/", async (req, res) => {
  const userId = req.user!.id;
  const range = req.query.range === "week" ? "week" : "day";
  const since = range === "week" ? daysAgo(6) : toDay(new Date());

  const rows = await db
    .select({
      day: dailyCategoryTotal.day,
      category: dailyCategoryTotal.category,
      totalSeconds: dailyCategoryTotal.totalSeconds,
    })
    .from(dailyCategoryTotal)
    .where(and(eq(dailyCategoryTotal.userId, userId), gte(dailyCategoryTotal.day, since)));

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

  res.json({ range, totals, series });
});
