"use client";

import { VolumeCross, VolumeLoud } from "@solar-icons/react";
import { IconButton, ScrollArea } from "@/components/ui";
import { Panel, SidePanel, usePanels } from "../panels";
import { SOUNDS } from "./catalog";
import { useSounds } from "./hooks/use-sounds-store.hook";
import { SoundGrid } from "./components/sound-grid";
import { SoundTile } from "./components/sound-tile";
import { VolumeSlider } from "./components/volume-slider";

export default function SoundsPanel() {
  const open = usePanels((s) => s.open === Panel.Music);
  const close = usePanels((s) => s.close);
  const master = useSounds((s) => s.master);
  const setMaster = useSounds((s) => s.setMaster);

  const toggleMaster = () => (master <= 0 ? setMaster(0.5) : setMaster(0));

  return (
    <SidePanel open={open} title="Ambient" onClose={close}>
      <div className="flex h-full w-full flex-col gap-3">
        <ScrollArea className="min-h-0 w-full flex-1">
          <SoundGrid.Root>
            {SOUNDS.map((def) => (
              <SoundTile key={def.id} def={def} />
            ))}
          </SoundGrid.Root>
        </ScrollArea>

        <div className="flex shrink-0 items-center gap-2">
          <IconButton aria-label={master ? "Mute" : "Unmute"} onClick={toggleMaster} size="sm">
            {master ? <VolumeLoud className="size-5" /> : <VolumeCross className="size-5" />}
          </IconButton>
          <VolumeSlider className="flex-1" value={master} onChange={setMaster} label="Master volume" />
        </div>
      </div>
    </SidePanel>
  );
}
