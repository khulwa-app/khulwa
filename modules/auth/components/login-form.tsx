"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
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

  const enter = () => {
    router.push("/app");
    router.refresh();
  };

  const onGoogle = async () => {
    setError(null);
    try {
      await signIn.social({ provider: "google", callbackURL: "/app" });
    } catch (err) {
      Logger.error(err, { scope: "signIn.social" });
      setError(tApi("network"));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-xl font-semibold">{mode === "signin" ? t("title") : t("signupTitle")}</h1>
        <p className="text-sm text-foreground-muted">
          {mode === "signin" ? t("subtitle") : t("signupSubtitle")}
        </p>
      </div>

      <Button variant="secondary" size="lg" shape="rounded" onClick={onGoogle} className="h-11 w-full">
        {t("continueWithGoogle")}
      </Button>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-foreground-muted uppercase">{t("divider")}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        {mode === "signup" ? (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-name" className="text-sm font-medium">
              {t("fields.name")}
            </label>
            <Input
              id="login-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="h-11"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-email" className="text-sm font-medium">
            {t("fields.email")}
          </label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="h-11"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-password" className="text-sm font-medium">
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
              required
              className="h-11 pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={t(showPassword ? "hidePassword" : "showPassword")}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-full text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="lg" shape="rounded" disabled={loading} className="mt-1 h-11 w-full">
          {loading ? <Loader2 className="animate-spin motion-reduce:animate-none" /> : null}
          {loading ? t("submitting") : mode === "signin" ? t("submit") : t("signupSubmit")}
        </Button>
      </form>

      <p className="text-center text-sm text-foreground-muted">
        {mode === "signin" ? `${t("noAccount")} ` : `${t("haveAccount")} `}
        <button
          type="button"
          onClick={() => {
            setError(null);
            setMode(mode === "signin" ? "signup" : "signin");
          }}
          className="rounded-full text-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {mode === "signin" ? t("createOne") : t("submit")}
        </button>
      </p>
    </div>
  );
}
