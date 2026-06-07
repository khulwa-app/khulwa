"use client";

import type { ComponentType } from "react";
import { useState, useEffect } from "react";
import { chakra, Presence, useSlotRecipe } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePomodoro, usePomodoroStore } from "@/modules/pomodoro";
import { formatPomodoro } from "@/modules/clock";
import { AmbientSpace } from "./ambient-space";
import { FocusSpace } from "./focus-space";
import { HomeSpace } from "./home-space";

const layers: { space: Space; Component: ComponentType }[] = [
  { space: Space.Home, Component: HomeSpace },
  { space: Space.Focus, Component: FocusSpace },
  { space: Space.Ambient, Component: AmbientSpace },
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
  useEffect(() => {
    usePomodoroStore.persist.rehydrate();
  }, []);
  const activeSpace = useSpace((s) => s.activeSpace);
  const initialActive = useInitialActive(activeSpace);
  const styles = useSlotRecipe({ key: "spaces" })();

  return (
    <chakra.div css={styles.shell}>
      {layers.map(({ space, Component }) => {
        const isActive = activeSpace === space;
        return (
          <Presence
            key={space}
            css={styles.layer}
            present={isActive}
            skipAnimationOnMount={initialActive === space}
            unmountOnExit={false}
            lazyMount={false}
            pointerEvents={isActive ? "auto" : "none"}
            aria-hidden={!isActive}
          >
            <Component />
          </Presence>
        );
      })}
    </chakra.div>
  );
}
