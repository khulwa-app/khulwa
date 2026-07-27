"use client";

import { useEffect } from "react";
import { IconButton, Presence } from "@chakra-ui/react";
import { CloseCircle } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { useTranslations } from "next-intl";
import { Panel } from "@/theme/slot-recipes/panel";

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function SidePanel({ open, onClose, title, children }: SidePanelProps) {
  const tAria = useTranslations("panels.aria");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <Presence present={open} lazyMount unmountOnExit>
      <Panel.Root role="dialog" aria-label={title}>
        <Panel.Header>
          <Panel.Title>{title}</Panel.Title>
          <IconButton variant="ghost" size="sm" aria-label={tAria("close")} onClick={onClose}>
            <Icon icon={CloseCircle} boxSize="4" />
          </IconButton>
        </Panel.Header>
        <Panel.Body>{children}</Panel.Body>
      </Panel.Root>
    </Presence>
  );
}
