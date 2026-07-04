import { Icon as ChakraIcon, type IconProps } from "@chakra-ui/react";
import type { IconWeight } from "@solar-icons/react";
import type { Glyph } from "./icon.types";

export interface IconRenderProps extends Omit<IconProps, "asChild" | "children"> {
  icon: Glyph;
  /** Solar stroke weight; defaults to Linear (active chrome passes Bold). */
  weight?: IconWeight;
}

/** Renders a Solar icon through Chakra's Icon recipe (size/color via tokens). */
export function Icon({ icon: Glyph, weight = "Linear", ...rest }: IconRenderProps) {
  return (
    <ChakraIcon aria-hidden focusable="false" asChild {...rest}>
      <Glyph weight={weight} />
    </ChakraIcon>
  );
}
