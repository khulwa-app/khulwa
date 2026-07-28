"use client";

import { useTranslations } from "next-intl";
import { SpaceBackground } from "./space-background";

export function AmbientSpace() {
  const t = useTranslations("khulwa.ambient");
  return <section className="relative grid min-h-dvh place-items-center overflow-hidden bg-sage-800 px-5 py-24 text-center"><SpaceBackground tone="juniper" /><div className="relative max-w-xl rounded-shell border border-sage-600 bg-sage-900 p-8 sm:p-12"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-300">Environment</p><h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-sage-100 sm:text-5xl">{t("title")}</h1><p className="mt-4 leading-7 text-sage-200">Choose sound from Music. Playback remains with you across every space.</p></div></section>;
}
