"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Space } from "../types";

const SPACES: Space[] = [Space.Home, Space.Focus, Space.Ambient];
const SPACE_PARAM = "space";

type SpaceState = {
  spaces: Space[];
  activeSpace: Space;
  changeSpace: (space: Space) => void;
};

function parseSpace(value: string | null): Space {
  return SPACES.includes(value as Space) ? (value as Space) : Space.Home;
}

export function useSpace<T>(selector: (state: SpaceState) => T): T {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSpace = parseSpace(searchParams.get(SPACE_PARAM));

  const changeSpace = useCallback(
    (space: Space) => {
      const params = new URLSearchParams(searchParams.toString());
      if (space === Space.Home) params.delete(SPACE_PARAM);
      else params.set(SPACE_PARAM, space);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return selector({ spaces: SPACES, activeSpace, changeSpace });
}
