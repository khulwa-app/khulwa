import { Router } from "express";
import { db } from "../db/index.js";
import { parseBody } from "../lib/validate.js";
import {
  createStepSchema,
  createTaskSchema,
  updateStepSchema,
  updateTaskSchema,
} from "../validation/task.schema.js";
import * as tasks from "../services/tasks.service.js";

export const tasksRouter = Router();

tasksRouter.get("/", async (req, res) => {
  res.json(await tasks.listTasks(db, req.user!.id));
});

tasksRouter.post("/", async (req, res) => {
  const input = parseBody(req, res, createTaskSchema);
  if (!input) return;
  res.status(201).json(await tasks.createTask(db, req.user!.id, input));
});

tasksRouter.patch("/:id", async (req, res) => {
  const input = parseBody(req, res, updateTaskSchema);
  if (!input) return;
  const row = await tasks.updateTask(db, req.user!.id, req.params.id, input);
  if (!row) {
    res.status(404).json({ error: "not_found" });
    return;
  }
  res.json(row);
});

tasksRouter.delete("/:id", async (req, res) => {
  const row = await tasks.deleteTask(db, req.user!.id, req.params.id);
  if (!row) {
    res.status(404).json({ error: "not_found" });
    return;
  }
  res.status(204).end();
});

tasksRouter.post("/:id/steps", async (req, res) => {
  const input = parseBody(req, res, createStepSchema);
  if (!input) return;
  const row = await tasks.addStep(db, req.user!.id, req.params.id, input);
  if (!row) {
    res.status(404).json({ error: "not_found" });
    return;
  }
  res.status(201).json(row);
});

export const stepsRouter = Router();

stepsRouter.patch("/:id", async (req, res) => {
  const input = parseBody(req, res, updateStepSchema);
  if (!input) return;
  const row = await tasks.updateStep(db, req.user!.id, req.params.id, input);
  if (!row) {
    res.status(404).json({ error: "not_found" });
    return;
  }
  res.json(row);
});

stepsRouter.delete("/:id", async (req, res) => {
  const row = await tasks.deleteStep(db, req.user!.id, req.params.id);
  if (!row) {
    res.status(404).json({ error: "not_found" });
    return;
  }
  res.status(204).end();
});
