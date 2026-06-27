"use client";

import { useLocale } from "next-intl";
import type { LocaleType } from "@/i18n/config";
import { Ayah } from "@/theme/slot-recipes/ayah";
import { useRotatingAyah } from "../hooks/use-rotating-ayah.hook";

export function RotatingAyah() {
  const locale = useLocale() as LocaleType;
  const { ayah, index } = useRotatingAyah();

  return (
    <Ayah.Root key={index}>
      <Ayah.Arabic dir="rtl" lang="ar">
        {ayah.arabic}
      </Ayah.Arabic>
      <Ayah.Meaning>{ayah.meaning[locale]}</Ayah.Meaning>
    </Ayah.Root>
  );
}
