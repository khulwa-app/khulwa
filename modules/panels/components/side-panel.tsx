"use client";

import { Drawer } from "@/components/ui";

interface SidePanelProps { open: boolean; onClose: () => void; title: string; children: React.ReactNode; }

export function SidePanel({ open, onClose, title, children }: SidePanelProps) {
  return <Drawer onOpenChange={(next) => { if (!next) onClose(); }} open={open} title={title}>{children}</Drawer>;
}
