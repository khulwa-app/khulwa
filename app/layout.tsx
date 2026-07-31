import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import "./globals.css";
import { fontVariables } from "./fonts";
import { Locale } from "@/i18n/config";
import { Toaster } from "@/components/shadcn/sonner";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080b0a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={Locale.EN} dir="ltr" className={fontVariables} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          {children}
          <Toaster position="bottom-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
