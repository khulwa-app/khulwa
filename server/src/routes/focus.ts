import { Router } from "express";
import { db } from "../db/index.js";
import { CATEGORIES, recordFocusSession, type Category } from "../services/tracking.js";

export const focusRouter = Router();

focusRouter.post("/", async (req, res) => {
  const userId = req.user!.id;
  const { taskId, category, durationSeconds, startedAt, endedAt } = req.body ?? {};

  if (typeof durationSeconds !== "number" || !Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    res.status(400).json({ error: "invalid_duration" });
    return;
  }
  if (category != null && !CATEGORIES.includes(category)) {
    res.status(400).json({ error: "invalid_category" });
    return;
  }
  const started = new Date(startedAt);
  const ended = new Date(endedAt);
  if (Number.isNaN(started.getTime()) || Number.isNaN(ended.getTime())) {
    res.status(400).json({ error: "invalid_dates" });
    return;
  }

  const result = await recordFocusSession(db, {
    userId,
    taskId: typeof taskId === "string" ? taskId : null,
    category: (category ?? null) as Category | null,
    durationSeconds: Math.round(durationSeconds),
    startedAt: started,
    endedAt: ended,
  });

  res.status(201).json(result);
});
