import { randomUUID } from "node:crypto";
import { pgTable, pgEnum, text, integer, timestamp, date, unique } from "drizzle-orm/pg-core";
import { user } from "./auth.js";
import { task } from "./task.js";

export const category = pgEnum("category", ["deepWork", "learning", "reading", "dhikr"]);

export const focusSession = pgTable("focus_session", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  taskId: text("task_id").references(() => task.id, { onDelete: "set null" }),
  category: category("category"),
  durationSeconds: integer("duration_seconds").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const dailyCategoryTotal = pgTable(
  "daily_category_total",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    day: date("day").notNull(),
    category: category("category").notNull(),
    totalSeconds: integer("total_seconds").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique("daily_category_total_user_day_category").on(t.userId, t.day, t.category)],
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
