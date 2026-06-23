"use client";

import { Box, chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui";
import { Panel, SidePanel, usePanels } from "@/modules/panels";
import { useSpace } from "@/modules/space";
import { BACKGROUNDS } from "../backgrounds";
import { useBackground } from "../hooks/use-background-store.hook";
import { ThemePicker } from "./theme-grid";

// The "Theme Library" — pick a background for the active space (each space
// keeps its own).
export function BackgroundsPanel() {
  const t = useTranslations("theme");
  const tDest = useTranslations("dock.destinations");
  const open = usePanels((s) => s.open === Panel.Settings);
  const close = usePanels((s) => s.close);
  const activeSpace = useSpace((s) => s.activeSpace);
  const selected = useBackground((s) => s.bySpace[activeSpace]);
  const setBackground = useBackground((s) => s.setBackground);

  return (
    <SidePanel open={open} title={`${t("title")} · ${tDest(activeSpace)}`} onClose={close}>
      <ScrollArea flex="1" minH="0" w="full">
        <ThemePicker.Grid>
          {BACKGROUNDS.map((bg) => {
            const active = bg.id === selected || undefined;
            return (
              <ThemePicker.Tile key={bg.id} aria-pressed={bg.id === selected} onClick={() => setBackground(activeSpace, bg.id)}>
                <ThemePicker.Thumb data-active={active}>
                  {bg.kind === "photo" ? (
                    <chakra.img
                      src={bg.src}
                      alt=""
                      loading="lazy"
                      position="absolute"
                      inset={0}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  ) : (
                    <Box position="absolute" inset={0} bg="bg.base" />
                  )}
                </ThemePicker.Thumb>
                <ThemePicker.Label data-active={active}>{bg.label}</ThemePicker.Label>
              </ThemePicker.Tile>
            );
          })}
        </ThemePicker.Grid>
      </ScrollArea>
    </SidePanel>
  );
}
