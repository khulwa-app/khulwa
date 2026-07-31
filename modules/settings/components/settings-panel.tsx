"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnchoredPanel, usePanels, Panel } from "@/modules/panels";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs";
import { SETTINGS_TABS, type SettingsTab } from "../constants";

export function SettingsPanel() {
  const t = useTranslations("settings");
  const open = usePanels((s) => s.open === Panel.Settings);
  const close = usePanels((s) => s.close);
  const [active, setActive] = useState<SettingsTab>(SETTINGS_TABS[0].id);

  return (
    <AnchoredPanel
      anchor="utility"
      width={480}
      maxHeight="min(70vh, 620px)"
      open={open}
      onClose={close}
      title={t("title")}
    >
      <Tabs value={active} onValueChange={(value) => setActive(value as SettingsTab)}>
        <TabsList className="w-full">
          {SETTINGS_TABS.map(({ id, icon: Icon }) => (
            <TabsTrigger key={id} value={id}>
              <Icon className="size-4" />
              {t(`tabs.${id}`)}
            </TabsTrigger>
          ))}
        </TabsList>

        {SETTINGS_TABS.map(({ id, content: Content }) => (
          <TabsContent key={id} value={id} className="pt-4">
            <Content />
          </TabsContent>
        ))}
      </Tabs>
    </AnchoredPanel>
  );
}
