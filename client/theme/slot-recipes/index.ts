import { dockSlotRecipe } from "./dock";
import { badgeSlotRecipe } from "./badge";
import { menuSlotRecipe } from "./menu";
import { cardSlotRecipe } from "./card";
import { statBarSlotRecipe } from "./stat-bar";
import { rhythmListSlotRecipe } from "./rhythm-list";
import { commandPaletteSlotRecipe } from "./command-palette";
import { spacesSlotRecipe } from "./spaces";
import { popoverSlotRecipe } from "./popover";
import { panelSlotRecipe } from "./panel";
import { scrollAreaSlotRecipe } from "./scroll-area";
import { taskListSlotRecipe } from "./task-list";
import { timerPillSlotRecipe } from "./floating-timer";
import { soundsSlotRecipe } from "./sounds";

export const slotRecipes = {
  dock: dockSlotRecipe,
  badge: badgeSlotRecipe,
  menu: menuSlotRecipe,
  card: cardSlotRecipe,
  statBar: statBarSlotRecipe,
  rhythmList: rhythmListSlotRecipe,
  commandPalette: commandPaletteSlotRecipe,
  spaces: spacesSlotRecipe,
  popover: popoverSlotRecipe,
  panel: panelSlotRecipe,
  scrollArea: scrollAreaSlotRecipe,
  taskList: taskListSlotRecipe,
  timerPill: timerPillSlotRecipe,
  sounds: soundsSlotRecipe,
};
