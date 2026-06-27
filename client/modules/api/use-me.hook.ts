import { useQuery } from "@tanstack/react-query";
import { api } from "./fetcher";

export type Me = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => api.get<{ user: Me }>("/me").then((res) => res.user),
  });
}
