"use client";

import {
  createSlotRecipeContext,
  Input,
  Text,
  type HTMLChakraProps,
  type InputProps,
  type TextProps,
} from "@chakra-ui/react";
import { InlineEdit, type InlineEditProps } from "@/components/ui";

// Compound components for the task list, bound to the taskList slot recipe
// (theme/slot-recipes/task-list.ts). Each piece carries its own slot styles —
// consumers wire behavior only, no css={...} or useSlotRecipe plumbing.
const ctx = createSlotRecipeContext({ key: "taskList" });

type DivProps = HTMLChakraProps<"div">;
type ButtonProps = HTMLChakraProps<"button">;

export const TaskList = {
  // Root is the context provider: every piece below must render inside it.
  Root: ctx.withProvider<HTMLDivElement, DivProps>("div", "list"),
  Item: ctx.withContext<HTMLDivElement, DivProps>("div", "item"),
  Row: ctx.withContext<HTMLDivElement, DivProps>("div", "row"),
  // Always-visible muted cluster (step count + ETA).
  Meta: ctx.withContext<HTMLDivElement, DivProps>("div", "meta"),
  // Hover-revealed action cluster (visible on touch).
  Actions: ctx.withContext<HTMLDivElement, DivProps>("div", "actions"),
  Steps: ctx.withContext<HTMLDivElement, DivProps>("div", "steps"),
  StepRow: ctx.withContext<HTMLDivElement, DivProps>("div", "stepRow"),
  AddStepRow: ctx.withContext<HTMLDivElement, DivProps>("div", "addStepRow"),
  // One action button for all per-row icons — a plain button styled entirely
  // by the action slot (no Button recipe). Modifiers ride on attributes:
  // aria-expanded (chevron rotates), aria-pressed (doing-now fills), data-danger.
  Action: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "action", {
    defaultProps: { type: "button" },
  }),
  // The bold AI "Break into steps" chip (gradient + glow/shimmer).
  AiAction: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "aiAction", {
    defaultProps: { type: "button" },
  }),
  Editable: ctx.withContext<HTMLParagraphElement, InlineEditProps>(InlineEdit, "editable"),
  Eta: ctx.withContext<HTMLParagraphElement, TextProps>(Text, "eta"),
  Counter: ctx.withContext<HTMLParagraphElement, TextProps>(Text, "counter"),
  AddStepInput: ctx.withContext<HTMLInputElement, InputProps>(Input, "addStep", {
    defaultProps: { variant: "flushed", size: "sm" },
  }),
  SectionTrigger: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "sectionTrigger"),
  SectionContent: ctx.withContext<HTMLDivElement, DivProps>("div", "sectionContent"),
  Empty: ctx.withContext<HTMLParagraphElement, TextProps>(Text, "empty"),
};
