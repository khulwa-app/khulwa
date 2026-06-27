import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { focusRouter } from "./focus.js";
import { progressRouter, streakRouter } from "./progress.js";

export const apiRouter = Router();

apiRouter.use(requireAuth);

apiRouter.get("/me", (req, res) => {
  res.json({ user: req.user });
});

apiRouter.use("/focus-sessions", focusRouter);
apiRouter.use("/streak", streakRouter);
apiRouter.use("/progress", progressRouter);
