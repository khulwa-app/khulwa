"use client";

import { FloatingPanel } from "@/components/ui";

interface SidePanelProps { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean; anchor?: "start" | "end"; }

export function SidePanel({ open, onClose, title, children, wide = false, anchor = "start" }: SidePanelProps) {
  return <FloatingPanel anchor={anchor} className={wide ? "lg:w-[min(40rem,calc(100vw-5rem))]" : undefined} onOpenChange={(next) => { if (!next) onClose(); }} open={open} title={title}>{children}</FloatingPanel>;
}
