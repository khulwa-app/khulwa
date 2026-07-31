import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/http";
import { Logger } from "@/lib/logger";
import { progressKeys } from "./progress.keys";
import type { LogFocusInput, LogFocusResponse } from "./progress.types";

export function useLogFocusSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: LogFocusInput) => api.post<LogFocusResponse>("/focus-sessions", input),
    // A completed session is the one piece of data the user cannot recreate, so retry harder than
    // the client default before giving up and telling them.
    retry: 2,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: progressKeys.all });
      void qc.invalidateQueries({ queryKey: progressKeys.streak() });
    },
    onError: (error) => Logger.error(error, { scope: "logFocusSession" }),
  });
}
