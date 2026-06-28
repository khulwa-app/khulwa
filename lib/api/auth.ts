import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { HttpError } from "./http";

/** Read the better-auth session for the current request (route handlers / RSC). */
export async function getServerSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Return the authenticated user or throw HttpError(401) — the route-handler auth gate. */
export async function requireUser() {
  const session = await getServerSession();
  if (!session) throw new HttpError(401, { error: "unauthorized" });
  return session.user;
}
