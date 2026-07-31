import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/http";
import { progressKeys } from "./progress.keys";
import type { ProgressRange, ProgressResponse } from "./progress.types";

export function useProgress(range: ProgressRange = "day") {
  return useQuery({
    queryKey: progressKeys.range(range),
    queryFn: () => api.get<ProgressResponse>(`/progress?range=${range}`),
  });
}
