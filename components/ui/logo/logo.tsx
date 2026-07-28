"use client";

import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Routes } from "@/constants";

interface LogoProps {
  href?: string | null;
  size?: string;
  variant?: "white" | "dark";
}

/** Riwaq mark: a small sheltered passage. */
export function Logo({ href = Routes.Home, size = "10", variant = "dark" }: LogoProps) {
  const t = useTranslations("components.logo");
  const dimension = Number(size) * 4;
  const tone = variant === "white" ? "text-base-100" : "text-sage-1000";
  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${tone}`}>
      <svg aria-hidden="true" height={dimension} viewBox="0 0 32 32" width={dimension}>
        <path d="M7 29V12c0-5.5 4-9 9-9s9 3.5 9 9v17h-3V12c0-3.8-2.7-6-6-6s-6 2.2-6 6v17H7Z" fill="currentColor" />
        <path d="M12 29V18c0-3.1 1.8-5 4-5s4 1.9 4 5v11h-3V18c0-1.2-.4-2-1-2s-1 .8-1 2v11h-3Z" fill="currentColor" opacity="0.5" />
        <path d="M7 30h18" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
      <span className="font-semibold tracking-normal">riwaq</span>
    </span>
  );

  if (href === null) return <span aria-label={t("ariaLabel")}>{mark}</span>;
  return <NextLink aria-label={t("ariaLabel")} className="inline-flex" href={href}>{mark}</NextLink>;
}
