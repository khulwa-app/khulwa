import { createApp } from "./app.js";
import { env } from "./env.js";

const app = createApp();

const server = app.listen(env.port, () => {
  console.log(`focus-den backend listening on http://localhost:${env.port}`);
});

const shutdown = (signal: string) => {
  console.log(`\nReceived ${signal}, shutting down...`);
  server.close(() => process.exit(0));
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
