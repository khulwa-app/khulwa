import { randomUUID } from "node:crypto";
import { pgTable, text, integer, timestamp, date, unique } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const focusSession = pgTable("focus_session", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  durationSeconds: integer("duration_seconds").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const dailyFocusTotal = pgTable(
  "daily_focus_total",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    day: date("day").notNull(),
    totalSeconds: integer("total_seconds").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique("daily_focus_total_user_day").on(t.userId, t.day)],
);

export const streak = pgTable("streak", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  current: integer("current").notNull().default(0),
  longest: integer("longest").notNull().default(0),
  lastActiveDay: date("last_active_day"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
