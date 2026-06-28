"use client";

import { useEffect, useRef } from "react";
import ReactHowler from "react-howler";
import type { SoundDef } from "../catalog";

const FADE_MS = 450;

export function SoundLayer({
  def,
  volume,
  master,
  active,
  onFadedOut,
}: {
  def: SoundDef;
  volume: number;
  master: number;
  active: boolean;
  onFadedOut: () => void;
}) {
  const ref = useRef<ReactHowler>(null);
  const target = volume * master;
  const targetRef = useRef(target);
  const mounted = useRef(false);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  const fadeIn = () => {
    const howl = ref.current?.howler;
    if (!howl) return;
    howl.volume(0);
    howl.fade(0, targetRef.current, FADE_MS);
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const howl = ref.current?.howler;
    if (!howl) return;
    if (active) {
      howl.fade(howl.volume(), targetRef.current, FADE_MS);
      return;
    }
    howl.fade(howl.volume(), 0, FADE_MS);
    const timer = setTimeout(onFadedOut, FADE_MS);
    return () => clearTimeout(timer);
  }, [active, onFadedOut]);

  useEffect(() => {
    if (active) ref.current?.howler?.volume(target);
  }, [target, active]);

  return (
    <ReactHowler
      ref={ref}
      src={def.src}
      playing
      loop={def.loop}
      html5={def.html5}
      volume={target}
      onLoad={fadeIn}
      onLoadError={(_id, err) => console.warn(`[sounds] failed to load ${def.src}`, err)}
    />
  );
}
