import { eq, sql } from "drizzle-orm";
import type { DB } from "../db";
import { dailyCategoryTotal, focusSession, streak } from "../db/schema/focus";

type Tx = Parameters<Parameters<DB["transaction"]>[0]>[0];

export type Category = (typeof focusSession.category.enumValues)[number];

export const CATEGORIES = focusSession.category.enumValues;

export type FocusSessionInput = {
  userId: string;
  legacyCategory?: Category | null;
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
      category: input.legacyCategory ?? null,
      durationSeconds: input.durationSeconds,
      startedAt: input.startedAt,
      endedAt: input.endedAt,
    });

    // Keep the legacy aggregate current for legacy writers during the expand
    // window. New clients omit category and rely only on focus_session reads.
    if (input.legacyCategory) {
      await tx
        .insert(dailyCategoryTotal)
        .values({
          userId: input.userId,
          day,
          category: input.legacyCategory,
          totalSeconds: input.durationSeconds,
        })
        .onConflictDoUpdate({
          target: [dailyCategoryTotal.userId, dailyCategoryTotal.day, dailyCategoryTotal.category],
          set: {
            totalSeconds: sql`${dailyCategoryTotal.totalSeconds} + ${input.durationSeconds}`,
            updatedAt: new Date(),
          },
        });
    }

    const streakRow = await recomputeStreak(tx, input.userId, day);
    return { streak: streakRow };
  });
}
