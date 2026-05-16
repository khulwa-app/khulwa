import { Navbar } from "@/components/ui";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box position="relative" minHeight="100vh" overflow="hidden">
      <Navbar />
      <Box>{children}</Box>
      {/* // TODO: Dock  */}
    </Box>
  );
}
