"use client";

import { Logo } from "@/components/ui";
import { LoginForm } from "./login-form";

export function LoginScreen() {
  return (
    <main className="khulwa-foundation grid min-h-dvh place-items-center bg-base-200 px-4 py-8" data-theme="khulwa">
      <section className="w-full max-w-md rounded-shell border border-sage-300 bg-base-100 p-6 sm:p-10">
        <div className="flex justify-center"><Logo href={null} size="9" /></div>
        <div className="mt-10"><LoginForm /></div>
      </section>
    </main>
  );
}
