import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/http";
import type { Task } from "./tasks.types";
import { TASKS_QUERY_KEY } from "../query/constants";

export const DEFAULT_ETA = 15;

export function useTasks() {
  return useQuery({ queryKey: [TASKS_QUERY_KEY], queryFn: () => api.get<Task[]>("/tasks") });
}
