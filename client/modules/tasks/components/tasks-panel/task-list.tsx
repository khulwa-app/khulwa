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

const ctx = createSlotRecipeContext({ key: "taskList" });

type DivProps = HTMLChakraProps<"div">;
type ButtonProps = HTMLChakraProps<"button">;

export const TaskList = {
  Root: ctx.withProvider<HTMLDivElement, DivProps>("div", "list"),
  Item: ctx.withContext<HTMLDivElement, DivProps>("div", "item"),
  Row: ctx.withContext<HTMLDivElement, DivProps>("div", "row"),

  Meta: ctx.withContext<HTMLDivElement, DivProps>("div", "meta"),

  Actions: ctx.withContext<HTMLDivElement, DivProps>("div", "actions"),
  Steps: ctx.withContext<HTMLDivElement, DivProps>("div", "steps"),
  StepRow: ctx.withContext<HTMLDivElement, DivProps>("div", "stepRow"),
  AddStepRow: ctx.withContext<HTMLDivElement, DivProps>("div", "addStepRow"),

  Action: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "action", {
    defaultProps: { type: "button" },
  }),

  AiAction: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "aiAction", {
    defaultProps: { type: "button" },
  }),
  Editable: ctx.withContext<HTMLParagraphElement, InlineEditProps>(InlineEdit, "editable"),
  Eta: ctx.withContext<HTMLParagraphElement, TextProps>(Text, "eta"),
  Counter: ctx.withContext<HTMLParagraphElement, TextProps>(Text, "counter"),
  AddStepInput: ctx.withContext<HTMLInputElement, InputProps>(Input, "addStep", {
    defaultProps: { variant: "bare", size: "sm" },
  }),
  SectionTrigger: ctx.withContext<HTMLButtonElement, ButtonProps>("button", "sectionTrigger"),
  SectionContent: ctx.withContext<HTMLDivElement, DivProps>("div", "sectionContent"),
  Empty: ctx.withContext<HTMLParagraphElement, TextProps>(Text, "empty"),
};
