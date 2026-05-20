"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Routes } from "@/constants";
import LogoIcon from "@/assets/svg/logo-icon.svg";

interface LogoMarkProps {
  /** Target route. Defaults to home. Pass `null` to render without a link wrapper. */
  href?: string | null;
  size?: number;
  priority?: boolean;
}

export function LogoMark({ href = Routes.Home, size = 32, priority = false }: LogoMarkProps) {
  const t = useTranslations("components.logo");
  const alt = t("ariaLabel");

  const img = <Image src={LogoIcon} alt={alt} height={size} width={size} priority={priority} />;

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
