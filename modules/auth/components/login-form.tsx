"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Field, FieldError, FieldLabel, Input } from "@/components/ui";
import { signIn, signUp } from "@/services/auth";

type Mode = "signin" | "signup";

export function LoginForm() {
  const t = useTranslations("login.form");
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const enter = () => { router.push("/app"); router.refresh(); };

  const onGoogle = async () => { setError(null); await signIn.social({ provider: "google", callbackURL: "/app" }); };
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault(); setError(null); setLoading(true);
    try {
      const result = mode === "signin" ? await signIn.email({ email, password }) : await signUp.email({ email, password, name: name || email.split("@")[0] });
      if (result.error) setError(t("errors.generic")); else enter();
    } catch { setError(t("errors.network")); } finally { setLoading(false); }
  };

  return <div className="grid gap-6"><div className="text-center"><h1 className="text-3xl font-semibold tracking-normal text-sage-1000">{mode === "signin" ? t("title") : t("signupTitle")}</h1><p className="mt-3 text-base leading-7 text-sage-700">{mode === "signin" ? t("subtitle") : t("signupSubtitle")}</p></div>
    <Button onClick={onGoogle} size="lg" tone="secondary" type="button">{t("continueWithGoogle")}</Button>
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-normal text-sage-600"><span className="h-px flex-1 bg-sage-300" />{t("divider")}<span className="h-px flex-1 bg-sage-300" /></div>
    <form className="grid gap-4" onSubmit={onSubmit}>{mode === "signup" ? <Field><FieldLabel htmlFor="name">{t("fields.name")}</FieldLabel><Input autoComplete="name" id="name" onChange={(event) => setName(event.target.value)} value={name} /></Field> : null}<Field><FieldLabel htmlFor="email">{t("fields.email")}</FieldLabel><Input autoComplete="email" id="email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} /></Field><Field><FieldLabel htmlFor="password">{t("fields.password")}</FieldLabel><Input autoComplete={mode === "signin" ? "current-password" : "new-password"} id="password" minLength={8} onChange={(event) => setPassword(event.target.value)} required type="password" value={password} /></Field>{error ? <FieldError>{error}</FieldError> : null}<Button loading={loading} size="lg" type="submit">{mode === "signin" ? t("submit") : t("signupSubmit")}</Button></form>
    <p className="text-center text-sm text-sage-700">{mode === "signin" ? `${t("noAccount")} ` : `${t("haveAccount")} `}<button className="font-semibold text-sage-1000 underline decoration-sage-400 underline-offset-4" onClick={() => { setError(null); setMode(mode === "signin" ? "signup" : "signin"); }} type="button">{mode === "signin" ? t("createOne") : t("submit")}</button></p>
  </div>;
}
