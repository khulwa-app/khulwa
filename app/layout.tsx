import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import "./globals.css";
import { fontVariables } from "./fonts";
import { Locale } from "@/i18n/config";
import { Toaster } from "@/components/shadcn/sonner";

const metadataBase = (() => {
  try {
    return new URL(process.env.BETTER_AUTH_URL ?? "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
})();

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home.metadata");
  const title = t("title");
  const description = t("description");

  return {
    metadataBase,
    applicationName: title,
    title: {
      default: title,
      template: `%s · ${title}`,
    },
    description,
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
      apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      title,
      description,
      url: "/",
      siteName: title,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
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
