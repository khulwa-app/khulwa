import { Book2, Moon, Notes, Sunrise, Target } from "@solar-icons/react";
import { type Glyph } from "@/components/ui/icon";

export const RHYTHMS = [
  { id: "morningDhikr", icon: Sunrise },
  { id: "deepWork", icon: Target },
  { id: "read", icon: Book2 },
  { id: "reflect", icon: Notes },
  { id: "rest", icon: Moon },
] as const satisfies ReadonlyArray<{ id: string; icon: Glyph }>;

export type RhythmId = (typeof RHYTHMS)[number]["id"];
