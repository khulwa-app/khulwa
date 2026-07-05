"use client";

import { createContext, useContext, type ReactNode } from "react";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
} | null;

const UserContext = createContext<SessionUser>(null);

/** Seeds the current user from the server so UI can render it on first paint (no flash). */
export function SessionProvider({ user, children }: { user: SessionUser; children: ReactNode }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser(): SessionUser {
  return useContext(UserContext);
}
