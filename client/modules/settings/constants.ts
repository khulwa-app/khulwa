import type { ComponentType } from "react";
import { Palette, Timer, User, type LucideIcon } from "lucide-react";
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
  icon: LucideIcon;
  content: ComponentType;
};

export const SETTINGS_TABS: SettingsTabConfig[] = [
  { id: SettingsTab.Account, icon: User, content: AccountSection },
  { id: SettingsTab.Focus, icon: Timer, content: PomodoroSection },
  { id: SettingsTab.Appearance, icon: Palette, content: ThemeSection },
];
