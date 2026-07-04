import type { IconProps } from "@solar-icons/react";

/** Bare check — Solar ships no naked checkmark. currentColor; honors Bold weight. */
export function Check({ weight, color = "currentColor", ...props }: IconProps) {
  const strokeWidth = weight === "Bold" || weight === "BoldDuotone" ? 2 : 1.5;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" color={color} {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5 13l4 4L19 7"
      />
    </svg>
  );
}
