"use client";

import { useEffect, useRef } from "react";

type HotkeyOptions = {
  // Disable the binding without unmounting the caller.
  enabled?: boolean;
  // Call preventDefault when the combo matches (default true).
  preventDefault?: boolean;
  // Fire even while a text field / contenteditable is focused (default false).
  allowInInput?: boolean;
};

// `mod` resolves to ⌘ on Apple platforms and Ctrl elsewhere — the one combo
// every cross-platform shortcut should use.
const isApple = () =>
  typeof navigator !== "undefined" && /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);

function isEditable(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}

// A combo is "+"-joined tokens: modifiers (mod / meta / ctrl / alt / shift)
// plus exactly one key, e.g. "mod+k", "shift+enter", "escape", "f".
function matches(combo: string, e: KeyboardEvent): boolean {
  const tokens = combo.toLowerCase().split("+").map((t) => t.trim());
  const wantMod = tokens.includes("mod");
  const wantMeta = tokens.includes("meta") || (wantMod && isApple());
  const wantCtrl = tokens.includes("ctrl") || (wantMod && !isApple());
  const wantAlt = tokens.includes("alt");
  const wantShift = tokens.includes("shift");
  const key = tokens.filter((t) => !["mod", "meta", "ctrl", "alt", "shift"].includes(t)).at(-1);
  if (!key) return false;

  if (e.metaKey !== wantMeta) return false;
  if (e.ctrlKey !== wantCtrl) return false;
  if (e.altKey !== wantAlt) return false;
  if (e.shiftKey !== wantShift) return false;

  const pressed = e.key.toLowerCase();
  const named = key === "esc" ? "escape" : key === "space" ? " " : key;
  return pressed === named;
}

/**
 * Register a global keyboard shortcut. The single primitive Phase 0+ shortcuts
 * build on — keeps every listener in one predictable place instead of scattered
 * `addEventListener` calls. The handler is read from a ref, so passing an inline
 * function won't re-subscribe on every render.
 */
export function useHotkey(
  combo: string | string[],
  handler: (e: KeyboardEvent) => void,
  options: HotkeyOptions = {},
): void {
  const { enabled = true, preventDefault = true, allowInInput = false } = options;
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const combos = (Array.isArray(combo) ? combo : [combo]).join("|");

  useEffect(() => {
    if (!enabled) return;
    const list = combos.split("|");
    const onKeyDown = (e: KeyboardEvent) => {
      if (!allowInInput && isEditable(e.target)) return;
      if (list.some((c) => matches(c, e))) {
        if (preventDefault) e.preventDefault();
        handlerRef.current(e);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [combos, enabled, preventDefault, allowInInput]);
}
