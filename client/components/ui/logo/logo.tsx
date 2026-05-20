"use client";

import { Box } from "@chakra-ui/react";
import Image, { type StaticImageData } from "next/image";
import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Routes } from "@/constants";
import { Locale, type LocaleType } from "@/i18n/config";

import LogoEnDark from "@/assets/svg/khulwa-logo-en.svg";
import LogoEnLight from "@/assets/svg/khulwa-logo-en-white.svg";

// TODO: swap to dedicated AR assets once provided.
// For now AR falls back to EN wordmark.
const LogoArDark = LogoEnDark;
const LogoArLight = LogoEnLight;

export type LogoVariant = "dark" | "light";

const LOGO_MAP: Record<LocaleType, Record<LogoVariant, StaticImageData>> = {
  [Locale.AR]: { dark: LogoArDark, light: LogoArLight },
  [Locale.EN]: { dark: LogoEnDark, light: LogoEnLight },
};

interface LogoProps {
  /** `dark` = dark wordmark for light surfaces (default). `light` = white wordmark for dark surfaces. */
  variant?: LogoVariant;
  /** Target route. Defaults to home. Pass `null` to skip the link wrapper. */
  href?: string | null;
  height?: number;
  width?: number;
  priority?: boolean;
}

export function Logo({ variant = "dark", href = Routes.Home, height = 32, width, priority = false }: LogoProps) {
  const locale = useLocale() as LocaleType;
  const t = useTranslations("components.logo");

  const src = LOGO_MAP[locale][variant];
  const alt = t("ariaLabel");

  const img = <Image src={src} alt={alt} height={height} width={width} priority={priority} />;

  if (href === null) {
    return (
      <Box display="inline-flex" aria-label={alt}>
        {img}
      </Box>
    );
  }

  return (
    <Box asChild display="inline-flex">
      <NextLink href={href} aria-label={alt}>
        {img}
      </NextLink>
    </Box>
  );
}
