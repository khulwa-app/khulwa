import { Box, Link } from "@chakra-ui/react";
import { Routes } from "@/constants";
import LogoWhiteEN from "@/assets/svg/khulwa-logo-en-white.svg";
import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light";
  height?: number;
  width?: number;
}

export function Logo({ variant = "dark", ...props }: LogoProps) {
  return (
    <Box display={{ base: "block", _rtl: "none" }}>
      <Link href={Routes.Home} aria-label="Khulwa Logo">
        <Image height={props.height ?? 32} width={props.width} src={variant === "light" ? LogoWhiteEN : "dark"} alt="Khulwa Logo" />
      </Link>
    </Box>
  );
}
