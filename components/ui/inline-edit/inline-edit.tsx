"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface InlineEditProps extends Omit<HTMLAttributes<HTMLElement>, "onBlur" | "children"> { value: string; onCommit: (value: string) => void; parse?: (raw: string) => string | null; as?: "span" | "p"; }

export const InlineEdit = forwardRef<HTMLElement, InlineEditProps>(function InlineEdit({ value, onCommit, parse, as = "p", className, ...props }, ref) {
  const Tag = as;
  return <Tag className={cn("-mx-1 cursor-text rounded-sm px-1 outline-none transition-colors focus-visible:!outline-none focus-visible:shadow-[inset_0_-1px_0_#7FA08D]", className)} contentEditable="plaintext-only" onBlur={(event) => { const raw = (event.currentTarget.textContent ?? "").trim(); const next = (parse ? parse(raw) : raw || null) ?? value; event.currentTarget.textContent = next; if (next !== value) onCommit(next); }} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); event.currentTarget.blur(); } if (event.key === "Escape") { event.preventDefault(); event.currentTarget.textContent = value; event.currentTarget.blur(); } }} ref={ref as never} suppressContentEditableWarning {...props}>{value}</Tag>;
});
