"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Panel, SidePanel, usePanels } from "@/modules/panels";
import { SETTINGS_TABS, type SettingsTab } from "../constants";
import { SettingsNav } from "./settings-nav";

export function SettingsPanel() {
  const t = useTranslations("settings");
  const open = usePanels((state) => state.open === Panel.Settings);
  const close = usePanels((state) => state.close);
  const [active, setActive] = useState<SettingsTab>(SETTINGS_TABS[0].id);
  const tab = SETTINGS_TABS.find((entry) => entry.id === active) ?? SETTINGS_TABS[0];
  const Content = tab.content;

  return <SidePanel anchor="end" onClose={close} open={open} title={t("title")} wide><div className="-m-5 flex min-h-full flex-col md:flex-row"><SettingsNav active={active} onSelect={setActive} /><section aria-labelledby={`settings-tab-${tab.id}`} className="min-w-0 flex-1 p-5 md:p-7" id={`settings-pane-${tab.id}`} role="tabpanel"><p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-sage-700">{t("tabs." + tab.id)}</p><Content /></section></div></SidePanel>;
}
