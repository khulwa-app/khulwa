import { Logo } from "@/components/ui/logo";
import { useTranslations } from "next-intl";
import { LoginForm } from "./login-form";

export function LoginScreen() {
  const t = useTranslations("login.screen");

  return (
    <main className="bg-environment relative min-h-dvh overflow-hidden px-5 py-6 text-foreground sm:px-8 lg:px-12">
      <div className="relative z-1 mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <Logo href={null} className="text-lg" />
          <p className="hidden text-xs font-medium tracking-[0.18em] text-foreground-muted uppercase sm:block">
            {t("eyebrow")}
          </p>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16 lg:py-10">
          <section className="hidden max-w-2xl flex-col gap-8 lg:flex">
            <div className="space-y-5">
              <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">{t("kicker")}</p>
              <h1 className="max-w-[720px] text-5xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance xl:text-6xl">
                {t("headline")}
              </h1>
              <p className="max-w-xl text-base leading-7 text-foreground-secondary">{t("body")}</p>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-3">
              {["tasks", "ambient", "progress"].map((item) => (
                <div key={item} className="rounded-2xl border border-hairline bg-surface-veil p-4 shadow-panel">
                  <p className="text-sm font-semibold">{t(`proof.${item}.title`)}</p>
                  <p className="mt-2 text-xs leading-5 text-foreground-muted">{t(`proof.${item}.body`)}</p>
                </div>
              ))}
            </div>

            <div className="max-w-xl rounded-[1.75rem] border border-hairline bg-surface/70 p-5 shadow-panel">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <p className="text-sm font-semibold">{t("preview.title")}</p>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {t("preview.badge")}
                </span>
              </div>
              <div className="space-y-3 pt-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="flex items-center gap-3 rounded-2xl bg-surface-elevated/70 p-3">
                    <span className="size-2 rounded-full bg-primary" />
                    <span className="h-2 flex-1 rounded-full bg-foreground/10" />
                    <span className="h-2 w-16 rounded-full bg-foreground/10" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto flex w-full max-w-[440px] flex-col gap-5">
            <div className="space-y-2 text-center lg:hidden">
              <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">{t("kicker")}</p>
              <h1 className="text-3xl leading-tight font-semibold tracking-[-0.04em] text-balance">
                {t("mobileHeadline")}
              </h1>
            </div>

            <div className="rounded-[1.75rem] border border-hairline bg-surface-veil p-5 shadow-panel backdrop-blur-sm sm:p-6">
              <LoginForm />
            </div>

            <p className="px-4 text-center text-xs leading-5 text-foreground-muted">{t("security")}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
