import type { ComponentType } from "react";
import { Palette, Stopwatch, User } from "@solar-icons/react";
import { type Glyph } from "@/components/ui/icon";
import { AccountSection } from "./components/account-section";
import { PomodoroSection } from "./components/pomodoro-section";
import { ThemeSection } from "./components/theme-section";

export enum SettingsTab {
  Account = "account",
  Focus = "focus",
  Appearance = "appearance",
}

type SettingsTabConfig = {
  id: SettingsTab;
  icon: Glyph;
  content: ComponentType;
};

export const SETTINGS_TABS: SettingsTabConfig[] = [
  { id: SettingsTab.Account, icon: User, content: AccountSection },
  { id: SettingsTab.Focus, icon: Stopwatch, content: PomodoroSection },
  { id: SettingsTab.Appearance, icon: Palette, content: ThemeSection },
];
