import { useId, type ReactNode } from "react";

export function Tooltip({ content, children }: { content: string; children: ReactNode }) {
  const id = useId();
  return (
    <span aria-describedby={id} className="group relative inline-flex">
      {children}
      <span
        className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 w-max max-w-56 -translate-x-1/2 rounded-control bg-sage-1000 px-2.5 py-1.5 text-xs font-medium text-sage-100 opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none"
        id={id}
        role="tooltip"
      >
        {content}
      </span>
    </span>
  );
}
