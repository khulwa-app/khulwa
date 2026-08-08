"use client";

import { useTranslations } from "next-intl";
import { Panel, AnchoredPanel, usePanels } from "../panels";
import { SOUNDS } from "./catalog";
import { SoundTile } from "./components/sound-tile";

export default function SoundsPanel() {
  const t = useTranslations("sounds");
  const open = usePanels((s) => s.open === Panel.Music);
  const close = usePanels((s) => s.close);

  return (
    <AnchoredPanel anchor="tool" width={420} open={open} title={t("title")} onClose={close}>
      <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
        Click an icon or anywhere in its sound area to play. Use each slider to mix levels.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SOUNDS.map((def) => (
          <SoundTile key={def.id} def={def} />
        ))}
      </div>
    </AnchoredPanel>
  );
}
