"use client";

import { useEffect, useState } from "react";
import { ayat } from "../ayat";

// Advance roughly every 90s — within the "1–2 minutes" feel without being
// restless. Starts at 0 so SSR and first client paint agree.
const ROTATE_MS = 90_000;

export function useRotatingAyah() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (ayat.length < 2) return;
    const id = setInterval(() => setIndex((current) => (current + 1) % ayat.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return { ayah: ayat[index], index };
}
