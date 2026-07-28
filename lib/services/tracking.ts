import { eq, sql } from "drizzle-orm";
import type { DB } from "@/lib/db";
import { dailyFocusTotal, focusSession, streak } from "@/lib/db/schema/focus";

type Tx = Parameters<Parameters<DB["transaction"]>[0]>[0];

export type FocusSessionInput = {
  userId: string;
  durationSeconds: number;
  startedAt: Date;
  endedAt: Date;
};

function toDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function dayDiff(from: string, to: string): number {
  return Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
}

export async function recomputeStreak(tx: Tx, userId: string, activeDay: string) {
  const [existing] = await tx.select().from(streak).where(eq(streak.userId, userId));

  if (existing?.lastActiveDay === activeDay) return existing;

  let current = 1;
  if (existing?.lastActiveDay && dayDiff(existing.lastActiveDay, activeDay) === 1) {
    current = existing.current + 1;
  }
  const longest = Math.max(existing?.longest ?? 0, current);

  const [row] = await tx
    .insert(streak)
    .values({ userId, current, longest, lastActiveDay: activeDay })
    .onConflictDoUpdate({
      target: streak.userId,
      set: { current, longest, lastActiveDay: activeDay, updatedAt: new Date() },
    })
    .returning();
  return row;
}

export async function recordFocusSession(db: DB, input: FocusSessionInput) {
  const day = toDay(input.endedAt);

  return db.transaction(async (tx) => {
    await tx.insert(focusSession).values({
      userId: input.userId,
      durationSeconds: input.durationSeconds,
      startedAt: input.startedAt,
      endedAt: input.endedAt,
    });

    const [dailyTotal] = await tx
      .insert(dailyFocusTotal)
      .values({
        userId: input.userId,
        day,
        totalSeconds: input.durationSeconds,
      })
      .onConflictDoUpdate({
        target: [dailyFocusTotal.userId, dailyFocusTotal.day],
        set: {
          totalSeconds: sql`${dailyFocusTotal.totalSeconds} + ${input.durationSeconds}`,
          updatedAt: new Date(),
        },
      })
      .returning({ totalSeconds: dailyFocusTotal.totalSeconds });

    const streakRow = await recomputeStreak(tx, input.userId, day);

    return { streak: streakRow, totalSeconds: dailyTotal.totalSeconds };
  });
}
