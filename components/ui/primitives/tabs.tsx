"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, defaultValue, label }: { items: TabItem[]; defaultValue?: string; label: string }) {
  const [value, setValue] = useState(defaultValue ?? items[0]?.value);
  const id = useId();
  const selected = items.find((item) => item.value === value) ?? items[0];

  if (!selected) return null;

  return (
    <div>
      <div aria-label={label} className="tabs tabs-box w-fit rounded-control border border-sage-300 bg-sage-100 p-1" role="tablist">
        {items.map((item) => {
          const active = item.value === selected.value;
          return (
            <button
              aria-controls={`${id}-${item.value}`}
              aria-selected={active}
              className={cn("tab h-9 rounded-[0.5rem] px-3 text-sm font-medium text-sage-700", active && "bg-base-100 text-sage-1000")}
              id={`${id}-${item.value}-tab`}
              key={item.value}
              onClick={() => setValue(item.value)}
              role="tab"
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div aria-labelledby={`${id}-${selected.value}-tab`} className="pt-5" id={`${id}-${selected.value}`} role="tabpanel">
        {selected.content}
      </div>
    </div>
  );
}
