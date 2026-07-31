import { QueryCache, MutationCache, QueryClient } from "@tanstack/react-query";
import { isUnauthorized } from "@/services/http";
import { Logger } from "@/lib/logger";
import { Routes } from "@/constants";

/**
 * A 401 means the session expired mid-visit. Without this it surfaces as a broken panel rather
 * than a prompt to sign in again. Handled once here so no individual hook has to remember.
 */
function handleError(error: unknown) {
  if (!isUnauthorized(error)) return;
  if (typeof window === "undefined") return;
  if (window.location.pathname === Routes.Login) return;
  window.location.assign(Routes.Login);
}

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        // An expired session will never succeed on retry; fail fast so the redirect happens.
        retry: (failureCount, error) => !isUnauthorized(error) && failureCount < 1,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        Logger.error(error, { scope: "query", key: query.queryKey });
        handleError(error);
      },
    }),
    mutationCache: new MutationCache({ onError: handleError }),
  });
}
