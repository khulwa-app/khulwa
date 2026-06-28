import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { streak } from "@/lib/db/schema/focus";
import { requireUser } from "@/lib/api/auth";
import { json, route } from "@/lib/api/http";

export const GET = route(async () => {
  const user = await requireUser();
  const [row] = await db.select().from(streak).where(eq(streak.userId, user.id));
  return json({
    current: row?.current ?? 0,
    longest: row?.longest ?? 0,
    lastActiveDay: row?.lastActiveDay ?? null,
  });
});
