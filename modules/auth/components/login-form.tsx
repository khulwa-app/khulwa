"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { cn } from "@/lib/utils";
import { signIn, signUp } from "@/services/auth";
import { Logger } from "@/lib/logger";
import { toast } from "@/lib/toast";

type Mode = "signin" | "signup";

export function LoginForm() {
  const t = useTranslations("login.form");
  const tApi = useTranslations("apiErrors");
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const isBusy = loading || googleLoading;

  const enter = () => {
    router.push("/app");
    router.refresh();
  };

  const onGoogle = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/app" });
    } catch (err) {
      Logger.error(err, { scope: "signIn.social" });
      setError(tApi("network"));
    } finally {
      setGoogleLoading(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isBusy) return;
    setError(null);
    setLoading(true);
    try {
      const res =
        mode === "signin"
          ? await signIn.email({ email, password })
          : await signUp.email({ email, password, name: name || email.split("@")[0] });

      if (!res.error) {
        toast.success(t(mode === "signin" ? "welcomeBack" : "accountCreated"));
        enter();
        return;
      }

      // Better Auth returns a code rather than throwing; it maps onto the same apiErrors namespace
      // the route handlers use, falling back to generic when it is one we have no copy for.
      const code = res.error.code?.toLowerCase() ?? "generic";
      setError(tApi.has(code) ? tApi(code) : t("errors.generic"));
    } catch (err) {
      Logger.error(err, { scope: mode === "signin" ? "signIn.email" : "signUp.email" });
      setError(tApi("network"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">
          {mode === "signin" ? t("title") : t("signupTitle")}
        </h2>
        <p className="text-sm leading-6 text-foreground-muted">
          {mode === "signin" ? t("subtitle") : t("signupSubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 rounded-full border border-hairline bg-canvas p-1">
        {(["signin", "signup"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setError(null);
              setMode(option);
            }}
            className={cn(
              "h-9 rounded-full text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              mode === option ? "bg-primary text-primary-foreground" : "text-foreground-muted hover:text-foreground",
            )}
          >
            {t(`switch.${option}`)}
          </button>
        ))}
      </div>

      <Button
        variant="secondary"
        size="lg"
        shape="rounded"
        onClick={onGoogle}
        disabled={isBusy}
        className="h-12 w-full border border-hairline bg-surface-elevated text-foreground hover:bg-surface-interactive"
      >
        {googleLoading ? (
          <Loader2 className="animate-spin motion-reduce:animate-none" />
        ) : (
          <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
            G
          </span>
        )}
        {t("continueWithGoogle")}
      </Button>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-foreground-muted uppercase">{t("divider")}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4" aria-busy={loading}>
        {mode === "signup" ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="login-name" className="text-sm font-semibold">
              {t("fields.name")}
            </label>
            <Input
              id="login-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("placeholders.name")}
              autoComplete="name"
              required
              variant="filled"
              className="h-12 bg-surface-elevated"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-2">
          <label htmlFor="login-email" className="text-sm font-semibold">
            {t("fields.email")}
          </label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholders.email")}
            autoComplete="email"
            required
            variant="filled"
            className="h-12 bg-surface-elevated"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="login-password" className="text-sm font-semibold">
            {t("fields.password")}
          </label>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              minLength={8}
              placeholder={t("placeholders.password")}
              required
              variant="filled"
              className="h-12 bg-surface-elevated pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={t(showPassword ? "hidePassword" : "showPassword")}
              className="absolute inset-y-0 right-1 flex w-11 items-center justify-center rounded-full text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm leading-5 text-destructive"
          >
            {error}
          </p>
        ) : null}

        <Button type="submit" size="lg" shape="rounded" disabled={isBusy} className="mt-1 h-12 w-full font-semibold">
          {loading ? <Loader2 className="animate-spin motion-reduce:animate-none" /> : null}
          {loading ? t("submitting") : mode === "signin" ? t("submit") : t("signupSubmit")}
        </Button>
      </form>

      <div className="flex items-center justify-center gap-2 rounded-2xl border border-hairline bg-canvas/70 px-4 py-3 text-xs leading-5 text-foreground-muted">
        <ShieldCheck className="size-4 text-primary" />
        <span>{t("privateNote")}</span>
      </div>
    </div>
  );
}
