"use client";

import { useTranslations } from "next-intl";
import { SpaceBackground } from "./space-background";

export function AmbientSpace() {
  const t = useTranslations("khulwa.ambient");
  return <section className="relative grid min-h-dvh place-items-center overflow-hidden bg-base-200 px-5 py-24 text-center"><SpaceBackground /><div className="relative max-w-xl rounded-shell border border-sage-300 bg-base-100 p-8 sm:p-12"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-700">Environment</p><h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-sage-1000 sm:text-5xl">{t("title")}</h1><p className="mt-4 leading-7 text-sage-800">Choose sound from Music. Playback remains with you across every space.</p></div></section>;
}
