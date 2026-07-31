import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Routes } from "@/constants";
import { QueryProvider, SessionProvider } from "@/components/providers";
import { getServerSession } from "@/lib/api/auth";
import { Navbar } from "@/components/ui/navbar";
import { StreakBadge } from "@/modules/progress";
import { CommandPalette } from "@/modules/command-palette";
import { Dock } from "@/modules/dock";
import { FloatingTimer } from "@/modules/pomodoro";
import { GlobalShortcuts } from "@/modules/shortcuts";
import { SoundsEngine } from "@/modules/sounds";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("khulwa.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // This is the real gate for /app. `proxy.ts` only checks that a session cookie is present, which
  // an expired or forged one also satisfies; this validates it. It also seeds the SessionProvider
  // so the greeting renders the real name without a flash.
  const session = await getServerSession();
  if (!session) redirect(Routes.Login);
  const user = session.user;

  return (
    <QueryProvider>
      <SessionProvider user={{ id: user.id, name: user.name, email: user.email, image: user.image }}>
        <div className="relative min-h-dvh overflow-hidden">
          <Navbar>
            <StreakBadge />
          </Navbar>
          <Suspense fallback={null}>
            {children}
            <GlobalShortcuts />
            <CommandPalette />
            <Dock />
            <FloatingTimer />
            <SoundsEngine />
          </Suspense>
        </div>
      </SessionProvider>
    </QueryProvider>
  );
}
