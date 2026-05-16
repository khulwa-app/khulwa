import { Box, Link } from "@chakra-ui/react";
import Image from "next/image";
import LogoEN from "../../../public/assets/svg/khulwa-logo-en.svg";
import { Routes } from "@/constants";

export function Logo() {
  return (
    <Box display={{ base: "block", _rtl: "none" }}>
      <Link href={Routes.Home} aria-label="Khulwa Logo">
        <Image src={LogoEN} height={32} alt="Khulwa Logo" />
      </Link>
    </Box>
  );
}
