"use client";

import { createAuthClient } from "better-auth/react";
import type { Auth } from "@/lib/auth";

type AuthOptions = Auth extends { options: infer Options } ? Options : never;

export const authClient = createAuthClient({
  $InferAuth: {} as AuthOptions,
});

export const { signIn, signUp, signOut, useSession } = authClient;
