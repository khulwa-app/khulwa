"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Nav } from "@/theme/slot-recipes/navbar";
import { Logo } from "@/components/ui";

export function Navbar({ children }: { children?: ReactNode }) {
  const t = useTranslations("components.navbar");
  return (
    <Nav.Root>
      <Nav.Brand>
        <Logo />
      </Nav.Brand>
      <Nav.Actions>
        {children}
        <Nav.Quote>{t("quote")}</Nav.Quote>
      </Nav.Actions>
    </Nav.Root>
  );
}
