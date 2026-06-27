"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useUiPrefsStore } from "@/modules/ui-prefs";
import { useMounted } from "@/hooks/use-mounted";
import { CMD_PALETTE_HINT_ID } from "../constants";

export function CommandHint() {
  const t = useTranslations("palette");
  const mounted = useMounted();
  const dismissed = useUiPrefsStore((s) => s.dismissedHints.includes(CMD_PALETTE_HINT_ID));

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
