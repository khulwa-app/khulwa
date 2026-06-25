"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// Flushes emotion's SSR styles into the streamed HTML via useServerInsertedHTML.
// Chakra v3 renders through @emotion/react, so without this the runtime styles
// are inserted only on the client after hydration → FOUC / non-deterministic
// cascade order. Wrapping ChakraProvider in this cache makes SSR deterministic.
export function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const c = createCache({ key: "khulwa" });
    // compat mode keeps already-inserted rules so the flush below is complete.
    c.compat = true;
    return c;
  });

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{ __html: Object.values(cache.inserted).join(" ") }}
    />
  ));

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
