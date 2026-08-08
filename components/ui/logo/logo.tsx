import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Routes } from "@/constants";

interface LogoProps {
  href?: string | null;
  className?: string;
}

function QuietSignalMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" fill="none" aria-hidden="true" className={className}>
      <rect x="45" y="78" width="10" height="24" rx="5" fill="currentColor" opacity="0.88" />
      <rect x="65" y="62" width="10" height="56" rx="5" fill="currentColor" opacity="0.88" />
      <rect x="85" y="46" width="10" height="88" rx="5" fill="currentColor" />
      <rect x="105" y="62" width="10" height="56" rx="5" fill="currentColor" opacity="0.88" />
      <rect x="125" y="78" width="10" height="24" rx="5" fill="currentColor" opacity="0.88" />
    </svg>
  );
}

export function Logo({ href = Routes.Home, className }: LogoProps) {
  const t = useTranslations("components.logo");
  const mark = (
    <span className={cn("inline-flex items-center gap-2 text-base font-semibold tracking-tight", className)}>
      <QuietSignalMark className="size-6 shrink-0 text-primary" />
      <span>
        Khulwa<span className="text-primary">.</span>
      </span>
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
