import { Suspense } from "react";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from "@/components/ui";
import { Dock } from "@/modules/dock";
import { FloatingTimer } from "@/modules/pomodoro";
import { SoundsEngine } from "@/modules/sounds";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("khulwa.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box position="relative" minHeight="100vh" overflow="hidden">
      <Navbar />
      <Suspense fallback={null}>
        {children}
        <Dock />
        <FloatingTimer />
        <SoundsEngine />
      </Suspense>
    </Box>
  );
}
