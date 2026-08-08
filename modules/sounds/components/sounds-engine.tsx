"use client";

import { useState } from "react";
import { SOUNDS } from "../catalog";
import { useSounds } from "../hooks/use-sounds-store.hook";
import { SoundLayer } from "./sound-layer";

export function SoundsEngine() {
  const playing = useSounds((s) => s.playing);
  const volume = useSounds((s) => s.volume);
  const [mounted, setMounted] = useState<string[]>([]);

  const missing = Object.keys(playing).filter((id) => playing[id] && !mounted.includes(id));
  if (missing.length) setMounted([...mounted, ...missing]);

  return (
    <>
      {SOUNDS.filter((def) => mounted.includes(def.id)).map((def) => (
        <SoundLayer
          key={def.id}
          def={def}
          volume={volume[def.id] ?? 0.5}
          master={1}
          active={!!playing[def.id]}
          onFadedOut={() => setMounted((prev) => prev.filter((id) => id !== def.id))}
        />
      ))}
    </>
  );
}
