"use client";

import { useTranslations } from "next-intl";
import { House, BullseyeArrow, HeadphonesSimple, List, ChartTrendUpAlt } from "@zappicon/react";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { Dock } from "@/theme/slot-recipes/dock";

type DockIcon = typeof House;

type DockEntry = {
  space: Space;
  labelKey: "home" | "focus" | "ambient" | "tasks" | "stats";
  icon: DockIcon;
};

const ENTRIES: readonly DockEntry[] = [
  { space: Space.Home, labelKey: "home", icon: House },
  { space: Space.Focus, labelKey: "focus", icon: BullseyeArrow },
  { space: Space.Ambient, labelKey: "ambient", icon: HeadphonesSimple },
  { space: Space.Tasks, labelKey: "tasks", icon: List },
  { space: Space.Stats, labelKey: "stats", icon: ChartTrendUpAlt },
];

export function DockNav() {
  const t = useTranslations("dock");
  const tDest = useTranslations("dock.destinations");
  const activeSpace = useSpace((s) => s.activeSpace);
  const changeSpace = useSpace((s) => s.changeSpace);
  return (
    <Dock.Root as="nav" aria-label={t("aria.label")}>
      {ENTRIES.map(({ space, labelKey, icon: Icon }) => {
        const active = activeSpace === space;
        return (
          <Dock.Item key={space} type="button" aria-current={active ? "page" : undefined} onClick={() => changeSpace(space)}>
            <Icon size={18} variant={active ? "filled" : "regular"} />
            <span>{tDest(labelKey)}</span>
          </Dock.Item>
        );
      })}
    </Dock.Root>
  );
}
