"use client";

import { Icon, Text, VStack } from "@chakra-ui/react";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { Panel, SidePanel, usePanels } from "@/modules/panels";

// Minimal Settings shell. The color-mode toggle lives in the navbar, so this
// panel currently holds a calm placeholder until further preferences land.
export function SettingsPanel() {
  const t = useTranslations("settings");
  const open = usePanels((s) => s.open === Panel.Settings);
  const close = usePanels((s) => s.close);

  return (
    <SidePanel open={open} onClose={close} title={t("title")}>
      <VStack flex="1" minH="0" w="full" gap="3" align="center" justify="center" paddingBlock="10">
        <Icon as={SlidersHorizontal} boxSize="6" color="fg.faint" aria-hidden />
        <Text textStyle="body-sm" color="fg.subtle" textAlign="center" maxW="14rem">
          {t("empty")}
        </Text>
      </VStack>
    </SidePanel>
  );
}
