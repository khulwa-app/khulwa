import { randomUUID } from "node:crypto";
import { pgTable, pgEnum, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const priority = pgEnum("priority", ["low", "medium", "high"]);

export const task = pgTable("task", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  completed: boolean("completed").notNull().default(false),
  isDoingNow: boolean("is_doing_now").notNull().default(false),
  eta: integer("eta").notNull().default(30),
  priority: priority("priority").notNull().default("medium"),
  today: boolean("today").notNull().default(false),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const taskStep = pgTable("task_step", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  taskId: text("task_id")
    .notNull()
    .references(() => task.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  completed: boolean("completed").notNull().default(false),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
