"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/button";
import { Logger } from "@/lib/logger";

export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("errors");

  useEffect(() => {
    Logger.error(error, { digest: error.digest });
  }, [error]);

  return (
    <main className="bg-environment flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="max-w-sm text-sm text-foreground-muted">{t("body")}</p>
      </div>
      <Button onClick={reset}>
        <RotateCcw />
        {t("retry")}
      </Button>
    </main>
  );
}
