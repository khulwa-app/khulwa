import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/http";
import type { ProgressRange, ProgressResponse } from "./progress.types";

export function useProgress(range: ProgressRange = "day") {
  return useQuery({
    queryKey: ["progress", range],
    queryFn: () => api.get<ProgressResponse>(`/progress?range=${range}`),
  });
}
