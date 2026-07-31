import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Flame, Headphones, Target } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Logo } from "@/components/ui/logo";
import { Routes } from "@/constants";

const FEATURES = [
  { icon: Target, key: "0" },
  { icon: Headphones, key: "1" },
  { icon: Flame, key: "2" },
] as const;

export function Landing() {
  const t = useTranslations("landing");

  return (
    <div className="bg-environment relative min-h-dvh overflow-hidden">
      <header className="relative z-1 flex items-center justify-between px-5 py-5 md:px-10">
        <Logo href={Routes.Landing} />
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <NextLink href={Routes.Login}>{t("nav.signIn")}</NextLink>
          </Button>
          <Button asChild size="sm">
            <NextLink href={Routes.Login}>{t("nav.getStarted")}</NextLink>
          </Button>
        </div>
      </header>

      <section className="relative z-1 mx-auto flex max-w-2xl flex-col items-center gap-7 px-6 pt-16 text-center md:pt-24">
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-ring uppercase">{t("hero.eyebrow")}</p>
          <h1 className="max-w-xl text-4xl font-bold tracking-tight md:text-5xl">{t("hero.headline")}</h1>
          <p className="max-w-lg text-base text-foreground-secondary">{t("hero.subcopy")}</p>
        </div>

        <Button asChild size="lg">
          <NextLink href={Routes.Login}>
            {t("hero.cta")}
            <ArrowRight />
          </NextLink>
        </Button>
      </section>

      <section className="relative z-1 mx-auto grid max-w-4xl gap-5 px-6 py-16 md:grid-cols-3 md:py-24">
        {FEATURES.map(({ icon: Icon, key }) => (
          <article key={key} className="flex flex-col items-start gap-3 rounded-xl border border-hairline bg-surface p-6">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-ring">
              <Icon className="size-5" />
            </span>
            <h2 className="text-base font-semibold">{t(`features.${key}.title`)}</h2>
            <p className="text-sm text-foreground-muted">{t(`features.${key}.body`)}</p>
          </article>
        ))}
      </section>

      <p className="relative z-1 pb-10 text-center text-sm text-foreground-muted">{t("quote.text")}</p>
    </div>
  );
}
