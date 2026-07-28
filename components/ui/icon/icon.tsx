import type { ComponentProps } from "react";
import type { IconWeight } from "@solar-icons/react";
import type { Glyph } from "./icon.types";

export interface IconRenderProps extends Omit<ComponentProps<"svg">, "children"> { icon: Glyph; weight?: IconWeight; }
export function Icon({ icon: Glyph, weight = "Linear", ...props }: IconRenderProps) { return <Glyph aria-hidden focusable="false" weight={weight} {...props} />; }
