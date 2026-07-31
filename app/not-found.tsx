import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/button";
import { Routes } from "@/constants";

export default function NotFound() {
  const t = useTranslations("errors");

  return (
    <main className="bg-environment flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{t("notFoundTitle")}</h1>
        <p className="max-w-sm text-sm text-foreground-muted">{t("notFoundBody")}</p>
      </div>
      <Button asChild>
        <NextLink href={Routes.Home}>{t("backHome")}</NextLink>
      </Button>
    </main>
  );
}
