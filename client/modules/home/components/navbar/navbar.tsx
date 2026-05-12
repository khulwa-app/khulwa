import { Logo } from "@/components/ui";
import { Routes } from "@/constants";
import { HStack, Link } from "@chakra-ui/react";
import React from "react";

function Navbar() {
  return (
    <HStack position="absolute" top={0} left={0} right={0} p={4} zIndex={10}>
      <Link href={Routes.Home}>
        <Logo />
      </Link>
    </HStack>
  );
}

export default Navbar;
