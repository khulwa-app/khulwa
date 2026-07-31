import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import type { LogFocusInput, LogFocusResponse } from "./progress.types";

export function useLogFocusSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: LogFocusInput) => api.post<LogFocusResponse>("/focus-sessions", input),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["progress"] });
      void qc.invalidateQueries({ queryKey: ["streak"] });
    },
  });
}
