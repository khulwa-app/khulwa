"use client";

import { HStack, IconButton, VStack } from "@chakra-ui/react";
import { VolumeCross, VolumeLoud } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { ScrollArea } from "@/components/ui";
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
      <VStack h="full" w="full" gap="3" align="stretch">
        <ScrollArea flex="1" minH="0" w="full">
          <SoundGrid.Root>
            {SOUNDS.map((def) => (
              <SoundTile key={def.id} def={def} />
            ))}
          </SoundGrid.Root>
        </ScrollArea>

        <HStack flexShrink="0" gap="2" align="center">
          <IconButton variant="ghost.panel" size="sm" aria-label={master ? "Mute" : "Unmute"} onClick={toggleMaster}>
            {master ? <Icon icon={VolumeLoud} boxSize="4.5" /> : <Icon icon={VolumeCross} boxSize="4.5" />}
          </IconButton>
          <VolumeSlider flex="1" value={master} onChange={setMaster} label="Master volume" />
        </HStack>
      </VStack>
    </SidePanel>
  );
}
