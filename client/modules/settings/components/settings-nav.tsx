"use client";

import { IconButton } from "@chakra-ui/react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Settings } from "@/theme/slot-recipes/settings";
import { SETTINGS_TABS, type SettingsTab } from "../constants";

interface SettingsNavProps {
  active: SettingsTab;
  onSelect: (id: SettingsTab) => void;
  onClose: () => void;
}

export function SettingsNav({ active, onSelect, onClose }: SettingsNavProps) {
  const t = useTranslations("settings");
  const tAria = useTranslations("panels.aria");

  return (
    <Settings.Nav role="tablist" aria-orientation="vertical" aria-label={t("title")}>
      <IconButton variant="ghost" size="sm" aria-label={tAria("close")} alignSelf="start" mb="1" onClick={onClose}>
        <X size={16} />
      </IconButton>
      {SETTINGS_TABS.map(({ id, icon: Icon }) => (
        <Settings.NavItem
          key={id}
          type="button"
          role="tab"
          id={`settings-tab-${id}`}
          aria-selected={active === id}
          aria-controls={`settings-pane-${id}`}
          onClick={() => onSelect(id)}
        >
          <Icon size={16} />
          {t(`tabs.${id}`)}
        </Settings.NavItem>
      ))}
    </Settings.Nav>
  );
}
