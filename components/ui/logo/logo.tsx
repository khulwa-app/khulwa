"use client";

import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Routes } from "@/constants";

interface LogoProps {
  href?: string | null;
  size?: string;
  variant?: "white" | "dark";
}

/** Original Sanctuary Dusk mark: a small riwaq, or sheltered passage. */
export function Logo({ href = Routes.Home, size = "10", variant = "dark" }: LogoProps) {
  const t = useTranslations("components.logo");
  const dimension = Number(size) * 4;
  const tone = variant === "white" ? "text-base-100" : "text-sage-1000";
  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${tone}`}>
      <svg aria-hidden="true" height={dimension} viewBox="0 0 32 32" width={dimension}>
        <path d="M3.5 27V14.2C3.5 8.3 8.1 3.5 14 3.5c3.2 0 6.1 1.5 8 3.8 1.9 1.8 3.1 4.2 3.1 6.9V27h-4.3V14.2c0-3.6-2.8-6.5-6.4-6.5S8 10.6 8 14.2V27H3.5Z" fill="currentColor" />
        <path d="M10.8 27v-8.2c0-2.9 2.3-5.3 5.2-5.3s5.2 2.4 5.2 5.3V27h-3.6v-8.2c0-.9-.7-1.7-1.6-1.7s-1.6.8-1.6 1.7V27h-3.6Z" fill="currentColor" opacity="0.5" />
        <path d="M3.5 28.5h22" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
      <span className="font-semibold tracking-[-0.05em]">riwaq</span>
    </span>
  );

  if (href === null) return <span aria-label={t("ariaLabel")}>{mark}</span>;
  return <NextLink aria-label={t("ariaLabel")} className="inline-flex" href={href}>{mark}</NextLink>;
}
