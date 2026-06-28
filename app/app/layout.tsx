import { Suspense } from "react";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import { QueryProvider, SessionProvider } from "@/components/providers";
import { makeQueryClient } from "@/services/query";
import { TASKS_QUERY_KEY } from "@/services/query/constants";
import { getServerSession } from "@/lib/api/auth";
import { getTasks } from "@/lib/services/tasks.read";
import { Navbar } from "@/components/ui";
import { CommandHint, CommandPalette } from "@/modules/command-palette";
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
  // One server-side session read, shared by the task prefetch and the SessionProvider.
  const session = await getServerSession();
  const user = session?.user ?? null;

  const queryClient = makeQueryClient();
  if (user) {
    try {
      await queryClient.prefetchQuery({
        queryKey: [TASKS_QUERY_KEY],
        queryFn: () => getTasks(user.id),
      });
    } catch {
      // Fall back to the client-side fetch if the SSR prefetch fails.
    }
  }

  return (
    <QueryProvider>
      <SessionProvider user={user ? { id: user.id, name: user.name, email: user.email, image: user.image } : null}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Box position="relative" minHeight="100dvh" overflow="hidden">
            <Navbar />
            <Suspense fallback={null}>
              {children}
              <GlobalShortcuts />
              <CommandPalette />
              <CommandHint />
              <Dock />
              <FloatingTimer />
              <SoundsEngine />
            </Suspense>
          </Box>
        </HydrationBoundary>
      </SessionProvider>
    </QueryProvider>
  );
}
