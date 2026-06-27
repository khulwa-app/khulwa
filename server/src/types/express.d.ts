import type { auth } from "../auth/index.js";

type AuthSession = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

declare global {
  namespace Express {
    interface Request {
      user?: AuthSession["user"];
      session?: AuthSession["session"];
    }
  }
}

export {};
