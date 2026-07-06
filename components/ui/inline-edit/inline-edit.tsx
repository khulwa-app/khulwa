"use client";

import { Text, type TextProps } from "@chakra-ui/react";

export interface InlineEditProps extends Omit<TextProps, "onBlur" | "children"> {
  value: string;
  onCommit: (value: string) => void;

  parse?: (raw: string) => string | null;
}

export function InlineEdit({ value, onCommit, parse, ...textProps }: InlineEditProps) {
  return (
    <Text
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      cursor="text"
      _focus={{ boxShadow: "none" }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          e.currentTarget.textContent = value;
          e.currentTarget.blur();
        }
      }}
      onBlur={(e) => {
        const raw = (e.currentTarget.textContent ?? "").trim();
        const next = (parse ? parse(raw) : raw || null) ?? value;

        e.currentTarget.textContent = next;
        if (next !== value) onCommit(next);
      }}
      {...textProps}
    >
      {value}
    </Text>
  );
}
