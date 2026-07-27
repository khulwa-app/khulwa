"use client";

import { cloneElement, isValidElement, useState, type MouseEvent, type ReactElement } from "react";

interface Props {
  trigger: ReactElement<{ onClick?: (event: MouseEvent<HTMLElement>) => void; "aria-expanded"?: boolean }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Collapsible = ({ trigger, children, defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen);
  const enhancedTrigger = isValidElement(trigger)
    ? cloneElement(trigger, {
        "aria-expanded": open,
        onClick: (event: MouseEvent<HTMLElement>) => {
          trigger.props.onClick?.(event);
          if (!event.defaultPrevented) setOpen((value) => !value);
        },
      })
    : trigger;

  return (
    <section>
      {enhancedTrigger}
      <div hidden={!open}>{children}</div>
    </section>
  );
};
