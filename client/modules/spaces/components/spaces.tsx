"use client";

import type { ComponentType, ReactNode } from "react";
import { useState, useEffect } from "react";
import { chakra, Presence, useRecipe } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePomodoro } from "@/modules/pomodoro";
import { formatPomodoro } from "@/modules/clock";
import { spacesShellRecipe } from "@/theme/recipes";
import { AmbientSpace } from "./ambient-space";
import { FocusSpace } from "./focus-space";
import { HomeSpace } from "./home-space";
import { TasksSpace } from "./tasks-space";
import { StatsSpace } from "./stats-space";

const SpacesShell = chakra("div", spacesShellRecipe);

type SpaceLayerProps = {
  space: Space;
  activeSpace: Space;
  initialActive: Space;
  children: ReactNode;
};

function SpaceLayer({ space, activeSpace, initialActive, children }: SpaceLayerProps) {
  const recipe = useRecipe({ key: "spaceLayer" });
  const styles = recipe();
  const isActive = activeSpace === space;
  return (
    <Presence
      css={styles}
      present={isActive}
      skipAnimationOnMount={initialActive === space}
      unmountOnExit={false}
      lazyMount={false}
      pointerEvents={isActive ? "auto" : "none"}
      aria-hidden={!isActive}
    >
      {children}
    </Presence>
  );
}

const layers: { space: Space; Component: ComponentType }[] = [
  { space: Space.Home, Component: HomeSpace },
  { space: Space.Focus, Component: FocusSpace },
  { space: Space.Ambient, Component: AmbientSpace },
  { space: Space.Tasks, Component: TasksSpace },
  { space: Space.Stats, Component: StatsSpace },
];

function useInitialActive(current: Space): Space {
  const [initial] = useState<Space>(() => current);
  return initial;
}

function usePageTitle() {
  const tKhulwa = useTranslations("khulwa.metadata");
  const tCommon = useTranslations("common");
  const activeSpace = useSpace((s) => s.activeSpace);
  const { minutes, seconds } = usePomodoro();

  useEffect(() => {
    const brand = tKhulwa("title");
    let title = brand;
    if (activeSpace === Space.Focus) {
      title = `${formatPomodoro(minutes, seconds)} | ${tCommon("appName")}`;
    }
    document.title = title;
  }, [activeSpace, minutes, seconds, tKhulwa, tCommon]);
}

export function Spaces() {
  usePageTitle();
  const activeSpace = useSpace((s) => s.activeSpace);
  const initialActive = useInitialActive(activeSpace);

  return (
    <SpacesShell>
      {layers.map(({ space, Component }) => (
        <SpaceLayer key={space} space={space} activeSpace={activeSpace} initialActive={initialActive}>
          <Component />
        </SpaceLayer>
      ))}
    </SpacesShell>
  );
}
