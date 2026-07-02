"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
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

  const enter = () => {
    router.push("/app");
    router.refresh();
  };

  const onGoogle = async () => {
    setError(null);
    await signIn.social({ provider: "google", callbackURL: "/app" });
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
      if (res.error) setError(t("errors.generic"));
      else enter();
    } catch {
      setError(t("errors.network"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack w="full" mx="auto" align="stretch" gap="5">
      <VStack align="center" textAlign="center" gap="1">
        <Text textStyle="heading-h3" color="fg">
          {mode === "signin" ? t("title") : t("signupTitle")}
        </Text>
        <Text textStyle="body-sm" color="fg.muted">
          {mode === "signin" ? t("subtitle") : t("signupSubtitle")}
        </Text>
      </VStack>

      <Button variant="secondary" size="lg" onClick={onGoogle} w="full">
        {t("continueWithGoogle")}
      </Button>

      <HStack gap="3" color="fg.disabled">
        <Box flex="1" h="1px" bg="border.subtle" />
        <Text textStyle="overline">{t("divider")}</Text>
        <Box flex="1" h="1px" bg="border.subtle" />
      </HStack>

      <form onSubmit={onSubmit}>
        <VStack align="stretch" gap="3">
          {mode === "signup" && (
            <Input
              size="lg"
              placeholder={t("fields.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          )}
          <Input
            size="lg"
            type="email"
            placeholder={t("fields.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <Input
            size="lg"
            type="password"
            placeholder={t("fields.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            minLength={8}
            required
          />

          {error && (
            <Text textStyle="body-sm" color="fg.error">
              {error}
            </Text>
          )}

          <Button type="submit" variant="primary" size="lg" w="full" loading={loading} loadingText={t("submitting")}>
            {mode === "signin" ? t("submit") : t("signupSubmit")}
          </Button>
        </VStack>
      </form>

      <Text textStyle="body-sm" color="fg.muted" textAlign="center">
        {mode === "signin" ? `${t("noAccount")} ` : `${t("haveAccount")} `}
        <Button
          type="button"
          variant="link"
          onClick={() => {
            setError(null);
            setMode(mode === "signin" ? "signup" : "signin");
          }}
        >
          {mode === "signin" ? t("createOne") : t("submit")}
        </Button>
      </Text>
    </VStack>
  );
}
