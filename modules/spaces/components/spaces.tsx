"use client";

import type { ComponentType } from "react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSpace } from "@/modules/space";
import { Space } from "@/modules/space/types";
import { usePomodoro, usePomodoroStore } from "@/modules/pomodoro";
import { formatPomodoro } from "@/modules/clock";
import { AmbientSpace } from "./ambient-space";
import { FocusSpace } from "./focus-space";
import { HomeSpace } from "./home-space";

const layers: { space: Space; Component: ComponentType }[] = [{ space: Space.Home, Component: HomeSpace }, { space: Space.Focus, Component: FocusSpace }, { space: Space.Ambient, Component: AmbientSpace }];

export function Spaces() {
  const active = useSpace((state) => state.activeSpace);
  const t = useTranslations("khulwa.metadata");
  const common = useTranslations("common");
  const { minutes, seconds } = usePomodoro();
  useEffect(() => { usePomodoroStore.persist.rehydrate(); }, []);
  useEffect(() => { document.title = active === Space.Focus ? `${formatPomodoro(minutes, seconds)} | ${common("appName")}` : t("title"); }, [active, common, minutes, seconds, t]);
  return <div className="relative min-h-dvh overflow-hidden">{layers.map(({ space, Component }) => <div aria-hidden={active !== space} className={active === space ? "block" : "hidden"} key={space}><Component /></div>)}</div>;
}
