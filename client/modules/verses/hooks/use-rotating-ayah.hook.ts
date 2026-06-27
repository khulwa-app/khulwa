"use client";

import { useEffect, useState } from "react";
import { ayat } from "../ayat";

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
