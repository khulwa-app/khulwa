"use client";

import { useTranslations } from "next-intl";
import { ColorMode } from "@/constants/theme";
import { useColorMode } from "@/hooks/use-color-mode";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeSection() {
  const t = useTranslations("settings.theme"); const mounted = useMounted(); const { colorMode, setColorMode } = useColorMode(); const isDark = mounted && colorMode === ColorMode.Dark;
  return <label className="flex min-h-12 items-center justify-between gap-4 rounded-control border border-sage-300 px-4"><span className="text-sm font-medium text-sage-900">{t("darkMode")}</span><input aria-label={t("darkMode")} checked={isDark} className="toggle toggle-sm border-sage-400 bg-base-100 checked:border-sage-800 checked:bg-sage-800" onChange={(event) => setColorMode(event.target.checked ? ColorMode.Dark : ColorMode.Light)} type="checkbox" /></label>;
}
