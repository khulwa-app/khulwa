import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env, isProd } from "@/lib/env";
import * as schema from "./schema";

// Reuse one pool across dev hot-reloads to avoid exhausting Postgres connections.
const globalForDb = globalThis as unknown as { __khulwaPg?: ReturnType<typeof postgres> };

const queryClient =
  globalForDb.__khulwaPg ??
  postgres(env.databaseUrl, {
    max: 10,
    idle_timeout: 20,
  });

if (!isProd) globalForDb.__khulwaPg = queryClient;

export const db = drizzle(queryClient, { schema });
export type DB = typeof db;
export { schema };
