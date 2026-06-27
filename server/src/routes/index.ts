import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.js";

export const apiRouter = Router();

apiRouter.use(requireAuth);

apiRouter.get("/me", (req, res) => {
  res.json({ user: req.user });
});
