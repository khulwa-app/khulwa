"use client";

import type { ComponentType } from "react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
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

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-canvas select-none">
      {layers.map(({ space, Component }) => {
        const isActive = activeSpace === space;
        return (
          <div
            key={space}
            // Inactive layers stay mounted to preserve state, so they need `inert` as well as
            // `aria-hidden` — opacity alone would leave their controls in the tab order.
            inert={!isActive}
            aria-hidden={!isActive}
            data-state={isActive ? "open" : "closed"}
            className={cn(
              "absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-contain",
              "transition-opacity ease-out motion-reduce:transition-none",
              "duration-[var(--duration-enter)] data-[state=closed]:duration-[var(--duration-exit)]",
              isActive ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <Component />
          </div>
        );
      })}
    </div>
  );
}
