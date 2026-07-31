import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Routes } from "@/constants";

interface LogoProps {
  href?: string | null;
  className?: string;
}

/**
 * Typographic wordmark set in the product typeface. The previous pictorial mark spelled the old
 * name, so it was retired with the brand rather than recoloured.
 */
export function Logo({ href = Routes.Home, className }: LogoProps) {
  const t = useTranslations("components.logo");
  const mark = (
    <span className={cn("text-base font-semibold tracking-tight", className)}>
      Riwaq<span className="text-primary">.</span>
    </span>
  );

  if (href === null) {
    return (
      <span className="inline-flex" aria-label={t("ariaLabel")}>
        {mark}
      </span>
    );
  }

  return (
    <NextLink href={href} aria-label={t("ariaLabel")} className="inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
      {mark}
    </NextLink>
  );
}
