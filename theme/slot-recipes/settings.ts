import {
  createSlotRecipeContext,
  defineSlotRecipe,
  type HTMLChakraProps,
  type SlotRecipeProps,
} from "@chakra-ui/react";

export const settingsSlotRecipe = defineSlotRecipe({
  className: "khulwa-settings",
  slots: ["layout", "nav", "navItem", "pane", "paneTitle"],
  base: {
    layout: {
      display: "flex",
      flex: "1",
      minH: "0",
      width: "full",
    },
    nav: {
      display: "flex",
      flexDirection: "column",
      flexShrink: "0",
      width: { base: "8rem", md: "11.5rem" },
      gap: "1",
      padding: "3",
      borderInlineEndWidth: "1px",
      borderColor: "glass.border",
      overflowY: "auto",
    },
    navItem: {
      display: "flex",
      alignItems: "center",
      gap: "2.5",
      width: "full",
      paddingInline: "3",
      paddingBlock: "2.5",
      rounded: "full",
      border: "0",
      bg: "transparent",
      cursor: "pointer",
      color: "fg.muted",
      textStyle: "body-sm",
      fontWeight: "medium",
      textAlign: "start",
      flexShrink: "0",
      transitionProperty: "background-color, color",
      transitionDuration: "enter",
      transitionTimingFunction: "enter",
      _hover: { bg: "primary.muted", color: "primary.emphasized" },
      "&[aria-selected=true]": { bg: "primary.subtle", color: "primary.fg" },
      "& svg": { flexShrink: "0" },
    },
    pane: {
      display: "flex",
      flexDirection: "column",
      gap: "5",
      flex: "1",
      minW: "0",
      minH: "0",
      overflowY: "auto",
      overscrollBehavior: "contain",
      padding: { base: "4", md: "6" },
    },
    paneTitle: {
      textStyle: "heading-h4",
      color: "fg",
      overflowWrap: "break-word",
    },
  },
});

const ctx = createSlotRecipeContext({ key: "settings" });
type LayoutProps = HTMLChakraProps<"div", SlotRecipeProps<"settings">>;
type NavProps = HTMLChakraProps<"nav">;
type NavItemProps = HTMLChakraProps<"button">;
type PaneProps = HTMLChakraProps<"div">;
type TitleProps = HTMLChakraProps<"h2">;

export const Settings = {
  Layout: ctx.withProvider<HTMLDivElement, LayoutProps>("div", "layout"),
  Nav: ctx.withContext<HTMLElement, NavProps>("nav", "nav"),
  NavItem: ctx.withContext<HTMLButtonElement, NavItemProps>("button", "navItem"),
  Pane: ctx.withContext<HTMLDivElement, PaneProps>("div", "pane"),
  PaneTitle: ctx.withContext<HTMLHeadingElement, TitleProps>("h2", "paneTitle"),
};
