"use client";

import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Routes } from "@/constants";

interface LogoProps {
  href?: string | null;
  size?: string;
  variant?: "white" | "dark";
}

/** Original Sanctuary Dusk mark: a quiet arch built from four balanced planes. */
export function Logo({ href = Routes.Home, size = "10", variant = "dark" }: LogoProps) {
  const t = useTranslations("components.logo");
  const dimension = Number(size) * 4;
  const tone = variant === "white" ? "text-base-100" : "text-sage-1000";
  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${tone}`}>
      <svg aria-hidden="true" height={dimension} viewBox="0 0 32 32" width={dimension}>
        <path d="M5 23.5V13.2c0-4.3 3-7.7 7.1-7.7 1.7 0 3.1.6 3.9 1.8.8-1.2 2.2-1.8 3.9-1.8 4.1 0 7.1 3.4 7.1 7.7v10.3h-5.2v-10c0-1.5-.8-2.6-1.9-2.6s-1.9 1.1-1.9 2.6v10h-4v-10c0-1.5-.8-2.6-1.9-2.6s-1.9 1.1-1.9 2.6v10H5Z" fill="currentColor" />
        <path d="M8.5 26.5h15" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
      </svg>
      <span className="font-semibold tracking-[-0.05em]">khulwa</span>
    </span>
  );

  if (href === null) return <span aria-label={t("ariaLabel")}>{mark}</span>;
  return <NextLink aria-label={t("ariaLabel")} className="inline-flex" href={href}>{mark}</NextLink>;
}
