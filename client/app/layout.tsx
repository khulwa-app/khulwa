import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { fontVariables } from "./fonts";
import { AppChakraProvider } from "@/components/providers/chakra-provider";
import { LocaleSync } from "@/i18n/locale-sync";
import { getDirection, type LocaleType } from "@/i18n/config";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await getLocale()) as LocaleType;
  const messages = await getMessages();

  return (
    <html lang={locale} dir={getDirection(locale)} className={fontVariables}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppChakraProvider>
            <LocaleSync />
            {children}
          </AppChakraProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
