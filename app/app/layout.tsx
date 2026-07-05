import { Suspense } from "react";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { QueryProvider, SessionProvider } from "@/components/providers";
import { getServerSession } from "@/lib/api/auth";
import { Navbar } from "@/components/ui";
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
  // Server-side session read seeds the SessionProvider (real name in the greeting, no flash).
  const session = await getServerSession();
  const user = session?.user ?? null;

  return (
    <QueryProvider>
      <SessionProvider user={user ? { id: user.id, name: user.name, email: user.email, image: user.image } : null}>
        <Box position="relative" minHeight="100dvh" overflow="hidden">
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
        </Box>
      </SessionProvider>
    </QueryProvider>
  );
}
