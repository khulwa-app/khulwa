"use client";

import { Text, type TextProps } from "@chakra-ui/react";

export interface InlineEditProps extends Omit<TextProps, "onBlur" | "children"> {
  value: string;
  onCommit: (value: string) => void;
  /**
   * Transform/validate the raw text before committing. Return the value to
   * store, or null to reject — a rejected (or empty, by default) edit reverts
   * to the previous value.
   */
  parse?: (raw: string) => string | null;
}

// In-place editing: the text itself is contentEditable — click, the caret
// blinks inside the text, type, Enter commits, Esc reverts. No input swap,
// no focus ring. Content is uncontrolled while typing (the store only
// updates on commit), so React never fights the DOM mid-edit.
export function InlineEdit({ value, onCommit, parse, ...textProps }: InlineEditProps) {
  return (
    <Text
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      cursor="text"
      _focus={{ outline: "none", boxShadow: "none" }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur(); // commit path lives in onBlur
        }
        if (e.key === "Escape") {
          e.currentTarget.textContent = value;
          e.currentTarget.blur();
        }
      }}
      onBlur={(e) => {
        const raw = (e.currentTarget.textContent ?? "").trim();
        const next = (parse ? parse(raw) : raw || null) ?? value;
        // Normalize the DOM to the committed value so trimming/parsing can't
        // leave it out of sync with the store.
        e.currentTarget.textContent = next;
        if (next !== value) onCommit(next);
      }}
      {...textProps}
    >
      {value}
    </Text>
  );
}
