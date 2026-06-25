"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useColorMode } from "@/components/ui/color-mode";

// Navbar control flipping light <-> dark. `mounted` guards SSR hydration: the
// resolved theme is unknown until the client renders.
export function ColorModeToggle() {
  const t = useTranslations("components.colorMode");
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = colorMode === "dark";
  const label = isDark ? t("toLight") : t("toDark");

  if (!mounted) {
    return (
      <IconButton visual="chip" size="sm" aria-label={t("ariaLabel")} disabled>
        <Moon size={16} />
      </IconButton>
    );
  }

  return (
    <IconButton
      visual="chip"
      size="sm"
      aria-label={label}
      aria-pressed={isDark}
      onClick={toggleColorMode}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </IconButton>
  );
}
