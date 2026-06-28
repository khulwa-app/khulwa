"use client";

import { useEffect, useState } from "react";
import { Presence } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Drawer } from "@/theme/slot-recipes/drawer";
import { Settings } from "@/theme/slot-recipes/settings";
import { Panel, usePanels } from "@/modules/panels";
import { SETTINGS_TABS, type SettingsTab } from "../constants";
import { SettingsNav } from "./settings-nav";

export function SettingsPanel() {
  const t = useTranslations("settings");
  const open = usePanels((s) => s.open === Panel.Settings);
  const close = usePanels((s) => s.close);
  const [active, setActive] = useState<SettingsTab>(SETTINGS_TABS[0].id);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const tab = SETTINGS_TABS.find((entry) => entry.id === active) ?? SETTINGS_TABS[0];
  const Content = tab.content;

  return (
    <>
      <Presence present={open} lazyMount unmountOnExit>
        <Drawer.Backdrop onClick={close} aria-hidden />
      </Presence>
      <Presence present={open} lazyMount unmountOnExit>
        <Drawer.Content
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
          w={{ base: "100dvw", md: "min(48rem, 94dvw)" }}
          maxW="100dvw"
        >
          <Settings.Layout>
            <SettingsNav active={active} onSelect={setActive} onClose={close} />
            <Settings.Pane
              id={`settings-pane-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`settings-tab-${tab.id}`}
              minW="0"
              flex="1"
            >
              <Settings.PaneTitle>{t(`tabs.${tab.id}`)}</Settings.PaneTitle>
              <Content />
            </Settings.Pane>
          </Settings.Layout>
        </Drawer.Content>
      </Presence>
    </>
  );
}
