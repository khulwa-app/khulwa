"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { SETTINGS_TABS, type SettingsTab } from "../constants";

interface SettingsNavProps { active: SettingsTab; onSelect: (id: SettingsTab) => void; }

export function SettingsNav({ active, onSelect }: SettingsNavProps) {
  const t = useTranslations("settings");
  return <nav aria-label={t("title")} className="flex gap-1 overflow-x-auto border-b border-riwaq-border p-3 md:w-44 md:flex-col md:border-r md:border-b-0 md:p-4" role="tablist">{SETTINGS_TABS.map(({ id, icon: Glyph }) => <button aria-controls={`settings-pane-${id}`} aria-selected={active === id} className={cn("flex min-h-11 shrink-0 items-center gap-2 rounded-control px-3 text-sm font-bold transition-colors", active === id ? "bg-riwaq-primary text-riwaq-text" : "text-riwaq-muted hover:bg-riwaq-elevated hover:text-riwaq-text")} id={`settings-tab-${id}`} key={id} onClick={() => onSelect(id)} role="tab" type="button"><Glyph className="size-4" weight={active === id ? "Bold" : "Linear"} />{t(`tabs.${id}`)}</button>)}</nav>;
}
