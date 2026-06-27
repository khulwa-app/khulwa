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
  size?: string;
  variant?: "white" | "dark";
}

export function Logo({ href = Routes.Home, size = "7", variant }: LogoProps) {
  const t = useTranslations("components.logo");

  let mark;
  if (variant === "dark") {
    mark = <DarkInk h={size} w="auto" aria-hidden />;
  } else if (variant === "white") {
    mark = <White h={size} w="auto" aria-hidden />;
  } else {
    mark = (
      <>
        <DarkInk h={size} w="auto" aria-hidden display="inline-flex" _dark={{ display: "none" }} />
        <White h={size} w="auto" aria-hidden display="none" _dark={{ display: "inline-flex" }} />
      </>
    );
  }

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
