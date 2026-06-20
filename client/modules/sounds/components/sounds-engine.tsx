"use client";

import { useEffect, useState } from "react";
import { SOUNDS } from "../catalog";
import { useSounds } from "../hooks/use-sounds-store.hook";
import { SoundLayer } from "./sound-layer";

export function SoundsEngine() {
  const playing = useSounds((s) => s.playing);
  const volume = useSounds((s) => s.volume);
  const master = useSounds((s) => s.master);
  const [mounted, setMounted] = useState<string[]>([]);

  useEffect(() => {
    const playingIds = Object.keys(playing).filter((id) => playing[id]);
    setMounted((prev) => {
      const missing = playingIds.filter((id) => !prev.includes(id));
      return missing.length ? [...prev, ...missing] : prev;
    });
  }, [playing]);

  return (
    <>
      {SOUNDS.filter((def) => mounted.includes(def.id)).map((def) => (
        <SoundLayer
          key={def.id}
          def={def}
          volume={volume[def.id] ?? 0.5}
          master={master}
          active={!!playing[def.id]}
          onFadedOut={() => setMounted((prev) => prev.filter((id) => id !== def.id))}
        />
      ))}
    </>
  );
}
