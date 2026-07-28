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
        <path d="M3 27V14C3 7.9 8.8 3 16 3s13 4.9 13 11v13h-5V14c0-3.9-3.6-7-8-7s-8 3.1-8 7v13H3Z" fill="currentColor" />
        <path d="M10 27v-8c0-3.9 2.7-7 6-7s6 3.1 6 7v8h-4v-8c0-1.3-.9-2.3-2-2.3s-2 1-2 2.3v8h-4Z" fill="currentColor" opacity="0.5" />
        <path d="M3 28.5h26" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
      <span className="font-semibold tracking-[-0.05em]">riwaq</span>
    </span>
  );

  if (href === null) return <span aria-label={t("ariaLabel")}>{mark}</span>;
  return <NextLink aria-label={t("ariaLabel")} className="inline-flex" href={href}>{mark}</NextLink>;
}
