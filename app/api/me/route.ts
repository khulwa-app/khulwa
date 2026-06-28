import { requireUser } from "@/lib/api/auth";
import { json, route } from "@/lib/api/http";

export const GET = route(async () => {
  const user = await requireUser();
  return json({ user });
});
