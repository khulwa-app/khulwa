import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { fontVariables } from "./fonts";
import { AppChakraProvider } from "@/components/providers/chakra-provider";
import { LocaleSync } from "@/i18n/locale-sync";
import type { LocaleType } from "@/i18n/config";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = (await getLocale()) as LocaleType;

  return (
    <html lang={locale} dir="ltr" className={`${fontVariables} dark`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <AppChakraProvider>
            <LocaleSync />
            {children}
          </AppChakraProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
