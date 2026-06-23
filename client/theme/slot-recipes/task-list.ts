import { defineSlotRecipe } from "@chakra-ui/react";

// Compact / premium task list. Rows are calm at rest (checkbox · title ·
// muted meta) and reveal their action cluster on hover; the active doing-now
// task carries a jade left-accent so "current focus" reads without
// hovering. Consumed as compound components via
// modules/tasks/components/task-list.tsx.
export const taskListSlotRecipe = defineSlotRecipe({
  className: "khulwa-task-list",
  slots: [
    "list",
    "item",
    "row",
    "meta",
    "actions",
    "stepRow",
    "steps",
    "editable",
    "action",
    "aiAction",
    "counter",
    "eta",
    "addStep",
    "addStepRow",
    "sectionTrigger",
    "sectionContent",
    "empty",
  ],
  base: {
    list: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: "0.5",
    },
    // One task: the row plus its (optional) expanded steps. Staggered entrance
    // (delay set inline per index). The left-accent bar marks the active task.
    item: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: "0",
      animationName: "row-in",
      animationDuration: "fast",
      animationTimingFunction: "ease-out",
      animationFillMode: "backwards",
      _motionReduce: { animationName: "none" },
      "&[data-active]::before": {
        content: '""',
        position: "absolute",
        insetInlineStart: "0",
        insetBlock: "1.5",
        width: "2px",
        rounded: "full",
        bg: "primary.default",
      },
    },
    row: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      paddingInline: "2",
      paddingBlock: "1",
      minH: "8",
      rounded: "md",
      transitionProperty: "background-color",
      transitionDuration: "fast",
      _hover: { bg: "surface.muted" },
      // Hover-reveal of the action cluster is driven from the row (the hovered
      // element) targeting the stable data-reveal child — only where hover
      // exists, so touch devices keep the actions visible.
      "@media (hover: hover)": {
        "& [data-reveal]": {
          opacity: "0",
          transform: "translateX(4px)",
          transitionProperty: "opacity, transform",
          transitionDuration: "fast",
          transitionTimingFunction: "ease-out",
        },
        "&:hover [data-reveal], &:focus-within [data-reveal]": {
          opacity: "1",
          transform: "translateX(0)",
        },
      },
    },
    // Always-visible muted cluster: step count + ETA. Sits between the title
    // and the (revealed) actions.
    meta: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      flexShrink: "0",
      textStyle: "xs",
      color: "fg.subtle",
      fontVariantNumeric: "tabular-nums",
    },
    // Layout only — the reveal animation is driven from the row slot via the
    // data-reveal attribute on this element.
    actions: {
      display: "flex",
      alignItems: "center",
      gap: "0.5",
      flexShrink: "0",
    },
    stepRow: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      paddingInline: "2",
      rounded: "md",
      _hover: { bg: "surface.muted" },
    },
    steps: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: "1",
      paddingInlineStart: "9",
      paddingBlock: "1.5",
    },
    editable: {
      flex: "1",
      minW: "0",
      textStyle: "sm",
      whiteSpace: "nowrap",
      overflowX: "auto",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": { display: "none" },
      color: "fg.default",
      "&[data-tone=muted]": { color: "fg.muted" },
      "&[data-completed]": { color: "fg.subtle", textDecoration: "line-through" },
    },
    // Self-contained icon button (no Button recipe). Quiet by default; a soft
    // square-rounded hover. Modifiers ride on attributes the button carries.
    action: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      boxSize: "6",
      rounded: "md",
      border: "0",
      bg: "transparent",
      color: "fg.subtle",
      cursor: "pointer",
      transitionProperty: "background-color, color",
      transitionDuration: "fast",
      _hover: { bg: "surface.muted", color: "fg.default" },
      _disabled: { opacity: 0.5, cursor: "not-allowed" },
      "& svg": {
        transitionProperty: "transform",
        transitionDuration: "fast",
        transitionTimingFunction: "ease",
      },
      "&[aria-expanded=true] svg": { transform: "rotate(90deg)" },
      "&[data-danger]": { _hover: { color: "status.danger" } },
      "&[aria-pressed=true]": {
        color: "primary.default",
        _hover: { color: "primary.hover" },
      },
    },
    // The AI "break into steps" moment — amber (the dopamine hue), used as a
    // quiet tinted chip. No gradient/shimmer: it stays calm and on-system.
    aiAction: {
      display: "inline-flex",
      alignItems: "center",
      gap: "1.5",
      flexShrink: "0",
      h: "7",
      paddingInline: "3",
      rounded: "full",
      border: "0",
      cursor: "pointer",
      fontFamily: "body",
      fontSize: "xs",
      fontWeight: "medium",
      whiteSpace: "nowrap",
      bg: "accent.subtle",
      color: "accent.default",
      transitionProperty: "background-color, color, transform",
      transitionDuration: "fast",
      _hover: { bg: "accent.default", color: "fg.inverse" },
      _active: { transform: "scale(0.97)" },
      _disabled: { cursor: "wait", opacity: 0.7 },
      "& svg": { flexShrink: "0" },
    },
    counter: {
      flexShrink: "0",
      textStyle: "xs",
      color: "fg.subtle",
      fontVariantNumeric: "tabular-nums",
    },
    eta: {
      flexShrink: "0",
      fontVariantNumeric: "tabular-nums",
      cursor: "text",
      // Inner editable number inherits the muted xs meta size, not the
      // editable slot's default sm, so the whole meta cluster reads uniform.
      "& [contenteditable]": { textStyle: "xs", color: "inherit" },
    },
    addStep: {
      flex: "1",
      marginInlineStart: "1",
      color: "fg.muted",
    },
    addStepRow: {
      display: "flex",
      alignItems: "center",
      gap: "2",
      paddingTop: "0.5",
    },
    sectionTrigger: {
      display: "flex",
      alignItems: "center",
      gap: "1",
      w: "full",
      marginTop: "2",
      paddingInline: "2",
      paddingBlock: "1",
      cursor: "pointer",
      color: "fg.muted",
      textStyle: "label-md",
      "& svg": {
        transitionProperty: "transform",
        transitionDuration: "fast",
        transitionTimingFunction: "ease",
      },
      "&[data-state=open] svg": { transform: "rotate(90deg)" },
    },
    sectionContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: "0.5",
      paddingTop: "1",
    },
    empty: {
      textStyle: "sm",
      color: "fg.muted",
      textAlign: "center",
      paddingBlock: "8",
    },
  },
});
