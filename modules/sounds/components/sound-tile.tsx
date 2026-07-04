"use client";

import { CloudRain, CloudWaterdrops, CupHot, Fire, Keyboard, Soundwave } from "@solar-icons/react";
import { Icon, type Glyph } from "@/components/ui/icon";
import { type SoundDef } from "../catalog";
import { useSounds } from "../hooks/use-sounds-store.hook";
import { SoundGrid } from "./sound-grid";
import { VolumeSlider } from "./volume-slider";

const ICONS: Record<string, Glyph> = {
  rain: CloudRain,
  "rain-birds": CloudWaterdrops,
  fire: Fire,
  cafe: CupHot,
  theta: Soundwave,
  typing: Keyboard,
};

export function SoundTile({ def }: { def: SoundDef }) {
  const playing = useSounds((s) => s.playing[def.id] ?? false);
  const volume = useSounds((s) => s.volume[def.id] ?? 0.5);
  const toggle = useSounds((s) => s.toggle);
  const setVolume = useSounds((s) => s.setVolume);
  const glyph = ICONS[def.id] ?? Soundwave;
  const active = playing || undefined;

  return (
    <SoundGrid.Tile>
      <SoundGrid.Toggle data-active={active} aria-pressed={playing} onClick={() => toggle(def.id)}>
        <SoundGrid.Icon data-active={active}>
          <Icon icon={glyph} boxSize="4.5" />
        </SoundGrid.Icon>
        <SoundGrid.Title data-active={active}>{def.label}</SoundGrid.Title>
      </SoundGrid.Toggle>
      {playing && <VolumeSlider value={volume} onChange={(v) => setVolume(def.id, v)} label={`${def.label} volume`} />}
    </SoundGrid.Tile>
  );
}
