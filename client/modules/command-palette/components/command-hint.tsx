"use client";

import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useUiPrefsStore } from "@/modules/ui-prefs";
import { CMD_PALETTE_HINT_ID } from "../constants";

/**
 * Quiet "press ⌘K" nudge above the dock. Mount-gated to avoid an SSR/persist
 * flash, and retired forever the first time the palette is opened.
 */
export function CommandHint() {
  const t = useTranslations("palette");
  const [mounted, setMounted] = useState(false);
  const dismissed = useUiPrefsStore((s) => s.dismissedHints.includes(CMD_PALETTE_HINT_ID));

  useEffect(() => setMounted(true), []);
  if (!mounted || dismissed) return null;

  return (
    <Box
      position="fixed"
      bottom={{ base: "20", md: "24" }}
      insetInlineStart="50%"
      transform="translateX(-50%)"
      zIndex="hint"
      pointerEvents="none"
    >
      <Text textStyle="overline" color="fg.faint">
        {t("hint")}
      </Text>
    </Box>
  );
}
