import { BookOpen, Moon, NotebookPen, Sunrise, Target, type LucideIcon } from "lucide-react";

export const RHYTHMS = [
  { id: "morningDhikr", icon: Sunrise },
  { id: "deepWork", icon: Target },
  { id: "read", icon: BookOpen },
  { id: "reflect", icon: NotebookPen },
  { id: "rest", icon: Moon },
] as const satisfies ReadonlyArray<{ id: string; icon: LucideIcon }>;

export type RhythmId = (typeof RHYTHMS)[number]["id"];
