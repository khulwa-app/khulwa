import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import type { LogFocusInput, Streak } from "./progress.types";

export function useLogFocusSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: LogFocusInput) =>
      api.post<{ streak: Streak; totalSeconds: number }>("/focus-sessions", input),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["progress"] });
      void qc.invalidateQueries({ queryKey: ["streak"] });
    },
  });
}
