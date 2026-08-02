"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/shadcn/input";

interface InlineTextProps {
  value: string;
  onCommit: (value: string) => void;
  label: string;
  className?: string;
  inputMode?: "text" | "numeric";
  /** Returns the normalized value, or null to reject the edit and restore the previous one. */
  parse?: (raw: string) => string | null;
}

/**
 * Click-to-edit text that stays a single line. Editing swaps in a real input so the caret,
 * selection, and mobile keyboards behave natively.
 */
export function InlineText({ value, onCommit, label, className, inputMode = "text", parse }: InlineTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const startEditing = () => {
    setDraft(value);
    setEditing(true);
  };

  const commit = () => {
    setEditing(false);
    const next = parse ? parse(draft) : draft.trim();
    if (next === null || next === "" || next === value) return;
    onCommit(next);
  };

  if (!editing) {
    return (
      <button
        type="button"
        aria-label={label}
        onClick={startEditing}
        // Square to match the plain Input below, so the focus ring keeps its shape across the
        // display/edit swap instead of jumping from a lozenge to a rectangle.
        className={cn(
          "min-w-0 flex-1 truncate rounded-none text-left focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring",
          className,
        )}
      >
        {value}
      </button>
    );
  }

  return (
    <Input
      variant="plain"
      ref={inputRef}
      aria-label={label}
      inputMode={inputMode}
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") commit();
        if (event.key === "Escape") {
          event.stopPropagation();
          setDraft(value);
          setEditing(false);
        }
      }}
      className={className}
    />
  );
}
