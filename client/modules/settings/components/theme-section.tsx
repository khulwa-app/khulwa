"use client";

import { HStack, Switch, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ColorMode } from "@/constants/theme";
import { useColorMode } from "@/hooks/use-color-mode";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeSection() {
  const t = useTranslations("settings.theme");
  const mounted = useMounted();
  const { colorMode, setColorMode } = useColorMode();
  const isDark = mounted && colorMode === ColorMode.Dark;

  return (
    <HStack justify="space-between" align="center">
      <Text textStyle="body-sm" color="fg.default">
        {t("darkMode")}
      </Text>
      <Switch.Root
        checked={isDark}
        onCheckedChange={(e) => setColorMode(e.checked ? ColorMode.Dark : ColorMode.Light)}
        aria-label={t("darkMode")}
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
    </HStack>
  );
}
