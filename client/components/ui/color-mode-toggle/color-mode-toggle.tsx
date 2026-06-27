"use client";

import { IconButton } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useColorMode } from "@/hooks/use-color-mode";
import { useMounted } from "@/hooks/use-mounted";

export function ColorModeToggle() {
  const t = useTranslations("components.colorMode");
  const { colorMode, toggleColorMode } = useColorMode();
  const mounted = useMounted();

  const isDark = colorMode === "dark";
  const label = isDark ? t("toLight") : t("toDark");

  if (!mounted) {
    return (
      <IconButton variant="secondary" size="sm" aria-label={t("ariaLabel")} disabled>
        <Moon size={16} />
      </IconButton>
    );
  }

  return (
    <IconButton variant="secondary" size="sm" aria-label={label} aria-pressed={isDark} onClick={toggleColorMode}>
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </IconButton>
  );
}
