import { dockSlotRecipe } from "./dock";
import { badgeSlotRecipe } from "./badge";
import { menuSlotRecipe } from "./menu";
import { cardSlotRecipe } from "./card";
import { statBarSlotRecipe } from "./stat-bar";
import { rhythmListSlotRecipe } from "./rhythm-list";
import { commandPaletteSlotRecipe } from "./command-palette";
import { spacesSlotRecipe } from "./spaces";
import { panelSlotRecipe } from "./panel";
import { scrollAreaSlotRecipe } from "./scroll-area";
import { taskListSlotRecipe } from "./task-list";
import { timerPillSlotRecipe } from "./floating-timer";
import { soundsSlotRecipe } from "./sounds";
import { ayahSlotRecipe } from "./ayah";
import { navbarSlotRecipe } from "./navbar";
import { activeTaskSlotRecipe } from "./active-task";
import { homeSpaceSlotRecipe } from "./home-space";

export const slotRecipes = {
  dock: dockSlotRecipe,
  badge: badgeSlotRecipe,
  menu: menuSlotRecipe,
  card: cardSlotRecipe,
  statBar: statBarSlotRecipe,
  rhythmList: rhythmListSlotRecipe,
  commandPalette: commandPaletteSlotRecipe,
  spaces: spacesSlotRecipe,
  panel: panelSlotRecipe,
  scrollArea: scrollAreaSlotRecipe,
  taskList: taskListSlotRecipe,
  timerPill: timerPillSlotRecipe,
  sounds: soundsSlotRecipe,
  ayah: ayahSlotRecipe,
  navbar: navbarSlotRecipe,
  activeTask: activeTaskSlotRecipe,
  homeSpace: homeSpaceSlotRecipe,
};
