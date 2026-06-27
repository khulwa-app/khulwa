import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { fontVariables } from "./fonts";
import { AppChakraProvider } from "@/components/providers/chakra-provider";
import { Locale } from "@/i18n/config";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.metadata");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={Locale.EN} dir="ltr" className={fontVariables} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <AppChakraProvider>{children}</AppChakraProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
