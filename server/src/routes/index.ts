import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { focusRouter } from "./focus.js";
import { progressRouter, streakRouter } from "./progress.js";
import { stepsRouter, tasksRouter } from "./tasks.js";
import { notesRouter } from "./notes.js";

export const apiRouter = Router();

apiRouter.use(requireAuth);

apiRouter.get("/me", (req, res) => {
  res.json({ user: req.user });
});

apiRouter.use("/focus-sessions", focusRouter);
apiRouter.use("/streak", streakRouter);
apiRouter.use("/progress", progressRouter);
apiRouter.use("/tasks", tasksRouter);
apiRouter.use("/steps", stepsRouter);
apiRouter.use("/notes", notesRouter);
