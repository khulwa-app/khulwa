import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/http";
import { progressKeys } from "./progress.keys";
import type { Streak } from "./progress.types";

export function useStreak() {
  return useQuery({ queryKey: progressKeys.streak(), queryFn: () => api.get<Streak>("/streak") });
}
