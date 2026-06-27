import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/http";
import type { Me } from "./auth.types";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => api.get<{ user: Me }>("/me").then((res) => res.user),
  });
}
