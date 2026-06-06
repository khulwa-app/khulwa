"use client";

import { Box, chakra } from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Routes } from "@/constants";
import DarkInkLogo from "@/assets/svg/logo/logo-dark.svg";
import WhiteLogo from "@/assets/svg/logo/logo-white.svg";

const DarkInk = chakra(DarkInkLogo);
const White = chakra(WhiteLogo);

interface LogoProps {
  href?: string | null;
  size?: number;
  onInverse?: boolean;
}

export function Logo({ href = Routes.Home, size = 28, onInverse = false }: LogoProps) {
  const t = useTranslations("components.logo");

  const mark = (
    <>
      <DarkInk
        h={`${size}px`}
        w="auto"
        display={onInverse ? "none" : "block"}
        _dark={{ display: onInverse ? "block" : "none" }}
        aria-hidden
      />
      <White
        h={`${size}px`}
        w="auto"
        display={onInverse ? "block" : "none"}
        _dark={{ display: onInverse ? "none" : "block" }}
        aria-hidden
      />
    </>
  );

  if (href === null) {
    return (
      <Box display="inline-flex" aria-label={t("ariaLabel")}>
        {mark}
      </Box>
    );
  }

  return (
    <Box asChild display="inline-flex">
      <NextLink href={href} aria-label={t("ariaLabel")}>
        {mark}
      </NextLink>
    </Box>
  );
}
