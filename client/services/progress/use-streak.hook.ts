import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/http";
import type { Streak } from "./progress.types";

export function useStreak() {
  return useQuery({ queryKey: ["streak"], queryFn: () => api.get<Streak>("/streak") });
}
