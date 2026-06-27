import express, { type Express, type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { env } from "./env.js";
import { auth } from "./auth/index.js";
import { healthRouter } from "./routes/health.js";
import { apiRouter } from "./routes/index.js";

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: true,
    }),
  );

  app.all("/api/auth/*splat", toNodeHandler(auth));

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use("/health", healthRouter);
  app.use("/api", apiRouter);

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Not Found" });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
}
